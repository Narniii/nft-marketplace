import { Accordion, AccordionDetails, AccordionSummary, Box, Modal, Skeleton, Typography } from "@mui/material";
import { Refresh2, ArrowDown2, ArrowSwapVertical, CloseSquare, FilterSearch, Grid1, Grid2, Grid5, HambergerMenu } from "iconsax-react";
import styled from "styled-components";
import SearchBox from "../Navbar/SearchBox";
import { TestColls } from "../../utils/testCollections";
import { CircularProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ItemCard from "../Cards/ItemCard";
import SSelection from "../Selection";
import { Filtering } from "../Filtering";
import { MARKET_API } from "../../utils/data/market_api";
import { Colors } from "../design/Colors";

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
// cursor:pointer;
`
const ItemsTab = ({ theme, collectionID, updatedAt, nfts }) => {
    const [view, setView] = useState('m')
    const handleViewChange = (v) => {
        setView(v)
    }

    const [trendingColls, setTrendingColls] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [openFilter, setOpenFilter] = useState(false)
    const handleFilter = () => {
        if (openFilter) setOpenFilter(false)
        else setOpenFilter(true)
    }
    const handleOpen = () => setOpenFilter(true);
    const handleClose = () => setOpenFilter(false);
    const [lastUpdated, setLastUpdated] = useState(undefined)
    const apiCall = useRef(undefined)
    const [items, setItems] = useState(nfts)
    const [err, setErr] = useState(undefined)
    const [last_time, setLast_time] = useState(new Date().getTime())

    useEffect(() => {
        let updatedAgo;
        // let last_time = new Date().getTime()
        updatedAgo = setInterval(() => {
            let this_time = new Date().getTime()
            let difference = Math.abs(this_time - last_time) / 1000
            let hours = Math.floor(difference / 3600) % 24;
            let minutes = Math.floor(difference / 60) % 60;
            let seconds = Math.floor(difference % 60);

            // setLastUpdated(<span>{hours} hrs {minutes} mins {seconds} secs</span>)
            // setLastUpdated(<span>{minutes} mins {seconds} secs</span>)
            setLastUpdated(<span>{minutes} mins</span>)
        }, 300);
        console.log(updatedAgo);

        return function cleanup() {
            console.log(`Clearing ${updatedAgo}`);
            clearInterval(updatedAgo);
        };
    }, [last_time]);
    // useEffect(() => {
    //     if (collectionID) {
    //         fetchItems()
    //     }
    // }, [collectionID])
    useEffect(() => {
        return () => {
            if (apiCall.current != undefined)
                apiCall.current.cancel();

        }
    }, [])
    const handleUpdate = () => {
        if (collectionID) {
            console.log(collectionID)
            fetchItems()
        }
    }
    const fetchItems = async () => {
        console.log(collectionID)
        try {
            apiCall.current = MARKET_API.request({
                path: `/collection/nfts/`,
                method: "post",
                body: {
                    collection_id: collectionID,
                    from: 0,
                    to: 10
                },

            })
            const response = await apiCall.current.promise;
            if (!response.isSuccess)
                throw response
            setItems(response.data)
            console.log(response)
            let new_time = new Date().getTime()
            setLast_time(new_time)

            // setLoading(false)
        }
        catch (err) {
            console.log(err)
            if (err.status == 404) {
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


    return (
        <div className="d-flex flex-column p-0 justify-content-between align-items-center">
            {/* top section */}

            <Filtering id={'colItemsSearch'} theme={theme} handleFilter={handleFilter} handleViewChange={handleViewChange} selectOptions={['price low to high', 'price high to low']} />



            {/* items section */}
            {/*outer div for when status modal is opened */}
            <div className="d-flex  w-100 justify-content-between">
                <div className="d-flex  w-100 flex-column p-0 justify-content-between">
                    {loading ?
                        <div className="d-flex flex-column w-100 justify-content-between">
                            <Skeleton variant="rounded" height={50} sx={{ width: "100%", borderRadius: "24px", my: 3 }} />
                            <div className="d-flex flex-wrap my-3" style={{ width: !openFilter ? "100%" : "70%", transition: "500ms ease" }}>
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
                            </div>
                        </div>
                        :
                        <>
                            <div className="d-flex w-100 mt-3 p-0 justify-content-between">
                                <Updated ><Refresh2 style={{ cursor: "pointer" }} size="20" onClick={handleUpdate} />&nbsp;{lastUpdated ? <>updated&nbsp;{lastUpdated}&nbsp;ago</> : undefined}</Updated>
                                <div>{items.length} items</div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <Box className="d-flex flex-wrap" style={{ width: !openFilter ? "100%" : "70%", transition: { xs: '0ms', md: '500ms ease' } }}>
                                    {items.length == 0 ?
                                        <div className="w-100 d-flex justify-content-center align-items-center">
                                            <Typography sx={{ color: `${Colors.primaryMain}`, textAlign: 'center', my: 7, mx: 3 }}>No item found.</Typography>
                                        </div>
                                        :
                                        <>
                                            {items.map((item) => {
                                                return <ItemCard slider={false} view={view} itemImage={item.nft_image_path} itemID={item._id.$oid} theme={theme} name={item.title} price={item.price} creator={item.creator} />
                                            })}
                                        </>
                                    }
                                </Box>
                                {openFilter ? <FilterContainer style={{ width: "28%" }} className="my-2 d-none d-lg-flex">
                                </FilterContainer>
                                    : undefined}
                            </div>
                        </>
                    }
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
        </div>
    );
}

export default ItemsTab;