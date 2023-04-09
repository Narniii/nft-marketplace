import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
// import pict from '../assets/info-pics4.svg'
import bg from '../assets/info-bg.svg'
import { Colors } from "../components/design/Colors";
import nextbg from '../assets/info-card-bg.svg'
// import walletPic from '../assets/info-pics2.svg'
import { LinearProgress, Typography } from "@mui/material";
import { ButtonOutlineLight } from "../components/design/Buttons";
import { Box } from "@mui/system";
import { useNavigate, useParams } from "react-router";
import { InformationData } from "../utils/informationData";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { shortenLong } from "../utils/countingFunctions";

const SectionContainer = styled.div`
    background-image: url(${bg});
    background-size:cover;
    background-repeat:no-repeat;
    background-position:top;  
    // padding:0 32px;
`;
const Introduction = styled.div`
    position:relative;    
`;
const IntroductionTextContainer = styled.div`
box-sizing: border-box;
// background: #525252;
background: transparent;
background-blend-mode: soft-light;
box-shadow: 0px 4px 16px rgba(192, 192, 192, 0.25);
backdrop-filter: blur(12px);
border-radius: 48px;
height:100%;
@media screen and (max-width: 600px) {
    transform:translateY(-50px);
}
`;
const Line = styled.div`
  position:absolute;
  left:50%;
  bottom:0;
  height:1px;
  width:50%;
  margin:0 auto;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.navBorderBackground};
`
const Image = styled.div`
background-size:contain;
background-repeat:no-repeat;
background-position:left;
@media screen and (max-width: 992px) {
    background-position:center;
}
  
`
const BG = styled.div`
background-image: url(${bg});
background-size:cover;
background-repeat:no-repeat;
background-position:center;  
`
const ReadingTitle = styled.div`
background: ${({ theme }) => theme.backgroundSecondary};
// box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.07);
// box-shadow: 0px 4px 16px rgba(192, 192, 192, 0.25);
box-shadow:${({ theme }) => theme.boxShadow};
border-radius: 24px;
padding:15px 30px;
margin-bottom:12px;
cursor:pointer;
font-weight:500;
&:active{
    background:${({ theme }) => theme.gradientPurple};
    color:white;
}
`
const FAQ = styled.div`
background: ${({ theme }) => theme.collectionCardHover};
border-radius: 24px;
padding:30px;
height:500px;
`
const NextPage = styled.div`
background: ${Colors.gradientPurpleStandard};
border-radius: 24px;
// padding:30px;
// height:250px;
background-image: url(${nextbg});
background-size:cover;
background-repeat:no-repeat;
background-position:center;
overflow:hidden;

`
const ShadowedDiv = styled.div`
width:100%;
// height: 100%;
height:300px;
background: linear-gradient(357.7deg, #4C1593 1.45%, rgba(72, 15, 145, 0) 30.57%);
// border:1px solid red;
// padding:30px;
@media screen and (max-width: 600px) {
    height:auto;
  }
  
`
const Title = styled.p`
margin:0;
color: ${({ theme }) => theme.titleInformation};
font-weight:500;
font-size:30px;
line-height: 42px;
height:42px;
margin-bottom:20px;
text-transform: ${Colors.subtitleFont};
  @media screen and (max-width: 600px) {
    font-size:20px;
}

`


