import { Status, Timer } from "../components/Drops/states";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import '../styles.css'
import { Tab, Tabs } from 'react-bootstrap';
import { useState } from "react";
import DropCard from "../components/Drops/DropCard";
import styled from "styled-components";
import colBg1 from '../assets/UFESLT8MzQoDaA3UDkjDSj.jpg'
import colBg2 from '../assets/images.jpg'
import colBg3 from '../assets/imagesl.jpg'

const ScrollableDropsContainer = styled.div`
    height: 100vh;
    overflow-y: scroll;
    scrollbar-width: 0px;
 &::-webkit-scrollbar {
    display:none;
 }
 &::-webkit-scrollbar-thumb {
 }
 &::-webkit-scrollbar-button{
 }
 -ms-overflow-style: none;
`

const Drops = ({ theme, themeToggler }) => {
    const [tab, setTab] = useState(window.location.hash ? window.location.hash.replace('#', '') : "upcoming")

    return (<>
        <div className="pdng d-flex flex-column">
            <Navbar theme={theme} themeToggler={themeToggler} />
            <h3 className="my-5" style={{ fontWeight: 600 }}>Drops</h3>
            <Tabs
                fill
                // justify
                defaultActiveKey={window.location.hash ? window.location.hash.replace('#', '') : "upcoming"}
                className="m-0 mb-5 tab-scroll"
                style={{
                    color: theme === 'light' ? "#5D3393" : "#DABDDF",
                    // borderColor: theme === 'light' ? "#5D3393" : "#DABDDF",
                    // borderBottom: "none"
                }}
                onSelect={(e) => setTab(e)}
            >

                <Tab eventKey="upcoming" title="Upcoming">
                    <ScrollableDropsContainer>
                        <DropCard theme={theme} status={'mint-upcome'} colBg={colBg1} />
                        <DropCard theme={theme} status={'mint-ended'} colBg={colBg2} />
                        <DropCard theme={theme} status={'mint-soldout'} colBg={colBg3} />
                        <DropCard theme={theme} status={'minting-now'} colBg={colBg1} />
                    </ScrollableDropsContainer>
                </Tab>
                <Tab eventKey="past" title="Past">
                    <DropCard theme={theme} status={'mint-ended'} colBg={colBg2} />
                    <DropCard theme={theme} status={'mint-ended'} colBg={colBg1} />
                    <DropCard theme={theme} status={'mint-ended'} colBg={colBg3} />
                    <DropCard theme={theme} status={'mint-ended'} colBg={colBg2} />
                    <DropCard theme={theme} status={'mint-ended'} colBg={colBg1} />
                    <DropCard theme={theme} status={'mint-ended'} colBg={colBg3} />
                </Tab>
            </Tabs>
        </div>
        <Footer />
    </>);
}

export default Drops;