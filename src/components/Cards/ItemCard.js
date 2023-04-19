import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { API_CONFIG } from "../../config";
import { addItem } from "../../redux/actions";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { AddToCartButton } from "../design/Buttons";
import TickPic from '../../assets/tick.svg'
import { Skeleton } from "@mui/material";
import { Colors } from "../design/Colors";
import { countTimeAgo, shorten } from "../../utils/countingFunctions";

const Card = styled.div`
width: 100%;


padding-left:12px;
padding-right:12px;
padding-bottom:24px;
padding-top:4px;

@media screen and (max-width: 992px) {
    padding-left:8px;
    padding-right:8px;
    padding-bottom:16px;

}
// @media screen and (max-width: 575px) {
//     padding-left:0;
//     padding-right:0;
// }
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
height:30px;
display:flex;
justify-conten:space-between;
align-content:center;
`
const LogoHolder = styled.div`
    box-sizing: border-box;
    // background: #D9D9D9;
    border: 1px solid #D9D9D9;
    border-radius:50%;
    width:30px;
    height:30px;
    `;
const CreatorHolder = styled.div`
    display:flex;
    color: ${({ theme }) => theme.creatorName};
    height:30px;
    `;
const CreatorHolderListed = styled.div`
    display:none;
    color: ${({ theme }) => theme.creatorName};
    height:30px;
    `;
