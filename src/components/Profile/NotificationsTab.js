import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Colors } from "../design/Colors";
import '../../styles.css'
import { Ethereum, EthereumClassic } from "iconsax-react";
import { ButtonLarge } from "../design/Buttons";
import TickPic from '../../assets/tick.svg'
import { useSelect } from "@mui/base";
import { useSelector } from "react-redux";
import { InputBase, Typography } from "@mui/material";
import { GetUSDExchangeRate } from "../../utils/exChange";
import { useRef } from "react";
import { MARKET_API } from "../../utils/data/market_api";
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
// background-image: url(${TickPic});
// background-size:contain;
// background-repeat:no-repeat;
// background-position:center;
// &:before {
//     position: absolute;
//     left: 0;
//     top: 50%;
//     height: 50%;
//     width: 3px;
//     background-color: white;
//     content: "";
//     transform: translateX(10px) rotate(-45deg);
//     transform-origin: left bottom;
// };
// &:after {
//     position: absolute;
//     left: 0;
//     bottom: 0;
//     height: 3px;
//     width: 100%;
//     background-color: white;
//     content: "";
//     transform: translateX(10px) rotate(-45deg);
//     transform-origin: left bottom;
// }
`;

const CheckDes = styled.div`
width:calc(100% - 32px);
// flex-wrap:wrap;

`
const Contnr = styled.div`
width:60%;
@media screen and (max-width: 992px) {
    width: 90%;
};
@media screen and (max-width: 575px) {
    width: 100%;
};
`

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
    padding:12px;
`;


