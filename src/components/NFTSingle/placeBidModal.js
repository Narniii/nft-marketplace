import { Box, CircularProgress, FormControl, InputBase, MenuItem, Modal, Select, Typography } from "@mui/material";
import { ArrowDown2, CloseSquare, InfoCircle, Trash } from "iconsax-react";
import styled from "styled-components";
import { ButtonLarge, ButtonOutline } from "../design/Buttons";
import testnft from '../../assets/test1.png'
import SearchBox from "../Navbar/SearchBox";
import { useEffect, useState } from "react";
import { SelectionB } from "../test";
import SSelection from "../Selection";
import { useRef } from "react";
import { MARKET_API } from "../../utils/data/market_api";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { API_CONFIG } from "../../config";
import { GetUSDExchangeRate } from "../../utils/exChange";
import { Colors } from "../design/Colors";
import { useNFTMarketplace } from "../../NFTMarketplaceContext";


const ItemRow = styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
align-items:center;
`
const ItemImage = styled.div`
    // background-image: url(${testnft});
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;
    height:45px;
    width:45px;
    margin-right:1px;
`;
const Subtitle = styled.p`
color:${({ theme }) => theme.textSub};
// font-size:14px;
margin:0;
`
const Num = styled.span`
color:${({ theme }) => theme.collectionDetailsAnswer} !important;
font-weight:500;
`
const Det = styled.div`
background-color:${({ theme }) => theme.addProPic};
display:flex;
flex-direction:column;
justify-content:space-between;
padding:16px;
border-radius:24px;
`
const InputBox = styled.div`
border:${({ theme }) => theme.searchBoxBorder};
box-shadow:${({ theme }) => theme.searchBoxShadow};
border-radius:30px;
background:transparent;
// `;

