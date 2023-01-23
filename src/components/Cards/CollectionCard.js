import { EthereumClassic, Profile, TicketDiscount } from "iconsax-react";
import styled from "styled-components";
import testNFT from '../../assets/testNFT.png'
import { AddToCartButton } from "../design/Buttons";

const Card = styled.div`
// width: 100%;
// height: 100%;
// background: ${({ theme }) => theme.itemCardsBackground};
// box-shadow: ${({ theme }) => theme.boxShadow};
// border-radius: 24px;
// flex: none;
// order: 0;
// flex-grow: 0;
// display:flex;
// flex-direction:column;
`
const InnerDiv = styled.div`
height: 100%;
background: ${({ theme }) => theme.itemCardsBackground};
box-shadow: ${({ theme }) => theme.boxShadow};
border-radius: 24px;
display:flex;
flex-direction:column;
overflow:hidden;
`
const Banner = styled.div`
height:200px;
width:100%;
background-position:center;
background-repeat:no-repeat;
background-size:cover;
// border-radius: 24px;
`
const CollectionDetails = styled.div`
height:50px;
display:flex;
justify-conten:space-between;
align-content:center;
`
const Logo = styled.div`
width: 100px;
height: 100px;
background: #D9D9D9;
border: 1px solid #FFFFFF;
border-radius: 24px;
background-position:center;
background-repeat:no-repeat;
background-size:cover;
flex: none;
order: 0;
flex-grow: 0;
top:85% !important;
`

const DetailTitle = styled.span`
color: ${({ theme }) => theme.collectionDetailsTitle};
font-size:12px;
line-height:16px
`;
const DetailAnswer = styled.span`
color: ${({ theme }) => theme.collectionDetailsAnswer};
font-size:14px;
font-weight:600;
`;
const IconParent = styled.span`
color: ${({ theme }) => theme.collectionDetailsTitle};
`;

const CollectionCard = ({ theme, collectionName, collectionCreator, royalty, chain }) => {
    return (
        <Card className="p-2 col-xs-12 col-sm-6 col-md-4 align-items-center align-self-center" >
            <InnerDiv>
                <Banner className="position-relative" style={{ backgroundImage: `url(${testNFT})` }}>
                    <Logo style={{ backgroundImage: `url(${testNFT})`, }} className="position-absolute start-50 translate-middle " />
                    {console.log(testNFT)}
                </Banner>
                <div className="row p-1 w-100 align-self-center align-items-end justify-content-center" style={{ height: "50px", fontWeight: 600 }}>
                    {collectionName}
                </div>
                <div className="row px-3 pb-2 w-100 align-self-center align-items-center justify-content-between" style={{ height: "50px" }}>
                    <div className="p-0" style={{ width: "auto", height: "auto" }}><IconParent><Profile size="16" /></IconParent><DetailTitle>By</DetailTitle> <DetailAnswer>{collectionCreator}</DetailAnswer></div>
                    <div className="p-0" style={{ width: "auto", height: "auto" }}><IconParent><TicketDiscount size="16" /></IconParent><DetailTitle> Creator Fee</DetailTitle> <DetailAnswer>{royalty}%</DetailAnswer></div>
                    <div className="p-0" style={{ width: "auto", height: "auto" }}><IconParent><EthereumClassic size="16" /></IconParent><DetailTitle>Chain</DetailTitle> <DetailAnswer>Ethereum</DetailAnswer></div>
                </div>
            </InnerDiv>
        </Card>

    );
}

export default CollectionCard;