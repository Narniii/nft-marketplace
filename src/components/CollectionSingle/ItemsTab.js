import { ArrowDown2, ArrowSwapVertical, FilterSearch, Grid1, Grid2, Grid5, HambergerMenu, Refresh2 } from "iconsax-react";
import styled from "styled-components";
import SearchBox from "../Navbar/SearchBox";
import { TestColls } from "../../utils/testCollections";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import ItemCard from "../Cards/ItemCard";

const Selection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor:pointer;
    background: transparent;
    justify-content:space-between;
    border: 1px solid #D9D9D9;
    border-radius: 24px;
    overflow:hidden;
    height:100%;
`;

const IconContainer = styled.div`
    border-left: 1px solid #D9D9D9;
    height:100%;
    padding:4px 0 5px;
    &:hover{
        background-color:#d9d9d9;
    }
`;

const Updated = styled.div`
color: ${({ theme }) => theme.trendingSectionSubTitles};
display:flex;

`
const ItemsTab = ({ theme }) => {
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
        <div className="d-flex flex-column p-0 justify-content-between align-items-center">
            {/* top section */}
            <div className="row w-100 p-0 justify-content-between"
            >
                <div className="col-8 col-sm-4 col-md-5"><SearchBox /></div>
                <div className="d-none d-sm-block col-4 col-md-3">
                    <Selection className="row p-2" >
                        price low to high
                        <div style={{ width: "auto", padding: "4px 0 5px" }}><ArrowDown2 /></div>
                    </Selection>
                </div>
                <div className="d-none d-sm-block col-3">
                    <Selection className="row ">
                        <IconContainer className="col-3 text-center d-flex justify-content-center align-items-center" ><HambergerMenu /></IconContainer>
                        <IconContainer className="col-3 text-center d-flex justify-content-center align-items-center" ><Grid1 /></IconContainer>
                        <IconContainer className="col-3 text-center d-flex justify-content-center align-items-center" ><Grid2 /></IconContainer>
                        <IconContainer className="col-3 text-center d-flex justify-content-center align-items-center" ><Grid5 /></IconContainer>
                    </Selection>
                </div>
                <div className="d-block d-sm-none col-2 col-sm-1">
                    <Selection className="row p-2 d-flex justify-content-center">
                        <div style={{ width: "auto", padding: "4px 0 5px" }}><ArrowSwapVertical /></div>
                    </Selection>
                </div>
                <div className="col-2 col-sm-1">
                    <Selection className="row p-2 d-flex justify-content-center">
                        <div style={{ width: "auto", padding: "4px 0 5px" }}><FilterSearch /></div>
                    </Selection>
                </div>


            </div>


            {/* items section */}
            {/*outer div for when status modal is opened */}
            <div className="d-flex  w-100 justify-content-between">
                <div className="d-flex  w-100 flex-column p-0 justify-content-between">
                    {loading ? <CircularProgress /> :
                        <>
                            <div className="d-flex w-100 mt-3 p-0 justify-content-between">
                                <Updated><Refresh2 size="20" />&nbsp;Updated 20m ago</Updated>
                                <div>22 items</div>
                            </div>
                            <div className="row justify-content-between">
                                <ItemCard theme={theme} name={trendingColls[0].collection_name} price={trendingColls[0].floor_price} creator={trendingColls[0].creator} />
                                <ItemCard theme={theme} name={trendingColls[1].collection_name} price={trendingColls[1].floor_price} creator={trendingColls[1].creator} />
                                <ItemCard theme={theme} name={trendingColls[2].collection_name} price={trendingColls[2].floor_price} creator={trendingColls[2].creator} />
                                <ItemCard theme={theme} name={trendingColls[3].collection_name} price={trendingColls[3].floor_price} creator={trendingColls[3].creator} />
                                <ItemCard theme={theme} name={trendingColls[0].collection_name} price={trendingColls[0].floor_price} creator={trendingColls[0].creator} />
                                <ItemCard theme={theme} name={trendingColls[1].collection_name} price={trendingColls[1].floor_price} creator={trendingColls[1].creator} />
                                <ItemCard theme={theme} name={trendingColls[2].collection_name} price={trendingColls[2].floor_price} creator={trendingColls[2].creator} />
                                <ItemCard theme={theme} name={trendingColls[3].collection_name} price={trendingColls[3].floor_price} creator={trendingColls[3].creator} />
                                <ItemCard theme={theme} name={trendingColls[0].collection_name} price={trendingColls[0].floor_price} creator={trendingColls[0].creator} />
                                <ItemCard theme={theme} name={trendingColls[1].collection_name} price={trendingColls[1].floor_price} creator={trendingColls[1].creator} />
                                <ItemCard theme={theme} name={trendingColls[2].collection_name} price={trendingColls[2].floor_price} creator={trendingColls[2].creator} />
                                <ItemCard theme={theme} name={trendingColls[3].collection_name} price={trendingColls[3].floor_price} creator={trendingColls[3].creator} />
                            </div>
                        </>}
                </div>


                <div className="d-none">
                    {/* status modal */}
                </div>
            </div>
        </div>
    );
}

export default ItemsTab;