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
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { TestColls } from '../utils/testCollections';
import { useSelector } from 'react-redux';
import WalletConnect from '../components/Navbar/WalletConnect';
import { ButtonLarge } from '../components/design/Buttons';
import { MARKET_API } from '../utils/data/market_api';
import { Colors } from '../components/design/Colors';
import WatchListTab from '../components/Stats.js/Watchlist';
import CollectionStatsCard from '../components/Cards/CollectionStatsCard';
import TrendingStats from '../components/Stats.js/TrendingStatsTab';

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
const Title = styled.div`
width:150px;
color: ${({ theme }) => theme.par};
display:flex;
align-items:center;

`

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
    const [loading, setLoading] = useState(false)
    const globalUser = useSelector(state => state.userReducer);



    return (
        <>{loading ?
            <>
            </> :
            <>
                <div className="pdng">
                    <Navbar theme={theme} themeToggler={themeToggler} />
                </div>
                <div className='w-100 d-flex flex-column'>
                    <HeaderContainer className='my-5 py-1 pdng'>
                        <Typography sx={{ fontWeight: 600, fontSize: { xs: '20px', sm: '36px' } }} variant='h1'>Stats</Typography>
                        <ImageH />
                    </HeaderContainer>
                    <div className='pdng d-flex flex-column'>
                        <Tabs
                            fill
                            //  justify
                            defaultActiveKey={window.location.hash ? window.location.hash.replace('#', '') : "trending"}
                            className="m-0 mb-5 tab-scroll"
                            style={{ color: theme === 'light' ? "#5D3393" : "#DABDDF", borderColor: theme === 'light' ? "#5D3393" : "#DABDDF", borderBottom: "none" }}
                        >
                            <Tab
                                className='mb-5'
                                // style={{ color: theme === 'light' ? "#4d4d4d" : "#b3b3b3" }}
                                eventKey="trending" title="Trending">
                                <TrendingStats theme={theme} />
                            </Tab>
                            <Tab className='mb-5' eventKey="top" title="Top">
                                <TrendingStats theme={theme} />
                            </Tab>
                            <Tab className='mb-5' eventKey="watchlist" title="Watchlist">
                                <WatchListTab theme={theme} />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </>
        }</>
    );
}

export default Stats;