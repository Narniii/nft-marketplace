import { InputBase } from "@mui/material";
import { EmptyWalletTick, Instagram, Twitch, Whatsapp, Youtube } from "iconsax-react";
import styled from "styled-components";
import { ButtonSmall, ButtonXSmall } from "./design/Buttons";
import { Colors } from "./design/Colors";
import LinkComp from "./design/Links";

const FooterDiv = styled.div`
  // height:75vh;
  background-image: url(${({ theme }) => theme.footerImage});
  background-size:cover;
  background-repeat:no-repeat;
  background-position:center;
  padding:0 32px;
  `;
const Foooter = styled.div`
  height:100%;
  background:transparent;
  position:relative;
  padding:5%;
  `;
const FooterContent = styled.div`
  background:transparent;
  // width:60%;
  // border:1px solid purple;
  display:flex;
  flex-direction:column;
  justify-content:space-around;
  `;
const Line = styled.div`
  position:absolute;
  top:0;
  height:1px;
  width:100%;
  margin:0 auto;
  transform: matrix(-1, 0, 0, 1, 0, 0);
  background: ${({ theme }) => theme.navBorderBackground};
`
const Logo = styled.div`
width: 52px;
height: 35px;
border-radius:50%;
background: #E6E6E6;
`
const EmailBox = styled.div`
border:1px solid white;
border-radius:30px;
background:transparent;
width:80%;
@media screen and (max-width: 600px) {
  width:90%;
}


`
// const BoxEmail = styled.div`
// border:1px solid white;
// border-radius:24px;
// background:transparent;
// align-content:center;
// height:50px;
// `
const MediaContainer = styled.div`
border:1px solid #E6E6E6;
border-radius:50%;
height:60px;
width:60px;
display:flex;
justify-content:center;
align-items:center;
color:#E6E6E6;
@media screen and (max-width: 500px) {
  height:50px;
  width:50px;
}
`




const Footer = () => {
  return (
    // <div
    // // style={{ height: "100vh", }}
    // >
    //   <div style={{ height: "25vh", }} />
    <FooterDiv>
      <Foooter className="d-flex justify-content-center">
        <Line />
        <FooterContent>
          {/* section 1 */}
          <div className="px-5 py-5 d-flex flex-column align-items-center justify-content-around text-center">
            <Logo className="my-1" />
            <h6 className="my-1" style={{ margin: 0, color: "white" }}>
              Dorta
            </h6>
            <div className="my-1" style={{ color: Colors.gray1 }}>The world’s first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital items.</div>
          </div>

          {/* section 2 */}
          <div className="position-relative" >
            <Line />
            <div className="px-5 py-5 d-flex flex-column justify-content-around  text-center ">
              <h6 className="my-1" style={{ margin: 0, color: "white" }}>
                Company
              </h6>
              <div className="my-1 d-flex flex-column flex-sm-row justify-content-around">
                <LinkComp linkText={'About'} linkSize={'medium'} loading={false} link={'/'} />
                <LinkComp linkText={'Careers'} linkSize={'medium'} loading={false} link={'/'} />
                <LinkComp linkText={'Ventures'} linkSize={'medium'} loading={false} link={'/'} />
                <LinkComp linkText={'Grants'} linkSize={'medium'} loading={false} link={'/'} />
              </div>
            </div>
          </div>

          {/* section 3 */}
          {/* section 3 tablet and desktop */}
          <div className="position-relative d-none d-sm-block" >
            <Line />
            <div className="px-5 py-5 d-flex flex-column justify-content-around align-items-center text-center ">
              <div className="my-1" style={{ color: Colors.gray1, fontSize: "14px" }}>Join our mailing list to stay in the loop with our newest feature releases</div>
              <EmailBox className="row p-2 my-1 justify-content-between">
                <div className="col-9 col-md-10 p-0">
                  <InputBase
                    sx={{ color: Colors.gray2, width: "100%", height: "100%" }}
                    placeholder="Example@gmail.com"
                    inputProps={{ 'aria-label': 'enter email' }}
                  />
                </div>
                <div className="col-3 col-md-2 p-0"><ButtonXSmall>Submit</ButtonXSmall></div>
              </EmailBox>
              <div style={{ width: "100%" }} className="mt-5 d-flex flex-row justify-content-around">
                <MediaContainer><Instagram /></MediaContainer>
                <MediaContainer><Whatsapp /></MediaContainer>
                <MediaContainer><Twitch /></MediaContainer>
                <MediaContainer><Youtube /></MediaContainer>
                <MediaContainer><Whatsapp /></MediaContainer>
              </div>
            </div>
          </div>

          {/* section 3 mobile */}
          <div className="position-relative d-flex d-sm-none justify-content-center" >
            <Line />
            <div className="py-5 d-flex d-sm-none flex-column text-center justify-content-around align-items-center">
              <div className="my-1" style={{ color: Colors.gray1, fontSize: "12px" }}>Join our mailing list to stay in the loop with our newest feature releases</div>
              <EmailBox className="row p-2 my-1 justify-content-between">
                <div className="col-7 p-0">
                  <InputBase
                    sx={{ color: Colors.gray2, width: "100%", height: "100%" }}
                    placeholder="Example@gmail.com"
                    inputProps={{ 'aria-label': 'enter email' }}
                  />
                </div>
                <div className="col-5 p-0"><ButtonXSmall>Submit</ButtonXSmall></div>
              </EmailBox>
            </div>
          </div>


          {/* to be fixed =========> */}
          <div className="position-relative d-flex d-sm-none justify-content-center" >
            <Line />
            <div style={{ width: "100%" }} className="my-5 d-flex flex-row justify-content-around">
              <MediaContainer><Instagram /></MediaContainer>
              <MediaContainer><Whatsapp /></MediaContainer>
              <MediaContainer><Twitch /></MediaContainer>
              <MediaContainer><Youtube /></MediaContainer>
              <MediaContainer><Whatsapp /></MediaContainer>
            </div>
          </div>
        </FooterContent>
      </Foooter>
    </FooterDiv>
    // </div>
  );
}

export default Footer;