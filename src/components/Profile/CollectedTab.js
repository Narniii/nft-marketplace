import { Accordion, AccordionDetails, AccordionSummary, Box, Modal, Typography } from "@mui/material";
import { ArrowDown2, ArrowSwapVertical, CloseSquare, FilterSearch, Grid1, Grid2, Grid5, HambergerMenu } from "iconsax-react";
import { useState } from "react";
import styled from "styled-components";
import ItemCard from "../Cards/ItemCard";
import SearchBox from "../Navbar/SearchBox";
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
padding:18px 0;
// padding:18px;
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
const Collected = ({ theme }) => {
    const [view, setView] = useState('m')
    const [openFilter, setOpenFilter] = useState(false)
    const handleFilter = () => {
        if (openFilter) setOpenFilter(false)
        else setOpenFilter(true)
    }

    const [trendingColls, setTrendingColls] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const handleOpen = () => setOpenFilter(true);
    const handleClose = () => setOpenFilter(false);
    const handleViewChange = (v) => {
        setView(v)
    }

    return (<div className="d-flex flex-column ">
        <div className="row w-100 align-self-center p-0 justify-content-between align-items-center mb-1">
            <div className="col-8 col-sm-4 col-md-5"><SearchBox /></div>
            <div className="d-none d-sm-block col-4 col-md-3">
                <Selection className="row p-2" >
                    price low to high
                    <div style={{ width: "auto", padding: "4px 0 5px" }}><ArrowDown2 /></div>
                </Selection>
            </div>
            <div className="d-none d-sm-block col-3">
                <Selection className="row">
                    <IconContainer className="col-3 text-center d-flex justify-content-center align-items-center" onClick={() => handleViewChange('xs')}><HambergerMenu size="20" /></IconContainer>
                    <IconContainer className="col-3 text-center d-flex justify-content-center align-items-center" onClick={() => handleViewChange('s')}><Grid1 size="20" /></IconContainer>
                    <IconContainer className="col-3 text-center d-flex justify-content-center align-items-center" onClick={() => handleViewChange('m')}><Grid2 size="20" /></IconContainer>
                    <IconContainer className="col-3 text-center d-flex justify-content-center align-items-center" onClick={() => handleViewChange('l')}><Grid5 size="20" /></IconContainer>
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
        <div className="d-flex justify-content-between">
            <div className="d-flex flex-wrap" style={{ width: !openFilter ? "100%" : "70%", transition: "500ms ease" }}>
                <ItemCard view={view} itemID={'1'}/>
                <ItemCard view={view} itemID={'2'}/>
                <ItemCard view={view} itemID={'3'}/>
                <ItemCard view={view} itemID={'4'}/>
                <ItemCard view={view} itemID={'5'}/>
                <ItemCard view={view} itemID={'6'}/>
                <ItemCard view={view} itemID={'7'}/>
                <ItemCard view={view} itemID={'8'}/>
                <ItemCard view={view} itemID={'9'}/>
                <ItemCard view={view} itemID={'10'}/>
                <ItemCard view={view} itemID={'11'}/>
                <ItemCard view={view} itemID={'12'}/>
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
    </div>);
}

export default Collected;