# Setup your own single node devnet

```
gitopiad init test --chain-id test
gitopiad keys add user1
gitopiad add-genesis-account <address from above command> 10000000stake
gitopiad gentx user1 100000stake --chain-id test
gitopiad collect-gentxs
gitopiad start
```
