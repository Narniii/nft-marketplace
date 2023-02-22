import { styled } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Box, Collapse, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popper } from "@mui/material";
import { Bag2, CloseSquare, EmojiNormal, HambergerMenu, Profile, ProfileDelete, SearchNormal1, Trash, Wallet, Wallet2, Youtube } from "iconsax-react";
import '../../styles.css'
// import styled from "styled-components";
import testPic from '../../assets/MetaMask_Fox.svg.png'
import { Colors } from "../design/Colors";
import { useWeb3React } from "@web3-react/core"
import { injected } from "../wallet/Connectors"
import { ButtonXSmall } from "../design/Buttons";
import { useDispatch } from "react-redux";
import { getuser, logOutUser } from "../../redux/actions";

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


const WalletConnect = ({ theme, state, toggleDrawer, open, onClose, anchorEl, walletDesOpen }) => {
    const { active, account, library, connector, activate, deactivate } = useWeb3React()
    const dispatch = useDispatch();
    const logOut = () => dispatch(logOutUser());
    // const fetchUser = (walletAddress) => dispatch(getuser(walletAddress));
    const [alertOpen, setAlertOpen] = useState(false)
    const shorten = (str) => {
        console.log(str.length)
        return str.length > 10 ? str.substring(0, 7) + "..." : str;
    }

    async function connect() {
        setAlertOpen(true)
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
            sx={{
                border: theme == 'light' ? "0.2px solid #e6e6e6" : "0.2px solid #332E5F", bgcolor: theme == 'light' ? "#F9F9F9" : "#272448", color: theme == 'light' ? "#333333" : "#e6e6e6", width: anchor === 'top' || anchor === 'bottom' ? '100%' : '100%', borderRadius: anchor === 'right' ? "24px" : "0", borderTopLeftRadius: "24px", borderTopRightRadius: "24px", overflow: "hidden"
            }}
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div className="d-flex px-2 py-3 justify-content-between">
                <div className="d-flex">
                    <Wallet /><p style={{ fontWeight: 600 }} className="m-0">&nbsp;My Wallet</p>
                </div>
                {active ? <>{localStorage.setItem('account', account)}<span style={{ cursor: "pointer" }} onClick={disconnect} className="d-flex">{shorten(account)}</span></> : <span>Not connected</span>}
            </div>

            <Divider className="mb-2" />
            <List>
                {['MetaMask',].map((text, index) => (
                    <>
                        <ListItem className="p-2" key={text} disablePadding sx={{ justifyContent: "center" }}>
                            <ItemCard onClick={connect} className="d-flex col-12 p-0 m-0 justify-content-between" >
                                <div className="d-flex p-0 align-items-center">
                                    <ItemImage className="col-2 p-0" />
                                    <h6 className="m-0" style={{ fontWeight: 600 }}>Meta Mask</h6>
                                </div>
                                {/* {active ? <span className="d-flex">Connected with <b>{account}</b> </span> : <span>Not connected</span>} */}
                            </ItemCard>
                        </ListItem>
                        {active ? undefined :
                            <Collapse in={alertOpen}>
                                <Alert
                                    severity="info"
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setAlertOpen(false);
                                            }}
                                        >
                                            <CloseSquare />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2, mt: 2, fontSize: "12px", display: "flex", alignItems: "center" }}
                                >
                                    please make sure you have meta mask wallet extension installed in your browser!
                                </Alert>
                            </Collapse>
                        }
                    </>
                ))}
            </List>
        </Box>
    );
    return (<>
        <>
            {/* tablet and mobile drawer */}
            <Drawer
                className="d-flex d-lg-none"
                BackdropProps={{ invisible: true }}
                PaperProps={{ elevation: 0, style: { backgroundColor: "transparent" } }}
                anchor={'bottom'}
                open={state['bottom']}
                onClose={toggleDrawer('bottom', false)}
                disableScrollLock={true}
            >
                {list('bottom')}
            </Drawer>


            {/* desktop drawer  */}
            {/* <Drawer
                BackdropProps={{ invisible: true }}
                PaperProps={{ elevation: 0, style: { backgroundColor: "transparent" } }}
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
                disableScrollLock={true}
            >
                {list('right')}
            </Drawer> */}
            <Popper className="d-none d-lg-flex" open={walletDesOpen} anchorEl={anchorEl} placement={"top-end"} disableScrollLock={true}
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


        </>
    </>);
}

export default WalletConnect;