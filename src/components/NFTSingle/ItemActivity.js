import styled from "styled-components";
import { Colors } from "../design/Colors";
import { ArrowDown2, ArrowSquareRight, ArrowSwapHorizontal, ArrowSwapVertical, BagTick, DocumentDownload, FilterSearch, Gift, Grid1, Grid2, Grid5, HambergerMenu, Logout, Magicpen, Refresh2 } from "iconsax-react";
import NoItemFound from "../NoItem";
import OfferIconOutline from "../design/OfferIcon";

const ContainerCnt = styled.div`
box-shadow: ${({ theme }) => theme.boxShadow};
background-color: ${({ theme }) => theme.nftActivityBG};
// border: ${({ theme }) => theme.searchBoxBorder};
border-radius: 24px;
width:100%;
`
const ItemsContainerDesktop = styled.div`
    // box-shadow: ${({ theme }) => theme.boxShadow};
    // background-color: ${({ theme }) => theme.nftActivityBG};
    // border: ${({ theme }) => theme.searchBoxBorder};
    // border-radius: 24px;
    display: flex;
    flex-direction: column;
    // padding: 25px;
    width:100%;
    @media screen and (max-width: 650px) {
        overflow:scroll;
        height:500px;
    }
    
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
const VisibleLine = styled.div`
    background: linear-gradient(90deg,#60606000 0%, #80808080 50%,#918A7A00 100%);
    height:1px;
    align-self:center;
    width:90%;
`;
const ProductCardDesktop = styled.div`
    // border-radius: 24px;
    display: flex;
    flex-direction: row;
    padding: 20px;
    justify-content:space-between;
    &:hover{
        background-color:${({ theme }) => theme.nftActivityHover};
    }
    @media screen and (max-width: 600px) {
        width:min-content;
    }

`;
const ActivityTitles = styled.div`
    padding:20px;
    @media screen and (max-width: 600px) {
        width:min-content;
    }
`
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
const ItemActivity = ({ activities }) => {
    console.log(activities)
    const shorten = (str) => {
        return str.length > 10 ? str.substring(0, 7) + "..." : str;
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
        <ContainerCnt className="p-2 mb-2">
            <ItemsContainerDesktop className="my-2 d-flex">
                <div style={{ padding: "20px" }} className="d-flex my-1"><ArrowSwapVertical className="me-1" /> Item Activity</div>
                <VisibleLine />
                <ActivityTitles className="my-1 d-flex justify-content-between">
                    <Subtitle style={{ width: "150px", overflow: "hidden" }}>Event</Subtitle>
                    <Subtitle style={{ width: "150px", overflow: "hidden" }}>Price</Subtitle>
                    <Subtitle style={{ width: "100px", overflow: "hidden" }}>Quantity</Subtitle>
                    <Subtitle style={{ width: "150px", overflow: "hidden" }}>From</Subtitle>
                    <Subtitle style={{ width: "150px", overflow: "hidden" }}>To</Subtitle>
                    <Subtitle style={{ width: "150px", overflow: "hidden" }}>Time</Subtitle>
                </ActivityTitles>
                {activities.length == 0 ? <NoItemFound text={'no activity found'} />
                    :
                    <>
                        {activities.map((activity) => {
                            return <ProductCardDesktop className="my-1">
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
                                <Subtitle style={{ width: "150px", overflow: "hidden" }}>{activity.price} ETH</Subtitle>
                                <Subtitle style={{ width: "100px", overflow: "hidden" }}>{activity.copies}</Subtitle>
                                <Recommend style={{ width: "150px", overflow: "hidden" }}>{shorten(activity.from_wallet_address)}</Recommend>
                                <Recommend style={{ width: "150px", overflow: "hidden" }}>{shorten(activity.receiver_id)}</Recommend>
                                <Recommend style={{ width: "150px", overflow: "hidden" }}>{countTime(activity.date)}<Logout /></Recommend>
                            </ProductCardDesktop>

                        })}
                    </>}

            </ItemsContainerDesktop>
        </ContainerCnt>
    );
}

export default ItemActivity;