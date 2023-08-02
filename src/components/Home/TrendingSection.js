import styled from "styled-components";
import CollectionCard from "../Cards/CollectionListingCard";
import { TestColls } from "../../utils/testCollections";
import { useEffect, useRef, useState } from "react";
import { CircularProgress, FormControl, FormHelperText, Menu, MenuItem, Select, Skeleton } from "@mui/material";
import { Colors } from "../design/Colors";
import { ArrowDown2 } from "iconsax-react";
import '../../styles.css'
import { Tab, Tabs } from "react-bootstrap";
import { SelectionC } from "../test";
import SSelection from "../Selection";
import { Link } from "react-router-dom";
import '../../styles.css'
import { MARKET_API } from "../../utils/data/market_api";
import EmptyListingCard from "../Cards/EmptyCollectionListingCard";

const SectionContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    margin-top:100px;
    // padding:0 32px;
    // height:80vh;
    @media screen and (max-width: 992px) {
        margin-top:54px;
    }

`;
const TitlesContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.trendingSectionSubTitles};
    // padding : 0 8px;
    font-size:14px;
    @media screen and (max-width: 600px) {
        // padding-right:0;
        margin-bottom:10px;
    }
`;
const Selection = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    // gap: 24px;
    width: 160px;
    // height: 50px;
    cursor:pointer;
    background: transparent;
    justify-content:space-between;
    border: 1px solid #D9D9D9;
    border-radius: 24px;
    flex: none;
    order: 1;
    flex-grow: 0;
`;
const Title = styled.div`
    color: ${({ theme }) => theme.trendingSectionTitles};
    cursor:pointer;
    &:active{
        color: ${({ theme }) => theme.trendingSectionTitlesActive};
        // text-decoration:underline;
    }
