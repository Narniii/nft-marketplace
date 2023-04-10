import { Box, CircularProgress, InputBase, LinearProgress, MenuItem, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../components/design/Colors";
import Navbar from "../../components/Navbar/Navbar";
import imageBG from '../../assets/image.png'
import SearchBox from "../../components/Navbar/SearchBox";
import { Add, ArrowDown2, Chart, Chart1, HambergerMenu, InfoCircle, Lock, Lock1, NotificationBing, PercentageCircle, PercentageSquare, Star, Star1 } from "iconsax-react";
import { ButtonLarge, ButtonOutline, ButtonOutlineLarge } from "../../components/design/Buttons";
import '../../styles.css'
import { useSelector } from "react-redux";
import AddModals from "../../components/NFTSingle/AddModals";
import WalletConnect from "../../components/Navbar/WalletConnect";
import { API_CONFIG, NFT_STORAGE_API_KEY } from "../../config";
import axios from "axios";
import SSelection from "../../components/Selection";
import { MARKET_API } from "../../utils/data/market_api";
import '../../styles.css'
import { Navigate, useNavigate, useParams } from "react-router";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import WalletConnectModal from "../../components/wallet/WalletConnectModal";
import { useWeb3React } from "@web3-react/core";
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
@media screen and (max-width: 600px) {
  width:100%;
}
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
//   left: 1px;
//   right: 1px;
  bottom: 1px;
  top: 1px;
  background:${Colors.gradiantGray};
  /* background: inherit; */
  -webkit-transition: .4s;
  transition: .4s;
  border-radius:50px;
}
`
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

const DeleteButton = styled.button`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 16px 12px;
// gap: 8px;
// width: 348px;
width:100px;
height: 56px;
background: ${Colors.errorDark};
mix-blend-mode: normal;
box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.15);
border-radius: 24px;
flex: none;
border:none;
color: white;
order: 1;
flex-grow: 0;
&:hover{
    background: ${Colors.errorMain};
}