const AddButtonHolder = styled.div`
    height:46px;
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
        ${CreatorHolderListed}{
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
border-top:0.1px solid #cccccc;
border-bottom:0.1px solid #cccccc;
// flex-wrap:wrap;
// overflox-x:scroll;
@media screen and (max-width: 992px) {
    font-size:14px;
};
@media screen and (max-width: 575px) {
    font-size:12px;
}
  
`
const CheckPut = styled.div`
cursor:pointer;
border: 1.5px solid #E6E6E6;
border-radius: 9px;
width:32px;
height:32px;
background-color:#f9f9f9;
overflow:hidden;
position:relative;
display:flex;
align-items:center;
justify-content:center;
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
width:100px;
`
const PurpleP = styled.p`
margin:0;
width:100px;
color:#5D3393;
`
const Deviderr = styled.div`
height:1px;
width:100%;
background-color:#cccccc;
`
const ItemCard = ({ theme, name, creator, price, view, itemID, slider, creatorWallet, itemImage, time, owner, item, creatorImg , royalties}) => {
    // console.log('view', view)
    const globalUser = useSelector(state => state.userReducer);
    const shoppingCart = useSelector(state => state.cartReducer);

    var itemInCart = shoppingCart.products.find((item) => item.nft_id === itemID)

    const [checked, setChecked] = useState([])
    const [value, setValue] = useState(undefined)
    const [thisChecked, setThisChecked] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [updatedTime, setUpdatedTime] = useState(undefined)
    const [isListed, setIsListed] = useState(price !== " " ? true : false)
    const [isOnCart, setisOnCart] = useState(itemInCart)
    const dispatch = useDispatch();
    const add = (item) => {
        console.log(shoppingCart.products)
        var itemInCartt = shoppingCart.products.find((i) => i.nft_id === item._id.$oid);
        console.log(itemInCartt)
        if (itemInCartt) {
            if (itemInCartt.quantity < item.copies) {
                dispatch(addItem(item))
            }
        } else dispatch(addItem(item))
    };
    var ITEM_IMAGE = itemImage.replace('root/dortzio/market/media/', '');
    useEffect(() => {
        if (view && item)
            setLoading(false)
    }, [view, item])
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
            {loading ?
                <>
                    <div className="col-6 col-lg-3 p-0">
                        <Card className=" align-items-center align-self-center" >
                            <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                        </Card>
                    </div>
                </>
                :
                <>
                    {view == 'm' ?
                        <>
                            {slider ?
                                <Card className="col-6 col-lg-3 align-items-center align-self-center" >
                                    <InnerDiv>
                                        <Link className="d-flex flex-column" style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'assets/ethereum/' + `${item.current_owner}` + '/' + itemID}>
                                            <Image style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${ITEM_IMAGE}`)) }} />
                                            <div className="d-flex pt-3 px-3 w-100 align-self-center align-items-center justify-content-between" style={{ height: "30px", marginBottom: "8px" }}>
                                                <div className="p-0" style={{ width: "auto", fontSize: "14px" }}>{name}</div>
                                                <div className="p-0" style={{ width: "auto", fontSize: "14px", }}><span style={{ fontWeight: 500 }}>{price !== " " ? price : 0}</span><PriceUnit> ETH</PriceUnit></div>
                                            </div>
                                        </Link>

                                        <CreatorHolder className="px-3 mb-3 w-100 align-self-center align-items-center justify-content-start" style={{ height: "30px", fontWeight: 500 }}>
                                            <LogoHolder style={{ backgroundImage: creatorImg && creatorImg !== "" ? BG_URL(PUBLIC_URL(`${API_CONFIG.AUTH_MEDIA_API_URL}${creatorImg.replace('root/dortzio/auth/media/', '')}`)) : `${Colors.gradientPurpleStandard}` }} />
                                            &nbsp;
                                            {shorten(creator)}
                                        </CreatorHolder>
                                        {globalUser && globalUser.walletAddress == item.current_owner ?
                                            <>
                                                {isListed ? <AddButtonHolder className="w-100 p-0 align-self-center align-items-end">
                                                    <AddToCartButton >Edit Listing</AddToCartButton>
                                                </AddButtonHolder>
                                                    : <AddButtonHolder className="w-100 p-0 align-self-center align-items-end">
                                                        <AddToCartButton >List For Sale</AddToCartButton>
                                                    </AddButtonHolder>
                                                }
                                            </>
                                            :
                                            <>
                                                {isListed && !itemInCart ?
                                                    <AddButtonHolder className="w-100 p-0 align-self-center align-items-end">
                                                        <AddToCartButton onClick={() => add(item)}>Add To Cart</AddToCartButton>
                                                    </AddButtonHolder>
                                                    : <CreatorHolderListed className="px-3 mb-3 w-100 align-self-center align-items-center justify-content-start" style={{ height: "30px", fontWeight: 500 }}>
                                                        <LogoHolder style={{ backgroundImage: creatorImg && creatorImg !== "" ? BG_URL(PUBLIC_URL(`${API_CONFIG.AUTH_MEDIA_API_URL}${creatorImg.replace('root/dortzio/auth/media/', '')}`)) : `${Colors.gradientPurpleStandard}` }} />
                                                        &nbsp;
                                                        {shorten(creator)}
                                                    </CreatorHolderListed>
                                                }
                                            </>
                                        }
                                    </InnerDiv>
                                </Card> :
                                <div className="col-6 col-lg-3 p-0">
                                    <Card className=" align-items-center align-self-center" >
                                        <InnerDiv>
                                            <Link className="d-flex flex-column" style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'assets/ethereum/' + `${item.current_owner}` + '/' + itemID}>
                                                <Image style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${ITEM_IMAGE}`)) }} />
                                                <div className="d-flex pt-3 px-3 w-100 align-self-center align-items-center justify-content-between" style={{ height: "30px", marginBottom: "8px" }}>
                                                    <div className="p-0" style={{ width: "auto", fontSize: "14px" }}>{name}</div>
                                                    <div className="p-0" style={{ width: "auto", fontSize: "14px", }}><span style={{ fontWeight: 500 }}>{price !== " " ? price : 0}</span><PriceUnit> ETH</PriceUnit></div>
                                                </div>
                                            </Link>
                                            <CreatorHolder className=" px-3 mb-3 w-100 align-self-center align-items-center justify-content-start" style={{ height: "30px", fontWeight: 500 }}>
                                                <LogoHolder style={{ backgroundImage: creatorImg && creatorImg !== "" ? BG_URL(PUBLIC_URL(`${API_CONFIG.AUTH_MEDIA_API_URL}${creatorImg.replace('root/dortzio/auth/media/', '')}`)) : `${Colors.gradientPurpleStandard}` }} />
                                                &nbsp;
                                                {shorten(creator)}
                                            </CreatorHolder>
                                            {globalUser && globalUser.walletAddress == item.current_owner ?
                                                <>
                                                    {isListed ? <AddButtonHolder className="w-100 p-0 align-self-center align-items-end">
                                                        <AddToCartButton >Edit Listing</AddToCartButton>
                                                    </AddButtonHolder>
                                                        : <AddButtonHolder className="w-100 p-0 align-self-center align-items-end">
                                                            <AddToCartButton >List For Sale</AddToCartButton>
                                                        </AddButtonHolder>
                                                    }
                                                </>
                                                :
                                                <>
                                                    {isListed && !itemInCart ?
                                                        <AddButtonHolder className="w-100 p-0 align-self-center align-items-end">
                                                            <AddToCartButton onClick={() => add(item)}>Add To Cart</AddToCartButton>
                                                        </AddButtonHolder>
                                                        : <CreatorHolderListed className="px-3 mb-3 w-100 align-self-center align-items-center justify-content-start" style={{ height: "30px", fontWeight: 500 }}>
                                                            <LogoHolder style={{ backgroundImage: creatorImg && creatorImg !== "" ? BG_URL(PUBLIC_URL(`${API_CONFIG.AUTH_MEDIA_API_URL}${creatorImg.replace('root/dortzio/auth/media/', '')}`)) : `${Colors.gradientPurpleStandard}` }} />
                                                            &nbsp;
                                                            {shorten(creator)}
                                                        </CreatorHolderListed>
                                                    }
                                                </>
                                            }
                                        </InnerDiv>
                                    </Card>
                                </div>
                            }
                        </>
                        :
                        view == 's' ?
                            <>
                                {slider ?
                                    <Card className="px-1 col-6 col-sm-3 col-lg-2 align-items-center align-self-center" >
                                        <InnerDiv>
                                            <Link className="d-flex flex-column" style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'assets/ethereum/' + `${item.current_owner}` + '/' + itemID}>
                                                <Image style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${ITEM_IMAGE}`)) }} />
                                                <div className="d-flex pt-3 px-3 w-100 align-self-center align-items-center justify-content-between" style={{ height: "30px", marginBottom: "8px" }}>
                                                    <div className="p-0" style={{ width: "auto", fontSize: "14px" }}>{shorten(name)}</div>
                                                    <div className="p-0" style={{ width: "auto", fontSize: "14px", }}><span style={{ fontWeight: 500 }}>{price !== " " ? price : 0}</span><PriceUnit> ETH</PriceUnit></div>
                                                </div>
                                            </Link>
                                            <CreatorHolder className=" px-3 mb-3 w-100 align-self-center align-items-center justify-content-start" style={{ height: "30px", fontWeight: 500 }}>
                                                <LogoHolder style={{ backgroundImage: creatorImg && creatorImg !== "" ? BG_URL(PUBLIC_URL(`${API_CONFIG.AUTH_MEDIA_API_URL}${creatorImg.replace('root/dortzio/auth/media/', '')}`)) : `${Colors.gradientPurpleStandard}` }} />
                                                &nbsp;
                                                {shorten(creator)}
                                            </CreatorHolder>
                                            {globalUser && globalUser.walletAddress == item.current_owner ?
                                                <>
                                                    {isListed ? <AddButtonHolder className="w-100 p-0 align-self-center align-items-end">
                                                        <AddToCartButton >Edit Listing</AddToCartButton>
                                                    </AddButtonHolder>
                                                        : <AddButtonHolder className="w-100 p-0 align-self-center align-items-end">
                                                            <AddToCartButton >List For Sale</AddToCartButton>
                                                        </AddButtonHolder>
                                                    }
                                                </>
                                                :
                                                <>
                                                    {isListed && !itemInCart ?
                                                        <AddButtonHolder className="w-100 p-0 align-self-center align-items-end">
                                                            <AddToCartButton onClick={() => add(item)}>Add To Cart</AddToCartButton>
                                                        </AddButtonHolder>
                                                        : <CreatorHolderListed className="px-3 mb-3 w-100 align-self-center align-items-center justify-content-start" style={{ height: "30px", fontWeight: 500 }}>
                                                            <LogoHolder style={{ backgroundImage: creatorImg && creatorImg !== "" ? BG_URL(PUBLIC_URL(`${API_CONFIG.AUTH_MEDIA_API_URL}${creatorImg.replace('root/dortzio/auth/media/', '')}`)) : `${Colors.gradientPurpleStandard}` }} />
                                                            &nbsp;
                                                            {shorten(creator)}
                                                        </CreatorHolderListed>
                                                    }
                                                </>
                                            }
                                        </InnerDiv>
                                    </Card> :
                                    <div className="p-0 col-6 col-sm-3 col-lg-2">
                                        <Card className="px-1 align-items-center align-self-center" >
                                            <InnerDiv>
                                                <Link className="d-flex flex-column" style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'assets/ethereum/' + `${item.current_owner}` + '/' + itemID}>
                                                    <Image style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${ITEM_IMAGE}`)) }} />
                                                    <div className="d-flex pt-3 px-3 w-100 align-self-center align-items-center justify-content-between" style={{ height: "30px", marginBottom: "8px" }}>
                                                        <div className="p-0" style={{ width: "auto", fontSize: "14px" }}>{shorten(name)}</div>
                                                        <div className="p-0" style={{ width: "auto", fontSize: "14px", }}><span style={{ fontWeight: 500 }}>{price !== " " ? price : 0}</span><PriceUnit> ETH</PriceUnit></div>
                                                    </div>
                                                </Link>
                                                <CreatorHolder className=" px-3 mb-3 w-100 align-self-center align-items-center justify-content-start" style={{ height: "30px", fontWeight: 500 }}>
                                                    <LogoHolder style={{ backgroundImage: creatorImg && creatorImg !== "" ? BG_URL(PUBLIC_URL(`${API_CONFIG.AUTH_MEDIA_API_URL}${creatorImg.replace('root/dortzio/auth/media/', '')}`)) : `${Colors.gradientPurpleStandard}` }} />
                                                    &nbsp;
                                                    {shorten(creator)}
                                                </CreatorHolder>
                                                {globalUser && globalUser.walletAddress == item.current_owner ?
                                                    <>
                                                        {isListed ? <AddButtonHolder className="w-100 p-0 align-self-center align-items-end">
                                                            <AddToCartButton >Edit Listing</AddToCartButton>
                                                        </AddButtonHolder>
                                                            : <AddButtonHolder className="w-100 p-0 align-self-center align-items-end">
                                                                <AddToCartButton >List For Sale</AddToCartButton>
                                                            </AddButtonHolder>
                                                        }
                                                    </>
                                                    :
                                                    <>
                                                        {isListed && !itemInCart ?
                                                            <AddButtonHolder className="w-100 p-0 align-self-center align-items-end">
                                                                <AddToCartButton onClick={() => add(item)}>Add To Cart</AddToCartButton>
                                                            </AddButtonHolder>
                                                            : <CreatorHolderListed className="px-3 mb-3 w-100 align-self-center align-items-center justify-content-start" style={{ height: "30px", fontWeight: 500 }}>
                                                                <LogoHolder style={{ backgroundImage: creatorImg && creatorImg !== "" ? BG_URL(PUBLIC_URL(`${API_CONFIG.AUTH_MEDIA_API_URL}${creatorImg.replace('root/dortzio/auth/media/', '')}`)) : `${Colors.gradientPurpleStandard}` }} />
                                                                &nbsp;
                                                                {shorten(creator)}
                                                            </CreatorHolderListed>
                                                        }
                                                    </>
                                                }
                                            </InnerDiv>
                                        </Card>
                                    </div>
                                }
                            </>
                            : view == 'xs' ?
                                <RowCard className="col-12 py-1">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <CheckPut className="me-4" id={itemID} onClick={handleCheck} ><img id={itemID} src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>
                                        <RowImage className="me-3" style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${ITEM_IMAGE}`)) }} />
                                        <BoldP>{shorten(name)}</BoldP>
                                    </div>
                                    <BoldP>{item.price != ' ' ? item.price : 0} ETH</BoldP>
                                    <p className="m-0">{item.price !== " " ? item.price : 0} ETH</p>
                                    <p className="m-0">#345</p>
                                    <PurpleP>{shorten(creator)}</PurpleP>
                                    <p style={{ width: "100px" }} className="m-0">{countTimeAgo(item.updated_at.$date)}</p>
                                </RowCard>
                                :
                                <>
                                    {slider ?
                                        <Card className=" col-12 col-sm-6 col-lg-4 align-items-center align-self-center" >
                                            <InnerDiv>
                                                <Link className="d-flex flex-column" style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'assets/ethereum/' + `${item.current_owner}` + '/' + itemID}>
                                                    <Image style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${ITEM_IMAGE}`)) }} />
                                                    <div className="d-flex pt-3 px-3 w-100 align-self-center align-items-center justify-content-between" style={{ height: "30px", marginBottom: "8px" }}>
                                                        <div className="p-0" style={{ width: "auto", fontSize: "14px" }}>{name}</div>
                                                        <div className="p-0" style={{ width: "auto", fontSize: "14px", }}><span style={{ fontWeight: 500 }}>{price !== " " ? price : 0}</span><PriceUnit> ETH</PriceUnit></div>
                                                    </div>
                                                </Link>
                                                <CreatorHolder className=" px-3 mb-3 w-100 align-self-center align-items-center justify-content-start" style={{ height: "30px", fontWeight: 500 }}>
                                                    <LogoHolder style={{ backgroundImage: creatorImg && creatorImg !== "" ? BG_URL(PUBLIC_URL(`${API_CONFIG.AUTH_MEDIA_API_URL}${creatorImg.replace('root/dortzio/auth/media/', '')}`)) : `${Colors.gradientPurpleStandard}` }} />
                                                    &nbsp;
                                                    {shorten(creator)}
                                                </CreatorHolder>
                                                {globalUser && globalUser.walletAddress == item.current_owner ?
                                                    <>
                                                        {isListed ? <AddButtonHolder className="w-100 p-0 align-self-center align-items-end">
                                                            <AddToCartButton >Edit Listing</AddToCartButton>
                                                        </AddButtonHolder>
                                                            : <AddButtonHolder className="w-100 p-0 align-self-center align-items-end">
                                                                <AddToCartButton >List For Sale</AddToCartButton>
                                                            </AddButtonHolder>
                                                        }
                                                    </>
                                                    :
                                                    <>
                                                        {isListed && !itemInCart ?
                                                            <AddButtonHolder className="w-100 p-0 align-self-center align-items-end">
                                                                <AddToCartButton onClick={() => add(item)}>Add To Cart</AddToCartButton>
                                                            </AddButtonHolder>
                                                            : <CreatorHolderListed className="px-3 mb-3 w-100 align-self-center align-items-center justify-content-start" style={{ height: "30px", fontWeight: 500 }}>
                                                                <LogoHolder style={{ backgroundImage: creatorImg && creatorImg !== "" ? BG_URL(PUBLIC_URL(`${API_CONFIG.AUTH_MEDIA_API_URL}${creatorImg.replace('root/dortzio/auth/media/', '')}`)) : `${Colors.gradientPurpleStandard}` }} />
                                                                &nbsp;
                                                                {shorten(creator)}
                                                            </CreatorHolderListed>
                                                        }
                                                    </>
                                                }
                                            </InnerDiv>
                                        </Card> :
                                        <div className="col-12 col-sm-6 col-lg-4 p-0">
                                            <Card className=" align-items-center align-self-center" >
                                                <InnerDiv>
                                                    <Link className="d-flex flex-column" style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'assets/ethereum/' + `${item.current_owner}` + '/' + itemID}>
                                                        <Image style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${ITEM_IMAGE}`)) }} />
                                                        <div className="d-flex pt-3 px-3 w-100 align-self-center align-items-center justify-content-between" style={{ height: "30px", marginBottom: "8px" }}>
                                                            <div className="p-0" style={{ width: "auto", fontSize: "14px" }}>{name}</div>
                                                            <div className="p-0" style={{ width: "auto", fontSize: "14px", }}><span style={{ fontWeight: 500 }}>{price !== " " ? price : 0}</span><PriceUnit> ETH</PriceUnit></div>
                                                        </div>
                                                    </Link>
                                                    <CreatorHolder className=" px-3 mb-3 w-100 align-self-center align-items-center justify-content-start" style={{ height: "30px", fontWeight: 500 }}>
                                                        <LogoHolder style={{ backgroundImage: creatorImg && creatorImg !== "" ? BG_URL(PUBLIC_URL(`${API_CONFIG.AUTH_MEDIA_API_URL}${creatorImg.replace('root/dortzio/auth/media/', '')}`)) : `${Colors.gradientPurpleStandard}` }} />
                                                        &nbsp;
                                                        {shorten(creator)}
                                                    </CreatorHolder>
                                                    {globalUser && globalUser.walletAddress == item.current_owner ?
                                                        <>
                                                            {isListed ? <AddButtonHolder className="w-100 p-0 align-self-center align-items-end">
                                                                <AddToCartButton >Edit Listing</AddToCartButton>
                                                            </AddButtonHolder>
                                                                : <AddButtonHolder className="w-100 p-0 align-self-center align-items-end">
                                                                    <AddToCartButton >List For Sale</AddToCartButton>
                                                                </AddButtonHolder>
                                                            }
                                                        </>
                                                        :
                                                        <>
                                                            {isListed && !itemInCart ?
                                                                <AddButtonHolder className="w-100 p-0 align-self-center align-items-end">
                                                                    <AddToCartButton onClick={() => add(item)}>Add To Cart</AddToCartButton>
                                                                </AddButtonHolder>
                                                                : <CreatorHolderListed className="px-3 mb-3 w-100 align-self-center align-items-center justify-content-start" style={{ height: "30px", fontWeight: 500 }}>
                                                                    <LogoHolder style={{ backgroundImage: creatorImg && creatorImg !== "" ? BG_URL(PUBLIC_URL(`${API_CONFIG.AUTH_MEDIA_API_URL}${creatorImg.replace('root/dortzio/auth/media/', '')}`)) : `${Colors.gradientPurpleStandard}` }} />
                                                                    &nbsp;
                                                                    {shorten(creator)}
                                                                </CreatorHolderListed>
                                                            }
                                                        </>
                                                    }
                                                </InnerDiv>
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