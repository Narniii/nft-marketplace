import { Alert, Box, Collapse, Divider, IconButton, List, ListItem, Modal, styled, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { CloseSquare, Refresh2, Wallet } from "iconsax-react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import testPic from '../../assets/MetaMask_Fox.svg.png'
import { logOutUser } from "../../redux/actions";
import { ButtonMedium, ButtonOutline } from "../design/Buttons";
import { Colors } from "../design/Colors";
import { injected } from "./Connectors";
import { shorten } from '../../utils/countingFunctions'
import Web3 from "web3";
import { formatEther } from "ethers/lib/utils";
// import MetaMaskSDK from "@metamask/sdk";

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
const WalletConnectModal = ({ open, handleClose, theme }) => {
    const { active, account, library, connector, activate, deactivate } = useWeb3React()
    const dispatch = useDispatch();
    const logOut = () => dispatch(logOutUser());
    const [alertOpen, setAlertOpen] = useState(false)
    const globalUser = useSelector(state => state.userReducer)
    const [ethBalance, setEthBalance] = useState(undefined)

    useEffect(() => {
        if (ethBalance)
            console.log(ethBalance)
    }, [ethBalance])



    const [fundsModal, setFundsModal] = useState(false)


    async function connect() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                await activate(injected)
                localStorage.setItem("lastActive", true)
                let web3b = new Web3(window.ethereum)
                web3b.eth.getBalance(account).then((val) => {
                    setEthBalance(formatEther(val))
                })
                // const MMSDK = new MetaMaskSDK({
                //     injectProvider: false,
                //     useDeeplink: false,
                //     communicationLayerPreference: "socket",
                // });

                // const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum

                // ethereum.request({ method: 'eth_requestAccounts', params: [] });

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
                border: { xs: 'unset', md: theme == 'light' ? "0.2px solid #e6e6e6" : "0.2px solid #332E5F" },
                bgcolor: { xs: theme == 'light' ? "#ffffff" : "#272448", md: theme == 'light' ? "#F9F9F9" : "#272448" },
                color: theme == 'light' ? "#333333" : "#e6e6e6",
                // width: anchor === 'top' || anchor === 'bottom' ? '100%' : 500,
                width: { xs: '100%', md: 600 },
                height: { xs: '100%', md: 600 },
                borderRadius: anchor === 'right' ? "24px" : "0", borderTopLeftRadius: "24px", borderTopRightRadius: "24px",
                overflow: "hidden",
                // height: 600
            }}
            // onClick={handleClose}
            // onKeyDown={handleClose}
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
                <CloseSquare cursor='pointer' onClick={handleClose} />
            </div>

            {/* <Divider className="mb-2" /> */}
            <Line />
            {globalUser.isLoggedIn && active ?
                <Box className="d-flex w-100 p-3 align-items-center my-3">
                    <Typography className="d-flex align-items-center" fontSize="16" sx={{ color: theme == 'light' ? `${Colors.primaryDark}` : `${Colors.primaryMain}` }}><Refresh2 color="#9951F4" cursor="pointer" size="20" className="me-1" /> Refresh Funds</Typography>
                </Box>
                : undefined}


            <List sx={{
                height: 600,
                overflowY: "scroll",
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
                            <Typography sx={{ fontWeight: 600, mt: 2, mb: 6, fontSize: "24px" }} className="d-flex">${ethBalance ? ethBalance : undefined}&nbsp; <Typography sx={{ color: theme == 'light' ? Colors.gray6 : Colors.gray3, fontSize: "24px" }}>USD</Typography></Typography>
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
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="d-flex justify-content-center align-items-center"
            // inputProps={{MenuProps: {disableScrollLock: true}}}
            disableScrollLock={true}
        >
            <Box
                sx={{
                    width: { xs: '100%', md: 'auto' },
                    height: { xs: '100%', md: 'auto' },
                    borderRadius: { xs: '0', md: '24px' },
                    bgcolor: theme == 'light' ? "#ffffff" : "#272448",
                    justifySelf: "center"
                }}
                // onClick={handleClose}
                onKeyDown={handleClose}
                className="d-flex flex-column justify-content-between"
            >
                {/* <Box className='d-flex justify-content-between p-3 align-items-center align-items-center'>
                    <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>Connect Wallet</Typography>
                    <CloseSquare onClick={handleClose} style={{ cursor: "pointer" }} />
                </Box> */}
                <Box>
                    {list('right')}
                </Box>
            </Box>
        </Modal>
    );
}

export default WalletConnectModal;