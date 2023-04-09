import { Box, CircularProgress, FormControl, InputBase, MenuItem, Modal, Select, Typography } from "@mui/material";
import { ArrowDown2, CloseSquare, InfoCircle } from "iconsax-react";
import styled from "styled-components";
import { ButtonLarge } from "../design/Buttons";
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
import Bullet from "../design/Bullet";
import { Colors } from "../design/Colors";
import { convertDate, convertThisDate, convertThisHour, countCreatorFee } from "../../utils/countingFunctions";

const OptionRow = styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
align-items:center;
text-transform:${Colors.subtitleFont};
margin:10px 0;
`
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
font-size:14px;
margin:0;
`
const TTT = styled.p`
color:${({ theme }) => theme.pricesUnits};
text-transfomr:${Colors.subtitleFont};
margin:14px 0;
font-weight:500;
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
    margin:10px 0;
`;



const SellModal = ({ collection, open, handleClose, theme, id, userWallet, nft }) => {
    const [successMessage, setSuccessMesssage] = useState(undefined)
    const [apiLoading, setApiLoading] = useState(false)
    const [err, setErr] = useState(undefined)
    const [duration, setDuration] = useState('24H')
    const [myPrice, setMyPrice] = useState('--')
    const apiCall = useRef(undefined)
    const [isListing, setIsListing] = useState(true)
    const [isAuction, setIsAuction] = useState(false)
    const [usdExRate, setUsdExRate] = useState();
    const [expiration, setExpiration] = useState(undefined)
    const [highestOffer, setHighestOffer] = useState(undefined)
    const [auctionMethod, setAuctionMethod] = useState('highest')
    const [startingPrice, setStartingPrice] = useState('--')
    const [endingPrice, setEndingPrice] = useState('--')
    useEffect(() => {
        let offers = []
        if (nft.offers.length > 0) {
            for (let o = 0; o < nft.offers.length; o++) {
                offers.push(parseFloat(nft.offers[o].price))
            }
            setHighestOffer(Math.max(offers))
        }
        else setHighestOffer('--')
    }, [nft])
    const handleSubmit = async () => {
        var tommorrow = parseFloat(new Date(Date.now()).getTime() + (24 * 60 * 60 * 1000));
        var defaultExp = tommorrow / 1000
        var this_time = parseFloat(new Date(Date.now()).getTime()) / 1000
        var difference;
        if (expiration) {
            difference = expiration - this_time
        } else { difference = defaultExp - this_time }

        console.log(difference)


        if (isListing) {
            // when puting on sale

            setApiLoading(true)
            if (myPrice < 0 || myPrice == '--') {
                setErr('please select a valid price for your listing')
                setApiLoading(false)
                return
            }
            const NFTData = new FormData();
            NFTData.append('nft_id', nft._id.$oid);
            NFTData.append('price', myPrice);
            NFTData.append('owner', userWallet);
            try {
                apiCall.current = MARKET_API.request({
                    path: `/nft/edit/price`,
                    method: "post",
                    body: NFTData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                let resp = await apiCall.current.promise;
                console.log('submit resp', resp)

                if (!resp.isSuccess)
                    throw resp


                editAssetActivity('list', myPrice)
                setSuccessMesssage('listed successfully')
                // setApiLoading(false)
            }
            catch (err) {
                setErr(err.statusText)
                setApiLoading(false)
            }
        }
        else {
            // when setting an auction

            console.log(difference, this_time)
            setApiLoading(true)
            if (startingPrice < 0 || startingPrice == '--') {
                setErr('please select a valid price')
                setApiLoading(false)
                return
            }
            try {
                apiCall.current = MARKET_API.request({
                    path: `/nft/auc/`,
                    method: "post",
                    body: {
                        from_wallet_address: userWallet,
                        nft_id: nft._id.$oid,
                        auction: JSON.stringify([{ nft_id: nft._id.$oid, is_ended: false, start_time: this_time, duration: difference, starting_price: startingPrice, reserve_price: '', include_reserve_price: false, bids: [{}], }])
                    },
                });
                let resp = await apiCall.current.promise;
                console.log('submit resp', resp)

                if (!resp.isSuccess)
                    throw resp


                editAssetActivity('list', startingPrice)
                // setSuccessMesssage('auction created successfully')
                // setApiLoading(false)
            }
            catch (err) {
                setErr(err.statusText)
                setApiLoading(false)
            }

        }

    }
    const editAssetActivity = async (event, price) => {
        var this_time = parseFloat(new Date(Date.now()).getTime()) / 1000
        console.log(this_time)
        var tommorrow = parseFloat(new Date(Date.now()).getTime() + (24 * 60 * 60 * 1000));
        var defaultExp = tommorrow / 1000


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
        assetTemp.push({ event: event, expiration: expiration ? expiration : defaultExp, price: price, from_wallet_address: userWallet, receiver_id: '---', date: this_time, copies: 1 })



        var listingTemp = []
        for (let i = 0; i < nft.listings.length; i++) {
            let tempObj = {}
            tempObj.price = nft.listings[i].price
            tempObj.expiration = parseFloat(new Date(nft.listings[i].expiration).getTime()) / 1000
            tempObj.from_wallet_address = nft.listings[i].from_wallet_address
            tempObj.nft_id = nft.listings[i].nft_id
            listingTemp.push(tempObj)
        }
        listingTemp.push({ from_wallet_address: userWallet, expiration: expiration ? expiration : defaultExp, price: price, nft_id: nft._id.$oid })



        console.log(assetTemp, listingTemp)

        try {
            apiCall.current = MARKET_API.request({
                path: `/nft/edit/activities`,
                method: "post",
                body: {
                    nft_id: nft._id.$oid,
                    asset_activity: JSON.stringify(assetTemp),
                    listings: JSON.stringify(listingTemp)
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
            // window.location.reload()


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

    const setListing = () => {
        setIsListing(true)
        setIsAuction(false)
    }
    const setAuctioning = () => {
        setIsAuction(true)
        setIsListing(false)
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
                    height: { xs: "100%", sm: 600, md: 800 },
                    overflowY: "scroll",
                    '-ms-overflow-style': 'none',
                    '&::-webkit-scrollbar': {
                        display: "none"
                    },
                    borderRadius: { xs: 0, sm: "24px" },
                    position: "absolute",
                    top: "10%",
                    left: "25%",
                    p: '20px',
                    bgcolor: theme == 'light' ? "#ffffff" : "#272448",
                    '@media screen and (max-width: 992px)': {
                        width: '100%',
                        left: "0",
                        bottom: "0",
                        top: "unset",
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,

                    },
                }} className="d-flex flex-column justify-content-between">
                    {/* <div className="d-flex flex-column"> */}
                    <div className="d-flex flex-column">
                        <Box className="d-flex justify-content-between align-items-center" sx={{ mb: "10px" }}>
                            <div className="d-flex justify-content-start" ><p style={{ margin: 0, fontWeight: "bold" }}>List For Sale</p></div><div className="d-flex justify-content-end" style={{ cursor: "pointer" }} onClick={handleClose}><CloseSquare /></div>
                        </Box>
                        <Line />
                        <OptionRow>
                            <div className="d-flex-flex-column"><Num>fixed price</Num>
                                <Subtitle>the item is listed at the price you set</Subtitle>
                            </div>
                            <Bullet onClick={setListing} isChecked={isListing} />
                        </OptionRow>
                        <OptionRow>
                            <div className="d-flex-flex-column"><Num>timed auction</Num>
                                <Subtitle>the item is listed for auction</Subtitle>
                            </div>
                            <Bullet onClick={setAuctioning} isChecked={isAuction} />
                        </OptionRow>
                        <Line />
                        {isListing ?
                            <>
                                <div className="d-flex flex-column my-4"><p className="mb-1">Set A Price</p>
                                    <InputBox className="d-flex px-3 py-2 mb-1 justify-content-between">
                                        <div className="col-11 p-0">
                                            <InputBase
                                                type="number"
                                                onChange={(e) => { setMyPrice(e.target.value) }}
                                                sx={{ color: "inherit", width: "100%", height: "100%" }}
                                                placeholder="enter your price"
                                            // inputProps={{ 'aria-label': 'enter email' }}
                                            />
                                        </div>
                                        <div className="col-1 p-0 text-center d-flex justify-content-end align-items-center"><InfoCircle size="18" /></div>
                                    </InputBox>
                                </div>
                                <div className="d-flex flex-column mb-4"><p className="mb-1">Set Duration</p>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <SSelection selectValue={duration} handleSelect={selectDuration} id={'offer-modal'} width={'100%'} theme={theme} tabs={['24H', '12H', '6H']} />
                                        <div className="d-flex flex-column align-items-end ms-1">
                                            <Subtitle>{convertThisDate(new Date())}</Subtitle>
                                            <Subtitle>{convertThisHour(new Date())}</Subtitle>
                                        </div>
                                    </div>
                                </div>

                            </> :
                            <>
                                <TTT>Choose A Method</TTT>
                                <OptionRow>
                                    <div className="d-flex-flex-column"><Num>Sell to highest bidder</Num>
                                        <Subtitle>The highest bid wins at the end.</Subtitle>
                                    </div>
                                    <Bullet onClick={() => setAuctionMethod("highest")} isChecked={auctionMethod == 'highest'} />
                                </OptionRow>
                                <OptionRow>
                                    <div className="d-flex-flex-column"><Num>Sell with declining price</Num>
                                        <Subtitle>The price falls until someone purchases the item.</Subtitle>
                                    </div>
                                    <Bullet onClick={() => setAuctionMethod("declining")} isChecked={auctionMethod == 'declining'} />
                                </OptionRow>

                                <div className="d-flex flex-column my-4"><p className="mb-1">Starting Price</p>
                                    <InputBox className="d-flex px-3 py-2 mb-1 justify-content-between">
                                        <div className="col-11 p-0">
                                            <InputBase
                                                type="number"
                                                onChange={(e) => { setStartingPrice(e.target.value) }}
                                                sx={{ color: "inherit", width: "100%", height: "100%" }}
                                                placeholder="enter price"
                                            />
                                        </div>
                                        <div className="col-1 p-0 text-center d-flex justify-content-end align-items-center"><InfoCircle size="18" /></div>
                                    </InputBox>
                                </div>

                                {auctionMethod == 'declining' ?
                                    <div className="d-flex flex-column mb-4"><p className="mb-1">Ending Price</p>
                                        <InputBox className="d-flex px-3 py-2 mb-1 justify-content-between">
                                            <div className="col-11 p-0">
                                                <InputBase
                                                    type="number"
                                                    onChange={(e) => { setEndingPrice(e.target.value) }}
                                                    sx={{ color: "inherit", width: "100%", height: "100%" }}
                                                    placeholder="enter price"
                                                />
                                            </div>
                                            <div className="col-1 p-0 text-center d-flex justify-content-end align-items-center"><InfoCircle size="18" /></div>
                                        </InputBox>
                                    </div>
                                    : undefined}


                                <div className="d-flex flex-column mb-4"><p className="mb-1">Set Duration</p>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <SSelection selectValue={duration} handleSelect={selectDuration} id={'offer-modal'} width={'100%'} theme={theme} tabs={['24H', '12H', '6H']} />
                                        <div className="d-flex flex-column align-items-end ms-1">
                                            <Subtitle>{convertThisDate(new Date())}</Subtitle>
                                            <Subtitle>{convertThisHour(new Date())}</Subtitle>
                                        </div>
                                    </div>
                                </div>

                            </>}
                        <Det className="mb-4">
                            <Typography sx={{ fontWeight: 500, mb: 3 }}>Summary</Typography>
                            <div className="my-1 d-flex justify-content-between align-items-center">
                                <Subtitle style={{ fontSize: "14px" }}>Listing Price:</Subtitle>
                                <div className="d-flex align-items-center"><Num>{isListing ? myPrice : startingPrice}</Num><Subtitle style={{ fontSize: "14px" }}>&nbsp;ETH</Subtitle></div>
                            </div>
                            <div className="my-1 d-flex justify-content-between align-items-center">
                                <Subtitle style={{ fontSize: "14px" }}>Service Fee:</Subtitle>
                                <div className="d-flex align-items-center"><Num>0.5%</Num></div>
                            </div>
                            <div className="my-1 d-flex justify-content-between align-items-center">
                                <Subtitle style={{ fontSize: "14px" }}>Creator Earning:</Subtitle>
                                <div className="d-flex align-items-center"><Num>{countCreatorFee(collection.perpetual_royalties, collection.collection_creator)}</Num></div>
                            </div>
                        </Det>
                        <div className="d-flex justify-content-between align-items-center mb-5">
                            <Typography sx={{ fontWeight: 500, }}>Potential Earning</Typography>
                            <Typography sx={{ fontWeight: 500, }}>-- ETH</Typography>
                        </div>
                    </div>
                    {apiLoading ? <ButtonLarge className="align-self-end">...</ButtonLarge> :
                        <ButtonLarge className="align-self-end" onClick={handleSubmit}>Save</ButtonLarge>}
                    {err ? <Typography sx={{ my: 1, color: Colors.errorDark, textAlign: "center", fontSize: "12px" }}>{err}</Typography> : undefined}
                    {successMessage ? <Typography sx={{ my: 1, color: Colors.successDark, textAlign: "center", fontSize: "12px" }}>{successMessage}</Typography> : undefined}

                </Box>
            </Modal>

        </>

    );
}

export default SellModal;