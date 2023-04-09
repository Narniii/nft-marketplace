import { CloseCircle } from "iconsax-react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { API_CONFIG } from "../../config";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { Colors } from "../design/Colors";


const Card = styled.div`
height:auto;
padding-left:12px;
padding-right:12px;
padding-bottom:24px;
@media screen and (max-width: 992px) {
    padding-left:8px;
    padding-right:8px;
    padding-bottom:16px;
}
`
const LastCard = styled.div`
height:auto;
padding-left:6px;
padding-right:6px;
padding-bottom:12px;
`
const LastInner = styled.div`
border-radius:24px;
height:127px;
width:127px;
background-position:center;
background-repeat:no-repeat;
background-size:cover;
display:flex;
justify-content:center;
align-items:center;
@media screen and (max-width: 600px) {
    height:83px;
    width:83px;
    }

`
const Inner = styled.div`
// height: 100%;
background: ${({ theme }) => theme.itemCardsBackground};
box-shadow: ${({ theme }) => theme.boxShadow};
border-radius: 24px;
display:flex;
flex-direction:column;
overflow:hidden;
`
const Image = styled.div`
height:200px;
width:100%;
background-position:center;
background-repeat:no-repeat;
background-size:cover;
display:flex;
justify-content:end;
align-items:start;
`
const CheckPut = styled.div`
cursor:pointer;
border: 2px solid ${Colors.recommendedDark};
border-radius: 50%;
width:32px;
height:32px;
background-color:#f9f9f9;
overflow:hidden;
// position:relative;
display:flex;
align-items:center;
justify-content:center;
margin-right:10px;
margin-top:10px;
color:#f9f9f9;
`;

const NameHolder = styled.div`
    height:45px;
    display:flex;
    align-items:center;
    padding:12px 16px;
    font-weight:bold;
`
const CloseIconHolder = styled.div`
background: ${({ theme }) => theme.itemCardsBackground};
border-radius:50%;
cursor:pointer;
display:flex;
align-items:center;
justify-content:center;
margin-right:10px;
margin-top:10px;
width:auto;
height:auto;
`


const SelectFeaturedCard = ({ onChange, checked, itemImage, setSelected, itemName, itemId, handleCheck, index, state, removeItem }) => {
    const shorten = (str) => {
        return str.length > 20 ? str.substring(0, 18) + "..." : str;
    }


    const [isChecked, setIsChecked] = useState(undefined)
    useEffect(() => {
        if (checked && checked.length > 0 && checked.includes(itemId))
            setIsChecked(checked)
    }, [checked])

    var ITEM_IMAGE = itemImage.replace('root/dortzio/market/media/', '');
    return (
        <>{state == 'select-items' ?
            <Card className="col-6 col-sm-4 col-lg-3">
                <Inner>
                    <Image style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${ITEM_IMAGE}`)) }}>
                        <CheckPut style={{ backgroundColor: isChecked ? `${Colors.recommendedDark}` : `${Colors.gray0}`, borderColor: isChecked ? `${Colors.gray0}` : `${Colors.recommendedDark}` }} id={itemId} onClick={handleCheck}>{index}</CheckPut>
                    </Image>
                    <NameHolder>{shorten(itemName)}</NameHolder>
                </Inner>
            </Card>
            :
            state == 'review-items' ?
                <>
                    <Card className="col-6 col-sm-4 col-lg-3">
                        <Inner>
                            <Image style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${ITEM_IMAGE}`)) }}>
                                <CloseIconHolder onClick={removeItem}><CloseCircle id={itemId} /></CloseIconHolder>
                            </Image>
                            <NameHolder>{shorten(itemName)}</NameHolder>
                        </Inner>
                    </Card>
                </>
                :
                <LastCard className="">
                    <LastInner style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${ITEM_IMAGE}`)) }} />
                </LastCard>
        }
        </>
    );
}

export default SelectFeaturedCard;