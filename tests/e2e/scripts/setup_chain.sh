#!/bin/sh
set -eo pipefail

GITOPIA_HOME=$HOME/.gitopia
CONFIG_FOLDER=$GITOPIA_HOME/config
GENESIS_TIME="2024-08-04T00:00:00Z"
NEXT_INFLATION_TIME="2025-08-04T00:00:00Z"

init_genesis () {
    # Remove the incompatible genesis file
    rm $CONFIG_FOLDER/genesis.json
    gitopiad init $MONIKER --chain-id $CHAIN_ID --home $GITOPIA_HOME --overwrite
}

edit_genesis () {

    GENESIS=$CONFIG_FOLDER/genesis.json

    # Update staking module
    dasel put -t string -f $GENESIS '.app_state.staking.params.bond_denom' -v 'ulore'
    dasel put -t string -f $GENESIS '.app_state.staking.params.unbonding_time' -v '240s'

    # Update bank module
    dasel put -t string -f $GENESIS '.app_state.bank.denom_metadata.[].description' -v 'Registered denom ulore for localosmosis testing'
    dasel put -t string -f $GENESIS '.app_state.bank.denom_metadata.[0].denom_units.[].denom' -v 'ulore'
    dasel put -t string -f $GENESIS '.app_state.bank.denom_metadata.[0].denom_units.[0].exponent' -v 0
    dasel put -t string -f $GENESIS '.app_state.bank.denom_metadata.[0].base' -v 'ulore'
    dasel put -t string -f $GENESIS '.app_state.bank.denom_metadata.[0].display' -v 'ulore'
    dasel put -t string -f $GENESIS '.app_state.bank.denom_metadata.[0].name' -v 'ulore'
    dasel put -t string -f $GENESIS '.app_state.bank.denom_metadata.[0].symbol' -v 'ulore'

    # Update crisis module
    dasel put -t string -f $GENESIS '.app_state.crisis.constant_fee.denom' -v 'ulore'

    # Update gov module
    dasel put -t string -f $GENESIS '.app_state.gov.voting_params.voting_period' -v '60s'
    dasel put -t string -f $GENESIS '.app_state.gov.deposit_params.min_deposit.[0].denom' -v 'ulore'
 
    # Update mint module
    dasel put -t string -f $GENESIS '.app_state.mint.params.mint_denom' -v 'ulore'

    # Update genesis time
    dasel put -t string -f $GENESIS '.genesis_time' -v "$GENESIS_TIME"

    # Update gitopia module
    dasel put -t string -f $GENESIS '.app_state.gitopia.params.next_inflation_time' -v "$NEXT_INFLATION_TIME"
    dasel put -t string -f $GENESIS '.app_state.gitopia.params.genesis_time' -v "$GENESIS_TIME"
}

add_genesis_accounts () {

    gitopiad keys delete val -y --keyring-backend=test --home $GITOPIA_HOME
    echo $VALIDATOR_0_MNEMONIC | gitopiad keys add $VALIDATOR_0_MONIKER --recover --keyring-backend=test --home $GITOPIA_HOME
    echo $VALIDATOR_1_MNEMONIC | gitopiad keys add $VALIDATOR_1_MONIKER --recover --keyring-backend=test --home $GITOPIA_HOME

    gitopiad add-genesis-account $(gitopiad keys show $VALIDATOR_0_MONIKER -a --keyring-backend=test --home $GITOPIA_HOME) 200000000000ulore --keyring-backend=test --home $GITOPIA_HOME
    gitopiad add-genesis-account $(gitopiad keys show $VALIDATOR_1_MONIKER -a --keyring-backend=test --home $GITOPIA_HOME) 100000000000ulore --keyring-backend=test --home $GITOPIA_HOME
    gitopiad add-genesis-account $RELAYER_ACCOUNT_ADDRESS 100000000000ulore --keyring-backend=test --home $GITOPIA_HOME
}

collect_gentxs () {
    gitopiad collect-gentxs --home $GITOPIA_HOME
}

edit_config () {

    # Remove seeds
    dasel put -t string -f $CONFIG_FOLDER/config.toml '.p2p.seeds' -v ''

    # Expose the rpc
    dasel put -t string -f $CONFIG_FOLDER/config.toml '.rpc.laddr' -v "tcp://0.0.0.0:26657"
    
    # Expose pprof for debugging
    # To make the change enabled locally, make sure to add 'EXPOSE 6060' to the root Dockerfile
    # and rebuild the image.
    dasel put -t string -f $CONFIG_FOLDER/config.toml '.rpc.pprof_laddr' -v "0.0.0.0:6060"
}

enable_cors () {

    # Enable cors on RPC
    dasel put -t string -f $CONFIG_FOLDER/config.toml -v "*" '.rpc.cors_allowed_origins.[]'
    dasel put -t string -f $CONFIG_FOLDER/config.toml -v "Accept-Encoding" '.rpc.cors_allowed_headers.[]'
    dasel put -t string -f $CONFIG_FOLDER/config.toml -v "DELETE" '.rpc.cors_allowed_methods.[]'
    dasel put -t string -f $CONFIG_FOLDER/config.toml -v "OPTIONS" '.rpc.cors_allowed_methods.[]'
    dasel put -t string -f $CONFIG_FOLDER/config.toml -v "PATCH" '.rpc.cors_allowed_methods.[]'
    dasel put -t string -f $CONFIG_FOLDER/config.toml -v "PUT" '.rpc.cors_allowed_methods.[]'

    # Enable unsafe cors and swagger on the api
    dasel put -t bool -f $CONFIG_FOLDER/app.toml -v "true" '.api.swagger'
    dasel put -t bool -f $CONFIG_FOLDER/app.toml -v "true" '.api.enabled-unsafe-cors'

    dasel put -t bool -f $CONFIG_FOLDER/app.toml -v "true" '.api.enable'
    dasel put -t string -f $CONFIG_FOLDER/app.toml -v "tcp://0.0.0.0:1317" '.api.address'
    dasel put -t string -f $CONFIG_FOLDER/app.toml -v "0.0.0.0:9090" '.grpc.address'

    # Enable cors on gRPC Web
    dasel put -t bool -f $CONFIG_FOLDER/app.toml -v "true" '.grpc-web.enable-unsafe-cors'
}

run_with_retries() {
  cmd=$1
  success_msg=$2

  substring='code: 0'
  COUNTER=0

  while [ $COUNTER -lt 15 ]; do
    string=$(eval $cmd 2>&1)
    echo $string

    if [ "$string" != "${string%"$substring"*}" ]; then
      echo "$success_msg"
      break
    else
      COUNTER=$((COUNTER+1))
      sleep 0.5
    fi
  done
}

init_genesis
edit_genesis
add_genesis_accounts
collect_gentxs
edit_config
enable_cors

gitopiad start --home $GITOPIA_HOME &


