import styled from 'styled-components';
import Navbar from '../components/Navbar/Navbar';
import '../styles.css'
import bgDes from '../assets/bgDots-desktop.svg'
import bgTab from '../assets/bgDots-tablet.svg'
import bgMob from '../assets/bgDots-mobile.svg'
import { Tab, Tabs } from 'react-bootstrap';
import CollectionCard from '../components/Cards/CollectionListingCard';
import { ArrowDown2 } from 'iconsax-react';
import SSelection from '../components/Selection';
import { Typography } from '@mui/material';
import ImgHd from '../assets/stats-pic.svg'
import { useState } from 'react';
import { useEffect } from 'react';
import { TestColls } from '../utils/testCollections';
import { useSelector } from 'react-redux';
import WalletConnect from '../components/Navbar/WalletConnect';
import { ButtonLarge } from '../components/design/Buttons';

const HeaderContainer = styled.div`
    background-color: ${({ theme }) => theme.collectionCardHover};
    background-image: url(${bgDes});
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;
    height:155px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    @media screen and (max-width: 768px) {
        background-image: url(${bgTab});
        height:150px;
    }
    @media screen and (max-width: 600px) {
        background-image: url(${bgMob});
        height:135px;
    }
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
`;

const IconContainer = styled.div`
    border-left: 1px solid #D9D9D9;
    height:100%;
    padding:4px 0 5px;
    width:auto;
    &:hover{
        background-color: ${({ theme }) => theme.hoverIcon};
    }
`;
const TitlesContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left:48px;
    color: ${({ theme }) => theme.trendingSectionSubTitles};
    @media screen and (max-width: 600px) {
        padding-right:0;
    }
