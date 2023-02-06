import { ArrowRight2 } from "iconsax-react";
import styled from "styled-components";
import CollectionCard from "../Cards/CollectionCard";
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

const NotableCollections = ({ theme }) => {
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
            {loading ?
                <div className="row justify-content-center align-content-center align-items-center">
                    <CircularProgress />
                </div>
                :
                <SectionContainer>
                    <div className="row p-2 justify-content-between">
                        <div className="row col-sx-11 col-sm-9 col-md-6 justify-content-start align-items-center">
                            <h3 style={{ margin: 0, fontWeight: "600" }}>
                                Notable Collections
                            </h3>
                        </div>
                        <Link to='/explore' style={{ textDecoration: "none", color: "inherit" }} className="row d-none d-sm-flex col-sm-3 col-md-6 justify-content-end align-items-center">
                            Show more
                            <div style={{ width: "auto", padding: "0" }}><ArrowRight2 /></div>
                        </Link>
                        <Link to='/explore' style={{ textDecoration: "none", color: "inherit" }} className="row d-sx-flex d-sm-none col-1 justify-content-end align-items-center" >
                            <div style={{ width: "auto", padding: "0" }}><ArrowRight2 /></div>
                        </Link>
                    </div>
                    <div className="d-none d-md-flex row justify-content-between">
                        {trendingColls.slice(0, 3).map((collection) => { return (<CollectionCard theme={theme} collectionName={collection.collection_name} royalty={collection.royalty} collectionCreator={collection.creator} />) })}
                    </div>
                    <div className="d-none d-sm-flex d-md-none row justify-content-between">
                        {trendingColls.slice(0, 2).map((collection) => { return (<CollectionCard theme={theme} collectionName={collection.collection_name} royalty={collection.royalty} collectionCreator={collection.creator} />) })}
                    </div>
                    <div className="d-flex d-sm-none row justify-content-between">
                        {trendingColls.slice(0, 1).map((collection) => { return (<CollectionCard theme={theme} collectionName={collection.collection_name} royalty={collection.royalty} collectionCreator={collection.creator} />) })}
                    </div>
                </SectionContainer>
            }</>

    );
}

export default NotableCollections;