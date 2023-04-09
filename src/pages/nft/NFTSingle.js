import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { Accordion, AccordionDetails, AccordionSummary, Box, LinearProgress, Modal, Typography } from '@mui/material'
import styled from "styled-components";
import { ArrowDown2, ArrowSwapVertical, Chart, Chart1, ChartSuccess, Clock, CloseSquare, Convert3DCube, DeviceMessage, Diagram, Document, DocumentText, Ethereum, EthereumClassic, Eye, ForwardItem, Framer, Heart, I3Dcube, More, Profile2User, Share, Star1, TableDocument } from "iconsax-react";
import { Colors } from "../../components/design/Colors";
import { ButtonLarge, ButtonMedium, ButtonMediumChangable, ButtonOutline } from "../../components/design/Buttons";
import '../../styles.css'
import ItemActivity from "../../components/NFTSingle/ItemActivity";
import OfferHistory from "../../components/NFTSingle/OfferHistory";
import ListingHistory from "../../components/NFTSingle/ListingHistory";
import ItemsCopy from "../../components/NFTSingle/ItemsCopy";
import MoreOfColl from "../../components/NFTSingle/MoreOfColl";
import OfferModal from "../../components/NFTSingle/OfferModal";
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { MARKET_API } from "../../utils/data/market_api";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { API_CONFIG } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { ListMenus, ShareListMenus } from "../../components/listMenus";
import { GetUSDExchangeRate } from "../../utils/exChange";
import { useWeb3React } from "@web3-react/core";
import SellModal from "../../components/NFTSingle/SellModal";
import PlaceBidModal from "../../components/NFTSingle/placeBidModal";
import { countAuctionTime, countCreatorFee, countTimeAgo, shortenMedium } from "../../utils/countingFunctions";
import PriceHistoryTab from "../../components/NFTSingle/PriceHistoryTab";
import NoItemFound from "../../components/NoItem";
import LevelsTab from "../../components/NFTSingle/LevelsTab";
import StatsTab from "../../components/NFTSingle/StatsTab";
import { addItem } from "../../redux/actions";
import { Link } from "react-router-dom";
const NFT = styled.div`
  background-size:cover;
  background-repeat:no-repeat;
  background-position:center;
  border-radius: 24px;
  height:100%;
  width:100%;
  overflow:hidden;
  display:flex;
  flex-direction:column;
  justify-content:start;
  @media screen and (max-width: 575px) {
    height:400px;
  }
  
`;
const Subtitle = styled.p`
color: ${({ theme }) => theme.trendingSectionSubTitles};
margin:0;
display:flex;
align-items:center;
`
const PropCard = styled.div`
background:${({ theme }) => theme.itemCardsBackground};
box-shadow:${({ theme }) => theme.boxShadow};
// border:${({ theme }) => theme.searchBoxBorder};
border-radius: 12px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
height:70px;
padding:10px 20px;
// width:200px;
// @media screen and (max-width: 768px) {
//     font-size:14px;
// }

`;
const Line = styled.div`
background: linear-gradient(90deg,#60606000 0%, #80808080 50%,#918A7A00 100%);
height:1px;
width:60%;
`;
const Num = styled.span`
font-weight:600;
color: ${({ theme }) => theme.text};
`
const Description = styled.div`
display: flex;
flex-direction: column;
justify-content: start;
align-items: start;
padding: 20px 8px 20px 20px;
background: ${({ theme }) => theme.collectionCardHover};
border-radius: 24px;
// overflow-y:scroll;
// height:150px;
// scrollbar-width: 5px;
// -ms-overflow-style: none;
// &::-webkit-scrollbar {
//     width: 7px;
//     background:white;
// }
// &::-webkit-scrollbar-thumb {
//     height:20px;
//     background: ${Colors.primaryDark}; 
//     border-radius: 10px;
// }
// &::-webkit-scrollbar-button{
//     background:${Colors.primaryDark};
//     height:3px;
// }
//   @media screen and (max-width: 768px) {
//     height:300px;
//   }
`;
const DesP = styled.div`
overflow-y:scroll;
height:150px;
width:100%;
scrollbar-width: 5px;
// -ms-overflow-style: none;
&::-webkit-scrollbar {
    width: 7px;
    background:white;
    border-radius:20px !important;
}
&::-webkit-scrollbar-thumb {
    height:20px;
    background: ${Colors.primaryDark}; 
    border-radius: 10px;
}
&::-webkit-scrollbar-button{
    background:${Colors.primaryDark};
    width:3px;
    height:7px;
    border-radius:8px;
}
@media screen and (max-width: 768px) {
    height:250px;
}
`;
const TT = styled.p`
margin:0;
color:${({ theme }) => theme.trendingSectionSubTitles};
@media screen and (max-width: 768px) {
    font-size:14px;
}

`
const LL = styled.p`
margin:0;
color:${Colors.recommendedDark};
@media screen and (max-width: 768px) {
    font-size:14px;
}
`
const P = styled.p`
margin:0;
@media screen and (max-width: 768px) {
    font-size:14px;
}
`
const OwnerImage = styled.div`
width:30px;
height:30px;
border-radius:50%;
background:${Colors.gradientPurpleStandard};
background-position:center;
background-repeat:no-repeat;
background-size:cover;
`
const Changable = styled.button`
// width:100%;
height:100%;
background-color:transparent;
border:none;
color:white;
padding:10px;
&:hover{
    background: linear-gradient(276.27deg, #7830D2 0%, #BB86FF 97.78%);
}

`
const OnNftData = styled.div`
background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.442708) 41.67%, rgba(0, 0, 0, 0) 100%);
height:100px;
width:100%;
display:flex;
align-items:start;
justify-content:space-between;
color:white;
padding:12px;
`
const AuctionTimer = styled.div`
display:flex;
padding:10px;
align-items:center;
border-radius:20px;
background-color:${({ theme }) => theme.collectionCard};
color:${({ theme }) => theme.text};
`














