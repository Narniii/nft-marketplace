import { Accordion, AccordionDetails, AccordionSummary, Box, Modal, Typography } from "@mui/material";
import { Refresh2, ArrowDown2, ArrowSwapVertical, CloseSquare, FilterSearch, Grid1, Grid2, Grid5, HambergerMenu, ArrowUp2, ArrowSquareUp } from "iconsax-react";
import styled from "styled-components";
import SearchBox from "../Navbar/SearchBox";
import { TestColls } from "../../utils/testCollections";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import ItemCard from "../Cards/ItemCard";
import { Colors } from "../design/Colors";
import TestPic1 from '../../assets/test-1.png'

const Card = styled.div`
background-color:${({ theme }) => theme.itemCardsBackground};
box-shadow:${({ theme }) => theme.boxShadow};
display: flex;
flex-direction: row;
align-items: center;
justify-content:space-between;
border-radius:24px;
padding:20px;
`
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
    font-size:14px;
`;
const IconContainer = styled.div`
    border-left: 1px solid #D9D9D9;
    height:100%;
    padding:4px 0 5px;
    &:hover{
        background-color: ${({ theme }) => theme.hoverIcon};
    }
`;
const ModalLine = styled.div`
    background: linear-gradient(90deg,#60606000 0%, #80808080 50%,#918A7A00 100%);
    height:2px;
    align-self:center;
    width:70%;
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
const Updated = styled.div`
color: ${({ theme }) => theme.trendingSectionSubTitles};
display:flex;
`
const Subtitle = styled.p`
color:${({ theme }) => theme.textSub};
// font-size:14px;
margin:0;
`
const Num = styled.span`
color:${({ theme }) => theme.collectionDetailsAnswer} !important;
font-weight:600;
`
const Perc = styled.span`
color:${Colors.successDark};
font-size:14px;
`
const ImgB = styled.div`
background-image: url(${TestPic1});
background-size:contain;
background-repeat:no-repeat;
background-position:center;
height:70px;
width:70px;
`
const DataContainer = styled.div`
// width:49%;
height:315px;
border-radius:24px;
background-color:${({ theme }) => theme.itemCardsBackground};
box-shadow:${({ theme }) => theme.boxShadow};
`
const CollectionAnalyticsTab = ({ theme }) => {
    const [loading, setLoading] = useState(true)
    const [openFilter, setOpenFilter] = useState(false)
    const handleFilter = () => {
        if (openFilter) setOpenFilter(false)
        else setOpenFilter(true)
    }
    const handleOpen = () => setOpenFilter(true);
    const handleClose = () => setOpenFilter(false);


    return (
        <div className="d-flex flex-column p-0 justify-content-between align-items-center">
            <div className="mb-4 d-flex flex-wrap w-100 justify-content-between align-items-center">
                <div className="col-12 col-sm-6 col-md-4">
                    <Card className="m-1">
                        <div className="d-flex flex-column justify-content-between">
                            <Subtitle style={{ fontSize: "14px" }}>Volume</Subtitle>
                            <Subtitle style={{ fontSize: "20px" }}><Num>175 </Num>ETH</Subtitle>
                            <div className="d-flex align-items-center"><ArrowSquareUp variant="Bulk" color={`${Colors.successDark}`} size="20" /> <Perc>+150%</Perc></div>
                        </div>
                        <ImgB />
                    </Card>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                    <Card className="m-1">
                        <div className="d-flex flex-column justify-content-between">
                            <Subtitle style={{ fontSize: "14px" }}>Volume</Subtitle>
                            <Subtitle style={{ fontSize: "20px" }}><Num>175 </Num>ETH</Subtitle>
                            <div className="d-flex align-items-center"><ArrowSquareUp variant="Bulk" color={`${Colors.successDark}`} size="20" /> <Perc>+150%</Perc></div>
                        </div>
                        <ImgB />
                    </Card>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                    <Card className="m-1">
                        <div className="d-flex flex-column justify-content-between">
                            <Subtitle style={{ fontSize: "14px" }}>Volume</Subtitle>
                            <Subtitle style={{ fontSize: "20px" }}><Num>175 </Num>ETH</Subtitle>
                            <div className="d-flex align-items-center"><ArrowSquareUp variant="Bulk" color={`${Colors.successDark}`} size="20" /> <Perc>+150%</Perc></div>
                        </div>
                        <ImgB />
                    </Card>
                </div>
            </div>
            <div className="mb-4 row w-100 p-0 justify-content-between align-items-center">
                <div className="col-8 col-sm-4 col-md-5"><SearchBox /></div>
                <div className="d-none d-sm-block col-4 col-md-3">
                    <Selection className="mx-1 d-flex p-2" >
                        <span className="d-flex">
                            price low to high
                        </span>
                        <div style={{ width: "auto" }}><ArrowDown2 /></div>
                    </Selection>
                </div>
                <div className="d-none d-sm-block col-3">
                    <Selection className="mx-1 d-flex ">
                        <IconContainer className="col-3 p-2 text-center d-flex justify-content-center align-items-center" ><HambergerMenu /></IconContainer>
                        <IconContainer className="col-3 p-2 text-center d-flex justify-content-center align-items-center" ><Grid1 /></IconContainer>
                        <IconContainer className="col-3 p-2 text-center d-flex justify-content-center align-items-center" ><Grid2 /></IconContainer>
                        <IconContainer className="col-3 p-2 text-center d-flex justify-content-center align-items-center" ><Grid5 /></IconContainer>
                    </Selection>
                </div>
                <div className="d-block d-sm-none col-2 col-sm-1">
                    <Selection className="mx-1 d-flex p-2 d-flex justify-content-center">
                        <div style={{ width: "auto" }}><ArrowSwapVertical /></div>
                    </Selection>
                </div>
                <div className="col-2 col-sm-1">
                    <Selection className="mx-1 d-flex p-2 d-flex justify-content-center">
                        <div style={{ width: "auto" }} onClick={handleFilter}><FilterSearch size="20" /></div>
                    </Selection>
                </div>
            </div>
            <div className="d-flex justify-content-between w-100">
                <div className="d-flex flex-wrap justify-content-between" style={{ width: !openFilter ? "100%" : "70%", transition: "500ms ease" }}>
                    <div className="col-12 col-sm-6"><DataContainer className="m-1"></DataContainer></div>
                    <div className="col-12 col-sm-6"><DataContainer className="m-1"></DataContainer></div>
                    <div className="col-12 col-sm-6"><DataContainer className="m-1"></DataContainer></div>
                    <div className="col-12 col-sm-6"><DataContainer className="m-1"></DataContainer></div>
                    <div className="col-12 col-sm-6"><DataContainer className="m-1"></DataContainer></div>
                </div>
                {openFilter ? <FilterContainer style={{ width: "28%" }} className="my-2 d-none d-md-flex">
                </FilterContainer>
                    : undefined}
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
                    <Box className="d-flex justify-content-between"><div className="d-flex justify-content-start" onClick={handleFilter}> <FilterSearch className="me-2" /><p style={{ margin: 0, fontWeight: "bold" }}>Filter</p></div><div className="d-flex justify-content-end" style={{ cursor: "pointer" }} onClick={handleClose}><CloseSquare /></div>  </Box>
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
    );
}

export default CollectionAnalyticsTab;