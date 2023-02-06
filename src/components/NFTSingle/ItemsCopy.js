import { ArrowDown2, ArrowSquareRight, ArrowSwapVertical, BagTick, CloseSquare, DocumentDownload, FilterSearch, Grid1, Grid2, Grid5, HambergerMenu, Logout, Refresh2 } from "iconsax-react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Colors } from "../design/Colors";
import '../../styles.css'
import testPic from '../../assets/testpic.png'


const ItemsContainerDesktop = styled.div`
    display: flex;
    height:350px;
    flex-direction: column;
    width:100%;
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
const Recommend = styled.span`
    color: ${Colors.recommendedDark};
    display:flex;
    align-items:center;
    // font-size:12px;
    @media screen and (max-width: 768px) {
        font-size:14px;
    }

`
const ItemCard = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
padding:5px 16px;
&:hover{
    background-color: ${({ theme }) => theme.nftActivityHover};
}
`
const ItemImage = styled.div`
    background-image: url(${testPic});
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;
    height:45px;
    width:45px;
    border-radius:8px;
    margin-right:10px;
`;

const ItemsCopy = () => {
    return (<ItemsContainerDesktop>
        <ItemCard><div className="d-flex"><ItemImage /><div className="d-flex flex-column"><Recommend>Moonbird Geneis #2468</Recommend><p className="m-0">monkey145236 </p></div></div><span style={{ fontWeight: "bold",textTransform:"lowercase",letterSpacing: '0.005em' }}>x 1</span></ItemCard>
        <ItemCard><div className="d-flex"><ItemImage /><div className="d-flex flex-column"><Recommend>Moonbird Geneis #2468</Recommend><p className="m-0">monkey145236 </p></div></div><span style={{ fontWeight: "bold",textTransform:"lowercase",letterSpacing: '0.005em' }}>x 1</span></ItemCard>
        <ItemCard><div className="d-flex"><ItemImage /><div className="d-flex flex-column"><Recommend>Moonbird Geneis #2468</Recommend><p className="m-0">monkey145236 </p></div></div><span style={{ fontWeight: "bold",textTransform:"lowercase",letterSpacing: '0.005em' }}>x 1</span></ItemCard>
        <ItemCard><div className="d-flex"><ItemImage /><div className="d-flex flex-column"><Recommend>Moonbird Geneis #2468</Recommend><p className="m-0">monkey145236 </p></div></div><span style={{ fontWeight: "bold",textTransform:"lowercase",letterSpacing: '0.005em' }}>x 1</span></ItemCard>
        <ItemCard><div className="d-flex"><ItemImage /><div className="d-flex flex-column"><Recommend>Moonbird Geneis #2468</Recommend><p className="m-0">monkey145236 </p></div></div><span style={{ fontWeight: "bold",textTransform:"lowercase",letterSpacing: '0.005em' }}>x 1</span></ItemCard>
        <ItemCard><div className="d-flex"><ItemImage /><div className="d-flex flex-column"><Recommend>Moonbird Geneis #2468</Recommend><p className="m-0">monkey145236 </p></div></div><span style={{ fontWeight: "bold",textTransform:"lowercase",letterSpacing: '0.005em' }}>x 1</span></ItemCard>
        <ItemCard><div className="d-flex"><ItemImage /><div className="d-flex flex-column"><Recommend>Moonbird Geneis #2468</Recommend><p className="m-0">monkey145236 </p></div></div><span style={{ fontWeight: "bold",textTransform:"lowercase",letterSpacing: '0.005em' }}>x 1</span></ItemCard>
        <ItemCard><div className="d-flex"><ItemImage /><div className="d-flex flex-column"><Recommend>Moonbird Geneis #2468</Recommend><p className="m-0">monkey145236 </p></div></div><span style={{ fontWeight: "bold",textTransform:"lowercase",letterSpacing: '0.005em' }}>x 1</span></ItemCard>
        <ItemCard><div className="d-flex"><ItemImage /><div className="d-flex flex-column"><Recommend>Moonbird Geneis #2468</Recommend><p className="m-0">monkey145236 </p></div></div><span style={{ fontWeight: "bold",textTransform:"lowercase",letterSpacing: '0.005em' }}>x 1</span></ItemCard>
        <ItemCard><div className="d-flex"><ItemImage /><div className="d-flex flex-column"><Recommend>Moonbird Geneis #2468</Recommend><p className="m-0">monkey145236 </p></div></div><span style={{ fontWeight: "bold",textTransform:"lowercase",letterSpacing: '0.005em' }}>x 1</span></ItemCard>
        <ItemCard><div className="d-flex"><ItemImage /><div className="d-flex flex-column"><Recommend>Moonbird Geneis #2468</Recommend><p className="m-0">monkey145236 </p></div></div><span style={{ fontWeight: "bold",textTransform:"lowercase",letterSpacing: '0.005em' }}>x 1</span></ItemCard>
        <ItemCard><div className="d-flex"><ItemImage /><div className="d-flex flex-column"><Recommend>Moonbird Geneis #2468</Recommend><p className="m-0">monkey145236 </p></div></div><span style={{ fontWeight: "bold",textTransform:"lowercase",letterSpacing: '0.005em' }}>x 1</span></ItemCard>
    </ItemsContainerDesktop>);
}

export default ItemsCopy;