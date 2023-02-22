import { CircularProgress, Skeleton, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ItemCard from "../Cards/ItemCard";
import { TestColls } from "../../utils/testCollections";
import noItemBG from '../../assets/noItem.svg'
import styled from "styled-components";
import { Colors } from "../design/Colors";
import { MARKET_API } from "../../utils/data/market_api";
const NoItem = styled.div`
    background-image: url(${noItemBG});
    background-size:contain;
    background-repeat:no-repeat;
    background-position:center;
    border-radius:24px;
    background-color:${({ theme }) => theme.collectionCardHover};
    height:300px;
    width:300px;
`;
const BG = styled.div`
    border-radius:24px;
    background-color:${({ theme }) => theme.collectionCardHover};
    height:500px;
    width:100%;
`;
const Pp = styled.p`
color:${Colors.gray4};
text-transform: capitalize;
`

const FavoritedTab = ({ theme , userWallet}) => {
    const [view, setView] = useState('m')
    const handleViewChange = (v) => {
        setView(v)
    }

    // const [trendingColls, setTrendingColls] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [openFilter, setOpenFilter] = useState(false)
    // useEffect(() => {
    //     setTrendingColls(TestColls.collections)
    // }, [TestColls])
    // useEffect(() => {
    //     if (trendingColls) {
    //         console.log(trendingColls)
    //         setLoading(false)
    //     }
    // }, [trendingColls])


    const apiCall = useRef(undefined)
    const [items, setItems] = useState(undefined)
    const [err, setErr] = useState(undefined)
    useEffect(() => {
        fetchItems()
        // return () => {
        //     if (apiCall.current != undefined)
        //         apiCall.current.cancel();

        // }
    }, [])

    const fetchItems = async () => {
        try {
            apiCall.current = MARKET_API.request({
                path: `/nft/all/?from=0&to=10`,
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
        <div className="d-flex flex-wrap w-100 justify-content-between">
            {loading ?
                <>
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
                </>
                :
                <>
                    {items.length == 0 ?
                        <Typography sx={{ color: `${Colors.primaryMain}`, textAlign: 'center' }}>No item found.</Typography>
                        :
                        <>
                            {items.map((item) => {
                                return <ItemCard slider={false} view={view} itemImage={item.nft_image_path} itemID={item._id.$oid} theme={theme} name={item.title} price={item.price} creator={item.creator} />
                            })}
                        </>
                    }
                </>
            }
        </div>
    );
}

export default FavoritedTab;