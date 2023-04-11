import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import NFTMarketplace from './artifacts/contracts/Market.sol/NFTMarketplace.json';

const NFTMarketplaceContext = createContext();

export const useNFTMarketplace = () => {
  return useContext(NFTMarketplaceContext);
};

export const NFTMarketplaceProvider = ({ children }) => {
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [marketContract, setMarketContract] = useState();
  const [account, setAccount] = useState();
  const [owner, setOwner] = useState()


  // const [onTokenMinted, setOnTokenMinted] = useState(null);
  // useEffect(() => {
  //   if (marketContract && onTokenMinted) {
  //     const filter = marketContract.filters.TokenMinted();
  //     const handleTokenMinted = (tokenId, recipient) => {
  //       onTokenMinted(tokenId.toNumber(), recipient);
  //     };

  //     marketContract.on(filter, handleTokenMinted);

  //     return () => {
  //       marketContract.off(filter, handleTokenMinted);
  //     };
  //   }
  // }, [marketContract, onTokenMinted]);




  useEffect(() => {

    const init = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      const signer = provider.getSigner();
      const marketContract = new ethers.Contract(
        process.env.REACT_APP_MARKET_ADDRESS,
        NFTMarketplace.abi,
        signer
      );
      console.log('??????', process.env.REACT_APP_MARKET_ADDRESS, NFTMarketplace.abi, signer)

      setProvider(provider);
      setOwner(process.env.REACT_APP_OWNER_ADDRESS)
      setSigner(signer);
      setMarketContract(marketContract);

    };

    if (window.ethereum) {
      console.log('........', window.ethereum)
      init();
    } else {
      const handleEthereumReady = () => {
        init();
      };
      window.addEventListener("ethereum#initialized", handleEthereumReady);
      return () => {
        window.removeEventListener("ethereum#initialized", handleEthereumReady);
      };
    }
  }, []);


  useEffect(() => {
    const getAccount = async () => {
      if (signer) {
        const account = await signer.getAddress();
        setAccount(account);
      }
    };

    getAccount();
  }, [signer]);

  useEffect(() => {
    if (provider) {
      console.log(provider)
      console.log(process.env.REACT_APP_MARKET_ADDRESS)
    } else {
      console.log('provider nadaaarim')
    }
    if (account) {
      console.log(account)
      console.log(process.env.REACT_APP_MARKET_ADDRESS)
    } else {
      console.log('account nadaaarim')
    }
  }, [provider, account]);


  // Add your functions like mintNFT, createOffer, cancelOffer, etc.
  const mintNFT = async (recipient, tokenURI) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, provider);
    const onlyOwnerContrasct = new ethers.Contract(
      process.env.REACT_APP_MARKET_ADDRESS,
      NFTMarketplace.abi,
      signer
    );
    console.log('ghable if')
    if (onlyOwnerContrasct) {
      try {
        var txObj = {}
        console.log('try e  if')
        // const tx = await onlyOwnerContrasct.mintNFT(recipient, tokenURI, parseInt(NFTtokenId));
        const tx = await onlyOwnerContrasct.mintNFT(recipient, tokenURI);
        const txReceipt = await tx.wait();
        const [transferEvent] = txReceipt.events;
        const { tokenId } = transferEvent.args;
        console.log("NFT minted successfully", tx);
        console.log("txReceipt", txReceipt);
        console.log("tokenId", tokenId);
        txObj.tx = tx
        txObj.tokenId = tokenId._hex
        return txObj

      } catch (error) {
        console.error("Error minting NFT:", error);
        return error
      }
    }
  };
  const listNFT = async (tokenId, price) => {
    if (marketContract) {
      try {
        const tx = await marketContract.listNFT(tokenId, price);
        await tx.wait();
        console.log("NFT listed successfully", tx);
        return tx
      } catch (error) {
        console.error("Error listing NFT:", error);
        return error
      }
    }
  };
  const createAuction = async (tokenId, price, royalty) => {
    if (marketContract) {
      try {
        const tx = await marketContract.createAuction(tokenId, price, royalty);
        await tx.wait();
        console.log("Offer created successfully");
      } catch (error) {
        console.error("Error creating offer:", error);
      }
    }
  };
  const createOffer = async (tokenId, price, royalty) => {
    if (marketContract) {
      try {
        const tx = await marketContract.createOffer(tokenId, price, royalty);
        await tx.wait();
        console.log("Offer created successfully");
      } catch (error) {
        console.error("Error creating offer:", error);
      }
    }
  };
  const cancelOffer = async (tokenId) => {
    if (marketContract) {
      try {
        const tx = await marketContract.cancelOffer(tokenId);
        await tx.wait();
        console.log("Offer canceled successfully");
      } catch (error) {
        console.error("Error canceling offer:", error);
      }
    }
  };
  const acceptOffer = async (tokenId) => {
    if (marketContract) {
      try {
        const tx = await marketContract.acceptOffer(tokenId);
        await tx.wait();
        console.log("Offer accepted successfully");
      } catch (error) {
        console.error("Error accepting offer:", error);
      }
    }
  };
  const depositForOffer = async (tokenId, value) => {
    if (marketContract) {
      try {
        const tx = await marketContract.depositForOffer(tokenId, { value });
        await tx.wait();
        console.log("NFT bought successfully");
      } catch (error) {
        console.error("Error buying NFT:", error);
      }
    }
  };

  const value = {
    account,
    marketContract,
    mintNFT,
    listNFT,
    owner
    // onTokenMinted,
    // setOnTokenMinted,

    // Add your functions here
  };

  return (
    <NFTMarketplaceContext.Provider value={value}>
      {children}
    </NFTMarketplaceContext.Provider>
  );
};
