import styled from "styled-components"
import { ButtonLarge, ButtonSmall } from "../design/Buttons";
// import headerImage from '../../assets/header-image.svg';
import headerImage from '../../assets/header-image.png';
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { addItem, logOutUser, removeItem } from "../../redux/actions";
// import { addToCart } from "../../redux/cartReducer";
import '../../styles.css'
import { useState } from "react";
import WalletConnect from "../Navbar/WalletConnect";
import Image from "../../assets/rect.svg";
import RectLight from "../../assets/rectLight.svg";
import RectDark from "../../assets/rectDarkk.svg";
import { Colors } from "../design/Colors";

const HeaderDiv = styled.div`
  // background: ${({ theme }) => theme.gradientPurple};
  // height:75vh;
  padding:0 32px;
  position:relative;
  background-image: url(${({ theme }) => theme.headerImage});
  background-size:cover;
  background-repeat:no-repeat;
  background-position:center;
  // position:absolute;
  // top:0;
  @media screen and (max-width: 992px) {
    padding:0 24px;
  };
  @media screen and (max-width: 575px) {
    padding:0 16px;
  }  
  text-transform:${Colors.bodyFont};
`;
const Title = styled.h2`
  color: ${({ theme }) => theme.titleColor};
  font-weight:bold;
  margin-bottom:20px;
`;
const Titler = styled.h3`
  color: ${({ theme }) => theme.titlerColor};
  // margin:0 auto;
  font-weight:600;
  @media screen and (max-width: 1200px) {
    font-size:22px;
  }  

`;
const Par = styled.p`
  color: ${({ theme }) => theme.par};
  margin:0;
  padding:0 5%;
  @media screen and (max-width: 1200px) {
    font-size:14px;
  }  


`;
const StyledBox = styled.div`
  top:100%;
  // height:300px;
  // border:solid 2px red;
  padding:0 32px;
  width:100%;
  // position:absolute,
  // bottom:0;
  // transform:translateY(-100px);

`;

