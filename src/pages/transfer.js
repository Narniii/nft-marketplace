import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import bg from '../assets/bgOpMin.svg'
import errPic from '../assets/404err.svg'
import '../styles.css'


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