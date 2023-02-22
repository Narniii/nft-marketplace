import React, { useEffect, useRef, useState } from "react";
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, Popper, Typography } from "@mui/material";
import { ArrowUp2, Bag2, CardSend, EmojiNormal, GlobalSearch, HambergerMenu, Profile, ProfileDelete, SearchNormal1, SearchZoomIn, SearchZoomIn1, Trash, Wallet2, Youtube } from "iconsax-react";
import '../../styles.css'
// import styled from "styled-components";
import testPic from '../../assets/testpic.png'
import { Colors } from "../design/Colors";
import { styled } from "@mui/system";
import { ButtonLarge } from "../design/Buttons";
import { useDispatch, useSelector } from "react-redux";
import ReviewImg from '../../assets/Onreview.svg'
import Notification from "../design/Notification";
import { removeItem } from "../../redux/actions";


const ItemImage = styled(Box)`
  background-image: url(${testPic});
  background-size:contain;
  background-repeat:no-repeat;
  background-position:center;
  position:relative;
  height:70px;
  width:70px;
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
//   color:${Colors.gray7} !important;
  height: 70px;
  border-radius: 24px 0px 0px 24px;
//   background-color: #e6e6e6;
  cursor:pointer;
  width:45px;
  display:none;
  @media screen and (max-width: 992px) {
    background-color:transparent;
    display:flex;
  }
  &:hover{
    color:${Colors.errorDark} !important;
    background-color: ${Colors.errorLight};
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
}
`;
const ItemCard = styled(Box)`
//   background-color:${({ theme }) => theme.itemCardsBackground};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius:12px;
  width:100%;
//   overflow:hidden;
  cursor:pointer;
  &:hover .trashHolder{
    display:flex;
  }
  &:hover .desktopPrice{
    display:none !important;
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
    padding:5%;
    height:20px;
    // background-color:${({ theme }) => theme.itemCardsBackground};
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:12px;
`;



