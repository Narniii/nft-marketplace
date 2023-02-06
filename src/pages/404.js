import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import bg from '../assets/info-bg.svg'
import errPic from '../assets/404err.svg'
import '../styles.css'

const SectionContainer = styled.div`
    background: ${({ theme }) => theme.errorPageGradient};
    border-radius:24px;

`;
const Image = styled.div`
background-image: url(${errPic});
background-size:contain;
background-repeat:no-repeat;
background-position:center;
`
const Wrapper = styled.div`
    background-image: url(${bg});
    background-size:cover;
    background-repeat:no-repeat;
    background-position:top;  
    height:70vh;
    border-radius:24px;
`;

const NotFound = ({ theme, themeToggler }) => {
    return (
        <>
            <div className="pdng">
                <Navbar theme={theme} themeToggler={themeToggler} />
                <div className="py-5 px-0">
                    <SectionContainer >
                        <Wrapper className="py-3 text-center d-flex flex-column justify-content-between">
                            <Image style={{
                                // border: "1px solid yellow",
                                height: "100%",
                                width: "100%"
                            }} />
                            <h2 style={{fontWeight:"bold"}}>No Results Found</h2>
                            <p>we couldn’t find what you searched for.
                                try searching again</p> </Wrapper>
                    </SectionContainer>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default NotFound;