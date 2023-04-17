import React, { useEffect, useRef, useState } from "react";
import { Box, Divider, Drawer, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, Popper, Skeleton, Typography } from "@mui/material";
import { Add, AddCircle, ArrowUp2, Bag2, CardSend, CloseSquare, EmojiNormal, GlobalSearch, HambergerMenu, Minus, Profile, ProfileDelete, SearchNormal1, SearchZoomIn, SearchZoomIn1, Trash, Wallet2, Youtube } from "iconsax-react";
import '../../styles.css'
// import styled from "styled-components";
import { Colors } from "../design/Colors";
import { styled } from "@mui/system";
import { ButtonLarge } from "../design/Buttons";
import { useDispatch, useSelector } from "react-redux";
import ReviewImg from '../../assets/Onreview.svg'
import Notification from "../design/Notification";
import { decrementQuantity, emptyCart, incrementQuantity, removeItem, setCart } from "../../redux/actions";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { API_CONFIG } from "../../config";
import { shortenMedium } from "../../utils/countingFunctions";
import { MARKET_API } from "../../utils/data/market_api";
import { useNFTMarketplace } from "../../NFTMarketplaceContext";


const ItemImage = styled(Box)`
  background-size:cover;
  background-repeat:no-repeat;
  background-position:center;
  position:relative;
  border-radius:8px;
  height:100px;
  align-self:center;
  width:100px;
  @media screen and (max-width: 992px) {
    height:70px;
    width:70px;
      };

`;
const ReviewImage = styled(Box)`
  background-image: url(${ReviewImg});
  background-size:contain;
  background-repeat:no-repeat;
  background-position:center;
  height:130px;
  width:130px;

`;
const TrashHolder = styled(Box)`
  height: 120px;

  align-self:center;
  border-radius: 24px;
  cursor:pointer;
  width:45px;
  display:none;
  @media screen and (max-width: 992px) {
    background-color:transparent;
    display:flex;
    height: 100px;
    border-radius: 24px 0 0 24px;
  }
  &:hover{
    color:${Colors.errorDark} !important;
    background-color: ${Colors.errorLight};
  }
`;
const QuantHolder = styled(Box)`
  height: 120px;
  align-self:center;
  border-radius: 24px  24px;
  cursor:pointer;
  width:45px;
  display:none;
  @media screen and (max-width: 992px) {
    background-color:transparent;
    display:flex;
    height: auto;
    width:auto;
  }
`;
const CartDetail = styled(Box)`
 border-top-left-radius: 24px;
 border-top-right-radius: 24px;
//  background-color: ${Colors.gray0};
 height: 200px;
 display:flex;
 flex-direction:column;
 justify-content:space-between;
 padding:10px 20px;
//  position:fixed;
//  bottom:0;
 width:100%;
}
`;
const ItemCard = styled(Box)`
//   background-color:${({ theme }) => theme.itemCardsBackground};
  display: flex;
  flex-direction: row;
//   height:110px;
  justify-content: space-between;
  border-radius:24px;
  width:100%;
//   overflow:hidden;
  cursor:pointer;
  &:hover .trashHolder{
    display:flex;
  }
  &:hover .desktopPrice{
    display:none !important;
  }
  @media screen and (max-width: 992px) {
    border-radius:0;
    }
  `;
const Subtitle = styled('p')`
  color: ${({ theme }) => theme.par} !important;
  display:flex;
  align-items:center;
  margin:0;
  font-weight:400 !important;
`
const Quantt = styled(Box)`
    position:absolute;
    border-radius:50px;
    top:-10%;
    right:5%;
    padding:7px;
    height:20px;
    // width:20px;
    // background-color:${({ theme }) => theme.itemCardsBackground};
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:12px;
`;

const CircleAround = styled(Box)`
border-radius:50%;
width:30px;
height:30px;
display:flex;
justify-content:center;
align-items:center;
`

