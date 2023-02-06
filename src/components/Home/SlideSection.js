import { ArrowRight2 } from "iconsax-react";
import styled from "styled-components";
import ItemCard from "../Cards/ItemCard";
import { TestColls } from "../../utils/testCollections";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

const SectionContainer = styled.div`
    // height:50vh;
    // border:1px solid white;
    padding: 0 32px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    margin:50px auto;

`;



const SlideSection = ({ theme, themeToggler }) => {
    const [trendingColls, setTrendingColls] = useState(undefined)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTrendingColls(TestColls.collections)
    }, [TestColls])
    useEffect(() => {
        if (trendingColls) {
            console.log(trendingColls)
            setLoading(false)
        }
    }, [trendingColls])

    return (
        <>
            {
                loading ?
                    <div className="row justify-content-center align-content-center align-items-center">
                        < CircularProgress />
                    </div >
                    :

                    <SectionContainer>
                        <div className="row p-2 justify-content-between">
                            <div className="row col-6 justify-content-start">NEW</div>
                            <Link to='/explore' style={{ textDecoration: "none", color: "inherit" }} className="row col-6 justify-content-end">
                                Show more
                                <div style={{ width: "auto", padding: "0" }}><ArrowRight2 /></div>
                            </Link>
                        </div>
                        <div className="row justify-content-between">
                            <ItemCard view={'l'} theme={theme} name={trendingColls[0].collection_name} price={trendingColls[0].floor_price} creator={trendingColls[0].creator}/>
                            <ItemCard view={'l'} theme={theme} name={trendingColls[1].collection_name} price={trendingColls[1].floor_price} creator={trendingColls[1].creator}/>
                            <ItemCard view={'l'} theme={theme} name={trendingColls[2].collection_name} price={trendingColls[2].floor_price} creator={trendingColls[2].creator}/>
                            <ItemCard view={'l'} theme={theme} name={trendingColls[3].collection_name} price={trendingColls[3].floor_price} creator={trendingColls[3].creator}/>
                        </div>
                    </SectionContainer>
            }</>
    );
}

export default SlideSection;