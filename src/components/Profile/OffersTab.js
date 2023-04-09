import { Skeleton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { MARKET_API } from "../../utils/data/market_api";
import { ButtonLarge, ButtonOutline } from "../design/Buttons";
import NoItemFound from "../NoItem";
import OfferCard from "./OfferCard";

const Contnr = styled.div`
width:60%;
@media screen and (max-width: 992px) {
    width: 90%;
};
@media screen and (max-width: 575px) {
    width: 100%;
};
`

const OffersTab = () => {
    const navigate = useNavigate()
    const globalUser = useSelector(state => state.userReducer)
    const [collections, setCollections] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const [successMessage, setSuccessMesssage] = useState(undefined)
    const apiCall = useRef(undefined)

    const [floorBody, setFloorBody] = useState({})
    useEffect(() => {
        getUserCollections()
    }, [])
    const getUserCollections = async () => {
        try {
            apiCall.current = MARKET_API.request({
                path: `/collection/user/`,
                method: "post",
                body: {
                    wallet_address: globalUser.walletAddress
                }
            })
            const response = await apiCall.current.promise;
            if (!response.isSuccess)
                throw response
            setCollections(response.data)
            // setLoading(false)
        }
        catch (err) {
            console.log(err)
            if (err.status == 404) {
                setCollections([])
            }
            else if (err.status == 500) {
                setErr("Internal server error")
            }
            // setLoading(false)
        }

    }
    const UpdateFloorOffer = async () => {
        try {
            apiCall.current = MARKET_API.request({
                path: `/collection/edit/offer-floor-price`,
                method: "post",
                body: floorBody
            })
            const response = await apiCall.current.promise;
            if (!response.isSuccess)
                throw response
            setSuccessMesssage('updated successfully')
        }
        catch (err) {
            console.log(err)
            if (err.status == 404) {
            }
            else if (err.status == 500) {
                setErr("Internal server error")
            }
        }
    }
    return (
        <>
            <div className="col-12 col-sm-9 col-md-8">
                <div className="d-flex flex-column ">
                    <p>Set a minimum offer for collections to ignore low offers</p>
                    <ButtonOutline onClick={() => { navigate('/' + 'profile/' + globalUser.username + '/#more') }} className="my-4">View My Offers</ButtonOutline>
                    {collections ?
                        <>
                            {collections.length > 0 ?
                                <>
                                    {collections.map((collection) => {
                                        return <OfferCard setFloorBody={setFloorBody} collection={collection} />
                                    })}
                                </> :
                                <NoItemFound text={'you have no collection yet'} />
                            }
                        </>
                        :
                        <>
                            <Skeleton variant="round" sx={{ width: "100%", height: 130, borderRadius: "24px", my: 1 }} />
                            <Skeleton variant="round" sx={{ width: "100%", height: 130, borderRadius: "24px", my: 1 }} />
                            <Skeleton variant="round" sx={{ width: "100%", height: 130, borderRadius: "24px", my: 1 }} />
                        </>}
                    <div className="my-5"><ButtonLarge onClick={UpdateFloorOffer}>Save</ButtonLarge></div>
                </div>
            </div>
        </>
    );
}

export default OffersTab;