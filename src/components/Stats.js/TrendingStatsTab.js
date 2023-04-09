import { Skeleton, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
import { categories } from "../../utils/Categories";
import { MARKET_API } from "../../utils/data/market_api";
import CollectionStatsCard from "../Cards/CollectionStatsCard";
import { Colors } from "../design/Colors";
import NoItemFound from "../NoItem";
import SSelection from "../Selection";
const Title = styled.div`
// width:150px;
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
const Selection = styled.div`
width:100%;
display: flex;
flex-direction: row;
align-items: center;
// cursor:pointer;
background: transparent;
justify-content:space-between;
border: 1px solid #D9D9D9;
border-radius: 24px;
overflow:hidden;
height:50px;
@media screen and (max-width: 769px) {
    font-size:14px;
}
`
const IconContainer = styled.div`
    cursor:pointer;
    border-left: 1px solid #D9D9D9;
    height:100%;
    &:hover{
        background-color: ${({ theme }) => theme.hoverIcon};
    }
`;


const TrendingStats = ({ theme }) => {
    const apiCall = useRef(undefined)
    const loadingSkeletons = ['1', '2', '3', '4', '5']
    const times = ['1H', '6H', '24H', '7D', '30D', 'ALL']
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const [fetchedCategories, setFetchedCategories] = useState([])
    const [trendingColls, setTrendingColls] = useState(undefined)
    const [topLoading, setTopLoading] = useState(true)
    const [trendingLoading, setTrendingLoading] = useState(true)
    const [value, setValue] = useState('trending');
    const [topColls, setTopColls] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const [timeSelect, setTimeSelect] = useState(undefined)
    const [categoryValue, setCategoryValue] = useState('All Categories')
    const [fromm, setFrom] = useState(undefined)
    const [too, setTo] = useState(undefined)
    const handleCategorySelect = (e) => {
        e.preventDefault()
        console.log(e.target.id)
        setCategoryValue(e.target.id)
        var this_time = parseInt(new Date(Date.now()).getTime())
        // var to = this_time / 1000;
        // var from = undefined;
        var to = too ? too : this_time / 1000
        var from = fromm ? fromm : undefined
        var cat = e.target.id
        getTrendings({ from, to, cat })

    }
    const handleTimeSelect = (e) => {
        var this_time = parseInt(new Date(Date.now()).getTime())
        var yesterday = parseInt(new Date(Date.now()).getTime() - (24 * 60 * 60 * 1000));
        var today = new Date()
        var last_week = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        var last_hour = new Date(this_time - (1000 * 60 * 60));
        var last_six_hours = new Date(this_time - (6 * 1000 * 60 * 60));
        var last_month = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
        var cat = categoryValue == 'All Categories' ? '' : categoryValue
        e.preventDefault()
        console.log(e.target.id)
        setTimeSelect(e.target.id)
        var from;
        var to;
        // var this_time;
        if (e.target.id == '1H') {
            from = last_hour / 1000;
            to = this_time / 1000;
            getTrendings({ from, to, cat })
        } else if (e.target.id == '6H') {
            from = last_six_hours / 1000;
            to = this_time / 1000;
            getTrendings({ from, to, cat })
        } else if (e.target.id == '24H') {
            from = yesterday / 1000;
            to = this_time / 1000;
            getTrendings({ from, to, cat })
        } else if (e.target.id == '7D') {
            from = last_week / 1000;
            to = this_time / 1000;
            getTrendings({ from, to, cat })
        } else if (e.target.id == '30D') {
            from = last_month / 1000;
            to = this_time / 1000;
            getTrendings({ from, to, cat })
        } else {
            to = this_time / 1000;
            from = undefined;
            getTrendings({ from, to, cat })
        }
        setFrom(from)
        setTo(to)
    }
    const getTrendings = async ({ from, to, cat }) => {
        setTrendingLoading(true)
        try {
            apiCall.current = MARKET_API.request({
                path: `/collection/trendings`,
                method: "post",
                body: { from: from ? from : null, to: to ? to : null, from_col: 0, to_col: 10, cat: cat },
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
        fetchCategories()
        var this_time = parseInt(new Date(Date.now()).getTime())
        var last_hour = new Date(this_time - (1000 * 60 * 60));
        var from = last_hour / 1000;
        var to = this_time / 1000;
        var cat = ''
        getTrendings({ from, to, cat })
        return () => {
            if (apiCall.current != undefined)
                apiCall.current.cancel();
        }
    }, [])
    useEffect(() => {
        if (trendingColls) {
            console.log(trendingColls)
            setTrendingLoading(false)
        }
    }, [trendingColls])
    useEffect(() => {
        if (topColls) {
            console.log(trendingColls)
            setTopLoading(false)
        }
    }, [topColls])
    const fetchCategories = async () => {
        let tempCatArr = []
        for (var c = 0; c < categories.length; c++) {
            tempCatArr.push(categories[c].title)
        }
        setFetchedCategories(tempCatArr)
    }


    return (
        <>
            <div className="d-flex flex-column justify-content-between align-items-center">
                <div className="d-flex w-100 justify-content-between align-items-center mb-5">
                    <div className="col-6  col-sm-5 col-lg-4 pe-2 d-flex justify-content-start">
                        <Selection className="d-none d-sm-flex">
                            {console.log(times)}
                            {times.map((time) => {
                                return <IconContainer onClick={handleTimeSelect} id={time} className="col-2 p-sm-2 text-center d-flex justify-content-center align-items-center" >{time}</IconContainer>
                            })}
                        </Selection>
                        <div className="w-100 d-flex d-sm-none">
                            <SSelection id={'stats-time-selection'} tabs={times} width={'100%'} handleSelect={handleTimeSelect} selectValue={timeSelect} theme={theme} />
                        </div>
                    </div>
                    <div className="col-6  col-sm-5 col-lg-4 ps-2 d-flex justify-content-end">
                        {fetchedCategories && fetchedCategories.length !== 0 ?
                            <SSelection id={'stats-category-selection'} tabs={fetchedCategories} width={'100%'} handleSelect={handleCategorySelect} selectValue={categoryValue} theme={theme} />
                            :
                            <SSelection id={'stats-category-selection'} theme={theme} width={'100%'} tabs={['no category']} />
                        }
                    </div>
                </div>

                <div className="d-flex flex-column w-100">
                    {trendingLoading ?
                        <>
                            {loadingSkeletons.map((l) => {
                                return <div className="px-1"> <Skeleton variant="rounded" height={80} sx={{ width: "100%", borderRadius: "24px", my: 1, }} /></div>

                            })}
                        </>
                        :
                        <>
                            {trendingColls.length == 0 ?
                                <NoItemFound text={'no collection found'} />
                                :
                                <>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <CollectionTitle>Collection</CollectionTitle>
                                        <Title style={{ width: "150px" }} className="justify-content-end justify-content-lg-start">Volume</Title>
                                        <Title style={{ width: "100px" }} className="d-none d-lg-flex">Change</Title>
                                        <Title style={{ width: "150px" }} className="d-none d-lg-flex">Floor Price</Title>
                                        <Title style={{ width: "100px" }} className="d-none d-lg-flex">Sales</Title>
                                        <Title style={{ width: "150px" }} className="d-none d-lg-flex">Unique Owners</Title>
                                        <Title style={{ width: "100px" }} className="d-none d-lg-flex">Items Listed</Title>
                                        <div className="d-none d-lg-flex" style={{ width: "20px" }} />
                                    </div>
                                    {trendingColls.map((collection, index) => {
                                        return <CollectionStatsCard collection={collection} theme={theme} index={index + 1} collectionFloor={collection.floor_price} collectionName={collection.title} collectionVolume={collection.volume} collectionLogo={collection.logo_path} />
                                    })}
                                </>}
                        </>

                    }
                </div>
            </div>
        </>
    );
}

export default TrendingStats;