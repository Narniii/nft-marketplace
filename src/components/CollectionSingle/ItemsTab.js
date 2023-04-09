import { Accordion, AccordionDetails, AccordionSummary, Box, Modal, Skeleton, Typography } from "@mui/material";
import { Refresh2, ArrowDown2, ArrowSwapVertical, CloseSquare, FilterSearch, Grid1, Grid2, Grid5, HambergerMenu, DocumentText } from "iconsax-react";
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
import TickPic from '../../assets/tick.svg'

const CheckPut = styled.div`
cursor:pointer;
border: 1.5px solid #E6E6E6;
border-radius: 9px;
width:32px;
height:32px;
background-color:#f9f9f9;
overflow:hidden;
position:relative;
display:flex;
align-items:center;
justify-content:center;
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
const ColUl = styled.ul`
height: 200px;
 overflow-y: scroll;
 scrollbar-width: 5px;
 &::-webkit-scrollbar {
     height: 7px;
     width: 7px;
     background:white;
     border:0.5px solid #D9D9D9;
     border-radius:20px !important;
 }
 &::-webkit-scrollbar-thumb {
     height:5px;
     width:5px;
     background: ${Colors.primaryDark}; 
     border-radius: 20px;
 }
 &::-webkit-scrollbar-button{
     background:${Colors.primaryDark};
     width:3px;
     height:7px;
     border-radius:8px;
 }
