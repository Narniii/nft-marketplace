import styled from 'styled-components';
import Navbar from '../components/Navbar/Navbar';
import '../styles.css'
import bgDes from '../assets/bgDots-desktop.svg'
import bgTab from '../assets/bgDots-tablet.svg'
import bgMob from '../assets/bgDots-mobile.svg'
import { Tab, Tabs } from 'react-bootstrap';
import CollectionCard from '../components/Cards/CollectionCard';
import { SelectionB, SelectionC } from '../components/test';
import SSelection from '../components/Selection';
import { useEffect, useRef, useState } from 'react';
import { Filtering } from '../components/Filtering';
import { MARKET_API } from '../utils/data/market_api';
import { Skeleton, Typography } from '@mui/material';
import { Colors } from '../components/design/Colors';
import { AddCircle, InfoCircle } from 'iconsax-react';
import { ButtonLarge } from '../components/design/Buttons';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import MyCollectionCard from '../components/Cards/MyCollectionCard';
import { useSelector } from 'react-redux';
import WalletConnect from '../components/Navbar/WalletConnect';
import ImgHd from '../assets/mycollections-pic.svg'
import WalletConnectModal from '../components/wallet/WalletConnectModal';
const HeaderContainer = styled.div`
    background-color: ${({ theme }) => theme.collectionCardHover};
    background-image: url(${bgDes});
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;
    height:155px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    @media screen and (max-width: 768px) {
        background-image: url(${bgTab});
        height:150px;
    }
    @media screen and (max-width: 600px) {
        background-image: url(${bgMob});
        height:135px;
    }
`;

const ImageH = styled.div`
background-image: url(${ImgHd});
background-size:contain;
background-repeat:no-repeat;
background-position:right;
height:100%;
width:200px;
`



const MyCollections = ({ theme, themeToggler }) => {

    const globalUser = useSelector(state => state.userReducer);

    const [loading, setLoading] = useState(true)
    const [walletMenu, setWalletMenu] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [walletConnect, setWalletConnect] = useState(false)

    const [view, setView] = useState('m')
    const handleViewChange = (v) => {
        setView(v)
        console.log(v)
    }
    const apiCall = useRef(undefined)
    const [collections, setCollections] = useState(undefined)
    const [err, setErr] = useState(undefined)
    useEffect(() => {
        if (globalUser.isLoggedIn)
            fetchCollections()
    }, [globalUser])
    useEffect(() => {
        return () => {
            if (apiCall.current != undefined)
                apiCall.current.cancel();
        }
    }, [])

    const fetchCollections = async () => {
        try {
            apiCall.current = MARKET_API.request({
                path: `/collection/user/`,
                method: "post",
                body: {
                    wallet_address: globalUser.walletAddress
                }
            })
            const response = await apiCall.current.promise;
            if (!response.isSuccess)
                throw response
            setCollections(response.data)
        }
        catch (err) {
            console.log(err)
            if (err.data.message == "No Collection Found") {
                setCollections([])
            }
            else {
                setErr("Internal server error")
            }
            // setLoading(false)
        }
    }

    useEffect(() => {
        if (collections)
            setLoading(false)
    }, [collections])





    return (
        <>
            <div className="pdng">
                <Navbar theme={theme} themeToggler={themeToggler} />
            </div>
            <div className='w-100 d-flex flex-column'>
                <HeaderContainer className='my-5 py-1 pdng'>
                    <Typography sx={{ fontWeight: 600, fontSize: { xs: '20px', sm: '36px' } }} variant='h1'>My Collections</Typography>
                    <ImageH />
                </HeaderContainer>
                <div className='pdng d-flex flex-column'>
                    {globalUser.isLoggedIn ?

                        <>
                            <div className='d-flex flex-column flex-sm-row justify-content-between align-items-center'>
                                <Typography sx={{
                                    fontWeight: 500
                                    // , display:"flex" , alignItems:"center"
                                }}>Create, curate, and manage collections of unique NFTs to share and sell.<InfoCircle size='16' /></Typography>
                                {/* <Box sx={{ width: { xs: '100%', sm: '200px', md: '257px' } }}> */}
                                <div className='col-12 col-sm-4 col-md-3 col-xl-2 my-2 my-sm-0'>
                                    <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'collection/create'}><ButtonLarge><AddCircle className='me-1' /> Create a collection</ButtonLarge></Link>
                                </div>
                                {/* </Box> */}
                            </div>


                            <div className='d-flex flex-wrap my-5'>
                                {loading ?
                                    <>
                                        <div className="col-12 col-sm-6 col-md-3 p-1">
                                            <Skeleton variant="rounded" height={245} sx={{ width: "100%", borderRadius: "24px" }} />
                                        </div>
                                        <div className="d-none d-sm-block col-12 col-sm-6 col-md-3 p-1">
                                            <Skeleton variant="rounded" height={245} sx={{ width: "100%", borderRadius: "24px" }} />
                                        </div>
                                        <div className="d-none d-md-block col-12 col-sm-6 col-md-3 p-1">
                                            <Skeleton variant="rounded" height={245} sx={{ width: "100%", borderRadius: "24px" }} />
                                        </div>
                                        <div className="d-none d-md-block col-12 col-sm-6 col-md-3 p-1">
                                            <Skeleton variant="rounded" height={245} sx={{ width: "100%", borderRadius: "24px" }} />
                                        </div>
                                    </>
                                    :
                                    <>
                                        {collections.length == 0 ?
                                            <Typography sx={{ color: `${Colors.primaryMain}`, textAlign: 'center', width: "100%" }}>No collection found.</Typography>
                                            :
                                            <>
                                                {collections.map((collection) => {
                                                    return <MyCollectionCard theme={theme} collId={collection._id.$oid} itemImage={collection.banner_image_path} collectionName={collection.title} />
                                                })}
                                            </>
                                        }
                                    </>
                                }
                            </div>
                        </>
                        :
                        <>
                            <div className='d-flex my-5'>
                                <ButtonLarge onClick={() => { setWalletConnect(!walletConnect) }}>connect wallet</ButtonLarge>
                                <WalletConnectModal open={walletConnect} handleClose={() => setWalletConnect(false)} theme={theme} />
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    );
}

export default MyCollections;