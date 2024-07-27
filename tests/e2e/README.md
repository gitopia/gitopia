# End-to-end tests

## Prequisites

Requires osmosis localnet for testing ibc tests

Clone osmosis repo

```
git clone https://github.com/osmosis-labs/osmosis
```

Expose api and grpc interface. Add the following changes to the `tests/localosmosis/scripts/setup.sh` file

```
# Enable remote api connections
dasel put -t string -f $CONFIG_FOLDER/app.toml -v "tcp://0.0.0.0:1317" '.api.address'

# Enable remote grpc connections
dasel put -t string -f $CONFIG_FOLDER/app.toml -v "0.0.0.0:9090" '.grpc.address'
```

Start the osmosis localnet

```
make localnet-start
```