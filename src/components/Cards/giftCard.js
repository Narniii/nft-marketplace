import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { API_CONFIG } from "../../config";
import { addItem } from "../../redux/actions";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { AddToCartButton, ButtonMedium, ButtonXSmall } from "../design/Buttons";
import TickPic from '../../assets/tick.svg'
import { Box, CircularProgress, Modal, Skeleton } from "@mui/material";
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
background:${Colors.gradientPurpleStandard};
`
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

const GiftCard = ({ theme, price, priceUnit }) => {
    const globalUser = useSelector(state => state.userReducer);
    const [payLoading, setPayLoading] = useState(false)
    const [payDone, setPayDone] = useState(false)
    const [addData, setAddData] = useState(true)

    const handleClose = () => {
        setPayLoading(false)
        setAddData(true)
        setPayDone(false)
    }
    return (
        <div className="col-12 col-sm-6 col-lg-4 p-0">
            <Card className=" align-items-center align-self-center" >
                <InnerDiv>
                    <Image />
                    <CreatorHolder className="px-3 mb-3 w-100  align-self-center align-items-end justify-content-center" style={{ height: "30px", fontWeight: 500 }}>
                        {payLoading ?
                            <CircularProgress sx={{ color: "#9951F4" }} size={'15px'} />
                            :
                            <>
                                <p className="m-0">{price}</p><PriceUnit>{priceUnit}</PriceUnit>
                            </>
                        }
                    </CreatorHolder>
                    <AddButtonHolder className="w-100 p-0 align-self-center align-items-end">
                        {payLoading ?
                            <AddToCartButton onClick={() => setPayLoading(true)}><CircularProgress sx={{ color: "white" }} size={'15px'} /></AddToCartButton>
                            :
                            <AddToCartButton onClick={() => setPayLoading(true)}>Mint</AddToCartButton>
                        }
                    </AddButtonHolder>
                </InnerDiv>
            </Card>

            <Modal
                open={payLoading}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                // inputProps={{MenuProps: {disableScrollLock: true}}}
                disableScrollLock={true}
            >
                <Box
                    sx={{ width: "300px", height: '300px', display: 'flex', flexDirection: 'column', justifyContent: "space-between", alignItems: 'center', backgroundColor: "white", margin: '100px auto' }}>
                    {addData ?
                        <div style={{ width: "100%", height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                            ثبت اطلاعات
                        </div>
                        :
                        <div style={{ width: "100%", height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                            درگاه پرداخت
                        </div>
                    }

                    {payDone ?
                        <div style={{ color: Colors.successDark }}>
                            پرداخت شد
                        </div>
                        :
                        <div>
                        </div>
                    }

                    {addData ?
                        <ButtonXSmall style={{ width: "100px", marginBottom: '10px' }} onClick={() => setAddData(false)}>done</ButtonXSmall>
                        :
                        <>
                            {payDone ?
                                <ButtonXSmall style={{ width: "100px", marginBottom: '10px' }} onClick={handleClose}>back</ButtonXSmall>
                                :
                                <ButtonXSmall style={{ width: "100px", marginBottom: '10px' }} onClick={() => setPayDone(true)}>done</ButtonXSmall>
                            }
                        </>
                    }
                </Box>
            </Modal>
        </div>

    );
}

export default GiftCard;