const Information = ({ theme, themeToggler }) => {
    const navigate = useNavigate()
    const { id } = useParams()
    // console.log(id)
    const [info, setInfo] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [selectedTitle, setSelectedTitle] = useState(undefined)
    const [prevSelectedTitle, setPrevSelectedTitle] = useState(undefined)
    const [titleChanged, setTitleChanged] = useState(false)
    const [nextPage, setNextPage] = useState(false)
    const [nextInfo, setNextInfo] = useState(undefined)
    useEffect(() => {
        if (nextPage)
            window.location.reload()
    }, [nextPage])
    const handleNextPage = () => {
        navigate('/' + 'info/' + (parseInt(id) + 1))
        setNextPage(true)
    }

    useEffect(() => {
        const infor = InformationData.informations.find((item) => item.id == id);
        // console.log('infore', infor)
        // console.log(InformationData.informations)
        var nextInfor = ''
        if (infor) {
            setInfo(infor)
            nextInfor = InformationData.informations.find((item) => item.id == infor.nextId);
        }
        else {
            setErr('not found')
            navigate("/404")
        }

        if (nextInfor !== '') {
            setNextInfo(nextInfor)
        }

        // for (var i = 0; i < InformationData.informations.length; i++) {
        //     if (InformationData.informations[i].id == id) {
        //         console.log(InformationData.informations[i].id)
        //         setInfo(InformationData.informations[i])
        //     }
        //     else {
        //         setErr('not found')
        //         // navigate("/404")
        //     }
        // }
    }, [InformationData])
    useEffect(() => {
        if (info || err) {
            // console.log(info)
            setLoading(false)
        }
    }, [info, err])

    const shorten = (str) => {
        console.log(str.length)
        return str.length > 200 ? str.substring(0, 180) + "..." : str;
    }
    const sectionView = (e) => {
        // console.log(e.target.id)
        setPrevSelectedTitle((prevState) => {
            if (prevState) {
                return selectedTitle
            }
            else { return e.target }
        })

        // setPrevSelectedTitle(selectedTitle)
        setSelectedTitle(e.target)
        setTitleChanged(true)
        const targett = e.target.id.replace('title', '');
        // console.log(targett)
        const element = document.getElementById(targett);
        element.scrollIntoView();
        // e.target.style.background = Colors.gradientPurpleStandard;
        // e.target.style.color = 'white';

    }

    useEffect(() => {
        if (titleChanged && selectedTitle && prevSelectedTitle) {
            if (prevSelectedTitle == selectedTitle) {
                console.log('tu if', prevSelectedTitle.id, selectedTitle.id)
                selectedTitle.style.background = Colors.gradientPurpleStandard;
                selectedTitle.style.color = 'white';
            }
            else {
                console.log('tu esle', prevSelectedTitle.id, selectedTitle.id)

                selectedTitle.style.background = Colors.gradientPurpleStandard;
                selectedTitle.style.color = 'white';

                prevSelectedTitle.style.background = ''
                prevSelectedTitle.style.color = 'inherit';
            }



        }

    }, [selectedTitle, titleChanged, prevSelectedTitle])

    return (
        <>
            <div className="pdng">
                <Navbar theme={theme} themeToggler={themeToggler} />
            </div>
            {loading ?
                <LinearProgress color="secondary" sx={{ color: `${Colors.primaryMain} !important`, width: "100%" }} />
                :
                <>
                    {err ?
                        <div className="d-flex align-items-center justify-content-center my-5">
                            <Typography sx={{ color: `${Colors.primaryMain}` }}>{err}</Typography>
                        </div>
                        : <>
                            <SectionContainer className="pdng">
                                <Introduction className="py-3 mt-3 d-flex flex-column flex-lg-row justify-content-between">
                                    {/* <BG> */}
                                    <Image style={{
                                        backgroundImage: `url(${info.card_image})`,
                                        // border: "1px solid yellow",
                                        height: "400px"
                                    }} className="col-12 col-lg-5 mb-4"></Image>
                                    <div style={{
                                        // border: "1px solid yellow",
                                        // height: "300px"
                                    }} className="col-12 col-lg-7 mb-4">
                                        <IntroductionTextContainer className="d-flex flex-column p-5">
                                            <Title className="mb-4" style={{ fontWeight: 600 }}>{info.title}</Title>
                                            <p className="m-0">An NFT is a digital asset that can come in the form of art, music, in-game items, videos, and more. They are bought and sold online, frequently with cryptocurrency, and they are generally encoded with the same underlying software as many cryptos.
                                                Although they’ve been around since 2014, NFTs are gaining notoriety now because they are becoming an increasingly popular way to buy and sell digital artwork. The market for NFTs was worth a staggering $41 billion in 2021 alone, an amount that is approaching the total value of the entire global fine art market.
                                            </p>
                                        </IntroductionTextContainer>
                                    </div>
                                    {/* </BG> */}
                                    <Line />
                                </Introduction>
                            </SectionContainer>
                            <div style={{ padding: "0 32px" }}>
                                <div className="my-5 row p-0 justify-content-between">
                                    <div className="position-relative d-none d-lg-flex flex-column col-lg-4">
                                        {/* <div className="position-fixed"> */}
                                        {info.data.map((inf, index) => {
                                            return <ReadingTitle id={'title' + index} key={index} onClick={sectionView}>{inf.title}</ReadingTitle>
                                        })}
                                        {/* </div> */}
                                    </div>
                                    <div className="col-12 col-lg-7">
                                        {info.data.map((inf, index) => {
                                            return <div style={{ marginBottom: '55px' }} id={index}>
                                                <Title style={{ fontSize: '26px' }} className="mb-2">{inf.title}</Title>
                                                <p className="m-0">
                                                    {inf.content}
                                                </p>
                                            </div>
                                        })}
                                        <FAQ className="mb-5" />
                                        {nextInfo ?
                                            <NextPage>
                                                <ShadowedDiv className="d-flex flex-column-reverse flex-sm-row p-4 text-light" >
                                                    <div className="col-12 col-sm-8  d-flex flex-column justify-content-between align-items-center align-items-sm-start">
                                                        <Typography sx={{ fontSize: "14px", color: Colors.gray0 }} className="d-none d-sm-block">Read Next</Typography>
                                                        <div className="d-flex flex-column ">
                                                            <Typography sx={{ fontWeight: 500, marginBottom: "12px", textTransform: Colors.subtitleFont, fontSize: "24px" }} className="text-center text-sm-start">{nextInfo.title}</Typography>
                                                            <Typography className="d-none d-sm-block mb-3">
                                                                {shorten(nextInfo.description)}
                                                            </Typography>
                                                            <Typography className="text-center d-block d-sm-none mb-3">
                                                                {shortenLong(nextInfo.description)}
                                                            </Typography>
                                                            {/* <Link className="col-9 align-self-center align-self-sm-start" style={{ textDecoration: "none", color: "inherit"}} to={'/' + 'info/' + info.nextId}> */}
                                                            <ButtonOutlineLight style={{ height: "44px" }} onClick={handleNextPage} className="col-6 align-self-center align-self-sm-start">Show more</ButtonOutlineLight>
                                                            {/* </Link> */}
                                                        </div>
                                                    </div>
                                                    <Box
                                                        sx={{ height: { xs: "150px", sm: "100%" }, backgroundImage: `url(${nextInfo.card_image})`, backgroundPosition: "center", backgroundSize: "contain", backgroundRepeat: "no-repeat" }}
                                                        className="col-12 col-sm-4 text-center" />
                                                    <Typography sx={{ fontSize: "14px" }} className="d-block d-sm-none">read next</Typography>

                                                </ShadowedDiv>
                                            </NextPage>
                                            : undefined}
                                    </div>
                                </div>
                            </div>
                        </>}
                </>}
            <Footer />
        </>
    );
}

export default Information;