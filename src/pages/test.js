import { Box, CircularProgress, InputBase, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Slider from "react-slick"
import CollectionCard from "../components/Cards/CollectionCard"
import CustomSlider from "../components/CustomSlider"
import { ButtonDisabled } from "../components/design/Buttons"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar/Navbar"
import { TestColls } from "../utils/testCollections"
// import { getEthPriceNow } from 'get-eth-price'


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


    // getEthPriceNow()
    //     .then(data => {
    //         console.log(data);
    //     });




    const [usdPrice, setUsdPrice] = useState("");
    const [usdExRate, setUsdExRate] = useState();
    const [ethExRate, setEthExRate] = useState();
    const [ethPrice, setEthPrice] = useState("");

    const handlePriceETH = (event) => {
        let itemPrice = parseFloat(event.target.value);
        setEthPrice(itemPrice);
    };


    const GetUSDExchangeRate = async () => {
        var requestOptions = { method: "GET", redirect: "follow" };
        return fetch("https://api.coinbase.com/v2/exchange-rates?currency=ETH", requestOptions)
            .then((response) => response.json())
            .then((result) => { return (result.data.rates.USD) })
            .catch((error) => { return ("error", error) });
    }
    console.log(GetUSDExchangeRate())

    const handlePriceUSD = (event) => {
        let itemPrice = parseFloat(event.target.value);
        setUsdPrice(itemPrice);
    };


    useEffect(() => {
        GetUSDExchangeRate().then((res) => {
            setUsdExRate(parseFloat(res));
            console.log("usd", parseFloat(res));
        });
    }, []);



    return (
        <>
            <div className="pdng">
                <Navbar theme={theme} themeToggler={themeToggler} />
                {/* <div className="d-flex flex-column my-5">
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
                </div> */}

                <div>
                    <ButtonDisabled style={{ fontSize: "10px", padding: "4px 8px" }}>Beta</ButtonDisabled>
                </div>
                <div>
                    <InputBase onChange={handlePriceETH}
                    >
                    </InputBase>

                    {(ethPrice * usdExRate).toFixed(2)} USD

                </div>
            </div>
            <Footer />
        </>
    );
}

export default TestPage;