import React, { useEffect, useRef, useState } from "react";
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Bag2, EmojiNormal, HambergerMenu, Profile, ProfileDelete, SearchNormal1, Trash, Wallet2, Youtube } from "iconsax-react";
import '../../styles.css'
// import styled from "styled-components";
import testPic from '../../assets/testpic.png'
import { Colors } from "../design/Colors";
import { styled } from "@mui/system";



const ItemImage = styled(Box)`
  background-image: url(${testPic});
  background-size:contain;
  background-repeat:no-repeat;
  background-position:center;
  height:70px;
  width:70px;
`;
const TrashHolder = styled(Box)`
  color:${Colors.gray7} !important;
  height: 70px;
  border-radius: 24px 0px 0px 24px;
  background-color: #e6e6e6;
  cursor:pointer;
  display:none;
  @media screen and (max-width: 768px) {
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
 background-color: ${Colors.gray0};
 height: 200px;
}
`;
const ItemCard = styled(Box)`
  background-color:${({ theme }) => theme.itemCardsBackground};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius:12px;
  width:100%;
  overflow:hidden;
  cursor:pointer;
  &:hover .trashHolder{
    display:flex;
  }


  `;

export const Cart = ({ theme, state, toggleDrawer, open, onClose, }) => {
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300, borderRadius: anchor === 'right' ? "24px" : "0", borderTopLeftRadius: "24px", borderTopRightRadius: "24px", backgroundColor: "white", overflow: "hidden" }}
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div className="d-flex px-2 py-3">
                <Bag2 /><p style={{ fontWeight: 600 }} className="m-0">&nbsp;Your Cart</p>
            </div>

            <Divider className="mb-2" />
            <div className="d-flex p-2">
                <p style={{ fontWeight: 600 }} className="m-0">6</p><p className="m-0">&nbsp;items</p>
            </div>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem className="p-2" key={text} disablePadding sx={{ justifyContent: "center" }}>
                        <ItemCard className="row col-12 p-0 m-0 justify-content-between" >
                            <div
                                // style={{ height: "70px" }}
                                className="d-flex p-0 col-10">
                                <ItemImage className="col-2 p-0"
                                    // style={{ backgroundImage: `url(${testPic})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", width: "70px", height: "70px", borderRadius: "12px" }}
                                />
                                <div className="col-10 px-1 d-flex flex-column" style={{ height: "70px" }} >
                                    <h6 className="m-0" style={{ fontWeight: 600 }}>Item Name</h6>
                                    <p className="m-0">detail</p>
                                </div>
                            </div>
                            <TrashHolder className="trashHolder p-1 col-2 text-center justify-content-center align-items-center">
                                <Trash /></TrashHolder>
                        </ItemCard>
                    </ListItem>
                ))}
            </List>
            <Divider className="mb-2" />
            <CartDetail sx={{}}>

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
            {/* desktop basket */}
            <Drawer
                BackdropProps={{ invisible: true }}
                PaperProps={{ elevation: 0, style: { backgroundColor: "transparent" } }}
                anchor={'bottom'}
                open={state['bottom']}
                onClose={toggleDrawer('bottom', false)}
            >
                {list('bottom')}
            </Drawer>

            {/* tablet and mobile basket  */}
            <Drawer
                BackdropProps={{ invisible: true }}
                PaperProps={{ elevation: 0, style: { backgroundColor: "transparent" } }}
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
            >
                {list('right')}
            </Drawer>

        </>
    );
}