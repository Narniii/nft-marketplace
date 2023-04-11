

## Notes

* change the `--network` parameter to `mainnet` for production.

* remember to fill the `.env` file with appropriate parameters.

* remember to charge your wallet on testnet using https://goerlifaucet.com/

* example output is 
```
Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Account balance: 9999979606595087570751
NFT Contract deployed at: 0x8A791620dd6260079BF849Dc5567aDC3F2FdC318
```


## Setup

0. Change directory to `ERC721` or `ERC1155` and run ```npx hardhat node``` to run a local node

1. Install packages.
```bash
npm install
```

2. Compile Smart Contract
```bash
npx hardhat compile
```

3. Deploy Smart Contarct
```bash
npx hardhat run --network localhost scripts/deploy.ts
```