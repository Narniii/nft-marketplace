import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import testNFT from '../../assets/testNFT.png'
import { API_CONFIG } from "../../config";
import { addItem } from "../../redux/actions";
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
const RowCard = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
width:100%;
border-top:0.5px solid #cccccc;
// border-bottom:0.5px solid #cccccc;
// flex-wrap:wrap;
@media screen and (max-width: 768px) {
    font-size:14px;
};
@media screen and (max-width: 600px) {
    font-size:12px;
}
  
`
const CheckPut = styled.div`
cursor:pointer;
border: 1.5px solid #E6E6E6;
border-radius: 12px;
width:32px;
height:32px;
background-color:white;
overflow:hidden;
position:relative;
&:before {
    position: absolute;
    left: 0;
    top: 50%;
    height: 50%;
    width: 3px;
    background-color: white;
    content: "";
    transform: translateX(10px) rotate(-45deg);
    transform-origin: left bottom;
};
&:after {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 100%;
    background-color: white;
    content: "";
    transform: translateX(10px) rotate(-45deg);
    transform-origin: left bottom;
}
`;
const RowImage = styled.div`
width:55px;
height:55px;
background-position:center;
background-repeat:no-repeat;
background-size:cover;
border-radius:8px;
`
const BoldP = styled.p`
margin:0;
font-weight:600;
width:150px;
`
const PurpleP = styled.p`
margin:0;
color:#5D3393;
`
const Deviderr = styled.div`
height:1px;
width:100%;
background-color:#cccccc;
`
const ItemCard = ({ theme, name, creator, price, view, itemID, slider, creatorWallet, itemImage }) => {
    // console.log('view', view)
    const [checked, setChecked] = useState([])
    const [value, setValue] = useState(undefined)
    const [thisChecked, setThisChecked] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    const add = (item) => dispatch(addItem(item));
    var ITEM_IMAGE = itemImage.replace('root/NFTMarketplace-Backend/market/media/', '');
    const shorten = (str) => {
        if (str)
            return str.length > 10 ? str.substring(0, 7) + "..." : str;
        return 'undefined'
    }
    useEffect(() => {
        if (view)
            setLoading(false)
    }, [view])
    const handleCheck = (e) => {
        e.preventDefault()
        var tempArr = checked;
        setValue(e.target.id)
        // console.log(e.target.id)
        if (tempArr.includes(e.target.id)) {
            const removeItem = tempArr.filter((item) => item != e.target.id);
            tempArr = removeItem
        }
        else tempArr.push(e.target.id)


        setChecked(tempArr)
        // console.log(tempArr)

        if (tempArr.includes(e.target.id)) {
            document.getElementById(e.target.id).style.backgroundColor = '#46C263';
        } else {
            document.getElementById(e.target.id).style.backgroundColor = '#ffffff';
        }

    }

    return (
        <>
            {loading ? <div>...</div> :
                <>
                    {view == 'm' ?
                        <>
                            {slider ?
                                <Card className="p-2 col-6 col-lg-3 align-items-center align-self-center" >
                                    <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'assets/ethereum/' + creatorWallet + '/' + itemID}>
                                        <InnerDiv>
                                            <Image style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${ITEM_IMAGE}`)) }} />
                                            <div className="row px-2 w-100 align-self-center align-items-center justify-content-between" style={{ height: "50px" }}>
                                                <div className="p-0" style={{ width: "auto", fontSize: "14px" }}>{name}</div>
                                                <div className="p-0" style={{ width: "auto", fontSize: "14px", }}><span style={{ fontWeight: "bold" }}>{price}</span><PriceUnit> ETH</PriceUnit></div>
                                            </div>
                                            <CreatorHolder className="row px-2 pb-2 w-100 align-self-center align-items-center justify-content-start" style={{ height: "50px", fontWeight: "bold" }}>
                                                <LogoHolder />
                                                &nbsp;
                                                {shorten(creator)}
                                            </CreatorHolder>
                                            <AddButtonHolder className="w-100 p-0 align-self-center align-items-end">
                                                <AddToCartButton onClick={() => add({ price: price, name: name, id: itemID })}>Add To Cart</AddToCartButton>
                                            </AddButtonHolder>
                                        </InnerDiv>
                                    </Link>
                                </Card> :
                                <div className="col-6 col-lg-3 p-0">
                                    <Card className="p-2 align-items-center align-self-center" >
                                        <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'assets/ethereum/' + creatorWallet + '/' + itemID}>
                                            <InnerDiv>
                                                <Image style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${ITEM_IMAGE}`)) }} />
                                                <div className="row px-2 w-100 align-self-center align-items-center justify-content-between" style={{ height: "50px" }}>
                                                    <div className="p-0" style={{ width: "auto", fontSize: "14px" }}>{name}</div>
                                                    <div className="p-0" style={{ width: "auto", fontSize: "14px", }}><span style={{ fontWeight: "bold" }}>{price}</span><PriceUnit> ETH</PriceUnit></div>
                                                </div>
                                                <CreatorHolder className="row px-2 pb-2 w-100 align-self-center align-items-center justify-content-start" style={{ height: "50px", fontWeight: "bold" }}>
                                                    <LogoHolder />
                                                    &nbsp;
                                                    {shorten(creator)}
                                                </CreatorHolder>
                                                <AddButtonHolder className="w-100 p-0 align-self-center align-items-end">
                                                    <AddToCartButton onClick={() => add({ price: price, name: name, id: itemID })}>Add To Cart</AddToCartButton>
                                                </AddButtonHolder>
                                            </InnerDiv>
                                        </Link>
                                    </Card>
                                </div>
                            }
                        </>
                        :
                        view == 's' ?
                            <>
                                {slider ?
                                    <Card className="p-2 col-6 col-sm-3 col-lg-2 align-items-center align-self-center" >
                                        <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'assets/ethereum/' + creatorWallet + '/' + itemID}>
                                            <InnerDiv>
                                                <Image style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${ITEM_IMAGE}`)) }} />
                                                <div className="row px-2 w-100 align-self-center align-items-center justify-content-between" style={{ height: "50px" }}>
                                                    <div className="p-0" style={{ width: "auto", fontSize: "14px" }}>{name}</div>
                                                    <div className="p-0" style={{ width: "auto", fontSize: "14px", }}><span style={{ fontWeight: "bold" }}>{price}</span><PriceUnit> ETH</PriceUnit></div>
                                                </div>
                                                <CreatorHolder className="row px-2 pb-2 w-100 align-self-center align-items-center justify-content-start" style={{ height: "50px", fontWeight: "bold" }}>
                                                    <LogoHolder />
                                                    &nbsp;
                                                    {shorten(creator)}
                                                </CreatorHolder>
                                                <AddButtonHolder className="w-100 p-0 align-self-center align-items-end">
                                                    <AddToCartButton onClick={() => add({ price: price, name: name, id: itemID })}>Add To Cart</AddToCartButton>
                                                </AddButtonHolder>
                                            </InnerDiv>
                                        </Link>
                                    </Card> :
                                    <div className="p-0 col-6 col-sm-3 col-lg-2">
                                        <Card className="p-2 align-items-center align-self-center" >
                                            <InnerDiv>
                                                <Image style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${ITEM_IMAGE}`)) }} />
                                                <div className="row px-2 w-100 align-self-center align-items-center justify-content-between" style={{ height: "50px" }}>
                                                    <div className="p-0" style={{ width: "auto", fontSize: "14px" }}>{name}</div>
                                                    <div className="p-0" style={{ width: "auto", fontSize: "14px", }}><span style={{ fontWeight: "bold" }}>{price}</span><PriceUnit> ETH</PriceUnit></div>
                                                </div>
                                                <CreatorHolder className="row px-2 pb-2 w-100 align-self-center align-items-center justify-content-start" style={{ height: "50px", fontWeight: "bold" }}>
                                                    <LogoHolder />
                                                    &nbsp;
                                                    {shorten(creator)}
                                                </CreatorHolder>
                                                <AddButtonHolder className=" w-100 p-0 align-self-center align-items-end">
                                                    <AddToCartButton onClick={() => add({ price: price, name: name, id: itemID })}>Add To Cart</AddToCartButton>
                                                </AddButtonHolder>
                                            </InnerDiv>
                                        </Card>
                                    </div>
                                }
                            </>
                            : view == 'xs' ?
                                <RowCard className="col-12 p-2">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <CheckPut className="me-4" id={itemID} onClick={handleCheck} />
                                        <RowImage className="me-3" style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${ITEM_IMAGE}`)) }} />
                                        <BoldP>{shorten(name)}</BoldP>
                                    </div>
                                    <BoldP>0.245 ETH</BoldP>
                                    <p className="m-0">0.1234 WETH</p>
                                    <p className="m-0">#345</p>
                                    <PurpleP>owner name</PurpleP>
                                    <p className="m-0">32 mins ago</p>
                                </RowCard>
                                :
                                <>
                                    {slider ?
                                        <Card className="p-2 col-12 col-sm-6 col-lg-4 align-items-center align-self-center" >
                                            <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'assets/ethereum/' + creatorWallet + '/' + itemID}>
                                                <InnerDiv>
                                                    <Image style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${ITEM_IMAGE}`)) }} />
                                                    <div className="row px-2 w-100 align-self-center align-items-center justify-content-between" style={{ height: "50px" }}>
                                                        <div className="p-0" style={{ width: "auto", fontSize: "14px" }}>{name}</div>
                                                        <div className="p-0" style={{ width: "auto", fontSize: "14px", }}><span style={{ fontWeight: "bold" }}>{price}</span><PriceUnit> ETH</PriceUnit></div>
                                                    </div>
                                                    <CreatorHolder className="row px-2 pb-2 w-100 align-self-center align-items-center justify-content-start" style={{ height: "50px", fontWeight: "bold" }}>
                                                        <LogoHolder />
                                                        &nbsp;
                                                        {shorten(creator)}
                                                    </CreatorHolder>
                                                    <AddButtonHolder className=" w-100 p-0 align-self-center align-items-end">
                                                        <AddToCartButton onClick={() => add({ price: price, name: name, id: itemID })}>Add To Cart</AddToCartButton>
                                                    </AddButtonHolder>
                                                </InnerDiv>
                                            </Link>
                                        </Card> :
                                        <div className="col-12 col-sm-6 col-lg-4 p-0">
                                            <Card className="p-2 align-items-center align-self-center" >
                                                <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'assets/ethereum/' + creatorWallet + '/' + itemID}>
                                                    <InnerDiv>
                                                        <Image style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${ITEM_IMAGE}`)) }} />
                                                        <div className="row px-2 w-100 align-self-center align-items-center justify-content-between" style={{ height: "50px" }}>
                                                            <div className="p-0" style={{ width: "auto", fontSize: "14px" }}>{name}</div>
                                                            <div className="p-0" style={{ width: "auto", fontSize: "14px", }}><span style={{ fontWeight: "bold" }}>{price}</span><PriceUnit> ETH</PriceUnit></div>
                                                        </div>
                                                        <CreatorHolder className="row px-2 pb-2 w-100 align-self-center align-items-center justify-content-start" style={{ height: "50px", fontWeight: "bold" }}>
                                                            <LogoHolder />
                                                            &nbsp;
                                                            {shorten(creator)}
                                                        </CreatorHolder>
                                                        <AddButtonHolder className=" w-100 p-0 align-self-center align-items-end">
                                                            <AddToCartButton onClick={() => add({ price: price, name: name, id: itemID })}>Add To Cart</AddToCartButton>
                                                        </AddButtonHolder>
                                                    </InnerDiv>
                                                </Link>
                                            </Card>
                                        </div>
                                    }
                                </>
                    }
                </>
            }
        </>
    );
}

export default ItemCard;