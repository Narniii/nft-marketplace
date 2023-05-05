import { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router';
import DropCard from '../components/Drops/DropCard';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar/Navbar';
import '../styles.css'
import colBg1 from '../assets/UFESLT8MzQoDaA3UDkjDSj.jpg'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { ArrowDown2, Instagram } from 'iconsax-react';
import { Colors } from '../components/design/Colors';
import styled from 'styled-components';
import { percentage } from '../utils/countingFunctions';
import { ButtonLarge } from '../components/design/Buttons';
import bg1 from '../assets/bg1.jpg'
import bg2 from '../assets/bg2.svg'
import bg3 from '../assets/bg3.jpg'

const ProgressBar = styled.div`
height:10px;
width:100%;
border-radius:47px;
background-color:${({ theme }) => theme.activeTab};
overflow:hidden;
`
const Progress = styled.div`
height:100%;
background:${Colors.gradientPurpleLight};
`
const DetCard = styled.div`
background: ${({ theme }) => theme.profilePageGradient};
display:flex;
flex-direction:column;
padding:16px;
border-radius:24px;
`
const Par = styled.p`
color:${({ theme }) => theme.par};
font-size:14px;
`
const TitSchedule = styled.p`
color:${({ theme }) => theme.trendingSectionTitles};
font-size:20px;
font-weight:500;
`
const NFT = styled.div`
  background-size:cover;
  background-repeat:no-repeat;
  background-position:center;
  border-radius: 24px;
  height:600px;
  width:100%;
  overflow:hidden;
  display:flex;
  flex-direction:column;
  justify-content:start;
  @media screen and (max-width: 768px) {
    height:400px;
  }  
`;
const OtherPix = styled.div`
  width:80px;
  height:80px;
//   background: ${({ theme }) => theme.profilePageGradient};
    background-color:#D9D9D9;
    border-radius:12px;
`
const RoadMapCards = styled.div`
  background: ${({ theme }) => theme.collectionCardHover};
  border-radius:24px;
  overflow:hidden;
  position:relative;
  height:130px;
  padding:16px;
  margin-bottom:12px;
  @media screen and (max-width: 768px) {
    height:280px;
  }  
`
const RoadMapCardsLabel = styled.div`
    background: ${Colors.successDark};
    width:180px;
    height:180px;
    transform: rotate(45deg);
    position:absolute;
    top:-120px;
    right:-100px;
    box-shadow:0px 4px 18px rgba(0, 0, 0, 0.2);
`
const RoadMapCardsImage = styled.div`
  background-size:cover;
  background-repeat:no-repeat;
  background-position:center;
  border-radius: 12px;
  height:100px;
  width:100px;
`;
const RoadMapCardsDescription = styled.div`
overflow-y:scroll;
font-size:14px;
height:105px;
scrollbar-width: 0px;
width:80%;
-ms-overflow-style: none;
display:flex;
flex-direction:column;
&::-webkit-scrollbar {
    display:none;
}
&::-webkit-scrollbar-thumb {
}
&::-webkit-scrollbar-button{
    display:none;
}
@media screen and (max-width: 768px) {
    height:210px;
    width:226px;
  }  

`

const GenerativeCol = ({ theme, themeToggler }) => {
    const { status } = useParams()
    const [tab, setTab] = useState(window.location.hash ? window.location.hash.replace('#', '') : "mint")


    return (
        <>
            <div className="pdng d-flex flex-column">
                <Navbar theme={theme} themeToggler={themeToggler} />
                <DropCard theme={theme} status={status} colBg={colBg1} />
                <Tabs
                    fill
                    // justify
                    defaultActiveKey={window.location.hash ? window.location.hash.replace('#', '') : "mint"}
                    className="m-0 my-5 tab-scroll"
                    style={{
                        color: theme === 'light' ? "#5D3393" : "#DABDDF",
                        // borderColor: theme === 'light' ? "#5D3393" : "#DABDDF",
                        // borderBottom: "none"
                    }}
                    onSelect={(e) => setTab(e)}
                >
                    <Tab eventKey="mint" title="Mint">
                        <div className='d-flex w-100 flex-column flex-md-row mb-5'>
                            <div className="col-12 col-md-6 d-flex flex-column me-2">
                                <Typography sx={{ mb: 1, fontWeight: 600, fontSize: { xs: "16px", md: "20px" }, }}>CHCC Genesis Collection Chest</Typography>
                                <Typography sx={{ mb: 3, fontWeight: 600, fontSize: { xs: "14px", md: "16px" }, }}> <span style={{ fontWeight: 400 }}>By:</span>Splinterlands</Typography>
                                <div style={{ width: '200px' }} className='d-flex justify-content-between'><Instagram /><Instagram /><Instagram /><Instagram /><Instagram /><Instagram /></div>
                                <Typography sx={{ mb: 1, mt: 3, fontWeight: 400, fontSize: '14px', }}>Introducing the very first generative NFT for the popular Splinterlands game! With thousands of active players across the world, Splinterlands is heralded as one of the great pioneers in play-to-earn blockchain gaming. Be part of history by minting a unique one-of-a-kind</Typography>
                                <div className='d-flex align-items-center mb-5' style={{ cursor: "pointer" }}><Typography sx={{ fontWeight: 500, fontSize: "14px" }}>See More</Typography><ArrowDown2 size='18' /></div>
                                <div className='d-flex w-100 justify-content-between'><Typography sx={{ color: Colors.primaryMain, size: "14px" }}>90%</Typography><Typography sx={{ size: "12px" }}>6,500 / 6,500</Typography></div>
                                <ProgressBar className="mt-1 mb-5"><Progress style={{ width: `${percentage(90, 100)}%` }} /></ProgressBar>
                                <DetCard className='mb-5'>
                                    <Typography className='mb-2' sx={{ color: Colors.primaryMain, fontSize: "20px" }}>Coming Soon</Typography>
                                    <Typography className='mb-2' sx={{ fontWeight: 600, fontSize: "14px" }}>0.69 ETH</Typography>
                                    <Par>Minting Items</Par>
                                    <ButtonLarge className='mt-3'>View Collection</ButtonLarge>
                                </DetCard>
                                <TitSchedule>Mint Schedule</TitSchedule>
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    <li>Allow List</li>
                                    <li>Allow List</li>
                                    <li>Allow List</li>
                                </ul>
                            </div>
                            <div className="col-12 col-md-6 ms-2 d-flex flex-column">
                                <NFT style={{ backgroundImage: `url(${colBg1})` }} />
                                <div className='w-100 mt-1 d-flex justify-content-between'>
                                    <OtherPix />
                                    <OtherPix />
                                    <OtherPix />
                                    <OtherPix />
                                </div>
                            </div>
                        </div>
                        <div className='d-flex flex-column flex-sm-row justify-content-between mb-5'>
                            <NFT className="me-4" style={{ backgroundImage: `url(${bg1})` }} />
                            <div className='d-flex flex-column col-12 col-sm-6 col-md-5'>
                                <Typography sx={{ fontWeight: 600 }}>Extraordinarily Unique</Typography>
                                <Typography sx={{}}>With over 2 Billion different combinations, each Runi pulls from a wide assortment of traits that span from cute to weird to cool and everything in between. Find the perfect Runi that reflects the style and personality that resonates with YOU. When played within the game, not only is each Runi extraordinarily unique...but they are powerful max-level Legendary cards that can turn the tide of battle! Prepare to claim victory (and rewards) within the arena!
                                    With over 2 Billion different combinations, each Runi pulls from a wide assortment of traits that span from cute to weird to cool and everything in between. Find the perfect Runi that reflects the style and personality that resonates with YOU. When played within the game, not only is each Runi extraordinarily unique...but they are powerful max-level Legendary cards that can turn the tide of battle! Prepare to claim victory (and rewards) within the arena!</Typography>
                            </div>
                        </div>
                        <NFT className="mb-5" style={{ backgroundImage: `url(${bg2})` }} />
                        <div className='d-flex flex-column flex-sm-row justify-content-between mb-5'>
                            <div className='d-flex flex-column col-12 col-sm-5'>
                                <Typography sx={{ fontWeight: 600 }}>Extraordinarily Unique</Typography>
                                <Typography sx={{}}>With over 2 Billion different combinations, each Runi pulls from a wide assortment of traits that span from cute to weird to cool and everything in between. Find the perfect Runi that reflects the style and personality that resonates with YOU. When played within the game, not only is each Runi extraordinarily unique...but they are powerful max-level Legendary cards that can turn the tide of battle! Prepare to claim victory (and rewards) within the arena!
                                    With over 2 Billion different combinations, each Runi pulls from a wide assortment of traits that span from cute to weird to cool and everything in between. Find the perfect Runi that reflects the style and personality that resonates with YOU. When played within the game, not only is each Runi extraordinarily unique...but they are powerful max-level Legendary cards that can turn the tide of battle! Prepare to claim victory (and rewards) within the arena!</Typography>
                            </div>
                            <div className='d-flex flex-column col-12 col-sm-5'>
                                <Typography sx={{ fontWeight: 600 }}>Extraordinarily Unique</Typography>
                                <Typography sx={{}}>With over 2 Billion different combinations, each Runi pulls from a wide assortment of traits that span from cute to weird to cool and everything in between. Find the perfect Runi that reflects the style and personality that resonates with YOU. When played within the game, not only is each Runi extraordinarily unique...but they are powerful max-level Legendary cards that can turn the tide of battle! Prepare to claim victory (and rewards) within the arena!
                                    With over 2 Billion different combinations, each Runi pulls from a wide assortment of traits that span from cute to weird to cool and everything in between. Find the perfect Runi that reflects the style and personality that resonates with YOU. When played within the game, not only is each Runi extraordinarily unique...but they are powerful max-level Legendary cards that can turn the tide of battle! Prepare to claim victory (and rewards) within the arena!</Typography>
                            </div>
                        </div>
                        <NFT className="mb-5" style={{ backgroundImage: `url(${bg3})` }} />
                    </Tab>
                    <Tab eventKey="roadmap" title="Roadmap">
                        <RoadMapCards className='d-flex'>
                            <RoadMapCardsLabel>Sale</RoadMapCardsLabel>
                            <div className='d-flex'>
                                <RoadMapCardsImage className='me-3' style={{ backgroundImage: `url(${colBg1})` }} />
                                <RoadMapCardsDescription>
                                    <Typography sx={{ fontWeight: 500, fontSize: "16px" }}>Runi Pre-Sale</Typography>
                                    2,000 Runi allowlist spots were sold on Splinterlands' website. All 2,000 spots were sold out in under 2 minutes. The 2,000 allowlist spots grant the owner a 50% discount on mint price on October 25, 2022 for as many allowlist spots that they purchased. One of these allowlist spots grants the ability to mint one Runi at a 50% discount.
                                </RoadMapCardsDescription>
                            </div>
                        </RoadMapCards>
                        <RoadMapCards className='d-flex'>
                            <RoadMapCardsLabel>Sale</RoadMapCardsLabel>
                            <div className='d-flex'>
                                <RoadMapCardsImage className='me-3' style={{ backgroundImage: `url(${colBg1})` }} />
                                <RoadMapCardsDescription>
                                    <Typography sx={{ fontWeight: 500, fontSize: "16px" }}>Runi Pre-Sale</Typography>
                                    2,000 Runi allowlist spots were sold on Splinterlands' website. All 2,000 spots were sold out in under 2 minutes. The 2,000 allowlist spots grant the owner a 50% discount on mint price on October 25, 2022 for as many allowlist spots that they purchased. One of these allowlist spots grants the ability to mint one Runi at a 50% discount.
                                </RoadMapCardsDescription>
                            </div>
                        </RoadMapCards>
                        <RoadMapCards className='d-flex'>
                            <RoadMapCardsLabel>Sale</RoadMapCardsLabel>
                            <div className='d-flex'>
                                <RoadMapCardsImage className='me-3' style={{ backgroundImage: `url(${colBg1})` }} />
                                <RoadMapCardsDescription>
                                    <Typography sx={{ fontWeight: 500, fontSize: "16px" }}>Runi Pre-Sale</Typography>
                                    2,000 Runi allowlist spots were sold on Splinterlands' website. All 2,000 spots were sold out in under 2 minutes. The 2,000 allowlist spots grant the owner a 50% discount on mint price on October 25, 2022 for as many allowlist spots that they purchased. One of these allowlist spots grants the ability to mint one Runi at a 50% discount.
                                </RoadMapCardsDescription>
                            </div>
                        </RoadMapCards>
                        <RoadMapCards className='d-flex'>
                            <RoadMapCardsLabel>Sale</RoadMapCardsLabel>
                            <div className='d-flex'>
                                <RoadMapCardsImage className='me-3' style={{ backgroundImage: `url(${colBg1})` }} />
                                <RoadMapCardsDescription>
                                    <Typography sx={{ fontWeight: 500, fontSize: "16px" }}>Runi Pre-Sale</Typography>
                                    2,000 Runi allowlist spots were sold on Splinterlands' website. All 2,000 spots were sold out in under 2 minutes. The 2,000 allowlist spots grant the owner a 50% discount on mint price on October 25, 2022 for as many allowlist spots that they purchased. One of these allowlist spots grants the ability to mint one Runi at a 50% discount.
                                </RoadMapCardsDescription>
                            </div>
                        </RoadMapCards>
                        <RoadMapCards className='d-flex'>
                            <RoadMapCardsLabel>Sale</RoadMapCardsLabel>
                            <div className='d-flex'>
                                <RoadMapCardsImage className='me-3' style={{ backgroundImage: `url(${colBg1})` }} />
                                <RoadMapCardsDescription>
                                    <Typography sx={{ fontWeight: 500, fontSize: "16px" }}>Runi Pre-Sale</Typography>
                                    2,000 Runi allowlist spots were sold on Splinterlands' website. All 2,000 spots were sold out in under 2 minutes. The 2,000 allowlist spots grant the owner a 50% discount on mint price on October 25, 2022 for as many allowlist spots that they purchased. One of these allowlist spots grants the ability to mint one Runi at a 50% discount.
                                </RoadMapCardsDescription>
                            </div>
                        </RoadMapCards>
                    </Tab>
                    <Tab eventKey="team" title="Team">
                    </Tab>
                    <Tab eventKey="faq" title="FAQ">
                        <div className="d-flex flex-column mb-5">
                            <Accordion sx={{
                                marginBottom: '12px',
                                width: '50%',
                                bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                                color: theme == 'light' ? "#4d4d4d" : "#e6e6e6",
                                border: 'none',
                                boxShadow: 'none',
                                '&:before': {
                                    bgcolor: 'transparent',
                                },
                                '@media screen and (max-width: 768px)': {
                                    width: '100%',
                                },
                                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                                borderRadius: '24px !important',
                            }}>
                                <AccordionSummary
                                    expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>what is capsule community curated?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <p>With over 2 Billion different combinations, each Runi pulls from a wide assortment of traits that span from cute to weird to cool and everything in between. Find the perfect Runi that reflects the style and personality that resonates with YOU. When played within the game, not only is each Runi extraordinarily unique...but they are powerful max-level Legendary cards that can turn the tide of battle! Prepare to claim victory (and rewards) within the arena!</p>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{
                                marginBottom: '12px',
                                width: '50%',
                                bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                                color: theme == 'light' ? "#4d4d4d" : "#e6e6e6",
                                border: 'none',
                                boxShadow: 'none',
                                '&:before': {
                                    bgcolor: 'transparent',
                                },
                                '@media screen and (max-width: 768px)': {
                                    width: '100%',
                                },
                                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                                borderRadius: '24px !important',
                            }}>
                                <AccordionSummary
                                    expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>what is capsule community curated?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <p>With over 2 Billion different combinations, each Runi pulls from a wide assortment of traits that span from cute to weird to cool and everything in between. Find the perfect Runi that reflects the style and personality that resonates with YOU. When played within the game, not only is each Runi extraordinarily unique...but they are powerful max-level Legendary cards that can turn the tide of battle! Prepare to claim victory (and rewards) within the arena!</p>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{
                                marginBottom: '12px',
                                width: '50%',
                                bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                                color: theme == 'light' ? "#4d4d4d" : "#e6e6e6",
                                border: 'none',
                                boxShadow: 'none',
                                '&:before': {
                                    bgcolor: 'transparent',
                                },
                                '@media screen and (max-width: 768px)': {
                                    width: '100%',
                                },
                                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                                borderRadius: '24px !important',
                            }}>
                                <AccordionSummary
                                    expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>what is capsule community curated?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <p>With over 2 Billion different combinations, each Runi pulls from a wide assortment of traits that span from cute to weird to cool and everything in between. Find the perfect Runi that reflects the style and personality that resonates with YOU. When played within the game, not only is each Runi extraordinarily unique...but they are powerful max-level Legendary cards that can turn the tide of battle! Prepare to claim victory (and rewards) within the arena!</p>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{
                                marginBottom: '12px',
                                width: '50%',
                                bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                                color: theme == 'light' ? "#4d4d4d" : "#e6e6e6",
                                border: 'none',
                                boxShadow: 'none',
                                '&:before': {
                                    bgcolor: 'transparent',
                                },
                                '@media screen and (max-width: 768px)': {
                                    width: '100%',
                                },
                                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                                borderRadius: '24px !important',
                            }}>
                                <AccordionSummary
                                    expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>what is capsule community curated?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <p>With over 2 Billion different combinations, each Runi pulls from a wide assortment of traits that span from cute to weird to cool and everything in between. Find the perfect Runi that reflects the style and personality that resonates with YOU. When played within the game, not only is each Runi extraordinarily unique...but they are powerful max-level Legendary cards that can turn the tide of battle! Prepare to claim victory (and rewards) within the arena!</p>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{
                                marginBottom: '12px',
                                width: '50%',
                                bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                                color: theme == 'light' ? "#4d4d4d" : "#e6e6e6",
                                border: 'none',
                                boxShadow: 'none',
                                '&:before': {
                                    bgcolor: 'transparent',
                                },
                                '@media screen and (max-width: 768px)': {
                                    width: '100%',
                                },
                                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                                borderRadius: '24px !important',
                            }}>
                                <AccordionSummary
                                    expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>what is capsule community curated?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <p>With over 2 Billion different combinations, each Runi pulls from a wide assortment of traits that span from cute to weird to cool and everything in between. Find the perfect Runi that reflects the style and personality that resonates with YOU. When played within the game, not only is each Runi extraordinarily unique...but they are powerful max-level Legendary cards that can turn the tide of battle! Prepare to claim victory (and rewards) within the arena!</p>
                                </AccordionDetails>
                            </Accordion>
                        </div>

                    </Tab>
                </Tabs>

            </div>
            <Footer />
        </>
    );
}

export default GenerativeCol;