import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import ItemCard from "../Cards/ItemCard";
import { TestColls } from "../../utils/testCollections";
import noItemBG from '../../assets/noItem.svg'
import styled from "styled-components";
import { Colors } from "../design/Colors";
const NoItem = styled.div`
    background-image: url(${noItemBG});
    background-size:contain;
    background-repeat:no-repeat;
    background-position:center;
    border-radius:24px;
    background-color:${({theme})=>theme.collectionCardHover};
    height:300px;
    width:300px;
`;
const BG = styled.div`
    border-radius:24px;
    background-color:${({theme})=>theme.collectionCardHover};
    height:500px;
    width:100%;
`;
const Pp = styled.p`
color:${Colors.gray4};
text-transform: capitalize;
`

const FavoritedTab = ({ theme }) => {
    const [view, setView] = useState('m')
    const handleViewChange = (v) => {
        setView(v)
    }

    const [trendingColls, setTrendingColls] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [openFilter, setOpenFilter] = useState(false)
    useEffect(() => {
        setTrendingColls(TestColls.collections)
    }, [TestColls])
    useEffect(() => {
        if (trendingColls) {
            console.log(trendingColls)
            setLoading(false)
        }
    }, [trendingColls])

    return (<>
        {loading ? <CircularProgress /> :
            <>
                {trendingColls.length == 0 ?
                    <BG className="d-flex flex-column p-0 justify-content-center align-items-center mb-5">
                        <NoItem />
                        <Pp>there are no items favorited</Pp>
                    </BG> :
                    <div className="row justify-content-between">
                        <ItemCard view={'view'} theme={theme} name={trendingColls[0].collection_name} price={trendingColls[0].floor_price} creator={trendingColls[0].creator} />
                        <ItemCard view={'view'} theme={theme} name={trendingColls[1].collection_name} price={trendingColls[1].floor_price} creator={trendingColls[1].creator} />
                        <ItemCard view={'view'} theme={theme} name={trendingColls[2].collection_name} price={trendingColls[2].floor_price} creator={trendingColls[2].creator} />
                        <ItemCard view={'view'} theme={theme} name={trendingColls[3].collection_name} price={trendingColls[3].floor_price} creator={trendingColls[3].creator} />
                        <ItemCard view={'view'} theme={theme} name={trendingColls[0].collection_name} price={trendingColls[0].floor_price} creator={trendingColls[0].creator} />
                        <ItemCard view={'view'} theme={theme} name={trendingColls[1].collection_name} price={trendingColls[1].floor_price} creator={trendingColls[1].creator} />
                        <ItemCard view={'view'} theme={theme} name={trendingColls[2].collection_name} price={trendingColls[2].floor_price} creator={trendingColls[2].creator} />
                        <ItemCard view={'view'} theme={theme} name={trendingColls[3].collection_name} price={trendingColls[3].floor_price} creator={trendingColls[3].creator} />
                        <ItemCard view={'view'} theme={theme} name={trendingColls[0].collection_name} price={trendingColls[0].floor_price} creator={trendingColls[0].creator} />
                        <ItemCard view={'view'} theme={theme} name={trendingColls[1].collection_name} price={trendingColls[1].floor_price} creator={trendingColls[1].creator} />
                        <ItemCard view={'view'} theme={theme} name={trendingColls[2].collection_name} price={trendingColls[2].floor_price} creator={trendingColls[2].creator} />
                        <ItemCard view={'view'} theme={theme} name={trendingColls[3].collection_name} price={trendingColls[3].floor_price} creator={trendingColls[3].creator} />
                    </div>
                }</>
        }
    </>
    );
}

export default FavoritedTab;