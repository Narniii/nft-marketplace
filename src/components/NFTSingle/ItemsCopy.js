import { ArrowDown2, ArrowSquareRight, ArrowSwapVertical, BagTick, CloseSquare, DocumentDownload, FilterSearch, Grid1, Grid2, Grid5, HambergerMenu, Logout, Refresh2 } from "iconsax-react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Colors } from "../design/Colors";
import '../../styles.css'
import NoItemFound from "../NoItem";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { API_CONFIG } from "../../config";


const ItemsContainerDesktop = styled.div`
    display: flex;
    height:350px;
    flex-direction: column;
    width:100%;
    overflow-y:scroll;
    scrollbar-width: 5px;
    // -ms-overflow-style: none;
    &::-webkit-scrollbar {
        height: 7px;
        width: 7px;
        background:white;
        border:0.5px solid #D9D9D9;
        border-radius:20px !important;
    }
    &::-webkit-scrollbar-thumb {
        height:5px;
        width:5px;
        // width:10px !important;
        background: ${Colors.primaryDark}; 
        border-radius: 20px;
    }
    &::-webkit-scrollbar-button{
        // background:${Colors.primaryDark};
        // width:3px;
        // content : ${<ArrowDown2 size="10" color="purple" />}
        display:none;
    }
`;
const Recommend = styled.span`
    color: ${Colors.recommendedDark};
    display:flex;
    align-items:center;
    // font-size:12px;
    @media screen and (max-width: 768px) {
        font-size:14px;
    }

`
const ItemCard = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
padding:5px 16px;
&:hover{
    background-color: ${({ theme }) => theme.nftActivityHover};
}
`
const ItemImage = styled.div`
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;
    height:45px;
    width:45px;
    border-radius:8px;
    margin-right:10px;
`;

const ItemsCopy = ({ nft }) => {
    const [copies, setCopies] = useState(undefined)
    useEffect(() => {
        var copysTemp = []
        if (nft && nft.copies) {
            for (var c = 0; c < nft.copies; c++) {
                copysTemp.push(nft)
            }
        }
        setCopies(copysTemp)

    }, [nft, nft.copies])
    const shorten = (str) => {
        if (str)
            return str.length > 15 ? str.substring(0, 15) + "..." : str;
        return 'undefined'
    }

    return (<ItemsContainerDesktop>
        {copies ?
            <>
                {copies.length > 0 ?
                    <>
                        {copies.map((copy, index) => {
                            return <ItemCard><div className="d-flex"><ItemImage style={{ backgroundImage: BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${copy.nft_image_path.replace('root/dortzio/market/media/', '')}`)) }} />
                                <div className="d-flex flex-column"><Recommend>{copy.title}&nbsp;#{index + 1}</Recommend><p className="m-0">{shorten(copy.description)} </p></div></div><span style={{ fontWeight: "bold", textTransform: "lowercase", letterSpacing: '0.005em' }}>x 1</span></ItemCard>
                        })}
                    </> :
                    <NoItemFound text={'no copies'} />
                }
            </>
            :
            <>
                {console.log('inja?')}
                <NoItemFound text={'no copies'} />
            </>
        }
    </ItemsContainerDesktop>);
}

export default ItemsCopy;