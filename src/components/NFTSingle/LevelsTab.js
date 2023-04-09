import styled from "styled-components";
import { percentage } from "../../utils/countingFunctions";
import { Colors } from "../design/Colors";
import NoItemFound from "../NoItem";
const ItemsContainerDesktop = styled.div`
    display: flex;
    flex-direction: column;
    width:100%;
    // height:350px;
    // overflow-y:scroll;
    scrollbar-width: 5px;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display:none;
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
        display:none;
    }
`;
const ProgressBar = styled.div`
height:26px;
width:100%;
border-radius:47px;
background-color:${({ theme }) => theme.activeTab};
overflow:hidden;
`
const Progress = styled.div`
height:100%;
background:${Colors.gradientPurpleLight};
`
const TT = styled.p`
margin:0;
color:${({ theme }) => theme.trendingSectionSubTitles};
@media screen and (max-width: 768px) {
    font-size:14px;
}

`

const LevelsTab = ({ levels }) => {

    return (<ItemsContainerDesktop>
        {levels.length > 0 ? <>{levels.map((level) => {
            return <div className="d-flex flex-column w-100 my-2">
                <div className="d-flex w-100 justify-content-between align-items-center">
                    <TT>{level.name}</TT><p style={{ margin: 0, fontWeight: 500 }}>{level.value} Of {level.count}</p>
                </div>
                <ProgressBar className="my-1"><Progress style={{ width: `${percentage(level.value, level.count)}%` }} /></ProgressBar>
            </div>
        })}</> : <NoItemFound text={'nothing found'} />}
    </ItemsContainerDesktop>);
}

export default LevelsTab;