`;
const conditionalStyles = {
    titles: {
        color: 'theme' == 'light' ? Colors.gray7 : Colors.gray1
    }
};
// const useStyles = makeStyles({
//     select: {
//         border: '1px solid #D9D9D9',
//         borderRadius: '24px !important',

//         "& ul": {
//             borderRadius: '24px !important',
//         },
//         "& li": {
//         },
//     },
// });


const TrendingSection = ({ theme }) => {
    const [trendingColls, setTrendingColls] = useState(undefined)
    const [topLoading, setTopLoading] = useState(true)
    const [trendingLoading, setTrendingLoading] = useState(true)
    const [value, setValue] = useState('trending');
    const [topColls, setTopColls] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const [timeSelect, setTimeSelect] = useState('ALL')
    // const [from, setFrom] = useState(undefined)
    // const [to, setTo] = useState(undefined)
    // const classes = useStyles();
    const loadingSkeletons = ['1', '2', '3', '4', '5']
    const tabs = ['1H', '6H', '24H', '7D', '30D', 'ALL']
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };




    const handleTimeSelect = (e) => {
        var this_time = parseInt(new Date(Date.now()).getTime())
        var yesterday = parseInt(new Date(Date.now()).getTime() - (24 * 60 * 60 * 1000));
        var today = new Date()
        var last_week = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        var last_hour = new Date(this_time - (1000 * 60 * 60));
        var last_six_hours = new Date(this_time - (6 * 1000 * 60 * 60));
        var last_month = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);



        // for testing if the timestamps are correct ===>

        // var difference = Math.abs(this_time - last_six_hours) / 1000
        // var days = Math.floor(difference / 86400);
        // var hours = Math.floor(difference / 3600) % 24;
        // console.log('day difference', days)
        // console.log('hour difference', hours)




        e.preventDefault()
        console.log(e.target.id)
        setTimeSelect(e.target.id)
        var from;
        var to;
        // var this_time;
        if (e.target.id == '1H') {
            from = last_hour / 1000;
            to = this_time / 1000;
            getTops({ from, to })
            getTrendings({ from, to })
        } else if (e.target.id == '6H') {
            from = last_six_hours / 1000;
            to = this_time / 1000;
            getTops({ from, to })
            getTrendings({ from, to })
        } else if (e.target.id == '24H') {
            from = yesterday / 1000;
            to = this_time / 1000;
            getTops({ from, to })
            getTrendings({ from, to })
        } else if (e.target.id == '7D') {
            from = last_week / 1000;
            to = this_time / 1000;
            getTops({ from, to })
            getTrendings({ from, to })
        } else if (e.target.id == '30D') {
            from = last_month / 1000;
            to = this_time / 1000;
            getTops({ from, to })
            getTrendings({ from, to })
        } else {
            to = this_time / 1000;
            from = undefined;
            getTops({ from, to })
            getTrendings({ from, to })
        }
    }

    useEffect(() => {
        if (trendingColls) {
            console.log(trendingColls)
            setTrendingLoading(false)
        }
    }, [trendingColls])
    useEffect(() => {
        if (topColls) {
            console.log(topColls)
            setTopLoading(false)
        }
    }, [topColls])

    const apiCall = useRef(undefined)

    const getTops = async ({ from, to }) => {
        // console.log(from, to)
        setTopLoading(true)
        try {
            apiCall.current = MARKET_API.request({
                path: `/collection/trendings`,
                method: "post",
                body: { from: from ? from : null, to: to ? to : null, from_col: 0, to_col: 10, cat: '' },
            });
            const response = await apiCall.current.promise;
            console.log('reeesp top', response)

            if (!response.isSuccess)
                throw response
            if (response.data.length > 10) {
                setTopColls(response.data.slice(0, 10))
            }
            else setTopColls(response.data)
            // setTopLoading(false)
        }
        catch (err) {
            console.log('top err', err)
            if (err.status == 404) {
                setTopColls([])
            }
            else if (err.status == 500) {
                setErr("Internal server error occured, please try again later.")
            }
        }
    }
    const getTrendings = async ({ from, to }) => {
        setTrendingLoading(true)
        try {
            apiCall.current = MARKET_API.request({
                path: `/collection/trendings`,
                method: "post",
                body: { from: from ? from : null, to: to ? to : null, from_col: 0, to_col: 10, cat: '' },
            });
            let response = await apiCall.current.promise;
            console.log('reeesp', response)
            if (!response.isSuccess)
                throw response
            setTrendingColls(response.data)
        }
        catch (err) {
            console.log('trending err', err)

            if (err.status == 404) {
                setTrendingColls([])
            }
            else if (err.status == 500) {
                setErr("Internal server error occured, please try again later.")
            }
            // else {
            //     setErr('something went wrong , please try again later')
            // }
        }
    }
    useEffect(() => {
        var this_time = parseInt(new Date(Date.now()).getTime())
        // var last_hour = new Date(this_time - (1000 * 60 * 60));
        // var from = last_hour / 1000;
        var from = undefined;
        var to = this_time / 1000;
        getTops({ from, to })
        getTrendings({ from, to })
        // getTops()
        // getTrendings()
        return () => {
            if (apiCall.current != undefined)
                apiCall.current.cancel();
        }
    }, [])


    return (

        <>
            <SectionContainer className="pdng">
                <div style={{ transform: 'translateY(75%)' }} className="d-none d-sm-flex col-sm-6 justify-content-end justify-self-end align-self-end">
                    <SSelection id={'trending-landing'} width={'200px'} theme={theme} tabs={tabs} handleSelect={handleTimeSelect} selectValue={timeSelect} />
                </div>

                <div className="d-flex p-0 flex-column col-12">
                    <Tabs
                        defaultActiveKey="Trending"
                        className="mb-5"
                        style={{ borderBottom: "none", color: theme === 'light' ? "#5D3393" : "#DABDDF", borderColor: theme === 'light' ? "#5D3393" : "#DABDDF" }}

                    >
                        <Tab eventKey="Trending" title="Trending">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex flex-column p-0 col-12 col-lg-6 justify-content-center p-0 pe-lg-4">
                                    <TitlesContainer>
                                        <div style={{
                                            display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                                            width: "50%"
                                        }}>
                                            Collection</div>
                                        <div className="d-flex d-sm-none" style={{
                                            display: "flex", flexDirection: "row", justifyContent: "end", alignItems: "center",
                                            width: "50%"
                                        }}>
                                            <SSelection id={'trending-landing-mobile'} width={'100px'} theme={theme} tabs={tabs} handleSelect={handleTimeSelect} selectValue={timeSelect} />
                                        </div>
                                        <div className="d-none d-sm-flex" style={{
                                            display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                                            width: "150px"
                                        }}>
                                            Floor Price</div>
                                        <div className="d-none d-sm-flex" style={{
                                            display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                                            width: "150px"
                                        }}>
                                            Volume</div>
                                    </TitlesContainer>
                                    {trendingLoading ?
                                        <>
                                            {loadingSkeletons.map((l) => {
                                                return <Skeleton variant="rounded" height={80} sx={{ width: "100%", borderRadius: "24px", my: 1, }} />

                                            })}
                                        </> :
                                        <>
                                            {trendingColls.length < 5 ?
                                                <>
                                                    {trendingColls.slice(0, trendingColls.length).map((collection, index) => {
                                                        return <CollectionCard key={collection._id.$oid} collection={collection} theme={theme} index={index + 1} collectionFloor={collection.floor_price} collectionName={collection.title} collectionVolume={collection.volume} collectionLogo={collection.logo_path} />
                                                    })}
                                                    {loadingSkeletons.slice(0, (5 - trendingColls.length)).map((l) => {
                                                        return <EmptyListingCard variant="rounded" height={80} sx={{ width: "100%", borderRadius: "24px", my: 1, }} />
                                                    })}
                                                </>
                                                :
                                                <>
                                                    {trendingColls.slice(0, 5).map((collection, index) => {
                                                        return <CollectionCard key={collection._id.$oid} collection={collection} theme={theme} index={index + 1} collectionFloor={collection.floor_price} collectionName={collection.title} collectionVolume={collection.volume} collectionLogo={collection.logo_path} />
                                                    })}
                                                </>
                                            }
                                        </>
                                    }
                                </div>
                                <div className="d-none d-lg-flex flex-column p-0 col-12 col-lg-6 justify-content-center">
                                    <TitlesContainer>
                                        <div style={{
                                            display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                                            width: "50%"
                                        }}>
                                            Collection</div>
                                        <div className="d-none d-sm-flex" style={{
                                            display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                                            width: "150px"
                                        }}>
                                            Floor Price</div>
                                        <div className="d-none d-sm-flex" style={{
                                            display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                                            width: "150px"
                                        }}>
                                            Volume</div>
                                    </TitlesContainer>
                                    {trendingLoading ?
                                        <>
                                            {loadingSkeletons.map((l) => {
                                                return <Skeleton variant="rounded" height={80} sx={{ width: "100%", borderRadius: "24px", my: 1, }} />

                                            })}
                                        </>
                                        :
                                        <>
                                            {
                                                trendingColls.length >= 10 ?
                                                    <>
                                                        {trendingColls.slice(5, 10).map((collection, index) => {
                                                            return <CollectionCard key={collection._id.$oid} collection={collection} theme={theme} index={index + 6} collectionFloor={collection.floor_price} collectionName={collection.title} collectionVolume={collection.volume} collectionLogo={collection.logo_path} />
                                                        })}
                                                    </>
                                                    : 5 < trendingColls.length < 10 ?
                                                        <>
                                                            {trendingColls.slice(5, trendingColls.length).map((collection, index) => {
                                                                return <CollectionCard key={collection._id.$oid} collection={collection} theme={theme} index={index + 6} collectionFloor={collection.floor_price} collectionName={collection.title} collectionVolume={collection.volume} collectionLogo={collection.logo_path} />
                                                            })}
                                                            {loadingSkeletons.slice(0, (10 - trendingColls.length)).map((l) => {
                                                                return <EmptyListingCard variant="rounded" height={80} sx={{ width: "100%", borderRadius: "24px", my: 1, }} />

                                                            })}
                                                        </>
                                                        :
                                                        <>
                                                            {loadingSkeletons.map((l) => {
                                                                return <EmptyListingCard variant="rounded" height={80} sx={{ width: "100%", borderRadius: "24px", my: 1, }} />

                                                            })}
                                                        </>
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        </Tab>

                        <Tab eventKey="Top" title="Top">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex flex-column p-0 col-12 col-lg-6 justify-content-center p-0 pe-lg-4">
                                    <TitlesContainer>
                                        <div style={{
                                            display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                                            width: "50%"
                                        }}>
                                            Collection</div>
                                        <div className="d-flex d-sm-none" style={{
                                            display: "flex", flexDirection: "row", justifyContent: "end", alignItems: "center",
                                            width: "50%"
                                        }}>
                                            <SSelection id={'top-landing-mobile'} width={'100px'} theme={theme} tabs={tabs} handleSelect={handleTimeSelect} selectValue={timeSelect} />
                                        </div>
                                        <div className="d-none d-sm-flex" style={{
                                            display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                                            // border: "1px solid blue",
                                            width: "150px"
                                        }}>
                                            Floor Price</div>
                                        <div className="d-none d-sm-flex" style={{
                                            display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                                            width: "150px"
                                        }}>
                                            Volume</div>
                                    </TitlesContainer>
                                    {topLoading ?
                                        <>
                                            {loadingSkeletons.map((l) => {
                                                return <Skeleton variant="rounded" height={80} sx={{ width: "100%", borderRadius: "24px", my: 1, }} />

                                            })}
                                        </> :
                                        <>
                                            {topColls.length < 5 ?
                                                <>
                                                    {topColls.slice(0, topColls.length).map((collection, index) => {
                                                        return <CollectionCard key={collection._id.$oid} collection={collection} theme={theme} index={index + 1} collectionFloor={collection.floor_price} collectionName={collection.title} collectionVolume={collection.volume} collectionLogo={collection.logo_path} />
                                                    })}
                                                    {loadingSkeletons.slice(0, (5 - topColls.length)).map((l) => {
                                                        return <EmptyListingCard variant="rounded" height={80} sx={{ width: "100%", borderRadius: "24px", my: 1, }} />

                                                    })}
                                                </>
                                                :
                                                <>
                                                    {topColls.slice(0, 5).map((collection, index) => {
                                                        return <CollectionCard key={collection._id.$oid} collection={collection} theme={theme} index={index + 1} collectionFloor={collection.floor_price} collectionName={collection.title} collectionVolume={collection.volume} collectionLogo={collection.logo_path} />
                                                    })}
                                                </>
                                            }
                                        </>
                                    }
                                </div>
                                <div className="d-none d-lg-flex flex-column p-0 col-12 col-lg-6 justify-content-center"
                                >
                                    <TitlesContainer>
                                        <div style={{
                                            display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                                            width: "50%"
                                        }}>
                                            Collection</div>
                                        <div className="d-none d-sm-flex" style={{
                                            display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                                            width: "150px"
                                        }}>
                                            Floor Price</div>
                                        <div className="d-none d-sm-flex" style={{
                                            display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                                            width: "150px"
                                        }}>
                                            Volume</div>
                                    </TitlesContainer>
                                    {topLoading ?
                                        <>
                                            {loadingSkeletons.map((l) => {
                                                return <Skeleton variant="rounded" height={80} sx={{ width: "100%", borderRadius: "24px", my: 1, }} />

                                            })}
                                        </>
                                        :
                                        <>
                                            {
                                                topColls.length >= 10 ?
                                                    <>
                                                        {topColls.slice(5, 10).map((collection, index) => {
                                                            return <CollectionCard key={collection._id.$oid} collection={collection} theme={theme} index={index + 6} collectionFloor={collection.floor_price} collectionName={collection.title} collectionVolume={collection.volume} collectionLogo={collection.logo_path} />
                                                        })}
                                                    </>
                                                    : 5 < topColls.length < 10 ?
                                                        <>
                                                            {topColls.slice(5, topColls.length).map((collection, index) => {
                                                                return <CollectionCard key={collection._id.$oid} collection={collection} theme={theme} index={index + 6} collectionFloor={collection.floor_price} collectionName={collection.title} collectionVolume={collection.volume} collectionLogo={collection.logo_path} />
                                                            })}
                                                            {loadingSkeletons.slice(0, (10 - topColls.length)).map((l) => {
                                                                return <EmptyListingCard variant="rounded" height={80} sx={{ width: "100%", borderRadius: "24px", my: 1, }} />

                                                            })}
                                                        </>
                                                        :
                                                        <>
                                                            {loadingSkeletons.map((l) => {
                                                                return <EmptyListingCard variant="rounded" height={80} sx={{ width: "100%", borderRadius: "24px", my: 1, }} />

                                                            })}
                                                        </>
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        </Tab>


                    </Tabs>
                </div>

                <Link to="explore" style={{ textDecoration: "none", color: "inherit" }}>
                    <div style={{ cursor: "pointer" }} className="align-self-center text-center p-3"
                    >
                        View All
                        <br />
                        <div style={{ width: "auto", padding: "0" }}><ArrowDown2 /></div>
                    </div>
                </Link>
            </SectionContainer >
        </>
    );
}

export default TrendingSection;