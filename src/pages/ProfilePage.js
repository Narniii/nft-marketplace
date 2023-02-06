import { ArrowDown2, Dribbble, Ethereum, Global, Instagram, More, Share, Star, TimerStart } from "iconsax-react";
import { Tab, Tabs } from "react-bootstrap";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import bannerPic from '../assets/profileBanner.svg'
import logoPic from '../assets/testpic.png'
import '../styles.css'
import { Colors } from "../components/design/Colors";
import CreatedTab from "../components/Profile/CreatedTab";
import ActivityTab from "../components/Profile/ActivityTab";
import FavoritedTab from "../components/Profile/FavoritedTab";
import FeaturedItems from "../components/Profile/FeaturedItems";
import Collected from "../components/Profile/CollectedTab";

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
  height:300px;
  width:300px;
  top:65%;
  left:32px;
  border:5px solid;
  border-color:${({ theme }) => theme.body};
  border-radius: 50%;
  @media screen and (max-width: 768px) {
    height:170px;
    width:170px;
    left:24px;

  }
  @media screen and (max-width: 600px) {
    height:100px;
    width:100px;
    left:16px;

  }
`;
const Empty = styled.div`
height:200px;
width:300px;
// background-color:pink;
@media screen and (max-width: 768px) {
  height:70px;
  width:170px;
}
@media screen and (max-width: 600px) {
  height:50px;
  width:100px;
}
`;
const Cnt = styled.div`
width: calc(100% - 300px);
// background-color:blue;
@media screen and (max-width: 768px) {
    width: calc(100% - 170px);
}
@media screen and (max-width: 600px) {
    width: 100%;
}
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
const ProfilePage = ({ theme, themeToggler }) => {
    return (
        <>
            <div className="pdng">
                <Navbar theme={theme} themeToggler={themeToggler} />
            </div>
            <div className="d-flex flex-column p-0 m-0 justify-content-between">
                <Banner><Logo className="position-absolute " /></Banner>
                <div className="pdng d-flex justify-content-between justify-content-sm-start w-100">
                    <Empty />
                    <div className="mt-2 align-items-center d-flex d-sm-none" style={{ height: "25px" }}>
                        <div style={{ borderRight: `dashed 1px ${Colors.gray3}`, height: "auto" }}><Instagram size="20" className="m-1" /><Dribbble size="20" className="m-1" /><Global size="20" className="m-1" /></div>
                        <div ><Share size="20" className="m-1" /><More size="20" className="m-1" /></div>
                    </div>
                    <Cnt className="ps-2 pt-2 d-none d-sm-flex flex-column justify-content-start">
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 style={{ fontWeight: 600 }}>Profile Name</h5>
                            <div className="align-items-center d-flex" style={{ height: "25px" }}>
                                <div style={{ borderRight: `dashed 1px ${Colors.gray3}`, height: "auto" }}><Instagram size="20" className="m-1" /><Dribbble size="20" className="m-1" /><Global size="20" className="m-1" /></div>
                                <div ><Share size="20" className="m-1" /><More size="20" className="m-1" /></div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-start align-items-center">
                            <p className="d-flex align-items-center me-2">
                                <Ethereum color={Colors.recommendedDark} />
                                0x0...33
                            </p>
                            <p className="d-flex align-items-center ms-2">
                                <TimerStart />
                                Joined Feb2022
                            </p>
                        </div>
                        <p className="m-0">collectors the ability to curate unique digital assets by </p>
                        <p style={{ fontWeight: "bold" }}>See More <ArrowDown2 /></p>
                    </Cnt>
                </div>
                <Cnt className="pdng d-flex d-sm-none flex-column">
                    <h5 style={{ fontWeight: 600 }}>Profile Name</h5>
                    <div className="d-flex justify-content-start align-items-center">
                        <p className="d-flex align-items-center me-2">
                            <Ethereum color={Colors.recommendedDark} />
                            0x0...33
                        </p>
                        <p className="d-flex align-items-center ms-2">
                            <TimerStart />
                            Joined Feb2022
                        </p>
                    </div>
                    <p className="m-0">collectors the ability to curate unique digital assets by </p>
                    <p style={{ fontWeight: "bold" }}>See More <ArrowDown2 /></p>
                </Cnt>
            </div>
            <div className="pdng">
                <Tabs
                    defaultActiveKey="Featured"
                    // className="mb-3 tab-scroll"
                    className="m-0 mb-3 tab-scroll"
                    style={{
                        color: theme === 'light' ? "#5D3393" : "#DABDDF",
                        borderBottom: "none"
                        // borderColor: theme === 'light' ? "#5D3393" : "#DABDDF",
                    }}
                >
                    <Tab eventKey="Featured" title="Featured">
                        <FeaturedItems theme={theme} />
                    </Tab>
                    <Tab eventKey="Collected" title="Collected">
                        <Collected theme={theme} />
                    </Tab>
                    <Tab eventKey="Created" title="Created">
                        <CreatedTab theme={theme} />
                    </Tab>
                    <Tab eventKey="activity" title="activity" >
                        <ActivityTab theme={theme} />
                    </Tab>
                    <Tab eventKey="Favorited" title="Favorited">
                        <FavoritedTab theme={theme} />
                    </Tab>
                    <Tab eventKey="More" title={<span>More <ArrowDown2 size="12" /></span>}>

                        {/* style={{ color: theme == 'light' ? Colors.gray7 : Colors.gray1, }} */}
                    </Tab>

                </Tabs>
            </div>
            <Footer />
        </>
    );
}

export default ProfilePage;