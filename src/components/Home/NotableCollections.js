import { ArrowRight2 } from "iconsax-react";
import styled from "styled-components";
import CollectionCard from "../Cards/CollectionCard";
import ItemCard from "../Cards/ItemCard";
import { TestColls } from "../../utils/testCollections";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

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
                        <div className="row d-none d-sm-flex col-sm-3 col-md-6 justify-content-end align-items-center" style={{ cursor: "pointer" }}>
                            Show more
                            <div style={{ width: "auto", padding: "0" }}><ArrowRight2 /></div>
                        </div>
                        <div className="row d-sx-flex d-sm-none col-1 justify-content-end align-items-center" style={{ cursor: "pointer" }}>
                            <div style={{ width: "auto", padding: "0" }}><ArrowRight2 /></div>
                        </div>
                    </div>
                    <div className="d-none d-md-flex row justify-content-between">
                        <CollectionCard theme={theme} collectionName={trendingColls[0].collection_name} royalty={trendingColls[0].royalty} collectionCreator={trendingColls[0].creator} />
                        <CollectionCard theme={theme} collectionName={trendingColls[1].collection_name} royalty={trendingColls[1].royalty} collectionCreator={trendingColls[1].creator} />
                        <CollectionCard theme={theme} collectionName={trendingColls[2].collection_name} royalty={trendingColls[2].royalty} collectionCreator={trendingColls[2].creator} />
                    </div>
                    <div className="d-none d-sm-flex d-md-none row justify-content-between">
                        <CollectionCard theme={theme} collectionName={trendingColls[0].collection_name} royalty={trendingColls[0].royalty} collectionCreator={trendingColls[0].creator} />
                        <CollectionCard theme={theme} collectionName={trendingColls[1].collection_name} royalty={trendingColls[1].royalty} collectionCreator={trendingColls[1].creator} />
                    </div>
                    <div className="d-flex d-sm-none row justify-content-between">
                        <CollectionCard theme={theme} collectionName={trendingColls[0].collection_name} royalty={trendingColls[0].royalty} collectionCreator={trendingColls[0].creator} />
                    </div>
                </SectionContainer>
            }</>

    );
}

export default NotableCollections;