const NotificationSettings = ({ theme }) => {
    const [checked, setChecked] = useState([])
    const [value, setValue] = useState(undefined)
    const [thisChecked, setThisChecked] = useState(undefined)
    const globalUser = useSelector(state => state.userReducer);
    const shorten = (str) => {
        return str.length > 10 ? str.substring(0, 7) + "..." : str;
    }

    const handleCheck = (e) => {
        console.log(e.target.current)
        e.preventDefault()
        var tempArr = checked;
        setValue(e.target.id)
        // console.log(e.target.id)
        if (tempArr.includes(e.target.id)) {
            const removeItem = tempArr.filter((item) => item != e.target.id);
            tempArr = removeItem
        }
        else tempArr.push(e.target.id)


        setChecked(tempArr)
        console.log(tempArr)

        if (tempArr.includes(e.target.id)) {
            document.getElementById(e.target.id).style.backgroundColor = '#46C263';
        } else {
            document.getElementById(e.target.id).style.backgroundColor = '#f9f9f9';
        }

    }
    const [myPrice, setMyPrice] = useState('0')
    const [usdExRate, setUsdExRate] = useState();
    useEffect(() => {
        GetUSDExchangeRate().then((res) => {
            setUsdExRate(parseFloat(res));
            console.log("usd", parseFloat(res));
        });
    }, []);
    const onChange = (e) => {
        setMyPrice(e.target.value)
    }
    const [successMessage, setSuccessMessage] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const apiCall = useRef(undefined)

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
            let min_bid_tresh = data.min_bid_tresh
            let auction_expiration_is_active = data.auction_expiration.is_active
            let bid_activity_is_active = data.bid_activity.is_active
            let item_sold_is_active = data.item_sold.is_active
            let outbid_is_active = data.outbid.is_active
            let owned_item_updates_is_active = data.owned_item_updates.is_active
            let price_change_is_active = data.price_change.is_active
            setMyPrice(min_bid_tresh)
            var tempChecked = []
            if (auction_expiration_is_active)
                tempChecked.push('auction-expiration')
            if (bid_activity_is_active)
                tempChecked.push('bid-activity')
            if (item_sold_is_active)
                tempChecked.push('sold-item')
            if (outbid_is_active)
                tempChecked.push('outbid')
            if (owned_item_updates_is_active)
                tempChecked.push('owned-item-updates')
            if (price_change_is_active)
                tempChecked.push('price-change')
            setChecked(tempChecked)
            console.log(tempChecked)
        }
        catch (err) {
            console.log(err)
            if (err.status == 404) {
            }
            else if (err.status == 500) {
                setErr("Internal server error")
            }
        }
    }

    const handleSubmit = async () => {
        console.log(checked)
        try {
            apiCall.current = MARKET_API.request({
                path: `/notif/edit/`,
                method: "post",
                body: {
                    wallet_address: globalUser.walletAddress,
                    item_sold: checked.includes('sold-item') ? 1 : 0,
                    bid_activity: checked.includes('bid-activity') ? 1 : 0,
                    price_change: checked.includes('price-change') ? 1 : 0,
                    auction_expiration: checked.includes('auction-expiration') ? 1 : 0,
                    outbid: checked.includes('outbid') ? 1 : 0,
                    owned_item_updates: checked.includes('owned-item-updates') ? 1 : 0,
                    min_bid_tresh: myPrice.toString()
                },
            });
            const response = await apiCall.current.promise;
            console.log(response)
            if (!response.isSuccess)
                throw response
            setSuccessMessage('your new account setting is saved')
        }
        catch (err) {
            console.log(err)
            if (err.status == 404) {
                setErr("Not Found")
            }
            else if (err.status == 500) {
                setErr("Internal server error")
            }
        }
    }


    useEffect(() => {
        fetchNotifications()
    }, [])

    return (
        <>
            <Contnr className="d-flex flex-column">
                <p style={{ fontSize: "14px" }} className="m-0 d-flex align-items-center w-100"><span>Select which notifications you would like to receive for </span><span style={{ fontWeight: 600 }}>{shorten(globalUser.walletAddress)}</span></p>
                {/* {console.log(checked.includes(value))}
                {console.log("this", thisChecked)}
                {console.log(value)} */}
                <div className="d-flex align-items-center my-2">
                    <CheckPut id="sold-item" onClick={handleCheck} style={{ backgroundColor: checked.includes('sold-item') ? '#46C263' : '#f9f9f9' }}><img id="sold-item" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>
                    <CheckDes className="d-flex flex-column ms-2">
                        <h6 style={{ textTransform: Colors.subtitleFont, margin: 0, fontWeight: 600 }}>Item Sold</h6>
                        <p className="m-0">When someone purchased one of your items</p>
                    </CheckDes>
                </div>
                <div className="d-flex align-items-center my-2">
                    <CheckPut id="bid-activity" onClick={handleCheck} style={{ backgroundColor: checked.includes('bid-activity') ? '#46C263' : '#f9f9f9' }}><img id="bid-activity" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>
                    <CheckDes className="d-flex flex-column ms-2 flex-wrap">
                        <h6 style={{ textTransform: Colors.subtitleFont, margin: 0, fontWeight: 600 }}>bid activity</h6>
                        <p className="m-0">When someone bids on one of your items</p>
                    </CheckDes>
                </div>
                <div className="d-flex align-items-center my-2">
                    <CheckPut id="price-change" onClick={handleCheck} style={{ backgroundColor: checked.includes('price-change') ? '#46C263' : '#f9f9f9' }}><img id="price-change" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>
                    <CheckDes className="d-flex flex-column ms-2">
                        <h6 style={{ textTransform: Colors.subtitleFont, margin: 0, fontWeight: 600 }}>price change</h6>
                        <p className="m-0">When an item you made an offer on changes in price</p>
                    </CheckDes>
                </div>
                <div className="d-flex align-items-center my-2">
                    <CheckPut id="auction-expiration" onClick={handleCheck} style={{ backgroundColor: checked.includes('auction-expiration') ? '#46C263' : '#f9f9f9' }}><img id="auction-expiration" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>
                    <CheckDes className="d-flex flex-column ms-2">
                        <h6 style={{ textTransform: Colors.subtitleFont, margin: 0, fontWeight: 600 }}>auction expiration</h6>
                        <p className="m-0">When a timed auction you created ends</p>
                    </CheckDes>
                </div>
                <div className="d-flex align-items-center my-2">
                    <CheckPut id="outbid" onClick={handleCheck} style={{ backgroundColor: checked.includes('outbid') ? '#46C263' : '#f9f9f9' }}><img id="outbid" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>
                    <CheckDes className="d-flex flex-column ms-2">
                        <h6 style={{ textTransform: Colors.subtitleFont, margin: 0, fontWeight: 600 }}>outbid</h6>
                        <p className="m-0">When an offer you placed is exceeded by another user</p>
                    </CheckDes>
                </div>
                <div className="d-flex align-items-center my-2">
                    <CheckPut id="owned-item-updates" onClick={handleCheck} style={{ backgroundColor: checked.includes('owned-item-updates') ? '#46C263' : '#f9f9f9' }}><img id="owned-item-updates" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>
                    <CheckDes className="d-flex flex-column ms-2">
                        <h6 style={{ textTransform: Colors.subtitleFont, margin: 0, fontWeight: 600 }}>owned item updates</h6>
                        <p className="m-0">When a significant update occurs for one of the items you have purchased on YouWho</p>
                    </CheckDes>
                </div>
                <div className="d-flex align-items-center my-2">
                    <CheckPut id="successfull-purchase" onClick={handleCheck}><img id="successfull-purchase" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>
                    <CheckDes className="d-flex flex-column ms-2">
                        <h6 style={{ textTransform: Colors.subtitleFont, margin: 0, fontWeight: 600 }}>successfull purchase</h6>
                        <p className="m-0">Occasional updates from the YouWho team</p>
                    </CheckDes>
                </div>

                <div className="d-flex flex-column my-5">
                    <h4 style={{ fontWeight: 600, fontSize: '20px' }}>Minimum Bid Threshold</h4>
                    <p>Receive notifications only when you receive offers with a value greater than or equal to this amount of ETH.</p>
                    {/* <Selection>
                        <span><EthereumClassic color='#5BA4FC' />Ethereum</span>
                        <span style={{ fontWeight: 600 }}>50</span>
                    </Selection> */}
                    <Selection>
                        <span className="mx-2 d-flex"><EthereumClassic color={Colors.recommendedDark} />Ethereum</span>
                        {/* <Num className="mx-2">{50}</Num> */}
                        <InputBase
                            type="number"
                            onChange={onChange}
                            sx={{ color: "inherit", width: "100%", height: "100%", fontWeight: 600 }}
                            placeholder={myPrice}
                        // inputProps={{ 'aria-label': 'enter email' }}
                        />

                    </Selection>

                </div>

                <div className="row p-0">
                    <ButtonLarge onClick={handleSubmit}>Save</ButtonLarge>
                </div>
                {err || successMessage ?
                    <div className="row p-0">
                        {err ? <Typography sx={{ my: 1, color: Colors.errorDark, textAlign: "center", fontSize: "12px" }}>{err}</Typography> : undefined}
                        {successMessage ? <Typography sx={{ my: 1, color: Colors.successDark, textAlign: "center", fontSize: "12px" }}>{successMessage}</Typography> : undefined}
                    </div> : undefined
                }
            </Contnr>
        </>
    );
}

export default NotificationSettings;