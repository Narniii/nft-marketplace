import { ArrowDown2, ArrowSquareRight, ArrowSwapHorizontal, ArrowSwapVertical, BagTick, CloseSquare, DocumentDownload, DocumentText, FilterSearch, Gift, Grid1, Grid2, Grid5, HambergerMenu, Logout, Magicpen, Refresh2 } from "iconsax-react";
import styled from "styled-components";
import SearchBox from "../Navbar/SearchBox";
import { TestColls } from "../../utils/testCollections";
import { Accordion, AccordionDetails, AccordionSummary, Box, CircularProgress, Modal, Skeleton, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ItemCard from "../Cards/ItemCard";
import testnft from '../../assets/test1.png'
import { Colors } from "../design/Colors";
import { SelectionC } from "../test";
import SSelection from "../Selection";
import NoItemFound from "../NoItem";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { API_CONFIG } from "../../config";
import { MARKET_API } from "../../utils/data/market_api";
import TickPic from '../../assets/tick.svg'
import OfferIconOutline from "../design/OfferIcon";

const Selectionn = styled.div`
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
    overflow:hidden;
`;
const ItemsContainerDesktop = styled.div`
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: ${({ theme }) => theme.itemCardsBackground};
    // border: ${({ theme }) => theme.searchBoxBorder};
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    // padding: 25px;
    width:100%;
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
    @media screen and (max-width: 350px) {
        padding: 7px;
    }
    

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
    background-image: url(${testnft});
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;
    height:45px;
    width:45px;
    margin-right:8px;
    border-radius:8px;
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
const ModalLine = styled.div`
    background: linear-gradient(90deg,#60606000 0%, #80808080 50%,#918A7A00 100%);
    height:2px;
    align-self:center;
    width:70%;
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
overflow:hidden;
height:max-content;
`;
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

const ActivityTab = ({ theme, tab, colId }) => {
    const [loading, setLoading] = useState(true)
    const [openFilter, setOpenFilter] = useState(false)
    const [activities, setActivities] = useState(undefined)
    const [allActivities, setAllActivities] = useState(undefined)
    const apiCall = useRef(undefined)
    const [err, setErr] = useState(undefined)
    const [checked, setChecked] = useState([])
    const handleCheck = (e) => {
        e.preventDefault()
        var tempArr = checked;
        var tempAct = []
        var allAct = allActivities
        if (tempArr.includes(e.target.id)) {
            const removeItem = tempArr.filter((item) => item != e.target.id);
            tempArr = removeItem
        }
        else {
            tempArr.push(e.target.id)
        }
        setChecked(tempArr)
        for (var p = 0; p < allAct.length; p++) {
            if (tempArr.includes(allAct[p].event)) {
                tempAct.push(allAct[p])
            }
        }

        console.log(tempAct)
        console.log(tempArr)

        if (tempArr.length > 0) {
            setActivities(tempAct)
        }
        else {
            setActivities(allAct)
        }


        if (tempArr.includes(e.target.id)) {
            document.getElementById(e.target.id).style.backgroundColor = '#46C263';
        } else {
            document.getElementById(e.target.id).style.backgroundColor = '#f9f9f9';
        }

    }

    const handleFilter = () => {
        if (openFilter) setOpenFilter(false)
        else setOpenFilter(true)
    }
    const handleClose = () => setOpenFilter(false);
    useEffect(() => {
        if (tab == 'activity')
            fetchItems()
        return () => {
            if (apiCall.current != undefined)
                apiCall.current.cancel();
        }
    }, [tab])

    const fetchItems = async () => {
        try {
            apiCall.current = MARKET_API.request({
                path: `/nft/get/collections/all/activities/`,
                method: "post",
                body: {
                    from: 0,
                    to: 20,
                    collection_id: colId
                }
            })
            const response = await apiCall.current.promise;
            console.log('activities', response)
            if (!response.isSuccess)
                throw response

            setActivities(response.data)
            setAllActivities(response.data)
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
        if (activities)
            setLoading(false)
    }, [activities])
    const shorten = (str) => {
        if (str)
            return str.length > 10 ? str.substring(0, 7) + "..." : str;
        return 'undefined'
    }


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
        <div className="d-flex flex-column p-0 justify-content-between align-items-center">
            {/* top section */}
            <div className="d-flex w-100 p-0 justify-content-between">
                <div className="col-3 p-0 d-flex align-items-center justify-content-start">Activity</div>
                <div className="col-9 p-0 d-flex align-items-center justify-content-end">
                    {/* <Selectionn className="d-flex justify-content mx-2 p-2" >
                        Last 7 Days
                        <div style={{ width: "auto", padding: "4px 0 5px" }}><ArrowDown2 /></div>
                    </Selectionn> */}
                    <div className="mx-2">
                        <SSelection id={'collection-activity-tab'} width={'150px'} theme={theme} tabs={['last 7 days', 'last 1 month', 'last 1 year',]} />
                    </div>

                    <div className="mx-1" style={{ width: "auto", padding: "4px 0 5px", cursor: "pointer" }} onClick={handleFilter}><FilterSearch /></div>
                </div>
            </div>


            {/* details section */}
            <div className="d-flex justify-content-between w-100">

                {/* details section */}
                <Box sx={{ width: !openFilter ? "100%" : "70%", transition: { xs: '0ms', md: '500ms ease' } }} className="d-flex flex-column flex-md-column-reverse justify-content-between align-items-center">
                    {/* item activity on mobile and tablet ==========> */}

                    {loading ? <Skeleton className="d-flex mt-3 mb-2" variant="round" sx={{ width: "100%", borderRadius: "24px", height: 500 }} /> :
                        <>
                            <ItemsContainerSmall className="my-2 d-flex d-lg-none">
                                {activities && activities.length !== 0 ? <>
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
                            <ItemsContainerDesktop className="my-2 d-none d-lg-flex">
                                <div style={{ padding: "20px" }} className="d-flex my-1"><ArrowSwapVertical /> Item Activity</div>
                                <VisibleLine />
                                <div style={{ padding: "20px" }} className="my-1 d-flex justify-content-between">
                                    <Subtitle style={{ width: "150px", overflow: "hidden" }}>Event</Subtitle>
                                    <Subtitle style={{ width: "250px", overflow: "hidden" }}>Item</Subtitle>
                                    <Subtitle style={{ width: "150px", overflow: "hidden" }}>Price</Subtitle>
                                    <Subtitle style={{ width: "100px", overflow: "hidden" }}>Quantity</Subtitle>
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
                                                </Price>
                                                <Price style={{ width: "250px", overflow: "hidden" }}><ItemImage style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${activity.nft_image.replace('root/dortzio/market/media/', '')}`)) }} />{activity.nft_name}</Price>
                                                <Subtitle style={{ width: "150px", overflow: "hidden" }}>{activity.price} ETH</Subtitle>
                                                <Subtitle style={{ width: "100px", overflow: "hidden" }}>{activity.copies}</Subtitle>
                                                <Recommend style={{ width: "150px", overflow: "hidden" }}>{shorten(activity.from_wallet_address)}</Recommend>
                                                <Recommend style={{ width: "150px", overflow: "hidden" }}>{shorten(activity.receiver_id)}</Recommend>
                                                <Recommend style={{ width: "150px", overflow: "hidden" }}>{countTime(activity.date)}<Logout /></Recommend>
                                            </ProductCardDesktop>
                                        )
                                    })}
                                </> : <><NoItemFound text={'no activity found'} /></>}
                            </ItemsContainerDesktop>

                            <ChartContainer className="my-3" />

                        </>
                    }
                </Box>

                {openFilter ? <FilterContainer style={{ width: "28%" }} className="d-none d-lg-flex mt-3 mb-2">
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
                </FilterContainer>
                    : undefined}

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
                        p: 3,
                        bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                    }} className="d-flex flex-column">
                        <Box className="d-flex justify-content-between"><div className="d-flex justify-content-start" onClick={handleFilter}> <FilterSearch className="me-2" /><p style={{ margin: 0, fontWeight: "bold" }}>Filter</p></div><div className="d-flex justify-content-end" style={{ cursor: "pointer" }} onClick={handleClose}><CloseSquare /></div>  </Box>
                        <ModalLine className="my-2" />
                        <Accordion className="p-0" sx={{
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
                    </Box>
                </Modal>

            </div>
        </div>

    );
}

export default ActivityTab;