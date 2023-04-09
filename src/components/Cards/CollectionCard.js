import { EthereumClassic, Profile, TicketDiscount } from "iconsax-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { API_CONFIG } from "../../config";
import { countCreatorFee, shorten } from "../../utils/countingFunctions";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { AddToCartButton } from "../design/Buttons";

const Card = styled.div`
width: 100%;
// height: 100%;
// background: ${({ theme }) => theme.itemCardsBackground};
// box-shadow: ${({ theme }) => theme.boxShadow};
// border-radius: 24px;
// flex: none;
// order: 0;
// flex-grow: 0;
// display:flex;
// flex-direction:column;
padding-top:4px;

padding-left:12px;
padding-right:12px;
padding-bottom:24px;

@media screen and (max-width: 992px) {
    padding-left:8px;
    padding-right:8px;
    padding-bottom:16px;

}

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
font-weight:500;
`;
const IconParent = styled.span`
color: ${({ theme }) => theme.collectionDetailsTitle};
`;

const CollectionCard = ({ collection, explore, theme, collectionName, collectionCreator, royalty, chain, slider, collectionLogo, collectionBanner, id }) => {
    var LOGO = collectionLogo.replace('root/dortzio/market/media/', '');
    var BANNER = collectionBanner.replace('root/dortzio/market/media/', '');
    return (
        <>
            {slider ?
                <Card className="col-12 col-sm-6 col-lg-4 align-items-center align-self-center" >
                    <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'collection/' + collectionName + '/' + id}>
                        <InnerDiv>
                            <Banner className="position-relative" style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${BANNER}`)) }}>
                                <Logo style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${LOGO}`)), }} className="position-absolute start-50 translate-middle " />
                            </Banner>
                            <div className="d-flex p-1 w-100 align-self-center align-items-end justify-content-center" style={{ height: "50px", fontWeight: 500 }}>
                                {collectionName}
                            </div>
                            <div className="d-flex px-3 pb-2 w-100 align-self-center align-items-center justify-content-between" style={{ height: "50px" }}>
                                <div className="p-0" style={{ width: "auto", height: "auto" }}><IconParent><Profile size="16" className="d-inline d-sm-none d-lg-inline" /></IconParent><DetailTitle>By</DetailTitle> <DetailAnswer>{shorten(collectionCreator)}</DetailAnswer></div>
                                <div className="p-0" style={{ width: "auto", height: "auto" }}><IconParent><TicketDiscount size="16" className="d-inline d-sm-none d-lg-inline" /></IconParent><DetailTitle> Creator Fee</DetailTitle> <DetailAnswer>{countCreatorFee(collection.perpetual_royalties, collection.creator)}</DetailAnswer></div>
                                <div className="p-0" style={{ width: "auto", height: "auto" }}><IconParent><EthereumClassic size="16" className="d-inline d-sm-none d-lg-inline" /></IconParent><DetailTitle>Chain</DetailTitle> <DetailAnswer>Ethereum</DetailAnswer></div>
                            </div>
                        </InnerDiv>
                    </Link>
                </Card >
                :
                <div className="col-12 col-sm-6 col-lg-4 p-0">
                    <Card className="align-items-center align-self-center">
                        <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'collection/' + collectionName + '/' + id}>
                            <InnerDiv>
                                <Banner className="position-relative" style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${BANNER}`)) }}>
                                    <Logo style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${LOGO}`)), }} className="position-absolute start-50 translate-middle " />
                                </Banner>
                                <div className="d-flex p-1 w-100 align-self-center align-items-end justify-content-center" style={{ height: "50px", fontWeight: 500 }}>
                                    {collectionName}
                                </div>
                                <div className="d-flex px-3 pb-2 w-100 align-self-center align-items-center justify-content-between" style={{ height: "50px" }}>
                                    <div className="p-0" style={{ width: "auto", height: "auto" }}><IconParent><Profile size="16" className="d-inline d-sm-none d-lg-inline" /></IconParent><DetailTitle>By</DetailTitle> <DetailAnswer>{shorten(collectionCreator)}</DetailAnswer></div>
                                    <div className="p-0" style={{ width: "auto", height: "auto" }}><IconParent><TicketDiscount size="16" className="d-inline d-sm-none d-lg-inline" /></IconParent><DetailTitle> Creator Fee</DetailTitle> <DetailAnswer>{countCreatorFee(collection.perpetual_royalties, collection.creator)}</DetailAnswer></div>
                                    <div className="p-0" style={{ width: "auto", height: "auto" }}><IconParent><EthereumClassic size="16" className="d-inline d-sm-none d-lg-inline" /></IconParent><DetailTitle>Chain</DetailTitle> <DetailAnswer>Ethereum</DetailAnswer></div>
                                </div>
                            </InnerDiv>
                        </Link>
                    </Card >
                </div>
            }
        </>
    );
}

export default CollectionCard;