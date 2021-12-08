# Upgrade the chain

Create a software upgrade proposal

```
 gitopiad tx gov submit-proposal software-upgrade v0.10.0 --title upgrade --description upgrade --upgrade-height 80 --from node0 --yes
gitopiad tx gov deposit 1 10000000tlore --from node0 --yes
gitopiad tx gov vote 1 yes --from node0 --yes
```

The current binary will halt at `upgrade-height`.

```
7:54PM ERR UPGRADE "v0.10.0" NEEDED at height: 80:
7:54PM ERR CONSENSUS FAILURE!!! err="UPGRADE \"v0.10.0\" NEEDED at height: 80:
```

Exit the process and run the new binary which includes the specified upgrade plan.

```
7:58PM INF applying upgrade "v0.10.0" at height: 80
```

# Note

- Make sure the current binary does not include the specified upgrade plan.

```
3:07AM ERR BINARY UPDATED BEFORE TRIGGER! UPGRADE "v0.10.0" - in binary but not executed on chain
3:07AM ERR CONSENSUS FAILURE!!! err="BINARY UPDATED BEFORE TRIGGER! UPGRADE \"v0.10.0\" - in binary but not executed on chain
```

- Set the minimum gas price to 0tlore in ~/.gitopia/config/app.toml

```
minimum-gas-prices = "0tlore"
```
