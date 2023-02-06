import { ArrowDown2, ArrowRight2 } from "iconsax-react";
import styled from "styled-components";
import ItemCard from "../Cards/ItemCard";
import { Colors } from "../design/Colors";
const Scrollable = styled.div`
    overflow-x:scroll;
    scrollbar-width: 5px;
    // -ms-overflow-style: none;
    &::-webkit-scrollbar {
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
        // background:${Colors.primaryDark};
        // width:3px;
        // content : ${<ArrowDown2 size="10" color="purple" />}
        display:none;
    }
`;

const MoreOfColl = () => {
    return (
        <div className="d-flex flex-column my-4 w-100">
            <div className="d-flex w-100 justify-content-between">
                <div className="row col-sx-11 col-sm-9 col-md-6 justify-content-start align-items-center">
                    <h3 style={{ margin: 0, fontWeight: "600",fontSize:"20px" }}>
                        more from this collection
                    </h3>
                </div>
                <div className="row d-none d-sm-flex col-sm-3 col-md-6 justify-content-end align-items-center" style={{ cursor: "pointer" }}>
                    Show more
                    <div style={{ width: "auto", padding: "0" }}><ArrowRight2 /></div>
                </div>
                <div className="row d-sx-flex d-sm-none col-1 justify-content-end align-items-center" style={{ cursor: "pointer" }}>
                    <div style={{ width: "auto", padding: "0" }}><ArrowRight2 /></div>
                </div>
            </div>
            <Scrollable className="d-flex w-100 justify-content-between">
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
            </Scrollable>
        </div>
    );
}

export default MoreOfColl;