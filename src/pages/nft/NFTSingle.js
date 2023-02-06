import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import styled from "styled-components";
import logoPic from '../../assets/collectionLogo.png'
import { ArrowDown2, Chart, Chart1, ChartSuccess, Convert3DCube, DeviceMessage, Diagram, Document, DocumentText, Ethereum, EthereumClassic, ForwardItem, Framer, Heart, I3Dcube, More, Profile2User, Share, TableDocument } from "iconsax-react";
import { Colors } from "../../components/design/Colors";
import { ButtonLarge, ButtonMedium, ButtonOutline } from "../../components/design/Buttons";
import '../../styles.css'
import ItemActivity from "../../components/NFTSingle/ItemActivity";
import OfferHistory from "../../components/NFTSingle/OfferHistory";
import ListingHistory from "../../components/NFTSingle/ListingHistory";
import ItemsCopy from "../../components/NFTSingle/ItemsCopy";
import MoreOfColl from "../../components/NFTSingle/MoreOfColl";
import OfferModal from "../../components/NFTSingle/OfferModal";
import { useState } from "react";
const NFT = styled.div`
  background-image: url(${logoPic});
  background-size:cover;
  background-repeat:no-repeat;
  background-position:center;
  border-radius: 24px;
//   height:100%;
//   width:400px;
  overflow:hidden;
//   border:1px solid red;
  @media screen and (max-width: 575px) {
    height:400px;
  }
  
`;
const Subtitle = styled.p`
color: ${({ theme }) => theme.trendingSectionSubTitles};
margin:0;
display:flex;
align-items:center;
`
const PropCard = styled.div`
background:${({ theme }) => theme.itemCardsBackground};
box-shadow:${({ theme }) => theme.boxShadow};
// border:${({ theme }) => theme.searchBoxBorder};
border-radius: 12px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
padding:8px;
// @media screen and (max-width: 768px) {
//     font-size:14px;
// }

`;
const Line = styled.div`
background: linear-gradient(90deg,#60606000 0%, #80808080 50%,#918A7A00 100%);
height:1px;
width:60%;
`;
const Num = styled.span`
font-weight:600;
color: ${({ theme }) => theme.text};
`
const Description = styled.div`
display: flex;
flex-direction: column;
justify-content: start;
align-items: start;
padding: 20px 8px 20px 20px;
background: ${({ theme }) => theme.collectionCardHover};
border-radius: 24px;
// overflow-y:scroll;
// height:150px;
// scrollbar-width: 5px;
// -ms-overflow-style: none;
// &::-webkit-scrollbar {
//     width: 7px;
//     background:white;
// }
// &::-webkit-scrollbar-thumb {
//     height:20px;
//     background: ${Colors.primaryDark}; 
//     border-radius: 10px;
// }
// &::-webkit-scrollbar-button{
//     background:${Colors.primaryDark};
//     height:3px;
// }
//   @media screen and (max-width: 768px) {
//     height:300px;
//   }
`;
const DesP = styled.div`
overflow-y:scroll;
height:150px;
scrollbar-width: 5px;
// -ms-overflow-style: none;
&::-webkit-scrollbar {
    width: 7px;
    background:white;
}
&::-webkit-scrollbar-thumb {
    height:20px;
    background: ${Colors.primaryDark}; 
    border-radius: 10px;
}
&::-webkit-scrollbar-button{
    background:${Colors.primaryDark};
    height:3px;
}
@media screen and (max-width: 768px) {
    height:300px;
}
`;
const TT = styled.p`
margin:0;
color:${({ theme }) => theme.trendingSectionSubTitles};
@media screen and (max-width: 768px) {
    font-size:14px;
}

`
const LL = styled.p`
margin:0;
color:${Colors.recommendedDark};
@media screen and (max-width: 768px) {
    font-size:14px;
}
`
const P = styled.p`
margin:0;
@media screen and (max-width: 768px) {
    font-size:14px;
}
`
// const AccStyle = ;
const NFTSingle = ({ theme, themeToggler }) => {
    const [addOfferOpen , setAddOfferOpen] = useState(false)
    const handleClose = () => setAddOfferOpen(false)
    return (
        <>
            <div className="pdng"
            //  style={{ padding: "0 32px" }}
            >
                <Navbar theme={theme} themeToggler={themeToggler} />
                <div className="my-5 d-flex flex-column justify-content-between align-items-center" >
                    {/* top section(nft details) */}
                    <div className="row p-0 w-100 justify-content-between">
                        <div className="mb-1 d-flex d-sm-none p-0 align-items-center justify-content-between">
                            <div className="col-10 d-flex justify-content-start align-items-center">
                                <Subtitle style={{ fontSize: "14px" }}><I3Dcube size="12" />&nbsp;collection:</Subtitle>
                                <p className="m-0" style={{ fontWeight: "bold" }}>&nbsp;collection name</p>
                            </div>
                            <div className="col-2 d-flex justify-content-end align-items-center">
                                <Framer size="20" />
                                <Share size="20" />
                                <More size="20" />
                            </div>
                        </div>
                        <NFT className="col-12 col-sm-6 col-md-5">
                        </NFT>
                        <div className="p-0 col-12 col-sm-6 col-md-7 d-flex flex-column">
                            <div className="d-none d-sm-flex p-0 align-items-center justify-content-between">
                                <div className="col-9 d-flex justify-content-start align-items-center ms-sm-2">
                                    <Subtitle style={{ fontSize: "14px" }}><I3Dcube size="12" />&nbsp;collection:</Subtitle>
                                    <p className="m-0" style={{ fontWeight: "bold" }}>&nbsp;collection name</p>
                                </div>
                                <div className="col-2 d-flex justify-content-between align-items-center">
                                    <Framer size="20" />
                                    <Share size="20" />
                                    <More size="20" />
                                </div>
                            </div>
                            <div className="d-flex justify-content-center justify-content-md-between ms-sm-2" >
                                <div className="d-flex col-12 col-md-7 flex-column justify-content-between">
                                    <div className="my-1 d-flex flex-column justify-content-center">
                                        <h5 className="m-0" style={{ fontWeight: 600 }}>Product Name</h5>
                                        <p className="m-0">Owner</p>
                                    </div>
                                    <div className="mt-1 mb-4 d-flex align-items-center">
                                        <Subtitle style={{ fontSize: "12px" }}><Heart size="22" />&nbsp;<Num >5</Num>&nbsp;Favorites</Subtitle>
                                        <Subtitle className="ms-4" style={{ fontSize: "12px" }}><Profile2User size="22" />&nbsp;<Num >5</Num>&nbsp;Owner</Subtitle>
                                    </div>
                                    <Description className="my-1 d-none d-md-flex">
                                        <div className="d-flex">
                                            <Subtitle>By:</Subtitle><p className="m-0" style={{ fontWeight: "bold" }}>&nbsp;Creator</p>
                                        </div>
                                        <DesP className="m-0">
                                            A membership NFT give you early access to future JRNY NFT sets.exclusive NFT videos ,early access to partner NFT projects and more A membership NFT give you early
                                        </DesP>
                                    </Description>
                                    <div className="mt-3 mb-1 d-flex align-items-center">
                                        <EthereumClassic color={Colors.recommendedDark} size="15" />
                                        <h5 className="m-0" style={{ fontWeight: "bold" }}>2.46 ETH</h5>
                                        <Subtitle style={{ fontSize: "14px" }}>$223.34</Subtitle>
                                    </div>
                                    <div className="d-flex flex-column flex-md-row justify-content-between">
                                        <div className="col-12 col-md-5"><ButtonMedium className="mb-1 mb-md-0">Button</ButtonMedium></div>
                                        <div className="col-12 col-md-5"><ButtonOutline style={{width:"100%",padding:"12px"}} onClick={()=>setAddOfferOpen(true)}>Make Offer</ButtonOutline></div>
                                    </div>
                                </div>
                                <div className="mt-2 d-none d-md-flex col-4 flex-column text-center justify-content-center align-items-center">
                                    <p className="m-0">Properties</p>
                                    <PropCard className="col-12 my-1">
                                        <div className="d-flex">
                                            <p className="m-0" style={{ fontSize: "14px", fontWeight: "bold", color: theme == 'light' ? '#666666' : '#d9d9d9' }}>background:</p><p className="m-0" style={{ fontWeight: "bold" }}>Pink</p>
                                        </div>
                                        <Line />
                                        <Subtitle style={{ fontSize: "12px" }}>15% have this trait</Subtitle>
                                    </PropCard>
                                    <PropCard className="col-12 my-1">
                                        <div className="d-flex">
                                            <p className="m-0" style={{ fontSize: "14px", fontWeight: "bold", color: theme == 'light' ? '#666666' : '#d9d9d9' }}>background:</p><p className="m-0" style={{ fontWeight: "bold" }}>Pink</p>
                                        </div>
                                        <Line />
                                        <Subtitle style={{ fontSize: "12px" }}>15% have this trait</Subtitle>
                                    </PropCard>
                                    <PropCard className="col-12 my-1">
                                        <div className="d-flex">
                                            <p className="m-0" style={{ fontSize: "14px", fontWeight: "bold", color: theme == 'light' ? '#666666' : '#d9d9d9' }}>background:</p><p className="m-0" style={{ fontWeight: "bold" }}>Pink</p>
                                        </div>
                                        <Line />
                                        <Subtitle style={{ fontSize: "12px" }}>15% have this trait</Subtitle>
                                    </PropCard>
                                    <PropCard className="col-12 my-1">
                                        <div className="d-flex">
                                            <p className="m-0" style={{ fontSize: "14px", fontWeight: "bold", color: theme == 'light' ? '#666666' : '#d9d9d9' }}>background:</p><p className="m-0" style={{ fontWeight: "bold" }}>Pink</p>
                                        </div>
                                        <Line />
                                        <Subtitle style={{ fontSize: "12px" }}>15% have this trait</Subtitle>
                                    </PropCard>

                                    <div style={{ cursor: "pointer", fontSize: "12px" }} className="align-self-center text-center p-3">
                                        View All
                                        <br />
                                        <div style={{ width: "auto", padding: "0" }}><ArrowDown2 size="12" /></div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                    {/* properties in tablet and mobile screen */}
                    <div className="d-flex w-100 d-md-none flex-column">
                        <p className="m-0">Properties</p>
                        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-sm-between p-0">
                            <PropCard className="col-12 col-sm-3 m-1">
                                <div className="d-flex">
                                    <p className="m-0" style={{ fontSize: "14px", fontWeight: "bold", color: theme == 'light' ? '#666666' : '#d9d9d9' }}>background:</p><p className="m-0" style={{ fontWeight: "bold" }}>Pink</p>
                                </div>
                                <Line />
                                <Subtitle style={{ fontSize: "12px" }}>15% have this trait</Subtitle>
                            </PropCard>
                            <PropCard className="col-12 col-sm-3 m-1">
                                <div className="d-flex">
                                    <p className="m-0" style={{ fontSize: "14px", fontWeight: "bold", color: theme == 'light' ? '#666666' : '#d9d9d9' }}>background:</p><p className="m-0" style={{ fontWeight: "bold" }}>Pink</p>
                                </div>
                                <Line />
                                <Subtitle style={{ fontSize: "12px" }}>15% have this trait</Subtitle>
                            </PropCard>
                            <PropCard className="col-12 col-sm-3 m-1">
                                <div className="d-flex">
                                    <p className="m-0" style={{ fontSize: "14px", fontWeight: "bold", color: theme == 'light' ? '#666666' : '#d9d9d9' }}>background:</p><p className="m-0" style={{ fontWeight: "bold" }}>Pink</p>
                                </div>
                                <Line />
                                <Subtitle style={{ fontSize: "12px" }}>15% have this trait</Subtitle>
                            </PropCard>
                            <PropCard className="col-12 col-sm-3 m-1">
                                <div className="d-flex">
                                    <p className="m-0" style={{ fontSize: "14px", fontWeight: "bold", color: theme == 'light' ? '#666666' : '#d9d9d9' }}>background:</p><p className="m-0" style={{ fontWeight: "bold" }}>Pink</p>
                                </div>
                                <Line />
                                <Subtitle style={{ fontSize: "12px" }}>15% have this trait</Subtitle>
                            </PropCard>
                        </div>
                        <Description className="mt-3">
                            <div className="d-flex">
                                <Subtitle>By:</Subtitle><p className="m-0" style={{ fontWeight: "bold" }}>&nbsp;Creator</p>
                            </div>
                            <DesP className="m-0">
                                A membership NFT give you early access to future JRNY NFT sets.exclusive NFT videos ,early access to partner NFT projects and more A membership NFT give you early
                            </DesP>
                        </Description>
                    </div>
                    {/* Accordions */}
                    <div className="my-3 w-100 d-flex flex-column flex-md-row">
                        <div className="col-12 col-md-6 me-md-1">
                            <Accordion sx={{
                                marginTop: '12px',
                                width: '100%',
                                bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                                color: theme == 'light' ? "#4d4d4d" : "#e6e6e6",
                                border: 'none',
                                boxShadow: 'none',
                                '&:before': {
                                    bgcolor: 'transparent',
                                },
                                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                                borderRadius: '24px !important',
                            }}>
                                <AccordionSummary
                                    expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography sx={{ display: "flex", alignItems: "center", color: theme == 'light' ? `${Colors.gray7}` : `${Colors.gray2}` }}><DocumentText size="18" className="me-1" />Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="d-flex flex-column">
                                        <div className="d-flex justify-content-between w-100 align-items-center">
                                            <TT className="m-0">Contract Address</TT>
                                            <LL className="m-0">546gdrs54341...</LL>
                                        </div>
                                        <div className="d-flex justify-content-between w-100 align-items-center">
                                            <TT className="m-0">Token ID</TT>
                                            <LL className="m-0">768561x765426x87</LL>
                                        </div>
                                        <div className="d-flex justify-content-between w-100 align-items-center">
                                            <TT className="m-0">Token Standard</TT>
                                            <P className="m-0">ERC-1155</P>
                                        </div>
                                        <div className="d-flex justify-content-between w-100 align-items-center">
                                            <TT className="m-0">Chain</TT>
                                            <P className="m-0">Ethereum</P>
                                        </div>
                                        <div className="d-flex justify-content-between w-100 align-items-center">
                                            <TT className="m-0">Last Update</TT>
                                            <P className="m-0">20</P>
                                        </div>
                                        <div className="d-flex justify-content-between w-100 align-items-center">
                                            <TT className="m-0">Creator Fee</TT>
                                            <P className="m-0">5%</P>
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{
                                marginTop: '12px',
                                width: '100%',
                                bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                                color: theme == 'light' ? "#4d4d4d" : "#e6e6e6",
                                border: 'none',
                                boxShadow: 'none',
                                '&:before': {
                                    bgcolor: 'transparent',
                                },
                                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                                borderRadius: '24px !important',
                            }}>
                                <AccordionSummary
                                    expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography sx={{ display: "flex", alignItems: "center" }}><TableDocument size="18" className="me-1" />Listings</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ListingHistory />
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{
                                marginTop: '12px',
                                width: '100%',
                                bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                                color: theme == 'light' ? "#4d4d4d" : "#e6e6e6",
                                border: 'none',
                                boxShadow: 'none',
                                '&:before': {
                                    bgcolor: 'transparent',
                                },
                                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                                borderRadius: '24px !important',
                            }}>
                                <AccordionSummary
                                    expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography sx={{ display: "flex", alignItems: "center" }}><DeviceMessage size="18" className="me-1" />about broadside</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="d-flex flex-column">
                                        <p style={{ fontWeight: "bold" }}>Collection Name</p>
                                        <TT>
                                            Ugh! I'm Rare! Jaguar Bubblegum. I'm often referred to as the Frodo Baggins of the group. I like to listen to Metallica while grooming. Don't judge me. Maybe you and I can be partners in crime.Ugh! I'm Rare! Jaguar Bubblegum. I'm often referred to as the Frodo Baggins of the group. I like to listen to Metallica while grooming. Don't judge me. Maybe you and I can be partners in crime.
                                        </TT>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{
                                marginTop: '12px',
                                width: '100%',
                                bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                                color: theme == 'light' ? "#4d4d4d" : "#e6e6e6",
                                border: 'none',
                                boxShadow: 'none',
                                '&:before': {
                                    bgcolor: 'transparent',
                                },
                                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                                borderRadius: '24px !important',
                            }}>
                                <AccordionSummary
                                    expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography sx={{ display: "flex", alignItems: "center" }}><ChartSuccess size="18" className="me-1" />state</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="d-flex justify-content-between"><TT>Generation</TT><p style={{ margin: 0, fontWeight: "bold" }}>33.45</p></div>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                        <div className="col-12 col-md-6 ms-md-1">
                            <Accordion sx={{
                                marginTop: '12px',
                                width: '100%',
                                bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                                color: theme == 'light' ? "#4d4d4d" : "#e6e6e6",
                                border: 'none',
                                boxShadow: 'none',
                                '&:before': {
                                    bgcolor: 'transparent',
                                },
                                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                                borderRadius: '24px !important',
                            }}>
                                <AccordionSummary
                                    expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography sx={{ display: "flex", alignItems: "center" }}><ForwardItem size="18" className="me-1" />Items</Typography>
                                </AccordionSummary>
                                <AccordionDetails className="p-0 pe-3 pb-3">
                                    <ItemsCopy />
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{
                                marginTop: '12px',
                                width: '100%',
                                bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                                color: theme == 'light' ? "#4d4d4d" : "#e6e6e6",
                                border: 'none',
                                boxShadow: 'none',
                                '&:before': {
                                    bgcolor: 'transparent',
                                },
                                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                                borderRadius: '24px !important',
                            }}>
                                <AccordionSummary
                                    expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography sx={{ display: "flex", alignItems: "center" }}><Diagram size="18" className="me-1" />Offers</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <OfferHistory theme={theme} />
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{
                                marginTop: '12px',
                                width: '100%',
                                bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                                color: theme == 'light' ? "#4d4d4d" : "#e6e6e6",
                                border: 'none',
                                boxShadow: 'none',
                                '&:before': {
                                    bgcolor: 'transparent',
                                },
                                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                                borderRadius: '24px !important',
                            }}>
                                <AccordionSummary
                                    expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography sx={{ display: "flex", alignItems: "center" }}><Chart1 size="18" className="me-1" />Price History</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <p>detail</p>
                                </AccordionDetails>
                            </Accordion>
                        </div>

                    </div>
                    {/* item activity */}
                    <ItemActivity />
                    <MoreOfColl />
                </div>
            </div>
            <Footer />


            <OfferModal open={addOfferOpen} theme={theme} handleClose={handleClose}/>
        </>
    );
}

export default NFTSingle;