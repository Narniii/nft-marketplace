import { MoreCircle } from "iconsax-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import testNFT from '../../assets/testNFT.png'
import { API_CONFIG } from "../../config";
import { addItem } from "../../redux/actions";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { AddToCartButton } from "../design/Buttons";

const Card = styled.div`
width: 100%;
// height: 100%;
// background: ${({ theme }) => theme.itemCardsBackground};
// box-shadow: ${({ theme }) => theme.boxShadow};
// border-radius: 24px;
// flex: none;
// order: 0;
// flex-grow: 0;
// display:flex;
// flex-direction:column;
`
const Image = styled.div`
height:200px;
width:100%;
background-position:center;
background-repeat:no-repeat;
background-size:cover;
// border-radius: 24px;
position:relative;
`
const MoreOpt = styled.div`
position:absolute;
right:12px;
top:12px;
border-radius:50%;
width:auto;
background: ${({ theme }) => theme.itemCardsBackground};
cursor:pointer;
`
const CreatorHolder = styled.div`
    color: ${({ theme }) => theme.creatorName};
    height:50px;
    `;
const NameHolder = styled.div`
    height:45px;
    display:flex;
    align-items:center;
    padding:12px 16px;
    font-weight:bold;
`

const InnerDiv = styled.div`
    height: 100%;
    background: ${({ theme }) => theme.itemCardsBackground};
    box-shadow: ${({ theme }) => theme.boxShadow};
    border-radius: 24px;
    display:flex;
    flex-direction:column;
    overflow:hidden;
    `


const MyCollectionCard = ({ itemImage, collectionName }) => {
    var ITEM_IMAGE = itemImage.replace('root/NFTMarketplace-Backend/market/media/', '');

    return (
        <div className="col-12 col-sm-6 col-md-3 p-0">
            <Card className="p-1 align-items-center align-self-center" >
                {/* <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + }> */}
                <InnerDiv>
                    <Image style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${ITEM_IMAGE}`)) }}><MoreOpt><MoreCircle />ّ</MoreOpt></Image>
                    <NameHolder>{collectionName}</NameHolder>
                </InnerDiv>
                {/* </Link> */}
            </Card>
        </div>
    );
}

export default MyCollectionCard;