//  -ms-overflow-style: none;
`

const ItemsTab = ({ theme, collectionID, updatedAt, nfts, tab, collectionCreator, creatorImage }) => {
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
    const [allItems, setAllItems] = useState(nfts)
    const [err, setErr] = useState(undefined)
    const [last_time, setLast_time] = useState(new Date().getTime())
    const [updated, setUpdated] = useState(false)
    const [propFilters, setPropFilters] = useState([])
    const [valueChecked, setValueChecked] = useState([])
    const [priceSelect, setPriceSelect] = useState(undefined)
    const handleValueCheck = (e) => {
        e.preventDefault()
        var totalItems = allItems
        var tempArr = valueChecked;
        if (tempArr.includes(e.target.id)) {
            const removeItem = tempArr.filter((item) => item != e.target.id);
            tempArr = removeItem
        }
        else {
            tempArr.push(e.target.id)
        }
        setValueChecked(tempArr)
        console.log(tempArr)
        if (tempArr.length > 0) {
            var tempIt = []
            for (var p = 0; p < totalItems.length; p++) {
                for (var t = 0; t < totalItems[p].extra.length; t++) {
                    if (tempArr.includes(totalItems[p].extra[t].value)) {
                        tempIt.push(totalItems[p])
                        // if (colChecked.length > 0) {
                        //     let temm = tempIt.filter((act) => colChecked.includes(act.collection_id))
                        //     tempIt = temm
                        // }
                    }
                }
            }
            // console.log('........',tempIt)
            setItems(tempIt)
        }
        else {
            setItems(totalItems)
        }
        if (tempArr.includes(e.target.id)) {
            document.getElementById(e.target.id).style.backgroundColor = '#46C263';
        } else {
            document.getElementById(e.target.id).style.backgroundColor = '#f9f9f9';
        }

    }
    const handlePriceSelect = (e) => {
        e.preventDefault()
        setPriceSelect(e.target.id)
        var tempa = []
        tempa = items
        if (e.target.id == 'price low to high') {
            tempa.sort(function (a, b) { return a.price - b.price });
            setItems(tempa)
        } else {
            tempa.sort(function (a, b) { return b.price - a.price });
            setItems(tempa)
        }
    }

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
            setLastUpdated(true)
            setItems(response.data)
            setAllItems(response.data)
            console.log('-------------------------', response)
            let new_time = new Date().getTime()
            setLast_time(new_time)


            // setLoading(false)
        }
        catch (err) {
            console.log(err)
            if (err.status == 404) {
                let new_time = new Date().getTime()
                setLast_time(new_time)

                setItems([])
                setAllItems([])
            }
            else {
                setErr("Internal server error")
            }
            // setLoading(false)
        }
    }
    useEffect(() => {
        if (allItems) {
            makePropertyFilterings(allItems)
            setLoading(false)
        }
    }, [allItems])

    const makePropertyFilterings = (items) => {
        var tempProps = []
        var tempNames = []
        var tempValues = []
        var tempRarity = []
        var tempObjj = {}
        for (let i = 0; i < items.length; i++) {
            if (items[i].extra.length > 0) {
                console.log(items[i].extra, 'llll')
                for (let j = 0; j < items[i].extra.length; j++) {
                    let alreadyThere = tempProps.find((prop) => prop.name == items[i].extra[j].name)
                    if (!alreadyThere) {
                        let tempObj = {}
                        tempObj.name = items[i].extra[j].name
                        tempObj.values = []
                        tempObj.values.push(items[i].extra[j].value)
                        tempProps.push(tempObj)
                    } else {
                        let tempObj = {}
                        tempObj = alreadyThere
                        if (!tempObj.values.includes(items[i].extra[j].value)) {
                            tempObj.values.push(items[i].extra[j].value)
                        }
                        let p = [...tempProps]
                        p[p.indexOf(alreadyThere)] = tempObj
                    }
                }
            }
        }
        setPropFilters(tempProps)
    }

    return (
        <div className="d-flex flex-column p-0 justify-content-between align-items-center">
            {/* top section */}

            <Filtering selectValue={priceSelect} handleSelection={handlePriceSelect} searchingWhat={'NFTs'} view={view} selectionId={'col-item-tab'} id={'colItemsSearch'} theme={theme} handleFilter={handleFilter} handleViewChange={handleViewChange} selectOptions={['price low to high', 'price high to low']} />



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
                            <div className="d-flex w-100 justify-content-center">
                                <Box className="d-flex flex-wrap" style={{ width: !openFilter ? "100%" : "70%", transition: { xs: '0ms', md: '500ms ease' } }}>
                                    {items.length == 0 ?
                                        <div className="w-100 d-flex justify-content-center align-items-center">
                                            <Typography sx={{ color: `${Colors.primaryMain}`, textAlign: 'center', my: 7, mx: 3 }}>No item found.</Typography>
                                        </div>
                                        :
                                        <>
                                            {items.map((item) => {
                                                return <ItemCard key={item._id.$oid} item={item} slider={false} view={view} itemImage={item.nft_image_path} itemID={item._id.$oid} theme={theme} name={item.title} price={item.price} creator={updated ? item.collection_info.collection_creator_username : collectionCreator} creatorImg={updated ? item.collection_info.collection_creator_avatar : creatorImage} />
                                            })}
                                        </>
                                    }
                                </Box>
                                {openFilter ? <FilterContainer style={{ width: "28%" }} className="my-0 d-none d-lg-flex">
                                    {propFilters && propFilters.length > 0 ?
                                        <>
                                            {propFilters.map((prop) => {
                                                return <Accordion className="py-1 px-3" sx={{
                                                    width: '100%',
                                                    bgcolor: 'transparent',
                                                    color: theme == 'light' ? "#333333" : "#e6e6e6",
                                                    border: 'none',
                                                    boxShadow: 'none',
                                                    '&:before': {
                                                        bgcolor: 'transparent',
                                                    }
                                                }}>
                                                    <AccordionSummary
                                                        className="p-0"
                                                        expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                                        aria-controls="panel1a-content"
                                                        id="panel1a-header"
                                                    >
                                                        <Typography sx={{ fontWeight: 500 }} className="d-flex align-items-center"><DocumentText className="me-2" />{prop.name}</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails className="p-0">
                                                        <ColUl className="menu p-0">
                                                            {prop.values.map((value) => {
                                                                return <li className="d-flex align-items-center my-3">
                                                                    <CheckPut className="me-2" style={{ backgroundColor: valueChecked.includes(value) ? '#46C263' : '#f9f9f9' }} id={value} onClick={handleValueCheck}><img id={value} src={TickPic} style={{ width: "20px", height: "20px", }} /></CheckPut>{value}
                                                                </li>
                                                            })}
                                                        </ColUl>
                                                    </AccordionDetails>
                                                </Accordion>
                                            })}
                                        </>
                                        :
                                        <div className="text-center my-5">no property to show</div>}
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
                        {propFilters && propFilters.length > 0 ?
                            <>
                                {propFilters.map((prop) => {
                                    return <Accordion className="py-0 px-0" sx={{
                                        width: '100%',
                                        bgcolor: 'transparent',
                                        color: theme == 'light' ? "#333333" : "#e6e6e6",
                                        border: 'none',
                                        boxShadow: 'none',
                                        '&:before': {
                                            bgcolor: 'transparent',
                                        }
                                    }}>
                                        <AccordionSummary
                                            className="p-0"
                                            expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography sx={{ fontWeight: 500 }} className="d-flex align-items-center"><DocumentText className="me-2" />{prop.name}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails className="p-0">
                                            <ColUl className="menu p-0">
                                                {prop.values.map((value) => {
                                                    return <li className="d-flex align-items-center my-2">
                                                        <CheckPut className="me-2" style={{ backgroundColor: valueChecked.includes(value) ? '#46C263' : '#f9f9f9' }} id={value} onClick={handleValueCheck}><img id={value} src={TickPic} style={{ width: "20px", height: "20px", }} /></CheckPut>{value}
                                                    </li>
                                                })}
                                            </ColUl>
                                        </AccordionDetails>
                                    </Accordion>
                                })}
                            </>
                            : <div className="text-center my-5">no property to show</div>
                        }
                    </Box>
                </Modal>
            </div>
        </div>
    );
}

export default ItemsTab;