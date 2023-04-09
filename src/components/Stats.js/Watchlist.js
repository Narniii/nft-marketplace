import { Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { MARKET_API } from "../../utils/data/market_api";
import CollectionCard from "../Cards/CollectionListingCard";
import CollectionStatsCard from "../Cards/CollectionStatsCard";
import { ButtonLarge } from "../design/Buttons";
import { Colors } from "../design/Colors";
import NoItemFound from "../NoItem";
import WalletConnectModal from "../wallet/WalletConnectModal";
const Title = styled.div`
width:150px;
color: ${({ theme }) => theme.par};
display:flex;
align-items:center;

`
const CollectionTitle = styled.div`
width:300px;
color: ${({ theme }) => theme.par};
display:flex;
align-items:center;
`

const WatchListTab = ({ theme }) => {
    const apiCall = useRef(undefined)
    const globalUser = useSelector(state => state.userReducer);
    const [watchlist, setWatchlist] = useState([])
    const [err, setErr] = useState(undefined)
    const [walletConnect, setWalletConnect] = useState(false)

    const { active, account, library, connector, activate, deactivate } = useWeb3React()


    const getUserWatchList = async () => {
        try {
            apiCall.current = MARKET_API.request({
                path: `/watchlist/get/`,
                method: "post",
                body: { user_id: globalUser.userId },
            });
            let response = await apiCall.current.promise;
            console.log('watchlist????', response)
            if (!response.isSuccess)
                throw response
            setWatchlist(response.data)
        }
        catch (err) {
            if (err.status == 404) {
                setWatchlist([])
            }
            else if (err.status == 500) {
                setErr("Internal server error occured, please try again later.")
            }
        }
    }
    useEffect(() => {
        if (globalUser.isLoggedIn)
            getUserWatchList()
    }, [globalUser])
    useEffect(() => {
        return () => {
            if (apiCall.current != undefined)
                apiCall.current.cancel();
        }
    }, [])

    return (
        <div className="row flex-wrap p-0 mt-4">
            {active && globalUser.isLoggedIn ?
                <>
                    {watchlist.length == 0 ?
                        <>
                            <NoItemFound text={'no collection found'} />
                        </> :
                        <>
                            <div className="d-flex justify-content-between align-items-center">
                                <CollectionTitle>Collection</CollectionTitle>
                                <Title className="justify-content-end justify-content-lg-start">Volume</Title>
                                <Title style={{ width: "100px" }} className="d-none d-lg-flex">Change</Title>
                                <Title className="d-none d-lg-flex">Floor Price</Title>
                                <Title style={{ width: "100px" }} className="d-none d-lg-flex">Sales</Title>
                                <Title className="d-none d-lg-flex">Unique Owners</Title>
                                <Title className="d-none d-lg-flex">Items Listed</Title>
                            </div>
                            {watchlist.map((collection, index) => {
                                return <CollectionStatsCard watchlistTab={true} collection={collection} theme={theme} index={index + 1} collectionFloor={collection.floor_price} collectionName={collection.title} collectionVolume={collection.volume} collectionLogo={collection.logo_path} />
                            })}
                        </>}
                </>
                :
                <>
                    <div className="d-flex my-5 justify-content-center align-items-center">
                        <ButtonLarge onClick={() => { setWalletConnect(!walletConnect) }}>connect wallet</ButtonLarge>
                        <WalletConnectModal open={walletConnect} handleClose={() => setWalletConnect(false)} theme={theme} />
                    </div>
                </>
            }
        </div>

    );
}

export default WatchListTab;