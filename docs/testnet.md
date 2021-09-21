# Instructions for joining the testnet

1. Fork the official [networks]() repository.

2. Clone the forked repository.

3. Initialize the chain configuration files.

    ```
    gitopiad init [moniker] --chain-id [chain-id]
    ```

4. Overwrite the `genesis.json` file in the chain configuration directory (`${HOME}/.gitopia/config/`).

5. Generate your wallet

    ```
    gitopiad keys add <name>
    ```

6. Create the `gentx` transaction for your validator.

    ```
    gitopiad gentx --name <name> \
        --amount 100000000tlore \
        --commission-rate 0.1 \
        --commission-max-rate 0.2 \
        --commission-max-change-rate 0.01
    ```

7. Copy the `gentx` file to the repository.

8. Commit and push it to the forked repository.

9. Create a pull request from the forked repository to the official repository.
