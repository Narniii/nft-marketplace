import { Accordion, AccordionDetails, AccordionSummary, Box, Modal, Skeleton, Typography } from "@mui/material";
import { ArrowDown2, ArrowSwapVertical, CloseSquare, FilterSearch, Grid1, Grid2, Grid5, HambergerMenu } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MARKET_API } from "../../utils/data/market_api";
import ItemCard from "../Cards/ItemCard";
import { Colors } from "../design/Colors";
import { Filtering } from "../Filtering";
import SearchBox from "../Navbar/SearchBox";
import SSelection from "../Selection";
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
const Collected = ({ theme, userWallet }) => {
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
    const apiCall = useRef(undefined)
    const [items, setItems] = useState(undefined)
    const [err, setErr] = useState(undefined)
    useEffect(() => {
        fetchItems()
        // return () => {
        //     if (apiCall.current != undefined)
        //         apiCall.current.cancel();

        // }
    }, [])

    const fetchItems = async () => {
        try {
            apiCall.current = MARKET_API.request({
                path: `/nft/user/`,
                method: "post",
                body: {
                    wallet_address: userWallet
                }
            })
            const response = await apiCall.current.promise;
            console.log('user items', response)
            if (!response.isSuccess)
                throw response
            setItems(response.data)
            // setLoading(false)
        }
        catch (err) {
            console.log(err)
            if (err.data.message == "No NFTs Found For This Wallet Address") {
                setItems([])
            }
            else {
                setErr("Internal server error")
            }
            // setLoading(false)
        }
    }

    useEffect(() => {
        if (items)
            setLoading(false)
    }, [items])

    return (<div className="d-flex flex-column">

        <Filtering id={'profileCollectedSearch'} theme={theme} handleFilter={handleFilter} handleViewChange={handleViewChange} selectOptions={['price low to high', 'price high to low']} />

        <div className="d-flex justify-content-between">
            <div className="d-flex flex-wrap" style={{ width: !openFilter ? "100%" : "70%", transition: "500ms ease" }}>
                {loading ?
                    <div className="d-flex w-100 justify-content-between">
                        <Box className="d-flex flex-wrap my-3" sx={{ width: !openFilter ? "100%" : "70%", transition: { xs: '0ms', md: '500ms ease' } }}>
                            <div className="col-12 col-sm-6 col-md-3 p-1">
                                <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                            </div>
                            <div className="d-none d-sm-block col-12 col-sm-6 col-md-3 p-1">
                                <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                            </div>
                            <div className="d-none d-md-block col-12 col-sm-6 col-md-3 p-1">
                                <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                            </div>
                            <div className="d-none d-md-block col-12 col-sm-6 col-md-3 p-1">
                                <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                            </div>
                        </Box>
                    </div>
                    :
                    <>
                        {items.length == 0 ?
                            <Typography sx={{ color: `${Colors.primaryMain}`, textAlign: 'center' }}>No item found.</Typography>
                            :
                            <>
                                {items.map((item) => {
                                    return <ItemCard slider={false} view={view} itemImage={item.nft_image_path} itemID={item._id.$oid} theme={theme} name={item.title} price={item.price} creator={item.creator} />
                                })}
                            </>
                        }
                    </>
                }
            </div>
            {openFilter ? <FilterContainer style={{ width: "28%" }} className="my-2 d-none d-lg-flex">
            </FilterContainer>
                : undefined}
        </div>

        <Modal
            open={openFilter}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="d-lg-none"
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