`

const EditNft = ({ theme, themeToggler }) => {
    const controller = new AbortController();
    const { id } = useParams()
    console.log(id)
    const [nft, setNft] = useState({
        img: undefined,
        name: '',
        description: '',
        collection: -1,
        supply: '',
        royalty: '',
        price: ''
    })
    const [isCreator, setIsCreator] = useState(false)
    const [loading, setLoading] = useState(true)
    const [collectionLoading, setCollectionLoading] = useState(true)
    const [apiLoading, setApiLoading] = useState(false)
    const [successMesssage, setSuccessMesssage] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const [collectionErr, setCollectionErr] = useState(undefined)
    const [fetchedCollections, setFetchedCollections] = useState([])
    const [userColNames, setUserColNames] = useState([])
    const [logo, setLogo] = useState(undefined);
    const [logoErr, setLogoErr] = useState(undefined)
    const apiCall = useRef(undefined)
    const [properties, setProperties] = useState([])
    const [royalties, setRoyalties] = useState([])
    const [levels, setLevels] = useState([{ name: '', value: '', count: '' }])
    const [stats, setStats] = useState([{ name: '', value: '', count: '' }])
    const [funds, setFunds] = useState([])
    const [addProperties, setAddProperties] = useState(false)
    const [addLevels, setAddLevels] = useState(false)
    const [addStats, setAddStats] = useState(false)
    const [addRoyalties, setAddRoyalties] = useState(false)
    const globalUser = useSelector(state => state.userReducer);
    const [imageChanged, setImageChanged] = useState(false)
    const [walletMenu, setWalletMenu] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [chainValue, setChainValue] = useState(undefined)
    const [collectionValue, setCollectionValue] = useState('choose collection')
    const [isFreezed, setIsFreezed] = useState(0)
    const [unLockableContent, setunLockableContent] = useState(false)
    const [sensetiveContent, setsensetiveContent] = useState(false)
    const [copies, setCopies] = useState(1)
    const handleChainSelect = (e) => {
        e.preventDefault()
        setChainValue(e.target.id)
    }
    const navigate = useNavigate()
    const handleCollectionSelect = (e) => {
        e.preventDefault()
        console.log(e.target.id)
        setCollectionValue(e.target.id)
        for (var t = 0; t < fetchedCollections.length; t++) {
            if (fetchedCollections[t].title == e.target.id) {
                console.log('hellllloooooooo?????', fetchedCollections[t].title)
                var n = { ...nft }
                n.collection = fetchedCollections[t]._id.$oid
                setNft(n)
            }
        }
    }

    const walletDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setWalletMenu({ ...walletMenu, [anchor]: open });
    };

    const handleClose = () => {
        setAddProperties(false)
        setAddLevels(false)
        setAddStats(false)
        setAddRoyalties(false)
    }
    const onLogoChange = (e) => {
        var n = { ...nft };
        if (e.target.files && e.target.files[0] && e.target.files[0].type.indexOf("image") !== -1) {
            setLogoErr(undefined)
            n.img = e.target.files[0];
            const [file] = e.target.files;
            const createUrL = URL.createObjectURL(file)
            setLogo(`url(${createUrL})`)
            setNft(n);
            setImageChanged(true)
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
                setCollectionLoading(false)
            }
        }
        catch (err) {
            console.log(err)
            if (err.response.data.message === "No Collection Found") {
                setFetchedCollections([])
                setCollectionLoading(false)
            }
            else setErr(err)
        }
    }

    const fetchNFT = async () => {
        const formData = new FormData();
        // formData.append("user_id", userDetails.userId)
        formData.append("nft_id", id)
        try {
            const response = await axios({
                method: "post",
                url: `${API_CONFIG.MARKET_API_URL}/nft/get/`,
                data: formData,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                signal: controller.signal
            });
            console.log('nft?', response)
            if (response.status == 200) {
                var n = { ...nft };
                n.collection = response.data.data[0].collection_id;
                n.img = response.data.data[1].nft.nft_image_path;
                n.description = response.data.data[1].nft.description;
                n.name = response.data.data[1].nft.title;
                n.current_owner = response.data.data[1].nft.current_owner;
                n.price_history = response.data.data[1].nft.price_history;
                n.listings = response.data.data[1].nft.listings;
                n.asset_activity = response.data.data[1].nft.asset_activity;
                n.supply = response.data.data[1].nft.copies
                if (response.data.data[1].nft.links) {
                    n.link = response.data.data[1].nft.links
                }
                setCopies(response.data.data[1].nft.copies)
                if (response.data.data[1].nft.is_freezed == true) {
                    n.is_freezed = 1
                    setIsFreezed(1)
                } else {
                    setIsFreezed(0)
                }
                setNft(n)
                if (response.data.data[1].nft.extra.length !== 0 && response.data.data[1].nft.extra[0].name.length !== 0) {
                    setProperties(response.data.data[1].nft.extra)
                }
                if (response.data.data[1].nft.levels.length !== 0 && response.data.data[1].nft.levels[0].name.length !== 0) {
                    setLevels(response.data.data[1].nft.levels)
                }
                if (response.data.data[1].nft.stats.length !== 0 && response.data.data[1].nft.stats[0].name.length !== 0) {
                    setStats(response.data.data[1].nft.stats)
                }
                else {
                    setProperties([{ name: "", value: "" }])
                }
                setCollectionValue(response.data.data[0].collection_title)
                if (response.data.data[0].collection_creator !== globalUser.walletAddress) {
                    navigate('/404')
                }
                // setLogo(response.data.data[1].nft.nft_image_path)
                var cuttedURL = response.data.data[1].nft.nft_image_path.replace('root/dortzio/market/media/', '');
                setLogo(BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${cuttedURL}`)))
                setLoading(false)

            }
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (globalUser.isLoggedIn) {
            fetchCollections()
            fetchNFT()
        }
    }, [globalUser])


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
        e.preventDefault()
        setApiLoading(true)
        setCollectionErr(undefined)
        setSuccessMesssage(undefined)
        setErr(undefined)
        console.log(nft)
        console.log(isFreezed)
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
        else if (nft.is_freezed == 1) {
            setErr("Can't Edit NFT Because It's Freezed")
            setApiLoading(false)
            return
        }
        else if (nft.link && !nft.link.includes('http')) {
            setErr("Please use a https/http link for your nft")
            setApiLoading(false)
            return
        }
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


        const NFTData = new FormData();
        NFTData.append('nft_id', id);
        NFTData.append('title', nft.name);
        NFTData.append('description', nft.description);
        var extras = {};
        if (properties.length !== 0 && properties[0].name.length !== 0) {
            extras = properties
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
        console.log(JSON.stringify(levels), '....', stats)
        NFTData.append('media', isFreezed == 1 ? ipfsUrl : 'http://1.com');
        NFTData.append('collection_id', nft.collection);
        NFTData.append('reference', ipfsFileCid ? JSON.stringify({ attributes: ipfsFileUrl }) : JSON.stringify({}));
        NFTData.append('expires_at', "0");
        // NFTData.append('perpetual_royalties', JSON.stringify([{}]));
        NFTData.append('is_freezed', isFreezed);
        NFTData.append('price', ' ');
        NFTData.append('current_owner', nft.current_owner);
        NFTData.append('new_current_owner', '');
        NFTData.append('approved_account_ids', JSON.stringify({}));
        NFTData.append('extra', JSON.stringify(extras));
        NFTData.append('levels', JSON.stringify(tleveles));
        NFTData.append('stats', JSON.stringify(tstats));
        // NFTData.append('price_history', JSON.stringify(nft.price_history));
        // NFTData.append('listings', JSON.stringify(nft.listings));
        // NFTData.append('asset_activity', JSON.stringify(nft.asset_activity));
        NFTData.append('copies', parseInt(copies));
        if (imageChanged) {
            NFTData.append('image', nft.img);
        }
        if (nft.link) {
            NFTData.append('links', nft.link);
        }

        console.log(nft.current_owner)
        try {

            apiCall.current = MARKET_API.request({
                path: `/nft/edit/`,
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

            setSuccessMesssage('NFT updated successfully')
            setApiLoading(false)
        }
        catch (err) {
            console.log('edit nft err', err)
            setErr(err.statusText)
            setLoading(false)
            setApiLoading(false)
        }

    }
    const [walletConnect, setWalletConnect] = useState(false)

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

    const { active } = useWeb3React()

    const changeIsFreezed = () => {
        if (isFreezed == 0) { setIsFreezed(1) }
        else { setIsFreezed(0) }
    }

    const deleteNFT = async () => {
        setApiLoading(true)
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
            setSuccessMesssage('nft deleted !')
            setApiLoading(false)
        }
        catch (err) {
            setErr('something went wrong , please try again later')
            setApiLoading(false)
        }

    }

    return (
        <>
            <div className="pdng mb-5">
                <Navbar theme={theme} themeToggler={themeToggler} />
                {globalUser.isLoggedIn && active ?

                    <>{loading || collectionLoading ?
                        <LinearProgress color="secondary" sx={{ my: 55, mx: 5 }} />
                        : <>
                            <div className="d-flex flex-column px-0 py-2">
                                <h5 className="my-4" style={{ fontWeight: 600 }}>Edit {nft.name}</h5>
                                <FieldsContainer className="p-3">
                                    {/* first section fields */}
                                    <div className="p-0 d-flex flex-column flex-lg-row-reverse justify-content-between">
                                        <div className="col-12 col-sm-6 d-flex justify-content-end align-items-center">
                                            <Box sx={{
                                                border: `2px dashed ${Colors.gray1}`,
                                                width: { xs: '100%', md: '400px' },
                                                height: { xs: '350px', lg: '100%' },
                                                // width: '100%',
                                                // height: '100%',
                                                borderRadius: '20px',
                                                position: 'relative',
                                                margin: { xs: '0 auto', sm: 0 }
                                            }}>
                                                <label onChange={onLogoChange} htmlFor="logo">
                                                    <input type="file" name="logo" id="logo" hidden />
                                                    <div style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        backgroundImage: logo ? logo : `url(${imageBG})`, backgroundSize: 'cover',
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
                                        <div className="col-12 col-sm-9 col-lg-6 col-xl-5 d-flex flex-column justify-content-between align-items-start">
                                            <div className="w-100 d-flex flex-column p-0 mt-5 mt-lg-0" style={{ margin: '0 0 14px 0' }}>
                                                <p style={{ fontWeight: 500, margin: 0 }} className='mb-1'>name</p>
                                                <InputBox className="py-2 px-3 d-flex justify-content-between">
                                                    <div className="col-11 p-0">
                                                        <InputBase
                                                            name="name"
                                                            onChange={onChange}
                                                            sx={{ color: "inherit", width: "100%", height: "100%" }}
                                                            value={nft.name}
                                                            placeholder={nft.name}
                                                            inputProps={{ 'aria-label': 'enter email' }}
                                                        />
                                                    </div>
                                                    <div className="col-1 p-0 text-center d-flex justify-content-center align-items-center">
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
                                                            value={nft.link}
                                                            placeholder={nft.link ? nft.link : "https://google.com"}
                                                            inputProps={{ 'aria-label': 'enter email' }}
                                                        />
                                                    </div>
                                                    <div className="col-1 p-0 text-center d-flex justify-content-center align-items-center">
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
                                                            value={nft.description}
                                                            placeholder={nft.description}
                                                            inputProps={{ 'aria-label': 'enter email' }}
                                                        />
                                                    </div>
                                                    <div className="col-1 p-0 text-center d-flex justify-content-center align-items-center">
                                                        {/* <NotificationBing size="14" /> */}
                                                    </div>
                                                </InputBox>
                                            </div>

                                            <div className="w-100 d-flex flex-column p-0" style={{ margin: '14px 0' }}>
                                                <p style={{ fontWeight: 500, margin: 0 }} className='mb-1'>collection</p>
                                                {userColNames.length !== 0 ?
                                                    <SSelection id={'edit-nft-collections'} tabs={userColNames} width={'100%'} handleSelect={handleCollectionSelect} selectValue={collectionValue} theme={theme} />
                                                    :
                                                    <SSelection id={'edit-nft-collections'} theme={theme} width={'100%'} tabs={['no collection']} />
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <Line />
                                    {/* second section fields */}
                                    <div className="col-12 col-sm-9 col-lg-6 col-xl-5 d-flex flex-column justify-content-between align-items-start">
                                        <div style={{ margin: '12px 0' }} className="w-100 d-flex flex-row p-0 justify-content-between align-items-center">
                                            <div className="d-flex align-items-center justify-content-start"><Inf><HambergerMenu size="26" className="me-1" /></Inf><div className="ms-1 d-flex flex-column justify-content-center align-items-start">
                                                <p style={{ fontWeight: 500, margin: 0, fontSize: "14px" }}>Properties</p><InfP style={{ fontSize: "12px" }}>Textual traits that show up as rectangles</InfP></div></div>
                                            <AddButton onClick={() => setAddProperties(true)}><Add size="20" /></AddButton>
                                        </div>

                                        <div style={{ margin: '12px 0' }} className="w-100 d-flex flex-row p-0 justify-content-between align-items-center">
                                            <div className="d-flex align-items-center justify-content-start"><Inf><Star1 size="26" className="me-1" /></Inf><div className="ms-1 d-flex flex-column justify-content-center align-items-start">
                                                <p style={{ fontWeight: 500, margin: 0, fontSize: "14px" }}>Levels</p><InfP style={{ fontSize: "12px" }}>Numerical traits that show as a progress bar</InfP></div></div>
                                            <AddButton onClick={() => setAddLevels(true)}><Add size="20" /></AddButton>
                                        </div>

                                        <div style={{ margin: '12px 0' }} className="w-100 d-flex flex-row p-0 justify-content-between align-items-center">
                                            <div className="d-flex align-items-center justify-content-start"><Inf><Chart1 size="26" className="me-1" /></Inf><div className="ms-1 d-flex flex-column justify-content-center align-items-start">
                                                <p style={{ fontWeight: 500, margin: 0, fontSize: "14px" }}>Stats</p><InfP style={{ fontSize: "12px" }}>Numerical traits that just show as numbers</InfP></div></div>
                                            <AddButton onClick={() => setAddStats(true)}><Add size="20" /></AddButton>
                                        </div>


                                        <div style={{ margin: '12px 0' }} className="w-100 d-flex flex-row p-0 justify-content-between align-items-center">
                                            <div className="d-flex align-items-center justify-content-start"><Inf><Lock1 size="26" className="me-1" /></Inf><div className="ms-1 d-flex flex-column justify-content-center align-items-start">
                                                <p style={{ fontWeight: 500, margin: 0, fontSize: "14px" }}>Unlockable Content</p><InfP style={{ fontSize: "12px" }}>Include unlockable content that can only be revealed by the owner of the item.</InfP>
                                            </div>
                                            </div>
                                            <SwitchS className="switch">
                                                <SwitchInput type="checkbox" checked={unLockableContent ? true : false} onChange={() => setunLockableContent(!unLockableContent)} />
                                                <Slide className="slider round"></Slide>
                                            </SwitchS>
                                        </div>

                                        <div style={{ margin: '12px 0' }} className="w-100 d-flex flex-row p-0 justify-content-between align-items-center">
                                            <div className="d-flex align-items-center justify-content-start"><Inf><InfoCircle size="26" className="me-1" /></Inf><div className="ms-1 d-flex flex-column justify-content-center align-items-start">
                                                <p style={{ fontWeight: 500, margin: 0, fontSize: "14px" }}>Explicit & Sensitive Content</p><InfP style={{ fontSize: "12px" }}>Set this item as explicit and sensitive contentinfo</InfP></div></div>
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
                                                        // value={nft.supply}
                                                        placeholder={nft.supply ? nft.supply : 0}
                                                        inputProps={{ 'aria-label': 'enter supply' }}
                                                        onChange={(e) => setCopies(e.target.value)}
                                                        type="number"
                                                    />
                                                </div>
                                                <div className="col-1 p-0 text-center d-flex justify-content-center align-items-center">
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
                                                value={nft.name}
                                                placeholder="Example@gmail.com"
                                                inputProps={{ 'aria-label': 'enter email' }}
                                            />
                                        </div>
                                        <div className="col-1 p-0 text-center d-flex justify-content-end align-items-center">
                                        // <NotificationBing size="14" />
                                        </div>
                                    </InputBox> */}
                                        </div>


                                        <div className="w-100 d-flex flex-column p-0 my-2">
                                            <p style={{ fontWeight: 500, margin: 0 }} className='mb-1'>Blockchain</p>
                                            <SSelection id={'edit-nft-chains'} tabs={['ethereum', 'solana', 'near']} width={'100%'} handleSelect={handleChainSelect} selectValue={chainValue} theme={theme} />
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
                                            <div className="d-flex justify-content-between align-items-center w-100">
                                                <div className="mt-5 mb-3 col-8">
                                                    <ButtonLarge className="" onClick={handleSubmit}>save</ButtonLarge>
                                                </div>
                                                <div className="mt-5 mb-3 col-3">
                                                    <ButtonOutlineLarge onClick={deleteNFT}>Delete</ButtonOutlineLarge>
                                                </div>
                                            </div>

                                            // <ButtonLarge className="" onClick={handleSubmit}>Save</ButtonLarge>
                                        }


                                    </div>

                                    {/* error and success messages */}
                                    <div className="col-12 col-sm-9 col-lg-6 col-xl-5 d-flex flex-column justify-content-between align-items-center">
                                        {err ? <Typography sx={{ fontSize: "12px", color: `${Colors.errorDark}` }}>{err}</Typography> : undefined}
                                        {successMesssage ? <Typography sx={{ fontSize: "12px", color: `${Colors.successDark}` }}>{successMesssage}</Typography> : undefined}
                                    </div>

                                </FieldsContainer>
                            </div>
                            <AddModals prevProperties={properties} saveLevels={saveLevels} saveStats={saveStats} prevLevels={levels} prevStats={stats} saveProperties={saveProperties} saveRoyalties={saveRoyalties} openRoyalties={addRoyalties} openStats={addStats} openLevels={addLevels} openProperties={addProperties} handleClose={handleClose} theme={theme} />
                        </>
                    }
                    </>
                    : <div className="d-flex my-5 justify-content-center align-items-center">
                        <ButtonLarge onClick={() => { setWalletConnect(!walletConnect) }}>connect wallet</ButtonLarge>
                        <WalletConnectModal open={walletConnect} handleClose={() => setWalletConnect(false)} theme={theme} />
                    </div>

                }
            </div>

        </>
    );
}

export default EditNft;