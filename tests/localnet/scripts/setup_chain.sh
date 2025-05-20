#!/bin/sh

GITOPIA_HOME=$HOME/.gitopia
CONFIG_FOLDER=$GITOPIA_HOME/config
MONIKER=val

MNEMONIC="firm easily muscle barely tank lens aunt phrase net bean void picnic soap uphold level civil motor acquire runway evil poverty staff fog dinosaur"

install_prerequisites () {
    apk add dasel
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

    # Update rewards params
    dasel put -t string -f $GENESIS '.app_state.rewards.params.evaluator_address' -v 'gitopia17jhwu9ly6tvk029whklfxtcy9l7k2klkctpxu9'
}

add_genesis_accounts () {

    # validator wallet address
    gitopiad add-genesis-account gitopia18pqef3j8808c8fhq4apcxp72unk74jmjr5zgnt 100000000000ulore --home $GITOPIA_HOME

    # feegrant wallet address
    gitopiad add-genesis-account gitopia12sjhqc3rqgvu3zpg8ekmwl005rp4ys58ekqg89 100000000000ulore --home $GITOPIA_HOME

    # git server0 wallet address
    gitopiad add-genesis-account gitopia1jnq4pk0ene8xne4a43p2a2xpdhf3jqgsgu04n9 100000000000ulore --home $GITOPIA_HOME

    # git server1 wallet address
    gitopiad add-genesis-account gitopia1yp9um722xlywmjc0mc0x9jv06vw9t7l4lkgj8v 100000000000ulore --home $GITOPIA_HOME

    # git server2 wallet address
    gitopiad add-genesis-account gitopia159jvuesk653vhgrpdnxf69ma56rc3u5yvuz2fa 100000000000ulore --home $GITOPIA_HOME

    # rewards service wallet address
    gitopiad add-genesis-account gitopia17jhwu9ly6tvk029whklfxtcy9l7k2klkctpxu9 100000000000ulore --home $GITOPIA_HOME

    echo $MNEMONIC | gitopiad keys add $MONIKER --recover --keyring-backend=test --home $GITOPIA_HOME
    gitopiad gentx $MONIKER 500000000ulore --keyring-backend=test --chain-id=$CHAIN_ID --home $GITOPIA_HOME

    gitopiad collect-gentxs --home $GITOPIA_HOME
}

initialize_validator () {
    gitopiad gentx $MONIKER 5000000ulore \
      --chain-id=$CHAIN_ID \
      --moniker="$MONIKER" \
      --commission-rate="0.10" \
      --commission-max-rate="0.20" \
      --commission-max-change-rate="0.01" \
      --min-self-delegation="1" \
      --pubkey=$(gitopiad tendermint show-validator) \
      --keyring-backend=test \
      --home $GITOPIA_HOME

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

if [[ ! -d $CONFIG_FOLDER ]]
then
    echo $MNEMONIC | gitopiad init -o --chain-id=$CHAIN_ID --home $GITOPIA_HOME --recover $MONIKER
    install_prerequisites
    edit_genesis
    add_genesis_accounts
    initialize_validator
    edit_config
    enable_cors
fi

gitopiad start --home $GITOPIA_HOME
