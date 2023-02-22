import styled from "styled-components";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar/Navbar";
import bannerPic from '../../assets/collectionBanner.svg'
import logoPic from '../../assets/collectionLogo.png'
import { ArrowDown2, Dribbble, Global, Instagram, More, Share, Star } from "iconsax-react";
import '../../styles.css'
import SearchBox from "../../components/Navbar/SearchBox";
import { Tab, Tabs } from "react-bootstrap";
import ItemsTab from "../../components/CollectionSingle/ItemsTab";
import ActivityTab from "../../components/CollectionSingle/ActivityTab";
import CollectionAnalyticsTab from "../../components/CollectionSingle/AnalyticsTab";
import { Box, LinearProgress, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { MARKET_API } from "../../utils/data/market_api";
import { useRef } from "react";
import { useEffect } from "react";
import { API_CONFIG } from "../../config";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { Colors } from "../../components/design/Colors";
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
//   background-image: url(${logoPic});
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
color: ${({ theme }) => theme.trendingSectionSubTitles};
font-weight:600;
`
const CollectionSingle = ({ theme, themeToggler }) => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [collection, setCollection] = useState(undefined)
    const [loadErr, setLoadErr] = useState(undefined)
    const [logo, setLogo] = useState(undefined)
    const [banner, setBanner] = useState(undefined)
    const [desLong, setDesLong] = useState(false)
    const apiCall = useRef(undefined)
    const navigate = useNavigate()
    const shortenDes = (str) => {
        if (str)
            return str.length > 100 ? str.substring(0, 70) + "..." : str;
        return 'undefined'
    }
    const countCreatorFee = (royalties, creator) => {
        for (var i = 0; i < royalties.length; i++)
            if (royalties[i].wallet_address == creator)
                return <span>{royalties[i].royalty}%</span>
            else return <span>0%</span>
    }

    useEffect(() => {
        getCollection()
        return () => {
            if (apiCall.current != undefined)
                apiCall.current.cancel();
        }
    }, [])

    const convertDate = (TSdate) => {
        const date = new Date(TSdate);
        const day = date.getDate()
        const month = date.toLocaleString('default', { month: 'short' });
        console.log(day);
        return <span>{month + day}</span>

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
            setCollection(response.data)
            var LOGO_PATH = response.data.logo_path ? response.data.logo_path.replace('root/NFTMarketplace-Backend/market/media/', '') : undefined;
            var BANNER_PATH = response.data.banner_image_path ? response.data.banner_image_path.replace('root/NFTMarketplace-Backend/market/media/', '') : undefined;
            var bg_LOGO = BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${LOGO_PATH}`))
            var bg_BANNER = BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${BANNER_PATH}`))
            console.log(BANNER_PATH)
            setLogo(bg_LOGO)
            setBanner(bg_BANNER)

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

    useEffect(() => {
        if (collection || loadErr)
            setLoading(false)
    }, [collection, loadErr])


    return (
        <>
            <div className="pdng"
            //  style={{ padding: "0 32px" }}
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
                                    <div><Instagram size="20" className="m-1 d-none d-sm-inline" /><Dribbble size="20" className="m-1 d-none d-sm-inline" /><Global size="20" className="m-1 d-none d-sm-inline" /></div>
                                    <div><Star size="20" className="m-1 d-none d-sm-inline" /><Share size="20" className="m-1" /><More size="20" className="m-1" /></div>
                                </div>
                                <div className="d-flex justify-content-center mt-3 mt-sm-5">
                                    <h5 className="m-2" style={{ fontWeight: 600 }}>
                                        {collection.title}
                                    </h5>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <p className="m-2"><Subtitle>By </Subtitle><OwnerName>Owner </OwnerName></p>
                                </div>
                                <div className="d-flex flex-wrap justify-content-center">
                                    <p className="m-2"><Subtitle>Items </Subtitle><OwnerName>{collection.nft_ids.length}</OwnerName></p>
                                    <p className="m-2"><Subtitle>Created </Subtitle><OwnerName>{convertDate(collection.created_at.$date)} </OwnerName></p>
                                    <p className="m-2"><Subtitle>Creator Fee </Subtitle><OwnerName>{countCreatorFee(collection.perpetual_royalties, collection.creator)}</OwnerName></p>
                                    <p className="m-2"><Subtitle>Owners </Subtitle><OwnerName>{collection.nft_owners_count}</OwnerName></p>
                                    <p className="m-2"><Subtitle>Unique Owners </Subtitle><OwnerName>50% </OwnerName></p>
                                </div>
                                <div className="d-none d-sm-flex flex-column justify-content-center align-items-center text-center">
                                    <p className="mt-2 mb-0"><Subtitle style={{ fontWeight: 400 }}>{desLong ? <>{collection.description}</> : <>{shortenDes(collection.description)}</>}</Subtitle></p>
                                    {collection.description.length > 100 && !desLong ?
                                        <OwnerName style={{ cursor: "pointer" }} onClick={() => setDesLong(true)}>See more <ArrowDown2 size="20" /></OwnerName> : undefined}
                                </div>
                                <div className="d-flex flex-wrap justify-content-center">
                                    <DetCard className="m-2">
                                        <Subtitle>total price</Subtitle>
                                        <Line />
                                        <OwnerName>{collection.floor_price}</OwnerName>
                                    </DetCard>
                                    <DetCard className="m-2">
                                        <Subtitle>floor price</Subtitle>
                                        <Line />
                                        <OwnerName>{collection.floor_price}</OwnerName>
                                    </DetCard>
                                    <DetCard className="m-2">
                                        <Subtitle>best offer</Subtitle>
                                        <Line />
                                        <OwnerName>0.56 ETH</OwnerName>
                                    </DetCard>
                                    <DetCard className="m-2">
                                        <Subtitle>listed</Subtitle>
                                        <Line />
                                        <OwnerName>10%</OwnerName>
                                    </DetCard>
                                </div>
                            </div>
                            <Box className="pdng" sx={{ marginTop: { xs: '48px', sm: "68px" }, marginBottom: { xs: '48px', sm: "200px" } }}
                            //  style={{ padding: "0 32px" }}
                            >
                                <Tabs
                                    defaultActiveKey={window.location.hash ? window.location.hash.replace('#', '') : "items"}
                                    // id="justify-tab-example"
                                    // justify
                                    className="mb-3"
                                    style={{
                                        color: theme === 'light' ? "#5D3393" : "#DABDDF",
                                        // borderColor: theme === 'light' ? "#5D3393" : "#DABDDF",
                                    }}
                                >
                                    <Tab eventKey="items" title="items">
                                        <ItemsTab theme={theme} nfts={collection.nfts} collectionID={id} updatedAt={collection.updated_at.$date} />
                                    </Tab>
                                    <Tab eventKey="analytics" title="analytics"
                                    //  disabled
                                    >
                                        <CollectionAnalyticsTab theme={theme} />
                                    </Tab>
                                    <Tab eventKey="activity" title="activity" >
                                        <ActivityTab theme={theme} />
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