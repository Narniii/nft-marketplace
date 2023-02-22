import { ArrowRight2 } from "iconsax-react";
import styled from "styled-components";
import CollectionCard from "../Cards/CollectionCard";
import ItemCard from "../Cards/ItemCard";
import { TestColls } from "../../utils/testCollections";
import { useEffect, useRef, useState } from "react";
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

const NotableCollections = ({ theme }) => {
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
    const [collections, setCollections] = useState(undefined)
    const [err, setErr] = useState(undefined)
    useEffect(() => {
        fetchCollections()
        // return () => {
        //     if (apiCall.current != undefined)
        //         apiCall.current.cancel();

        // }
    }, [])

    const fetchCollections = async () => {
        try {
            apiCall.current = MARKET_API.request({
                path: `/collection/all/?from=0&to=10`,
                method: "get",
            })
            const response = await apiCall.current.promise;
            if (!response.isSuccess)
                throw response
            setCollections(response.data)
            // setLoading(false)
        }
        catch (err) {
            console.log(err)
            if (err.message == "No NFT Collection Found") {
                setCollections([])
            }
            else {
                setErr("Internal server error")
            }
            // setLoading(false)
        }
    }
    useEffect(() => {
        if (collections)
            setLoading(false)
    }, [collections])


    return (
        <SectionContainer className="pdng">
            {loading ?
                <div className="d-flex w-100 justify-content-between">
                    <div className="col-12 col-sm-6 col-md-4 p-1">
                        <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                    </div>
                    <div className="d-none d-sm-block col-12 col-sm-6 col-md-4 p-1">
                        <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                    </div>
                    <div className="d-none d-md-block col-12 col-sm-6 col-md-4 p-1">
                        <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                    </div>
                </div> :
                <>
                    <div className="d-flex p-2 justify-content-between">
                        <div className="d-flex col-sx-11 col-sm-9 col-md-6 justify-content-start align-items-center">
                            <h3 style={{ margin: 0, fontWeight: "600" }}>
                                Notable Collections
                            </h3>
                        </div>
                        <Link to='/explore' style={{ textDecoration: "none", color: "inherit" }} className="d-flex d-none d-sm-flex col-sm-3 col-md-6 justify-content-end align-items-center">
                            Show more
                            <div style={{ width: "auto", padding: "0" }}><ArrowRight2 /></div>
                        </Link>
                        <Link to='/explore' style={{ textDecoration: "none", color: "inherit" }} className="d-flex d-sm-none col-1 justify-content-end align-items-center" >
                            <div style={{ width: "auto", padding: "0" }}><ArrowRight2 /></div>
                        </Link>
                    </div>

                    {collections.length == 0 ?
                        <Typography sx={{ color: `${Colors.primaryMain}`, textAlign: 'center' }}>No collection found.</Typography>
                        :
                        // <>
                        //     <CustomSlider>
                        //         {collections.map((collection) => {
                        //             return <CollectionCard id={collection._id.$oid} slider={true} collectionBanner={collection.banner_image_path} collectionLogo={collection.logo_path} collectionCreator={collection.creator} collectionName={collection.title} royalty={collection.royalty} />
                        //         })}
                        //     </CustomSlider>
                        // </>

                        collections.length < 3 ?
                            // <CustomSlider
                            //     theme={theme}
                            //     slidesCountTablet={1}
                            //     slidesCount={collections.length}
                            // >
                            <div className="d-flex flex-wrap">
                                {collections.map((collection) => {
                                    return <CollectionCard id={collection._id.$oid} slider={false} collectionBanner={collection.banner_image_path} collectionLogo={collection.logo_path} collectionCreator={collection.creator} collectionName={collection.title} royalty={collection.royalty} />
                                })}
                            </div>
                            // </CustomSlider>
                            :
                            <CustomSlider
                                theme={theme}
                            >
                                {collections.map((collection) => {
                                    // return <div className="d-flex" key={collection.collection_id}>
                                    //     <Link className="d-flex w-100" to={`/collection/${collection.collection_id}`} style={{ textDecoration: "none", color: "whitesmoke" }}>
                                    return <CollectionCard id={collection._id.$oid} slider={true} collectionBanner={collection.banner_image_path} collectionLogo={collection.logo_path} collectionCreator={collection.creator} collectionName={collection.title} royalty={collection.royalty} />
                                    //     </Link>
                                    // </div>
                                })}
                            </CustomSlider>
                    }
                </>
            }

        </SectionContainer>

    );
}

export default NotableCollections;