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
    margin-top:120px;
    @media screen and (max-width: 992px) {
        margin-top:54px;
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
        return () => {
            if (apiCall.current != undefined)
                apiCall.current.cancel();

        }
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
            if (err.status == 404) {
                setCollections([])
            }
            else if (err.status == 500) {
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
                    <div style={{ marginBottom: "20px" }} className=" d-flex justify-content-between">
                        <div className="d-flex col-sx-11 col-sm-9 col-md-6 justify-content-start align-items-center">
                            <h4 className="d-none d-lg-flex" style={{ margin: 0, fontWeight: 500 }}>
                                Notable Collections
                            </h4>
                            <h5 className="d-none d-sm-flex d-lg-none" style={{ margin: 0, fontWeight: 500 }}>
                                Notable Collections
                            </h5>
                            <h6 className="d-flex d-sm-none" style={{ margin: 0, fontWeight: 500 }}>
                                Notable Collections
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

                    {collections.length == 0 ?
                        <Typography sx={{ color: `${Colors.primaryMain}`, textAlign: 'center' }}>No collection found.</Typography>
                        :
                        collections.length < 3 ?
                            <Scrollable className="d-flex overflow-hidden">
                                {collections.map((collection) => {
                                    return <CollectionCard key={collection._id.$oid} collection={collection} id={collection._id.$oid} slider={false} collectionBanner={collection.banner_image_path} collectionLogo={collection.logo_path} collectionCreator={collection.creator} collectionName={collection.title} royalty={collection.royalty} />
                                })}
                            </Scrollable>
                            :
                            <CustomSlider
                                theme={theme}
                            >
                                {collections.map((collection) => {
                                    return <CollectionCard key={collection._id.$oid} collection={collection} id={collection._id.$oid} slider={true} collectionBanner={collection.banner_image_path} collectionLogo={collection.logo_path} collectionCreator={collection.creator} collectionName={collection.title} royalty={collection.royalty} />
                                })}
                            </CustomSlider>
                    }
                </>
            }

        </SectionContainer>

    );
}

export default NotableCollections;