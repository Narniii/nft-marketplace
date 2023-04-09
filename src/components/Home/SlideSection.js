import { ArrowDown2, ArrowRight2 } from "iconsax-react";
import styled from "styled-components";
import ItemCard from "../Cards/ItemCard";
import { TestColls } from "../../utils/testCollections";
import { useEffect, useState, useRef } from "react";
import { CircularProgress, Skeleton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import '../../styles.css'
import CustomSlider from "../CustomSlider";
import { Colors } from "../design/Colors";
import { MARKET_API } from "../../utils/data/market_api";

const SectionContainer = styled.div`
    // height:50vh;
    // border:1px solid white;
    // padding: 0 32px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    margin-top:50px;
    @media screen and (max-width: 992px) {
        margin-top:80px;
    }
    @media screen and (max-width: 575px) {
        margin-top:50px;
    }
    
`;

const Scrollable = styled.div`
&::-webkit-scrollbar {
    display:none;
}
&::-webkit-scrollbar-thumb {
    display:none;
}
&::-webkit-scrollbar-button{
    display:none;
`;



const SlideSection = ({ theme, themeToggler }) => {
    const [trendingColls, setTrendingColls] = useState(undefined)
    const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     setTrendingColls(TestColls.collections)
    // }, [TestColls])
    // useEffect(() => {
    //     if (trendingColls) {
    //         // console.log(trendingColls)
    //         setLoading(false)
    //     }
    // }, [trendingColls])


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
            if (err.status == 404) {
                setItems([])
            }
            else if (err.status == 500) {
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
        <SectionContainer className="pdng">
            <div style={{ marginBottom: "20px" }} className=" d-flex justify-content-between">
                <div className="d-flex col-sx-11 col-sm-9 col-md-6 justify-content-start align-items-center">
                    <h4 className="d-none d-lg-flex" style={{ margin: 0, fontWeight: 500 }}>
                        NEW
                    </h4>
                    <h5 className="d-none d-sm-flex d-lg-none" style={{ margin: 0, fontWeight: 500 }}>
                        NEW
                    </h5>
                    <h6 className="d-flex d-sm-none" style={{ margin: 0, fontWeight: 500 }}>
                        NEW
                    </h6>
                </div>
                <Link to='/explore' style={{ textDecoration: "none", color: "inherit", fontSize: "14px" }} className="d-flex d-none d-sm-flex col-sm-3 col-md-6 justify-content-end align-items-center">
                    Show more
                    <div style={{ width: "auto", padding: "0" }}><ArrowRight2 size="20" /></div>
                </Link>
                <Link to='/explore' style={{ textDecoration: "none", color: "inherit" }} className="d-flex d-sm-none col-1 justify-content-end align-items-center" >
                    <div style={{ width: "auto", padding: "0" }}><ArrowRight2 size="20" /></div>
                </Link>
            </div>
            {loading ?
                <div className="d-flex w-100 justify-content-between">
                    <div className="col-12 col-sm-6 col-lg-3 p-1">
                        <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                    </div>
                    <div className="d-none d-sm-block col-12 col-sm-6 col-lg-3 p-1">
                        <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                    </div>
                    <div className="d-none d-lg-block col-12 col-sm-6 col-lg-3 p-1">
                        <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                    </div>
                    <div className="d-none d-lg-block col-12 col-sm-6 col-lg-3 p-1">
                        <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                    </div>
                </div>
                :
                <>
                    {items.length == 0 ?
                        <Typography sx={{ color: `${Colors.primaryMain}`, textAlign: 'center' }}>No items found.</Typography>
                        :
                        items.length < 4 ?
                            // <CustomSlider
                            //     theme={theme}
                            //     slidesCount={items.length}>
                            <Scrollable className="row overflow-auto">
                                {items.map((item) => {
                                    return <ItemCard item={item} slider={false} view={'l'} itemImage={item.nft_image_path} itemID={item._id.$oid} theme={theme} name={item.title} price={item.price} creator={item.collection_creator_username} creatorImg={item.collection_creator_avatar} />
                                })}
                            </Scrollable>
                            // </CustomSlider>
                            :
                            <CustomSlider
                                theme={theme}
                                slidesCount={4}
                            >
                                {items.map((item) => {
                                    return <ItemCard item={item} slider={true} view={'m'} itemImage={item.nft_image_path} itemID={item._id.$oid} theme={theme} name={item.title} price={item.price} creator={item.collection_creator_username} creatorImg={item.collection_creator_avatar} />
                                })}
                            </CustomSlider>
                    }
                </>
            }

        </SectionContainer>
    );
}

export default SlideSection;