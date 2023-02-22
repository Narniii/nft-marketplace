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
import ImgHd from '../assets/explore-pic.svg'
import CategoryTabs from '../components/Explore/CategoryTabs';

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


const Explore = ({ theme, themeToggler }) => {
    const [loading, setLoading] = useState(true)
    const [openFilter, setOpenFilter] = useState(false)
    const handleFilter = () => {
        if (openFilter) setOpenFilter(false)
        else setOpenFilter(true)
    }
    const [view, setView] = useState('m')
    const handleViewChange = (v) => {
        setView(v)
        console.log(v)
    }
    const apiCall = useRef(undefined)
    const [collections, setCollections] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const [selectedCategory, setSelectedCategory] = useState(undefined)
    useEffect(() => {
        fetchCollections()
        return () => {
            if (apiCall.current != undefined)
                apiCall.current.cancel();

        }
    }, [])

    const fetchCollections = async () => {
        try {
            apiCall.current = MARKET_API.request({
                path: `/collection/all/?from=0&to=10`,
                method: "get",
            })
            const response = await apiCall.current.promise;
            if (!response.isSuccess)
                throw response
            setCollections(response.data)
            // setLoading(false)
        }
        catch (err) {
            console.log(err)
            if (err.data.message == "No NFT Collection Found") {
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
                <HeaderContainer className='my-5 py-1 px-4'>
                    <Typography sx={{ fontWeight: 600, fontSize: { xs: '20px', sm: '36px' } }} variant='h1'>Explore</Typography>
                    <ImageH />
                </HeaderContainer>
                <div className='pdng d-flex flex-column'>
                    <Tabs
                        fill
                        // justify
                        defaultActiveKey={window.location.hash ? window.location.hash.replace('#', '') : "trending"}
                        className="m-0 mb-3 tab-scroll"
                        style={{ color: theme === 'light' ? "#5D3393" : "#DABDDF", borderColor: theme === 'light' ? "#5D3393" : "#DABDDF", borderBottom: "none" }}
                    >
                        <Tab eventKey="trending" title="Trending">
                            <div className="row flex-wrap p-0">
                                {loading ?
                                    <>
                                        <div className="col-12 col-sm-6 col-md-4 p-1">
                                            <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                                        </div>
                                        <div className="d-none d-sm-block col-12 col-sm-6 col-md-4 p-1">
                                            <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                                        </div>
                                        <div className="d-none d-md-block col-12 col-sm-6 col-md-4 p-1">
                                            <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                                        </div>
                                    </>
                                    :
                                    <>
                                        {collections.length == 0 ?
                                            <Typography sx={{ color: `${Colors.primaryMain}`, textAlign: 'center' }}>No collection found.</Typography>
                                            :
                                            <>
                                                {collections.map((collection) => {
                                                    return <CollectionCard id={collection._id.$oid} slider={false} collectionBanner={collection.banner_image_path} collectionLogo={collection.logo_path} collectionCreator={collection.creator} collectionName={collection.title} royalty={collection.royalty} />
                                                })}
                                            </>
                                        }
                                    </>
                                }
                            </div>
                        </Tab>
                        <Tab eventKey="top" title="Top">
                            <div className="row flex-wrap p-0">
                                {loading ?
                                    <>
                                        <div className="col-12 col-sm-6 col-md-4 p-1">
                                            <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                                        </div>
                                        <div className="d-none d-sm-block col-12 col-sm-6 col-md-4 p-1">
                                            <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                                        </div>
                                        <div className="d-none d-md-block col-12 col-sm-6 col-md-4 p-1">
                                            <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                                        </div>
                                    </>
                                    : <>
                                        {collections.length == 0 ?
                                            <Typography sx={{ color: `${Colors.primaryMain}`, textAlign: 'center' }}>No collection found.</Typography>
                                            :
                                            <>
                                                {collections.map((collection) => {
                                                    return <CollectionCard id={collection._id.$oid} slider={false} collectionBanner={collection.banner_image_path} collectionLogo={collection.logo_path} collectionCreator={collection.creator} collectionName={collection.title} royalty={collection.royalty} />
                                                })}
                                            </>
                                        }
                                    </>
                                }
                            </div>
                        </Tab>
                        <Tab eventKey="art" title="Art">
                            <CategoryTabs category={'art'} />
                        </Tab>
                        <Tab eventKey="collectibles" title="Collectibles">
                            <CategoryTabs category={'collectibles'} />
                        </Tab>
                        <Tab eventKey="music" title="Music">
                            <CategoryTabs category={'music'} />
                        </Tab>
                        <Tab eventKey="photography" title="Photography">
                            <CategoryTabs category={'photography'} />
                        </Tab>
                        <Tab eventKey="sport" title="Sports">
                            <CategoryTabs category={'sport'} />
                        </Tab>
                        {/* <Tab eventKey="Trading Cards" title="Trading Cards"> */}
                        {/* </Tab> */}
                        <Tab eventKey="utility" title="Utility">
                            <CategoryTabs category={'utility'} />
                        </Tab>
                        {/* <Tab eventKey="Virtual Worlds" title="Virtual Worlds"> */}
                        {/* </Tab> */}
                    </Tabs>
                </div>
            </div>
        </>
    );
}

export default Explore; <></>