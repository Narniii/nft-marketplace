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
const Image = styled.div`
height:300px;
width:100%;
background-position:center;
background-repeat:no-repeat;
background-size:cover;
// border-radius: 24px;
`
const NftDetails = styled.div`
height:50px;
display:flex;
justify-conten:space-between;
align-content:center;
`
const LogoHolder = styled.div`
    box-sizing: border-box;
    background: #D9D9D9;
    border: 1px solid #D9D9D9;
    border-radius:50%;
    width:30px;
    height:30px;
    `;
const CreatorHolder = styled.div`
    color: ${({ theme }) => theme.creatorName};
    height:50px;
    `;
const AddButtonHolder = styled.div`
    height:50px;
    display:none;
`

const InnerDiv = styled.div`
    height: 100%;
    background: ${({ theme }) => theme.itemCardsBackground};
    box-shadow: ${({ theme }) => theme.boxShadow};
    border-radius: 24px;
    display:flex;
    flex-direction:column;
    overflow:hidden;
    &:hover{
        ${CreatorHolder}{
            display:none;
        }
        ${AddButtonHolder}{
            display:flex;
        }
    }
    `
const PriceUnit = styled.span`
    color: ${({ theme }) => theme.pricesUnits};
    font-size:10px !important;
    font-weight:light !important;
`;


const ItemCard = ({ theme, name, creator, price }) => {
    return (
        <Card className="p-2 col-xs-12 col-sm-6 col-md-3 align-items-center align-self-center" >
            <InnerDiv>
                <Image style={{ backgroundImage: `url(${testNFT})` }} />
                <div className="row px-2 w-100 align-self-center align-items-center justify-content-between" style={{ height: "50px" }}>
                    <div className="p-0" style={{ width: "auto", fontSize: "14px" }}>{name}</div>
                    <div className="p-0" style={{ width: "auto", fontSize: "14px", }}><span style={{ fontWeight: "bold" }}>{price}</span><PriceUnit> ETH</PriceUnit></div>
                </div>
                <CreatorHolder className="row px-2 pb-2 w-100 align-self-center align-items-center justify-content-start" style={{ height: "50px", fontWeight: "bold" }}>
                    <LogoHolder />
                    &nbsp;
                    {creator}
                </CreatorHolder>
                <AddButtonHolder className="row w-100 p-0 align-self-center align-items-center">
                    <AddToCartButton>Add To Cart</AddToCartButton>
                </AddButtonHolder>
            </InnerDiv>
        </Card>

    );
}

export default ItemCard;