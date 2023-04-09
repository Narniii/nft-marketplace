import { styled } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Box, ClickAwayListener, Collapse, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popper, Typography } from "@mui/material";
import { Bag2, CloseSquare, EmojiNormal, HambergerMenu, Profile, ProfileDelete, Refresh2, SearchNormal1, Trash, Wallet, Wallet2, Youtube } from "iconsax-react";
import '../../styles.css'
// import styled from "styled-components";
import testPic from '../../assets/MetaMask_Fox.svg.png'
import { Colors } from "../design/Colors";
import { useWeb3React } from "@web3-react/core"
import { injected } from "../wallet/Connectors"
import { ButtonLarge, ButtonMedium, ButtonOutline, ButtonXSmall } from "../design/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { getuser, logOutUser } from "../../redux/actions";
import FundsModal from "../wallet/AddFundModal";
import useSWR from "swr"
import { formatEther } from "@ethersproject/units"
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from "web3";

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
const Line = styled(Box)`
    background: linear-gradient(90deg,#60606000 0%, #80808080 50%,#918A7A00 100%);
    height:1px;
    align-self:center;
    width:80%;
`;

// const provider = await detectEthereumProvider();
// console.log('................',provider)

const WalletConnect = ({ theme, state, toggleDrawer, open, handleClose, anchorEl, walletDesOpen }) => {
    const [web3, setWeb3] = useState(undefined)
    const dispatch = useDispatch();
    const logOut = () => dispatch(logOutUser());
    const { active, account, library, connector, activate, deactivate, } = useWeb3React()
    const [ethBalance, setEthBalance] = useState(undefined)
    const fetchUser = (walletAddress) => dispatch(getuser(walletAddress));
    const globalUser = useSelector(state => state.userReducer);
    const [myActive, setMyActive] = useState(false)
    useEffect(() => {
        if (active) {
            fetchUser(account)

            let web3b = new Web3(window.ethereum)
            web3b.eth.getBalance(account).then((val) => {
                // console.log('format ether', formatEther(val))
                setEthBalance(formatEther(val))
                // console.log('.,,,,,,,,,,,.,.,.,.,.', web3b.utils.fromWei(val, "ether") + " ETH")
            })
        }
    }, [active])

    // useEffect(() => {
    //   if (active) {
    //     // if (account) {
    //     // console.log('accccounttttt', account)
    //     // console.log('act', active)
    //     console.log('im active')
    //     fetchUser(account)
    //     // }
    //   }
    //   else {
    //     // localStorage.removeItem('account')
    //     // localStorage.removeItem("lastActive")
    //     // console.log('im not active')
    //     // logOut()
    //   }
    // }, [active, account]);




    const [fundsModal, setFundsModal] = useState(false)
    // const fetchUser = (walletAddress) => dispatch(getuser(walletAddress));
    const [alertOpen, setAlertOpen] = useState(false)
    const shorten = (str) => {
        console.log(str.length)
        return str.length > 10 ? str.substring(0, 7) + "..." : str;
    }

    async function connect() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                await activate(injected)
                localStorage.setItem("lastActive", true)
                let web3b = new Web3(window.ethereum)
                web3b.eth.getBalance(account).then((val) => {
                    setEthBalance(formatEther(val))
                })
            } catch (ex) {
                console.log(ex)
            }
        }
        else {
            setAlertOpen(true)
        }
    }
    async function disconnect() {
        setAlertOpen(false)
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
                border: theme == 'light' ? "0.2px solid #e6e6e6" : "0.2px solid #332E5F",
                bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                color: theme == 'light' ? "#333333" : "#e6e6e6",
                width: anchor === 'top' || anchor === 'bottom' ? '100%' : 400,
                borderRadius: anchor === 'right' ? "24px" : "0", borderTopLeftRadius: "24px", borderTopRightRadius: "24px",
                overflow: "hidden",
                // height: 600
            }}
            // onClick={toggleDrawer(anchor, false)}
            // onKeyDown={toggleDrawer(anchor, false)}
            className="d-flex flex-column"
        >
            <div className="d-flex px-3 py-3 justify-content-between">
                <div className="d-flex align-items-center">
                    <Wallet /><p style={{ fontWeight: 600 }} className="m-0">&nbsp;My Wallet</p>
                    {active ? <>
                        {localStorage.setItem('account', account)}
                        <>{globalUser.isLoggedIn ? <>
                            <span style={{ cursor: "pointer", fontSize: "14px", marginLeft: "4px" }}
                                onClick={disconnect} className="d-flex">
                                ({shorten(account)})
                            </span>
                        </> : undefined
                        }</>
                    </>

                        : <>{localStorage.removeItem('account', account)}</>}
                </div>
                <CloseSquare cursor='pointer' onClick={toggleDrawer(anchor, false)} />
            </div>

            {/* <Divider className="mb-2" /> */}
            <Line />
            {globalUser.isLoggedIn && active ?
                <Box className="d-flex w-100 p-3 align-items-center my-3">
                    <Typography className="d-flex align-items-center" fontSize="16" sx={{ color: theme == 'light' ? `${Colors.primaryDark}` : `${Colors.primaryMain}` }}><Refresh2 color="#9951F4" cursor="pointer" size="20" className="me-1" /> Refresh Funds</Typography>
                </Box>
                : undefined}


            <List sx={{
                height: 400, overflowY: "scroll",
                '-ms-overflow-style': 'none',
                '&::-webkit-scrollbar': {
                    display: "none"
                }
            }}>
                {globalUser.isLoggedIn && active ?
                    <Box className="p-3">
                        <Box className="d-flex flex-column justify-content-center align-items-center" sx={{
                            padding: "20px", border: "1px solid",
                            borderColor: theme == 'light' ? Colors.gray1 : Colors.gray7, borderRadius: "24px"
                        }}>
                            <Typography sx={{ fontWeight: 500 }}>Total Balance</Typography>
                            <Typography sx={{ fontWeight: 600, mt: 2, mb: 6, fontSize: "24px" }} className="d-flex">$ {ethBalance ? shorten(ethBalance) : undefined}&nbsp; <Typography sx={{ color: theme == 'light' ? Colors.gray6 : Colors.gray3, fontSize: "24px" }}>USD</Typography></Typography>
                            <ButtonMedium onClick={() => setFundsModal(true)} className="my-2">Add Funds</ButtonMedium>
                            <ButtonOutline onClick={disconnect}>Log Out</ButtonOutline>
                        </Box>
                    </Box>
                    :
                    <>
                        {['Meta Mask',].map((text, index) => (
                            <>
                                <ListItem className="p-0 d-flex flex-column" key={text} disablePadding sx={{ justifyContent: "center" }}>
                                    <ItemCard onClick={connect} className="d-flex col-12 p-3 m-0 justify-content-between" >
                                        <div className="d-flex p-0 align-items-center">
                                            <ItemImage className="col-2 p-0 me-2" />
                                            <h6 className="m-0" style={{ fontWeight: 500 }}>{text}</h6>
                                        </div>
                                        {/* {active ? <span className="d-flex">Connected with <b>{account}</b> </span> : <span>Not connected</span>} */}
                                    </ItemCard>
                                    {alertOpen && !active ?
                                        <Collapse in={alertOpen} sx={{ width: "100%" }}>
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
                                                sx={{ mb: 2, mt: 2, width: "100%", fontSize: "12px", display: "flex", alignItems: "center" }}
                                            >
                                                please make sure you have {text} wallet extension installed in your browser!
                                            </Alert>
                                        </Collapse>
                                        :
                                        undefined
                                    }
                                </ListItem>
                            </>
                        ))}
                    </>
                }
            </List>


        </Box>
    );
    return (
        <>
            {/* tablet and mobile drawer */}
            <Drawer
                className="d-flex d-lg-none"
                // BackdropProps={{ invisible: true }}
                PaperProps={{ elevation: 0, style: { backgroundColor: "transparent" } }}
                anchor={'bottom'}
                open={state['bottom']}
                onClose={toggleDrawer('bottom', false)}
                disableScrollLock={true}
            >
                {list('bottom')}
            </Drawer>


            {/* desktop drawer  */}
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



            {/* if minds changed for having popper menu  ===> */}
            {/* <ClickAwayListener onClickAway={handleClose}> */}
            {/* <Popper className="d-none d-lg-flex" open={walletDesOpen} anchorEl={anchorEl} placement={"top-end"} disableScrollLock={true}
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
            </Popper> */}
            {/* </ClickAwayListener> */}



            <FundsModal open={fundsModal} handleClose={() => setFundsModal(false)} theme={theme} />
        </>);
}

export default WalletConnect;