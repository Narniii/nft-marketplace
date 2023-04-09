import { Skeleton, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { MARKET_API } from "../../utils/data/market_api";
import CollectionCard from "../Cards/CollectionCard";
import { Colors } from "../design/Colors";
import NoItemFound from "../NoItem";

const CategoryTabs = ({ category, tab }) => {
    const apiCall = useRef(undefined)
    const [collections, setCollections] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const [selectedCategory, setSelectedCategory] = useState(undefined)
    const [loading, setLoading] = useState(true)

    console.log(tab == category)
    useEffect(() => {
        if (tab == category)
            fetchByCategory(category)
        return () => {
            if (apiCall.current != undefined)
                apiCall.current.cancel();

        }
    }, [tab, category])

    const fetchByCategory = async (category) => {
        try {
            apiCall.current = MARKET_API.request({
                path: `/load/cat/`,
                method: "post",
                body: {
                    category: category,
                    from: 0,
                    to: 10
                },

            })
            const response = await apiCall.current.promise;
            if (!response.isSuccess)
                throw response
            setCollections(response.data)
        }
        catch (err) {
            console.log(err)
            if (err.status == 404) {
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
        <>
            <div className="row flex-wrap p-0">
                {loading ?
                    <>
                        <div className="col-6 col-sm-4 col-lg-3">
                            <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                        </div>
                        <div className="col-6 col-sm-4 col-lg-3">
                            <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                        </div>
                        <div className="d-none d-sm-block col-6 col-sm-4 col-lg-3">
                            <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                        </div>
                        <div className="d-none d-lg-block col-6 col-sm-4 col-lg-3">
                            <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                        </div>
                    </>
                    : <>
                        {collections.length == 0 ?
                            <NoItemFound text={'no collection found'} />
                            :
                            <>
                                {collections.map((collection) => {
                                    return <CollectionCard key={collection._id.$oid} collection={collection} explore={true} id={collection._id.$oid} slider={false} collectionBanner={collection.banner_image_path} collectionLogo={collection.logo_path} collectionCreator={collection.creator} collectionName={collection.title} royalty={collection.royalty} />
                                })}
                            </>
                        }
                    </>
                }
            </div>
        </>
    );
}

export default CategoryTabs;