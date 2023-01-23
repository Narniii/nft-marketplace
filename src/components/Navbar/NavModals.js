import React, { useEffect, useRef, useState } from "react";
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Bag2, EmojiNormal, HambergerMenu, Profile, ProfileDelete, SearchNormal1, Trash, Wallet2, Youtube } from "iconsax-react";
import '../../styles.css'
import styled from "styled-components";
import testPic from '../../assets/testpic.png'
import { Colors } from "../design/Colors";

const ItemCard = styled.div`
  background:${({ theme }) => theme.itemCardsBackground};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius:12px;
  width:100%;
  `;
const ItemImage = styled.div`
  background-image: url(${testPic});
  background-size:contain;
  background-repeat:no-repeat;
  background-position:center;
  height:70px;
  width:70px;
`;

export const Cart = ({ theme, state, toggleDrawer, open, onClose, }) => {
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300, borderRadius: anchor === 'right' ? "24px" : "0", borderTopLeftRadius: "24px", borderTopRightRadius: "24px", backgroundColor: "white" }}
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div className="d-flex px-2 py-3">
                <Bag2/><p style={{ fontWeight: 600 }} className="m-0">&nbsp;Your Cart</p>
            </div>

            <Divider className="mb-2" />
            <div className="d-flex p-2">
                <p style={{ fontWeight: 600 }} className="m-0">6</p><p className="m-0">&nbsp;items</p>
            </div>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem className="p-2" key={text} disablePadding sx={{ justifyContent: "center" }}>
                        <div className="row col-12 p-0 m-0 justify-content-between" style={{ borderRadius: "12px", overflow: "hidden" }}>
                            <div
                                // style={{ height: "70px" }}
                                className="d-flex p-0 col-10">
                                <div className="col-2 p-0"
                                    style={{ backgroundImage: `url(${testPic})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", width: "70px", height: "70px", borderRadius: "12px" }}
                                />
                                <div className="col-10 px-1 d-flex flex-column" style={{ height: "70px" }} >
                                    <h6 className="m-0" style={{ fontWeight: 600 }}>Item Name</h6>
                                    <p className="m-0">detail</p>
                                </div>
                            </div>
                            <div className="p-1 col-2 text-center d-flex justify-content-center align-items-center"
                                style={{
                                    height: "70px", borderRadius: "24px 0px 0px 24px",
                                    backgroundColor: "#e6e6e6"
                                }}
                            >
                                <Trash color={Colors.errorDark} /></div>
                        </div>
                    </ListItem>
                ))}
            </List>
            <Divider className="mb-2" />
            <Box sx={{ borderTopLeftRadius: "24px",borderTopRightRadius: "24px", backgroundColor: `${Colors.gray0}`, height: "200px" }}>

            </Box>
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
                PaperProps={{ elevation: 0, style: { backgroundColor: "transparent" } }}
                anchor={'bottom'}
                open={state['bottom']}
                onClose={toggleDrawer('bottom', false)}
            >
                {list('bottom')}
            </Drawer>

            {/* tablet and mobile basket  */}
            <Drawer
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