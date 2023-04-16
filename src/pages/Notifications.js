import styled from 'styled-components';
import Navbar from '../components/Navbar/Navbar';
import '../styles.css'
import bgDes from '../assets/bgDots-desktop.svg'
import bgTab from '../assets/bgDots-tablet.svg'
import bgMob from '../assets/bgDots-mobile.svg'
import TickPic from '../assets/tick.svg'
import { MARKET_API } from '../utils/data/market_api';
import { Accordion, AccordionDetails, AccordionSummary, Box, CircularProgress, LinearProgress, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Colors } from '../components/design/Colors';
import ImgHd from '../assets/explore-pic.svg'
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import WalletConnectModal from '../components/wallet/WalletConnectModal';
import { ButtonLarge } from '../components/design/Buttons';
import { ArrowDown2, CloseSquare, DocumentText, FilterSearch, } from "iconsax-react";
import NotificationCard from '../components/Cards/NotificationCard';
import NoItemFound from '../components/NoItem';
import { act } from '@testing-library/react';

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

const ModalLine = styled.div`
    background: linear-gradient(90deg,#60606000 0%, #80808080 50%,#918A7A00 100%);
    height:2px;
    align-self:center;
    width:70%;
`;


const Notifications = ({ theme, themeToggler }) => {
    const globalUser = useSelector(state => state.userReducer)
    const { active } = useWeb3React()
    const [walletConnect, setWalletConnect] = useState(false)
    const [checked, setChecked] = useState([])
    const [loading, setLoading] = useState(true)
    const [openFilter, setOpenFilter] = useState(false)
    const handleClose = () => setOpenFilter(false);
    const handleFilter = () => {
        if (openFilter) setOpenFilter(false)
        else setOpenFilter(true)
    }
    const apiCall = useRef(null)
    const [notifications, setNotifications] = useState(undefined)
    const [allNotifications, setAllNotifications] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const [notifCenter, setNotifCenter] = useState(undefined)
    const [activeNotifs, setActiveNotifs] = useState(undefined)
    useEffect(() => {
        if (globalUser.isLoggedIn)
            fetchNotifications()
        return () => {
            if (apiCall.current) {
                apiCall.current.cancel();
            }
        }
    }, [])

    const handleCheck = (e) => {
        e.preventDefault()
        var tempArr = checked;
        var notif_center = notifCenter
        var allNotif = allNotifications
        if (tempArr.includes(e.target.id)) {
            const removeItem = tempArr.filter((item) => item != e.target.id);
            tempArr = removeItem
        }
        else {
            tempArr.push(e.target.id)
        }
        setChecked(tempArr)
        let auction_expiration_notifs = []
        let bid_activity_notifs = []
        let item_sold_notifs = []
        let outbid_notifs = []
        let owned_item_updates_notifs = []
        let price_change_notifs = []
        let selectedNotifs = []
        if (tempArr.length > 0) {
            if (tempArr.includes('item-sold')) {
                item_sold_notifs = notif_center.item_sold.notifs
            }
            if (tempArr.includes('auction-expiration')) {
                auction_expiration_notifs = notif_center.auction_expiration.notifs
            }
            if (tempArr.includes('bid-activity')) {
                bid_activity_notifs = notif_center.bid_activity.notifs
            }
            if (tempArr.includes('outbid')) {
                outbid_notifs = notif_center.outbid.notifs
            }
            if (tempArr.includes('owned-item-updates')) {
                owned_item_updates_notifs = notif_center.owned_item_updates.notifs
            }
            if (tempArr.includes('price-change')) {
                price_change_notifs = notif_center.price_change.notifs
            }
            selectedNotifs = [...auction_expiration_notifs,
            ...bid_activity_notifs,
            ...item_sold_notifs,
            ...outbid_notifs,
            ...owned_item_updates_notifs,
            ...owned_item_updates_notifs,
            ...price_change_notifs];
            setNotifications(selectedNotifs)
        } else {
            setNotifications(allNotif)
        }

        if (tempArr.includes(e.target.id)) {
            document.getElementById(e.target.id).style.backgroundColor = '#46C263';
        } else {
            document.getElementById(e.target.id).style.backgroundColor = '#f9f9f9';
        }

    }
    const fetchNotifications = async () => {
        try {
            apiCall.current = MARKET_API.request({
                path: `/notif/get/latest/`,
                method: "post",
                body: { wallet_address: globalUser.walletAddress },
            });
            const response = await apiCall.current.promise;
            console.log(response)

            if (!response.isSuccess)
                throw response
            var data = response.data
            let active_notifs = []
            let min_bid_tresh = data.min_bid_tresh

            let auction_expiration_notifs = []
            let bid_activity_notifs = []
            let item_sold_notifs = []
            let outbid_notifs = []
            let owned_item_updates_notifs = []
            let price_change_notifs = []

            if (data.auction_expiration.is_active) {
                auction_expiration_notifs = data.auction_expiration.notifs
                active_notifs.push('auction-expiration')
            }
            if (data.bid_activity.is_active) {
                active_notifs.push('bid-activity')
                bid_activity_notifs = data.bid_activity.notifs
            }
            if (data.item_sold.is_active) {
                active_notifs.push('item-sold')
                item_sold_notifs = data.item_sold.notifs
            }
            if (data.outbid.is_active) {
                active_notifs.push('outbid')
                outbid_notifs = data.outbid.notifs
            }
            if (data.owned_item_updates.is_active) {
                active_notifs.push('owned-item-updates')
                owned_item_updates_notifs = data.owned_item_updates.notifs
            }
            if (data.price_change.is_active) {
                active_notifs.push('price-change')
                price_change_notifs = data.price_change.notifs
            }

            setActiveNotifs(active_notifs)


            const notifs = [
                ...auction_expiration_notifs,
                ...bid_activity_notifs,
                ...item_sold_notifs,
                ...outbid_notifs,
                ...owned_item_updates_notifs,
                ...owned_item_updates_notifs,
                ...price_change_notifs];
            setNotifications(notifs)
            setAllNotifications(notifs)
            setNotifCenter(response.data)

            console.log('----------------------------------------', notifs)
        }
        catch (err) {
            console.log(err)
            if (err.status == 404) {
                setNotifications([])
                registerNotif()
            }
            else if (err.status == 500) {
                setErr("Internal server error")
            }
        }
    }
    const registerNotif = async () => {
        try {
            apiCall.current = MARKET_API.request({
                path: `/notif/register/`,
                method: "post",
                body: {
                    wallet_address: globalUser.walletAddress,
                    item_sold: 0,
                    bid_activity: 0,
                    price_change: 0,
                    auction_expiration: 0,
                    outbid: 0,
                    owned_item_updates: 0,
                    min_bid_tresh: '0'
                },
            });
            const response = await apiCall.current.promise;
            console.log(response)
            if (!response.isSuccess)
                throw response
            fetchNotifications()
        }
        catch (err) {
            console.log(err)
            if (err.status == 404) {
                setNotifications([])
            }
            else if (err.status == 500) {
                setErr("Internal server error")
            }
        }
    }

    useEffect(() => {
        if (notifications) {
            console.log('heeereeee')
            setLoading(false)
        }
    }, [notifications])

    return (
        <>
            <div className="pdng">
                <Navbar theme={theme} themeToggler={themeToggler} />
            </div>
            <div className='w-100 d-flex flex-column'>
                <HeaderContainer className='my-5 py-1 pdng'>
                    <Typography sx={{ fontWeight: 600, fontSize: { xs: '20px', sm: '36px' } }} variant='h1'>Notifications</Typography>
                    <ImageH />
                </HeaderContainer>
                <div className='pdng d-flex flex-column'>
                    {active && globalUser.isLoggedIn ?
                        <div className="d-flex flex-column justify-content-between align-items-center">
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
                                                {
                                                    activeNotifs && activeNotifs.length > 0 ? <>
                                                        {console.log(activeNotifs)}
                                                        {activeNotifs.map((checkput) => {
                                                            return <li style={{ textTransform: Colors.subtitleFont }} className="d-flex align-items-center mb-4">
                                                                <CheckPut style={{ backgroundColor: checked.includes({ checkput }) ? '#46C263' : '#f9f9f9' }} className="me-2" id={checkput} onClick={handleCheck}>
                                                                    <img id={checkput} src={TickPic} style={{ width: "20px", height: "20px" }} />
                                                                </CheckPut>
                                                                {checkput.replace('-', ' ')}
                                                            </li>
                                                        })}
                                                    </>
                                                        :
                                                        <p>you dont have any active notification setting</p>
                                                }
                                            </ul>
                                        </AccordionDetails>
                                    </Accordion>
                                </Box>
                            </Modal>

                            <div className="my-2 w-100  d-flex justify-content-between">
                                {loading ?
                                    <LinearProgress color="secondary" sx={{ mx: 5 }} />
                                    :
                                    <>
                                        <div style={{ width: !openFilter ? "100%" : "70%", transition: '500ms ease', height: "500px", }} className="d-flex flex-column">
                                            {notifications && notifications.length > 0 ?
                                                <> {
                                                    notifications.map((notif, index) => {
                                                        return <NotificationCard index={index} userWallet={globalUser.walletAddress} seen={notif.seen} event={notif.event_name ? notif.event_name : ''} urlId={notif.nft_id} urlWallet={notif.nft_owner} />
                                                    })
                                                }
                                                </> : <NoItemFound text='you have no notifications' />}
                                        </div>

                                        {openFilter ? <FilterContainer style={{ width: "28%" }} className="my-2 d-none d-lg-flex">
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
                                                        {
                                                            activeNotifs && activeNotifs.length > 0 ? <>
                                                                {console.log(activeNotifs)}
                                                                {activeNotifs.map((checkput) => {
                                                                    return <li style={{ textTransform: Colors.subtitleFont }} className="d-flex align-items-center mb-4">
                                                                        <CheckPut style={{ backgroundColor: checked.includes({ checkput }) ? '#46C263' : '#f9f9f9' }} className="me-2" id={checkput} onClick={handleCheck}>
                                                                            <img id={checkput} src={TickPic} style={{ width: "20px", height: "20px" }} />
                                                                        </CheckPut>
                                                                        {checkput.replace('-', ' ')}
                                                                    </li>
                                                                })}
                                                            </>
                                                                :
                                                                <p>you dont have any active notification setting</p>
                                                        }
                                                        {/* <li className="d-flex align-items-center mb-4">
                                                            <CheckPut style={{ backgroundColor: checked.includes('item-sold') ? '#46C263' : '#f9f9f9' }} className="me-2" id="item-sold" onClick={handleCheck}><img id="item-sold" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>Item Sold
                                                        </li>
                                                        <li className="d-flex align-items-center mb-4">
                                                            <CheckPut style={{ backgroundColor: checked.includes('bid-activity') ? '#46C263' : '#f9f9f9' }} className="me-2" id="bid-activity" onClick={handleCheck}><img id="bid-activity" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>Bid Activity
                                                        </li>
                                                        <li className="d-flex align-items-center mb-4">
                                                            <CheckPut style={{ backgroundColor: checked.includes('price-change') ? '#46C263' : '#f9f9f9' }} className="me-2" id="price-change" onClick={handleCheck}><img id="price-change" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>Price Change
                                                        </li>
                                                        <li className="d-flex align-items-center mb-4">
                                                            <CheckPut style={{ backgroundColor: checked.includes('auction-expiration') ? '#46C263' : '#f9f9f9' }} className="me-2" id="auction-expiration" onClick={handleCheck}><img id="auction-expiration" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>Auction Expiration
                                                        </li>
                                                        <li className="d-flex align-items-center mb-4">
                                                            <CheckPut style={{ backgroundColor: checked.includes('outbid') ? '#46C263' : '#f9f9f9' }} className="me-2" id="outbid" onClick={handleCheck}><img id="outbid" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>Outbid
                                                        </li>
                                                        <li className="d-flex align-items-center mb-4">
                                                            <CheckPut style={{ backgroundColor: checked.includes('owned-item-updates') ? '#46C263' : '#f9f9f9' }} className="me-2" id="owned-item-updates" onClick={handleCheck}><img id="owned-item-updates" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>Owned Item Updates
                                                        </li> */}
                                                    </ul>
                                                </AccordionDetails>
                                            </Accordion>
                                        </FilterContainer>
                                            : undefined}
                                    </>}
                            </div>


                        </div>
                        :
                        <div className="d-flex my-5 justify-content-center align-items-center">
                            <ButtonLarge onClick={() => { setWalletConnect(!walletConnect) }}>connect wallet</ButtonLarge>
                            <WalletConnectModal open={walletConnect} handleClose={() => setWalletConnect(false)} theme={theme} />
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default Notifications; 