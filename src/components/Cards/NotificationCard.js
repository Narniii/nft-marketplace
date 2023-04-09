import { useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MARKET_API } from "../../utils/data/market_api";
import { Colors } from "../design/Colors";

const UnseenDiv = styled.div`
    height:95px;
    background: ${({ theme }) => theme.collectionCardActive};
    box-shadow: ${({ theme }) => theme.boxShadow};
    border-radius: 24px;
    display:flex;
    flex-direction:row;
    justify-content:start;
    overflow:hidden;
    align-items:center;
    cursor:pointer;
    &:hover{
        box-shadow: ${({ theme }) => theme.hoverBoxShadow};
    }
`
const SeenDiv = styled.div`
    height:95px;
    background: ${({ theme }) => theme.itemCardsBackground};
    box-shadow: ${({ theme }) => theme.boxShadow};
    border-radius: 24px;
    display:flex;
    flex-direction:row;
    justify-content:start;
    overflow:hidden;
    align-items:center;
    &:hover{
        box-shadow: ${({ theme }) => theme.hoverBoxShadow};
    }

`
const Grreen = styled.div`
height:100%;
width:8px;
background-color:${Colors.successDark}
`
const Grray = styled.div`
height:100%;
width:8px;
background: ${({ theme }) => theme.addProPic};
`


const NotificationCard = ({ seen, event, urlWallet, urlId, userWallet, index }) => {
    const navigate = useNavigate()
    const [err, setErr] = useState(undefined)
    const apiCall = useRef(undefined)
    const seeNotif = async () => {
        try {
            apiCall.current = MARKET_API.request({
                path: `/notif/seen/`,
                method: "post",
                body: {
                    notif_index: index,
                    wallet_address: userWallet,
                    notif_data: event
                },
            });
            let response = await apiCall.current.promise;
            console.log('notification seeen??', response)
            if (!response.isSuccess)
                throw response
            navigate('/' + 'assets/ethereum/' + urlWallet + '/' + urlId)

        }
        catch (err) {
            console.log(err)
            if (err.status == 404) {
            }
            else if (err.status == 500) {
                setErr("Internal server error occured, please try again later.")
            }
        }

    }
    return (
        <>
            {seen ?
                <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'assets/ethereum/' + urlWallet + '/' + urlId}>
                    <SeenDiv className="my-2 pe-3">
                        <Grray className="me-3" />
                        {event == 'price_change' ?
                            <p className="m-0">
                                the price of an nft you offered on has changed
                            </p>
                            : event == 'item_sold' ?
                                <p className="m-0">
                                    one of your items has been sold
                                </p>
                                : event == 'auction_expiration' ?
                                    <p className="m-0">
                                        your nft auction has expired
                                    </p>
                                    : event == 'owner_item_updates' ?
                                        <p className="m-0">
                                            there's been an update on one of your owned items
                                        </p>
                                        : event == 'bid_activity' ?
                                            <p className="m-0">
                                                someone has placed a bid on your item
                                            </p>
                                            : event == 'outbid' ?
                                                <p className="m-0">
                                                    someone put a higher offer on an nft you have offered
                                                </p>
                                                :
                                                <p className="m-0">
                                                </p>
                        }
                    </SeenDiv>
                </Link>
                :
                <UnseenDiv className="my-2 pe-3" onClick={seeNotif}>
                    <Grreen className="me-3" />
                    {event == 'price_change' ?
                        <p className="m-0">
                            the price of an nft you offered on has changed
                        </p>
                        : event == 'item_sold' ?
                            <p className="m-0">
                                one of your items has been sold
                            </p>
                            : event == 'auction_expiration' ?
                                <p className="m-0">
                                    your nft auction has expired
                                </p>
                                : event == 'owner_item_updates' ?
                                    <p className="m-0">
                                        there's been an update on one of your owned items
                                    </p>
                                    : event == 'bid_activity' ?
                                        <p className="m-0">
                                            someone has placed a bid on your item
                                        </p>
                                        : event == 'outbid' ?
                                            <p className="m-0">
                                                someone put a higher offer on an nft you have offered
                                            </p>
                                            :
                                            <p className="m-0">
                                            </p>
                    }
                </UnseenDiv>
            }

        </>
    );
}

export default NotificationCard;