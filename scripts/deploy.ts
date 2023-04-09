import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

async function main() {


  const [deployer] = await ethers.getSigners();

  console.log(
  "Deploying contracts with the account:",
  deployer.address
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Market = await ethers.getContractFactory("NFTMarketplace");
  
  const market_contract = await Market.deploy();

  console.log("NFT Contract deployed at:", market_contract .address);
}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error);
  process.exit(1);
});