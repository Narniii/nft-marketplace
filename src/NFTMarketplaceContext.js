import React, { createContext, useContext, useState, useEffect } from 'react';
import { BigNumber, ethers } from 'ethers';
import NFTMarketplace from './artifacts/contracts/Market.sol/NFTMarketplace.json';
import { parseEther } from 'ethers/lib/utils';
import Web3 from 'web3';

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
  const mintNFT = async (recipient, tokenURI, tokenIn, copies) => {
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

        // step 1) create uudi nft id to a 32 bytes (64 chras) hex string
        // step 2) build the big number from above step using BigNumber.fromHexString(nft_id_hex)
        // step 3) pass the created big number to contract 

        let newTokenIn = tokenIn + 10
        let bigNumberTokenId = BigNumber.from(tokenIn)
        console.log('bigNumberTokenId', bigNumberTokenId)
        const tx = await onlyOwnerContrasct.mintNFT(recipient, tokenURI, bigNumberTokenId, copies);
        console.log("NFT minted successfully", tx);

        //another way to get token id ====>


        // const txReceipt = await tx.wait();
        // console.log("txReceipt", txReceipt);
        // const [transferEvent] = txReceipt.events;
        // const { tokenId } = transferEvent.args;
        // console.log("tokenId", tokenId);

        //another way to get token id ====>



        // onlyOwnerContrasct.on("TokenMinted", (tokenId, recipient, event) => {
        //   console.log("TokenMinted event received:", tokenId, recipient);
        // });
        txObj.tx = tx
        txObj.tokenId_BigNumber = bigNumberTokenId
        txObj.tokenId = bigNumberTokenId
        return txObj

      } catch (error) {
        console.error("Error minting NFT:", error);
        return error
      }
    }
  };
  const listNFT = async (tokenId, price) => {
    console.log('price parseetger', price)
    if (marketContract) {
      try {
        let bigNumberTokenId = BigNumber.from(tokenId)

        const integerPrice = Math.round(parseFloat(price) * 100);
        const bigNumberPrice = BigNumber.from(integerPrice);
        const priceToList = parseEther(price)

        const tx = await marketContract.listNFT(bigNumberTokenId, priceToList);
        await tx.wait();
        console.log("NFT listed successfully", tx);
        return tx
      } catch (error) {
        console.error("Error listing NFT:", error);
        return error
      }
    }
  };
  const createAuction = async (tokenId, duration) => {
    if (marketContract) {
      try {

        let bigNumberTokenId = BigNumber.from(tokenId)

        const tx = await marketContract.createAuction(bigNumberTokenId, duration);
        await tx.wait();
        console.log("auction created successfully", tx);
        return tx
      } catch (error) {
        console.error("Error creating auction:", error);
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
  const removeOffer = async (tokenId, index) => {
    if (marketContract) {
      try {
        let bigNumberTokenId = BigNumber.from(tokenId)
        const tx = await marketContract.removeOffer(bigNumberTokenId, index);
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
        let bigNumberTokenId = BigNumber.from(tokenId)
        const priceToOffer = parseEther(value)


        // const gasPrice = signer.gasPrice();
        // const gasLimit = marketContract.estimateGas.depositForOffer(bigNumberTokenId, { value:priceToOffer });
        // const tx = await marketContract.depositForOffer(bigNumberTokenId,{gasLimit:gasLimit,gasPrice:gasPrice});

        const tx = await marketContract.depositForOffer(bigNumberTokenId, { value: priceToOffer });
        await tx.wait();
        console.log("deposit successfully", tx);
        return tx
      } catch (error) {
        console.error("Error deposit:", error);
        return error
      }
    }
  };
  const tokensOfOwner = async (_owner) => {
    console.log('ghable if ...')
    if (marketContract) {
      console.log('tuye if ...v')
      try {
        const tx = await marketContract.tokensOfOwner(process.env.REACT_APP_MARKET_ADDRESS, _owner);
        // await tx.wait();
        console.log("tokens ................", tx);
      } catch (error) {
        console.error("Error tokens:", error);
      }
    }
  };
  const placeBid = async (tokenId, bidValue) => {
    if (marketContract) {
      try {
        let bigNumberTokenId = BigNumber.from(tokenId)
        const priceToBid = parseEther(bidValue)
        const tx = await marketContract.placeBid(bigNumberTokenId, {
          value: priceToBid,
        });
        await tx.wait();
        console.log("Bid placed successfully", tx);
        return tx;
      } catch (error) {
        console.error("Error placing bid:", error);
        return error;
      }
    }
  };
  const addOffer = async (tokenId, price) => {
    if (marketContract) {
      try {
        let bigNumberTokenId = BigNumber.from(tokenId)
        const priceToOffer = parseEther(price)
        const tx = await marketContract.addOffer(bigNumberTokenId, priceToOffer);
        await tx.wait();
        console.log("offer placed successfully", tx);
        return tx;
      } catch (error) {
        console.error("Error placing offer:", error);
        return error;
      }
    }
  };
  const cancelAuction = async (tokenId) => {
    if (marketContract) {
      try {
        let bigNumberTokenId = BigNumber.from(tokenId)
        const tx = await marketContract.addOffer(bigNumberTokenId);
        await tx.wait();
        console.log("auction canceled successfully", tx);
        return tx;
      } catch (error) {
        console.error("Error canceling auction:", error);
        return error;
      }
    }
  };
  const completePurchase = async (product, product2) => {
    var web3 = new Web3(window.ethereum)

    var buyNFTsContract = new web3.eth.Contract(
      NFTMarketplace.abi,
      process.env.REACT_APP_MARKET_ADDRESS,
      // signer
    );
    console.log(buyNFTsContract)

    // if (marketContract) {
    //   try {
    //     const batcherAddress = process.env.REACT_APP_MARKET_ADDRESS

    //     let bigNumberTokenId = BigNumber.from(product.nft_index)
    //     const priceToBuy = parseEther(product.price)


    //     let batcher = new Batcher({ web3, batcherAddress })


    //     const tx1 = marketContract.buyNFT(bigNumberTokenId, product.royaltyRecs, product.royaltyAmounts, parseInt(product.quantity), { value: priceToBuy })
    //     const tx2 = marketContract.buyNFT(bigNumberTokenId, product2.royaltyRecs, product2.royaltyAmounts, parseInt(product2.quantity), { value: priceToBuy })

    //     const receipt = await batcher.sendTransaction([tx1, tx2])
    //     console.log(receipt.events)


    //   } catch (error) {
    //     console.error("Error canceling buying:", error);
    //     return error;
    //   }
    // }


    // if (buyNFTsContract) {
    //   try {
    //     let bigNumberTokenId = BigNumber.from(product.nft_index)
    //     const priceToBuy = parseEther(product.price)
    //     var batch = new web3.BatchRequest();
    //     batch.add(buyNFTsContract.methods.buyNFT(bigNumberTokenId, product.royaltyRecs, product.royaltyAmounts, parseInt(product.quantity)).call.request({ from: account }, (err, res) => {
    //       console.log('err batch ??', err)
    //       console.log('res batch ??', res)
    //     }));
    //     batch.execute();
    //   } catch (error) {
    //     console.error("Error canceling buying:", error);
    //     return error;
    //   }
    // }
    //----------
    // if (marketContract) {
    // let bigNumberTokenId = BigNumber.from(tokenId)
    // const tx = await marketContract.addOffer(bigNumberTokenId);
    // await tx.wait();
    // console.log("auction canceled successfully", tx);
    // return tx;
    // }
  };


  const value = {
    account,
    marketContract,
    owner,

    mintNFT,
    listNFT,
    tokensOfOwner,
    createAuction,
    placeBid,
    depositForOffer,
    addOffer,
    removeOffer,
    cancelAuction,
    completePurchase,
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
