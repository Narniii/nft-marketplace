import { Skeleton, Typography } from "@mui/material";
import { Grid1, Grid2, Grid5, HambergerMenu } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MARKET_API } from "../../utils/data/market_api";
import ItemCard from "../Cards/ItemCard";
import { Colors } from "../design/Colors";

const Selection = styled.div`
display: flex;
flex-direction: row;
align-items: center;
cursor:pointer;
background: transparent;
justify-content:space-between;
border: 1px solid #D9D9D9;
border-radius: 24px;
overflow:hidden;
height:100%;
`;

const IconContainer = styled.div`
border-left: 1px solid #D9D9D9;
height:100%;
padding:18px;
&:hover{
    background-color: ${({ theme }) => theme.hoverIcon};
}
`;
const FeaturedItems = ({theme}) => {
    const [view, setView] = useState('m')
    const handleViewChange = (v) => {
        setView(v)
    }

    const apiCall = useRef(undefined)
    const [items, setItems] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const [loading, setLoading] = useState(true)
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
                path: `/nft/all/?from=0&to=4`,
                method: "get",
            })
            const response = await apiCall.current.promise;
            if (!response.isSuccess)
                throw response
            setItems(response.data)
            console.log('reeeeee',response)
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
        <>
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 style={{ fontWeight: "bold" }}>Beans</h5>
                    <Selection className="d-flex">
                        <IconContainer className="text-center d-flex justify-content-center align-items-center" onClick={() => handleViewChange('xs')}><HambergerMenu size="20" /></IconContainer>
                        <IconContainer className="text-center d-flex justify-content-center align-items-center" onClick={() => handleViewChange('s')}><Grid1 size="20" /></IconContainer>
                        <IconContainer className="text-center d-flex justify-content-center align-items-center" onClick={() => handleViewChange('m')}><Grid2 size="20" /></IconContainer>
                        <IconContainer className="text-center d-flex justify-content-center align-items-center" onClick={() => handleViewChange('l')}><Grid5 size="20" /></IconContainer>
                    </Selection>
                </div>
                <div className="d-flex flex-wrap mt-2">
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

            </div>
        </>
    );
}

export default FeaturedItems;