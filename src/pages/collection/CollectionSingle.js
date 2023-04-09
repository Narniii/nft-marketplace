import styled from "styled-components";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar/Navbar";
import bannerPic from '../../assets/collectionBanner.svg'
import { ArrowDown2, ArrowUp2, Dribbble, Global, Instagram, More, Share, Star, Star1 } from "iconsax-react";
import '../../styles.css'
import SearchBox from "../../components/Navbar/SearchBox";
import { Tab, Tabs } from "react-bootstrap";
import ItemsTab from "../../components/CollectionSingle/ItemsTab";
import ActivityTab from "../../components/CollectionSingle/ActivityTab";
import CollectionAnalyticsTab from "../../components/CollectionSingle/AnalyticsTab";
import { Box, LinearProgress, MenuList, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { MARKET_API } from "../../utils/data/market_api";
import { useRef } from "react";
import { useEffect } from "react";
import { API_CONFIG } from "../../config";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { Colors } from "../../components/design/Colors";
import { useSelector } from "react-redux";
import { ListMenus, ShareListMenus } from "../../components/listMenus";
import { ButtonDisabled } from "../../components/design/Buttons";
import { convertDate, countCreatorFee, percentage, shorten, shortenLong } from "../../utils/countingFunctions";
import { Link } from "react-router-dom";
const Banner = styled.div`
//   background-image: url(${bannerPic});
  background-size:cover;
  background-repeat:no-repeat;
  background-position:center;
  height:300px;
  position:relative;
  width:100%;
  @media screen and (max-width: 600px) {
    height:150px;
  }

`;
const Logo = styled.div`
  background-size:cover;
  background-repeat:no-repeat;
  background-position:center;
  height:250px;
  width:250px;
  border:4px solid;
  border-color:${({ theme }) => theme.body};
  background-color:${({ theme }) => theme.collectionCardHover};
//   box-shadow:${({ theme }) => theme.boxShadow};
  top:85% !important;
  border-radius: 24px;
  @media screen and (max-width: 768px) {
    height:200px;
    width:200px;
  }
  @media screen and (max-width: 600px) {
    height:120px;
    width:120px;
  }
`;
const DetCard = styled.div`
background:${({ theme }) => theme.itemCardsBackground};
box-shadow:${({ theme }) => theme.boxShadow};
// border:${({ theme }) => theme.searchBoxBorder};
border-radius: 12px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
padding:8px 40px;
width:180px;
&:hover{
    background:${({ theme }) => theme.collectionCardActive};
}

`;
const Line = styled.div`
background: linear-gradient(90deg,#60606000 0%, #80808080 50%,#918A7A00 100%);
height:1px;
width:60%;
`;
const OwnerName = styled.span`
color: ${({ theme }) => theme.trendingSectionTitles};
font-weight:600;
`
const Subtitle = styled.span`
color: ${({ theme }) => theme.collectionDetailsTitle};
font-weight:400;
`
const CollectionSingle = ({ theme, themeToggler }) => {
    const { id } = useParams()
    const globalUser = useSelector(state => state.userReducer)
    const [loading, setLoading] = useState(true)
    const [collection, setCollection] = useState(undefined)
    const [loadErr, setLoadErr] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const [logo, setLogo] = useState(undefined)
    const [banner, setBanner] = useState(undefined)
    const [desLong, setDesLong] = useState(false)
    const apiCall = useRef(undefined)
    const [isOnWatchList, setIsOnWatchList] = useState(false)
    const navigate = useNavigate()
    const [isCreator, setIsCreator] = useState(false)
    const [activities, setActivities] = useState(undefined)
    const [highestOffer, setHighestOffer] = useState(undefined)
    const [links, setLinks] = useState(undefined)


    useEffect(() => {
        getCollection()
        return () => {
            if (apiCall.current != undefined)
                apiCall.current.cancel();
        }
    }, [])

    var moreListItems = []
    if (isCreator) {
        moreListItems.push({ title: "Edit", link: '/' + 'collection/edit/' + id })
    } else {
        moreListItems.push({ title: "Report" })
    }

    const getCollection = async () => {
        try {
            apiCall.current = MARKET_API.request({
                path: `/collection/get/`,
                method: "post",
                body: { collection_id: id },
            });
            let response = await apiCall.current.promise;
            console.log(response)
            if (!response.isSuccess)
                throw response
            if (response.data.logo_path) {
                var LOGO_PATH = response.data.logo_path ? response.data.logo_path.replace('root/dortzio/market/media/', '') : undefined;
                var bg_LOGO = BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${LOGO_PATH}`))
                setLogo(bg_LOGO)
            }
            if (response.data.banner_image_path) {
                var BANNER_PATH = response.data.banner_image_path ? response.data.banner_image_path.replace('root/dortzio/market/media/', '') : undefined;
                var bg_BANNER = BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${BANNER_PATH}`))
                console.log(BANNER_PATH)
                setBanner(bg_BANNER)
            }
            var tempArr = []
            var tempOfferPrices = []
            for (let n = 0; n < response.data.nfts.length; n++) {
                if (response.data.nfts[n].offers.length > 0) {
                    for (let o = 0; o < response.data.nfts[n].offers.length; o++) {
                        tempOfferPrices.push(response.data.nfts[n].offers[o].price)
                    }
                }

                if (response.data.nfts[n].asset_activity.length > 0) {
                    for (let f = 0; f < response.data.nfts[n].asset_activity.length; f++) {
                        var tempObj = {}
                        tempObj.productImage = response.data.nfts[n].nft_image_path
                        tempObj.productName = response.data.nfts[n].title
                        tempObj.asset_activity = response.data.nfts[n].asset_activity[f]
                        tempArr.push(tempObj)
                    }
                }
            }
            if (response.data.links) {
                setLinks(JSON.parse(response.data.links))
            }
            setHighestOffer(Math.max(tempOfferPrices))
            setActivities(tempArr)
            if (globalUser && globalUser.isLoggedIn && globalUser.walletAddress == response.data.creator) {
                setIsCreator(true)
            }
            setCollection(response.data)

            // setLikeCount(response.data[1].likes.length)
        }
        catch (err) {
            if (err.status == 404)
                navigate("/404")
            else if (err.status == 500) {
                setLoadErr("Internal server error occured, please try again later.")
            }
            // else {
            //     setLoadErr('something went wrong , please try again later')
            // }
        }
    }



    //----------> adding/removing collection to/from watchlist
    const [watchListId, setWatchListId] = useState(undefined)
    const getOnWatchList = async () => {
        try {
            apiCall.current = MARKET_API.request({
                path: `/watchlist/get/`,
                method: "post",
                body: { user_id: globalUser.userId },
            });
            let response = await apiCall.current.promise;
            console.log('watchlist????', response)
            if (!response.isSuccess)
                throw response
            for (var c = 0; c < response.data.length; c++) {
                if (response.data[c].title == collection.title) {
                    setIsOnWatchList(true)
                    setWatchListId(response.data[c].wl_id)
                }
            }
        }
        catch (err) {
            if (err.status == 404) {
                setIsOnWatchList(false)
            }
            else if (err.status == 500) {
                setErr("Internal server error occured, please try again later.")
            }
        }
    }
    useEffect(() => {
        if (globalUser.isLoggedIn && collection)
            getOnWatchList()
    }, [globalUser, collection])

    useEffect(() => {
        if (collection || loadErr)
            setLoading(false)
    }, [collection, loadErr])

    const addToWatchList = async () => {
        if (globalUser.isLoggedIn) {
            try {
                apiCall.current = MARKET_API.request({
                    path: `/watchlist/add/`,
                    method: "post",
                    body: { collection_id: id, user_id: globalUser.userId },
                });
                let response = await apiCall.current.promise;
                console.log('collection watchlist??', response)
                if (!response.isSuccess)
                    throw response
                setIsOnWatchList(true)
            }
            catch (err) {
                console.log(err)
                if (err.status == 404) {
                    setIsOnWatchList(false)
                }
                else if (err.status == 500) {
                    setErr("Internal server error occured, please try again later.")
                }
            }
        }

    }
    const removeFromWatchList = async () => {
        if (globalUser.isLoggedIn && watchListId && collection) {
            try {
                apiCall.current = MARKET_API.request({
                    path: `/watchlist/remove/`,
                    method: "post",
                    body: { watchlist_id: watchListId, collection_id: collection._id.$oid },
                });
                let response = await apiCall.current.promise;
                console.log('remove watchlist??', response)
                if (!response.isSuccess)
                    throw response
                setIsOnWatchList(false)
            }
            catch (err) {
                console.log(err)
                if (err.status == 404) {
                }
                else if (err.status == 500) {
                    setErr("Internal server error occured, please try again later.")
                }
            }
        }

    }
    //<----------------------


    const [anchorEl, setAnchorEl] = useState(null);
    const [openList, setOpenList] = useState(false)
    const handleList = (e) => {
        setOpenList(!openList)
        setAnchorEl(e.currentTarget);
    }

    const [tab, setTab] = useState(window.location.hash ? window.location.hash.replace('#', '') : "items")
    const handleLink = (link) => {
        console.log(link)
        window.location.replace(link);
    };
    // var shareListItems = [{ title: 'instagram' }, { title: 'twitter' }, { title: 'discord' }, { title: 'facebook' }, { title: 'whatsapp' }, { title: 'email' }]
    var shareListItems = [{ title: 'twitter' }, { title: 'facebook' }, { title: 'whatsapp' }, { title: 'email' }]
    const [shareList, setShareList] = useState(false)
    const [shareAnchorEl, setShareAnchorEl] = useState(null);
    const handleShareList = (e) => {
        setShareList(!shareList)
        setShareAnchorEl(e.currentTarget);
    }


    return (
        <>
            <div className="pdng"
            >
                <Navbar theme={theme} themeToggler={themeToggler} />
            </div>
            {loading ?
                <>
                    <LinearProgress color="secondary" sx={{ my: 55, mx: 5 }} />
                </> :
                <>
                    {loadErr ? <Typography sx={{ color: `${Colors.primaryMain}`, textAlign: 'center', my: 55, mx: 5 }}>{loadErr}</Typography>
                        :
                        <>
                            <div className="d-flex flex-column p-0 m-0 justify-content-between">
                                <Banner style={{ backgroundImage: banner ? banner : `${Colors.gradientPurpleStandard}` }}><Logo style={{ backgroundImage: logo ? logo : `${Colors.gradientPurpleStandard}` }} className="position-absolute start-50 translate-middle" /></Banner>
                                <div className="d-flex justify-content-between m-0 mb-md-3 pdng">
                                    <div>
                                        {links && links.instagram ?
                                            <Link style={{ textDecoration: "none", color: "inherit" }} className="m-2 d-none d-sm-inline" onClick={() => handleLink(links.instagram)}>
                                                <Instagram size="20" cursor='pointer' />
                                            </Link>
                                            : undefined}
                                        {links && links.twitter ?
                                            <Link style={{ textDecoration: "none", color: "inherit" }} className="m-2 d-none d-sm-inline" onClick={() => handleLink(links.twitter)} >
                                                <Dribbble size="20" cursor='pointer' className="" />
                                            </Link>
                                            : undefined}
                                        {links && links.URL ?
                                            <Link style={{ textDecoration: "none", color: "inherit" }} className="m-2 d-none d-sm-inline" onClick={() => handleLink(links.URL)} >
                                                <Global size="20" cursor='pointer' className="" />
                                            </Link>
                                            : undefined}
                                    </div>
                                    <div>{isOnWatchList ?
                                        <Star1 variant="Bold" cursor="pointer" onClick={removeFromWatchList} /> : <Star1 style={{ cursor: "pointer" }} onClick={addToWatchList} size="20" className="m-2 d-none d-sm-inline" />}
                                        <Share size="20" onClick={handleShareList} cursor="pointer" />
                                        <ShareListMenus open={shareList} anchorEl={shareAnchorEl} theme={theme} handleClose={() => setShareList(false)} field={'profile'} tabs={shareListItems} />
                                        <More style={{ cursor: "pointer" }} id="more-list-collection" size="20" className="m-2" onClick={handleList} /></div>
                                </div>
                                <ListMenus open={openList} anchorEl={anchorEl} theme={theme} handleClose={() => setOpenList(false)} field={'collection'} id={id} tabs={moreListItems} />
                                <div className="d-flex justify-content-center mt-3 mt-sm-5">
                                    <h5 className="m-2" style={{ fontWeight: 600 }}>
                                        {collection.title}
                                    </h5>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <p className="m-2"><Subtitle>By </Subtitle>
                                        <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'profile/' + collection.username}>
                                            <OwnerName>{shorten(collection.username)}</OwnerName>
                                        </Link>
                                    </p>
                                </div>
                                <Box sx={{ px: { xs: 1, sm: 10, md: 30, lg: 40, xl: 50 } }} className="d-flex flex-wrap justify-content-around">
                                    <p className="m-2"><Subtitle>Items </Subtitle><OwnerName>{collection.nft_ids.length}</OwnerName></p>
                                    <p className="m-2"><Subtitle>Created </Subtitle><OwnerName>{convertDate(collection.created_at.$date)} </OwnerName></p>
                                    <p className="m-2"><Subtitle>Creator Fee </Subtitle><OwnerName>{countCreatorFee(collection.perpetual_royalties, collection.creator)}</OwnerName></p>
                                    <p className="m-2"><Subtitle>Owners </Subtitle><OwnerName>{collection.nft_owners_count}</OwnerName></p>
                                    <p className="m-2"><Subtitle>Unique Owners </Subtitle><OwnerName>{percentage(parseInt(collection.unique_owners.length), parseInt(collection.nft_owners_count))}% </OwnerName></p>
                                </Box>
                                <div className="w-50 align-self-center d-none d-sm-flex flex-column justify-content-center align-items-center text-center">
                                    <p className="mt-2 mb-0 text-justify"><Subtitle style={{ fontWeight: 400 }}>{desLong ? <>{collection.description}</> : <>{shortenLong(collection.description)}</>}</Subtitle></p>
                                    {collection.description.length > 100 && !desLong ?
                                        <OwnerName style={{ cursor: "pointer" }} onClick={() => setDesLong(true)}>See more <ArrowDown2 size="20" /></OwnerName> : undefined}
                                    {desLong ?
                                        <OwnerName style={{ cursor: "pointer" }} onClick={() => setDesLong(false)}>See less <ArrowUp2 size="20" /></OwnerName> : undefined}
                                </div>
                                <div className="mt-4 d-flex flex-wrap justify-content-center">
                                    <DetCard className="m-2">
                                        <Subtitle>total price</Subtitle>
                                        <Line />
                                        <OwnerName>{parseFloat(collection.total_price).toFixed(3)}</OwnerName>
                                    </DetCard>
                                    <DetCard className="m-2">
                                        <Subtitle>floor price</Subtitle>
                                        <Line />
                                        <OwnerName>{collection.floor_price}</OwnerName>
                                    </DetCard>
                                    <DetCard className="m-2">
                                        <Subtitle>best offer</Subtitle>
                                        <Line />
                                        <OwnerName>{parseFloat(highestOffer).toFixed(5)} ETH</OwnerName>
                                    </DetCard>
                                    <DetCard className="m-2">
                                        <Subtitle>listed</Subtitle>
                                        <Line />
                                        <OwnerName>10%</OwnerName>
                                    </DetCard>
                                </div>
                            </div>
                            <Box className="pdng" sx={{ marginTop: { xs: '48px', sm: "68px" }, marginBottom: { xs: '48px', sm: "200px" } }}
                            >
                                <Tabs
                                    onSelect={(e) => setTab(e)}
                                    defaultActiveKey={window.location.hash ? window.location.hash.replace('#', '') : "items"}
                                    justify
                                    fill
                                    className="mb-5 tab-scroll"
                                    style={{
                                        color: theme === 'light' ? "#5D3393" : "#DABDDF",
                                        // borderColor: theme === 'light' ? "#5D3393" : "#DABDDF",
                                    }}
                                >
                                    <Tab eventKey="items" title="items">
                                        <ItemsTab theme={theme} tab={tab} nfts={collection.nfts} collectionID={id} updatedAt={collection.updated_at.$date} collectionCreator={collection.creator} creatorImage={collection.avatar_path} />
                                    </Tab>
                                    <Tab eventKey="analytics" title={<span className="d-flex align-items-center"><span className="me-1">analytics</span><ButtonDisabled style={{ fontSize: "10px", padding: "4px 8px" }}>Beta</ButtonDisabled> </span>}
                                        disabled
                                    >
                                        <CollectionAnalyticsTab theme={theme} tab={tab} />
                                    </Tab>
                                    <Tab eventKey="activity" title="activity" >
                                        <ActivityTab theme={theme} tab={tab} colId={collection._id.$oid} />
                                    </Tab>
                                </Tabs>
                            </Box>
                        </>}
                </>}
            <Footer />
        </>
    );
}

export default CollectionSingle;