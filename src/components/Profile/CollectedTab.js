import { Accordion, AccordionDetails, AccordionSummary, Box, Modal, Skeleton, Typography } from "@mui/material";
import { ArrowDown2, ArrowSwapVertical, CloseSquare, DocumentText, FilterSearch, Grid1, Grid2, Grid5, HambergerMenu } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MARKET_API } from "../../utils/data/market_api";
import ItemCard from "../Cards/ItemCard";
import { Colors } from "../design/Colors";
import { Filtering } from "../Filtering";
import SearchBox from "../Navbar/SearchBox";
import SSelection from "../Selection";
import noItemBG from '../../assets/noItem.svg'
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
const NoItem = styled.div`
    background-image: url(${noItemBG});
    background-size:contain;
    background-repeat:no-repeat;
    background-position:center;
    border-radius:24px;
    background-color:${({ theme }) => theme.collectionCardHover};
    height:300px;
    width:300px;
`;
const BG = styled.div`
    border-radius:24px;
    background-color:${({ theme }) => theme.collectionCardHover};
    height:500px;
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
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
const Collected = ({ theme, userWallet, tab }) => {
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
    const [allItems, setAllItems] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const [propFilters, setPropFilters] = useState([])
    const [valueChecked, setValueChecked] = useState([])
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
                    }
                }
            }
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
    const [priceSelect, setPriceSelect] = useState(undefined)
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
        if (tab == 'collected')
            fetchItems()
        return () => {
            if (apiCall.current != undefined)
                apiCall.current.cancel();

        }
    }, [tab])

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
            setAllItems(response.data)
            // setLoading(false)
        }
        catch (err) {
            console.log(err)
            if (err.status == 404) {
                setItems([])
                setAllItems([])
            }
            else if (err.status == 500) {
                setErr("Internal server error")
            }
            // setLoading(false)
        }
    }

    // useEffect(() => {
    //     if (items)
    //         setLoading(false)
    // }, [items])


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
            if (items[i].extra && items[i].extra.length > 0) {
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


    return (<div className="d-flex flex-column">

        <Filtering selectValue={priceSelect} handleSelection={handlePriceSelect} searchingWhat={'NFTs'} id={'profileCollectedSearch'} view={view} selectionId={'collected-tab'} theme={theme} handleFilter={handleFilter} handleViewChange={handleViewChange} selectOptions={['price low to high', 'price high to low']} />

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
                            <BG>
                                <NoItem />
                                <Typography sx={{ color: `${Colors.gray4}`, textAlign: 'center', justifySelf: "center", width: "100%" }}>No collected item found.</Typography>
                            </BG>
                            :
                            <>
                                {items.map((item) => {
                                    return <ItemCard creatorImg={item.collection_creator_avatar} item={item} slider={false} view={view} itemImage={item.nft_image_path} time={item.updated_at.$date} itemID={item._id.$oid} theme={theme} name={item.title} price={item.price} creator={item.collection_creator_username} />
                                })}
                            </>
                        }
                    </>
                }
            </div>
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
    </div>);
}

export default Collected;