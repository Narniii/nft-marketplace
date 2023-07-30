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

const Transfer = ({ theme, themeToggler }) => {
    return (
        <>
            <div className="pdng">
                <Navbar theme={theme} themeToggler={themeToggler} />
                <div className="m-5">
                    transfer money to your friends and family by minting nft
                </div>
            </div>
        </>
    );
}

export default Transfer;