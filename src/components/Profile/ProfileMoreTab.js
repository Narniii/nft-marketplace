import { Accordion, AccordionDetails, AccordionSummary, Box, Skeleton, Typography } from "@mui/material";
import { ArrowDown2, ArrowSquareRight, CloseSquare, DocumentDownload, FilterSearch, Logout } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { API_CONFIG } from "../../config";
import { countTimeAgo, shorten } from "../../utils/countingFunctions";
import { AUTH_API } from "../../utils/data/auth_api";
import { MARKET_API } from "../../utils/data/market_api";
import { GetUSDExchangeRate } from "../../utils/exChange";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { Colors } from "../design/Colors";
import NoItemFound from "../NoItem";
import SSelection from "../Selection";

const ItemsContainerSmall = styled.div`
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: ${({ theme }) => theme.itemCardsBackground};
    // border: ${({ theme }) => theme.searchBoxBorder};
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    padding: 12px 0px;
    width:100%;
    overflow-y:scroll;
    height:500px;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display:none;
    }
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
    padding:0 10px 10px 0;
    overflow:scroll;
    scrollbar-width: 5px;
    // -ms-overflow-style: none;
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
        // width:10px !important;
        background: ${Colors.primaryDark}; 
        border-radius: 20px;
    }
    &::-webkit-scrollbar-button{
        display:none;
    }
    
    `;
