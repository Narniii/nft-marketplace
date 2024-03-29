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
import { API_CONFIG } from "../../config";
import axios from "axios";
import SSelection from "../../components/Selection";
import { MARKET_API } from "../../utils/data/market_api";
import '../../styles.css'
import { categories } from "../../utils/Categories";
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
color:${({ theme }) => theme.info};
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


const CreateCollection = ({ theme, themeToggler }) => {
    const controller = new AbortController();

    const [collection, setCollection] = useState({
        logo: undefined,
        banner: undefined,
        name: '',
        description: '',
        category: '',
        royalties: [],
    })
    const [showOpenRarity, setShowOpenRarity] = useState(false)
    const [sensetiveContent, setsensetiveContent] = useState(false)
    const [loading, setLoading] = useState(true)
    const [apiLoading, setApiLoading] = useState(false)
    const [successMesssage, setSuccessMesssage] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const [collectionErr, setCollectionErr] = useState(undefined)
    const [fetchedCategories, setFetchedCategories] = useState([])
    const [logo, setLogo] = useState(imageBG);
    const [logoErr, setLogoErr] = useState(undefined)
    const [bannerError, setBannerError] = useState(undefined)
    const [banner, setBanner] = useState(imageBG)
    const apiCall = useRef(undefined)
    const [royalties, setRoyalties] = useState([{ wallet_address: ' ', royalty: '0' }])
    const [addRoyalties, setAddRoyalties] = useState(false)
    const globalUser = useSelector(state => state.userReducer);
    const [walletMenu, setWalletMenu] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [chainValue, setChainValue] = useState(undefined)
    const [categoryValue, setCategoryValue] = useState('choose category')
    const [isFreezed, setIsFreezed] = useState(false)
    const [anchorEl, setAnchorEl] = useState(window.document.getElementById("profile-tab"));
    const [walletConnect, setWalletConnect] = useState(false)
    const [links, setLinks] = useState(undefined)

    const handleChainSelect = (e) => {
        e.preventDefault()
        setChainValue(e.target.id)
    }
    const handleCategorieSelect = (e) => {
        e.preventDefault()
        console.log(e.target.id)
        setCategoryValue(e.target.id)
        var n = { ...collection }
        n.category = e.target.id
        setCollection(n)

        // for (var t = 0; t < fetchedCategories.length; t++) {
        //     if (fetchedCategories[t].title == e.target.id) {
        //         console.log('hellllloooooooo?????', fetchedCategories[t].title)
        //         var n = { ...collection }
        //         n.category = fetchedCategories[t].title
        //         setCollection(n)
        //     }
        // }
    }
    const handleClose = () => {
        // setAddProperties(false)
        // setAddFunds(false)
        setAddRoyalties(false)
    }
    const onLogoChange = (e) => {
        var n = { ...collection };
        if (e.target.files && e.target.files[0] && e.target.files[0].type.indexOf("image") !== -1) {
            setLogoErr(undefined)
            n.logo = e.target.files[0];
            const [file] = e.target.files;
            setLogo(URL.createObjectURL(file));
            setCollection(n);
        }
        else {
            n[e.target.name] = undefined;
            setCollection(n);
            setLogo(imageBG)
            setLogoErr("Selected file is not an image")
        }
    }
    const onBannerChange = (e) => {
        var n = { ...collection };
        if (e.target.files && e.target.files[0] && e.target.files[0].type.indexOf("image") !== -1) {
            setBannerError(undefined)
            n.banner = e.target.files[0];
            const [file] = e.target.files;
            setBanner(URL.createObjectURL(file));
            setCollection(n);
        }
        else {
            n[e.target.name] = undefined;
            setCollection(n);
            setBanner(imageBG)
            setBannerError("Selected file is not an image")
        }
    }
    useEffect(() => {
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])

    const onChange = e => {
        var n = { ...collection };
        n[e.target.name] = e.target.value;
        setCollection(n);
    }
    const fetchCategories = async () => {
        let tempCatArr = []
        for (var c = 0; c < categories.length; c++) {
            tempCatArr.push(categories[c].title)
        }
        setFetchedCategories(tempCatArr)
    }
    useEffect(() => {
        fetchCategories()
    }, [])
    const saveRoyalties = (rt) => {
        console.log(rt)
        setRoyalties(rt)
        handleClose()

    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(collection)
        setApiLoading(true)
        setCollectionErr(undefined)
        setSuccessMesssage(undefined)
        setErr(undefined)
        if (collection.logo === undefined) {
            setErr('Please select a logo image for your collection.')
            setApiLoading(false)
            return
        } else if (collection.banner === undefined) {
            setErr('Please select a banner image for your collection.')
            setApiLoading(false)
            return
        }
        else if (collection.name.length == 0) {
            setErr('Please enter your collection name')
            setApiLoading(false)
            return
        }
        else if (collection.description.length == 0) {
            setErr('Please enter your collection description.')
            setApiLoading(false)
            return
        }
        else if (collection.category.length == 0) {
            setErr('Please select a gategory for your collection.')
            setApiLoading(false)
            return
        }
        else {
            setErr(undefined)
            setCollectionErr(undefined)
        }
        // let _royalties = []
        // if (royalties[0].wallet_address.length !== 0) {
        //     _royalties = [...royalties]
        // }
        let _royalties = [...royalties]
        console.log('/////////////', _royalties)
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

        const formData = new FormData();
        formData.append('title', collection.name);
        formData.append('description', collection.description);
        var extra = {}
        formData.append('extra', JSON.stringify(extra));
        formData.append('category', collection.category);
        formData.append('creator', globalUser.walletAddress);
        formData.append('banner_image', collection.banner);
        formData.append('logo', collection.logo);
        formData.append('minted_at', "0");
        formData.append('chain', 'ethereum');
        formData.append('perpetual_royalties', JSON.stringify(_royalties));
        if (links) {
            formData.append('links', JSON.stringify(links))
        }
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
            setSuccessMesssage("NFT Collection Created Successfully")
            setApiLoading(false)

        } catch (error) {
            console.log(error)
            setErr('something went wrong , please try again later')
            setApiLoading(false)
        }

    }

    const { active, account, library, connector, activate, deactivate } = useWeb3React()

    const AddToLinks = e => {
        var ue = { ...links };
        ue[e.target.name] = e.target.value;
        setLinks(ue);
    }

    return (
        <>
            <div className="pdng">
                <Navbar theme={theme} themeToggler={themeToggler} />
                {globalUser.isLoggedIn && active ?
                    <div className="d-flex flex-column px-0 py-2">
                        <h5 className="my-1" style={{ fontWeight: "bold" }}>Create New Collection</h5>
                        <FieldsContainer className="p-2 p-sm-4">
                            {/* first section fields */}
                            <div className="p-0 d-flex flex-column">

                                {/* set collection logo and banner ==> */}

                                <p style={{ fontWeight: "bold", margin: 0 }} className='mb-1'>Logo image</p>
                                <p className='mb-1'>This image will also be used for navigation. 350 x 350 recommended.</p>

                                <div className="mb-5 col-12 col-sm-6 d-flex justify-content-start align-items-center">
                                    <Box sx={{
                                        border: `2px dashed ${Colors.gray1}`,
                                        width: { xs: '100%', md: '340px' },
                                        height: '300px',
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

                                <p style={{ fontWeight: "bold", margin: 0 }} className='mb-1'>Banner image</p>
                                <p className='mb-1'>This image will appear at the top of your collection page. Avoid including too much text in this banner image, as the dimensions change on different devices. 1400 x 350 recommended.</p>

                                <div className="mb-5 col-12 col-lg-6 d-flex justify-content-start align-items-center">
                                    <Box sx={{
                                        border: `2px dashed ${Colors.gray1}`,
                                        width: '100%',
                                        height: '300px',
                                        borderRadius: '20px',
                                        position: 'relative',
                                        margin: { xs: '0 auto', sm: 0 }
                                    }}>
                                        <label onChange={onBannerChange} htmlFor="banner">
                                            <input type="file" name="banner" id="banner" hidden />
                                            <div style={{
                                                width: '100%',
                                                height: '100%',
                                                backgroundImage: `url(${banner})`, backgroundSize: 'cover',
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

                                {/* set collection fields ==> */}

                                <div className="col-12 col-sm-8 col-md-6 d-flex flex-column justify-content-between align-items-start">
                                    <div className="w-100 d-flex flex-column p-0 my-2">
                                        <p style={{ fontWeight: "bold", margin: 0 }} className='mb-1'>name</p>
                                        <InputBox className="py-2 px-3 d-flex justify-content-between">
                                            <div className="col-11 p-0">
                                                <InputBase
                                                    name="name"
                                                    onChange={onChange}
                                                    sx={{ color: "inherit", width: "100%", height: "100%" }}
                                                    placeholder="your collections's name"
                                                    inputProps={{ 'aria-label': 'enter title' }}
                                                />
                                            </div>
                                            <div className="col-1 p-0 text-center d-flex justify-content-center align-items-center"></div>
                                        </InputBox>
                                    </div>


                                    <div className="w-100 d-flex flex-column p-0 my-2">
                                        <p style={{ fontWeight: "bold", margin: 0 }} className='mb-1'>URL</p>
                                        <InputBox className="py-2 px-3 d-flex justify-content-between">
                                            <div className="col-11 p-0">
                                                <InputBase
                                                    name="URL"
                                                    onChange={AddToLinks}
                                                    sx={{ color: "inherit", width: "100%", height: "100%" }}
                                                    placeholder="google.com"
                                                    inputProps={{ 'aria-label': 'URL' }}
                                                />
                                            </div>
                                            <div className="col-1 p-0 text-center d-flex justify-content-end align-items-center"><NotificationBing size="14" /></div>
                                        </InputBox>
                                    </div>


                                    <div className="w-100 d-flex flex-column p-0 my-2">
                                        <p style={{ fontWeight: "bold", margin: 0 }} className='mb-1'>Description</p>
                                        <InputBox className="py-2 px-3 d-flex justify-content-between">
                                            <div className="col-11 p-0">
                                                <InputBase
                                                    name="description"
                                                    onChange={onChange}
                                                    sx={{ color: "inherit", width: "100%", height: "100%" }}
                                                    placeholder="description of your item"
                                                    inputProps={{ 'aria-label': 'enter description' }}
                                                />
                                            </div>
                                            <div className="col-1 p-0 text-center d-flex justify-content-center align-items-center"></div>
                                        </InputBox>
                                    </div>

                                    <div className="w-100 d-flex flex-column p-0 my-2">
                                        <p style={{ fontWeight: "bold", margin: 0 }} className='mb-1'>category</p>
                                        {fetchedCategories && fetchedCategories.length !== 0 ?
                                            <SSelection id={'create-collection'} tabs={fetchedCategories} width={'100%'} handleSelect={handleCategorieSelect} selectValue={categoryValue} theme={theme} />
                                            :
                                            <SSelection id={'create-collection'} theme={theme} width={'100%'} tabs={['no category']} />
                                        }
                                    </div>

                                </div>
                            </div>

                            <Line />
                            {/* second section fields */}
                            <div className="col-12 col-sm-8 col-md-6 d-flex flex-column justify-content-between align-items-start">
                                <p className="mb-2" style={{ fontWeight: "bold", }}>creator earnings</p>
                                <Inf style={{ fontSize: "12px" }}>Collection owners can collect creator earnings when a user re-sells an item they created. Contact the collection owner to change the collection earnings percentage or the payout address.</Inf>

                                <div className="mb-5 mt-2 w-100 d-flex flex-row p-0 justify-content-between align-items-center">
                                    <div className="d-flex align-items-center justify-content-start"><Inf><PercentageSquare size="26" /></Inf><div className="ms-1 d-flex flex-column justify-content-center align-items-start">
                                        <p style={{ fontWeight: "bold", margin: 0, fontSize: "14px" }}>Royalties</p>
                                    </div>
                                    </div>
                                    <AddButton onClick={() => setAddRoyalties(true)}><Add size="20" /></AddButton>
                                </div>


                                <p style={{ fontWeight: "bold", margin: 0, fontSize: "14px" }}>Links</p>
                                <InputBox className="my-2 py-2 px-3 d-flex justify-content-between">
                                    <div className="col-11 p-0">
                                        <InputBase
                                            name="instagram"
                                            onChange={AddToLinks}
                                            sx={{ color: "inherit", width: "100%", height: "100%" }}
                                            placeholder="http://www.instagram.com/@your instagram account"
                                            inputProps={{ 'aria-label': 'mail link' }}
                                        />
                                    </div>
                                    <div className="col-1 p-0 text-center d-flex justify-content-end align-items-center"><InfoCircle /></div>
                                </InputBox>
                                <InputBox className="my-2 py-2 px-3 d-flex justify-content-between">
                                    <div className="col-11 p-0">
                                        <InputBase
                                            name="twitter"
                                            onChange={AddToLinks}
                                            sx={{ color: "inherit", width: "100%", height: "100%" }}
                                            placeholder="http://www.twitter.com/@your twitter account"
                                            inputProps={{ 'aria-label': 'mail link' }}
                                        />
                                    </div>
                                    <div className="col-1 p-0 text-center d-flex justify-content-end align-items-center"><InfoCircle /></div>
                                </InputBox>
                                <InputBox className="my-2 py-2 px-3 d-flex justify-content-between">
                                    <div className="col-11 p-0">
                                        <InputBase
                                            name="medium"
                                            onChange={AddToLinks}
                                            sx={{ color: "inherit", width: "100%", height: "100%" }}
                                            placeholder="http://www.medium.com/@your medium handle"
                                            inputProps={{ 'aria-label': 'mail link' }}
                                        />
                                    </div>
                                    <div className="col-1 p-0 text-center d-flex justify-content-end align-items-center"><InfoCircle /></div>
                                </InputBox>



                            </div>

                            <Line />
                            {/* third section fields */}
                            <div className="col-12 col-sm-8 col-md-6 d-flex flex-column justify-content-between align-items-start">
                                <div className="my-1 w-100 d-flex flex-row p-0 justify-content-between align-items-center">
                                    <div className="d-flex align-items-center justify-content-start"><Inf><InfoCircle size="26" /></Inf><div className="ms-1 d-flex flex-column justify-content-center align-items-start">
                                        <p style={{ fontWeight: "bold", margin: 0, fontSize: "14px" }}>Show OpenRarity ranking</p><Inf style={{ fontSize: "12px" }}>Turn on after all items revealed and attribute metadata is finalized.</Inf>
                                    </div>
                                    </div>
                                    <SwitchS className="switch">
                                        <SwitchInput type="checkbox" checked={showOpenRarity ? true : false} onChange={() => setShowOpenRarity(!showOpenRarity)} />
                                        <Slide className="slider round"></Slide>
                                    </SwitchS>
                                </div>

                                <div className="my-1 w-100 d-flex flex-row p-0 justify-content-between align-items-center">
                                    <div className="d-flex align-items-center justify-content-start"><Inf><InfoCircle size="26" /></Inf><div className="ms-1 d-flex flex-column justify-content-center align-items-start">
                                        <p style={{ fontWeight: "bold", margin: 0, fontSize: "14px" }}>Explicit & Sensitive Content</p><Inf style={{ fontSize: "12px" }}>Set this item as explicit and sensitive contentinfo</Inf></div></div>
                                    <SwitchS className="switch">
                                        <SwitchInput type="checkbox" checked={sensetiveContent ? true : false} onChange={() => setsensetiveContent(!sensetiveContent)} />
                                        <Slide className="slider round"></Slide>
                                    </SwitchS>
                                </div>



                                {apiLoading ? <ButtonLarge className="mt-5 mb-3" >...
                                    {/* <CircularProgress sx={{ color: "white" }} /> */}
                                </ButtonLarge> :
                                    <ButtonLarge className="mt-5 mb-3" onClick={handleSubmit}>create</ButtonLarge>}


                            </div>


                            {/* error and success messages */}
                            <div className="col-12 col-sm-8 col-md-6 d-flex flex-column justify-content-between align-items-center">
                                {err ? <Typography sx={{ fontSize: "12px", color: `${Colors.errorDark}` }}>{err}</Typography> : undefined}
                                {successMesssage ? <Typography sx={{ fontSize: "12px", color: `${Colors.successDark}` }}>{successMesssage}</Typography> : undefined}
                            </div>

                        </FieldsContainer>
                    </div>
                    : <div className="d-flex my-5 justify-content-center align-items-center">
                        <ButtonLarge onClick={() => { setWalletConnect(!walletConnect) }}>connect wallet</ButtonLarge>
                        <WalletConnectModal open={walletConnect} handleClose={() => setWalletConnect(false)} theme={theme} />
                    </div>
                }
            </div>

            <AddModals prevRoyalties={royalties} saveRoyalties={saveRoyalties} openRoyalties={addRoyalties} handleClose={handleClose} theme={theme} />
        </>
    );
}

export default CreateCollection;