import { ArrowDown2, ArrowSquareRight, ArrowSwapVertical, BagTick, CloseSquare, DocumentDownload, FilterSearch, Grid1, Grid2, Grid5, HambergerMenu, Logout, Refresh2 } from "iconsax-react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Colors } from "../design/Colors";
import '../../styles.css'
import { ButtonXSmall } from "../design/Buttons";
import NoItemFound from "../NoItem";
import { GetUSDExchangeRate } from "../../utils/exChange";


const ItemsContainerDesktop = styled.div`
    display: flex;
    flex-direction: column;
    width:100%;
    height:350px;
    overflow-y:scroll;
    scrollbar-width: 5px;
    // -ms-overflow-style: none;
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
        // width:10px !important;
        background: ${Colors.primaryDark}; 
        border-radius: 20px;
    }
    &::-webkit-scrollbar-button{
        // background:${Colors.primaryDark};
        // width:3px;
        // content : ${<ArrowDown2 size="10" color="purple" />}
        display:none;
    }
`;
const ProductCardDesktop = styled.div`
    display: flex;
    flex-direction: row;
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
    @media screen and (max-width: 768px) {
        font-size:14px;
    }
    
`
const Recommend = styled.span`
    color: ${Colors.recommendedDark};
    display:flex;
    align-items:center;
    // font-size:12px;
    @media screen and (max-width: 768px) {
        font-size:14px;
    }
`
const Price = styled.p`
    color: ${({ theme }) => theme.trendingSectionSubTitles};
    margin:0;
    display:flex;
    align-items:center;
    @media screen and (max-width: 768px) {
        font-size:14px;
    }
`

const ListingHistory = ({ listings }) => {
    const shorten = (str) => {
        return str.length > 10 ? str.substring(0, 7) + "..." : str;
    }
    const [usdExRate, setUsdExRate] = useState();
    useEffect(() => {
        GetUSDExchangeRate().then((res) => {
            setUsdExRate(parseFloat(res));
            console.log("usd", parseFloat(res));
        });
    }, []);

    const countDifference = (expiration) => {
        let this_time = new Date().getTime()
        let expire_time = new Date(expiration).getTime()
        let difference = (expire_time - this_time) / 1000
        let days = Math.floor(difference / 86400);
        let hours = Math.floor(difference / 3600) % 24;
        let minutes = Math.floor(difference / 60) % 60;
        let seconds = Math.floor(difference % 60);
        // if (days > 0)
        //     return <>{days} days</>
        // else if (hours > 0)
        //     return <>{hours} hours</>
        // else return <>{minutes} mins</>
        if (days > 0) {
            return <span>{days + ' days'}</span>
        } else if (hours > 0) {
            return <span>{hours + ' hours'}</span>
        } else if (minutes > 0) {
            return <span>{minutes + ' mins'}</span>
        }
        else return <span>expired</span>


    }


    return (
        <ItemsContainerDesktop className="my-2 d-flex">

            <div className="my-1 d-flex justify-content-between">
                <Subtitle style={{ width: "150px", overflow: "hidden" }}>Price</Subtitle>
                <Subtitle style={{ width: "150px", overflow: "hidden" }}>USD Price</Subtitle>
                <Subtitle style={{ width: "100px", overflow: "hidden" }}>Expiration</Subtitle>
                <Subtitle style={{ width: "100px", overflow: "hidden" }}>From</Subtitle>
                <div style={{ width: "100px", overflow: "hidden" }}></div>
            </div>
            {listings.length == 0 ?
                <NoItemFound text={'no history found'} /> :
                <>
                    {listings.map((listing) => {
                        return <ProductCardDesktop className="my-1">
                            <Price style={{ width: "150px", overflow: "hidden" }}>{listing.price} ETH</Price>
                            <Subtitle style={{ width: "150px", overflow: "hidden" }}>{listing.price == '--' ? '0' : (listing.price * usdExRate).toFixed(2) == 'NaN' ? '0' : (listing.price * usdExRate).toFixed(2)} $</Subtitle>
                            <Subtitle style={{ width: "100px", overflow: "hidden" }}>{countDifference(listing.expiration)}</Subtitle>
                            <Recommend style={{ width: "100px", overflow: "hidden" }}>{shorten(listing.from_wallet_address)}</Recommend>
                            <div style={{ width: "100px", overflow: "hidden" }}><ButtonXSmall>Buy</ButtonXSmall></div>
                        </ProductCardDesktop>
                    })}
                </>
            }
        </ItemsContainerDesktop>

    );
}

export default ListingHistory;