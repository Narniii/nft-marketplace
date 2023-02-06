import { ArrowDown2, ArrowSquareRight, ArrowSwapVertical, BagTick, CloseSquare, DocumentDownload, FilterSearch, Grid1, Grid2, Grid5, HambergerMenu, Logout, Refresh2 } from "iconsax-react";
import styled from "styled-components";
import SearchBox from "../Navbar/SearchBox";
import { TestColls } from "../../utils/testCollections";
import { Accordion, AccordionDetails, AccordionSummary, Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ItemCard from "../Cards/ItemCard";
import testnft from '../../assets/test1.png'
import { Colors } from "../design/Colors";
import Modal from '@mui/material/Modal';
import '../../styles.css'

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
    width:200px;
`;
const ItemsContainerSmall = styled.div`
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: ${({ theme }) => theme.itemCardsBackground};
    // border: ${({ theme }) => theme.searchBoxBorder};
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    padding: 12px 0px;
    width:100%;
    overflow:hidden;
`;
const ItemsContainerDesktop = styled.div`
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: ${({ theme }) => theme.itemCardsBackground};
    // border: ${({ theme }) => theme.searchBoxBorder};
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    // padding: 25px;
    // width:100%;
    overflow:hidden;
    transition:300ms ease;
`;
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
const ChartContainer = styled.div`
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: ${({ theme }) => theme.itemCardsBackground};
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    padding: 12px 0px;
    width:100%;
    overflow:hidden;
    height:300px;
`;
const MainDetail = styled.div`
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    // border:1px solid purple;
    padding: 20px;

`;
const Detail = styled.div`
    display: none;
    flex-direction: row;
    justify-content:space-between; 
    // border:1px solid yellow;
    padding: 20px;

`;
const Line = styled.div`
    display: none;
    background: linear-gradient(90deg,#60606000 0%, #80808080 50%,#918A7A00 100%);
    height:1px;
    align-self:center;
    width:80%;
`;
const VisibleLine = styled.div`
    background: linear-gradient(90deg,#60606000 0%, #80808080 50%,#918A7A00 100%);
    height:1px;
    align-self:center;
    width:90%;
`;
const ProductCardSmall = styled.div`
    background-color: ${({ theme }) => theme.itemCardsBackground};
    display: flex;
    flex-direction: column;
    width:100%;
    // border:1px solid red;
    justify-content:space-between; 
    &:hover{
        box-shadow:${({ theme }) => theme.deeperBoxShadow};
        ${Line}{
            display:block;
        }
        ${Detail}{
            display:flex;
        }
    }
`;
const ItemImage = styled.div`
    background-image: url(${testnft});
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;
    height:45px;
    width:45px;
    margin-right:1px;
`;
const ProductCardDesktop = styled.div`
    // border-radius: 24px;
    display: flex;
    flex-direction: row;
    padding: 20px;
    justify-content:space-between;
    width:100%;
    &:hover{
        background-color:${({ theme }) => theme.collectionCardHover};
    }
`;
const Subtitle = styled.p`
    color: ${({ theme }) => theme.par};
    display:flex;
    align-items:center;
    margin:0;
`
const Recommend = styled.span`
    color: ${Colors.recommendedDark};
    display:flex;
    align-items:center;
    // font-size:12px;
`
const Price = styled.p`
    color: ${({ theme }) => theme.trendingSectionSubTitles};
    margin:0;
    display:flex;
    align-items:center;
`
const ModalLine = styled.div`
    background: linear-gradient(90deg,#60606000 0%, #80808080 50%,#918A7A00 100%);
    height:2px;
    align-self:center;
    width:70%;
`;


const themeHere = window.localStorage.getItem('theme');
const Modalstyle = {
    width: '100%',
    height: '100%',
    p: 4,
    bgcolor: themeHere == 'light' ? "#F9F9F9" : "#272448",
};
const AccStyle = {
    width: '100%',
    bgcolor: themeHere == 'light' ? "#F9F9F9" : "#272448",
    color: themeHere == 'light' ? "#333333" : "#e6e6e6",
    border: 'none',
    boxShadow: 'none',
    '&:before': {
        bgcolor: 'transparent',
    }
};



const ActivityTab = ({ theme }) => {
    const handleOpen = () => setOpenFilter(true);
    const handleClose = () => setOpenFilter(false);

    const [trendingColls, setTrendingColls] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [openFilter, setOpenFilter] = useState(false)
    const handleFilter = () => {
        if (openFilter) setOpenFilter(false)
        else setOpenFilter(true)
    }
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
            <div className="row w-100 p-0 justify-content-between">
                <div className="col-3 p-0 d-flex align-items-center justify-content-start">Activity</div>
                <div className="col-9 p-0 d-flex align-items-center justify-content-end">
                    {/* <Selection className="d-flex justify-content mx-2 p-2" >
                        Last 7 Days
                        <div style={{ width: "auto", padding: "4px 0 5px" }}><ArrowDown2 /></div>
                    </Selection> */}
                    <div className="ml-1" style={{ width: "auto", padding: "4px 0 5px", cursor: "pointer" }} onClick={handleFilter}><FilterSearch /></div>
                </div>
            </div>
            {/* {openFilter ? <FilterContainer className="d-flex d-md-none col-12 text-center">event type...</FilterContainer>
                : undefined} */}
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

            {/* details section */}
            <div className="w-100 d-flex flex-column justify-content-between">
                {/* item activity on mobile and tablet ==========> */}
                <ItemsContainerSmall className="my-2 d-flex d-md-none">
                    <ProductCardSmall className="my-1">
                        <MainDetail>
                            <div className="d-flex align-items-center">
                                <ItemImage />
                                <div className="d-flex flex-column ms-1">
                                    <h6 className="m-0" style={{ fontWeight: 600 }}>Product Name</h6>
                                    <Subtitle style={{ fontSize: '14px' }} className="m-0"><DocumentDownload size="15" />&nbsp;List</Subtitle>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="d-flex flex-column">
                                    <Price className="m-0">10 ETH</Price>
                                    <Recommend style={{ fontSize: "12px" }} className="m-0">2 hours ago<Logout size="12" /></Recommend>
                                </div>
                                <Price>
                                    <ArrowSquareRight />
                                </Price>
                            </div>
                        </MainDetail>
                        <Line />
                        <Detail>
                            <div className="d-flex"><Subtitle>From: </Subtitle><Recommend>Name</Recommend></div>
                            <div className="d-flex"><Subtitle>To: </Subtitle><Recommend>Name</Recommend></div>
                            <div className="d-flex"><Subtitle>Quantity: </Subtitle><Price>1</Price></div>
                        </Detail>
                    </ProductCardSmall>
                    <ProductCardSmall className="my-1">
                        <MainDetail>
                            <div className="d-flex align-items-center">
                                <ItemImage />
                                <div className="d-flex flex-column ms-1">
                                    <h6 className="m-0" style={{ fontWeight: 600 }}>Product Name</h6>
                                    <Subtitle style={{ fontSize: '14px' }} className="m-0"><DocumentDownload size="15" />&nbsp;List</Subtitle>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="d-flex flex-column">
                                    <Price className="m-0">10 ETH</Price>
                                    <Recommend style={{ fontSize: "12px" }} className="m-0">2 hours ago<Logout size="12" /></Recommend>
                                </div>
                                <Price>
                                    <ArrowSquareRight />
                                </Price>
                            </div>
                        </MainDetail>
                        <Line />
                        <Detail>
                            <div className="d-flex"><Subtitle>From: </Subtitle><Recommend>Name</Recommend></div>
                            <div className="d-flex"><Subtitle>To: </Subtitle><Recommend>Name</Recommend></div>
                            <div className="d-flex"><Subtitle>Quantity: </Subtitle><Price>1</Price></div>
                        </Detail>
                    </ProductCardSmall>
                    <ProductCardSmall className="my-1">
                        <MainDetail>
                            <div className="d-flex align-items-center">
                                <ItemImage />
                                <div className="d-flex flex-column ms-1">
                                    <h6 className="m-0" style={{ fontWeight: 600 }}>Product Name</h6>
                                    <Subtitle style={{ fontSize: '14px' }} className="m-0"><DocumentDownload size="15" />&nbsp;List</Subtitle>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="d-flex flex-column">
                                    <Price className="m-0">10 ETH</Price>
                                    <Recommend style={{ fontSize: "12px" }} className="m-0">2 hours ago<Logout size="12" /></Recommend>
                                </div>
                                <Price>
                                    <ArrowSquareRight />
                                </Price>
                            </div>
                        </MainDetail>
                        <Line />
                        <Detail>
                            <div className="d-flex"><Subtitle>From: </Subtitle><Recommend>Name</Recommend></div>
                            <div className="d-flex"><Subtitle>To: </Subtitle><Recommend>Name</Recommend></div>
                            <div className="d-flex"><Subtitle>Quantity: </Subtitle><Price>1</Price></div>
                        </Detail>
                    </ProductCardSmall>
                    <ProductCardSmall className="my-1">
                        <MainDetail>
                            <div className="d-flex align-items-center">
                                <ItemImage />
                                <div className="d-flex flex-column ms-1">
                                    <h6 className="m-0" style={{ fontWeight: 600 }}>Product Name</h6>
                                    <Subtitle style={{ fontSize: '14px' }} className="m-0"><DocumentDownload size="15" />&nbsp;List</Subtitle>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="d-flex flex-column">
                                    <Price className="m-0">10 ETH</Price>
                                    <Recommend style={{ fontSize: "12px" }} className="m-0">2 hours ago<Logout size="12" /></Recommend>
                                </div>
                                <Price>
                                    <ArrowSquareRight />
                                </Price>
                            </div>
                        </MainDetail>
                        <Line />
                        <Detail>
                            <div className="d-flex"><Subtitle>From: </Subtitle><Recommend>Name</Recommend></div>
                            <div className="d-flex"><Subtitle>To: </Subtitle><Recommend>Name</Recommend></div>
                            <div className="d-flex"><Subtitle>Quantity: </Subtitle><Price>1</Price></div>
                        </Detail>
                    </ProductCardSmall>
                    <ProductCardSmall className="my-1">
                        <MainDetail>
                            <div className="d-flex align-items-center">
                                <ItemImage />
                                <div className="d-flex flex-column ms-1">
                                    <h6 className="m-0" style={{ fontWeight: 600 }}>Product Name</h6>
                                    <Subtitle style={{ fontSize: '14px' }} className="m-0"><DocumentDownload size="15" />&nbsp;List</Subtitle>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="d-flex flex-column">
                                    <Price className="m-0">10 ETH</Price>
                                    <Recommend style={{ fontSize: "12px" }} className="m-0">2 hours ago<Logout size="12" /></Recommend>
                                </div>
                                <Price>
                                    <ArrowSquareRight />
                                </Price>
                            </div>
                        </MainDetail>
                        <Line />
                        <Detail>
                            <div className="d-flex"><Subtitle>From: </Subtitle><Recommend>Name</Recommend></div>
                            <div className="d-flex"><Subtitle>To: </Subtitle><Recommend>Name</Recommend></div>
                            <div className="d-flex"><Subtitle>Quantity: </Subtitle><Price>1</Price></div>
                        </Detail>
                    </ProductCardSmall>
                </ItemsContainerSmall>

                {/* item activity on desktop ==========> */}
                <div className="d-flex justify-content-between">
                    <ItemsContainerDesktop style={{ width: !openFilter ? "100%" : "70%" }} className="my-2 d-none d-md-flex">
                        <div style={{ padding: "20px" }} className="d-flex my-1"><ArrowSwapVertical /> Item Activity</div>
                        <VisibleLine />
                        <div style={{ padding: "20px" }} className="my-1 d-flex justify-content-between">
                            <Subtitle style={{ width: "150px", overflow: "hidden" }}>Event</Subtitle>
                            <Subtitle style={{ width: "250px", overflow: "hidden" }}>Product</Subtitle>
                            <Subtitle style={{ width: "150px", overflow: "hidden" }}>Price</Subtitle>
                            {/* <Subtitle style={{ width: "100px", overflow: "hidden" }}>Quantity</Subtitle> */}
                            <Subtitle style={{ width: "150px", overflow: "hidden" }}>From</Subtitle>
                            <Subtitle style={{ width: "150px", overflow: "hidden" }}>To</Subtitle>
                            <Subtitle style={{ width: "150px", overflow: "hidden" }}>Time</Subtitle>
                        </div>
                        <ProductCardDesktop className="my-1">
                            <Price style={{ width: "150px", overflow: "hidden" }}><BagTick size="17" />Sale</Price>
                            <Price style={{ width: "250px", overflow: "hidden" }}><ItemImage />Product Name</Price>
                            <Subtitle style={{ width: "150px", overflow: "hidden" }}>101 ETH</Subtitle>
                            {/* <Subtitle style={{ width: "100px", overflow: "hidden" }}>1</Subtitle> */}
                            <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...4</Recommend>
                            <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...987</Recommend>
                            <Recommend style={{ width: "150px", overflow: "hidden" }}>2 hours ago<Logout /></Recommend>
                        </ProductCardDesktop>

                        <ProductCardDesktop className="my-1">
                            <Price style={{ width: "150px", overflow: "hidden" }}><BagTick size="17" />Sale</Price>
                            <Price style={{ width: "250px", overflow: "hidden" }}><ItemImage />Product Name</Price>
                            <Subtitle style={{ width: "150px", overflow: "hidden" }}>101 ETH</Subtitle>
                            {/* <Subtitle style={{ width: "100px", overflow: "hidden" }}>1</Subtitle> */}
                            <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...4</Recommend>
                            <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...987</Recommend>
                            <Recommend style={{ width: "150px", overflow: "hidden" }}>2 hours ago<Logout /></Recommend>
                        </ProductCardDesktop>

                        <ProductCardDesktop className="my-1">
                            <Price style={{ width: "150px", overflow: "hidden" }}><BagTick size="17" />Sale</Price>
                            <Price style={{ width: "250px", overflow: "hidden" }}><ItemImage />Product Name</Price>
                            <Subtitle style={{ width: "150px", overflow: "hidden" }}>101 ETH</Subtitle>
                            {/* <Subtitle style={{ width: "100px", overflow: "hidden" }}>1</Subtitle> */}
                            <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...4</Recommend>
                            <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...987</Recommend>
                            <Recommend style={{ width: "150px", overflow: "hidden" }}>2 hours ago<Logout /></Recommend>
                        </ProductCardDesktop>

                        <ProductCardDesktop className="my-1">
                            <Price style={{ width: "150px", overflow: "hidden" }}><BagTick size="17" />Sale</Price>
                            <Price style={{ width: "250px", overflow: "hidden" }}><ItemImage />Product Name</Price>
                            <Subtitle style={{ width: "150px", overflow: "hidden" }}>101 ETH</Subtitle>
                            {/* <Subtitle style={{ width: "100px", overflow: "hidden" }}>1</Subtitle> */}
                            <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...4</Recommend>
                            <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...987</Recommend>
                            <Recommend style={{ width: "150px", overflow: "hidden" }}>2 hours ago<Logout /></Recommend>
                        </ProductCardDesktop>

                        <ProductCardDesktop className="my-1">
                            <Price style={{ width: "150px", overflow: "hidden" }}><BagTick size="17" />Sale</Price>
                            <Price style={{ width: "250px", overflow: "hidden" }}><ItemImage />Product Name</Price>
                            <Subtitle style={{ width: "150px", overflow: "hidden" }}>101 ETH</Subtitle>
                            {/* <Subtitle style={{ width: "100px", overflow: "hidden" }}>1</Subtitle> */}
                            <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...4</Recommend>
                            <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...987</Recommend>
                            <Recommend style={{ width: "150px", overflow: "hidden" }}>2 hours ago<Logout /></Recommend>
                        </ProductCardDesktop>

                        <ProductCardDesktop className="my-1">
                            <Price style={{ width: "150px", overflow: "hidden" }}><BagTick size="17" />Sale</Price>
                            <Price style={{ width: "250px", overflow: "hidden" }}><ItemImage />Product Name</Price>
                            <Subtitle style={{ width: "150px", overflow: "hidden" }}>101 ETH</Subtitle>
                            {/* <Subtitle style={{ width: "100px", overflow: "hidden" }}>1</Subtitle> */}
                            <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...4</Recommend>
                            <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...987</Recommend>
                            <Recommend style={{ width: "150px", overflow: "hidden" }}>2 hours ago<Logout /></Recommend>
                        </ProductCardDesktop>

                        <ProductCardDesktop className="my-1">
                            <Price style={{ width: "150px", overflow: "hidden" }}><BagTick size="17" />Sale</Price>
                            <Price style={{ width: "250px", overflow: "hidden" }}><ItemImage />Product Name</Price>
                            <Subtitle style={{ width: "150px", overflow: "hidden" }}>101 ETH</Subtitle>
                            {/* <Subtitle style={{ width: "100px", overflow: "hidden" }}>1</Subtitle> */}
                            <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...4</Recommend>
                            <Recommend style={{ width: "150px", overflow: "hidden" }}>Name87...987</Recommend>
                            <Recommend style={{ width: "150px", overflow: "hidden" }}>2 hours ago<Logout /></Recommend>
                        </ProductCardDesktop>

                    </ItemsContainerDesktop>

                    {openFilter ? <FilterContainer style={{ width: "28%" }} className="my-2 d-none d-md-flex">
                        {/* <Accordion sx={{
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
                                expandIcon={<ArrowDown2 color={themeHere == 'light' ? "#333333" : "#e6e6e6"} />}
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
                        <Accordion sx={AccStyle}>
                            <AccordionSummary
                                expandIcon={<ArrowDown2 color={themeHere == 'light' ? "#333333" : "#e6e6e6"} />}
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
                        <Accordion sx={AccStyle}>
                            <AccordionSummary
                                expandIcon={<ArrowDown2 color={themeHere == 'light' ? "#333333" : "#e6e6e6"} />}
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
                        </Accordion> */}

                    </FilterContainer>
                        : undefined}
                </div>

                {/* <ChartContainer className="my-3" /> */}
            </div>
        </div>

    );
}

export default ActivityTab;