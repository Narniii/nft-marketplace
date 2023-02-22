import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Colors } from "../design/Colors";
import '../../styles.css'
import { Ethereum } from "iconsax-react";
import { ButtonLarge } from "../design/Buttons";
import TickPic from '../../assets/tick.svg'
const CheckPut = styled.div`
cursor:pointer;
border: 1.5px solid #E6E6E6;
border-radius: 9px;
width:32px;
height:32px;
background-color:#f9f9f9;
overflow:hidden;
position:relative;
display:flex;
align-items:center;
justify-content:center;
// background-image: url(${TickPic});
// background-size:contain;
// background-repeat:no-repeat;
// background-position:center;
// &:before {
//     position: absolute;
//     left: 0;
//     top: 50%;
//     height: 50%;
//     width: 3px;
//     background-color: white;
//     content: "";
//     transform: translateX(10px) rotate(-45deg);
//     transform-origin: left bottom;
// };
// &:after {
//     position: absolute;
//     left: 0;
//     bottom: 0;
//     height: 3px;
//     width: 100%;
//     background-color: white;
//     content: "";
//     transform: translateX(10px) rotate(-45deg);
//     transform-origin: left bottom;
// }
`;

const CheckDes = styled.div`
width:calc(100% - 32px);
// flex-wrap:wrap;

`
const Contnr = styled.div`
width:60%;
@media screen and (max-width: 600px) {
    width: 100%;
},
`

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
    width:200px;
    padding:12px;
`;


const NotificationSettings = ({ theme }) => {
    const [checked, setChecked] = useState([])
    const [value, setValue] = useState(undefined)
    const [thisChecked, setThisChecked] = useState(undefined)

    const handleCheck = (e) => {
        console.log(e.target.current)
        e.preventDefault()
        var tempArr = checked;
        setValue(e.target.id)
        // console.log(e.target.id)
        if (tempArr.includes(e.target.id)) {
            const removeItem = tempArr.filter((item) => item != e.target.id);
            tempArr = removeItem
        }
        else tempArr.push(e.target.id)


        setChecked(tempArr)
        console.log(tempArr)

        if (tempArr.includes(e.target.id)) {
            document.getElementById(e.target.id).style.backgroundColor = '#46C263';
        } else {
            document.getElementById(e.target.id).style.backgroundColor = '#f9f9f9';
        }

    }

    return (
        <>
            <Contnr className="d-flex flex-column">
                <p className="m-0">Select which notifications you would like to receive for <span style={{ fontWeight: 600 }}>0x4edf...c998</span></p>
                {/* {console.log(checked.includes(value))}
                {console.log("this", thisChecked)}
                {console.log(value)} */}
                <div className="d-flex align-items-center my-2">
                    <CheckPut id="sold-item" onClick={handleCheck}><img id="sold-item" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>
                    <CheckDes className="d-flex flex-column ms-2">
                        <h6 style={{ margin: 0, fontWeight: 600 }}>Item Sold</h6>
                        <p className="m-0">When someone purchased one of your items</p>
                    </CheckDes>
                </div>
                <div className="d-flex align-items-center my-2">
                    <CheckPut id="bid-activity" onClick={handleCheck}><img id="bid-activity" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>
                    <CheckDes className="d-flex flex-column ms-2 flex-wrap">
                        <h6 style={{ margin: 0, fontWeight: 600 }}>bid activity</h6>
                        <p className="m-0">When someone bids on one of your items</p>
                    </CheckDes>
                </div>
                <div className="d-flex align-items-center my-2">
                    <CheckPut id="price-change" onClick={handleCheck}><img id="price-change" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>
                    <CheckDes className="d-flex flex-column ms-2">
                        <h6 style={{ margin: 0, fontWeight: 600 }}>price change</h6>
                        <p className="m-0">When an item you made an offer on changes in price</p>
                    </CheckDes>
                </div>
                <div className="d-flex align-items-center my-2">
                    <CheckPut id="auction-expiration" onClick={handleCheck}><img id="auction-expiration" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>
                    <CheckDes className="d-flex flex-column ms-2">
                        <h6 style={{ margin: 0, fontWeight: 600 }}>auction expiration</h6>
                        <p className="m-0">When a timed auction you created ends</p>
                    </CheckDes>
                </div>
                <div className="d-flex align-items-center my-2">
                    <CheckPut id="outbid" onClick={handleCheck}><img id="outbid" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>
                    <CheckDes className="d-flex flex-column ms-2">
                        <h6 style={{ margin: 0, fontWeight: 600 }}>outbid</h6>
                        <p className="m-0">When an offer you placed is exceeded by another user</p>
                    </CheckDes>
                </div>
                <div className="d-flex align-items-center my-2">
                    <CheckPut id="owned-item-updates" onClick={handleCheck}><img id="owned-item-updates" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>
                    <CheckDes className="d-flex flex-column ms-2">
                        <h6 style={{ margin: 0, fontWeight: 600 }}>owned item updates</h6>
                        <p className="m-0">When a significant update occurs for one of the items you have purchased on OpenSea</p>
                    </CheckDes>
                </div>
                <div className="d-flex align-items-center my-2">
                    <CheckPut id="successfull-purchase" onClick={handleCheck}><img id="successfull-purchase" src={TickPic} style={{ width: "20px", height: "20px" }} /></CheckPut>
                    <CheckDes className="d-flex flex-column ms-2">
                        <h6 style={{ margin: 0, fontWeight: 600 }}>successfull purchase</h6>
                        <p className="m-0">Occasional updates from the OpenSea team</p>
                    </CheckDes>
                </div>

                <div className="d-flex flex-column my-5">
                    <h4 style={{ fontWeight: 600, fontSize: '20px' }}>Minimum Bid Threshold</h4>
                    <p>Receive notifications only when you receive offers with a value greater than or equal to this amount of ETH.</p>
                    <Selection>
                        <span><Ethereum color='#5BA4FC' />Ethereum</span>
                        <span style={{ fontWeight: 600 }}>50</span>
                    </Selection>
                </div>

                <div className="row p-0">
                    <ButtonLarge>Save</ButtonLarge>
                </div>
            </Contnr>
        </>
    );
}

export default NotificationSettings;