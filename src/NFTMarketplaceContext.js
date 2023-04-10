import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import NFTMarketplace from './NFTMarketplace.json';

const NFTMarketplaceContext = createContext();

export const useNFTMarketplace = () => {
  return useContext(NFTMarketplaceContext);
};

export const NFTMarketplaceProvider = ({ children }) => {
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [marketContract, setMarketContract] = useState();
  const [account, setAccount] = useState();

  useEffect(() => {
    const init = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      const signer = provider.getSigner();
      const marketContract = new ethers.Contract(
        "0x0165878A594ca255338adfa4d48449f69242Eb8F",
        NFTMarketplace.abi,
        signer
      );

      setProvider(provider);
      setSigner(signer);
      setMarketContract(marketContract);
    };

    init();
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

  // Add your functions like mintNFT, createOffer, cancelOffer, etc.
  const mintNFT = async (recipient, tokenURI) => {
    if (marketContract) {
      try {
        const tx = await marketContract.mintNFT(recipient, tokenURI);
        await tx.wait();
        console.log("NFT minted successfully",tx);
        return tx
      } catch (error) {
        console.error("Error minting NFT:", error);
        return error
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
    // Add your functions here
  };

  return (
    <NFTMarketplaceContext.Provider value={value}>
      {children}
    </NFTMarketplaceContext.Provider>
  );
};
