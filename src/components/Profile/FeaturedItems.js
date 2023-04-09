import { Skeleton, Typography } from "@mui/material";
import { Grid1, Grid2, Grid5, HambergerMenu } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MARKET_API } from "../../utils/data/market_api";
import ItemCard from "../Cards/ItemCard";
import { Colors } from "../design/Colors";
import NoItemFound from "../NoItem";

const Selection = styled.div`
display: flex;
flex-direction: row;
align-items: center;
cursor:pointer;
background: transparent;
justify-content:space-between;
border: 1px solid #D9D9D9;
border-radius: 24px;
overflow:hidden;
height:100%;
`;
const IconContainer = styled.div`
border-left: 1px solid #D9D9D9;
height:100%;
padding:18px;
&:hover{
    background-color: ${({ theme }) => theme.hoverIcon};
}
`;
const Scrollable = styled.div`
    // padding:20px 0;
    overflow-x:scroll;
    &::-webkit-scrollbar {
        width: 3px;
        height:5px;
        background:white;
        border-radius:20px !important;
    }
    &::-webkit-scrollbar-thumb {
        height:3px;
        background: ${Colors.primaryDark}; 
        border-radius: 10px;
    }
    &::-webkit-scrollbar-button{
        background:${Colors.primaryDark};
        width:3px;
        height:3px;
        border-radius:50%;
    }
    `;

const FeaturedItems = ({ theme, userWallet, tab }) => {
    console.log(tab)
    const [view, setView] = useState('m')
    const handleViewChange = (v) => {
        setView(v)
    }

    const apiCall = useRef(undefined)
    const [items, setItems] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [sections, setSections] = useState(undefined)


    useEffect(() => {
        if (tab == 'featured')
            fetchSections()
        return () => {
            if (apiCall.current != undefined)
                apiCall.current.cancel();

        }
    }, [tab])

    const fetchSections = async () => {
        try {
            apiCall.current = MARKET_API.request({
                path: `/featured/get/all/users`,
                method: "post",
                body: {
                    user_id: userWallet
                }
            })
            const response = await apiCall.current.promise;
            console.log(response)
            if (!response.isSuccess)
                throw response
            // setItems(response.data)
            setSections(response.data)
            // setLoading(false)
        }
        catch (err) {
            console.log(err)
            if (err.status == 404) {
                setSections([])
            }
            else if (err.status == 500) {
                console.log('error code 500')
                setErr("Internal server error")
            }
            // setLoading(false)
        }
    }
    useEffect(() => {
        if (sections)
            setLoading(false)
    }, [sections])

    return (
        <>
            <div className="d-flex flex-column">
                {/* <div className="d-flex justify-content-between align-items-center">
                    <h5 style={{ fontWeight: "bold" }}>Beans</h5>
                    <Selection className="d-flex">
                        <IconContainer className="text-center d-flex justify-content-center align-items-center" onClick={() => handleViewChange('xs')}><HambergerMenu size="20" /></IconContainer>
                        <IconContainer className="text-center d-flex justify-content-center align-items-center" onClick={() => handleViewChange('s')}><Grid1 size="20" /></IconContainer>
                        <IconContainer className="text-center d-flex justify-content-center align-items-center" onClick={() => handleViewChange('m')}><Grid2 size="20" /></IconContainer>
                        <IconContainer className="text-center d-flex justify-content-center align-items-center" onClick={() => handleViewChange('l')}><Grid5 size="20" /></IconContainer>
                    </Selection>
                </div> */}
                <div className="d-flex flex-wrap">
                    {loading ?
                        <>
                            <div className="col-12 col-sm-6 col-md-3 p-1">
                                <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                            </div>
                            <div className="d-none d-sm-block col-12 col-sm-6 col-md-3 p-1">
                                <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                            </div>
                            <div className="d-none d-md-block col-12 col-sm-6 col-md-3 p-1">
                                <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                            </div>
                            <div className="d-none d-md-block col-12 col-sm-6 col-md-3 p-1">
                                <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                            </div>
                        </>
                        :
                        <>
                            {sections.length == 0 ?
                                <NoItemFound text={'no section found'} />
                                :
                                <>
                                    {sections.map((section) => {
                                        return (
                                            <div className="d-flex flex-column w-100">
                                                <Typography sx={{ fontWeight: 600 }}>{section.title}</Typography>
                                                <Typography>{section.description !== ' ' ? section.description : undefined}</Typography>
                                                {/* <div className="row p-0 w-100"> */}
                                                <Scrollable className="d-flex p-0 w-100 mb-5">
                                                    {section.nfts.map((item) => {
                                                        return <ItemCard item={item} slider={false} view={'s'} itemImage={item.nft_image_path} itemID={item._id.$oid} theme={theme} name={item.title} price={item.price} creator={item.creator} />
                                                    })}
                                                </Scrollable>
                                                {/* </div> */}
                                            </div>)
                                    })}
                                </>
                            }
                        </>
                    }
                </div>

            </div>
        </>
    );
}

export default FeaturedItems;