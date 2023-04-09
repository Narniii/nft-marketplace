import styled from "styled-components";
import NoItemFound from "../NoItem";

const ItemsContainerDesktop = styled.div`
    display: flex;
    flex-direction: column;
    width:100%;
    height:350px;
`;


const PriceHistoryTab = ({ history }) => {
    return (
        <>
            <ItemsContainerDesktop className="my-2 d-flex">
                {history.length == 0 ?
                    <NoItemFound text={'no history found'} /> :
                    <>
                        <div className="w-100 text-center">coming soon</div>
                    </>
                }
            </ItemsContainerDesktop>
        </>
    );
}

export default PriceHistoryTab;