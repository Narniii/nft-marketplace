import { InputBase } from "@mui/material";
import { Box } from "@mui/system";
import { Ethereum } from "iconsax-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { API_CONFIG } from "../../config";
import { GetUSDExchangeRate } from "../../utils/exChange";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { Colors } from "../design/Colors";


const Card = styled.div`
background-color:${({ theme }) => theme.itemCardsBackground};
box-shadow:${({ theme }) => theme.boxShadow};
display: flex;
flex-direction: row;
align-items: center;
// justify-content:space-between;
border-radius:24px;
flex-wrap:wrap;
`
const ImageC = styled.div`
background-color:#d9d9d9;
border:1px solid white;
border-radius:50%;
height:100px;
width:100px;
align-self:start;
background-size:cover;
background-repeat:no-repeat;
background-position:center;
`
const Exp = styled.div`
display:flex;
width:calc(100% - 100px);
`
const Subtitle = styled.p`
color:${({ theme }) => theme.textSub};
font-size:14px;
margin:0;
`
const Num = styled.span`
color:${({ theme }) => theme.collectionDetailsAnswer} !important;
font-weight:600;
`
const Selection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background: transparent;
    justify-content:start;
    border: 1px solid #D9D9D9;
    border-radius: 24px;
    padding:10px;
    width:100%;
`;


const OfferCard = ({ collection, setFloorBody }) => {
    const [myPrice, setMyPrice] = useState(undefined)
    const [usdExRate, setUsdExRate] = useState();
    useEffect(() => {
        GetUSDExchangeRate().then((res) => {
            setUsdExRate(parseFloat(res));
            console.log("usd", parseFloat(res));
        });
    }, []);
    const onChange = (e) => {
        setMyPrice(e.target.value)
        setFloorBody({ collection_id: collection._id.$oid, floor_offer_price: e.target.value })
    }


    return (<Card className="my-2 p-3">
        {/* <div className="d-flex align-items-center justify-content-between"> */}
        <ImageC style={{ backgroundImage: collection.logo_path ? BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${collection.logo_path.replace('root/dortzio/auth/media/', '')}`)) : `${Colors.gray9}` }} />

        <Exp className="flex-column flex-sm-row justify-content-between">
            <div className="d-flex flex-column mx-2">
                <p>{collection.title}</p>
                <div className="d-flex flex-column">
                    <Subtitle className="d-flex align-items-center">Floor price:&nbsp;<Num>{collection.floor_price !== " " ? collection.floor_price : "0"}</Num>&nbsp;ETH</Subtitle>
                    <Subtitle className="d-flex align-items-center">items:&nbsp;<Num>{collection.nft_ids.length}</Num></Subtitle>
                </div>
            </div>

            <div className="d-flex flex-column align-items-end align-items-sm-center justify-content-between mt-2 mt-sm-0">
                <Selection>
                    <span style={{ color: "#999999" }} className="mx-2 d-flex"><Ethereum color={Colors.recommendedDark} />ETH</span>
                    {/* <Num className="mx-2">{50}</Num> */}
                    <InputBase
                        type="number"
                        onChange={onChange}
                        sx={{ color: "inherit", width: "100%", height: "100%" }}
                        placeholder={collection.floor_offer_price ? collection.floor_offer_price : '0'}
                    // inputProps={{ 'aria-label': 'enter email' }}
                    />

                </Selection>
                <Subtitle>${!myPrice ? '0' : (myPrice * usdExRate).toFixed(2) == 'NaN' ? '0' : (myPrice * usdExRate).toFixed(2)} USD</Subtitle>
            </div>
        </Exp>
        {/* </div> */}
    </Card>);
}

export default OfferCard;