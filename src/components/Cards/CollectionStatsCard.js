import { Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { Star1 } from "iconsax-react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { API_CONFIG } from "../../config";
import { percentage } from "../../utils/countingFunctions";
import { MARKET_API } from "../../utils/data/market_api";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { Colors } from "../design/Colors";

const Card = styled.div`
    height:80px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 8px;
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
    border: 1px solid #D9D9D9;
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
const DetailHolder = styled.div`
// width:150px;
display:flex;
align-items:center;

`


const CollectionStatsCard = ({ watchlistTab, collection, theme, index, collectionLogo, collectionName, collectionFloor, collectionVolume }) => {
    const shorten = (str) => {
        return str.length > 10 ? str.substring(0, 10) + "..." : str;
    }
    const { active, account, library, connector, activate, deactivate } = useWeb3React()


    var A = parseFloat(collection.volume)
    var B = parseFloat(collection.last_volume)
    function relDiff(a, b) {
        if (a !== 0 && b !== 0)
            return (a < b ? "-" + ((b - a) * 100) / a : ((a - b) * 100) / b) + "%";
        else return 0
    }

    const globalUser = useSelector(state => state.userReducer)
    const apiCall = useRef(undefined)

    //----------> adding/removing collection to/from watchlist
    const [isOnWatchList, setIsOnWatchList] = useState(false)
    const [err, setErr] = useState(undefined)
    const [watchListId, setWatchListId] = useState(undefined)
    const getOnWatchList = async () => {
        try {
            apiCall.current = MARKET_API.request({
                path: `/watchlist/get/`,
                method: "post",
                body: { user_id: globalUser.userId },
            });
            let response = await apiCall.current.promise;
            // console.log('watchlist????', response)
            if (!response.isSuccess)
                throw response
            for (var c = 0; c < response.data.length; c++) {
                if (response.data[c].title == collection.title) {
                    setIsOnWatchList(true)
                    setWatchListId(response.data[c].wl_id)
                }
            }
        }
        catch (err) {
            if (err.status == 404) {
                setIsOnWatchList(false)
            }
            else if (err.status == 500) {
                setErr("Internal server error occured, please try again later.")
            }
        }
    }
    useEffect(() => {
        if (active && globalUser.isLoggedIn && collection)
            getOnWatchList()
    }, [globalUser, collection, active])
    const addToWatchList = async () => {
        if (globalUser.isLoggedIn) {
            try {
                apiCall.current = MARKET_API.request({
                    path: `/watchlist/add/`,
                    method: "post",
                    body: { collection_id: collection._id.$oid, user_id: globalUser.userId },
                });
                let response = await apiCall.current.promise;
                // console.log('collection watchlist??', response)
                if (!response.isSuccess)
                    throw response
                setIsOnWatchList(true)
            }
            catch (err) {
                // console.log(err)
                if (err.status == 404) {
                    setIsOnWatchList(false)
                }
                else if (err.status == 500) {
                    setErr("Internal server error occured, please try again later.")
                }
            }
        }

    }
    const removeFromWatchList = async () => {
        if (globalUser.isLoggedIn && watchListId && collection) {
            try {
                apiCall.current = MARKET_API.request({
                    path: `/watchlist/remove/`,
                    method: "post",
                    body: { watchlist_id: watchListId, collection_id: collection._id.$oid },
                });
                let response = await apiCall.current.promise;
                // console.log('remove watchlist??', response)
                if (!response.isSuccess)
                    throw response
                setIsOnWatchList(false)
            }
            catch (err) {
                // console.log(err)
                if (err.status == 404) {
                }
                else if (err.status == 500) {
                    setErr("Internal server error occured, please try again later.")
                }
            }
        }

    }
    //<-------------------------------------------------------

    function countColSales(nfts) {
        var salesLength = 0
        for (var i = 0; i < nfts.length; i++) {
            salesLength = salesLength + nfts[i].price_history.length
        }
        return salesLength
    }
    function countListings(nfts) {
        var listedLength = 0
        if (nfts.length > 0) {
            for (var i = 0; i < nfts.length; i++) {
                if (nfts[i].listings.length) {
                    listedLength++
                }
            }
        }
        return listedLength
    }

    var LOGO_IMAGE = collectionLogo.replace('root/dortzio/market/media/', '');
    return (
        <>
            {/*no mobile card */}
            <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'collection/' + collection.title + '/' + collection._id.$oid}>
                <Card className="my-2 d-none d-lg-flex">
                    <div style={{
                        display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                        // border: "1px solid blue",
                        width: "300px"
                    }}>
                        <div>{index}&nbsp;&nbsp;</div>
                        <ColLogoHolder style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${LOGO_IMAGE}`)) }} />
                        <div>&nbsp;&nbsp;{collectionName}&nbsp;</div>
                    </div>
                    <DetailHolder style={{ width: "150px" }}>
                        {collection.volume}&nbsp;<PriceUnit>ETH</PriceUnit>
                    </DetailHolder>
                    <DetailHolder style={{ width: "100px" }}>
                        {A > B ? <Typography sx={{ color: Colors.successDark }}>{relDiff(A, B)}%</Typography> : A < B ? <Typography sx={{ color: Colors.errorDark }}>{relDiff(A, B)}%</Typography> : <Typography sx={{ color: 'inherit' }}>{relDiff(A, B)}%</Typography>}
                    </DetailHolder>
                    <DetailHolder style={{ width: "150px" }}>
                        {collection.floor_price !== " " ? collection.floor_price : '0'}&nbsp;<PriceUnit>ETH</PriceUnit>
                    </DetailHolder>
                    <DetailHolder style={{ width: "100px" }}>
                        {countColSales(collection.nfts)}
                    </DetailHolder>
                    <DetailHolder style={{ width: "150px" }} className="flex-column align-items-start">
                        {collection.unique_owners ? <>{percentage(collection.unique_owners.length, collection.nft_owners_count)}%</> : '0%'}
                        <p className="m-0" style={{ fontSize: "10px" }}>{collection.nft_owners_count} owners</p>
                    </DetailHolder>
                    <DetailHolder style={{ width: "100px" }} className="flex-column align-items-start">
                        {percentage(countListings(collection.nfts), collection.nfts.length)}%
                        <p className="m-0" style={{ fontSize: "10px" }}>{countListings(collection.nfts)} of {collection.nfts.length}</p>
                    </DetailHolder>
                    {watchlistTab ? undefined :
                        <>
                            {isOnWatchList ? <Star1 onClick={removeFromWatchList} variant="Bold" size="20" /> : <Star1 style={{ cursor: "pointer" }} onClick={addToWatchList} size="20" />}
                        </>
                    }
                </Card>
            </Link>



            {/*mobile card */}
            <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'collection/' + collection.title + '/' + collection._id.$oid}>
                <Card className="my-2 d-flex d-lg-none">
                    <div style={{
                        display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                        // border: "1px solid blue",
                        // width: "60%"
                    }}>
                        <div>{index}&nbsp;&nbsp;</div>
                        <ColLogoHolder style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${LOGO_IMAGE}`)) }} />
                        <div className="d-none d-sm-flex">&nbsp;&nbsp;{collectionName}&nbsp;&nbsp;</div>
                        <div className="d-flex d-sm-none">&nbsp;&nbsp;{shorten(collectionName)}&nbsp;&nbsp;</div>
                    </div>
                    <DetailHolder className="justify-content-end">
                        {collection.volume}&nbsp;<PriceUnit>ETH</PriceUnit>
                    </DetailHolder>
                </Card>
            </Link>
        </>
    );
}

export default CollectionStatsCard;