import styled from "styled-components";
import { Colors } from "../design/Colors";
import { ArrowDown2, ArrowSquareRight, ArrowSwapVertical, BagTick, DocumentDownload, FilterSearch, Grid1, Grid2, Grid5, HambergerMenu, Logout, Refresh2 } from "iconsax-react";

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
    @media screen and (max-width: 600px) {
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
const ItemActivity = () => {
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
                <ProductCardDesktop className="my-1">
                    <Price style={{ width: "150px", overflow: "hidden" }}><BagTick size="17" />Sale</Price>
                    <Subtitle style={{ width: "150px", overflow: "hidden" }}>101 ETH</Subtitle>
                    <Subtitle style={{ width: "100px", overflow: "hidden" }}>1</Subtitle>
                    <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...4</Recommend>
                    <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...987</Recommend>
                    <Recommend style={{ width: "150px", overflow: "hidden" }}>2 hours ago<Logout /></Recommend>
                </ProductCardDesktop>

                <ProductCardDesktop className="my-1">
                    <Price style={{ width: "150px", overflow: "hidden" }}><BagTick size="17" />Sale</Price>
                    <Subtitle style={{ width: "150px", overflow: "hidden" }}>101 ETH</Subtitle>
                    <Subtitle style={{ width: "100px", overflow: "hidden" }}>1</Subtitle>
                    <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...4</Recommend>
                    <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...987</Recommend>
                    <Recommend style={{ width: "150px", overflow: "hidden" }}>2 hours ago<Logout /></Recommend>
                </ProductCardDesktop>

                <ProductCardDesktop className="my-1">
                    <Price style={{ width: "150px", overflow: "hidden" }}><BagTick size="17" />Sale</Price>
                    <Subtitle style={{ width: "150px", overflow: "hidden" }}>101 ETH</Subtitle>
                    <Subtitle style={{ width: "100px", overflow: "hidden" }}>1</Subtitle>
                    <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...4</Recommend>
                    <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...987</Recommend>
                    <Recommend style={{ width: "150px", overflow: "hidden" }}>2 hours ago<Logout /></Recommend>
                </ProductCardDesktop>

                <ProductCardDesktop className="my-1">
                    <Price style={{ width: "150px", overflow: "hidden" }}><BagTick size="17" />Sale</Price>
                    <Subtitle style={{ width: "150px", overflow: "hidden" }}>101 ETH</Subtitle>
                    <Subtitle style={{ width: "100px", overflow: "hidden" }}>1</Subtitle>
                    <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...4</Recommend>
                    <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...987</Recommend>
                    <Recommend style={{ width: "150px", overflow: "hidden" }}>2 hours ago<Logout /></Recommend>
                </ProductCardDesktop>

                <ProductCardDesktop className="my-1">
                    <Price style={{ width: "150px", overflow: "hidden" }}><BagTick size="17" />Sale</Price>
                    <Subtitle style={{ width: "150px", overflow: "hidden" }}>101 ETH</Subtitle>
                    <Subtitle style={{ width: "100px", overflow: "hidden" }}>1</Subtitle>
                    <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...4</Recommend>
                    <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...987</Recommend>
                    <Recommend style={{ width: "150px", overflow: "hidden" }}>2 hours ago<Logout /></Recommend>
                </ProductCardDesktop>

                <ProductCardDesktop className="my-1">
                    <Price style={{ width: "150px", overflow: "hidden" }}><BagTick size="17" />Sale</Price>
                    <Subtitle style={{ width: "150px", overflow: "hidden" }}>101 ETH</Subtitle>
                    <Subtitle style={{ width: "100px", overflow: "hidden" }}>1</Subtitle>
                    <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...4</Recommend>
                    <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...987</Recommend>
                    <Recommend style={{ width: "150px", overflow: "hidden" }}>2 hours ago<Logout /></Recommend>
                </ProductCardDesktop>

                <ProductCardDesktop className="my-1">
                    <Price style={{ width: "150px", overflow: "hidden" }}><BagTick size="17" />Sale</Price>
                    <Subtitle style={{ width: "150px", overflow: "hidden" }}>101 ETH</Subtitle>
                    <Subtitle style={{ width: "100px", overflow: "hidden" }}>1</Subtitle>
                    <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...4</Recommend>
                    <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...987</Recommend>
                    <Recommend style={{ width: "150px", overflow: "hidden" }}>2 hours ago<Logout /></Recommend>
                </ProductCardDesktop>

            </ItemsContainerDesktop>
        </ContainerCnt>
    );
}

export default ItemActivity;