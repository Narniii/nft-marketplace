import { ArrowDown2, ArrowSquareRight, ArrowSwapHorizontal, ArrowSwapVertical, BagTick, CloseSquare, DocumentDownload, DocumentText, FilterSearch, Gift, Grid1, Grid2, Grid5, HambergerMenu, Logout, Magicpen, Refresh2 } from "iconsax-react";
import styled from "styled-components";
import { TestColls } from "../utils/testCollections";
import { Accordion, AccordionDetails, AccordionSummary, Box, CircularProgress, LinearProgress, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import testnft from '../assets/test1.png'
import { Colors } from "../components/design/Colors";
import Modal from '@mui/material/Modal';
import '../styles.css'
import Navbar from "../components/Navbar/Navbar";
import ImgHd from '../assets/stats-activity.svg'
import bgDes from '../assets/bgDots-desktop.svg'
import bgTab from '../assets/bgDots-tablet.svg'
import bgMob from '../assets/bgDots-mobile.svg'
import { MARKET_API } from "../utils/data/market_api";
import NoItemFound from "../components/NoItem";
import { BG_URL, PUBLIC_URL } from "../utils/utils";
import { API_CONFIG } from "../config";
import TickPic from '../assets/tick.svg'
import SearchBox from "../components/Navbar/SearchBox";
import OfferIconOutline from "../components/design/OfferIcon";

const CheckPut = styled.div`
cursor:pointer;
border: 1.5px solid #E6E6E6;
border-radius: 9px;
width:32px;
height:32px;
background-color:#f9f9f9;
overflow:hidden;
position:relative;
display:flex;
align-items:center;
justify-content:center;
`;
const Selection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor:pointer;
    background: transparent;
    justify-content:space-between;
    border: 1px solid #D9D9D9;
    border-radius: 24px;
    overflow:hidden;
    height:100%;
    width:200px;
`;
const ItemsContainerSmall = styled.div`
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: ${({ theme }) => theme.itemCardsBackground};
    // border: ${({ theme }) => theme.searchBoxBorder};
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    padding: 12px 0px;
    width:100%;
    overflow-y:scroll;
    transition:300ms ease;
    height:500px;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display:none;
    }

`;
const ItemsContainerDesktop = styled.div`
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: ${({ theme }) => theme.itemCardsBackground};
    // border: ${({ theme }) => theme.searchBoxBorder};
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    // padding: 25px;
    // width:100%;
    overflow-y:scroll;
    transition:300ms ease;
    height:500px;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display:none;
    }
    
`;
const FilterContainer = styled.div`
box-shadow: ${({ theme }) => theme.boxShadow};
background-color: ${({ theme }) => theme.itemCardsBackground};
// border: ${({ theme }) => theme.searchBoxBorder};
border-radius: 24px;
display: flex;
flex-direction: column;
// padding: 25px;
// width:100%;
height:max-content;
overflow:hidden;
`;
const ChartContainer = styled.div`
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: ${({ theme }) => theme.itemCardsBackground};
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    padding: 12px 0px;
    width:100%;
    overflow:hidden;
    height:300px;
`;
const MainDetail = styled.div`
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    // border:1px solid purple;
    padding: 20px;

`;
const Detail = styled.div`
    display: none;
    flex-direction: row;
    justify-content:space-between; 
    // border:1px solid yellow;
    padding: 20px;

