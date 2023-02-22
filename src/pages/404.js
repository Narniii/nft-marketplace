import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import bg from '../assets/bgOpMin.svg'
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
    width:100%;
    height:90%;
    @media screen and (max-width: 992px) {
        width:50%;
        height:40%;
    }      
    @media screen and (max-width: 575px) {
        width:60%;
        height:50%;
    }      

    `
const Wrapppper = styled.div`
    height:70vh;
    border-radius:24px;
    `
const Wrapper = styled.div`
    // background-image: url(${bg});
    // background-size:cover;
    // background-repeat:no-repeat;
    // background-position:top;  
    height:100%;
    border-radius:24px;
    @media screen and (max-width: 992px) {
        background-image: url(${bg});
        background-size:cover;
        background-repeat:no-repeat;
        background-position:top;  
        height:70vh;
    }      
    `;
const ImageLeft = styled.div`
    background-image: url(${bg});
    background-size:contain;
    background-repeat:no-repeat;
    background-position:center;  
    height:100%;
    // border-radius:24px;
    transform: rotate(-180deg);
    width:50%;
    `;
const ImageRight = styled.div`
    background-image: url(${bg});
    background-size:contain;
    background-repeat:no-repeat;
    background-position:center;  
    height:100%;
    // border-radius:24px;
    width:50%;
    `;

const NotFound = ({ theme, themeToggler }) => {
    return (
        <>
            <div className="pdng">
                <Navbar theme={theme} themeToggler={themeToggler} />
                <div className="py-5 px-0">
                    <SectionContainer >
                        <Wrapppper className="d-none d-lg-flex align-items-center justify-content-center">
                            <ImageLeft className="" />
                            <Wrapper className="py-3 text-center d-flex flex-column justify-content-between">
                                <Image />
                                <h2 style={{ fontWeight: "bold" }}>No Results Found</h2>
                                <p>we couldn’t find what you searched for.
                                    try searching again</p>
                            </Wrapper>
                            <ImageRight className="" />
                        </Wrapppper>
                        <Wrapper className="py-3 text-center d-flex d-lg-none flex-column justify-content-center align-items-center">
                            <Image />
                            <h2 style={{ fontWeight: "bold" }}>No Results Found</h2>
                            <p>we couldn’t find what you searched for.
                                try searching again</p>
                        </Wrapper>
                    </SectionContainer>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default NotFound;