

## Notes

* change the `--network` parameter to `mainnet` for production.

* remember to fill the `.env` file with appropriate parameters.

* remember to charge your wallet on testnet using https://goerlifaucet.com/

* example output is 
```
Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Account balance: 10000000000000000000000
NFT Contract deployed at: 0x5FbDB2315678afecb367f032d93F642f64180aa3

```


## Setup

0. Change directory to `ERC721` or `ERC1155` and run ```npx hardhat node``` to run a local node

1. Install packages.
```bash
npm install (--force)
```
2. clean artifacts and cash folders

3. Compile Smart Contract
```bash
npx hardhat compile
```

4. Deploy Smart Contarct
```bash
npx hardhat run --network localhost scripts/deploy.ts
```