const VisibleLine = styled(Box)`
    background: linear-gradient(90deg,#60606000 0%, #80808080 50%,#918A7A00 100%);
    height:1px;
    align-self:center;
    width:60%;
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


    const [openReview, setOpenReview] = useState(false)
    const shoppingCart = useSelector(state => state.cartReducer);
    console.log(shoppingCart)
    const handleClose = () => setOpenReview(false)
    // const getTotalQuantity = () => {
    //     let total = 0
    //     shoppingCart.products.forEach(item => {
    //         total += item.quantity
    //     })
    //     return total
    // }
    const getTotalPrice = () => {
        let total = 0
        shoppingCart.products.forEach(item => {
            total += parseFloat(item.price)
        })
        return total
    }



    const list = (anchor) => (
        <Box
            sx={{
                border: theme == 'light' ? "0.2px solid #e6e6e6" : "0.2px solid #332E5F",
                // boxShadow: theme == 'light' ? "2px 5px 13px 1px rgba(77,77,77,0.54)" : "-2px 5px 13px 1px rgba(153,81,244,0.54)",
                bgcolor: theme == 'light' ? "#ffffff" : "#272448", color: theme == 'light' ? "#333333" : "#e6e6e6", width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100%', borderRadius: anchor === 'right' ? "24px" : "0", borderTopLeftRadius: "24px", borderTopRightRadius: "24px",
                overflow: "hidden"
            }}
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div className="d-flex px-2 py-3">
                <Bag2 /><p style={{ fontWeight: 600 }} className="m-0">&nbsp;Your Cart</p>
            </div>

            <Divider className="mb-2" />
            <div className="d-flex p-2">
                <p style={{ fontWeight: 600 }} className="m-0">{shoppingCart.products.length}</p><p className="m-0">&nbsp;items</p>
            </div>
            <List>
                {shoppingCart.products.map((item, index) => (
                    <ListItem className="p-2" key={item} disablePadding sx={{ justifyContent: "center" }}>
                        <ItemCard className="d-flex col-12 p-0 m-0 justify-content-between" >
                            <div
                                // style={{ height: "70px" }}
                                className="d-flex p-0 col-10">
                                <ItemImage className="col-2 p-0"
                                // style={{ backgroundImage: `url(${testPic})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", width: "70px", height: "70px", borderRadius: "12px" }}
                                >{item.quantity > 1 ? <Quantt sx={{ backgroundColor: theme == 'light' ? '#e6e6e6' : '#433D7E', }}>{item.quantity}</Quantt> : undefined}</ItemImage>
                                <div className="col-10 px-1 d-flex flex-column flex-lg-row justify-content-between" style={{ height: "70px" }} >
                                    <div className="d-flex flex-column justify-content-between">
                                        <h6 className="m-0" style={{ fontWeight: 600 }}>{item.name}</h6>
                                        <p className="m-0" style={{ fontSize: '10px' }} >detail</p>
                                        <p className="m-0 d-flex d-lg-none">
                                            <Typography sx={{ fontWeight: "bold", fontSize: { xs: '12px', lg: '16px' } }}>{item.price}</Typography>
                                            <Typography
                                                sx={{ color: theme == 'light' ? `${Colors.gray5}` : `${Colors.gray3}`, fontSize: { xs: '12px', lg: '16px' } }} className="me-1">ETH</Typography>
                                        </p>
                                        <Notification onClick={() => setOpenReview(true)} />
                                    </div>
                                </div>
                            </div>
                            <p className="desktopPrice m-0 d-none d-lg-flex">
                                <Typography sx={{ fontWeight: "bold", fontSize: { xs: '12px', lg: '16px' } }}>{item.price}</Typography>
                                <Typography
                                    sx={{ color: theme == 'light' ? `${Colors.gray5}` : `${Colors.gray3}`, fontSize: { xs: '12px', lg: '16px' } }} className="me-1">ETH</Typography>
                            </p>
                            <TrashHolder onClick={() => remove({ id: item.id })}
                                className="trashHolder p-1 col-2 text-center justify-content-center align-items-center"
                                sx={{ color: theme == 'light' ? `${Colors.gray7}` : `${Colors.gray1}`, backgroundColor: theme == 'light' ? `${Colors.gray1}` : `${Colors.dark4}` }}>
                                <Trash />
                            </TrashHolder>
                        </ItemCard>
                    </ListItem>
                ))}
            </List>
            <Divider className="mb-2" />
            <CartDetail style={{ backgroundColor: theme == 'light' ? '#F9F9F9' : '#332E5F', }}>
                <div className="d-flex p-0 justify-content-between align-items-center">
                    <p className="m-0" style={{ fontWeight: "bold" }}>Total Price</p>
                    <p className="d-flex m-0" style={{ fontWeight: "bold", }}>{getTotalPrice()}<Subtitle sx={{ color: "#808080" }}>&nbsp;ETH</Subtitle></p>
                </div>
                <div className="d-flex p-0 justify-content-between align-items-center">
                    <p className="d-flex m-0 align-items-center" style={{ fontWeight: "bold", }}><CardSend size="18" />&nbsp; Send to a different wallet</p>
                    <p className="m-0"><ArrowUp2 size="15" /></p>
                </div>
                <ButtonLarge>Complete Purchase</ButtonLarge>
            </CartDetail>
            {/* <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <EmojiNormal /> : <Youtube />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List> */}
        </Box>
    );

    return (
        <>
            {/* tablet and mobile basket */}
            <Drawer
                className="d-flex d-lg-none"
                BackdropProps={{ invisible: true }}
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

            {/* <Drawer
                BackdropProps={{ invisible: true }}
                disableScrollLock={true}
                PaperProps={{
                    elevation: 0, style: {
                        backgroundColor: "transparent",
                        // ,overflowX: 'hidden', 

                    }
                }}
                // sx={{ overflowX: 'hidden', height: "100%" }}
                sx={{
                    overflow: "auto",
                }}
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
            >
                {list('right')}
            </Drawer> */}


            <Popper className="d-none d-lg-flex" open={cartDesOpen} anchorEl={anchorEl} placement={"top-end"} disableScrollLock={true}
            >
                <Box sx={{
                    transform: 'translateY(26px)',
                    borderRadius: "24px",
                    width: 400,
                    bgcolor: theme == 'light' ? "#ffffff" : "#272448",
                    p: 0,
                    overflow: "hidden",
                    boxShadow: theme == 'light' ? '0px 3px 10px rgba(0, 0, 0, 0.07)' : "unset",
                }}
                    className="d-flex flex-column">
                    {list('right')}

                </Box>
            </Popper>



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