import { Box, CircularProgress, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Slider from "react-slick"
import CollectionCard from "../components/Cards/CollectionCard"
import CustomSlider from "../components/CustomSlider"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar/Navbar"
import { TestColls } from "../utils/testCollections"


const TestPage = ({ theme, themeToggler }) => {
    const [collections, setCollections] = useState(undefined)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setCollections(TestColls.collections)
    }, [TestColls])
    useEffect(() => {
        if (collections) {
            console.log(collections)
            setLoading(false)
        }
    }, [collections])
    var settings = {
        dots: true
    };

    return (
        <>
            <div className="pdng">
                <Navbar theme={theme} themeToggler={themeToggler} />
                <div className="d-flex flex-column my-5">
                    {loading ? <CircularProgress /> :
                        <>
                            {collections.length == 0 ?
                                <Typography sx={{ color: 'red', textAlign: 'center' }}>No collection found.</Typography>
                                :
                                collections.length < 3 ?
                                    <CustomSlider
                                        theme={theme}
                                        slidesCount={collections.length}>
                                        {collections.map((collection) => {
                                            return <CollectionCard slider={true} collectionCreator={collection.creator} collectionName={collection.collection_name} royalty={collection.royalty} />
                                        })}
                                    </CustomSlider>
                                    :
                                    <CustomSlider
                                        theme={theme}
                                    >
                                        {collections.map((collection) => {
                                            // return <div className="d-flex" key={collection.collection_id}>
                                            //     <Link className="d-flex w-100" to={`/collection/${collection.collection_id}`} style={{ textDecoration: "none", color: "whitesmoke" }}>
                                            return <CollectionCard slider={true} collectionCreator={collection.creator} collectionName={collection.collection_name} royalty={collection.royalty} />
                                            //     </Link>
                                            // </div>
                                        })}
                                    </CustomSlider>
                            }

                        </>
                    }
                </div>
            </div>
            <Footer />
        </>
    );
}

export default TestPage;