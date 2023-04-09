import { Box, InputBase, Modal, Popover, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { CloseSquare, Copy } from "iconsax-react";
import { Tabs, Tab } from "react-bootstrap";
import '../../styles.css'
import walletPic from '../../assets/wallet-deposit.svg'
import { Colors } from "../design/Colors";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
const WalletImage = styled(Box)`
  background-image: url(${walletPic});
  background-size:contain;
  background-repeat:no-repeat;
  background-position:center;
  height:120px;
  width:120px;
`;
const Line = styled(Box)`
    background: linear-gradient(90deg,#60606000 0%, #80808080 50%,#918A7A00 100%);
    height:1px;
    align-self:center;
    width:80%;
`;

const FundsModal = ({ open, handleClose, theme }) => {
    const globalUser = useSelector(state => state.userReducer);
    const [copySuccess, setCopySuccess] = useState(undefined)
    const [copied, setCopied] = useState(false)
    const textAreaRef = useRef(null);
    const [state, setState] = useState(undefined)
    const copyToClipboard = (e) => {
        navigator.clipboard.writeText(window.document.getElementById('textAreaRef').value)
        setCopySuccess('Copied!');
        setCopied(true)


        // textAreaRef.current.select();
        // document.execCommand('copy');
        // e.target.focus();
        // setCopySuccess('Copied!');
    };

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
                    width: { xs: '100%', md: 600 },
                    height: { xs: '100%', md: 800 },
                    borderRadius: { xs: '0', md: '24px' },
                    bgcolor: theme == 'light' ? "#ffffff" : "#272448",
                    justifySelf: "center"
                }}
                // onClick={toggleDrawer(anchor, false)}
                onKeyDown={handleClose}
                className="d-flex flex-column justify-content-start"
            >
                <Box sx={{ p: "20px" }} className='d-flex justify-content-between align-items-center align-items-center'>
                    <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>Add Funds</Typography>
                    <CloseSquare onClick={handleClose} style={{ cursor: "pointer" }} />
                </Box>
                <Line />
                <Box sx={{  p: "20px" }}>
                    <Tabs
                        // fill
                        // justify
                        defaultActiveKey={window.location.hash ? window.location.hash.replace('#', '') : "Deposit Crypto"}
                        className="m-0 mb-5"
                        style={{
                            color: theme === 'light' ? "#5D3393" : "#DABDDF",
                            // borderColor: theme === 'light' ? "#5D3393" : "#DABDDF",
                            borderBottom: "none",
                        }}
                    >
                        <Tab eventKey="Deposit Crypto" title="Deposit Crypto">
                            <Box className="d-flex flex-column justify-content-center align-items-center" sx={{
                                padding: "32px", border: "none",
                                bgcolor: theme == 'light' ? Colors.gray0 : Colors.dark3, borderRadius: "24px"
                            }}>
                                <WalletImage />
                                <Typography sx={{ mt: "20px", mb: 8, textAlign: "center" }}>Transfer funds from an Exchange or another wallet to your wallet address below:</Typography>
                                <Box sx={{
                                    width: "100%", border: "1px solid", borderRadius: "24px", p: 2,
                                    borderColor: theme == 'light' ? Colors.gray1 : Colors.gray3,
                                    display: "flex", justifyContent: "space-between", alignItems: "center",
                                    color: theme == 'light' ? Colors.gray7 : Colors.gray3
                                }}>
                                    <InputBase
                                        ref={textAreaRef}
                                        value={globalUser.walletAddress}
                                        id="textAreaRef"
                                        InputLabelProps={{ style: { color: theme == 'light' ? Colors.gray7 : Colors.gray3 }, }}
                                        sx={{ padding: '0 !important' }} color={theme == 'light' ? Colors.gray1 : Colors.gray3}
                                        placeholder={globalUser.walletAddress} disabled>{globalUser.walletAddress}</InputBase>
                                    <Copy id="copy" onClick={copyToClipboard} cursor="pointer" color={theme == 'light' ? Colors.gray7 : Colors.gray3} />
                                    <Popover
                                        open={copied}
                                        anchorEl={window.document.getElementById('copy')}
                                        onClose={() => setCopied(false)}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        PaperProps={{
                                            style: {
                                                backgroundColor: "transparent",
                                                borderRadius: "24px"
                                            }
                                        }}
                                    >
                                        <Typography sx={{ borderRadius: "24px", color: Colors.successMain, bgcolor: theme == 'light' ? Colors.gray0 : Colors.dark3, p: 1 }}>{copySuccess}</Typography>
                                    </Popover>
                                </Box>
                            </Box>
                        </Tab>


                        <Tab eventKey="Buy With Cart" title="Buy With Cart">
                            <Box className="d-flex flex-column justify-content-center align-items-center" sx={{
                                padding: "20px", border: "1px solid",
                                height:400,
                                borderColor: theme == 'light' ? Colors.gray1 : Colors.gray7, borderRadius: "24px"
                            }}>

                            </Box>
                        </Tab>
                    </Tabs>
                </Box>
            </Box>
        </Modal >
    );
}

export default FundsModal;