import styled from 'styled-components';
import Navbar from '../components/Navbar/Navbar';
import '../styles.css'
import bgDes from '../assets/bgDots-desktop.svg'
import bgTab from '../assets/bgDots-tablet.svg'
import bgMob from '../assets/bgDots-mobile.svg'
import { Tab, Tabs } from 'react-bootstrap';
import CollectionCard from '../components/Cards/CollectionListingCard';
import { ArrowDown2 } from 'iconsax-react';

const HeaderContainer = styled.div`
    background-color: ${({ theme }) => theme.collectionCardHover};
    background-image: url(${bgDes});
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;
    height:155px;
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

const Stats = ({ theme, themeToggler }) => {
    return (
        <>
            <div className="pdng">
                <Navbar theme={theme} themeToggler={themeToggler} />
            </div>
            <div className='w-100 d-flex flex-column'>
                <HeaderContainer className='my-5' />
                <div className='pdng d-flex flex-column'>
                    <Tabs
                        fill
                        //  justify
                        defaultActiveKey="Trending"
                        className="m-0 mb-3 tab-scroll"
                        style={{ color: theme === 'light' ? "#5D3393" : "#DABDDF", borderColor: theme === 'light' ? "#5D3393" : "#DABDDF", borderBottom: "none" }}
                    >
                        <Tab
                            // style={{ color: theme === 'light' ? "#4d4d4d" : "#b3b3b3" }}
                            eventKey="Trending" title="Trending">
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

                                        <Selection className="d-flex d-sm-none p-2" >
                                            24 hours
                                            <div style={{ width: "auto", padding: "4px 0 5px" }}><ArrowDown2 /></div>
                                        </Selection>

                                    </div>
                                    <div>
                                        <Selection className="row p-2" >
                                            All categories
                                            <div style={{ width: "auto", padding: "4px 0 5px" }}><ArrowDown2 /></div>
                                        </Selection>
                                    </div>
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
                                            <div className='text-center' style={{width:"40px"}}>1&nbsp;&nbsp;</div>
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
                                            <div className='text-center' style={{width:"40px"}}>1&nbsp;&nbsp;</div>
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
                                            <div className='text-center' style={{width:"40px"}}>1&nbsp;&nbsp;</div>
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
                                            <div className='text-center' style={{width:"40px"}}>1&nbsp;&nbsp;</div>
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
                                            <div className='text-center' style={{width:"40px"}}>1&nbsp;&nbsp;</div>
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
                                            <div className='text-center' style={{width:"40px"}}>1&nbsp;&nbsp;</div>
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
                                            <div className='text-center' style={{width:"40px"}}>1&nbsp;&nbsp;</div>
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
                        <Tab eventKey="Top" title="Top">
                            <div className="row flex-wrap p-0">
                                <CollectionCard />
                                <CollectionCard />
                                <CollectionCard />
                                <CollectionCard />
                                <CollectionCard />
                                <CollectionCard />
                                <CollectionCard />
                                <CollectionCard />
                                <CollectionCard />
                                <CollectionCard />
                            </div>
                        </Tab>
                        <Tab eventKey="Watchlist" title="Watchlist">
                            <div className="row flex-wrap p-0">
                                <CollectionCard />
                                <CollectionCard />
                                <CollectionCard />
                                <CollectionCard />
                                <CollectionCard />
                                <CollectionCard />
                                <CollectionCard />
                                <CollectionCard />
                                <CollectionCard />
                                <CollectionCard />
                            </div>
                        </Tab>
                    </Tabs>

                </div>

            </div>
        </>
    );
}

export default Stats;