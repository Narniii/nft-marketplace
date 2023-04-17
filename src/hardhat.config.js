require("@nomiclabs/hardhat-waffle");


const ALCHEMY_API_KEY = "";
const ROPSTEN_PRIVATE_KEY = "";
module.exports = {
  solidity: "0.8.8",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      // url: process.env.REACT_APP_LOCAL_NET,
      chainId: 31337,
      // gas: 2100000,
      // gasPrice: 250000000000,
   
    },
    ropsten: {
      url: process.env.REACT_APP_ROPSTEN_URL || "",
      accounts:
        process.env.REACT_APP_PRIVATE_KEY !== undefined ? [process.env.REACT_APP_PRIVATE_KEY] : [],
    },
    goerli: {
      url: process.env.REACT_APP_GOERLI_URL || "",
      accounts:
        process.env.REACT_APP_PRIVATE_KEY !== undefined ? [process.env.REACT_APP_PRIVATE_KEY] : [],
    },
    mainnet: {
      url: process.env.REACT_APP_MAINNET_URL || "",
      accounts:
        process.env.REACT_APP_PRIVATE_KEY !== undefined ? [process.env.REACT_APP_PRIVATE_KEY] : [],
    },
    localnet: {
      url: process.env.REACT_APP_LOCAL_NET || "",
      accounts:
        process.env.REACT_APP_PRIVATE_KEY !== undefined ? [process.env.REACT_APP_PRIVATE_KEY] : [],
    },

  },
  gasReporter: {
    enabled: process.env.REACT_APP_REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.REACT_APP_ETHERSCAN_API_KEY,
  },
};
