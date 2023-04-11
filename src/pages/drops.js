import { Status, Timer } from "../components/Drops/states";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import '../styles.css'
import { Tab, Tabs } from 'react-bootstrap';
import { useState } from "react";
import DropCard from "../components/Drops/DropCard";

const Drops = ({ theme, themeToggler }) => {
    const [tab, setTab] = useState(window.location.hash ? window.location.hash.replace('#', '') : "trending")

    return (<>
        <div className="pdng d-flex flex-column">
            <Navbar theme={theme} themeToggler={themeToggler} />
            <h3 className="my-5" style={{ fontWeight: 600 }}>Drops</h3>
            <Tabs
                fill
                // justify
                defaultActiveKey={window.location.hash ? window.location.hash.replace('#', '') : "trending"}
                className="m-0 mb-5 tab-scroll"
                style={{
                    color: theme === 'light' ? "#5D3393" : "#DABDDF",
                    // borderColor: theme === 'light' ? "#5D3393" : "#DABDDF",
                    // borderBottom: "none"
                }}
                onSelect={(e) => setTab(e)}
            >

                <Tab eventKey="upcoming" title="Upcoming">
                    <DropCard />
                </Tab>
                <Tab eventKey="past" title="Past"></Tab>
            </Tabs>
        </div>
        <Footer />
    </>);
}

export default Drops;