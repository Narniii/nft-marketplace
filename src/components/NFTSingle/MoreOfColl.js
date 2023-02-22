import { CircularProgress, Skeleton, Typography } from "@mui/material";
import { ArrowDown2, ArrowRight2 } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MARKET_API } from "../../utils/data/market_api";
import { TestColls } from "../../utils/testCollections";
import ItemCard from "../Cards/ItemCard";
import { Colors } from "../design/Colors";
const Scrollable = styled.div`
    padding:20px 0;
    overflow-x:scroll;
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

const MoreOfColl = ({ theme , collectionId}) => {
    const [trendingColls, setTrendingColls] = useState(undefined)
    const [loading, setLoading] = useState(true)

    const apiCall = useRef(undefined)
    const [items, setItems] = useState(undefined)
    const [err, setErr] = useState(undefined)
    useEffect(() => {
        fetchItems()
        return () => {
            if (apiCall.current != undefined)
                apiCall.current.cancel();

        }
    }, [])

    const fetchItems = async () => {
        try {
            apiCall.current = MARKET_API.request({
                path: `/nft/all/?from=0&to=6`,
                method: "get",
            })
            const response = await apiCall.current.promise;
            if (!response.isSuccess)
                throw response
            setItems(response.data)
            console.log(response)
            // setLoading(false)
        }
        catch (err) {
            console.log(err)
            if (err.data.message == "No NFT Found") {
                setItems([])
            }
            else {
                setErr("Internal server error")
            }
            // setLoading(false)
        }
    }
    useEffect(() => {
        if (items)
            setLoading(false)
    }, [items])

    return (
        <div className="d-flex flex-column my-4 w-100">
            <div className="d-flex w-100 justify-content-between">
                <div className="row col-sx-11 col-sm-9 col-md-6 justify-content-start align-items-center">
                    <h3 style={{ margin: 0, fontWeight: "600", fontSize: "20px" }}>
                        more from this collection
                    </h3>
                </div>
                <div className="row d-none d-sm-flex col-sm-3 col-md-6 justify-content-end align-items-center" style={{ cursor: "pointer" }}>
                    Show more
                    <div style={{ width: "auto", padding: "0" }}><ArrowRight2 /></div>
                </div>
                <div className="row d-sx-flex d-sm-none col-1 justify-content-end align-items-center" style={{ cursor: "pointer" }}>
                    <div style={{ width: "auto", padding: "0" }}><ArrowRight2 /></div>
                </div>
            </div>
            {loading ?
                <div className="d-flex w-100 justify-content-between">
                    <div className="d-flex flex-wrap my-3">
                        <div className="col-12 col-sm-6 col-md-3 p-1">
                            <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                        </div>
                        <div className="d-none d-sm-block col-12 col-sm-6 col-md-3 p-1">
                            <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                        </div>
                        <div className="d-none d-md-block col-12 col-sm-6 col-md-3 p-1">
                            <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                        </div>
                        <div className="d-none d-md-block col-12 col-sm-6 col-md-3 p-1">
                            <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                        </div>
                    </div>
                </div>
                :
                <Scrollable className="d-flex w-100 justify-content-between">
                    {items.length == 0 ?
                        <Typography sx={{ color: `${Colors.primaryMain}`, textAlign: 'center' }}>No item found.</Typography>
                        :
                        <>
                            {items.map((item) => {
                                return <ItemCard slider={false} view={'m'} itemImage={item.nft_image_path} itemID={item._id.$oid} theme={theme} name={item.title} price={item.price} creator={item.creator} />
                            })}
                        </>
                    }
                </Scrollable>
            }
        </div>
    );
}

export default MoreOfColl;