#!/bin/bash

set -ex

# initialize Hermes relayer configuration
mkdir -p /root/.hermes/
touch /root/.hermes/config.toml

echo $GITOPIA_B_E2E_RLY_MNEMONIC > /root/.hermes/GITOPIA_B_E2E_RLY_MNEMONIC.txt
echo $GITOPIA_A_E2E_RLY_MNEMONIC > /root/.hermes/GITOPIA_A_E2E_RLY_MNEMONIC.txt

# setup Hermes relayer configuration with non-zero gas_price
tee /root/.hermes/config.toml <<EOF
[global]
log_level = 'info'

[mode]

[mode.clients]
enabled = true
refresh = true
misbehaviour = true

[mode.connections]
enabled = false

[mode.channels]
enabled = true

[mode.packets]
enabled = true
clear_interval = 100
clear_on_start = true
tx_confirmation = true

[rest]
enabled = true
host = '0.0.0.0'
port = 3031

[telemetry]
enabled = true
host = '127.0.0.1'
port = 3001

[[chains]]
id = '$GITOPIA_A_E2E_CHAIN_ID'
rpc_addr = 'http://$GITOPIA_A_E2E_VAL_HOST:26657'
grpc_addr = 'http://$GITOPIA_A_E2E_VAL_HOST:9090'
event_source = { mode = 'push', url = 'ws://$GITOPIA_A_E2E_VAL_HOST:26657/websocket' , batch_delay = '50ms' }
rpc_timeout = '10s'
account_prefix = 'gitopia'
key_name = 'rly01-gitopia-a'
store_prefix = 'ibc'
max_gas = 6000000
gas_price = { price = 0.005, denom = 'ulore' }
gas_multiplier = 1.5
clock_drift = '1m' # to accomdate docker containers
trusting_period = '14days'
trust_threshold = { numerator = '1', denominator = '3' }
dynamic_gas_price = { enabled = true, multiplier = 1.3, max = 0.05 }


[[chains]]
id = '$GITOPIA_B_E2E_CHAIN_ID'
rpc_addr = 'http://$GITOPIA_B_E2E_VAL_HOST:26657'
grpc_addr = 'http://$GITOPIA_B_E2E_VAL_HOST:9090'
event_source = { mode = 'push', url = 'ws://$GITOPIA_B_E2E_VAL_HOST:26657/websocket' , batch_delay = '50ms' }
rpc_timeout = '10s'
account_prefix = 'gitopia'
key_name = 'rly01-gitopia-b'
store_prefix = 'ibc'
max_gas =  6000000
gas_price = { price = 0.005, denom = 'ulore' }
gas_multiplier = 1.5
clock_drift = '1m' # to accomdate docker containers
trusting_period = '14days'
trust_threshold = { numerator = '1', denominator = '3' }
dynamic_gas_price = { enabled = true, multiplier = 1.3, max = 0.05 }
EOF

# setup Hermes relayer configuration with zero gas_price
tee /root/.hermes/config-zero.toml <<EOF
[global]
log_level = 'info'

[mode]

[mode.clients]
enabled = false
refresh = true
misbehaviour = true

[mode.connections]
enabled = false

[mode.channels]
enabled = false

[mode.packets]
enabled = true
clear_interval = 100
clear_on_start = true
tx_confirmation = true

[rest]
enabled = true
host = '0.0.0.0'
port = 3031

[telemetry]
enabled = true
host = '127.0.0.1'
port = 3002

[[chains]]
id = '$GITOPIA_A_E2E_CHAIN_ID'
rpc_addr = 'http://$GITOPIA_A_E2E_VAL_HOST:26657'
grpc_addr = 'http://$GITOPIA_A_E2E_VAL_HOST:9090'
event_source = { mode = 'push', url = 'ws://$GITOPIA_A_E2E_VAL_HOST:26657/websocket' , batch_delay = '50ms' }
rpc_timeout = '10s'
account_prefix = 'gitopia'
key_name = 'rly01-gitopia-a'
store_prefix = 'ibc'
max_gas = 6000000
gas_price = { price = 0, denom = 'ulore' }
gas_multiplier = 1.5
clock_drift = '1m' # to accommodate docker containers
trusting_period = '14days'
trust_threshold = { numerator = '1', denominator = '3' }
dynamic_gas_price = { enabled = true, multiplier = 1.3, max = 0.05 }


[[chains]]
id = '$GITOPIA_B_E2E_CHAIN_ID'
rpc_addr = 'http://$GITOPIA_B_E2E_VAL_HOST:26657'
grpc_addr = 'http://$GITOPIA_B_E2E_VAL_HOST:9090'
event_source = { mode = 'push', url = 'ws://$GITOPIA_B_E2E_VAL_HOST:26657/websocket' , batch_delay = '50ms' }
rpc_timeout = '10s'
account_prefix = 'gitopia'
key_name = 'rly01-gitopia-b'
store_prefix = 'ibc'
max_gas =  6000000
gas_price = { price = 0, denom = 'ulore' }
gas_multiplier = 1.5
clock_drift = '1m' # to accommodate docker containers
trusting_period = '14days'
trust_threshold = { numerator = '1', denominator = '3' }
dynamic_gas_price = { enabled = true, multiplier = 1.3, max = 0.05 }
EOF


# import keys
hermes keys add  --key-name rly01-gitopia-b  --chain $GITOPIA_B_E2E_CHAIN_ID --mnemonic-file /root/.hermes/GITOPIA_B_E2E_RLY_MNEMONIC.txt
sleep 5
hermes keys add  --key-name rly01-gitopia-a  --chain $GITOPIA_A_E2E_CHAIN_ID --mnemonic-file /root/.hermes/GITOPIA_A_E2E_RLY_MNEMONIC.txt