const Scrollable = styled.div`
    overflow-y:scroll;
    height:500px;
    transition:300ms ease;
    scrollbar-width: 5px;
    // -ms-overflow-style: none;
    &::-webkit-scrollbar {
        height: 7px;
        width: 7px;
        background:white;
        border:0.5px solid #D9D9D9;
        border-radius:20px !important;
    }
    &::-webkit-scrollbar-thumb {
        height:20px;
        background: ${Colors.primaryDark}; 
        border-radius: 10px;
    }
    &::-webkit-scrollbar-button{
        background:${Colors.primaryDark};
        height:3px;
        border-radius:20px !important;
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
    font-size:12px;

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
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;
    height:45px;
    width:45px;
    margin-right:1px;
    border-radius:8px;
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


const ProfileMoreTab = ({ theme, tab, userWallet }) => {
    let tabs = ['offers made', 'offers received']
    const [selectValue, setSelectValue] = useState(undefined)
    const [openFilter, setOpenFilter] = useState(false)
    const [madeOffers, setMadeOffers] = useState(undefined)
    const [receivedOffers, setReceivedOffers] = useState(undefined)
    const apiCall = useRef(undefined)
    const [loadErr, setLoadErr] = useState(undefined)
    const handleSelect = (e) => {
        setSelectValue(e.target.id)
        if (e.target.id == 'offers made') {
            getMadeOffers()
        }
        else {
            getReceivedOffers()
        }
    }
    useEffect(() => {
        // if (tab == 'more') 
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();

        }
    }, [tab])

    const getMadeOffers = async () => {
        try {
            apiCall.current = MARKET_API.request({
                path: `/nft/owner/offers/made/`,
                method: "post",
                body: { owner: userWallet },
            });
            let response = await apiCall.current.promise;
            console.log('made offers', response)
            if (!response.isSuccess)
                throw response
            setMadeOffers(response.data)

        }
        catch (err) {
            console.log(err)
            if (err.status == 404)
                setMadeOffers([])
            else if (err.status == 500) {
                setLoadErr("Internal server error occured, please try again later.")
            }
        }

    }
    const getReceivedOffers = async () => {
        try {
            apiCall.current = MARKET_API.request({
                path: `/nft/owner/offers/received/`,
                method: "post",
                body: { owner: userWallet },
            });
            let response = await apiCall.current.promise;
            console.log('received offers', response)
            if (!response.isSuccess)
                throw response
            setReceivedOffers(response.data)

        }
        catch (err) {
            console.log(err)
            if (err.status == 404)
                setReceivedOffers([])
            else if (err.status == 500) {
                setLoadErr("Internal server error occured, please try again later.")
            }
        }
    }
    const countExpireTime = (date) => {
        let this_time = new Date().getTime()
        let expire_time = new Date(date).getTime()
        let difference = (expire_time - this_time) / 1000
        let days = Math.floor(difference / 86400);
        let hours = Math.floor(difference / 3600) % 24;
        let minutes = Math.floor(difference / 60) % 60;
        let seconds = Math.floor(difference % 60);
        console.log(days, hours, minutes)
        if (days > 0) {
            return <span>{days + ' days'}</span>
        } else if (hours > 0) {
            return <span>{hours + ' hrs'}</span>
        } else if (minutes > 0) {
            return <span>{minutes + ' mins'}</span>
        }
        else return <span>expired</span>

    }
    const [usdExRate, setUsdExRate] = useState();
    const [ethExRate, setEthExRate] = useState();
    const [ethPrice, setEthPrice] = useState("");
    useEffect(() => {
        GetUSDExchangeRate().then((res) => {
            setUsdExRate(parseFloat(res));
            console.log("usd", parseFloat(res));
        });
    }, []);

    // open filtering =====>
    const handleFilter = () => {
        if (openFilter) setOpenFilter(false)
        else setOpenFilter(true)
    }
    const handleClose = () => setOpenFilter(false);
    // -----------------------------

    return (
        <div className="d-flex flex-column p-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col-9 col-sm-6 col-xl-4">
                    <SSelection id={'profile-more-tab'} width={'100%'} theme={theme} tabs={tabs} selectValue={selectValue} handleSelect={handleSelect} />
                </div>
                <div className="" style={{ width: "auto", padding: "4px 0 5px", cursor: "pointer" }} onClick={handleFilter}><FilterSearch /></div>
            </div>

            <div className="d-flex justify-content-between w-100">
                <Box className="d-flex flex-wrap justify-content-between" sx={{ width: !openFilter ? "100%" : "70%", transition: { xs: '0ms', md: '500ms ease' }, }}>
                    {selectValue == 'offers made' ?
                        <>
                            {madeOffers ?
                                <>
                                    {madeOffers.length > 0 ?
                                        <>
                                            <ItemsContainerSmall className="my-2 d-flex d-lg-none">
                                                {madeOffers.map((offer) => {
                                                    return (
                                                        <ProductCardSmall className="my-1">
                                                            <MainDetail>
                                                                <div className="d-flex align-items-center">
                                                                    <ItemImage style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${offer.nft_media.replace('root/dortzio/market/media/', '')}`)) }} />
                                                                    <div className="d-flex flex-column ms-1">
                                                                        <h6 className="m-0" style={{ fontWeight: 600 }}>{offer.nft_title}</h6>
                                                                        <Subtitle style={{ fontSize: '12px' }} className="m-0">floor difference</Subtitle>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex align-items-center">
                                                                    <div className="d-flex flex-column">
                                                                        <Price className="m-0">{offer.price} ETH</Price>
                                                                        <Recommend style={{ fontSize: "12px" }} className="m-0">{countExpireTime(offer.expiration)}<Logout size="12" /></Recommend>
                                                                    </div>
                                                                    <Price>
                                                                        <ArrowSquareRight />
                                                                    </Price>
                                                                </div>
                                                            </MainDetail>
                                                            <Line />
                                                            <Detail>
                                                                <div className="d-flex"><Subtitle>Made: </Subtitle><Price>{countTimeAgo(offer.date)}</Price></div>
                                                                <div className="d-flex"><Subtitle>To: </Subtitle><Recommend>{shorten(offer.to_wallet_address)}</Recommend></div>
                                                                <div className="d-flex"><Subtitle>USD price: </Subtitle><Price>{(parseFloat(offer.price) * usdExRate).toFixed(2) !== 'NaN' ? (parseFloat(offer.price) * usdExRate).toFixed(2) : "0"} $</Price></div>
                                                            </Detail>
                                                        </ProductCardSmall>
                                                    )
                                                })}
                                            </ItemsContainerSmall>
                                            <ItemsContainerDesktop className="my-2 d-none d-lg-flex">
                                                <div style={{ padding: "20px" }} className="my-1 d-flex justify-content-between">
                                                    <Subtitle style={{ width: "250px", }}>Offer</Subtitle>
                                                    <Subtitle style={{ width: "150px", }}>Price</Subtitle>
                                                    <Subtitle style={{ width: "200px", }}>USD Price</Subtitle>
                                                    <Subtitle style={{ width: "200px", }}>Floor Difference</Subtitle>
                                                    <Subtitle style={{ width: "150px", }}>To</Subtitle>
                                                    <Subtitle style={{ width: "150px", }}>Expiration</Subtitle>
                                                    <Subtitle style={{ width: "150px", }}>Received</Subtitle>
                                                </div>
                                                {madeOffers.map((offer) => {
                                                    return (
                                                        <ProductCardDesktop className="my-1">
                                                            <Recommend style={{ width: "250px", overflow: "hidden" }}><ItemImage style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${offer.nft_media.replace('root/dortzio/market/media/', '')}`)) }} />{offer.nft_title}</Recommend>
                                                            <Subtitle style={{ width: "150px", overflow: "hidden" }}>{offer.price} ETH</Subtitle>
                                                            <Subtitle style={{ width: "200px", }}>{(parseFloat(offer.price) * usdExRate).toFixed(2) !== 'NaN' ? (parseFloat(offer.price) * usdExRate).toFixed(2) : "0"} $</Subtitle>
                                                            <Subtitle style={{ width: "200px", }}>floor difference</Subtitle>
                                                            <Recommend style={{ width: "150px", overflow: "hidden" }}>{shorten(offer.to_wallet_address)}</Recommend>
                                                            <Subtitle style={{ width: "150px", overflow: "hidden" }}>{countExpireTime(offer.expiration)}</Subtitle>
                                                            <Subtitle style={{ width: "150px", overflow: "hidden" }}>{countTimeAgo(offer.date)}</Subtitle>
                                                        </ProductCardDesktop>
                                                    )
                                                })}
                                            </ItemsContainerDesktop>
                                        </>
                                        :
                                        <NoItemFound text={'no offer found'} />
                                    }
                                </>
                                : <Skeleton variant="round" sx={{ width: "100%", borderRadius: "24px", height: 400 }} />
                            }
                        </> :
                        selectValue == 'offers received' ?
                            <>
                                {receivedOffers ?
                                    <>
                                        {receivedOffers.length > 0 ?
                                            <>
                                                <ItemsContainerSmall className="my-2 d-flex d-lg-none">
                                                    {receivedOffers.map((offer) => {
                                                        return (
                                                            <ProductCardSmall className="my-1">
                                                                <MainDetail>
                                                                    <div className="d-flex align-items-center">
                                                                        <ItemImage style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${offer.nft_media.replace('root/dortzio/market/media/', '')}`)) }} />
                                                                        <div className="d-flex flex-column ms-1">
                                                                            <h6 className="m-0" style={{ fontWeight: 600 }}>{offer.nft_title}</h6>
                                                                            <Subtitle style={{ fontSize: '12px' }} className="m-0">floor difference</Subtitle>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="d-flex flex-column">
                                                                            <Price className="m-0">{offer.price} ETH</Price>
                                                                            <Recommend style={{ fontSize: "12px" }} className="m-0">{countExpireTime(offer.expiration)}<Logout size="12" /></Recommend>
                                                                        </div>
                                                                        <Price>
                                                                            <ArrowSquareRight />
                                                                        </Price>
                                                                    </div>
                                                                </MainDetail>
                                                                <Line />
                                                                <Detail>
                                                                    <div className="d-flex"><Subtitle>Received: </Subtitle><Price>{countTimeAgo(offer.date)}</Price></div>
                                                                    <div className="d-flex"><Subtitle>From: </Subtitle><Recommend>{shorten(offer.from_wallet_address)}</Recommend></div>
                                                                    <div className="d-flex"><Subtitle>USD price: </Subtitle><Price>{(parseFloat(offer.price) * usdExRate).toFixed(2) !== 'NaN' ? (parseFloat(offer.price) * usdExRate).toFixed(2) : "0"} $</Price></div>
                                                                </Detail>
                                                            </ProductCardSmall>
                                                        )
                                                    })}
                                                </ItemsContainerSmall>
                                                <ItemsContainerDesktop className="my-2 d-none d-lg-flex">
                                                    <div style={{ padding: "20px" }} className="my-1 d-flex justify-content-between">
                                                        <Subtitle style={{ width: "250px", }}>Offer</Subtitle>
                                                        <Subtitle style={{ width: "150px", }}>Price</Subtitle>
                                                        <Subtitle style={{ width: "200px", }}>USD Price</Subtitle>
                                                        <Subtitle style={{ width: "200px", }}>Floor Difference</Subtitle>
                                                        <Subtitle style={{ width: "150px", }}>From</Subtitle>
                                                        <Subtitle style={{ width: "150px", }}>Expiration</Subtitle>
                                                        <Subtitle style={{ width: "150px", }}>Received</Subtitle>
                                                    </div>
                                                    {receivedOffers.map((offer) => {
                                                        return (
                                                            <ProductCardDesktop className="my-1">
                                                                <Recommend style={{ width: "250px", overflow: "hidden" }}><ItemImage style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${offer.nft_media.replace('root/dortzio/market/media/', '')}`)) }} />{offer.nft_title}</Recommend>
                                                                <Subtitle style={{ width: "150px", overflow: "hidden" }}>{offer.price} ETH</Subtitle>
                                                                <Subtitle style={{ width: "200px", }}>{(parseFloat(offer.price) * usdExRate).toFixed(2) !== 'NaN' ? (parseFloat(offer.price) * usdExRate).toFixed(2) : "0"} $</Subtitle>
                                                                <Subtitle style={{ width: "200px", }}>floor difference</Subtitle>
                                                                <Recommend style={{ width: "150px", overflow: "hidden" }}>{shorten(offer.from_wallet_address)}</Recommend>
                                                                <Subtitle style={{ width: "150px", overflow: "hidden" }}>{countExpireTime(offer.expiration)}</Subtitle>
                                                                <Subtitle style={{ width: "150px", overflow: "hidden" }}>{countTimeAgo(offer.date)}</Subtitle>
                                                            </ProductCardDesktop>
                                                        )
                                                    })}
                                                </ItemsContainerDesktop>
                                            </>
                                            :
                                            <NoItemFound text={'no offer found'} />
                                        }
                                    </>
                                    : <Skeleton variant="round" sx={{ width: "100%", borderRadius: "24px", height: 400 }} />
                                }
                            </>
                            :
                            <>

                            </>
                    }
                </Box>
                {openFilter ? <FilterContainer style={{ width: "28%" }} className="d-none d-lg-flex">
                </FilterContainer>
                    : undefined}

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
                        {/* <ModalLine className="my-2" /> */}
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

export default ProfileMoreTab;