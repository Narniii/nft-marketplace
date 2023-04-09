import { Star1 } from "iconsax-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { API_CONFIG } from "../../config";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";

const Card = styled.div`
    height:80px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    // padding: 12px 8px;
    background: ${({ theme }) => theme.collectionCard};
    border-radius: 12px;
    cursor:pointer;
    &:hover{
        background: ${({ theme }) => theme.collectionCardHover};
    }
    &:active{
        background: ${({ theme }) => theme.collectionCardActive};
    }

    `
    ;
const ColLogoHolder = styled.div`
    box-sizing: border-box;
    background: #D9D9D9;
    border:${({ theme }) => theme.collectionBorder};
    border-radius:50%;
    width:50px;
    height:50px;
    background-position:center;
    background-repeat:no-repeat;
    background-size:cover;

    `;
const PriceUnit = styled.span`
    color: ${({ theme }) => theme.pricesUnits};
    font-weight:400;
`;


const CollectionCard = ({ collection, theme, index, collectionLogo, collectionName, collectionFloor, collectionVolume }) => {
    const shorten = (str) => {
        return str.length > 10 ? str.substring(0, 7) + "..." : str;
    }
    const shortenDes = (str) => {
        return str.length > 15 ? str.substring(0, 15) + "..." : str;
    }

    var LOGO_IMAGE = collection.logo_path.replace('root/dortzio/market/media/', '');

    return (
        <>
            {/*no mobile card */}
            <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'collection/' + collection.title + '/' + collection._id.$oid}>
                <Card className="my-2 d-none d-sm-flex">
                    <div style={{
                        display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                        // border: "1px solid blue",
                        width: "50%",
                        paddingLeft: "8px"
                    }}>
                        <div>{index}&nbsp;&nbsp;</div>
                        <ColLogoHolder style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${LOGO_IMAGE}`)) }} />
                        <div>&nbsp;&nbsp;{shortenDes(collectionName)}&nbsp;</div>
                    </div>
                    <div style={{
                        display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                        // border: "1px solid blue",
                        fontWeight: 600,
                        width: "150px",
                    }}>
                        {collection.floor_price !== " " ? collection.floor_price : 0}&nbsp;<PriceUnit>ETH</PriceUnit>
                    </div>
                    <div style={{
                        display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                        // border: "1px solid blue",
                        width: "150px",
                        fontWeight: 600,
                        paddingRight: "8px"
                    }}>
                        {collection.volume}&nbsp;<PriceUnit>ETH</PriceUnit>
                    </div>
                </Card>
            </Link>
            {/*mobile card */}
            <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'collection/' + collection.title + '/' + collection._id.$oid}>
                <Card className="my-2 d-flex d-sm-none">
                    <div style={{
                        display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                        paddingLeft: "8px"
                        // border: "1px solid blue",
                        // width: "60%"
                    }}>
                        <div>{index}&nbsp;&nbsp;</div>
                        <ColLogoHolder style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${LOGO_IMAGE}`)) }} />
                        <div>&nbsp;&nbsp;{shorten(collectionName)}&nbsp;&nbsp;</div>
                    </div>
                    <div style={{
                        display: "flex", flexDirection: "row", justifyContent: "end", alignItems: "center",
                        // border: "1px solid blue",
                        width: "100px",
                        fontWeight: 600,
                        paddingRight: "8px"
                    }}>
                        {collection.floor_price !== " " ? collection.floor_price : 0}&nbsp;<PriceUnit>ETH</PriceUnit>
                    </div>
                </Card>
            </Link>
        </>
    );
}

export default CollectionCard;