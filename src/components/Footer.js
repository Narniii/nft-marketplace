import { InputBase } from "@mui/material";
import { EmptyWalletTick, Instagram, Twitch, Whatsapp, Youtube } from "iconsax-react";
import styled from "styled-components";
import { ButtonMedium, ButtonSmall, ButtonXSmall } from "./design/Buttons";
import { Colors } from "./design/Colors";
import LinkCompFooter from "./design/Links";
import mediaPic from '../assets/media-pic.svg'
import mediaHoverPic from '../assets/media-pic-hover.svg'
import whatsAppPic from '../assets/wtspCart.svg'
import whatsAppHoverPic from '../assets/wtspHoverCart.svg'
import twitterPic from '../assets/twitterFoot.svg'
import twitterHoverPic from '../assets/twitterFootHover.svg'
import telePic from '../assets/teleCart.svg'
import teleHoverPic from '../assets/teleHoverCart.svg'
import discordPic from '../assets/discordCart.svg'
import discordHoverPic from '../assets/discordHoverCart.svg'

const FooterDiv = styled.div`
  // height:75vh;
  background-image: url(${({ theme }) => theme.footerImage});
  background-size:cover;
  background-repeat:no-repeat;
  background-position:center;
  // padding:0 32px;
  // @media screen and (max-width: 768px) {
  //   padding:0 24px;
  // };
  // @media screen and (max-width: 600px) {
  //   padding:0 16px;
  // }  

  `;
const Foooter = styled.div`
  height:100%;
  background:transparent;
  position:relative;
  // padding:5%;
  `;
// const FooterContent = styled.div`
//   background:transparent;
//   // width:60%;
//   // border:1px solid purple;
//   display:flex;
//   flex-direction:column;
//   justify-content:space-around;
//   width:50%;
//   @media screen and (max-width: 992px) {
//     width:calc(100% - 48px);
//   };
//   `;

const Line = styled.div`
  // position:absolute;
  top:0;
  height:1px;
  width:100%;
  margin:54px auto;
  transform: matrix(-1, 0, 0, 1, 0, 0);
  background: ${({ theme }) => theme.navBorderBackground};
  @media screen and (max-width: 575px) {
    margin:48px auto;
  };

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
// border:1px solid #E6E6E6;
border-radius:50%;
height:60px;
width:60px;
display:flex;
justify-content:center;
align-items:center;
color:#E6E6E6;
cursor:pointer;
background-image: url(${mediaPic});
background-size:contain;
background-repeat:no-repeat;
background-position:center;
transition:500ms ease;
@media screen and (max-width: 575px) {
  height:50px;
  width:50px;
}
&:hover{
  background-image: url(${mediaHoverPic});
}
`
const TeleContainer = styled.div`
// border:1px solid #E6E6E6;
border-radius:50%;
height:60px;
width:60px;
display:flex;
justify-content:center;
align-items:center;
color:#E6E6E6;
cursor:pointer;
background-image: url(${telePic});
background-size:contain;
background-repeat:no-repeat;
background-position:center;
transition:500ms ease;
@media screen and (max-width: 575px) {
  height:50px;
  width:50px;
}
&:hover{
  background-image: url(${teleHoverPic});
}
`
const TwitterContainer = styled.div`
// border:1px solid #E6E6E6;
border-radius:50%;
height:60px;
width:60px;
display:flex;
justify-content:center;
align-items:center;
color:#E6E6E6;
cursor:pointer;
background-image: url(${twitterPic});
background-size:contain;
background-repeat:no-repeat;
background-position:center;
transition:500ms ease;
@media screen and (max-width: 575px) {
  height:50px;
  width:50px;
}
&:hover{
  background-image: url(${twitterHoverPic});
}
`
const DiscordContainer = styled.div`
// border:1px solid #E6E6E6;
border-radius:50%;
height:60px;
width:60px;
display:flex;
justify-content:center;
align-items:center;
color:#E6E6E6;
cursor:pointer;
background-image: url(${discordPic});
background-size:contain;
background-repeat:no-repeat;
background-position:center;
transition:500ms ease;
@media screen and (max-width: 575px) {
  height:50px;
  width:50px;
}
&:hover{
  background-image: url(${discordHoverPic});
}
`
const WhatsAppContainer = styled.div`
// border:1px solid #E6E6E6;
border-radius:50%;
height:60px;
width:60px;
display:flex;
justify-content:center;
align-items:center;
color:#E6E6E6;
cursor:pointer;
background-image: url(${whatsAppPic});
background-size:contain;
background-repeat:no-repeat;
background-position:center;
transition:500ms ease;
@media screen and (max-width: 575px) {
  height:50px;
  width:50px;
}
&:hover{
  background-image: url(${whatsAppHoverPic});
}
`
const FooterNew = styled.div`
background-image: url(${({ theme }) => theme.footerImage});
background-size:cover;
background-repeat:no-repeat;
background-position:center;
width:100%;
display:flex;
justify-content:center;
`
const FooterContent = styled.div`
  background:transparent;
  // width:60%;
  // border:1px solid purple;
  display:flex;
  flex-direction:column;
  justify-content:space-around;
  width:516px;
  margin:44px 0;
  @media screen and (max-width: 575px) {
    width:calc(100% - 32px);
  };
  `;
