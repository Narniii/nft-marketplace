import { ArrowRight2 } from "iconsax-react";
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
    margin:50px auto;

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
            if (err.message == "No NFT Found") {
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
        <SectionContainer className="pdng mb-5">
            <div className="d-flex p-2 justify-content-between">
                <div className="d-flex col-6 justify-content-start">NEW</div>
                <Link to='/explore' style={{ textDecoration: "none", color: "inherit" }} className="d-flex col-6 justify-content-end">
                    Show more
                    <div style={{ width: "auto", padding: "0" }}><ArrowRight2 /></div>
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
                            <div className="d-flex flex-wrap">
                                {items.map((item) => {
                                    return <ItemCard slider={false} view={'m'} itemImage={item.nft_image_path} itemID={item._id.$oid} theme={theme} name={item.title} price={item.price} creator={item.creator} />
                                })}
                            </div>
                            // </CustomSlider>
                            :
                            <CustomSlider
                                theme={theme}
                                slidesCount={4}
                            >
                                {items.map((item) => {
                                    return <ItemCard slider={true} view={'m'} itemImage={item.nft_image_path} itemID={item._id.$oid} theme={theme} name={item.title} price={item.price} creator={item.creator} />
                                })}
                            </CustomSlider>
                    }
                </>
            }

        </SectionContainer>
    );
}

export default SlideSection;