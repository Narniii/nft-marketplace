import styled from "styled-components";
import CollectionCard from "../Cards/CollectionListingCard";
import { TestColls } from "../../utils/testCollections";
import { useEffect, useState } from "react";
import { CircularProgress, FormControl, FormHelperText, Menu, MenuItem, Select } from "@mui/material";
import { Colors } from "../design/Colors";
import { ArrowDown2 } from "iconsax-react";
import '../../styles.css'
import { Tab, Tabs } from "react-bootstrap";
const SectionContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    margin:50px auto;
    padding:0 32px;
    height:80vh;
`;
const TitlesContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.trendingSectionSubTitles};
    @media screen and (max-width: 600px) {
        padding-right:0;
    }
`;
const Selection = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    // gap: 24px;
    width: 160px;
    // height: 50px;
    cursor:pointer;
    background: transparent;
    justify-content:space-between;
    border: 1px solid #D9D9D9;
    border-radius: 24px;
    flex: none;
    order: 1;
    flex-grow: 0;
`;
const Title = styled.div`
    color: ${({ theme }) => theme.trendingSectionTitles};
    cursor:pointer;
    &:active{
        color: ${({ theme }) => theme.trendingSectionTitlesActive};
        // text-decoration:underline;
    }
`;
const conditionalStyles = {
    titles: {
        color: 'theme' == 'light' ? Colors.gray7 : Colors.gray1
    }
};
// const useStyles = makeStyles({
//     select: {
//         border: '1px solid #D9D9D9',
//         borderRadius: '24px !important',

//         "& ul": {
//             borderRadius: '24px !important',
//         },
//         "& li": {
//         },
//     },
// });


const TrendingSection = ({ theme }) => {
    const [trendingColls, setTrendingColls] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState('trending');
    // const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
            {console.log(theme)}
            {loading ?
                <div className="row justify-content-center align-content-center align-items-center">
                    <CircularProgress />
                </div>
                :
                <SectionContainer
                // style={{ border: "solid 1px white" }}
                >
                    <div className="row p-2 justify-content-between align-items-center"
                    // style={{ border: "solid 1px white" }}
                    >
                        <div className="row col-12 col-sm-6 justify-content-start "
                        // style={{ color: {theme=='light'?Colors.gray7:Colors.gray1} }}
                        >
                            <Tabs
                                defaultActiveKey="Trending"
                                // id="justify-tab-example"
                                // justify
                                className="m-0"
                                style={{ borderBottom: "none", color: theme === 'light' ? "#5D3393" : "#DABDDF", borderColor: theme === 'light' ? "#5D3393" : "#DABDDF" }}

                            >
                                <Tab eventKey="Trending" title="Trending">
                                </Tab>
                                <Tab eventKey="Top" title="Top">
                                </Tab>
                            </Tabs>


                        </div>
                        <div className="row d-none d-sm-flex col-sm-6 justify-content-end">
                            <FormControl sx={{ width: '160px', bgcolor: theme == 'light' ? "#ffffff" : "#272448", borderRadius: "24px", overflow: "hidden", border: "1px solid #d9d9d9" }}>
                                <Select
                                    value={10}
                                    BackdropProps={{ invisible: true }}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{ MenuProps: { disableScrollLock: true } }}
                                    // MenuProps={{ classes: { paper: classes.select } }}
                                    sx={{ bgcolor: theme == 'light' ? "#ffffff" : "#272448", color: theme == 'light' ? "#808080" : "#B3B3B3" }}
                                >
                                    <MenuItem
                                        sx={{ bgcolor: theme == 'light' ? "#ffffff" : "#272448" }}
                                        value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem sx={{ bgcolor: theme == 'light' ? "#ffffff" : "#272448" }} value={10}>24h</MenuItem>
                                    <MenuItem sx={{ bgcolor: theme == 'light' ? "#ffffff" : "#272448" }} value={20}>12h</MenuItem>
                                    <MenuItem sx={{ bgcolor: theme == 'light' ? "#ffffff" : "#272448" }} value={30}>6h</MenuItem>
                                </Select>
                            </FormControl>

                            {/* <Selection>
                                24Hours
                                <div style={{ width: "auto", padding: "0" }}><ArrowDown2 /></div>
                            </Selection> */}
                        </div>
                    </div>
                    <div className="row justify-content-around"
                    // style={{ border: "solid 1px white" }}
                    >
                        <div className="row p-0 col-sm-12 col-md-6 justify-content-center"
                        // style={{ border: "solid 1px red" }}
                        >
                            <TitlesContainer>
                                <div style={{
                                    display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                                    // border: "1px solid blue",
                                    width: "50%"
                                }}>
                                    Collection</div>
                                <div className="d-flex d-sm-none" style={{
                                    display: "flex", flexDirection: "row", justifyContent: "end", alignItems: "center",
                                    // border: "1px solid blue",
                                    width: "50%"
                                }}>
                                    <Selection>
                                        24Hours
                                        <div style={{ width: "auto", padding: "0" }}><ArrowDown2 /></div>
                                    </Selection>
                                </div>
                                <div className="d-none d-sm-flex" style={{
                                    display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                                    // border: "1px solid blue",
                                    width: "25%"
                                }}>
                                    Floor Price</div>
                                <div className="d-none d-sm-flex" style={{
                                    display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",
                                    // border: "1px solid blue",
                                    width: "25%"
                                }}>
                                    Volume</div>
                            </TitlesContainer>
                            <CollectionCard theme={theme} index={1} collectionFloor={trendingColls[0].floor_price} collectionName={trendingColls[0].collection_name} collectionVolume={trendingColls[0].volume} collectionLogo={trendingColls[0].logo} />
                            <CollectionCard theme={theme} index={2} collectionFloor={trendingColls[1].floor_price} collectionName={trendingColls[1].collection_name} collectionVolume={trendingColls[1].volume} collectionLogo={trendingColls[1].logo} />
                            <CollectionCard theme={theme} index={3} collectionFloor={trendingColls[2].floor_price} collectionName={trendingColls[2].collection_name} collectionVolume={trendingColls[2].volume} collectionLogo={trendingColls[2].logo} />
                            <CollectionCard theme={theme} index={4} collectionFloor={trendingColls[3].floor_price} collectionName={trendingColls[3].collection_name} collectionVolume={trendingColls[3].volume} collectionLogo={trendingColls[3].logo} />
                            <CollectionCard theme={theme} index={5} collectionFloor={trendingColls[4].floor_price} collectionName={trendingColls[4].collection_name} collectionVolume={trendingColls[4].volume} collectionLogo={trendingColls[4].logo} />
                        </div>
                        <div className="d-none d-md-flex row p-0 col-sm-12 col-md-6 justify-content-center"
                        // style={{ border: "solid 1px red" }}
                        >
                            <TitlesContainer>
                                <div style={{
                                    display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                                    // border: "1px solid blue",
                                    width: "50%"
                                }}>
                                    Collection</div>
                                <div className="d-none d-sm-flex" style={{
                                    display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                                    // border: "1px solid blue",
                                    width: "25%"
                                }}>
                                    Floor Price</div>
                                <div className="d-none d-sm-flex" style={{
                                    display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",
                                    // border: "1px solid blue",
                                    width: "25%"
                                }}>
                                    Volume</div>
                            </TitlesContainer>
                            <CollectionCard theme={theme} index={5} collectionFloor={trendingColls[5].floor_price} collectionName={trendingColls[5].collection_name} collectionVolume={trendingColls[5].volume} collectionLogo={trendingColls[5].logo} />
                            <CollectionCard theme={theme} index={6} collectionFloor={trendingColls[6].floor_price} collectionName={trendingColls[6].collection_name} collectionVolume={trendingColls[6].volume} collectionLogo={trendingColls[6].logo} />
                            <CollectionCard theme={theme} index={7} collectionFloor={trendingColls[7].floor_price} collectionName={trendingColls[7].collection_name} collectionVolume={trendingColls[7].volume} collectionLogo={trendingColls[7].logo} />
                            <CollectionCard theme={theme} index={8} collectionFloor={trendingColls[8].floor_price} collectionName={trendingColls[8].collection_name} collectionVolume={trendingColls[8].volume} collectionLogo={trendingColls[8].logo} />
                            <CollectionCard theme={theme} index={9} collectionFloor={trendingColls[9].floor_price} collectionName={trendingColls[9].collection_name} collectionVolume={trendingColls[9].volume} collectionLogo={trendingColls[9].logo} />
                        </div>
                    </div>


                    <div style={{ cursor: "pointer" }} className="align-self-center text-center p-3"
                    // style={{ width: "100px", border: "solid 1px white" }}
                    >
                        View All
                        <br />
                        <div style={{ width: "auto", padding: "0" }}><ArrowDown2 /></div>
                    </div>
                </SectionContainer >
            }
        </>
    );
}

export default TrendingSection;