const NFTSingle = ({ theme, themeToggler }) => {
    const { id } = useParams()
    const loadingProperties = ['1', '2', '3', '4', '5']

    var this_time = new Date(Date.now()).getTime()
    const apiCall = useRef(undefined)
    const auctionApiCall = useRef(undefined)
    const shoppingCart = useSelector(state => state.cartReducer);

    const { active, account, library, connector, activate, deactivate } = useWeb3React()

    const [addOfferOpen, setAddOfferOpen] = useState(false)
    const [sellModalOpen, setSellModalOpen] = useState(false)
    const handleClose = () => setAddOfferOpen(false)
    const [thisNFT, setThisNFT] = useState(undefined)
    const [collection, setCollection] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [loadErr, setLoadErr] = useState(undefined)
    const [NFTIMAGE, setNFTIMAGE] = useState(undefined)
    const [isLiked, setIsLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(undefined)
    const [updatedTime, setUpdatedTime] = useState(undefined)
    const [isCreator, setIsCreator] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    const [isListed, setIsListed] = useState(false)
    const [hasOffered, setHasOffered] = useState(false)
    const [bidPlaced, setBidPlaced] = useState(false)
    const [bidModal, setBidModal] = useState(false)
    const [changeButton, setChangeButton] = useState('addToCart')
    const [allPropertiesOpen, setAllPropertiesOpen] = useState(false)
    const [isOnCart, setIsOnCart] = useState(false)
    const dispatch = useDispatch();
    const add = (item) => {
        console.log(shoppingCart.products)
        var itemInCart = shoppingCart.products.find((i) => i.nft_id === item._id.$oid);
        console.log(itemInCart)
        if (itemInCart) {
            if (itemInCart.quantity < item.copies) {
                dispatch(addItem(item))
            }
        } else dispatch(addItem(item))
    };

    const navigate = useNavigate()
    useEffect(() => {
        getNFT()
        return () => {
            if (apiCall.current != undefined)
                apiCall.current.cancel();
        }
    }, [])

    const [usdExRate, setUsdExRate] = useState();
    const [ethExRate, setEthExRate] = useState();
    const [nftPrice, setnftPrice] = useState(undefined);
    const [isOnAuc, setIsOnAuc] = useState(false)
    const [thisOffer, setThisOffer] = useState(undefined)
    useEffect(() => {
        GetUSDExchangeRate().then((res) => {
            setUsdExRate(parseFloat(res));
            console.log("usd", parseFloat(res));
        });
    }, []);


    const getNFT = async () => {
        try {
            apiCall.current = MARKET_API.request({
                path: `/nft/get/`,
                method: "post",
                body: { nft_id: id },
            });
            let response = await apiCall.current.promise;
            console.log('nft??', response)
            if (!response.isSuccess)
                throw response
            setThisNFT(response.data[1].nft)
            setCollection(response.data[0])
            let ITEM_IMAGE = response.data[1].nft.nft_image_path.replace('/root/dortzio/market/media/', '')


            setNFTIMAGE(ITEM_IMAGE)
            setLikesCount(response.data[1].nft.likes.length)
            if (response.data[1].nft.price !== " ") {
                setnftPrice(response.data[1].nft.price)
            } else {
                setnftPrice('0')
            }

            //temporary isListed checking ================================================>
            if (response.data[1].nft.price !== ' ') {
                setIsListed(true)
            }
            //<============================================================================

            for (var l = 0; l < response.data[1].nft.likes.length; l++) {
                if (globalUser.walletAddress == response.data[1].nft.likes[l]) {
                    setIsLiked(true)
                }
            }
            if (response.data[1].nft.current_owner == globalUser.walletAddress) {
                setIsOwner(true)
            }
            if (response.data[0].collection_creator == globalUser.walletAddress) {
                setIsCreator(true)
            }
            for (var o = 0; o < response.data[1].nft.offers.length; o++) {
                if (response.data[1].nft.offers[o].from_wallet_address == globalUser.walletAddress && response.data[1].nft.offers[o].status == 'waiting' && response.data[1].nft.offers[o].is_active == true) {
                    setThisOffer(response.data[1].nft.offers[o])
                    setHasOffered(true)
                }
            }
            if ((response.data[1].nft.auction.length > 0) && (response.data[1].nft.auction[response.data[1].nft.auction.length - 1].is_ended == false)) {
                setIsOnAuc(true)
                if (response.data[1].nft.auction[response.data[1].nft.auction.length - 1].bids.length > 0) {
                    for (let o = 0; o < response.data[1].nft.auction[response.data[1].nft.auction.length - 1].bids.length; o++) {
                        if (response.data[1].nft.auction[response.data[1].nft.auction.length - 1].bids[o].from_wallet_address == globalUser.walletAddress && response.data[1].nft.auction[response.data[1].nft.auction.length - 1].bids[o].status == "waiting") {
                            setBidPlaced(true)
                        }
                    }
                }
            }
            for (let p = 0; p < shoppingCart.products.length; p++) {
                if (shoppingCart.products[p].nft_id == response.data[1].nft._id.$oid) {
                    setIsOnCart(true)
                }
            }

            setLoading(false)
            // setLikeCount(response.data[1].likes.length)
        }
        catch (err) {
            console.log(err)
            if (err.status == 404) {
                navigate('/404')
            }
            else if (err.status == 500) {
                setLoadErr("Internal server error occured, please try again later.")
            }
            // else {
            //     setLoadErr('something went wrong , please try again later')
            // }
        }
    }
    const globalUser = useSelector(state => state.userReducer)

    const likeNFT = async () => {
        if (globalUser.isLoggedIn && active) {
            try {
                apiCall.current = MARKET_API.request({
                    path: `/nft/like/`,
                    method: "post",
                    body: { nft_id: id, wallet_address: globalUser.walletAddress },
                });
                let response = await apiCall.current.promise;
                console.log('nft like??', response)
                if (!response.isSuccess)
                    throw response
                setIsLiked(true)
                setLikesCount(likesCount + 1)
            }
            catch (err) {
                console.log(err)
                if (err.status == 404) {
                }
                else if (err.status == 500) {
                    setLoadErr("Internal server error occured, please try again later.")
                }
            }
        }


    }
    const dislikeNFT = async () => {
        if (globalUser.isLoggedIn && active) {
            try {
                apiCall.current = MARKET_API.request({
                    path: `/nft/unlike/`,
                    method: "post",
                    body: { nft_id: id, wallet_address: globalUser.walletAddress },
                });
                let response = await apiCall.current.promise;
                console.log('nft like??', response)
                if (!response.isSuccess)
                    throw response
                setIsLiked(false)
                setLikesCount(likesCount - 1)

            }
            catch (err) {
                console.log(err)
                if (err.status == 404) {
                }
                else if (err.status == 500) {
                    setLoadErr("Internal server error occured, please try again later.")
                }
            }
        }


    }
    const cancelOffer = async () => {
        if (globalUser.isLoggedIn && active && thisOffer) {
            let tempa = []
            tempa.push(thisOffer)
            console.log('-----------------------------------', tempa)

            try {
                apiCall.current = MARKET_API.request({
                    path: `/nft/offer/cancel/`,
                    method: "post",
                    body: { nft_id: id, offer: JSON.stringify(tempa) },
                });
                let response = await apiCall.current.promise;
                console.log('nft offer canceled??', response)
                if (!response.isSuccess)
                    throw response
                setHasOffered(false)
            }
            catch (err) {
                console.log(err)
                if (err.status == 404) {
                }
                else if (err.status == 500) {
                    setLoadErr("Internal server error occured, please try again later.")
                }
            }
        }


    }


    // more list items
    const [anchorEl, setAnchorEl] = useState(null);
    const [openList, setOpenList] = useState(false)
    const handleList = (e) => {
        setOpenList(!openList)
        setAnchorEl(e.currentTarget);
    }


    var moreListItems = []
    if (isCreator) {
        moreListItems.push({ title: "Edit", link: '/' + 'asset/edit/' + id })
    } else {
        moreListItems.push({ title: "Report" })
    }


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
            //  style={{ padding: "0 32px" }}
            >
                <Navbar theme={theme} themeToggler={themeToggler} />
                {loading ?
                    <LinearProgress color="secondary" sx={{ my: 55, mx: 5 }} /> :
                    <>
                        {loadErr ?
                            <div className="my-5 d-flex justify-content-center align-items-center">
                                <Typography sx={{ color: `${Colors.primaryMain}`, textAlign: 'center', my: 55, mx: 5 }}>{loadErr}</Typography>
                            </div> :
                            <div className="my-5 d-flex flex-column justify-content-between align-items-center" >
                                {/* top section(nft details) */}
                                <div className="row p-0 w-100 justify-content-between">
                                    <div className="mb-1 d-flex d-sm-none p-0 align-items-center justify-content-between">
                                        <div className="col-10 d-flex justify-content-start align-items-center">
                                            <Subtitle style={{ fontSize: "14px" }}><I3Dcube size="12" />&nbsp;collection:</Subtitle>
                                            <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'collection/' + collection.collection_title + '/' + collection.collection_id}>
                                                <p className="m-0" style={{ fontWeight: 500 }}>&nbsp;{collection.collection_title}</p>
                                            </Link>
                                        </div>
                                        <div className="col-2 d-flex justify-content-end align-items-center">
                                            {thisNFT.links ?
                                                <Link style={{ textDecoration: "none", color: "inherit" }}>
                                                    <a target="_blank" style={{ textDecoration: "none", color: "inherit" }} href={thisNFT.links}>
                                                        <Framer size="20" cursor="pointer" />
                                                    </a>
                                                </Link>
                                                : undefined}
                                            <Share size="20" onClick={handleShareList} cursor="pointer" />
                                            <ShareListMenus open={shareList} anchorEl={shareAnchorEl} theme={theme} handleClose={() => setShareList(false)} field={'asset'} id={id} tabs={shareListItems} />
                                            <More size="20" onClick={handleList} cursor="pointer" />
                                            <ListMenus open={openList} anchorEl={anchorEl} theme={theme} handleClose={() => setOpenList(false)} field={'asset'} id={id} tabs={moreListItems} />

                                        </div>
                                    </div>
                                    <div className="p-0 col-12 col-sm-6 col-lg-5">
                                        <NFT style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${NFTIMAGE}`)) }} >
                                            <OnNftData>
                                                <div className="d-flex w-100 align-items-center justify-content-between">
                                                    <div className="d-flex align-items-center" style={{ fontSize: '14px', fontWeight: 500 }}><Eye size='20' className="me-1" />{thisNFT.views} views</div>
                                                    {isOnAuc ? <AuctionTimer><Clock className="me-1" size="15" style={{ color: theme == 'light' ? Colors.gray7 : Colors.gray3 }} /><div style={{ fontSize: "14px", fontWeight: 500 }}>Ends In {countAuctionTime(thisNFT.auction[thisNFT.auction.length - 1])}</div></AuctionTimer> : undefined}
                                                </div>
                                            </OnNftData>
                                        </NFT>
                                    </div>
                                    <div className="p-0 ps-sm-3 col-12 col-sm-6 col-lg-7 d-flex flex-column">
                                        <div className="d-none d-sm-flex p-0 align-items-center justify-content-between">
                                            <div className="col-9 d-flex justify-content-start align-items-center ms-sm-2">
                                                <Subtitle style={{ fontSize: "14px" }}><I3Dcube size="12" />&nbsp;collection:</Subtitle>
                                                <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'collection/' + collection.collection_title + '/' + collection.collection_id}>
                                                    <p className="m-0" style={{ fontWeight: 500 }}>&nbsp;{collection.collection_title}</p>
                                                </Link>
                                            </div>
                                            <div className="col-2 d-flex justify-content-between align-items-center">
                                                {thisNFT.links ?
                                                    <Link style={{ textDecoration: "none", color: "inherit" }}>
                                                        <a target="_blank" style={{ textDecoration: "none", color: "inherit" }} href={thisNFT.links}>
                                                            <Framer size="20" cursor="pointer" />
                                                        </a>
                                                    </Link>
                                                    : undefined}
                                                <Share size="20" onClick={handleShareList} cursor="pointer" />
                                                <ShareListMenus open={shareList} anchorEl={shareAnchorEl} theme={theme} handleClose={() => setShareList(false)} field={'asset'} id={id} tabs={shareListItems} />
                                                <More size="20" onClick={handleList} cursor="pointer" />
                                                <ListMenus open={openList} anchorEl={anchorEl} theme={theme} handleClose={() => setOpenList(false)} field={'asset'} id={id} tabs={moreListItems} />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center justify-content-lg-between ms-sm-2" >
                                            <div className="d-flex col-12 col-lg-7 flex-column justify-content-between">
                                                <div className="my-1 d-flex flex-column justify-content-center">
                                                    <h5 className="mt-2 mb-1" style={{ fontWeight: 600 }}>{thisNFT.title}</h5>
                                                    <div className="d-flex align-items-center">
                                                        <OwnerImage style={{ backgroundImage: thisNFT.avatar_path && thisNFT.avatar_path !== "" ? BG_URL(PUBLIC_URL(`${API_CONFIG.AUTH_MEDIA_API_URL}${thisNFT.avatar_path.replace('root/dortzio/auth/media/', '')}`)) : `${Colors.gradientPurpleStandard}` }} />&nbsp;
                                                        <Link target={'_blank'} style={{ textDecoration: "none", color: "inherit", height: "30px", display: "flex", alignItems: "center" }} to={'/' + 'profile/' + thisNFT.username}>
                                                            <p style={{ fontSize: "14px" }} className="m-0">{shortenMedium(thisNFT.username)}</p>&nbsp;
                                                        </Link>
                                                        <Subtitle style={{ fontSize: "14px" }}>Owner</Subtitle>
                                                    </div>
                                                </div>
                                                <div className="mt-4 mb-3 mb-sm-5 d-flex align-items-center">
                                                    <Subtitle style={{ fontSize: "12px" }}>{isLiked ? <Heart variant="Bold" onClick={dislikeNFT} style={{ cursor: "pointer" }} /> : <Heart size="24" style={{ cursor: "pointer" }} onClick={likeNFT} />}&nbsp;<Num >{likesCount}</Num>&nbsp;Favorites</Subtitle>
                                                    <Subtitle className="ms-4" style={{ fontSize: "12px" }}><Profile2User size="24" />&nbsp;<Num >{thisNFT.owners.length}</Num>&nbsp;Owners</Subtitle>
                                                </div>
                                                <Description className="my-1 d-none d-lg-flex">
                                                    <div className="d-flex align-items-center">
                                                        <Subtitle>By:&nbsp;</Subtitle><OwnerImage style={{ backgroundImage: collection.collection_creator_avatar && collection.collection_creator_avatar !== "" ? BG_URL(PUBLIC_URL(`${API_CONFIG.AUTH_MEDIA_API_URL}${collection.collection_creator_avatar.replace('root/dortzio/auth/media/', '')}`)) : `${Colors.gradientPurpleStandard}` }} />
                                                        <Link target={'_blank'} style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'profile/' + collection.collection_creator_username}>
                                                            <p className="m-0" style={{ fontWeight: "bold" }}>&nbsp;{shortenMedium(collection.collection_creator_username)}</p>
                                                        </Link>
                                                    </div>
                                                    <DesP className="mt-3">
                                                        {thisNFT.description}
                                                    </DesP>
                                                </Description>
                                                <div className="mt-3 mb-1 d-flex align-items-center">
                                                    <EthereumClassic color={Colors.recommendedDark} size="15" />
                                                    <h5 className="m-0 me-2" style={{ fontWeight: 600 }}>{nftPrice} ETH</h5>
                                                    <Subtitle style={{ fontSize: "14px" }}>${(parseFloat(nftPrice) * usdExRate).toFixed(2) == 'NaN' ? '0' : (parseFloat(nftPrice) * usdExRate).toFixed(2)}</Subtitle>
                                                </div>
                                                <div className="d-flex flex-column flex-lg-row justify-content-between">
                                                    {isOwner ?
                                                        <>
                                                            {isListed || isOnAuc ?
                                                                <div className="col-12 col-lg-6 pe-lg-1"><ButtonMedium className="mb-1 mb-lg-0" onClick={() => setSellModalOpen(true)}>Edit Listing</ButtonMedium></div>
                                                                :
                                                                <div className="col-12 col-lg-6 pe-lg-1"><ButtonMedium className="mb-1 mb-lg-0" onClick={() => setSellModalOpen(true)}>Sell</ButtonMedium></div>
                                                            }
                                                        </>
                                                        :
                                                        <>
                                                            {isListed ?
                                                                <>
                                                                    {isOnAuc ?
                                                                        <>
                                                                            {changeButton ?
                                                                                <div className="col-12 col-lg-6 pe-lg-1"><ButtonMediumChangable className="mb-1 mb-lg-0" >
                                                                                    <Changable style={{ width: '100%' }} onClick={() => add(thisNFT)}>Add To Cart</Changable>
                                                                                    <Changable onMouseEnter={() => setChangeButton(undefined)} onMouseLeave={() => setChangeButton('addToCart')} style={{ borderLeft: "1px solid white", width: 'auto' }} ><ArrowSwapVertical /></Changable>
                                                                                </ButtonMediumChangable></div>
                                                                                :
                                                                                undefined}
                                                                        </>
                                                                        :
                                                                        <div className="col-12 col-lg-6 pe-lg-1"><ButtonMedium onClick={() => add(thisNFT)} className="mb-1 mb-lg-0">Add To Cart</ButtonMedium></div>
                                                                    }

                                                                    {isOnAuc ?
                                                                        <>
                                                                            {bidPlaced ?
                                                                                <>{!changeButton ?
                                                                                    <div className="col-12 col-lg-6 pe-lg-1"><ButtonMediumChangable className="mb-1 mb-lg-0" ><Changable style={{ width: '100%' }} onClick={() => setBidModal(true)}>Place A Higher Bid</Changable><Changable onMouseEnter={() => setChangeButton('addToCart')} onMouseLeave={() => setChangeButton(undefined)} style={{ borderLeft: "1px solid white", width: 'auto' }} ><ArrowSwapVertical /></Changable></ButtonMediumChangable></div>
                                                                                    : undefined}
                                                                                </> :
                                                                                <>{!changeButton ?
                                                                                    <div className="col-12 col-lg-6 pe-lg-1"><ButtonMediumChangable className="mb-1 mb-lg-0" ><Changable style={{ width: '100%' }} onClick={() => setBidModal(true)}>Place A Bid</Changable><Changable onMouseEnter={() => setChangeButton('addToCart')} onMouseLeave={() => setChangeButton(undefined)} style={{ borderLeft: "1px solid white", width: 'auto' }} ><ArrowSwapVertical /></Changable></ButtonMediumChangable></div>
                                                                                    : undefined}
                                                                                </>
                                                                            }
                                                                        </>
                                                                        :
                                                                        undefined
                                                                    }
                                                                    {hasOffered ?
                                                                        <>
                                                                            <div className="col-12 col-lg-6 ps-lg-1"><ButtonOutline style={{ width: "100%", }} onClick={cancelOffer}>Cancel Offer</ButtonOutline></div>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <div className="col-12 col-lg-6 ps-lg-1"><ButtonOutline style={{ width: "100%", }} onClick={() => setAddOfferOpen(true)}>Make Offer</ButtonOutline></div>
                                                                        </>
                                                                    }
                                                                </>
                                                                :
                                                                <>
                                                                    {isOnAuc ?
                                                                        <>
                                                                            {bidPlaced ?
                                                                                <>
                                                                                    <div className="col-12 col-lg-6 pe-lg-1"><ButtonMedium className="mb-1 mb-lg-0" onClick={() => setBidModal(true)}>Place A Higher Bid</ButtonMedium></div>
                                                                                </> :
                                                                                <>
                                                                                    <div className="col-12 col-lg-6 pe-lg-1"><ButtonMedium className="mb-1 mb-lg-0" onClick={() => setBidModal(true)}>Place A Bid</ButtonMedium></div>
                                                                                </>
                                                                            }
                                                                        </> : undefined
                                                                    }
                                                                    {hasOffered ?
                                                                        <div className="col-12 col-lg-6 ps-lg-1"><ButtonOutline style={{ width: "100%", }} onClick={cancelOffer}>Cancel Offer</ButtonOutline></div>
                                                                        :
                                                                        <div className="col-12 col-lg-6 ps-lg-1"><ButtonOutline style={{ width: "100%", }} onClick={() => setAddOfferOpen(true)}>Make Offer</ButtonOutline></div>
                                                                    }
                                                                </>}
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                            <div className="mt-2 d-none d-lg-flex col-4 flex-column text-center justify-content-center align-items-center">
                                                <p className="m-0">Properties</p>
                                                {thisNFT.extra.length < 4 ?
                                                    <>
                                                        {thisNFT.extra.slice(0, thisNFT.extra.length).map((property) => {
                                                            return <PropCard className="col-12 my-1">
                                                                <div className="d-flex">
                                                                    <p className="m-0" style={{ fontSize: "16px", fontWeight: 400, color: theme == 'light' ? `${Colors.gray5}` : '#d9d9d9' }}>{property.name}&nbsp;:&nbsp;</p><p className="m-0" style={{ fontWeight: "bold" }}>{property.value}</p>
                                                                </div>
                                                                <Line className="my-1" />
                                                                <Subtitle style={{ fontSize: "12px" }}>{property.rarity}% have this trait</Subtitle>
                                                            </PropCard>
                                                        })}
                                                        {loadingProperties.slice(0, (4 - thisNFT.extra.length)).map((l) => {
                                                            return <PropCard className="col-12 my-1" />
                                                        })}

                                                    </> :
                                                    <>
                                                        {thisNFT.extra.slice(0, 4).map((property) => {
                                                            return <PropCard className="col-12 my-1">
                                                                <div className="d-flex">
                                                                    <p className="m-0" style={{ fontSize: "16px", fontWeight: 400, color: theme == 'light' ? `${Colors.gray5}` : '#d9d9d9' }}>{property.name}&nbsp;:&nbsp;</p><p className="m-0" style={{ fontWeight: "bold" }}>{property.value}</p>
                                                                </div>
                                                                <Line className="my-1" />
                                                                <Subtitle style={{ fontSize: "12px" }}>{property.rarity}% have this trait</Subtitle>
                                                            </PropCard>
                                                        })}

                                                    </>}

                                                <div style={{ cursor: "pointer", fontSize: "12px" }} className="align-self-center text-center p-3" onClick={() => setAllPropertiesOpen(true)}>
                                                    View All
                                                    <br />
                                                    <div style={{ width: "auto", padding: "0" }}><ArrowDown2 size="12" /></div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                {/* properties in tablet and mobile screen */}
                                <div className="mt-4 d-flex w-100 d-lg-none flex-column">
                                    {thisNFT.extra.length > 0 ? <>
                                        <p className="m-0">Properties</p>
                                        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-sm-between p-0">
                                            {thisNFT.extra.map((property) => {
                                                return <PropCard className="col-12 col-sm-3 m-2">
                                                    <div className="d-flex">
                                                        <p className="m-0" style={{ fontSize: "16px", fontWeight: 400, color: theme == 'light' ? `${Colors.gray5}` : '#d9d9d9' }}>{property.name}&nbsp;:&nbsp;</p><p className="m-0" style={{ fontWeight: "bold" }}>{property.value}</p>
                                                    </div>
                                                    <Line className="my-1" />
                                                    <Subtitle style={{ fontSize: "12px" }}>{property.rarity}% have this trait</Subtitle>
                                                </PropCard>
                                            })}
                                        </div>
                                    </> : undefined}
                                    <Description className="mt-3">
                                        <div className="d-flex">
                                            <Subtitle>By:</Subtitle><p className="m-0" style={{ fontWeight: "bold" }}>&nbsp;{shortenMedium(collection.collection_creator_username)}</p>
                                        </div>
                                        <DesP className="mt-3">
                                            {thisNFT.description}
                                        </DesP>
                                    </Description>
                                </div>
                                {/* Accordions */}
                                <div className="my-3 w-100 d-flex flex-column flex-lg-row">
                                    <div className="col-12 col-lg-6 pe-lg-2" >
                                        <Accordion className="mb-3" sx={{
                                            marginTop: '12px !important',
                                            width: '100%',
                                            bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                                            color: theme == 'light' ? "#4d4d4d" : "#e6e6e6",
                                            border: 'none',
                                            boxShadow: 'none',
                                            '&:before': {
                                                bgcolor: 'transparent',
                                            },
                                            boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                                            borderRadius: '24px !important',
                                        }}>
                                            <AccordionSummary
                                                expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography sx={{ display: "flex", alignItems: "center", color: theme == 'light' ? `${Colors.gray7}` : `${Colors.gray2}` }}><DocumentText size="18" className="me-1" />Details</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="d-flex flex-column">
                                                    <div className="d-flex justify-content-between w-100 align-items-center">
                                                        <TT className="m-0">Contract Address</TT>
                                                        <LL className="m-0">546gdrs54341...</LL>
                                                    </div>
                                                    <div className="d-flex justify-content-between w-100 align-items-center">
                                                        <TT className="m-0">Token ID</TT>
                                                        <LL className="m-0">{shortenMedium(id)}</LL>
                                                    </div>
                                                    <div className="d-flex justify-content-between w-100 align-items-center">
                                                        <TT className="m-0">Token Standard</TT>
                                                        <P className="m-0">ERC-1155</P>
                                                    </div>
                                                    <div className="d-flex justify-content-between w-100 align-items-center">
                                                        <TT className="m-0">Chain</TT>
                                                        <P className="m-0">Ethereum</P>
                                                    </div>
                                                    <div className="d-flex justify-content-between w-100 align-items-center">
                                                        <TT className="m-0">Last Update</TT>
                                                        <P className="m-0">{countTimeAgo(thisNFT.updated_at.$date)}</P>
                                                    </div>
                                                    <div className="d-flex justify-content-between w-100 align-items-center">
                                                        <TT className="m-0">Creator Fee</TT>
                                                        <P className="m-0">{countCreatorFee(collection.perpetual_royalties, collection.collection_creator)}</P>
                                                    </div>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion className="mb-3" sx={{
                                            marginTop: '12px',
                                            width: '100%',
                                            bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                                            color: theme == 'light' ? "#4d4d4d" : "#e6e6e6",
                                            border: 'none',
                                            boxShadow: 'none',
                                            '&:before': {
                                                bgcolor: 'transparent',
                                            },
                                            boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                                            borderRadius: '24px !important',
                                        }}>
                                            <AccordionSummary
                                                expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography sx={{ display: "flex", alignItems: "center" }}><TableDocument size="18" className="me-1" />Listings</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <ListingHistory listings={thisNFT.listings} />
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion className="mb-3" sx={{
                                            marginTop: '12px',
                                            width: '100%',
                                            bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                                            color: theme == 'light' ? "#4d4d4d" : "#e6e6e6",
                                            border: 'none',
                                            boxShadow: 'none',
                                            '&:before': {
                                                bgcolor: 'transparent',
                                            },
                                            boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                                            borderRadius: '24px !important',
                                        }}>
                                            <AccordionSummary
                                                expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography sx={{ display: "flex", alignItems: "center" }}><DeviceMessage size="18" className="me-1" />about {collection.collection_title}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="d-flex flex-column">
                                                    <p style={{ fontWeight: 500 }}>{collection.collection_title}</p>
                                                    <TT>
                                                        {collection.col_desc}
                                                    </TT>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion className="mb-3" sx={{
                                            marginTop: '12px',
                                            width: '100%',
                                            bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                                            color: theme == 'light' ? "#4d4d4d" : "#e6e6e6",
                                            border: 'none',
                                            boxShadow: 'none',
                                            '&:before': {
                                                bgcolor: 'transparent',
                                            },
                                            boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                                            borderRadius: '24px !important',
                                        }}>
                                            <AccordionSummary
                                                expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography sx={{ display: "flex", alignItems: "center" }}><ChartSuccess size="18" className="me-1" />stats</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <StatsTab stats={thisNFT.stats} />
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                    <div className="col-12 col-lg-6 ps-lg-2" >
                                        <Accordion className="mb-3" sx={{
                                            width: '100%',
                                            bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                                            color: theme == 'light' ? "#4d4d4d" : "#e6e6e6",
                                            border: 'none',
                                            boxShadow: 'none',
                                            '&:before': {
                                                bgcolor: 'transparent',
                                            },
                                            boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                                            borderRadius: '24px !important',
                                            mt: '12px',
                                            '@media (max-width: 992px)': {
                                                mt: '0',
                                            }
                                        }}>
                                            <AccordionSummary
                                                expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography sx={{ display: "flex", alignItems: "center" }}><ForwardItem size="18" className="me-1" />Items</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails className="p-0 pe-3 pb-3">
                                                <ItemsCopy nft={thisNFT} />
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion className="mb-3" sx={{
                                            marginTop: '12px',
                                            width: '100%',
                                            bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                                            color: theme == 'light' ? "#4d4d4d" : "#e6e6e6",
                                            border: 'none',
                                            boxShadow: 'none',
                                            '&:before': {
                                                bgcolor: 'transparent',
                                            },
                                            boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                                            borderRadius: '24px !important',
                                        }}>
                                            <AccordionSummary
                                                expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography sx={{ display: "flex", alignItems: "center" }}><Diagram size="18" className="me-1" />Offers</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <OfferHistory offers={thisNFT.offers} theme={theme} />
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion className="mb-3" sx={{
                                            marginTop: '12px',
                                            width: '100%',
                                            bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                                            color: theme == 'light' ? "#4d4d4d" : "#e6e6e6",
                                            border: 'none',
                                            boxShadow: 'none',
                                            '&:before': {
                                                bgcolor: 'transparent',
                                            },
                                            boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                                            borderRadius: '24px !important',
                                        }}>
                                            <AccordionSummary
                                                expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography sx={{ display: "flex", alignItems: "center" }}><Chart1 size="18" className="me-1" />Price History</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <PriceHistoryTab history={thisNFT.price_history} />
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion className="mb-3" sx={{
                                            marginTop: '12px',
                                            width: '100%',
                                            bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                                            color: theme == 'light' ? "#4d4d4d" : "#e6e6e6",
                                            border: 'none',
                                            boxShadow: 'none',
                                            '&:before': {
                                                bgcolor: 'transparent',
                                            },
                                            boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                                            borderRadius: '24px !important',
                                        }}>
                                            <AccordionSummary
                                                expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography sx={{ display: "flex", alignItems: "center" }}><Star1 size="18" className="me-1" />Levels</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <LevelsTab levels={thisNFT.levels} />
                                            </AccordionDetails>
                                        </Accordion>

                                    </div>

                                </div>
                                {/* item activity */}
                                <ItemActivity theme={theme} activities={thisNFT.asset_activity} />
                                <MoreOfColl collectionId={collection.collection_id} theme={theme} itemID={thisNFT._id.$oid} collectionTitle={collection.collection_title} />
                            </div>
                        }
                        <OfferModal getNFT={getNFT} setHasOffered={setHasOffered} collection={collection} nft={thisNFT} userWallet={globalUser.walletAddress} open={addOfferOpen} theme={theme} handleClose={handleClose} />
                        <PlaceBidModal bidPlaced={bidPlaced} collection={collection} nft={thisNFT} userWallet={globalUser.walletAddress} open={bidModal} theme={theme} handleClose={() => setBidModal(false)} />
                        <SellModal collection={collection} nft={thisNFT} userWallet={globalUser.walletAddress} open={sellModalOpen} theme={theme} handleClose={() => setSellModalOpen(false)} />
                        {/* all properties modal  ===> */}
                        <Modal open={allPropertiesOpen}
                            onClose={() => setAllPropertiesOpen(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            className="d-none d-lg-flex"
                            disableScrollLock={true}
                        >
                            <Box sx={{
                                width: '50%',
                                borderRadius: "24px",
                                position: "absolute",
                                top: "25%",
                                left: "25%",
                                p: 4,
                                bgcolor: theme == 'light' ? "#ffffff" : "#272448",
                                '@media screen and (max-width: 992px)': {
                                    width: '100%',
                                    left: "0",
                                    bottom: "0",
                                    borderBottomLeftRadius: 0,
                                    borderBottomRightRadius: 0,
                                },
                            }} className="d-flex flex-column align-items-center justify-content-center">
                                <Box className="d-flex w-100 justify-content-between">
                                    <div className="mb-4 d-flex justify-content-start" ><p style={{ margin: 0, fontWeight: "bold" }}>All Properties</p></div>
                                    <div className="d-flex justify-content-end" style={{ cursor: "pointer" }} onClick={() => setAllPropertiesOpen(false)}><CloseSquare /></div>
                                </Box>
                                <Line className="mb-3" />
                                <Box className="w-100 d-flex flex-wrap p-0">
                                    {thisNFT.extra.length > 0 ? <>
                                        {thisNFT.extra.map((property) => {
                                            return <PropCard className="col-4">
                                                <div className="d-flex">
                                                    <p className="m-0" style={{ fontSize: "16px", fontWeight: 400, color: theme == 'light' ? `${Colors.gray5}` : '#d9d9d9' }}>{property.name}&nbsp;:&nbsp;</p><p className="m-0" style={{ fontWeight: "bold" }}>{property.value}</p>
                                                </div>
                                                <Line className="my-1" />
                                                <Subtitle style={{ fontSize: "12px" }}>{property.rarity}% have this trait</Subtitle>
                                            </PropCard>
                                        })}
                                    </> : undefined}
                                </Box>
                            </Box>
                        </Modal>
                    </>
                }
            </div>
            <Footer />


        </>
    );
}

export default NFTSingle;