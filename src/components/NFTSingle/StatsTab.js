import styled from "styled-components";
import { Colors } from "../design/Colors";
import NoItemFound from "../NoItem";
const TT = styled.p`
margin:0;
color:${({ theme }) => theme.trendingSectionSubTitles};
@media screen and (max-width: 768px) {
    font-size:14px;
}

`
const ItemsContainerDesktop = styled.div`
    display: flex;
    flex-direction: column;
    width:100%;
    // height:150px;
    // overflow-y:scroll;
    scrollbar-width: 5px;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        height: 7px;
        width: 7px;
        background:white;
        border:0.5px solid #D9D9D9;
        border-radius:20px !important;
        display:none;

    }
    &::-webkit-scrollbar-thumb {
        height:5px;
        width:5px;
        // width:10px !important;
        background: ${Colors.primaryDark}; 
        border-radius: 20px;
        display:none;

    }
    &::-webkit-scrollbar-button{
        display:none;
    }
`;


const StatsTab = ({ stats }) => {
    return (
        <ItemsContainerDesktop>
            {stats.length > 0 ? <>{stats.map((stat) => { return <div className="d-flex justify-content-between my-2"><TT>{stat.name}</TT><p style={{ margin: 0, fontWeight: 500 }}>{stat.value} Of {stat.count}</p></div> })}</> : <NoItemFound text={'nothing found'} />}
        </ItemsContainerDesktop>
    );
}

export default StatsTab;