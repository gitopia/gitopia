#!/bin/sh

GITOPIA_HOME=/root/.gitopia
CONFIG_FOLDER=$GITOPIA_HOME/config
MONIKER=gitopia-node

install_prerequisites () {
    apk add dasel curl jq
}

initialize_node () {
    gitopiad init $MONIKER --chain-id=$CHAIN_ID --home $GITOPIA_HOME
}

update_genesis () {
    curl http://gitopiad:26657/genesis | jq '.result.genesis' > $CONFIG_FOLDER/genesis.json
}

update_config () {
    # Update persistent peers to include the main gitopiad node
    GITOPIAD_NODE_ID=$(curl -s http://gitopiad:26657/status | jq -r .result.node_info.id)
    dasel put -t string -f $CONFIG_FOLDER/config.toml '.p2p.persistent_peers' -v "${GITOPIAD_NODE_ID}@gitopiad:26656"

    # Expose the rpc
    dasel put -t string -f $CONFIG_FOLDER/config.toml '.rpc.laddr' -v "tcp://0.0.0.0:26657"

    # Enable cors
    dasel put -t string -f $CONFIG_FOLDER/config.toml -v "*" '.rpc.cors_allowed_origins.[]'
    dasel put -t bool -f $CONFIG_FOLDER/app.toml -v "true" '.api.enable'
    dasel put -t string -f $CONFIG_FOLDER/app.toml -v "tcp://0.0.0.0:1317" '.api.address'
    dasel put -t string -f $CONFIG_FOLDER/app.toml -v "0.0.0.0:9090" '.grpc.address'

    dasel put -t bool -f $CONFIG_FOLDER/config.toml -v "true" '.extractor.enabled'
    dasel put -t string -f $CONFIG_FOLDER/config.toml -v "stdout" '.extractor.output_file'
}

if [[ ! -d $CONFIG_FOLDER ]]
then
    install_prerequisites
    initialize_node
    update_genesis
    update_config
fi

# Start the node
firehose start -c /app/firehose.yaml
