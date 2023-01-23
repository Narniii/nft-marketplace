import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import pict from '../assets/info-pics4.svg'
import bg from '../assets/info-bg.svg'
import { Colors } from "../components/design/Colors";
import nextbg from '../assets/info-card-bg.svg'

const SectionContainer = styled.div`
    background-image: url(${bg});
    background-size:cover;
    background-repeat:no-repeat;
    background-position:top;  
    padding:0 32px;
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
background-image: url(${pict});
background-size:contain;
background-repeat:no-repeat;
background-position:left;
@media screen and (max-width: 768px) {
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
background: ${({ theme }) => theme.body};
// box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.07);
box-shadow: 0px 4px 16px rgba(192, 192, 192, 0.25);
border-radius: 24px;
padding:15px 30px;
margin-bottom:12px;
cursor:pointer;
font-weight:600;
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
height: 100%;
background: linear-gradient(357.7deg, #4C1593 1.45%, rgba(72, 15, 145, 0) 30.57%);
// border:1px solid red;
`

const Information = ({ theme, themeToggler }) => {
    return (
        <>
            <div style={{ padding: "0 32px" }}>
                <Navbar theme={theme} themeToggler={themeToggler} />
            </div>
            <SectionContainer>
                <Introduction className="py-3 d-flex flex-column flex-md-row justify-content-between">
                    {/* <BG> */}
                    <Image style={{
                        // border: "1px solid yellow",
                        height: "400px"
                    }} className="col-12 col-md-5"></Image>
                    <div style={{
                        // border: "1px solid yellow",
                        // height: "300px"
                    }} className="col-12 col-md-7">
                        <IntroductionTextContainer className="row p-5">
                            <h2 className="m-0" style={{ fontWeight: 600 }}>What is a Web3?</h2>
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
                <div className="my-2 row p-0">
                    <div className="d-none d-md-flex flex-column col-md-5">
                        <ReadingTitle>title</ReadingTitle>
                        <ReadingTitle>title</ReadingTitle>
                        <ReadingTitle>title</ReadingTitle>
                        <ReadingTitle>title</ReadingTitle>
                        <ReadingTitle>title</ReadingTitle>
                    </div>
                    <div className="col-12 col-md-7">
                        <div className="mb-3">
                            <h3 style={{ fontWeight: 600 }} className="m-0">title</h3>
                            <p className="m-0">NFTs operate on blockchain technology. The blockchain is basically a large, digital, public record. The most popular blockchains are distributed across many nodes (read: people’s computers), which is why you’ll hear them described as “decentralized.”
                                So instead of a central company-owned server, the blockchain is distributed across a peer-to-peer network. Not only does this ensure that the blockchain remains immutable, it also allows the node operators to earn money, instead of a single company. Because the blockchain records and preserves history, it is uniquely positioned to transform provable authenticity and digital ownership.
                                When someone creates, transfers, buys, sells, or otherwise does something with an NFT, that all gets recorded on the blockchain. This is what enables authentication.
                                This record serves as a permanent statement of authenticity that can be viewed or accessed by anyone. Today, when you buy a piece of art or a collector's item, it typically comes with a paper certificate of authenticity, which you must then keep track of forever. It is easily forgotten, lost or destroyed, creating a very fragile system for authenticity. Blockchain’s offer a simple and more secure solution to this long standing issue of proving authenticity.
                                Let’s say you want to buy a piece of artwork from Tyler Hobbs. With NFTs, you can see the entire history of that piece, all the past owners, every sale, all the way back to Hobbs’ original creation of the piece. Without NFTs, you wouldn’t know if you were buying the real piece or just a really good fake.
                            </p>
                        </div>
                        <div className="mb-3">
                            <h3 style={{ fontWeight: 600 }} className="m-0">title</h3>
                            <p className="m-0">NFTs operate on blockchain technology. The blockchain is basically a large, digital, public record. The most popular blockchains are distributed across many nodes (read: people’s computers), which is why you’ll hear them described as “decentralized.”
                                So instead of a central company-owned server, the blockchain is distributed across a peer-to-peer network. Not only does this ensure that the blockchain remains immutable, it also allows the node operators to earn money, instead of a single company. Because the blockchain records and preserves history, it is uniquely positioned to transform provable authenticity and digital ownership.
                                When someone creates, transfers, buys, sells, or otherwise does something with an NFT, that all gets recorded on the blockchain. This is what enables authentication.
                                This record serves as a permanent statement of authenticity that can be viewed or accessed by anyone. Today, when you buy a piece of art or a collector's item, it typically comes with a paper certificate of authenticity, which you must then keep track of forever. It is easily forgotten, lost or destroyed, creating a very fragile system for authenticity. Blockchain’s offer a simple and more secure solution to this long standing issue of proving authenticity.
                                Let’s say you want to buy a piece of artwork from Tyler Hobbs. With NFTs, you can see the entire history of that piece, all the past owners, every sale, all the way back to Hobbs’ original creation of the piece. Without NFTs, you wouldn’t know if you were buying the real piece or just a really good fake.
                            </p>
                        </div>
                        <div className="mb-3">
                            <h3 style={{ fontWeight: 600 }} className="m-0">title</h3>
                            <p className="m-0">NFTs operate on blockchain technology. The blockchain is basically a large, digital, public record. The most popular blockchains are distributed across many nodes (read: people’s computers), which is why you’ll hear them described as “decentralized.”
                                So instead of a central company-owned server, the blockchain is distributed across a peer-to-peer network. Not only does this ensure that the blockchain remains immutable, it also allows the node operators to earn money, instead of a single company. Because the blockchain records and preserves history, it is uniquely positioned to transform provable authenticity and digital ownership.
                                When someone creates, transfers, buys, sells, or otherwise does something with an NFT, that all gets recorded on the blockchain. This is what enables authentication.
                                This record serves as a permanent statement of authenticity that can be viewed or accessed by anyone. Today, when you buy a piece of art or a collector's item, it typically comes with a paper certificate of authenticity, which you must then keep track of forever. It is easily forgotten, lost or destroyed, creating a very fragile system for authenticity. Blockchain’s offer a simple and more secure solution to this long standing issue of proving authenticity.
                                Let’s say you want to buy a piece of artwork from Tyler Hobbs. With NFTs, you can see the entire history of that piece, all the past owners, every sale, all the way back to Hobbs’ original creation of the piece. Without NFTs, you wouldn’t know if you were buying the real piece or just a really good fake.
                            </p>
                        </div>
                        <FAQ className="mb-5" />
                        <NextPage>
                            <ShadowedDiv className="d-flex flex-column-reverse flex-sm-row p-2 text-light" >
                                <div  className="col-12 col-sm-8 text-center text-sm-left">A crypto wallet is a program that helps you buy, sell, and store your cryptocurrency and (in many cases) your NFTs. Think of it as your address on the blockchain........</div>
                                <div style={{ border: "1px solid purple" }} className="col-12 col-sm-4 text-center">image</div>
                            </ShadowedDiv>
                        </NextPage>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Information;