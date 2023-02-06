import styled from "styled-components"
import { ButtonLarge, ButtonSmall } from "../design/Buttons";
import headerImage from '../../assets/header-image.png';
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { addItem, logOutUser, removeItem } from "../../redux/actions";
// import { addToCart } from "../../redux/cartReducer";

const HeaderDiv = styled.div`
  // background: ${({ theme }) => theme.gradientPurple};
  // height:75vh;
  padding:0 32px;
  // position:relative;
  background-image: url(${({ theme }) => theme.headerImage});
  background-size:cover;
  background-repeat:no-repeat;
  background-position:center;
  // position:absolute;
  // top:0;
`;
const Title = styled.h2`
  color: ${({ theme }) => theme.titleColor};
  font-weight:bold;
`;
const Titler = styled.h3`
  color: ${({ theme }) => theme.titlerColor};
  margin:0 auto;
`;
const Par = styled.p`
  color: ${({ theme }) => theme.par};
  margin:0;
  padding:0 5%;

`;
const StyledBox = styled.div`
  // height:300px;
  // border:solid 2px red;
  padding:0 32px;
  // position:absolute,
  // bottom:0,
  // transform:translateY(-100px)
`;

const StyledPolygon = styled.div`

background-image: url(${({ theme }) => theme.rectangle});
background-size:contain;
background-repeat:no-repeat;
background-position:center;
// background-color:${({ theme }) => theme.itemCardsBackground};
height:30vh;
// height:100%;

// left:50%;
// transform:translateX(-50%);
// transform-origin:top left;

`;

const HeaderImg = styled.div`
background-image: url(${headerImage});
height:100%;
background-size:contain;
background-repeat:no-repeat;
background-position:right;
`

const Header = ({ theme, themeToggler }) => {
  // const { globalUser } = useSelector(state => state.userReducer);
  // console.log(globalUser)

  const dispatch = useDispatch();
  const add = (item) => dispatch(addItem(item));

  return (
    <>
      {/* desktop */}
      <div className="d-none d-md-block"
        // className="container"
        style={{ height: "100vh" }}>
        <HeaderDiv
          style={{ height: "75vh" }}
        // className="position-relative"
        >
          <Navbar theme={theme} themeToggler={themeToggler} />
          <div className="row no-gutters justify-content-between"
            style={{ height: "80%" }}
          // style={{ padding: "50px 0" }}
          >
            <div className="pr-5 col-6 row align-items-center align-self-center">
              <Title>WELCOME TO DORTA CLUB</Title>
              <p style={{ color: '#f9f9f9' }}>A membership NFT give you early access to future JRNY NFT sets.exclusive NFT videos ,early access to partner NFT projects and more A membership NFT give you early access to future JRNY NFT sets.exclusive NFT videos ,early access to partner NFT projects and more
              </p>
              <ButtonLarge>Connect Wallet</ButtonLarge>
            </div>
            <div className="col-6  p-0">
              <HeaderImg />
            </div>
          </div>

          {/* THE ABSOLUTE RECTANGLE */}
          {/* <div
            className="d-none d-md-block row p-0 no-gutters align-items-center justify-content-between justify-self-center"
          >
            <StyledBox
              className="position-absolute start-50 translate-middle"
            >
              <StyledPolygon className="row pt-5 px-5 align-content-center">
                <img src="/assets/rectangle-dark.svg" style={{width:"100%",height:"100%"}} alt="dorta" />
                <div className="text-center px-5" >
                  <Titler>what is an nft?</Titler>
                  <Par>An NFT is a digital asset that can come in the form of art, music, in-game items, videos, and more. They are bought and sold online, frequently with cryptocurrency, and they are generally encoded with the same underlying software as many cryptos.
                    Although they’ve been around since 2014, NFTs are gaining notoriety now because they are becoming an increasingly popular way to buy and sell digital artwork. </Par>
                </div>
              </StyledPolygon>
            </StyledBox>
          </div> */}
        </HeaderDiv>
      </div >




      {/* tablet */}
      <div className="d-none d-sm-block d-md-none"
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
            <div className="col-6 row align-items-center align-self-center">
              <Title>WELCOME TO DORTA CLUB</Title>
              <p onClick={() => add({ price: '0.2', name: 'Number', id: '555' })}>A membership NFT give you early access to future JRNY NFT sets.exclusive NFT videos ,early access to partner NFT projects and more A membership NFT give you early access to future JRNY NFT sets.exclusive NFT videos ,early access to partner NFT projects and more
              </p>
              <ButtonLarge onClick={() => add({ price: '0.4', name: 'new nft', id: '234' })}>Connect Wallet</ButtonLarge>
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
          <div style={{ padding: "20px 0" }} className="row no-gutters justify-content-between">
            <div className="col-9 row align-items-center align-self-center">
              <Title style={{ fontSize: "14px" }}>WELCOME TO DORTA CLUB</Title>
              <p className="d-block d-sm-none">A membership NFT give you early access to future</p>
              {/* <ButtonSmall>Connect Wallet</ButtonSmall> */}
            </div>
            <div className="col-3 p-0">
              <HeaderImg />
            </div>
          </div>

        </HeaderDiv>
      </div>
    </>

  );
}

export default Header;