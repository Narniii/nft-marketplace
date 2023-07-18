import { Box, CircularProgress, InputBase, MenuItem, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../components/design/Colors";
import Navbar from "../../components/Navbar/Navbar";
import imageBG from '../../assets/image.png'
import SearchBox from "../../components/Navbar/SearchBox";
import { Add, ArrowDown2, Chart, Chart1, HambergerMenu, InfoCircle, Lock, Lock1, Menu, NotificationBing, PercentageCircle, PercentageSquare, Star, Star1 } from "iconsax-react";
import { ButtonLarge } from "../../components/design/Buttons";
import '../../styles.css'
import { useSelector } from "react-redux";
import AddModals from "../../components/NFTSingle/AddModals";
import WalletConnect from "../../components/Navbar/WalletConnect";
import { API_CONFIG, NFT_STORAGE_API_KEY } from "../../config";
import axios from "axios";
import SSelection from "../../components/Selection";
import { MARKET_API } from "../../utils/data/market_api";
import '../../styles.css'
import WalletConnectModal from "../../components/wallet/WalletConnectModal";
import { useWeb3React } from "@web3-react/core";
import { useNFTMarketplace } from "../../NFTMarketplaceContext";
import { ethers } from 'ethers';

const SwitchS = styled.label`
position: relative;
display: inline-block;
width: 55px;
height: 30px;
`
const SwitchInput = styled.input`
opacity: 0;
width: 0;
height: 0;
`
const Slide = styled.span`
position: absolute;
cursor: pointer;
top: 0;
left: 0;
right: 0;
bottom: 0;
/* background-color: #ccc; */
background: ${Colors.gray0};
-webkit-transition: .4s;
transition: .4s;
border: 0.5px solid #D9D9D9;
&:before{
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  // left: 1px;
  // right: 1px;
  bottom: 1px;
  top: 1px;
  background:${Colors.gradiantGray};
  /* background: inherit; */
  -webkit-transition: .4s;
  transition: .4s;
  border-radius:50px;
}
`


const FieldsContainer = styled.div`
    border-radius: 24px;
    background: ${({ theme }) => theme.profilePageGradient};
    display: flex;
    flex-direction: column;
    justify-content:space-between;
`;
const Line = styled.div`
  height:1px;
  width:70%;
  justify-self:center;
  margin:40px auto;
  transform: matrix(-1, 0, 0, 1, 0, 0);
  background: ${({ theme }) => theme.navBorderBackground};
`
const InputBox = styled.div`
border:${({ theme }) => theme.searchBoxBorder};
box-shadow:${({ theme }) => theme.searchBoxShadow};
border-radius:30px;
background:transparent;
width:100%;
// @media screen and (max-width: 575px) {
//   width:100%;
// }
`;
const AddButton = styled.div`
background:${Colors.gradientPurpleStandard};
border-radius:12px;
width:40px;
height:40px;
display:flex;
justify-content:center;
align-items:center;
color:white;
border:1px solid ${Colors.gray2};
cursor:pointer;
`;
const Inf = styled.p`
color:${({ theme }) => theme.textSub};
margin:0;
`;
const InfP = styled.p`
color:${({ theme }) => theme.textSub};
margin:0;
@media screen and (max-width: 700px) {
    width:250px;
}
@media screen and (max-width: 400px) {
    width:150px;
}

`;
const ChainSelect = styled.select`
background:${({ theme }) => theme.itemCardsBackground};
border-radius: 24px;
border:none;
box-shadow:${({ theme }) => theme.boxShadow};
height:50px;
font-weight:600;
color:${({ theme }) => theme.text};
padding:16px;
-webkit-appearance:none;
-moz-appearance:none;
appearance:none;
width:100%;
`;


const CreateNFT = ({ theme, themeToggler }) => {
    const controller = new AbortController();

    const [nft, setNft] = useState({
        img: undefined,
        name: '',
        description: '',
        collection: -1,
        supply: '',
        royalty: '',
        price: ''
    })
    const [loading, setLoading] = useState(true)
    const [apiLoading, setApiLoading] = useState(false)
    const [successMesssage, setSuccessMesssage] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const [collectionErr, setCollectionErr] = useState(undefined)
    const [fetchedCollections, setFetchedCollections] = useState([])
    const [userColNames, setUserColNames] = useState([])
    const [logo, setLogo] = useState(imageBG);
    const [logoErr, setLogoErr] = useState(undefined)
    const apiCall = useRef(undefined)
    const [properties, setProperties] = useState([{ name: "", value: "" }])
    const [royalties, setRoyalties] = useState([{ wallet_address: '', royalty: '' }])
    const [levels, setLevels] = useState([{ name: '', value: '', count: '' }])
    const [stats, setStats] = useState([{ name: '', value: '', count: '' }])
    const [funds, setFunds] = useState([])
    const [addProperties, setAddProperties] = useState(false)
    const [addLevels, setAddLevels] = useState(false)
    const [addStats, setAddStats] = useState(false)
    const [addRoyalties, setAddRoyalties] = useState(false)
    const globalUser = useSelector(state => state.userReducer);
    const [walletMenu, setWalletMenu] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [chainValue, setChainValue] = useState(undefined)
    const [collectionValue, setCollectionValue] = useState('choose collection')
    const [isFreezed, setIsFreezed] = useState(0)
    const [unlockableContent, setunlockableContent] = useState(false)
    const [sensetiveContent, setsensetiveContent] = useState(false)
    const [copies, setCopies] = useState(1)
    const [collectionRoyalties, setCollectionRoyalties] = useState(undefined)




    // for using in contract calls ==>  account of the user ,  mintNFT function , owner of the contract , tokens of user
    const { account, mintNFT, owner, tokensOfOwner } = useNFTMarketplace();


    // const [mintedTokenId, setMintedTokenId] = useState(null);

    // const handleTokenMinted = (tokenId, recipient) => {
    //     console.log("TokenMinted event received:", tokenId, recipient);
    //     setMintedTokenId(tokenId);
    //     // Do something with tokenId and recipient, like updating your component's state
    // };
    // useEffect(() => {
    //     setOnTokenMinted(handleTokenMinted);

    //     return () => {
    //         setOnTokenMinted(null);
    //     };
    // }, [setOnTokenMinted]);



    // get tokens of owner ==>

    // const OwnerTokens = async () => {
    //     let tx = await tokensOfOwner(globalUser.walletAddress)
    //     console.log(tx)
    // }
    // useEffect(() => {
    //     OwnerTokens()
    // }, [])


    const handleChainSelect = (e) => {
        e.preventDefault()
        setChainValue(e.target.id)
    }
    const handleCollectionSelect = (e) => {
        e.preventDefault()
        console.log(e.target.id)
        setCollectionValue(e.target.id)
        for (var t = 0; t < fetchedCollections.length; t++) {
            if (fetchedCollections[t].title == e.target.id) {
                console.log('hellllloooooooo?????', fetchedCollections[t].title)
                console.log('hellllloooooooo?????', fetchedCollections[t].perpetual_royalties)
                setRoyalties(fetchedCollections[t].perpetual_royalties)
                var n = { ...nft }
                n.collection = fetchedCollections[t]._id.$oid
                setNft(n)
            }
        }
    }
    const [walletConnect, setWalletConnect] = useState(false)
    const walletDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setWalletMenu({ ...walletMenu, [anchor]: open });
    };
    const handleClose = () => {
        setAddProperties(false)
        setAddLevels(false)
        setAddRoyalties(false)
        setAddStats(false)
    }
    const onLogoChange = (e) => {
        var n = { ...nft };
        if (e.target.files && e.target.files[0] && e.target.files[0].type.indexOf("image") !== -1) {
            setLogoErr(undefined)
            n.img = e.target.files[0];
            const [file] = e.target.files;
            setLogo(URL.createObjectURL(file));
            setNft(n);
        }
        else {
            n[e.target.name] = undefined;
            setNft(n);
            setLogo(imageBG)
            setLogoErr("Selected file is not an image")
        }
    }
    useEffect(() => {
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])
    const onChange = e => {
        var n = { ...nft };
        n[e.target.name] = e.target.value;
        setNft(n);
    }
    const fetchCollections = async () => {
        const formData = new FormData();
        const tempColls = []
        // formData.append("user_id", userDetails.userId)
        formData.append("wallet_address", globalUser.walletAddress)
        try {
            const response = await axios({
                method: "post",
                url: `${API_CONFIG.MARKET_API_URL}/collection/user/`,
                data: formData,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                signal: controller.signal
            });
            console.log(response)
            if (response.status == 200) {
                setFetchedCollections(response.data.data)
                for (var n = 0; n < response.data.data.length; n++)
                    tempColls.push(response.data.data[n].title)
                setUserColNames(tempColls)
                setLoading(false)
            }
        }
        catch (err) {
            console.log(err)
            if (err.response.data.message === "No Collection Found") {
                setFetchedCollections([])
                setLoading(false)
            }
            else setErr(err)
        }
    }
    useEffect(() => {
        if (globalUser.isLoggedIn)
            fetchCollections()
    }, [globalUser])

    function makeCollection(length) {
        let result = 'youwho-';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }
    const saveLevels = (lv) => {
        setLevels(lv)
        handleClose()

    }
    const saveStats = (st) => {
        setStats(st)
        handleClose()

    }
    const saveRoyalties = (rt) => {
        console.log(rt)
        setRoyalties(rt)
        handleClose()

    }
    const saveProperties = (pr) => {
        console.log(pr)
        setProperties(pr)
        handleClose()
    }
    const handleSubmit = async (e) => {
        console.log()

        e.preventDefault()
        setApiLoading(true)
        setCollectionErr(undefined)
        setSuccessMesssage(undefined)
        setErr(undefined)
        if (nft.img === undefined) {
            setErr('Please select an image for your NFT image.')
            setApiLoading(false)
            return
        }
        else if (nft.name.length == 0) {
            setErr('Please enter your NFT name')
            setApiLoading(false)
            return
        }
        else if (nft.description.length == 0) {
            setErr('Please enter your NFT description.')
            setApiLoading(false)
            return
        }
        // else if (nft.collection === -1) {
        //     setCollectionErr(true)
        //     setApiLoading(false)
        //     return
        // }
        // else if (nft.supply.length == 0) {
        //     setErr('Please enter your NFT supply.')
        //     setApiLoading(false)
        //     return
        // }
        // else if (nft.price.length == 0) {
        //     setErr('Please enter your NFT price.')
        //     setApiLoading(false)
        //     return
        // }
        else {
            setErr(undefined)
            setCollectionErr(undefined)
        }
        let _royalties = [...royalties]
        // _royalties.push(
        //     { wallet_address: "", royalty: 2 },
        // )
        let sum = 0;
        for (const r of _royalties) {
            r.royalty = parseInt(r.royalty)
            sum += r.royalty;
        }
        if (sum > 12) {
            setErr("sum of royalties cannot be more than 10%")
            setApiLoading(false)
            return
        }

        var ipfsFileCid = ' '
        var ipfsFileUrl = ' '

        // var ipfsCid = await ipfsUpload()
        // var ipfsUrl = `https://${ipfsCid}.ipfs.dweb.link/`
        // var ipfsFileCid = undefined
        // var ipfsFileUrl = undefined
        // if (properties.length != 0) {
        //     ipfsFileCid = await ipfsFileUpload()
        //     ipfsFileUrl = `https://${ipfsFileCid}.ipfs.dweb.link/`
        // }





        //------------------------ create a new random collection if there was no one-->

        let collection_id = "";
        if (nft.collection == -1) { //// user didn't select any collection
            //---------------------------- form data for creating a new collection 
            const formData = new FormData();
            formData.append('title', makeCollection(10));
            formData.append('description', " ");
            var extra = {}
            formData.append('extra', JSON.stringify(extra));
            formData.append('category', ' ');
            formData.append('creator', globalUser.walletAddress);
            formData.append('banner_image', nft.img);
            formData.append('logo', nft.img);
            formData.append('minted_at', "0");
            formData.append('chain', 'ethereum');
            formData.append('perpetual_royalties', JSON.stringify(_royalties));

            if (fetchedCollections.length > 0) {
                collection_id = fetchedCollections[0]._id.$oid
                createNFT(collection_id)
            }
            else {
                try {
                    apiCall.current = MARKET_API.request({
                        path: `/collection/create/`,
                        method: "post",
                        body: formData,
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    let response = await apiCall.current.promise;
                    console.log(response)
                    if (!response.isSuccess)
                        throw response
                    collection_id = response.data._id.$oid;
                    createNFT(collection_id)
                } catch (error) {
                    console.log(error)
                    setErr('please try again later')
                    setApiLoading(false)
                }
            }
        } else {
            collection_id = nft.collection;
            console.log('collection was selected is ok')
            createNFT(collection_id)
        }

    }
    const createNFT = async (collection_id) => {
        // var ipfsFileCid = ' '
        // var ipfsFileUrl = ' '
        var ipfsFileCid = undefined
        var ipfsFileUrl = undefined


        if (isFreezed == 1) {
            var ipfsCid = await ipfsUpload()
            var ipfsUrl = `https://${ipfsCid}.ipfs.dweb.link/`
            if (properties.length != 0 && properties[0].name.length !== 0) {
                ipfsFileCid = await ipfsFileUpload()
                ipfsFileUrl = `https://${ipfsFileCid}.ipfs.dweb.link/`
            }
        }

        let _royalties = [...royalties]

        const NFTData = new FormData();
        NFTData.append('title', nft.name);
        NFTData.append('description', nft.description);
        // var extra = []
        var extras = {};
        if (properties.length !== 0 && properties[0].name.length !== 0) {
            extras = properties
            console.log(extras)
        }
        var tleveles = {}
        var tstats = {}
        if (levels.length !== 0 && levels[0].name.length !== 0) {
            tleveles = levels
        }
        if (stats.length !== 0 && stats[0].name.length !== 0) {
            tstats = stats
        }

        console.log(extras)
        console.log(JSON.stringify(extras))
        console.log(JSON.stringify(properties))
        console.log(JSON.stringify(levels), '....', stats)

        let is_freezed = 0;
        NFTData.append('extra', JSON.stringify(extras));
        NFTData.append('media', isFreezed == 1 ? ipfsUrl : 'http://1.com');
        NFTData.append('collection_id', collection_id);
        NFTData.append('reference', ipfsFileCid ? JSON.stringify({ attributes: ipfsFileUrl }) : JSON.stringify({}));
        NFTData.append('image', nft.img);
        NFTData.append('expires_at', "0");
        NFTData.append('is_freezed', isFreezed);
        NFTData.append('price', ' ');
        NFTData.append('current_owner', globalUser.walletAddress)
        NFTData.append('perpetual_royalties', JSON.stringify(_royalties));
        NFTData.append('copies', parseInt(copies));
        NFTData.append('levels', JSON.stringify(tleveles));
        NFTData.append('stats', JSON.stringify(tstats));
        if (nft.link) {
            NFTData.append('links', nft.link);
        }
        try {
            apiCall.current = MARKET_API.request({
                path: `/nft/create/`,
                method: "post",
                body: NFTData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            let resp = await apiCall.current.promise;
            console.log('nft resp', resp)

            if (!resp.isSuccess)
                throw resp

            var ipfsFileCidForMint = undefined
            var ipfsFileUrlForMint = undefined
            var ipfsCidForMint = await ipfsUpload()
            var ipfsUrlForMint = `https://${ipfsCidForMint}.ipfs.dweb.link/`
            if (properties.length != 0 && properties[0].name.length !== 0) {
                ipfsFileCidForMint = await ipfsFileUpload()
                ipfsFileUrlForMint = `https://${ipfsFileCidForMint}.ipfs.dweb.link/`
            }
            mintNFTFunc(resp.data._id.$oid, ipfsUrlForMint, resp.data.nft_index)
            // setSuccessMesssage('NFT created successfully')
            // setApiLoading(false)
        }
        catch (err) {
            console.log('create nft err', err)
            setErr(err.statusText)
            setLoading(false)
            setApiLoading(false)
        }
    }
    const mintNFTFunc = async (id, tokenURIm, tokenId) => {
        // setMintedTokenId(null); // Reset tokenId state

        { console.log(tokenURIm) }
        // const recipient = account;
        const tokenURI = tokenURIm ? tokenURIm : ' ';

        let tx; //===> just to have a defined tx , for contarct calls remove this line and uncomment the line below
        // let tx = await mintNFT(recipient, tokenURI, tokenIn, parseInt(copies))
        // let tx_hash = tx.tx.hash ? tx.tx.hash : undefined  // main , uncomment this after cntract deloyment
        let tx_hash = ' '   //temp
        // let tokenId = tx.tokenId
        let this_time = new Date(Date.now())

        // uncomment the if-else statement if you wanted to uncomment the contract calls again ===>
        // if (tx_hash) {
        // const waitForTokenId = async () => {
        //     while (mintedTokenId === null) {
        //         await new Promise((resolve) => setTimeout(resolve, 100));
        //     }
        //     return mintedTokenId;
        // };

        // const tokenId = await waitForTokenId();

        // // Use tokenId in your logic
        // console.log("Token ID from event:", tokenId);

        try {
            apiCall.current = MARKET_API.request({
                path: `/nft/mint/`,
                method: "post",
                body: {
                    issued_at: this_time,
                    tx_hash: tx_hash,
                    nft_id: id,
                    // owners: [],
                    // price_history: [],
                    current_owner: globalUser.walletAddress,
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            let resp = await apiCall.current.promise;
            console.log('mint response', resp)

            if (!resp.isSuccess)
                throw resp
            editAssetActivity('mint', resp.data.copies, resp.data._id.$oid, resp.data, tokenId)
        }
        catch (err) {
            console.log('backend mint error:', err)
            if (err) {
                deleteNFT(id)
            }
            // <========= remove this if statement while readding the contract calls
        }



        // } else {
        //     console.log('nft is created but not minted')
        //     deleteNFT(id)
        // }
    }
    const editAssetActivity = async (event, copies, id, nft, tokenId) => {
        var this_time = parseFloat(new Date(Date.now()).getTime()) / 1000
        var tommorrow = parseFloat(new Date(Date.now()).getTime() + (24 * 60 * 60 * 1000));
        var defaultExp = tommorrow / 1000

        var assetTemp = []
        console.log('............', defaultExp, typeof (defaultExp))
        for (let t = 0; t < nft.asset_activity.length; t++) {
            var tempObj = {}
            tempObj.price = nft.asset_activity[t].price
            tempObj.expiration = parseFloat(new Date(nft.asset_activity[t].expiration).getTime()) / 1000
            tempObj.date = parseFloat(new Date(nft.asset_activity[t].date).getTime()) / 1000
            tempObj.from_wallet_address = nft.asset_activity[t].from_wallet_address
            tempObj.receiver_id = nft.asset_activity[t].receiver_id
            tempObj.copies = nft.asset_activity[t].copies
            tempObj.event = nft.asset_activity[t].event
            assetTemp.push(tempObj)
        }
        assetTemp.push({ event: event, expiration: parseFloat(0), price: '0', from_wallet_address: globalUser.walletAddress, receiver_id: '--', date: this_time, copies: copies })

        try {
            apiCall.current = MARKET_API.request({
                path: `/nft/edit/activities`,
                method: "post",
                body: {
                    nft_id: id,
                    asset_activity: JSON.stringify(assetTemp),
                    contract_id: tokenId
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            let resp = await apiCall.current.promise;
            console.log('edit activity resp', resp)
            if (!resp.isSuccess)
                throw resp
            setSuccessMesssage('NFT created and minted successfully')
            setApiLoading(false)
        } catch (error) {
            setErr(err.statusText)
            setApiLoading(false)
            deleteNFT(id)
        }
    }
    const ipfsUpload = async () => {
        try {
            const response = await axios({
                method: "post",
                url: `https://api.nft.storage/upload`,
                data: nft.img,
                headers: {
                    "Authorization": `Bearer ${NFT_STORAGE_API_KEY}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            console.log(response)
            if (response.status == 200) {
                return response.data.value.cid
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const ipfsFileUpload = async () => {
        try {
            const response = await axios({
                method: "post",
                url: `https://api.nft.storage/upload`,
                data: properties,
                headers: {
                    "Authorization": `Bearer ${NFT_STORAGE_API_KEY}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            console.log(response)
            if (response.status == 200) {
                return response.data.value.cid
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const deleteNFT = async (id) => {
        try {
            apiCall.current = MARKET_API.request({
                path: `/nft/delete/`,
                method: "post",
                body: {
                    nft_id: id
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            let resp = await apiCall.current.promise;
            console.log('delete response', resp)
            if (!resp.isSuccess)
                throw resp
            setErr('minting canceled ! Please Try Again Later')
            setApiLoading(false)
        }
        catch (err) {
            console.log('backend delete error:', err)
        }

    }
    const { active, } = useWeb3React()
    const changeIsFreezed = () => {
        if (isFreezed == 0) { setIsFreezed(1) }
        else { setIsFreezed(0) }
    }
    return (
        <>
            <div className="pdng mb-5">
                <Navbar theme={theme} themeToggler={themeToggler} />
                {globalUser.isLoggedIn && active ?
                    <div className="d-flex flex-column px-0 py-2">
                        <h5 className="my-4" style={{ fontWeight: 600 }}>Create New Item</h5>
                        <FieldsContainer className="p-2 p-sm-4">
                            {/* first section fields */}
                            <div className="p-0 d-flex flex-column flex-lg-row-reverse justify-content-between">
                                <div className="col-12 col-sm-7 col-lg-6 d-flex justify-content-start justify-content-lg-end align-items-center">
                                    <Box sx={{
                                        border: `2px dashed ${Colors.gray1}`,
                                        width: { xs: '100%', md: '400px' },
                                        height: { xs: '350px', lg: '100%' },
                                        borderRadius: '20px',
                                        position: 'relative',
                                        margin: { xs: '0 auto', sm: 0 }
                                    }}>
                                        <label onChange={onLogoChange} htmlFor="logo">
                                            <input type="file" name="logo" id="logo" hidden />
                                            <div style={{
                                                width: '100%',
                                                height: '100%',
                                                backgroundImage: `url(${logo})`, backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                borderRadius: '20px',
                                                cursor: 'pointer',
                                                position: 'absolute',
                                                backgroundSize: 'contain',
                                                backgroundRepeat: 'no-repeat',
                                                top: 0,
                                                right: 0
                                            }} />
                                        </label>
                                    </Box>
                                </div>
                                <div className="col-12 col-sm-9 col-lg-6 col-xl-5 d-flex flex-column justify-content-between align-content-between">
                                    <div className="w-100 d-flex flex-column p-0 mt-5 mt-lg-0" style={{ margin: '0 0 14px 0' }}>
                                        <p style={{ fontWeight: 500, margin: 0 }} className='mb-1'>name</p>
                                        <InputBox className="py-2 px-3 d-flex justify-content-between">
                                            <div className="col-11 p-0">
                                                <InputBase
                                                    name="name"
                                                    onChange={onChange}
                                                    sx={{ color: "inherit", width: "100%", height: "100%" }}
                                                    placeholder="your item's name"
                                                    inputProps={{ 'aria-label': 'enter email' }}
                                                />
                                            </div>
                                            <div className="col-1 p-0 text-center d-flex justify-content-end align-items-center">
                                                {/* <NotificationBing size="14" /> */}
                                            </div>
                                        </InputBox>
                                    </div>


                                    <div className="w-100 d-flex flex-column p-0" style={{ margin: '14px 0' }}>
                                        <p style={{ fontWeight: 500, margin: 0 }} className='mb-1'>External link</p>
                                        <InputBox className="py-2 px-3 d-flex justify-content-between">
                                            <div className="col-11 p-0">
                                                <InputBase
                                                    name="link"
                                                    onChange={onChange}
                                                    sx={{ color: "inherit", width: "100%", height: "100%" }}
                                                    placeholder="https://google.com"
                                                    inputProps={{ 'aria-label': 'enter email' }}
                                                />
                                            </div>
                                            <div className="col-1 p-0 text-center d-flex justify-content-end align-items-center">
                                                {/* <NotificationBing size="14" /> */}
                                            </div>
                                        </InputBox>
                                    </div>


                                    <div className="w-100 d-flex flex-column p-0" style={{ margin: '14px 0' }}>
                                        <p style={{ fontWeight: 500, margin: 0 }} className='mb-1'>Description</p>
                                        <InputBox className="py-2 px-3 d-flex justify-content-between">
                                            <div className="col-11 p-0">
                                                <InputBase
                                                    name="description"
                                                    onChange={onChange}
                                                    sx={{ color: "inherit", width: "100%", height: "100%" }}
                                                    placeholder="description of your item"
                                                    inputProps={{ 'aria-label': 'enter email' }}
                                                />
                                            </div>
                                            <div className="col-1 p-0 text-center d-flex justify-content-end align-items-center">
                                                {/* <NotificationBing size="14" /> */}
                                            </div>
                                        </InputBox>
                                    </div>

                                    <div className="w-100 d-flex flex-column p-0" style={{ margin: '14px 0' }}>
                                        <p style={{ fontWeight: 500, margin: 0 }} className='mb-1'>collection</p>
                                        {userColNames.length !== 0 ?
                                            <SSelection id={'create-nft-collections'} tabs={userColNames} width={'100%'} handleSelect={handleCollectionSelect} selectValue={collectionValue} theme={theme} />
                                            :
                                            <SSelection id={'create-nft-collections'} theme={theme} width={'100%'} tabs={['no collection']} />
                                        }
                                    </div>

                                </div>
                            </div>

                            <Line />
                            {/* second section fields */}
                            <div className="col-12 col-sm-9 col-lg-6 col-xl-5 d-flex flex-column justify-content-between align-items-start">
                                <div style={{ margin: '12px 0' }} className=" w-100 d-flex flex-row p-0 justify-content-between align-items-center">
                                    <div className="d-flex align-items-center justify-content-start"><Inf><HambergerMenu size="26" className="me-1" /></Inf><div className="ms-1 d-flex flex-column justify-content-center align-items-start">
                                        <p style={{ fontWeight: 500, margin: 0, fontSize: "14px" }}>Properties</p><InfP style={{ fontSize: "12px" }}>Textual traits that show up as rectangles</InfP></div></div>
                                    <AddButton onClick={() => setAddProperties(true)}><Add size="20" /></AddButton>
                                </div>

                                <div style={{ margin: '12px 0' }} className=" w-100 d-flex flex-row p-0 justify-content-between align-items-center">
                                    <div className="d-flex align-items-center justify-content-start"><Inf><Star1 size="26" className="me-1" /></Inf><div className="ms-1 d-flex flex-column justify-content-center align-items-start">
                                        <p style={{ fontWeight: 500, margin: 0, fontSize: "14px" }}>Levels</p><InfP style={{ fontSize: "12px" }}>Numerical traits that show as a progress bar</InfP></div></div>
                                    <AddButton onClick={() => setAddLevels(true)}><Add size="20" /></AddButton>
                                </div>

                                <div style={{ margin: '12px 0' }} className=" w-100 d-flex flex-row p-0 justify-content-between align-items-center">
                                    <div className="d-flex align-items-center justify-content-start"><Inf><Chart1 size="26" className="me-1" /></Inf><div className="ms-1 d-flex flex-column justify-content-center align-items-start">
                                        <p style={{ fontWeight: 500, margin: 0, fontSize: "14px" }}>Stats</p><InfP style={{ fontSize: "12px" }}>Numerical traits that just show as numbers</InfP></div></div>
                                    <AddButton onClick={() => setAddStats(true)}><Add size="20" /></AddButton>
                                </div>


                                <div style={{ margin: '12px 0' }} className=" w-100 d-flex flex-row p-0 justify-content-between align-items-center">
                                    <div className="d-flex align-items-center justify-content-start"><Inf><Lock1 size="26" className="me-1" /></Inf><div className="ms-1 d-flex flex-column justify-content-center align-items-start">
                                        <p style={{ fontWeight: 500, margin: 0, fontSize: "14px" }}>Unlockable Content</p><InfP style={{ fontSize: "12px" }}>Include unlockable content that can only be revealed by the owner of the item.</InfP>
                                    </div>
                                    </div>
                                    <SwitchS className="switch">
                                        <SwitchInput type="checkbox" checked={unlockableContent ? true : false} onChange={() => setunlockableContent(!unlockableContent)} />
                                        <Slide className="slider round"></Slide>
                                    </SwitchS>

                                </div>

                                <div style={{ margin: '12px 0' }} className=" w-100 d-flex flex-row p-0 justify-content-between align-items-center">
                                    <div className="d-flex align-items-center justify-content-start"><Inf><InfoCircle size="26" className="me-1" /></Inf><div className="ms-1 d-flex flex-column justify-content-center align-items-start">
                                        <p style={{ fontWeight: 500, margin: 0, fontSize: "14px" }}>Explicit & Sensitive Content</p>
                                        <InfP style={{ fontSize: "12px" }}>Set this item as explicit and sensitive contentinfo</InfP></div></div>
                                    <SwitchS className="switch">
                                        <SwitchInput type="checkbox" checked={sensetiveContent ? true : false} onChange={() => setsensetiveContent(!sensetiveContent)} />
                                        <Slide className="slider round"></Slide>
                                    </SwitchS>

                                </div>

                            </div>

                            <Line />
                            {/* third section fields */}
                            <div className="col-12 col-sm-9 col-lg-6 col-xl-5 d-flex flex-column justify-content-between align-items-start">
                                <div className="w-100 d-flex flex-column p-0 my-2">
                                    <p style={{ fontWeight: 500, margin: 0 }} className='mb-1'>Supply</p>
                                    <InputBox className="py-2 px-3 d-flex justify-content-between">
                                        <div className="col-11 p-0">
                                            <InputBase
                                                sx={{ color: "inherit", width: "100%", height: "100%" }}
                                                placeholder="1"
                                                inputProps={{ 'aria-label': 'enter copies' }}
                                                onChange={(e) => setCopies(e.target.value)}
                                                type="number"
                                            />
                                        </div>
                                        <div className="col-1 p-0 text-center d-flex justify-content-end align-items-center">
                                            {/* <NotificationBing size="14" /> */}
                                        </div>

                                    </InputBox>
                                </div>


                                <div className="w-100 d-flex flex-row p-0 justify-content-between my-2">
                                    <p style={{ fontWeight: 500, margin: 0 }} className='mb-1'>Freeze Metadata</p>
                                    <SwitchS className="switch">
                                        <SwitchInput type="checkbox" checked={isFreezed ? true : false} onChange={changeIsFreezed} />
                                        <Slide className="slider round"></Slide>
                                    </SwitchS>
                                    {/* 
                                    <InputBox className="py-2 px-3 d-flex justify-content-between">
                                        <div className="col-11 p-0">
                                            <InputBase
                                                sx={{ color: "inherit", width: "100%", height: "100%" }}
                                                placeholder="Example@gmail.com"
                                                inputProps={{ 'aria-label': 'enter email' }}
                                            />
                                        </div>
                                        <div className="col-1 p-0 text-center d-flex justify-content-end align-items-center">
                                        <NotificationBing size="14" /></di
                                        v>
                                    </InputBox> */}
                                </div>


                                <div className="w-100 d-flex flex-column p-0 my-2">
                                    <p style={{ fontWeight: 500, margin: 0 }} className='mb-1'>Blockchain</p>
                                    <SSelection id={'create-nft-chains'} tabs={['ethereum', 'solana', 'near']} width={'100%'} handleSelect={handleChainSelect} selectValue={chainValue} theme={theme} />
                                    {/* <label className="position-relative">
                                        <ChainSelect>
                                            <option>Ethereum</option>
                                            <option>Solana</option>
                                            <option>Near</option>
                                            <ArrowDown2 />
                                        </ChainSelect>
                                        <div className="position-absolute top-50 translate-middle end-0" ><ArrowDown2 /></div>
                                    </label> */}
                                </div>



                                {apiLoading ? <ButtonLarge className="mt-5 mb-3" >
                                    {/* <CircularProgress sx={{ color: "white" }} /> */}...
                                </ButtonLarge> :
                                    <ButtonLarge className="mt-5 mb-3" onClick={handleSubmit}>save</ButtonLarge>}

                            </div>


                            {/* error and success messages */}
                            <div className="col-12 col-sm-9 col-lg-6 col-xl-5 d-flex flex-column justify-content-between align-items-center">
                                {apiLoading ? <Typography sx={{ fontSize: "12px", textTransform: `${Colors.subtitleFont}`, color: `${Colors.primaryMain}` }}>This May Take A While,Please Wait</Typography>
                                    : undefined}
                                {err ? <Typography sx={{ fontSize: "12px", textTransform: `${Colors.subtitleFont}`, color: `${Colors.errorDark}` }}>{err}</Typography> : undefined}
                                {successMesssage ? <Typography sx={{ fontSize: "12px", textTransform: `${Colors.subtitleFont}`, color: `${Colors.successDark}` }}>{successMesssage}</Typography> : undefined}
                            </div>

                        </FieldsContainer>
                    </div>
                    : <div className="d-flex my-5 justify-content-center align-items-center">
                        <ButtonLarge onClick={() => { setWalletConnect(!walletConnect) }}>connect wallet</ButtonLarge>
                        <WalletConnectModal open={walletConnect} handleClose={() => setWalletConnect(false)} theme={theme} />
                    </div>
                }
            </div>

            <AddModals prevProperties={properties} saveLevels={saveLevels} saveStats={saveStats} prevLevels={levels} prevStats={stats} saveProperties={saveProperties} saveRoyalties={saveRoyalties} openRoyalties={addRoyalties} openStats={addStats} openLevels={addLevels} openProperties={addProperties} handleClose={handleClose} theme={theme} />
        </>
    );
}

export default CreateNFT;