`;
const Line = styled.div`
    display: none;
    background: linear-gradient(90deg,#60606000 0%, #80808080 50%,#918A7A00 100%);
    height:1px;
    align-self:center;
    width:80%;
`;
const VisibleLine = styled.div`
    background: linear-gradient(90deg,#60606000 0%, #80808080 50%,#918A7A00 100%);
    height:1px;
    align-self:center;
    width:90%;
`;
const ProductCardSmall = styled.div`
    background-color: ${({ theme }) => theme.itemCardsBackground};
    display: flex;
    flex-direction: column;
    width:100%;
    // border:1px solid red;
    justify-content:space-between; 
    &:hover{
        box-shadow:${({ theme }) => theme.deeperBoxShadow};
        ${Line}{
            display:block;
        }
        ${Detail}{
            display:flex;
        }
    }
`;
const ItemImage = styled.div`
    // background-image: url(${testnft});
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;
    height:45px;
    width:45px;
    margin-right:1px;
    border-radius:12px;
`;
const ProductCardDesktop = styled.div`
    // border-radius: 24px;
    display: flex;
    flex-direction: row;
    padding: 20px;
    justify-content:space-between;
    width:100%;
    &:hover{
        background-color:${({ theme }) => theme.collectionCardHover};
    }
    @media screen and (max-width: 1200px) {
        font-size:14px;
    }

`;
const Subtitle = styled.p`
    color: ${({ theme }) => theme.par};
    display:flex;
    align-items:center;
    margin:0;
`
const Recommend = styled.span`
    color: ${Colors.recommendedDark};
    display:flex;
    align-items:center;
    // font-size:12px;
`
const Price = styled.p`
    color: ${({ theme }) => theme.trendingSectionSubTitles};
    margin:0;
    display:flex;
    align-items:center;
`
const Name = styled.p`
    color: ${({ theme }) => theme.collectionDetailsTitle};
    margin:0;
    display:flex;
    align-items:center;
`
const Edition = styled.p`
    color: ${({ theme }) => theme.prices};
    margin:0;
    display:flex;
    align-items:center;
    font-weight:600;
`
const ModalLine = styled.div`
    background: linear-gradient(90deg,#60606000 0%, #80808080 50%,#918A7A00 100%);
    height:2px;
    align-self:center;
    width:70%;
`;
const ColUl = styled.ul`
height: 200px;
 overflow-y: scroll;
 scrollbar-width: 5px;
 &::-webkit-scrollbar {
     height: 7px;
     width: 7px;
     background:white;
     border:0.5px solid #D9D9D9;
     border-radius:20px !important;
 }
 &::-webkit-scrollbar-thumb {
     height:5px;
     width:5px;
     background: ${Colors.primaryDark}; 
     border-radius: 20px;
 }
 &::-webkit-scrollbar-button{
     background:${Colors.primaryDark};
     width:3px;
     height:7px;
    border-radius:8px;
 }
//  -ms-overflow-style: none;
`

const themeHere = window.localStorage.getItem('theme');
const Modalstyle = {
    width: '100%',
    height: '100%',
    p: 4,
    bgcolor: themeHere == 'light' ? "#F9F9F9" : "#272448",
};
const AccStyle = {
    width: '100%',
    bgcolor: themeHere == 'light' ? "#F9F9F9" : "#272448",
    color: themeHere == 'light' ? "#333333" : "#e6e6e6",
    border: 'none',
    boxShadow: 'none',
    '&:before': {
        bgcolor: 'transparent',
    }
};

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

const ActivityStats = ({ theme, userWallet, themeToggler }) => {
    const handleOpen = () => setOpenFilter(true);
    const handleClose = () => setOpenFilter(false);
    const [checked, setChecked] = useState([])
    const [colChecked, setColChecked] = useState([])
    const [value, setValue] = useState(undefined)
    const [colValue, setColValue] = useState(undefined)
    const [collections, setCollections] = useState([])
    const [loading, setLoading] = useState(true)
    const [openFilter, setOpenFilter] = useState(false)
    const handleFilter = () => {
        if (openFilter) setOpenFilter(false)
        else setOpenFilter(true)
    }

    const [activities, setActivities] = useState(undefined)
    const [allActivities, setAllActivities] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const apiCall = useRef(undefined)

    const shorten = (str) => {
        if (str)
            return str.length > 10 ? str.substring(0, 7) + "..." : str;
        return 'undefined'
    }
    const handleCheck = (e) => {
        console.log(e.target.current)
        e.preventDefault()
        var tempArr = checked;
        var tempAct = []
        var allAct = allActivities

        setValue(e.target.id)
        if (tempArr.includes(e.target.id)) {
            const removeItem = tempArr.filter((item) => item != e.target.id);
            tempArr = removeItem
        }
        else {
            tempArr.push(e.target.id)
        }
        setChecked(tempArr)

        // for (var f = 0; f < tempArr.length; f++) {
        //     const findAct = allAct.filter((act) => act.event == tempArr[f])
        //     for (var t = 0; t < findAct.length; t++) {
        //         tempAct.push(findAct[t])
        //     }
        // }


        for (var p = 0; p < allAct.length; p++) {
            if (tempArr.includes(allAct[p].event)) {
                tempAct.push(allAct[p])
                if (colChecked.length > 0) {
                    let temm = tempAct.filter((act) => colChecked.includes(act.collection_id))
                    tempAct = temm
                }
            }
        }

        console.log(tempAct)
        console.log(tempArr)

        if (tempArr.length > 0) {
            setActivities(tempAct)
        }
        else {
            if (colChecked.length > 0) {
                let tempCh = allAct.filter((act) => colChecked.includes(act.collection_id))
                setActivities(tempCh)
            } else {
                setActivities(allAct)
            }
        }


        if (tempArr.includes(e.target.id)) {
            document.getElementById(e.target.id).style.backgroundColor = '#46C263';
        } else {
            document.getElementById(e.target.id).style.backgroundColor = '#f9f9f9';
        }

    }
    const handleColCheck = (e) => {
        e.preventDefault()
        var tempArrCol = colChecked;
        var tempActCol = []
        var allActCol = allActivities
        console.log('heeelllowww????', tempArrCol)
        setColValue(e.target.id)
        // console.log(e.target.id)
        if (tempArrCol.includes(e.target.id)) {
            const removeItem = tempArrCol.filter((item) => item != e.target.id);
            tempArrCol = removeItem
        }
        else {
            tempArrCol.push(e.target.id)
        }
        setColChecked(tempArrCol)
        for (var p = 0; p < allActCol.length; p++) {
            if (tempArrCol.includes(allActCol[p].collection_id)) {
                tempActCol.push(allActCol[p])
                if (checked.length > 0) {
                    let temm = tempActCol.filter((act) => checked.includes(act.event))
                    tempActCol = temm
                }
            }
        }

        console.log(tempActCol)
        console.log(tempArrCol)

        if (tempArrCol.length > 0) {
            setActivities(tempActCol)
        }
        else {
            if (checked.length > 0) {
                let tempCh = allActCol.filter((act) => checked.includes(act.event))
                setActivities(tempCh)
            } else {
                setActivities(allActCol)
            }
        }


        if (tempArrCol.includes(e.target.id)) {
            document.getElementById(e.target.id).style.backgroundColor = '#46C263';
        } else {
            document.getElementById(e.target.id).style.backgroundColor = '#f9f9f9';
        }

    }
    const fetchCollections = async () => {
        try {
            apiCall.current = MARKET_API.request({
                path: `/collection/all/?from=0&to=50`,
                method: "get",
            })
            const response = await apiCall.current.promise;
            if (!response.isSuccess)
                throw response
            setCollections(response.data)
        }
        catch (err) {
            console.log(err)
            if (err.status == 404) {
                setCollections([])
            }
            else if (err.status == 500) {
                setErr("Internal server error")
            }
        }
    }
    const fetchItems = async () => {
        try {
            apiCall.current = MARKET_API.request({
                // path: `/nft/all/?from=0&to=20`,
                // method: "get",

                path: `/nft/get/all/activities/`,
                method: "post",
                body: {
                    from: 0,
                    to: 30
                }


            })
            const response = await apiCall.current.promise;
            if (!response.isSuccess)
                throw response


            setAllActivities(response.data)
            setActivities(response.data)
            // var tempArr = []
            // for (let t = 0; t < response.data.length; t++) {
            //     if (response.data[t].asset_activity.length > 0) {
            //         for (let f = 0; f < response.data[t].asset_activity.length; f++) {
            //             var tempObj = {}
            //             tempObj.productImage = response.data[t].nft_image_path
            //             tempObj.productName = response.data[t].title
            //             tempObj.asset_activity = response.data[t].asset_activity[f]
            //             tempArr.push(tempObj)
            //         }
            //     }
            // }
            // setActivities(tempArr)
            // console.log(response)
            // console.log(tempArr)
        }
        catch (err) {
            console.log(err)
            if (err.status == 404) {
                setActivities([])
                setAllActivities([])
            }
            else if (err.status == 500) {
                setErr("Internal server error")
            }
        }
    }
    useEffect(() => {
        if (activities && allActivities)
            setLoading(false)
    }, [activities, allActivities])
    useEffect(() => {
        fetchItems()
        fetchCollections()

        return () => {
            if (apiCall.current != undefined)
                apiCall.current.cancel();
        }
    }, [])
    const countTime = (date) => {
        let this_time = new Date().getTime()
        let last_time = new Date(date).getTime()
        let difference = Math.abs(this_time - last_time) / 1000
        let days = Math.floor(difference / 86400);
        let hours = Math.floor(difference / 3600) % 24;
        let minutes = Math.floor(difference / 60) % 60;
        let seconds = Math.floor(difference % 60);
        if (days > 0) {
            return <span>{days + ' days' + ' ago'}</span>
        } else if (hours > 0) {
            return <span>{hours + ' hrs' + ' ago'}</span>
        }
        return <span>{minutes + ' mins' + ' ago'}</span>

    }


    return (
        <>{loading ?
            <>
                <LinearProgress color="secondary" sx={{ my: 55, mx: 5 }} />
            </> :
            <>
                <div className="pdng">
                    <Navbar theme={theme} themeToggler={themeToggler} />
                </div>
                <div className='w-100 d-flex flex-column'>
                    <HeaderContainer className='my-5 py-1 pdng'>
                        <Typography sx={{ fontWeight: 600, fontSize: { xs: '20px', sm: '36px' } }} variant='h1'>Activity</Typography>
                        <ImageH />
                    </HeaderContainer>


                    <div className="pdng d-flex flex-column justify-content-between align-items-center">
                        {/* filter section */}
                        <div className="p-0 d-flex w-100 align-items-end justify-content-end">
                            <div className="ml-1" style={{ width: "auto", padding: "4px 0 5px", cursor: "pointer" }} onClick={handleFilter}><FilterSearch /></div>
                        </div>
                        <Modal
                            open={openFilter}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            className="d-lg-none"
                            // inputProps={{MenuProps: {disableScrollLock: true}}}
                            disableScrollLock={true}
                        >
                            <Box sx={{
                                width: '100%',
                                height: '100%',
                                p: 4,
                                bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                            }} className="d-flex flex-column">
                                <Box className="d-flex justify-content-between"><div className="d-flex justify-content-start"> <FilterSearch className="me-2" /><p style={{ margin: 0, fontWeight: "bold" }}>Filter</p></div><div className="d-flex justify-content-end" style={{ cursor: "pointer" }} onClick={handleClose}><CloseSquare /></div>  </Box>
                                <ModalLine className="my-2" />
                                <Accordion className="py-1 px-3" sx={{
                                    width: '100%',
                                    bgcolor: 'transparent',
                                    color: theme == 'light' ? "#333333" : "#e6e6e6",
                                    border: 'none',
                                    boxShadow: 'none',
                                    '&:before': {
                                        bgcolor: 'transparent',
                                    }
                                }}>
                                    <AccordionSummary
                                        className="p-0"
                                        expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography sx={{ fontWeight: 500 }} className="d-flex align-items-center"><DocumentText className="me-2" />Event Type</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className="p-0">
                                        <ul className="menu p-0">
                                            <li className="d-flex align-items-center mb-4">
                                                <CheckPut style={{ backgroundColor: checked.includes('sale') ? '#46C263' : '#f9f9f9' }} className="me-2" id="sale" onClick={handleCheck}><img id="sale" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>Sale
                                            </li>
                                            <li className="d-flex align-items-center mb-4">
                                                <CheckPut style={{ backgroundColor: checked.includes('list') ? '#46C263' : '#f9f9f9' }} className="me-2" id="list" onClick={handleCheck}><img id="list" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>List
                                            </li>
                                            <li className="d-flex align-items-center mb-4">
                                                <CheckPut style={{ backgroundColor: checked.includes('offer') ? '#46C263' : '#f9f9f9' }} className="me-2" id="offer" onClick={handleCheck}><img id="offer" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>Offer
                                            </li>
                                            <li className="d-flex align-items-center mb-4">
                                                <CheckPut style={{ backgroundColor: checked.includes('transfer') ? '#46C263' : '#f9f9f9' }} className="me-2" id="transfer" onClick={handleCheck}><img id="transfer" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>Transfer
                                            </li>
                                            <li className="d-flex align-items-center mb-4">
                                                <CheckPut style={{ backgroundColor: checked.includes('mint') ? '#46C263' : '#f9f9f9' }} className="me-2" id="mint" onClick={handleCheck}><img id="mint" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>Mint
                                            </li>
                                        </ul>
                                    </AccordionDetails>
                                </Accordion>
                                {collections && collections.length > 0 ?
                                    <Accordion className="py-1 px-3" sx={{
                                        width: '100%',
                                        bgcolor: 'transparent',
                                        color: theme == 'light' ? "#333333" : "#e6e6e6",
                                        border: 'none',
                                        boxShadow: 'none',
                                        '&:before': {
                                            bgcolor: 'transparent',
                                        }
                                    }}>
                                        <AccordionSummary
                                            className="p-0"
                                            expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography sx={{ fontWeight: 500 }} className="d-flex align-items-center"><DocumentText className="me-2" />Collection</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails className="p-0">
                                            <SearchBox theme={theme} id={'stats-activity-collection-search-small'} searchingWhat={'collections'} />
                                            <ColUl className="menu p-0">
                                                {collections.map((collection) => {
                                                    return <li key={collection._id.$oid} className="d-flex align-items-center my-3">
                                                        <CheckPut className="me-2" style={{ backgroundColor: colChecked.includes(collection._id.$oid) ? '#46C263' : '#f9f9f9' }} id={collection._id.$oid} onClick={handleColCheck}><img id={collection._id.$oid} src={TickPic} style={{ width: "20px", height: "20px", }} /></CheckPut>{collection.title}
                                                    </li>
                                                })}
                                            </ColUl>
                                        </AccordionDetails>
                                    </Accordion>
                                    : undefined}
                            </Box>
                        </Modal>




                        {/* details section */}
                        <div className="w-100 d-flex flex-column justify-content-between mb-5">
                            {/* item activity on mobile and tablet ==========> */}
                            <ItemsContainerSmall className="my-2 d-flex d-lg-none">
                                {activities.length !== 0 ? <>
                                    {activities.map((activity, index) => {
                                        return (
                                            <ProductCardSmall key={index} className="my-1">
                                                <MainDetail>
                                                    <div className="d-flex align-items-center">
                                                        <ItemImage style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${activity.nft_image.replace('root/dortzio/market/media/', '')}`)) }} />
                                                        <div className="d-flex flex-column ms-1">
                                                            <h6 className="m-0" style={{ fontWeight: 600 }}>{activity.nft_name}</h6>
                                                            <Subtitle style={{ fontSize: '14px' }} className="m-0"><DocumentDownload size="15" />&nbsp;{activity.event}</Subtitle>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="d-flex flex-column">
                                                            <Price className="m-0">{activity.price} ETH</Price>
                                                            <Recommend style={{ fontSize: "12px" }} className="m-0">{countTime(activity.date)}<Logout size="12" /></Recommend>
                                                        </div>
                                                        <Price>
                                                            <ArrowSquareRight />
                                                        </Price>
                                                    </div>
                                                </MainDetail>
                                                <Line />
                                                <Detail>
                                                    <div className="d-flex"><Subtitle>From: </Subtitle><Recommend>{shorten(activity.from_wallet_address)}</Recommend></div>
                                                    <div className="d-flex"><Subtitle>To: </Subtitle><Recommend>{shorten(activity.receiver_id)}</Recommend></div>
                                                    <div className="d-flex"><Subtitle>Quantity: </Subtitle><Price>{activity.copies}</Price></div>
                                                </Detail>
                                            </ProductCardSmall>
                                        )
                                    })}
                                </> : <><NoItemFound text={'no activity found'} /></>}
                            </ItemsContainerSmall>



                            {/* item activity on desktop ==========> */}
                            <div className="my-2 d-none d-lg-flex d-flex justify-content-between">
                                <ItemsContainerDesktop style={{ width: !openFilter ? "100%" : "70%", transition: '500ms ease' }} className="">
                                    <div style={{ padding: "20px" }} className="my-1 d-flex justify-content-between">
                                        <Subtitle style={{ width: "150px", overflow: "hidden" }}>Event</Subtitle>
                                        <Subtitle style={{ width: "250px", overflow: "hidden" }}>Product</Subtitle>
                                        <Subtitle style={{ width: "150px", overflow: "hidden" }}>Price</Subtitle>
                                        {/* <Subtitle style={{ width: "100px", overflow: "hidden" }}>Quantity</Subtitle> */}
                                        <Subtitle style={{ width: "150px", overflow: "hidden" }}>From</Subtitle>
                                        <Subtitle style={{ width: "150px", overflow: "hidden" }}>To</Subtitle>
                                        <Subtitle style={{ width: "150px", overflow: "hidden" }}>Time</Subtitle>
                                    </div>
                                    {activities.length !== 0 ? <>
                                        {activities.map((activity, index) => {
                                            return (
                                                <ProductCardDesktop key={index} className="my-1">
                                                    <Price style={{ width: "150px", overflow: "hidden" }}>
                                                        {activity.event == 'mint' ?
                                                            <Magicpen size="17" className="me-1" />
                                                            : activity.event == 'list' ?
                                                                <DocumentDownload size="17" className="me-1" />
                                                                : activity.event == 'offer' ?
                                                                    <OfferIconOutline size='17' className="me-1" />
                                                                    : activity.event == 'sale' ?
                                                                        <BagTick size="17" className="me-1" />
                                                                        : activity.event == 'transfer' ?
                                                                            <ArrowSwapHorizontal size="17" className="me-1" /> :
                                                                            <BagTick size="17" className="me-1" />
                                                        }
                                                        {activity.event}</Price>
                                                    <div className="d-flex justify-content-start align-items-center" style={{ width: "250px", overflow: "hidden" }}>
                                                        <ItemImage style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${activity.nft_image.replace('root/dortzio/market/media/', '')}`)) }} />
                                                        <div className="ms-1 d-flex flex-column justify-content-center align-items-start" >
                                                            <Name>Name</Name><Edition>{activity.nft_name}</Edition>
                                                        </div>
                                                    </div>
                                                    <Subtitle style={{ width: "150px", overflow: "hidden" }}>{activity.price} ETH</Subtitle>
                                                    <Recommend style={{ width: "150px", overflow: "hidden" }}>{shorten(activity.from_wallet_address)}</Recommend>
                                                    <Recommend style={{ width: "150px", overflow: "hidden" }}>{shorten(activity.receiver_id)}</Recommend>
                                                    <Recommend style={{ width: "150px", overflow: "hidden" }}>{countTime(activity.date)}<Logout /></Recommend>
                                                </ProductCardDesktop>
                                            )
                                        })}
                                    </> : <><NoItemFound text={'no activity found'} /></>}
                                </ItemsContainerDesktop>

                                {openFilter ? <FilterContainer style={{ width: "28%" }} className="my-0 d-none d-lg-flex">
                                    <Accordion className="py-1 px-3" sx={{
                                        width: '100%',
                                        bgcolor: 'transparent',
                                        color: theme == 'light' ? "#333333" : "#e6e6e6",
                                        border: 'none',
                                        boxShadow: 'none',
                                        '&:before': {
                                            bgcolor: 'transparent',
                                        }
                                    }}>
                                        <AccordionSummary
                                            className="p-0"
                                            expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography sx={{ fontWeight: 500 }} className="d-flex align-items-center"><DocumentText className="me-2" />Event Type</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails className="p-0">
                                            <ul className="menu p-0">
                                                <li className="d-flex align-items-center mb-4">
                                                    <CheckPut style={{ backgroundColor: checked.includes('sale') ? '#46C263' : '#f9f9f9' }} className="me-2" id="sale" onClick={handleCheck}><img id="sale" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>Sale
                                                </li>
                                                <li className="d-flex align-items-center mb-4">
                                                    <CheckPut style={{ backgroundColor: checked.includes('list') ? '#46C263' : '#f9f9f9' }} className="me-2" id="list" onClick={handleCheck}><img id="list" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>List
                                                </li>
                                                <li className="d-flex align-items-center mb-4">
                                                    <CheckPut style={{ backgroundColor: checked.includes('offer') ? '#46C263' : '#f9f9f9' }} className="me-2" id="offer" onClick={handleCheck}><img id="offer" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>Offer
                                                </li>
                                                <li className="d-flex align-items-center mb-4">
                                                    <CheckPut style={{ backgroundColor: checked.includes('transfer') ? '#46C263' : '#f9f9f9' }} className="me-2" id="transfer" onClick={handleCheck}><img id="transfer" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>Transfer
                                                </li>
                                                <li className="d-flex align-items-center mb-4">
                                                    <CheckPut style={{ backgroundColor: checked.includes('mint') ? '#46C263' : '#f9f9f9' }} className="me-2" id="mint" onClick={handleCheck}><img id="mint" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>Mint
                                                </li>

                                            </ul>
                                        </AccordionDetails>
                                    </Accordion>
                                    {collections && collections.length > 0 ?
                                        <Accordion className="py-1 px-3" sx={{
                                            width: '100%',
                                            bgcolor: 'transparent',
                                            color: theme == 'light' ? "#333333" : "#e6e6e6",
                                            border: 'none',
                                            boxShadow: 'none',
                                            '&:before': {
                                                bgcolor: 'transparent',
                                            }
                                        }}>
                                            <AccordionSummary
                                                className="p-0"
                                                expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography sx={{ fontWeight: 500 }} className="d-flex align-items-center"><DocumentText className="me-2" />Collection</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails className="p-0">
                                                <SearchBox theme={theme} id={'stats-activity-collection-search'} searchingWhat={'collections'} />
                                                <ColUl className="menu p-0">
                                                    {collections.map((collection) => {
                                                        return <li key={collection._id.$oid} className="d-flex align-items-center my-3">
                                                            <CheckPut className="me-2" style={{ backgroundColor: colChecked.includes(collection._id.$oid) ? '#46C263' : '#f9f9f9' }} id={collection._id.$oid} onClick={handleColCheck}><img id={collection._id.$oid} src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>{collection.title}
                                                        </li>
                                                    })}
                                                </ColUl>
                                            </AccordionDetails>
                                        </Accordion>
                                        : undefined}
                                </FilterContainer>
                                    : undefined}
                            </div>

                        </div>
                    </div>
                </div>

            </>
        }
        </>

    );
}

export default ActivityStats;