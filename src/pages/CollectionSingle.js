import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import bannerPic from '../assets/collectionBanner.svg'
import logoPic from '../assets/collectionLogo.png'
import { ArrowDown2, Dribbble, Global, Instagram, More, Share, Star } from "iconsax-react";
import '../styles.css'
import SearchBox from "../components/Navbar/SearchBox";
import { Tab, Tabs } from "react-bootstrap";
import ItemsTab from "../components/CollectionSingle/ItemsTab";
import ActivityTab from "../components/CollectionSingle/ActivityTab";
import CollectionAnalyticsTab from "../components/CollectionSingle/AnalyticsTab";
const Banner = styled.div`
  background-image: url(${bannerPic});
  background-size:cover;
  background-repeat:no-repeat;
  background-position:center;
  height:300px;
  position:relative;
  width:100%;
  @media screen and (max-width: 600px) {
    height:150px;
  }

`;
const Logo = styled.div`
  background-image: url(${logoPic});
  background-size:cover;
  background-repeat:no-repeat;
  background-position:center;
  height:250px;
  width:250px;
  top:85% !important;
  border-radius: 24px;
  @media screen and (max-width: 768px) {
    height:200px;
    width:200px;
  }
  @media screen and (max-width: 600px) {
    height:120px;
    width:120px;
  }
`;
const DetCard = styled.div`
background:${({ theme }) => theme.itemCardsBackground};
box-shadow:${({ theme }) => theme.boxShadow};
// border:${({ theme }) => theme.searchBoxBorder};
border-radius: 12px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
padding:8px 40px;
`;
const Line = styled.div`
background: linear-gradient(90deg,#60606000 0%, #80808080 50%,#918A7A00 100%);
height:1px;
width:60%;
`;

const OwnerName = styled.span`
color: ${({ theme }) => theme.trendingSectionTitles};
font-weight:600;
`
const Subtitle = styled.span`
color: ${({ theme }) => theme.trendingSectionSubTitles};
font-weight:600;

`
const CollectionSingle = ({ theme, themeToggler }) => {
    return (
        <>
            <div style={{ padding: "0 32px" }}>
                <Navbar theme={theme} themeToggler={themeToggler} />
            </div>
            <div className="d-flex flex-column p-0 m-0 justify-content-between">
                <Banner><Logo className="position-absolute start-50 translate-middle" /></Banner>
                <div className="d-flex justify-content-between m-0 mb-md-3">
                    <div><Instagram size="20" className="m-1 d-none d-sm-inline" /><Dribbble size="20" className="m-1 d-none d-sm-inline" /><Global size="20" className="m-1 d-none d-sm-inline" /></div>
                    <div><Star size="20" className="m-1 d-none d-sm-inline" /><Share size="20" className="m-1" /><More size="20" className="m-1" /></div>
                </div>
                <div className="d-flex justify-content-center mt-3 mt-sm-5">
                    <h5 className="m-2" style={{ fontWeight: 600 }}>
                        Collection Name
                    </h5>
                </div>
                <div className="d-flex justify-content-center">
                    <p className="m-2"><Subtitle>By </Subtitle><OwnerName>Owner </OwnerName></p>
                </div>
                <div className="d-flex flex-wrap justify-content-center">
                    <p className="m-2"><Subtitle>Items </Subtitle><OwnerName>1111 </OwnerName></p>
                    <p className="m-2"><Subtitle>Created </Subtitle><OwnerName>Sep 2021 </OwnerName></p>
                    <p className="m-2"><Subtitle>Creator Fee </Subtitle><OwnerName>5% </OwnerName></p>
                    <p className="m-2"><Subtitle>Owners </Subtitle><OwnerName>20</OwnerName></p>
                    <p className="m-2"><Subtitle>Unique Owners </Subtitle><OwnerName>50% </OwnerName></p>
                </div>
                <div className="d-none d-sm-flex flex-column justify-content-center align-items-center text-center">
                    <p className="mt-2 mb-0"><Subtitle style={{ fontWeight: 400 }}>collectors the ability to curate unique digital assets by creating one-of-a-kind creating ability to</Subtitle></p>
                    <OwnerName>See more <ArrowDown2 size="20" /></OwnerName>
                </div>
                <div className="d-flex flex-wrap justify-content-center">
                    <DetCard className="m-2">
                        <Subtitle>total price</Subtitle>
                        <Line />
                        <OwnerName>56 ETH</OwnerName>
                    </DetCard>
                    <DetCard className="m-2">
                        <Subtitle>total price</Subtitle>
                        <Line />
                        <OwnerName>56 ETH</OwnerName>
                    </DetCard>
                    <DetCard className="m-2">
                        <Subtitle>total price</Subtitle>
                        <Line />
                        <OwnerName>56 ETH</OwnerName>
                    </DetCard>
                    <DetCard className="m-2">
                        <Subtitle>total price</Subtitle>
                        <Line />
                        <OwnerName>56 ETH</OwnerName>
                    </DetCard>
                </div>
            </div>
            <div style={{ padding: "0 32px" }}>
                <Tabs
                    defaultActiveKey="items"
                    // id="justify-tab-example"
                    // justify
                    className="mb-3"
                    style={{
                        color: theme === 'light' ? "#5D3393" : "#DABDDF",
                        // borderColor: theme === 'light' ? "#5D3393" : "#DABDDF",
                    }}
                >
                    <Tab eventKey="items" title="items">
                        <ItemsTab />
                    </Tab>
                    <Tab eventKey="analytics" title="analytics"
                    //  disabled
                    >
                        <CollectionAnalyticsTab />
                    </Tab>
                    <Tab eventKey="activity" title="activity" >
                        <ActivityTab />
                    </Tab>
                </Tabs>
            </div>
            <Footer />
        </>
    );
}

export default CollectionSingle;