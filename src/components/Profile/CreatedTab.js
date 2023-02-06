import styled from "styled-components";
import CollectionCard from "../Cards/CollectionCard";
import { Colors } from "../design/Colors";
import { ArrowDown2, ArrowSwapVertical, CloseSquare, FilterSearch, Grid1, Grid2, Grid5, HambergerMenu, Refresh2 } from "iconsax-react";
import SearchBox from "../Navbar/SearchBox";
import { TestColls } from "../../utils/testCollections";
import { Box,Accordion, AccordionDetails, AccordionSummary, CircularProgress, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ItemCard from "../Cards/ItemCard";



const CollectionContainer = styled.div`
overflow-x:auto;
white-space: nowrap;

scrollbar-width: 5px;
// -ms-overflow-style: none;
&::-webkit-scrollbar {
    height: 7px;
    background:white;
    border:0.5px solid #D9D9D9;
    border-radius:20px;
}
&::-webkit-scrollbar-thumb {
    height:5px;
    width:10px !important;
    background: ${Colors.primaryDark}; 
    border-radius: 20px;
}
&::-webkit-scrollbar-button{
    // background:${Colors.primaryDark};
    // width:3px;
    // content : ${<ArrowDown2 size="10" color="purple" />}
    display:none;
}
`
const FilterContainer = styled.div`
box-shadow: ${({ theme }) => theme.boxShadow};
background-color: ${({ theme }) => theme.itemCardsBackground};
// border: ${({ theme }) => theme.searchBoxBorder};
border-radius: 24px;
display: flex;
flex-direction: column;
// padding: 25px;
// width:100%;
overflow:hidden;
`;

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
    // padding:4px 0 5px;
    padding:18pz;
    &:hover{
        background-color: ${({ theme }) => theme.hoverIcon};
    }
`;

const Updated = styled.div`
color: ${({ theme }) => theme.trendingSectionSubTitles};
display:flex;
`
const ModalLine = styled.div`
    background: linear-gradient(90deg,#60606000 0%, #80808080 50%,#918A7A00 100%);
    height:2px;
    align-self:center;
    width:70%;
`;

const CreatedTab = ({ theme }) => {
    const [view, setView] = useState('m')
    const handleViewChange = (v) => {
        setView(v)
    }


    const [openFilter, setOpenFilter] = useState(false)
    const handleFilter = () => {
        if (openFilter) setOpenFilter(false)
        else setOpenFilter(true)
    }

    const [trendingColls, setTrendingColls] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const handleOpen = () => setOpenFilter(true);
    const handleClose = () => setOpenFilter(false);

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
            <div className="d-flex flex-column">


                {/* collections section */}
                <div className="d-flex flex-column">
                    <h5 style={{ fontWeight: "bold" }}>Collections</h5>
                    <CollectionContainer className="row flex-nowrap mb-5 p-0">
                        <CollectionCard />
                        <CollectionCard />
                        <CollectionCard />
                        <CollectionCard />
                    </CollectionContainer>
                </div>

                {/* items section */}
                <div className="d-flex flex-column p-0 justify-content-between align-items-center">
                    <div className="row w-100 p-0 justify-content-between mb-1">
                        <div className="col-8 col-sm-4 col-md-5"><SearchBox /></div>
                        <div className="d-none d-sm-block col-4 col-md-3">
                            <Selection className="row p-2" >
                                price low to high
                                <div style={{ width: "auto", padding: "4px 0 5px" }}><ArrowDown2 /></div>
                            </Selection>
                        </div>
                        <div className="d-none d-sm-block col-3">
                            <Selection className="row">
                                <IconContainer className="col-3 text-center d-flex justify-content-center align-items-center" onClick={() => handleViewChange('xs')}><HambergerMenu /></IconContainer>
                                <IconContainer className="col-3 text-center d-flex justify-content-center align-items-center" onClick={() => handleViewChange('s')}><Grid1 /></IconContainer>
                                <IconContainer className="col-3 text-center d-flex justify-content-center align-items-center" onClick={() => handleViewChange('m')}><Grid2 /></IconContainer>
                                <IconContainer className="col-3 text-center d-flex justify-content-center align-items-center" onClick={() => handleViewChange('l')}><Grid5 /></IconContainer>
                            </Selection>
                        </div>
                        <div className="d-block d-sm-none col-2 col-sm-1">
                            <Selection className="row p-2 d-flex justify-content-center">
                                <div style={{ width: "auto", padding: "4px 0 5px" }}><ArrowSwapVertical /></div>
                            </Selection>
                        </div>
                        <div className="col-2 col-sm-1">
                            <Selection className="row p-2 d-flex justify-content-center">
                                <div style={{ width: "auto", padding: "4px 0 5px" }} onClick={handleFilter}><FilterSearch /></div>
                            </Selection>
                        </div>
                    </div>


                    {/*outer div for when status modal is opened */}
                    <div className="d-flex  w-100 justify-content-between">
                        <div className="d-flex  w-100 flex-column p-0 justify-content-between">
                            {loading ? <CircularProgress /> :
                                <>
                                    {/* <div className="d-flex w-100 mt-3 p-0 justify-content-between">
                                        <Updated><Refresh2 size="20" />&nbsp;Updated 20m ago</Updated>
                                        <div>22 items</div>
                                    </div> */}
                                    <div style={{ width: !openFilter ? "100%" : "70%" , transition:"500ms ease"}} className="row justify-content-between">
                                        <ItemCard view={view} id={'1'} theme={theme} name={trendingColls[0].collection_name} price={trendingColls[0].floor_price} creator={trendingColls[0].creator} />
                                        <ItemCard view={view} id={'2'} theme={theme} name={trendingColls[1].collection_name} price={trendingColls[1].floor_price} creator={trendingColls[1].creator} />
                                        <ItemCard view={view} id={'3'} theme={theme} name={trendingColls[2].collection_name} price={trendingColls[2].floor_price} creator={trendingColls[2].creator} />
                                        <ItemCard view={view} id={'4'} theme={theme} name={trendingColls[3].collection_name} price={trendingColls[3].floor_price} creator={trendingColls[3].creator} />
                                        <ItemCard view={view} id={'5'} theme={theme} name={trendingColls[0].collection_name} price={trendingColls[0].floor_price} creator={trendingColls[0].creator} />
                                        <ItemCard view={view} id={'6'} theme={theme} name={trendingColls[1].collection_name} price={trendingColls[1].floor_price} creator={trendingColls[1].creator} />
                                        <ItemCard view={view} id={'7'} theme={theme} name={trendingColls[2].collection_name} price={trendingColls[2].floor_price} creator={trendingColls[2].creator} />
                                        <ItemCard view={view} id={'8'} theme={theme} name={trendingColls[3].collection_name} price={trendingColls[3].floor_price} creator={trendingColls[3].creator} />
                                        <ItemCard view={view} id={'9'} theme={theme} name={trendingColls[0].collection_name} price={trendingColls[0].floor_price} creator={trendingColls[0].creator} />
                                        <ItemCard view={view} id={'10'} theme={theme} name={trendingColls[1].collection_name} price={trendingColls[1].floor_price} creator={trendingColls[1].creator} />
                                        <ItemCard view={view} id={'11'} theme={theme} name={trendingColls[2].collection_name} price={trendingColls[2].floor_price} creator={trendingColls[2].creator} />
                                        <ItemCard view={view} id={'12'} theme={theme} name={trendingColls[3].collection_name} price={trendingColls[3].floor_price} creator={trendingColls[3].creator} />
                                    </div>
                                    {openFilter ? <FilterContainer style={{ width: "28%" }} className="my-2 d-none d-md-flex">

                                    </FilterContainer>
                                        : undefined}

                                </>
                            }
                        </div>
                        <Modal
                            open={openFilter}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            className="d-md-none"
                            // inputProps={{MenuProps: {disableScrollLock: true}}}
                            disableScrollLock={true}
                        >
                            <Box sx={{
                                width: '100%',
                                height: '100%',
                                p: 4,
                                bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                            }} className="d-flex flex-column">
                                <Box className="d-flex justify-content-between"><div className="d-flex justify-content-start"> <FilterSearch className="me-2" /><p style={{ margin: 0, fontWeight: "bold" }}>Filter</p></div><div className="d-flex justify-content-end" style={{ cursor: "pointer" }} onClick={handleClose}><CloseSquare /></div>  </Box>
                                <ModalLine className="my-2" />
                                <Accordion sx={{
                                    width: '100%',
                                    bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                                    color: theme == 'light' ? "#333333" : "#e6e6e6",
                                    border: 'none',
                                    boxShadow: 'none',
                                    '&:before': {
                                        bgcolor: 'transparent',
                                    }
                                }}>
                                    <AccordionSummary
                                        expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Event Type</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <ul className="menu">
                                            <li>sales</li>
                                            <li>sales</li>
                                            <li>sales</li>
                                            <li>sales</li>
                                            <li>sales</li>
                                            <li>sales</li>
                                        </ul>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion sx={{
                                    width: '100%',
                                    bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                                    color: theme == 'light' ? "#333333" : "#e6e6e6",
                                    border: 'none',
                                    boxShadow: 'none',
                                    '&:before': {
                                        bgcolor: 'transparent',
                                    }
                                }}>
                                    <AccordionSummary
                                        expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Event Type</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <ul className="menu">
                                            <li>sales</li>
                                            <li>sales</li>
                                            <li>sales</li>
                                            <li>sales</li>
                                            <li>sales</li>
                                            <li>sales</li>
                                        </ul>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion sx={{
                                    width: '100%',
                                    bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                                    color: theme == 'light' ? "#333333" : "#e6e6e6",
                                    border: 'none',
                                    boxShadow: 'none',
                                    '&:before': {
                                        bgcolor: 'transparent',
                                    }
                                }}>
                                    <AccordionSummary
                                        expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Event Type</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <ul className="menu">
                                            <li>sales</li>
                                            <li>sales</li>
                                            <li>sales</li>
                                            <li>sales</li>
                                            <li>sales</li>
                                            <li>sales</li>
                                        </ul>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                        </Modal>
                    </div>
                </div>

            </div>
        </>
    );
}

export default CreatedTab;