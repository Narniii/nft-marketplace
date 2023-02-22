import { Box, CircularProgress, InputBase, MenuItem, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../components/design/Colors";
import Navbar from "../../components/Navbar/Navbar";
import imageBG from '../../assets/image.png'
import SearchBox from "../../components/Navbar/SearchBox";
import { Add, ArrowDown2, Chart, Chart1, HambergerMenu, InfoCircle, Lock, Lock1, NotificationBing, PercentageCircle, PercentageSquare, Star, Star1 } from "iconsax-react";
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
import { useParams } from "react-router";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
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
    const [loading, setLoading] = useState(true)
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
    const [funds, setFunds] = useState([])
    const [addProperties, setAddProperties] = useState(false)
    const [addFunds, setAddFunds] = useState(false)
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
    const [isFreezed, setIsFreezed] = useState(false)
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
        setAddFunds(false)
        setAddRoyalties(false)
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
                setNft(n)
                setProperties(response.data.data[1].nft.extra)
                // setLogo(response.data.data[1].nft.nft_image_path)
                var cuttedURL = response.data.data[1].nft.nft_image_path.replace('root/NFTMarketplace-Backend/market/media/', '');
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


    const saveFunds = (f) => {
        setFunds(f)
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


        const NFTData = new FormData();
        NFTData.append('nft_id', id);
        NFTData.append('title', nft.name);
        NFTData.append('description', nft.description);
        var extras = {};
        if (properties.length !== 0) {
            extras.properties = properties
        }
        console.log(extras)
        console.log(JSON.stringify(extras))
        NFTData.append('extra', JSON.stringify(extras));
        NFTData.append('media', 'https://example.com');
        NFTData.append('collection_id', nft.collection);
        NFTData.append('reference', ipfsFileCid ? JSON.stringify({ attributes: ipfsFileUrl }) : JSON.stringify({}));
        NFTData.append('image', nft.img);
        NFTData.append('expires_at', "0");
        NFTData.append('perpetual_royalties', JSON.stringify([{}]));
        NFTData.append('is_freezed', false);
        NFTData.append('price', ' ');
        NFTData.append('current_owner', ' ');
        NFTData.append('new_current_owner', ' ');

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




    return (
        <>
            <div style={{ padding: "0 32px" }}>
                <Navbar theme={theme} themeToggler={themeToggler} />
                {globalUser.isLoggedIn ?
                    <div className="d-flex flex-column px-0 py-2">
                        <h5 className="my-1" style={{ fontWeight: "bold" }}>Edit {nft.name}</h5>
                        <FieldsContainer className="p-3">
                            {/* first section fields */}
                            <div className="p-0 d-flex flex-column flex-md-row-reverse">
                                <div className="col-12 col-sm-6 d-flex justify-content-end align-items-center">
                                    <Box sx={{
                                        border: `2px dashed ${Colors.gray1}`,
                                        width: '340px',
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
                                <div className="col-12 col-sm-8 col-md-6 d-flex flex-column justify-content-between align-items-start">
                                    <div className="w-100 d-flex flex-column p-0 my-2">
                                        <p style={{ fontWeight: "bold", margin: 0 }} className='mb-1'>name</p>
                                        <InputBox className="p-2 d-flex justify-content-between">
                                            <div className="col-11 p-0">
                                                <InputBase
                                                    name="name"
                                                    onChange={onChange}
                                                    sx={{ color: "inherit", width: "100%", height: "100%" }}
                                                    placeholder={nft.name}
                                                    inputProps={{ 'aria-label': 'enter email' }}
                                                />
                                            </div>
                                            <div className="col-1 p-0 text-center d-flex justify-content-center align-items-center"><NotificationBing size="14" /></div>
                                        </InputBox>
                                    </div>


                                    <div className="w-100 d-flex flex-column p-0 my-2">
                                        <p style={{ fontWeight: "bold", margin: 0 }} className='mb-1'>External link</p>
                                        <InputBox className="p-2 d-flex justify-content-between">
                                            <div className="col-11 p-0">
                                                <InputBase
                                                    name="link"
                                                    onChange={onChange}
                                                    sx={{ color: "inherit", width: "100%", height: "100%" }}
                                                    placeholder={nft.link}
                                                    inputProps={{ 'aria-label': 'enter email' }}
                                                />
                                            </div>
                                            <div className="col-1 p-0 text-center d-flex justify-content-center align-items-center"><NotificationBing size="14" /></div>
                                        </InputBox>
                                    </div>


                                    <div className="w-100 d-flex flex-column p-0 my-2">
                                        <p style={{ fontWeight: "bold", margin: 0 }} className='mb-1'>Description</p>
                                        <InputBox className="p-2 d-flex justify-content-between">
                                            <div className="col-11 p-0">
                                                <InputBase
                                                    name="description"
                                                    onChange={onChange}
                                                    sx={{ color: "inherit", width: "100%", height: "100%" }}
                                                    placeholder={nft.description}
                                                    inputProps={{ 'aria-label': 'enter email' }}
                                                />
                                            </div>
                                            <div className="col-1 p-0 text-center d-flex justify-content-center align-items-center"><NotificationBing size="14" /></div>
                                        </InputBox>
                                    </div>

                                    <div className="w-100 d-flex flex-column p-0 my-2">
                                        <p style={{ fontWeight: "bold", margin: 0 }} className='mb-1'>collection</p>
                                        {userColNames.length !== 0 ?
                                            <SSelection tabs={userColNames} width={'100%'} handleSelect={handleCollectionSelect} selectValue={collectionValue} theme={theme} />
                                            :
                                            <SSelection theme={theme} width={'100%'} tabs={['no collection']} />
                                        }
                                    </div>






                                </div>
                            </div>

                            <Line />
                            {/* second section fields */}
                            <div className="col-12 col-sm-8 col-md-6 d-flex flex-column justify-content-between align-items-start">
                                <div className="my-1 w-100 d-flex flex-row p-0 justify-content-between align-items-center">
                                    <div className="d-flex align-items-center justify-content-start"><Inf><HambergerMenu size="26" /></Inf><div className="ms-1 d-flex flex-column justify-content-center align-items-start">
                                        <p style={{ fontWeight: "bold", margin: 0, fontSize: "14px" }}>Properties</p><Inf style={{ fontSize: "12px" }}>Textual traits that show up as rectangles</Inf></div></div>
                                    <AddButton onClick={() => setAddProperties(true)}><Add size="20" /></AddButton>
                                </div>

                                <div className="my-1 w-100 d-flex flex-row p-0 justify-content-between align-items-center">
                                    <div className="d-flex align-items-center justify-content-start"><Inf><Star1 size="26" /></Inf><div className="ms-1 d-flex flex-column justify-content-center align-items-start">
                                        <p style={{ fontWeight: "bold", margin: 0, fontSize: "14px" }}>Levels</p><Inf style={{ fontSize: "12px" }}>Numerical traits that show as a progress bar</Inf></div></div>
                                    <AddButton onClick={() => setAddFunds(true)}><Add size="20" /></AddButton>
                                </div>

                                <div className="my-1 w-100 d-flex flex-row p-0 justify-content-between align-items-center">
                                    <div className="d-flex align-items-center justify-content-start"><Inf><Chart1 size="26" /></Inf><div className="ms-1 d-flex flex-column justify-content-center align-items-start">
                                        <p style={{ fontWeight: "bold", margin: 0, fontSize: "14px" }}>stats</p><Inf style={{ fontSize: "12px" }}>Numerical traits that just show as numbers</Inf></div></div>
                                    <AddButton onClick={() => setAddRoyalties(true)}><Add size="20" /></AddButton>
                                </div>


                                <div className="my-1 w-100 d-flex flex-row p-0 justify-content-between align-items-center">
                                    <div className="d-flex align-items-center justify-content-start"><Inf><Lock1 size="26" /></Inf><div className="ms-1 d-flex flex-column justify-content-center align-items-start">
                                        <p style={{ fontWeight: "bold", margin: 0, fontSize: "14px" }}>Unlockable Content</p><Inf style={{ fontSize: "12px" }}>Include unlockable content that can only be revealed by the owner of the item.</Inf>
                                    </div>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                    </label>
                                </div>

                                <div className="my-1 w-100 d-flex flex-row p-0 justify-content-between align-items-center">
                                    <div className="d-flex align-items-center justify-content-start"><Inf><InfoCircle size="26" /></Inf><div className="ms-1 d-flex flex-column justify-content-center align-items-start">
                                        <p style={{ fontWeight: "bold", margin: 0, fontSize: "14px" }}>Explicit & Sensitive Content</p><Inf style={{ fontSize: "12px" }}>Set this item as explicit and sensitive contentinfo</Inf></div></div>
                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                    </label>
                                </div>

                            </div>

                            <Line />
                            {/* third section fields */}
                            <div className="col-12 col-sm-8 col-md-6 d-flex flex-column justify-content-between align-items-start">
                                <div className="w-100 d-flex flex-column p-0 my-2">
                                    <p style={{ fontWeight: "bold", margin: 0 }} className='mb-1'>Supply</p>
                                    <InputBox className="p-2 d-flex justify-content-between">
                                        <div className="col-11 p-0">
                                            <InputBase
                                                sx={{ color: "inherit", width: "100%", height: "100%" }}
                                                placeholder="Example@gmail.com"
                                                inputProps={{ 'aria-label': 'enter email' }}
                                            />
                                        </div>
                                        <div className="col-1 p-0 text-center d-flex justify-content-center align-items-center"><NotificationBing size="14" /></div>
                                    </InputBox>
                                </div>


                                <div className="w-100 d-flex flex-column p-0 my-2">
                                    <p style={{ fontWeight: "bold", margin: 0 }} className='mb-1'>Freeze Metadata</p>
                                    <InputBox className="p-2 d-flex justify-content-between">
                                        <div className="col-11 p-0">
                                            <InputBase
                                                sx={{ color: "inherit", width: "100%", height: "100%" }}
                                                placeholder="Example@gmail.com"
                                                inputProps={{ 'aria-label': 'enter email' }}
                                            />
                                        </div>
                                        <div className="col-1 p-0 text-center d-flex justify-content-center align-items-center"><NotificationBing size="14" /></div>
                                    </InputBox>
                                </div>


                                <div className="w-100 d-flex flex-column p-0 my-2">
                                    <p style={{ fontWeight: "bold", margin: 0 }} className='mb-1'>Blockchain</p>
                                    <SSelection tabs={['ethereum', 'solana', 'near']} width={'100%'} handleSelect={handleChainSelect} selectValue={chainValue} theme={theme} />
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



                                {apiLoading ? <ButtonLarge className="mt-5 mb-3" ><CircularProgress sx={{ color: "white" }} /></ButtonLarge> :
                                    <ButtonLarge className="mt-5 mb-3" onClick={handleSubmit}>save</ButtonLarge>}


                            </div>


                            {/* error and success messages */}
                            <div className="col-12 col-sm-8 col-md-6 d-flex flex-column justify-content-between align-items-center">
                                {err ? <Typography sx={{ fontSize: "12px", color: `${Colors.errorDark}` }}>{err}</Typography> : undefined}
                                {successMesssage ? <Typography sx={{ fontSize: "12px", color: `${Colors.successDark}` }}>{successMesssage}</Typography> : undefined}
                            </div>

                        </FieldsContainer>
                    </div>
                    : <div className="d-flex my-5 justify-content-center align-items-center">
                        <ButtonLarge onClick={walletDrawer('bottom', true)}>connect wallet</ButtonLarge>
                        <WalletConnect toggleDrawer={walletDrawer} state={walletMenu} theme={theme} />
                    </div>
                }
            </div>

            <AddModals prevProperties={properties} saveFunds={saveFunds} saveProperties={saveProperties} saveRoyalties={saveRoyalties} openRoyalties={addRoyalties} openFunds={addFunds} openProperties={addProperties} handleClose={handleClose} theme={theme} />
        </>
    );
}

export default EditNft;