const Texte = styled.div`
font-size:14px;
color:${Colors.gray1};
@media screen and (max-width: 575px) {
  font-size:12px;
};

`


const Footer = () => {
  return (

    <FooterNew>

      <FooterContent>
        {/* <Line /> */}

        {/* section 1 */}
        <div className="w-100 d-flex flex-column align-items-center justify-content-between text-center">
          <Logo className="mb-2" />
          <h6 className="" style={{ margin: 0, color: "white" }}>
            Dorta
          </h6>
          <div className="mt-2" style={{ color: Colors.gray1, textTransform: Colors.body, fontSize: "14px" }}>The world’s first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital items.</div>
        </div>

        {/* section 2 */}
        <div className="position-relative" >
          <Line />
          <div className="w-100 d-flex flex-column justify-content-between text-center ">
            <h6 className="mb-4" style={{ fontSize: "20px", margin: 0, color: "white" }}>
              Company
            </h6>
            <div className="d-flex flex-column flex-sm-row justify-content-between">
              <LinkCompFooter linkText={'About'} linkSize={'medium'} loading={false} link={'/'} />
              <LinkCompFooter linkText={'Careers'} linkSize={'medium'} loading={false} link={'/'} />
              <LinkCompFooter linkText={'Ventures'} linkSize={'medium'} loading={false} link={'/'} />
              <LinkCompFooter linkText={'Grants'} linkSize={'medium'} loading={false} link={'/'} />
            </div>
          </div>
        </div>

        {/* section 3 */}
        <div className="" >
          <Line />
          <div className="d-flex flex-column justify-content-between align-items-center text-center ">
            <Texte className="mb-3">Join our mailing list to stay in the loop with our newest feature releases</Texte>
            <EmailBox className="d-flex w-100 p-1 ps-3  justify-content-between">
              <div className="col-9 p-0">
                <InputBase
                  sx={{ color: Colors.gray2, width: "100%", height: "100%" }}
                  placeholder="Example@gmail.com"
                  inputProps={{ 'aria-label': 'enter email' }}
                />
              </div>
              <div className="col-3 col-md-2 p-0"><ButtonMedium>Submit</ButtonMedium></div>
            </EmailBox>
            <div style={{ width: "100%", marginTop: "54px" }} className="d-flex flex-row justify-content-between">
              <MediaContainer />
              <WhatsAppContainer />
              <DiscordContainer />
              <TeleContainer />
              <TwitterContainer />
            </div>
          </div>
        </div>


      </FooterContent>


    </FooterNew>
    // </div>
  );
}

export default Footer;