import styled from 'styled-components';
import Navbar from '../components/Navbar/Navbar';
import '../styles.css'
import bgDes from '../assets/bgDots-desktop.svg'
import bgTab from '../assets/bgDots-tablet.svg'
import bgMob from '../assets/bgDots-mobile.svg'
import { Tab, Tabs } from 'react-bootstrap';
import CollectionCard from '../components/Cards/CollectionCard';

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



const Explore = ({ theme, themeToggler }) => {
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
                        <Tab eventKey="Trending" title="Trending">
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
                        <Tab eventKey="Art" title="Art">
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
                        <Tab eventKey="Collections" title="Collections">
                        </Tab>
                        <Tab eventKey="Domain Names" title="Domain Names">
                        </Tab>
                        <Tab eventKey="Music" title="Music">
                        </Tab>
                        <Tab eventKey="Photography" title="Photography">
                        </Tab>
                        <Tab eventKey="Sports" title="Sports">
                        </Tab>
                        <Tab eventKey="Trading Cards" title="Trading Cards">
                        </Tab>
                        <Tab eventKey="Utility" title="Utility">
                        </Tab>
                        <Tab eventKey="Virtual Worlds" title="Virtual Worlds">
                        </Tab>
                    </Tabs>

                </div>

            </div>
        </>
    );
}

export default Explore; <></>