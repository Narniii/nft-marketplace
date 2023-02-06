import { Box, FormControl, InputBase, MenuItem, Modal, Select } from "@mui/material";
import { ArrowDown2, CloseSquare, InfoCircle } from "iconsax-react";
import styled from "styled-components";
import { ButtonLarge } from "../design/Buttons";
import testnft from '../../assets/test1.png'
import SearchBox from "../Navbar/SearchBox";
import { useState } from "react";
import { SelectionB } from "../test";


const ItemRow = styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
align-items:center;
`
const ItemImage = styled.div`
    background-image: url(${testnft});
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;
    height:45px;
    width:45px;
    margin-right:1px;
`;
const Subtitle = styled.p`
color:${({ theme }) => theme.textSub};
// font-size:14px;
margin:0;
`
const Num = styled.span`
color:${({ theme }) => theme.collectionDetailsAnswer} !important;
font-weight:600;
`
const Det = styled.div`
background-color:${({ theme }) => theme.addProPic};
display:flex;
flex-direction:column;
justify-content:space-between;
padding:16px;
border-radius:24px;
`
const InputBox = styled.div`
border:${({ theme }) => theme.searchBoxBorder};
box-shadow:${({ theme }) => theme.searchBoxShadow};
border-radius:30px;
background:transparent;
// `;

const DurSelect = styled.select`
background:${({ theme }) => theme.itemCardsBackground};
border-radius: 24px;
border:1px solid #d9d9d9;
// box-shadow:${({ theme }) => theme.boxShadow};
height:50px;
font-weight:600;
color:${({ theme }) => theme.text};
padding:16px;
-webkit-appearance:none;
-moz-appearance:none;
appearance:none;
width:80%;
display:flex;
`;
const Selection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor:pointer;
    background: transparent;
    justify-content:space-between;
    border: 1px solid #D9D9D9;
    border-radius: 24px;
    overflow:hidden;
    height:100%;
    width:200px;
`;

const OfferModal = ({ open, handleClose, theme }) => {
    const [value, setValue] = useState('trending');
    // const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                // className="d-md-none"
                // inputProps={{MenuProps: {disableScrollLock: true}}}
                disableScrollLock={true}
            >
                <Box sx={{
                    width: '50%',
                    // height: '50%',
                    borderRadius: "24px",
                    position: "absolute",
                    top: "25%",
                    left: "25%",
                    p: 4,
                    bgcolor: theme == 'light' ? "#ffffff" : "#272448",
                    '@media screen and (max-width: 768px)': {
                        width: '100%',
                        left: "0",
                        bottom: "-1px",
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,

                    },
                }} className="d-flex flex-column ">
                    {/* <div className="d-flex flex-column"> */}
                    <Box className="d-flex justify-content-between">
                        <div className="mb-4 d-flex justify-content-start" ><p style={{ margin: 0, fontWeight: "bold" }}>Make an offer</p></div><div className="d-flex justify-content-end" style={{ cursor: "pointer" }} onClick={handleClose}><CloseSquare /></div>
                    </Box>
                    <ItemRow className="mb-3">
                        <div className="d-flex"><ItemImage className="me-1" /><div className="d-flex-flex-column"><Num>Bean #234</Num><Subtitle>lil animal world</Subtitle></div></div>
                        <div className="d-flex flex-column align-items-end"><Num>24 ETH</Num><Subtitle>11$</Subtitle></div>
                    </ItemRow>
                    <Det className="mb-3">
                        <div className="my-1 d-flex justify-content-between align-items-center">
                            <Subtitle style={{ fontSize: "14px" }}>Balance:</Subtitle>
                            <div className="d-flex align-items-center"><Num>20</Num><Subtitle style={{ fontSize: "14px" }}>&nbsp;ETH</Subtitle></div>
                        </div>
                        <div className="my-1 d-flex justify-content-between align-items-center">
                            <Subtitle style={{ fontSize: "14px" }}>Floor Price:</Subtitle>
                            <div className="d-flex align-items-center"><Num>20</Num><Subtitle style={{ fontSize: "14px" }}>&nbsp;ETH</Subtitle></div>
                        </div>
                        <div className="my-1 d-flex justify-content-between align-items-center">
                            <Subtitle style={{ fontSize: "14px" }}>Best Offer:</Subtitle>
                            <div className="d-flex align-items-center"><Num>20</Num><Subtitle style={{ fontSize: "14px" }}>&nbsp;ETH</Subtitle></div>
                        </div>
                    </Det>
                    <div className="d-flex flex-column"><p className="mb-1">Price</p>
                        <InputBox className="d-flex px-3 py-2 mb-1 justify-content-between">
                            <div className="col-11 p-0">
                                <InputBase
                                    sx={{ color: "inherit", width: "100%", height: "100%" }}
                                    placeholder="enter your offer price"
                                // inputProps={{ 'aria-label': 'enter email' }}
                                />
                            </div>
                            <div className="col-1 p-0 text-center d-flex justify-content-end align-items-center"><InfoCircle size="18" /></div>
                        </InputBox>
                    </div>
                    <div className="d-flex flex-column mb-3"><p className="mb-1">Duration</p>
                        <div className="d-flex align-items-center justify-content-between">
                            <FormControl sx={{ width: '80%', bgcolor: theme == 'light' ? "#ffffff" : "#272448", color: theme == 'light' ? "#808080" : "#B3B3B3", borderRadius: "24px", overflow: "hidden", border: "1px solid #d9d9d9" }}>
                                <Select
                                    value={10}
                                    BackdropProps={{ invisible: true }}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{ MenuProps: { disableScrollLock: true } }}
                                    IconComponent={ArrowDown2}
                                    // MenuProps={{ classes: { paper: classes.select } }}
                                    sx={{ bgcolor: theme == 'light' ? "#ffffff" : "#272448", color: theme == 'light' ? "#808080" : "#B3B3B3", fontWeight: 600 }}
                                >
                                    <MenuItem
                                        sx={{ bgcolor: theme == 'light' ? "#ffffff" : "#272448" }}
                                        value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem sx={{ bgcolor: theme == 'light' ? "#ffffff" : "#272448", fontWeight: 600 }} value={10}>24h</MenuItem>
                                    <MenuItem sx={{ bgcolor: theme == 'light' ? "#ffffff" : "#272448", fontWeight: 600 }} value={20}>12h</MenuItem>
                                    <MenuItem sx={{ bgcolor: theme == 'light' ? "#ffffff" : "#272448", fontWeight: 600 }} value={30}>6h</MenuItem>
                                </Select>
                            </FormControl>
                            <div className="d-flex flex-column align-items-end ms-1">
                                <Subtitle>jan17,2023</Subtitle>
                                <Subtitle>10:34 AM</Subtitle>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                    <ButtonLarge>make offer</ButtonLarge>
                </Box>
            </Modal>

        </>
    );
}

export default OfferModal;