const DurSelect = styled.select`
background:${({ theme }) => theme.itemCardsBackground};
border-radius: 24px;
border:1px solid #d9d9d9;
// box-shadow:${({ theme }) => theme.boxShadow};
height:50px;
font-weight:600;
color:${({ theme }) => theme.text};
padding:16px;
-webkit-appearance:none;
-moz-appearance:none;
appearance:none;
width:80%;
display:flex;
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
const Line = styled.div`
    background: linear-gradient(90deg,#60606000 0%, #80808080 50%,#918A7A00 100%);
    height:1px;
    align-self:center;
    width:80%;
`;



const PlaceBidModal = ({ collection, open, handleClose, theme, id, userWallet, nft, bidPlaced }) => {
    console.log(nft)
    // const classes = useStyles();
    const [successMessage, setSuccessMesssage] = useState(undefined)
    const [apiLoading, setApiLoading] = useState(false)
    const [err, setErr] = useState(undefined)
    const [duration, setDuration] = useState('24H')
    const [myPrice, setMyPrice] = useState('--')
    const apiCall = useRef(undefined)
    const shorten = (str) => {
        return str.length > 20 ? str.substring(0, 20) + "..." : str;
    }
    const convertDate = (ddate) => {
        let this_time = new Date()
        const day = this_time.getDate()
        const year = this_time.getFullYear()
        const month = this_time.toLocaleString('default', { month: 'short' });
        console.log('dayyyy', day);
        return <span>{month + day + ',' + year}</span>
    }
    const convertHour = (time) => {
        let this_time = new Date()
        const hour = this_time.getHours()
        const minute = this_time.getMinutes()
        return <span>{hour + ':' + minute}</span>

    }
    const [usdPrice, setUsdPrice] = useState("");
    const [usdExRate, setUsdExRate] = useState();
    const [ethExRate, setEthExRate] = useState();
    const [ethPrice, setEthPrice] = useState("");
    const [offer, setOffer] = useState({})
    const [expiration, setExpiration] = useState(undefined)
    const [myUsdPrice, setMyUsdPrice] = useState()
    const [highestOffer, setHighestOffer] = useState(undefined)
    const [startingPrice, setStartingPrice] = useState(undefined)
    const [userLastBid, setUserLastBid] = useState(undefined)
    const { placeBid } = useNFTMarketplace();

    useEffect(() => {
        if (nft) {
            let offers = []
            if (nft.auction.length > 0) {
                if (nft.auction[nft.auction.length - 1].is_ended == false) {
                    if (nft.auction[nft.auction.length - 1].bids.length > 0) {
                        for (let o = 0; o < nft.auction[nft.auction.length - 1].bids.length; o++) {
                            if (nft.auction[nft.auction.length - 1].bids[o].status == "waiting") {
                                offers.push(parseFloat(nft.auction[nft.auction.length - 1].bids[o].price))
                            }
                            if (nft.auction[nft.auction.length - 1].bids[o].from_wallet_address == userWallet && nft.auction[nft.auction.length - 1].bids[o].status == "waiting") {
                                setUserLastBid(nft.auction[nft.auction.length - 1].bids[o].price)
                            }
                        }
                        if (offers.length > 0) {
                            setHighestOffer(Math.max(...offers))
                            setStartingPrice(Math.max(...offers))
                        } else {
                            // setHighestOffer(parseFloat(nft.auction[nft.auction.length - 1].starting_price))
                            setStartingPrice(parseFloat(nft.auction[nft.auction.length - 1].starting_price))
                        }

                    } else {
                        // setHighestOffer(parseFloat(nft.auction[nft.auction.length - 1].starting_price))
                        setStartingPrice(parseFloat(nft.auction[nft.auction.length - 1].starting_price))
                    }
                }
            }
            else setHighestOffer('--')
        }
    }, [nft])
    const handleSubmit = async () => {
        var tommorrow = parseFloat(new Date(Date.now()).getTime() + (24 * 60 * 60 * 1000));
        var defaultExp = tommorrow / 1000
        var this_time = parseFloat(new Date(Date.now()).getTime()) / 1000
        setErr(undefined)
        setApiLoading(true)
        if (myPrice < 0 || myPrice == '--') {
            setErr('please select a valid price for your bid')
            setApiLoading(false)
            return
        }
        if (myPrice < startingPrice) {
            setErr('starting price is  ' + startingPrice + ' ETH')
            setApiLoading(false)
            return
        }
        let tx = await placeBid(nft.nft_index, myPrice)
        let tx_hash = tx.hash ? tx.hash : undefined
        if (tx_hash) {
            try {
                apiCall.current = MARKET_API.request({
                    path: `/nft/auc/add/bid/`,
                    method: "post",
                    body: {
                        nft_id: nft._id.$oid,
                        auction_bid: JSON.stringify([{ price: myPrice, from_wallet_address: userWallet }])
                    },
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                let resp = await apiCall.current.promise;
                console.log('submit resp ------------', resp)

                if (!resp.isSuccess)
                    throw resp

                setErr(undefined)
                editAssetActivity('offer', myPrice)
                setSuccessMesssage('bid submited successfully')
                setApiLoading(false)
            }
            catch (err) {
                setErr(err.statusText)
                setApiLoading(false)
            }
        }
        else {
            setErr("something went wrong,please try again later")
            setApiLoading(false)
        }
    }
    const editAssetActivity = async (event, price) => {
        var this_time = parseFloat(new Date(Date.now()).getTime()) / 1000
        var tommorrow = parseFloat(new Date(Date.now()).getTime() + (24 * 60 * 60 * 1000));
        var defaultExp = tommorrow / 1000

        let aucDur = parseFloat(nft.auction[nft.auction.length - 1].duration)
        // let aucStart = parseFloat(new Date(nft.auction[nft.auction.length - 1].start_time).getTime)
        let aucStart = parseFloat(nft.auction[nft.auction.length - 1].start_time)
        let end_time = (aucStart + aucDur) / 1000


        var assetTemp = []
        console.log('............', defaultExp, typeof (defaultExp))
        for (let t = 0; t < nft.asset_activity.length; t++) {
            var tempObj = {}
            tempObj.price = nft.asset_activity[t].price
            tempObj.expiration = parseFloat(new Date(nft.asset_activity[t].expiration).getTime()) / 1000
            tempObj.date = parseFloat(new Date(nft.asset_activity[t].date).getTime()) / 1000
            tempObj.from_wallet_address = nft.asset_activity[t].from_wallet_address
            tempObj.receiver_id = nft.asset_activity[t].receiver_id
            tempObj.copies = nft.asset_activity[t].copies
            tempObj.event = nft.asset_activity[t].event
            assetTemp.push(tempObj)
        }
        assetTemp.push({ event: event, expiration: end_time, price: price, from_wallet_address: userWallet, receiver_id: nft.current_owner, date: this_time, copies: 1 })

        try {
            apiCall.current = MARKET_API.request({
                path: `/nft/edit/activities`,
                method: "post",
                body: {
                    nft_id: nft._id.$oid,
                    asset_activity: JSON.stringify(assetTemp)
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            let resp = await apiCall.current.promise;
            console.log('edit activity resp', resp)
            if (!resp.isSuccess)
                throw resp
            setApiLoading(false)
            window.location.reload()


        } catch (error) {
            setErr(error.statusText)
            setApiLoading(false)

        }

    }
    var ITEM_IMAGE = nft.nft_image_path.replace('root/dortzio/market/media/', '');
    const selectDuration = (e) => {
        var this_time = parseInt(new Date(Date.now()).getTime())
        var tommorrow = parseInt(new Date(Date.now()).getTime() + (24 * 60 * 60 * 1000));
        var next_six_hours = new Date(this_time + (6 * 1000 * 60 * 60)).getTime();
        var next_twelve_hours = new Date(this_time + (12 * 1000 * 60 * 60)).getTime();

        var difference = Math.abs(tommorrow - this_time) / 1000
        var exp;
        setDuration(e.target.id)

        if (e.target.id == '24H') {
            exp = tommorrow / 1000
            setExpiration(exp)

        } else if (e.target.id == '12H') {
            exp = next_twelve_hours / 1000
            setExpiration(exp)
        } else if (e.target.id == '6H') {
            exp = next_six_hours / 1000
            setExpiration(exp)
        }
    }


    useEffect(() => {
        GetUSDExchangeRate().then((res) => {
            setUsdExRate(parseFloat(res));
            console.log("usd", parseFloat(res));
        });
    }, []);




    const cancelLastBid = async () => {
        try {
            apiCall.current = MARKET_API.request({
                path: `/nft/auc/cancel/bid/`,
                method: "post",
                body: {
                    nft_id: nft._id.$oid,
                    wallet_address: userWallet
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            let resp = await apiCall.current.promise;
            console.log('cancel bid resp ------------', resp)

            if (!resp.isSuccess)
                throw resp
            setUserLastBid(undefined)
        }
        catch (err) {
            setErr(err.statusText)
            setApiLoading(false)
        }
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                // className="d-md-none"
                // inputProps={{MenuProps: {disableScrollLock: true}}}
                disableScrollLock={true}
            >
                <Box sx={{
                    width: '50%',
                    // height: '50%',
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
                }} className="d-flex flex-column justify-content-between">
                    {/* <div className="d-flex flex-column"> */}
                    <div className="d-flex flex-column">
                        <Box className="d-flex justify-content-between">
                            <div className="mb-4 d-flex justify-content-start" ><p style={{ margin: 0, fontWeight: "bold" }}>Place A Bid</p></div><div className="d-flex justify-content-end" style={{ cursor: "pointer" }} onClick={handleClose}><CloseSquare /></div>
                        </Box>
                        <Line className="mb-3" />

                        {userLastBid ?
                            <Det className="mb-4 flex-row">
                                <div className="my-1 d-flex flex-column justify-content-start align-items-start">
                                    <Subtitle style={{ fontSize: "14px" }}>your last bid:</Subtitle>
                                    <div className="d-flex align-items-center"><Num>{userLastBid}</Num><Subtitle style={{ fontSize: "14px" }}>&nbsp;ETH</Subtitle></div>
                                </div>
                                <div className="col-auto d-flex align-items-center"><ButtonOutline onClick={cancelLastBid} style={{ fontSize: "14px", fontWeight: 500, padding: "9px 16px" }}><Trash className="me-1" size="16" />Clear</ButtonOutline></div>
                            </Det>
                            : undefined}
                        <ItemRow className="mb-3">
                            <div className="d-flex">
                                <ItemImage style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${ITEM_IMAGE}`)) }} className="me-1" />
                                <div className="d-flex-flex-column"><Num>{nft.title}</Num><Subtitle>{shorten(nft.description)}</Subtitle></div></div>
                            <div className="d-flex flex-column align-items-end"><Num>{myPrice} ETH</Num><Subtitle>{myPrice == '--' ? '0' : (myPrice * usdExRate).toFixed(2) == 'NaN' ? '0' : (myPrice * usdExRate).toFixed(2)} $</Subtitle></div>
                        </ItemRow>
                        <Det className="mb-3">
                            <div className="my-1 d-flex justify-content-between align-items-center">
                                <Subtitle style={{ fontSize: "14px" }}>Balance:</Subtitle>
                                <div className="d-flex align-items-center"><Num>20</Num><Subtitle style={{ fontSize: "14px" }}>&nbsp;ETH</Subtitle></div>
                            </div>
                            <div className="my-1 d-flex justify-content-between align-items-center">
                                <Subtitle style={{ fontSize: "14px" }}>Floor Price:</Subtitle>
                                <div className="d-flex align-items-center"><Num>{collection.col_floor_price == ' ' ? '--' : collection.col_floor_price}</Num><Subtitle style={{ fontSize: "14px" }}>&nbsp;ETH</Subtitle></div>
                            </div>
                            <div className="my-1 d-flex justify-content-between align-items-center">
                                <Subtitle style={{ fontSize: "14px" }}>Best Offer:</Subtitle>
                                <div className="d-flex align-items-center"><Num>{highestOffer ? highestOffer : '--'}</Num><Subtitle style={{ fontSize: "14px" }}>&nbsp;ETH</Subtitle></div>
                            </div>
                        </Det>
                        <div className="d-flex flex-column mb-3"><p className="mb-1">Price</p>
                            <InputBox className="d-flex px-3 py-2 mb-1 justify-content-between">
                                <div className="col-11 p-0">
                                    <InputBase
                                        type="number"
                                        onChange={(e) => { setMyPrice(e.target.value) }}
                                        sx={{ color: "inherit", width: "100%", height: "100%" }}
                                        placeholder={startingPrice ? startingPrice : "enter your bid offer price"}
                                    />
                                </div>
                                <div className="col-1 p-0 text-center d-flex justify-content-end align-items-center"><InfoCircle size="18" /></div>
                            </InputBox>
                        </div>

                    </div>
                    <div className="d-flex flex-column">
                        {err ? <Typography sx={{ color: Colors.errorDark, textAlign: "center", fontSize: "12px" }}>{err}</Typography> : undefined}
                        {successMessage ? <Typography sx={{ color: Colors.successDark, textAlign: "center", fontSize: "12px" }}>{successMessage}</Typography> : undefined}
                        {apiLoading ? <ButtonLarge>
                            {/* <CircularProgress color="white" /> */}...
                        </ButtonLarge> :
                            <ButtonLarge onClick={handleSubmit}>place bid</ButtonLarge>}
                    </div>
                </Box>
            </Modal>

        </>
    );
}

export default PlaceBidModal;