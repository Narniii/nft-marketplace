import { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router';
import DropCard from '../components/Drops/DropCard';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar/Navbar';
import '../styles.css'
import colBg1 from '../assets/UFESLT8MzQoDaA3UDkjDSj.jpg'

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
                        <div className='d-flex flex-column flex-sm-row flex-md-row-reverse'>

                        </div>
                    </Tab>
                    <Tab eventKey="team" title="Team">
                    </Tab>
                    <Tab eventKey="faq" title="FAQ">
                    </Tab>
                </Tabs>

            </div>
            <Footer />
        </>
    );
}

export default GenerativeCol;