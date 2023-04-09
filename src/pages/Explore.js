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
import { categories } from '../utils/Categories';

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
    const [fetchedCategories, setFetchedCategories] = useState([])

    const [tab, setTab] = useState(window.location.hash ? window.location.hash.replace('#', '') : "trending")
    useEffect(() => {
        fetchCategories()
        fetchCollections()
        return () => {
            if (apiCall.current != undefined)
                apiCall.current.cancel();

        }
    }, [])
    const fetchCategories = async () => {
        let tempCatArr = []
        for (var c = 0; c < categories.length; c++) {
            tempCatArr.push(categories[c].title)
        }
        setFetchedCategories(tempCatArr)
    }


    const fetchCollections = async () => {
        var this_time = parseInt(new Date(Date.now()).getTime())
        var to = this_time / 1000;
        var from = undefined;

        if (tab == 'trending' || tab == 'top')
            try {
                apiCall.current = MARKET_API.request({
                    path: `/collection/trendings`,
                    method: "post",
                    body: { from: from ? from : null, to: to ? to : null, from_col: 0, to_col: 10, cat: '' },
                });
                const response = await apiCall.current.promise;
                if (!response.isSuccess)
                    throw response
                setCollections(response.data)
                // setLoading(false)
            }
            catch (err) {
                console.log(err)
                if (err.status == 404) {
                    setCollections([])
                }
                else if (err.status == 500) {
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
                    <Typography sx={{ fontWeight: 600, fontSize: { xs: '20px', sm: '36px' } }} variant='h1'>Explore</Typography>
                    <ImageH />
                </HeaderContainer>
                <div className='pdng d-flex flex-column'>
                    <Tabs
                        fill
                        // justify
                        defaultActiveKey={window.location.hash ? window.location.hash.replace('#', '') : "trending"}
                        className="m-0 mb-5 tab-scroll"
                        style={{
                            color: theme === 'light' ? "#5D3393" : "#DABDDF",
                            borderColor: theme === 'light' ? "#5D3393" : "#DABDDF",
                            borderBottom: "none"
                        }}
                        onSelect={(e) => setTab(e)}

                    >
                        {/* {fetchedCategories.length == 0 ? <></> : <>
                            {fetchedCategories.map((category) => {
                                return <Tab eventKey={category.title} title={category.title}>
                                    <CategoryTabs category={category.title} />
                                </Tab>
                            })}
                        </>} */}


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
                                                    return <CollectionCard collection={collection} explore={true} id={collection._id.$oid} slider={false} collectionBanner={collection.banner_image_path} collectionLogo={collection.logo_path} collectionCreator={collection.creator} collectionName={collection.title} royalty={collection.royalty} />
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
                                                    return <CollectionCard collection={collection} explore={true} id={collection._id.$oid} slider={false} collectionBanner={collection.banner_image_path} collectionLogo={collection.logo_path} collectionCreator={collection.creator} collectionName={collection.title} royalty={collection.royalty} />
                                                })}
                                            </>
                                        }
                                    </>
                                }
                            </div>
                        </Tab>

                        <Tab eventKey="art" title="Art">
                            <CategoryTabs tab={tab} category={'art'} />
                        </Tab>
                        <Tab eventKey="collectibles" title="Collectibles">
                            <CategoryTabs tab={tab} category={'collectibles'} />
                        </Tab>
                        <Tab eventKey="music" title="Music">
                            <CategoryTabs tab={tab} category={'music'} />
                        </Tab>
                        <Tab eventKey="photography" title="Photography">
                            <CategoryTabs tab={tab} category={'photography'} />
                        </Tab>
                        <Tab eventKey="sport" title="Sports">
                            <CategoryTabs tab={tab} category={'sport'} />
                        </Tab>
                        <Tab eventKey="utility" title="Utility">
                            <CategoryTabs tab={tab} category={'utility'} />
                        </Tab>
                        <Tab eventKey="animals" title="Animals">
                            <CategoryTabs tab={tab} category={'animals'} />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    );
}

export default Explore;