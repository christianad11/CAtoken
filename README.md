# CAtoken
A simple ERC-20 token made for practice

Required dependencies (see package.json & package-lock.json) should be installed before proceeding

## Truffle
To install truffle: npm install -g truffle
To initiate project: truffle init

## Ganache
Then install ganache: npm install -g ganache-cli
Then run: ganache-cli -a 10 -e 1000 --acctKeys devnetAccs.json

This will launch "devnet" with api access at 127.0.0.1:8545 with network id 5777. It'll create 10 wallets with 1k eth preloaded, and save those wallets in the .json file.

## Scripts
1)for truffle test : "test"
2)to create 10 preloaded wallets : "launch-devnet"
3)to deploy: "deploy-devnet"