const StyledPolygon = styled.div`
// width:calc(100% - 32px);
// border:solid 2px blue;
border-radius:24px;
border-top-left-radius:45%;
clip-path:polygon(0 35%, 100% 0, 100% 100%, 0% 100%);
// clip-path:inset(0 0 0 0  round 100% 24px 24px 24px);
background-color:${({ theme }) => theme.polyBG};
// overflow:hidden;
box-shadow:${({ theme }) => theme.polyBX};
background-image: url(${({ theme }) => theme.rectangle});
background-size:contain;
background-repeat:no-repeat;
background-position:center;
height:30vh;
// height:100%;
width:100%;
// left:50%;
// transform:translateX(-50%);
// transform-origin:top left;
// @media screen and (max-width: 768px) {
//   width:calc(100% - 24px);
// };
// @media screen and (max-width: 600px) {
//   width:calc(100% - 16px);
// }  
`;
const InnerPoly = styled.div`
clip-path:inset(35% 0 0 0 round 24px);
height:100%;
width:100%;

`
const HeaderImg = styled.div`
background-image: url(${headerImage});
height:100%;
background-size:contain;
background-repeat:no-repeat;
background-position:right;
`
const Holder = styled.div`
top:60%;
text-align:center;
width:700px;
@media screen and (min-width: 1440px) {
  width:1000px;
}  


`
const HolderHolder = styled.div`
height:100%;
width:100%;

`
const SvgPolygon = () => (
  <svg height="250" width="500">
    <polygon points="220,10 300,210 170,250 123,234" style="fill:lime;stroke:purple;stroke-width:1" />
  </svg>
)
const Header = ({ theme, themeToggler }) => {
  // const { globalUser } = useSelector(state => state.userReducer);
  // console.log(globalUser)

  // const dispatch = useDispatch();
  // const add = (item) => dispatch(addItem(item));
  const walletDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setWalletMenu({ ...walletMenu, [anchor]: open });
  };
  const [walletMenu, setWalletMenu] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  return (
    <>
      {/* desktop */}
      <div className="d-none d-lg-block"
        // className="container"
        style={{ height: "100vh" }}>
        <HeaderDiv
          // className="pdng"
          style={{ height: "75vh" }}
        // className="position-relative"
        >
          <Navbar theme={theme} themeToggler={themeToggler} />
          <div className="d-flex justify-content-between pt-3" style={{ height: "80%" }}>
            <div className="col-6 col-xl-5 d-flex flex-column align-items-start justify-content-center align-self-center">
              <p className="mb-2" style={{ color: '#F0E4FF' }}>BUY YOUR JRNY NFT AT DORTA</p>
              <Title >WELCOME TO DORTA CLUB</Title>
              <p style={{ color: '#f9f9f9', textAlign: "justify", fontSize: "14px" }} className="mb-5 d-none d-lg-block d-xl-none">A membership NFT give you early access to future JRNY NFT sets.exclusive NFT videos ,early access to partner NFT projects and more A membership NFT give you early access to future JRNY NFT sets.exclusive NFT videos ,early access to partner NFT projects and more
              </p>
              <p style={{ color: '#f9f9f9', textAlign: "justify", fontSize: "16px" }} className="mb-5 d-none d-xl-block">A membership NFT give you early access to future JRNY NFT sets.exclusive NFT videos ,early access to partner NFT projects and more A membership NFT give you early access to future JRNY NFT sets.exclusive NFT videos ,early access to partner NFT projects and more
              </p>
              <ButtonLarge onClick={walletDrawer('right', true)}>Connect Wallet</ButtonLarge>
            </div>
            <div className="col-5  p-0">
              <HeaderImg />
            </div>
          </div>

          {/* THE ABSOLUTE RECTANGLE */}
          <StyledBox
            className="w-100 d-none d-lg-flex flex-column align-items-center justify-content-center justify-self-center position-absolute start-50 translate-middle"
          >
            <img src={theme == 'light' ? RectLight : RectDark} style={{
              width: "100%", height: "100%", boxShadow: theme == 'light' ? 'unset' : '15px 20px 40px -30px rgba(190,138,255,0.6)',
              borderRadius: '64px',
            }}>
            </img>
            <HolderHolder className="p-relative">
              <Holder className="d-none d-md-flex flex-column align-items-center justify-content-center justify-self-center position-absolute start-50 translate-middle">
                <Titler className="mb-3">What Is An NFT?</Titler>
                <Par>An NFT is a digital asset that can come in the form of art, music, in-game items, videos, and more. They are bought and sold online, frequently with cryptocurrency, and they are generally encoded with the same underlying software as many cryptos.
                  Although they’ve been around since 2014, NFTs are gaining notoriety now because they are becoming an increasingly popular way to buy and sell digital artwork. </Par>
              </Holder>
            </HolderHolder>
          </StyledBox>
        </HeaderDiv>
      </div >




      {/* tablet */}
      <div className="d-none d-sm-block d-lg-none"
      // style={{ height: "100vh" }}
      >
        <HeaderDiv
          // style={{ height: "75vh" }}
          className="position-relative">
          <Navbar theme={theme} themeToggler={themeToggler} />
          <div className="row no-gutters justify-content-between"
            // style={{ height: "80%" }}
            style={{ padding: "80px 0" }}
          >
            <div className="col-6 row align-items-center align-self-center ">
              <p className="mb-2" style={{ color: '#F0E4FF' }}>BUY YOUR JRNY NFT AT DORTA</p>
              <Title>WELCOME TO DORTA CLUB</Title>
              <p
                style={{ color: '#f9f9f9', textAlign: "justify", fontSize: "14px" }}
              // onClick={() => add({ price: '0.2', name: 'Number', id: '555' })}
              >A membership NFT give you early access to future JRNY NFT sets.exclusive NFT videos ,early access to partner NFT projects and more A membership NFT give you early access to future JRNY NFT sets.exclusive NFT videos ,early access to partner NFT projects and more
              </p>
              <ButtonLarge
                onClick={walletDrawer('bottom', true)}
              >Connect Wallet</ButtonLarge>
            </div>
            <div className="col-6 p-0">
              <HeaderImg />
            </div>
          </div>
        </HeaderDiv>
      </div >









      {/* mobile */}
      <div className="d-block d-sm-none">
        <HeaderDiv>
          <Navbar theme={theme} themeToggler={themeToggler} />
          <div style={{ padding: "35px 0" }} className="d-flex justify-content-between">
            <div className="col-12 d-flex flex-column align-items-center align-self-center">
              <p className="mb-2" style={{ color: '#F0E4FF', fontSize: "14px" }}>BUY YOUR JRNY NFT AT DORTA</p>
              <Title className="m-0" style={{ fontSize: "20px" }}>WELCOME TO DORTA CLUB</Title>
              <div className="col-3 p-0 my-4" style={{ height: '120px' }}>
                <HeaderImg />
              </div>
              <p className="d-block d-sm-none text-justify mb-4" style={{ color: '#f9f9f9', textAlign: "center", fontSize: "14px" }}>A membership NFT give you early access to future JRNY NFT sets.exclusive NFT videos ,early access to partner NFT projects and more A membership NFT give you early access to future JRNY NFT sets.exclusive NFT videos ,early access to partner NFT projects and more</p>
              {/* <ButtonSmall>Connect Wallet</ButtonSmall> */}
              <ButtonLarge
                onClick={walletDrawer('bottom', true)}
              >Connect Wallet</ButtonLarge>

            </div>
          </div>

        </HeaderDiv>
      </div>



      <WalletConnect toggleDrawer={walletDrawer} state={walletMenu} theme={theme} />

    </>

  );
}

export default Header;