const VisibleLine = styled(Box)`
    background: linear-gradient(90deg,#60606000 0%, #80808080 50%,#918A7A00 100%);
    height:1px;
    align-self:center;
    width:60%;
    justify-self:center;
`;
const ReviewHead = styled(Box)`
border-radius:24px;
height:200px;
display:flex;
flex-direction:column;
padding:10px 20px;
justify-content:center;
align-items:center;
`;
const ReviewBody = styled(Box)`
border-radius:24px;
display:flex;
flex-direction:column;
padding:10px 20px;
border:1px solid;
`;
const PurpleName = styled(Typography)`
color:${Colors.primaryMain};
text-decoration:underline;
`

export const Cart = ({ theme, state, toggleDrawer, open, onClose, anchorEl, cartDesOpen }) => {
    const dispatch = useDispatch();
    const remove = (item) => dispatch(removeItem(item));

    const [exceedQuanErr, setExceedQuanErr] = useState(undefined)
    const apiCall = useRef(undefined)
    const [err, setErr] = useState(undefined)
    const [openReview, setOpenReview] = useState(false)
    const [basket, setBasket] = useState(undefined)
    const [priceIsChanged, setPriceIsChanged] = useState(false)
    const [loading, setLoading] = useState(true)
    const shoppingCart = useSelector(state => state.cartReducer);
    const { completePurchase } = useNFTMarketplace();

    console.log(shoppingCart)
    const handleClose = () => setOpenReview(false)
    // const getTotalQuantity = () => {
    //     let total = 0
    //     shoppingCart.products.forEach(item => {
    //         total += item.quantity
    //     })
    //     return total
    // }
    // useEffect(() => {
    //     removeAll()
    // }, [])



    const getBasket = async () => {
        try {
            apiCall.current = MARKET_API.request({
                path: `/basket/register/`,
                method: "post",
                body: {
                    buyer_info: {
                        wallet_address: "",
                        username: "",
                        buyer_id: localStorage.getItem('device-id')
                    }
                },
            });
            let response = await apiCall.current.promise;
            console.log('basket????', response)
            if (!response.isSuccess)
                throw response
            setBasket(response.data.nfts)
            dispatch(setCart(response.data.nfts))
            localStorage.setItem('basket_id', response.data._id.$oid)
            setLoading(false)
        }
        catch (err) {
            if (err.status == 404) {
                setBasket([])
                dispatch(setCart([]))
            }
            else if (err.status == 500) {
                setErr("Internal server error occured, please try again later.")
            }
            setLoading(false)
        }
    }

    useEffect(() => {
        getBasket()


        return () => {
            if (apiCall.current != undefined)
                apiCall.current.cancel();
        }


    }, [])

    const getTotalPrice = (bs) => {
        let total = 0
        bs.forEach(item => {
            total += (parseFloat(item.price) * parseInt(item.quantity))
        })
        return total.toFixed(3)
    }
    const addQuantity = (item) => {
        if (item.quantity < item.copies) {
            dispatch(incrementQuantity(item))
        }

    }
    const minQuantity = (item) => {
        if (item.quantity == 1) {
            dispatch(removeItem(item))
        } else {
            dispatch(decrementQuantity(item))
        }
    }

    const removeAll = () => dispatch(emptyCart());

    const completePurchases = async () => {
        console.log('????')
        let product = { nft_index: 12, royaltyRecs: ['0x70997970C51812dc3A010C7d01b50e0d17dc79C8'], royaltyAmounts: [5], quantity: 1, price: '0.2' }
        let tx = await completePurchase(product)
        let tx_hash = tx.hash ? tx.hash : undefined

        if (tx_hash) {
            console.log(tx_hash)
        } else {
            console.log('riiiidiiii')
        }
    }

    const list = (anchor) => (
        <Box
            sx={{
                border: theme == 'light' ? "0.2px solid #e6e6e6" : "0.2px solid #332E5F",
                // boxShadow: theme == 'light' ? "2px 5px 13px 1px rgba(77,77,77,0.54)" : "-2px 5px 13px 1px rgba(153,81,244,0.54)",
                bgcolor: theme == 'light' ? "#ffffff" : "#272448", color: theme == 'light' ? "#333333" : "#e6e6e6",
                width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400, borderRadius: anchor === 'right' ? "24px" : "0", borderTopLeftRadius: "24px", borderTopRightRadius: "24px",
                overflow: "hidden", display: "flex", flexDirection: "column",
                // height: 600,
            }}
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
        >
            <div className="d-flex justify-content-between align-items-center px-3 py-3">
                <div className="d-flex align-items-center">
                    <Bag2 /><p style={{ fontWeight: 600 }} className="m-0">&nbsp;Your Cart</p>
                </div>
                <CloseSquare cursor='pointer' onClick={toggleDrawer(anchor, false)} />
            </div>
            <VisibleLine className="mb-2" />
            <div className="d-flex py-2 px-3 w-100 justify-content-between align-items-center">
                <div className="d-flex">
                    <p style={{ fontWeight: 600 }} className="m-0">{shoppingCart.products.length}</p><p className="m-0">&nbsp;items</p>
                </div>
                {shoppingCart.products.length > 0 ?
                    <p style={{ fontWeight: 500, color: Colors.errorDark, fontSize: "14px", cursor: "pointer" }} onClick={removeAll} className="m-0">Clear All</p>
                    : undefined}
            </div>
            <List sx={{
                height: 300, overflowY: "scroll",
                '-ms-overflow-style': 'none',
                '&::-webkit-scrollbar': {
                    display: "none"
                }
            }}>
                {shoppingCart.products.map((item, index) => (
                    <ListItem className="p-0" key={item} disablePadding sx={{ justifyContent: "center", }}>
                        <ItemCard className="d-flex col-12 p-0 m-0 justify-content-between" sx={{ '&:hover': { backgroundColor: theme == 'light' ? `${Colors.gray0}` : `${Colors.dark3}` } }}>
                            <div className="d-flex" style={{ padding: '10px' }}>
                                <ItemImage style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${item.media.replace('root/dortzio/market/media/', '')}`)) }} className="col-2 p-0 me-2">
                                    {item.quantity > 1 ? <Quantt sx={{ backgroundColor: theme == 'light' ? '#e6e6e6' : '#433D7E', }}>{item.quantity}</Quantt> : undefined}
                                </ItemImage>
                                <div className="col-6 px-1 d-flex flex-column flex-lg-row justify-content-between"
                                // style={{ height: "70px" }}
                                >
                                    <div className="d-flex flex-column justify-content-between">
                                        <div className="d-flex flex-column">
                                            <h6 className="m-0 mb-lg-2" style={{ fontWeight: 600, textTransform: "capitalize" }}>{item.title}</h6>
                                            <p className="m-0" style={{ fontSize: '10px', textTransform: "capitalize", color: theme == 'light' ? `${Colors.gray5}` : `${Colors.gray2}` }} >{shortenMedium(item.description)}</p>
                                        </div>
                                        <p className="m-0 d-flex d-lg-none">
                                            <Typography sx={{ fontWeight: "bold", fontSize: { xs: '12px', lg: '16px' }, }}>{item.price == " " ? 0 : (parseInt(item.quantity) * parseFloat(item.price)).toFixed(3)}&nbsp;</Typography>
                                            <Typography
                                                sx={{ color: theme == 'light' ? `${Colors.gray5}` : `${Colors.gray3}`, fontSize: { xs: '12px', lg: '16px' } }} className="me-1">ETH</Typography>
                                        </p>
                                        <Notification onClick={() => setOpenReview(true)} />
                                    </div>
                                </div>
                            </div>
                            <p className="desktopPrice m-0 mt-2 d-none d-lg-flex">
                                <Typography sx={{ fontWeight: "bold", fontSize: { xs: '12px', lg: '16px' }, }}>{item.price == " " ? 0 : (parseInt(item.quantity) * parseFloat(item.price)).toFixed(3)}&nbsp;</Typography>
                                <Typography
                                    sx={{ color: theme == 'light' ? `${Colors.gray5}` : `${Colors.gray3}`, fontSize: { xs: '12px', lg: '16px' } }} className="me-1">ETH</Typography>
                            </p>
                            {item.copies > 0 ?
                                <QuantHolder className="me-2 me-lg-0 trashHolder flex-row-reverse flex-lg-column align-items-center justify-content-center" sx={{ color: theme == 'light' ? `${Colors.gray7}` : `${Colors.gray1}`, backgroundColor: theme == 'light' ? `${Colors.gray1}` : `${Colors.dark4}` }}>
                                    <CircleAround onClick={() => addQuantity(item)}
                                        sx={{
                                            backgroundColor: theme == 'light' ? 'white' : `${Colors.dark3}`,
                                            '@media screen and (max-width: 992px)': {
                                                backgroundColor: theme == 'light' ? `${Colors.gray1}` : `${Colors.dark4}`,
                                            }
                                        }}>
                                        <Add />
                                    </CircleAround>
                                    <InputBase
                                        onChange={(e) => {
                                            let i = { ...item };
                                            if (e.target.value > item.copies) {
                                                i.quantity = item.copies
                                                setExceedQuanErr(item.copies)
                                            } else {
                                                i.quantity = e.target.value;
                                                setExceedQuanErr(undefined)
                                            }
                                            console.log(i)
                                        }}
                                        inputProps={{ 'aria-label': '' }}
                                        value={exceedQuanErr ? exceedQuanErr : item.quantity}
                                        defaultValue={item.quantity}
                                        placeholder={item.copies}
                                        className="m-1 p-2" sx={{
                                            fontSize: "14px", display: 'flex', justifyContent: "center", textAlign: 'center', borderRadius: '10px', width: '30px', height: '30px',
                                            color: theme == 'light' ? `${Colors.gray5}` : `${Colors.gray3}`, backgroundColor: theme == 'light' ? 'white' : `${Colors.dark3}`,
                                            '@media screen and (max-width: 992px)': {
                                                backgroundColor: theme == 'light' ? `${Colors.gray1}` : `${Colors.dark4}`,
                                                // width: 'auto'
                                            }
                                            ,
                                        }} />
                                    <CircleAround onClick={() => minQuantity(item)} sx={{
                                        backgroundColor: theme == 'light' ? 'white' : `${Colors.dark3}`,
                                        '@media screen and (max-width: 992px)': {
                                            backgroundColor: theme == 'light' ? `${Colors.gray1}` : `${Colors.dark4}`,
                                        }
                                    }}>
                                        {item.quantity > 1 ? <Minus /> : <Trash />}
                                    </CircleAround>
                                </QuantHolder>
                                :
                                <TrashHolder onClick={() => remove(item)}
                                    className="trashHolder p-1 col-2 text-center justify-content-center align-items-center"
                                    sx={{ color: theme == 'light' ? `${Colors.gray7}` : `${Colors.gray1}`, backgroundColor: theme == 'light' ? `${Colors.gray1}` : `${Colors.dark4}` }}>
                                    <Trash />
                                </TrashHolder>
                            }
                        </ItemCard>
                    </ListItem>
                ))}
            </List>
            <VisibleLine className="mb-2" />
            <CartDetail style={{ backgroundColor: theme == 'light' ? '#F9F9F9' : '#332E5F', }}>
                <div className="d-flex p-0 justify-content-between align-items-center">
                    <p className="m-0" style={{ fontWeight: 500 }}>Total Price</p>
                    <p className="d-flex m-0" style={{ fontWeight: 500, }}>{getTotalPrice(shoppingCart.products)}<Subtitle sx={{ color: "#808080" }}>&nbsp;ETH</Subtitle></p>
                </div>
                <div className="d-flex p-0 justify-content-between align-items-center">
                    <p className="d-flex m-0 align-items-center" style={{ fontWeight: 500, }}><CardSend size="18" />&nbsp; Send to a different wallet</p>
                    <p className="m-0"><ArrowUp2 size="15" /></p>
                </div>
                <ButtonLarge onClick={completePurchases}>Complete Purchase</ButtonLarge>
            </CartDetail>
        </Box >
    );

    return (
        <>
            {/* tablet and mobile basket */}
            <Drawer
                className="d-flex d-lg-none"
                // BackdropProps={{ invisible: true }}
                disableScrollLock={true}
                PaperProps={{
                    elevation: 0, style: {
                        backgroundColor: "transparent",
                    }
                }}
                anchor={'bottom'}
                open={state['bottom']}
                onClose={toggleDrawer('bottom', false)}
            >
                {list('bottom')}
            </Drawer>

            {/* desktop basket  */}

            <Drawer
                className="d-none d-lg-flex"
                // BackdropProps={{ invisible: true }}
                PaperProps={{
                    elevation: 0, sx: {
                        backgroundColor: "transparent",
                        top: { xs: '56px', sm: '84px' },
                        right: { xs: '16px', sm: '32px' },
                        //  transform: { xs: 'translateY(-16px,56px)', sm: 'translate(-32px,84px)' },
                    }
                }}
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
                disableScrollLock={true}
            >
                <Box sx={{
                    // transform: { xs: 'translateY(-16px,56px)', sm: 'translate(-32px,84px)' },
                    borderRadius: "24px",
                    width: 432,
                    height: "auto",
                    // bgcolor: theme == 'light' ? "#ffffff" : "#272448",
                    p: 0,
                    overflow: "hidden",
                    boxShadow: theme == 'light' ? '0px 3px 10px rgba(0, 0, 0, 0.07)' : "unset",
                    alignItems: 'end'
                }}
                    className="d-flex flex-column">
                    {list('right')}

                </Box>
            </Drawer>

            <ReviewItem openReview={openReview} handleClose={handleClose} theme={theme} />
        </>
    );
}




export const ReviewItem = ({ openReview, handleClose, theme }) => {
    return (

        <Modal
            open={openReview}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            // className="d-md-none"
            // inputProps={{MenuProps: {disableScrollLock: true}}}
            disableScrollLock={true}
        >
            <Box sx={{
                width: '60%',
                // height: '50%',
                borderRadius: "24px",
                position: "absolute",
                top: "25%",
                left: "25%",
                p: 4,
                bgcolor: theme == 'light' ? "#ffffff" : "#272448",
                '@media screen and (max-width: 600px)': {
                    width: '100%',
                    left: "0",
                    bottom: "-1px",
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,

                },
            }} className="d-flex flex-column">
                <ReviewHead className="mb-2" sx={{ bgcolor: theme == 'light' ? "#f9f9f9" : "#332E5F", }}>
                    <ReviewImage />
                </ReviewHead>
                <ReviewBody sx={{ borderColor: theme == 'light' ? "#e6e6e6" : "#433D7E", }}>
                    <div className="mb-1 d-flex justify-content-between"><Typography>Collection Name:</Typography><PurpleName>Pastel Waves</PurpleName></div>
                    <div className="mb-1 d-flex justify-content-between"><Typography>creator:</Typography><PurpleName>narniii</PurpleName></div>
                    <div className="mb-1 d-flex justify-content-between"><Typography>total sales:</Typography><Typography>397 sales</Typography></div>
                    <div className="mb-1 d-flex justify-content-between"><Typography>total volume:</Typography><Typography>10 ETH</Typography></div>
                    <div className="mb-4 d-flex justify-content-between"><Typography>soacial links:</Typography><Typography className="d-flex"><GlobalSearch className="ms-1" /><GlobalSearch className="ms-1" /><GlobalSearch className="ms-1" /><GlobalSearch className="ms-1" /><GlobalSearch className="ms-1" /><GlobalSearch className="ms-1" /></Typography></div>
                    <VisibleLine />
                    <Typography className="text-center mt-4 mb-2" sx={{ cursor: "pointer", color: `${Colors.primaryMain}` }}><SearchZoomIn1 /> Show more</Typography>
                </ReviewBody>
            </Box>
        </Modal>

    )
}