`;

const Card = styled.div`
    height:80px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 8px;
    background: ${({ theme }) => theme.collectionCard};
    border-radius: 24px;
    cursor:pointer;
    &:hover{
        background: ${({ theme }) => theme.collectionCardHover};
    }
    &:active{
        background: ${({ theme }) => theme.collectionCardActive};
    }

    `
    ;
const ColLogoHolder = styled.div`
    box-sizing: border-box;
    background: #D9D9D9;
    border: 1px solid #D9D9D9;
    border-radius:50%;
    width:50px;
    height:50px;
    `;
const PriceUnit = styled.span`
color: ${({ theme }) => theme.pricesUnits};
font-weight:400;
`;
const ImageH = styled.div`
background-image: url(${ImgHd});
background-size:contain;
background-repeat:no-repeat;
background-position:right;
height:100%;
width:200px;
`
const Stats = ({ theme, themeToggler }) => {
    const [trendingColls, setTrendingColls] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [anchorEl, setAnchorEl] = useState(null);
    const [walletMenu, setWalletMenu] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [walletDesOpen, setWalletDesOpen] = useState(false)
    useEffect(() => {
        setTrendingColls(TestColls.collections)
    }, [])
    useEffect(() => {
        if (trendingColls) {
            console.log(trendingColls)
            setLoading(false)
        }
    }, [trendingColls])

    const globalUser = useSelector(state => state.userReducer);
    const walletDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        // setAnchorEl(event.currentTarget);
        setAnchorEl(window.document.getElementById("profile-tab"))
        setWalletDesOpen(!walletDesOpen);
        setWalletMenu({ ...walletMenu, [anchor]: open });
    };

    return (
        <>{loading ?
            <></> :
            <>
                <div className="pdng">
                    <Navbar theme={theme} themeToggler={themeToggler} />
                </div>
                <div className='w-100 d-flex flex-column'>
                    <HeaderContainer className='my-5 py-1 px-4'>
                        <Typography sx={{ fontWeight: 600, fontSize: { xs: '20px', sm: '36px' } }} variant='h1'>Stats</Typography>
                        <ImageH />
                    </HeaderContainer>
                    <div className='pdng d-flex flex-column'>
                        <Tabs
                            fill
                            //  justify
                            defaultActiveKey={window.location.hash ? window.location.hash.replace('#', '') : "trending"}
                            className="m-0 mb-3 tab-scroll"
                            style={{ color: theme === 'light' ? "#5D3393" : "#DABDDF", borderColor: theme === 'light' ? "#5D3393" : "#DABDDF", borderBottom: "none" }}
                        >
                            <Tab
                                // style={{ color: theme === 'light' ? "#4d4d4d" : "#b3b3b3" }}
                                eventKey="trending" title="Trending">
                                <div className='d-flex flex-column'>
                                    <div className="d-flex justify-content-between align-items-center p-0 mb-4">
                                        <div>
                                            <Selection className="d-none d-sm-flex">
                                                <IconContainer className="px-4 text-center d-flex justify-content-center align-items-center" >1 H</IconContainer>
                                                <IconContainer className="px-4 text-center d-flex justify-content-center align-items-center" >3 H</IconContainer>
                                                <IconContainer className="px-4 text-center d-flex justify-content-center align-items-center" >4 H</IconContainer>
                                                <IconContainer className="px-4 text-center d-flex justify-content-center align-items-center" >24 H</IconContainer>
                                                <IconContainer className="px-4 text-center d-flex justify-content-center align-items-center" >2 D</IconContainer>
                                            </Selection>
                                            {/* 
                                        <Selection className="d-flex d-sm-none p-2" >
                                            24 hours
                                            <div style={{ width: "auto", padding: "4px 0 5px" }}><ArrowDown2 /></div>
                                        </Selection> */}

                                            <div className="d-flex d-sm-none">
                                                <SSelection width={'100%'} theme={theme} tabs={['24 hours', '7 days',]} />
                                            </div>


                                        </div>
                                        {/* <div> */}
                                        <SSelection width={'200px'} theme={theme} tabs={['all categories', 'art', 'art', 'art', 'art', 'art']} />

                                        {/* <Selection className="row p-2" >
                                            All categories
                                            <div style={{ width: "auto", padding: "4px 0 5px" }}><ArrowDown2 /></div>
                                        </Selection> */}
                                        {/* </div> */}
                                    </div>
                                    <TitlesContainer className='mb-1'>
                                        <p className='m-0'>Collection</p>
                                        <p className='m-0'>Volume</p>
                                    </TitlesContainer>
                                    <>
                                        <Card className="d-flex">
                                            <div style={{
                                                display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                                                // border: "1px solid blue",
                                                width: "60%"
                                            }}>
                                                <div className='text-center' style={{ width: "40px" }}>1&nbsp;&nbsp;</div>
                                                <ColLogoHolder></ColLogoHolder>
                                                <div>&nbsp;&nbsp;name&nbsp;&nbsp;</div>
                                            </div>
                                            <div style={{
                                                display: "flex", flexDirection: "row", justifyContent: "end", alignItems: "center",
                                                // border: "1px solid blue",
                                                width: "30%",
                                                fontWeight: 600
                                            }}>
                                                0.2&nbsp;<PriceUnit>ETH</PriceUnit>
                                            </div>
                                        </Card>
                                        <Card className="d-flex">
                                            <div style={{
                                                display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                                                // border: "1px solid blue",
                                                width: "60%"
                                            }}>
                                                <div className='text-center' style={{ width: "40px" }}>1&nbsp;&nbsp;</div>
                                                <ColLogoHolder></ColLogoHolder>
                                                <div>&nbsp;&nbsp;name&nbsp;&nbsp;</div>
                                            </div>
                                            <div style={{
                                                display: "flex", flexDirection: "row", justifyContent: "end", alignItems: "center",
                                                // border: "1px solid blue",
                                                width: "30%",
                                                fontWeight: 600
                                            }}>
                                                0.2&nbsp;<PriceUnit>ETH</PriceUnit>
                                            </div>
                                        </Card>
                                        <Card className="d-flex">
                                            <div style={{
                                                display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                                                // border: "1px solid blue",
                                                width: "60%"
                                            }}>
                                                <div className='text-center' style={{ width: "40px" }}>1&nbsp;&nbsp;</div>
                                                <ColLogoHolder></ColLogoHolder>
                                                <div>&nbsp;&nbsp;name&nbsp;&nbsp;</div>
                                            </div>
                                            <div style={{
                                                display: "flex", flexDirection: "row", justifyContent: "end", alignItems: "center",
                                                // border: "1px solid blue",
                                                width: "30%",
                                                fontWeight: 600
                                            }}>
                                                0.2&nbsp;<PriceUnit>ETH</PriceUnit>
                                            </div>
                                        </Card>
                                        <Card className="d-flex">
                                            <div style={{
                                                display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                                                // border: "1px solid blue",
                                                width: "60%"
                                            }}>
                                                <div className='text-center' style={{ width: "40px" }}>1&nbsp;&nbsp;</div>
                                                <ColLogoHolder></ColLogoHolder>
                                                <div>&nbsp;&nbsp;name&nbsp;&nbsp;</div>
                                            </div>
                                            <div style={{
                                                display: "flex", flexDirection: "row", justifyContent: "end", alignItems: "center",
                                                // border: "1px solid blue",
                                                width: "30%",
                                                fontWeight: 600
                                            }}>
                                                0.2&nbsp;<PriceUnit>ETH</PriceUnit>
                                            </div>
                                        </Card>
                                        <Card className="d-flex">
                                            <div style={{
                                                display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                                                // border: "1px solid blue",
                                                width: "60%"
                                            }}>
                                                <div className='text-center' style={{ width: "40px" }}>1&nbsp;&nbsp;</div>
                                                <ColLogoHolder></ColLogoHolder>
                                                <div>&nbsp;&nbsp;name&nbsp;&nbsp;</div>
                                            </div>
                                            <div style={{
                                                display: "flex", flexDirection: "row", justifyContent: "end", alignItems: "center",
                                                // border: "1px solid blue",
                                                width: "30%",
                                                fontWeight: 600
                                            }}>
                                                0.2&nbsp;<PriceUnit>ETH</PriceUnit>
                                            </div>
                                        </Card>
                                        <Card className="d-flex">
                                            <div style={{
                                                display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                                                // border: "1px solid blue",
                                                width: "60%"
                                            }}>
                                                <div className='text-center' style={{ width: "40px" }}>1&nbsp;&nbsp;</div>
                                                <ColLogoHolder></ColLogoHolder>
                                                <div>&nbsp;&nbsp;name&nbsp;&nbsp;</div>
                                            </div>
                                            <div style={{
                                                display: "flex", flexDirection: "row", justifyContent: "end", alignItems: "center",
                                                // border: "1px solid blue",
                                                width: "30%",
                                                fontWeight: 600
                                            }}>
                                                0.2&nbsp;<PriceUnit>ETH</PriceUnit>
                                            </div>
                                        </Card>
                                        <Card className="d-flex">
                                            <div style={{
                                                display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                                                // border: "1px solid blue",
                                                width: "60%"
                                            }}>
                                                <div className='text-center' style={{ width: "40px" }}>1&nbsp;&nbsp;</div>
                                                <ColLogoHolder></ColLogoHolder>
                                                <div>&nbsp;&nbsp;name&nbsp;&nbsp;</div>
                                            </div>
                                            <div style={{
                                                display: "flex", flexDirection: "row", justifyContent: "end", alignItems: "center",
                                                // border: "1px solid blue",
                                                width: "30%",
                                                fontWeight: 600
                                            }}>
                                                0.2&nbsp;<PriceUnit>ETH</PriceUnit>
                                            </div>
                                        </Card>
                                    </>
                                </div>

                            </Tab>
                            <Tab eventKey="top" title="Top">
                                <div className="row flex-wrap p-0">
                                    {trendingColls.map((collection, index) => {
                                        return <CollectionCard theme={theme} index={index + 1} collectionFloor={collection.floor_price} collectionName={collection.title} collectionVolume={collection.volume} collectionLogo={collection.logo_path} />
                                    })}
                                </div>
                            </Tab>
                            <Tab eventKey="watchlist" title="Watchlist">
                                <div className="row flex-wrap p-0">
                                    {globalUser.isLoggedIn ?
                                        <>
                                            {trendingColls.map((collection, index) => {
                                                return <CollectionCard theme={theme} index={index + 1} collectionFloor={collection.floor_price} collectionName={collection.title} collectionVolume={collection.volume} collectionLogo={collection.logo_path} />
                                            })}
                                        </>
                                        :
                                        <>
                                            <div className="d-flex my-5 justify-content-center align-items-center">
                                                <ButtonLarge onClick={walletDrawer('bottom', true)}>connect wallet</ButtonLarge>
                                                <WalletConnect toggleDrawer={walletDrawer} state={walletMenu} theme={theme} anchorEl={anchorEl} walletDesOpen={walletDesOpen}/>
                                            </div>
                                        </>
                                    }
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </>
        }</>
    );
}

export default Stats;