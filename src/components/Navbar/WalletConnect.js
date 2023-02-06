import { styled } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Bag2, EmojiNormal, HambergerMenu, Profile, ProfileDelete, SearchNormal1, Trash, Wallet, Wallet2, Youtube } from "iconsax-react";
import '../../styles.css'
// import styled from "styled-components";
import testPic from '../../assets/MetaMask_Fox.svg.png'
import { Colors } from "../design/Colors";
import { useWeb3React } from "@web3-react/core"
import { injected } from "../wallet/Connectors"
import { ButtonXSmall } from "../design/Buttons";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../redux/actions";

const ItemCard = styled(Box)`
  background-color:${({ theme }) => theme.itemCardsBackground};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius:12px;
  align-items:center;
  width:100%;
  overflow:hidden;
  cursor:pointer;
  &:hover .trashHolder{
    display:flex;
  }
  `;
const ItemImage = styled(Box)`
  background-image: url(${testPic});
  background-size:contain;
  background-repeat:no-repeat;
  background-position:center;
  height:45px;
  width:45px;
  border-radius:50%;
`;


const WalletConnect = ({ theme, state, toggleDrawer, open, onClose, }) => {
    const { active, account, library, connector, activate, deactivate } = useWeb3React()
    const dispatch = useDispatch();
    const logOut = () => dispatch(logOutUser());


    async function connect() {
        try {
            await activate(injected)
            localStorage.setItem("lastActive", true)

        } catch (ex) {
            console.log(ex)
        }
    }

    async function disconnect() {
        try {
            deactivate()
            logOut()
            localStorage.removeItem("lastActive")
            localStorage.removeItem('account')
        } catch (ex) {
            console.log(ex)
        }
    }

    const list = (anchor) => (
        <Box
            sx={{ bgcolor: theme == 'light' ? "#F9F9F9" : "#272448", color: theme == 'light' ? "#333333" : "#e6e6e6", width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300, borderRadius: anchor === 'right' ? "24px" : "0", borderTopLeftRadius: "24px", borderTopRightRadius: "24px", overflow: "hidden" }}
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div className="d-flex px-2 py-3 justify-content-between">
                <div className="d-flex">
                    <Wallet /><p style={{ fontWeight: 600 }} className="m-0">&nbsp;My Wallet</p>
                </div>
                {active ? <>{localStorage.setItem('account', account)}<span style={{ cursor: "pointer" }} onClick={disconnect} className="d-flex">{account}</span></> : <span>Not connected</span>}
            </div>

            <Divider className="mb-2" />
            <List>
                {['MetaMask',].map((text, index) => (
                    <ListItem className="p-2" key={text} disablePadding sx={{ justifyContent: "center" }}>
                        <ItemCard onClick={connect} className="d-flex col-12 p-0 m-0 justify-content-between" >
                            <div className="d-flex p-0 align-items-center">
                                <ItemImage className="col-2 p-0" />
                                <h6 className="m-0" style={{ fontWeight: 600 }}>Meta Mask</h6>
                            </div>
                            {/* {active ? <span className="d-flex">Connected with <b>{account}</b> </span> : <span>Not connected</span>} */}
                        </ItemCard>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    return (<>
        <>
            {/* desktop drawer */}
            <Drawer
                BackdropProps={{ invisible: true }}
                PaperProps={{ elevation: 0, style: { backgroundColor: "transparent" } }}
                anchor={'bottom'}
                open={state['bottom']}
                onClose={toggleDrawer('bottom', false)}
                disableScrollLock={true}
            >
                {list('bottom')}
            </Drawer>

            {/* tablet and mobile drawer  */}
            <Drawer
                BackdropProps={{ invisible: true }}
                PaperProps={{ elevation: 0, style: { backgroundColor: "transparent" } }}
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
                disableScrollLock={true}
            >
                {list('right')}
            </Drawer>

        </>
    </>);
}

export default WalletConnect;