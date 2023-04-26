import styled from "styled-components";
import { Colors } from "../design/Colors";
import mintingState from '../../assets/mintingState.png'
import { NotificationBing, TimerPause } from "iconsax-react";

const Container = styled.div`
background-color:${Colors.gray9};
border:1px solid ${Colors.gray8};
border-radius:24px;
display:flex;
align-items-center;
justify-content-center;
// padding:10px;
width:max-content;
`;
const Line = styled.div`
    background: linear-gradient(90deg,#60606000 0%, #80808080 50%,#918A7A00 100%);
    height:1px;
    align-self:center;
    width:70%;
`;
const MintingNowIcon = styled.div`
background-image: url(${mintingState});
background-size:contain;
background-repeat:no-repeat;
background-position:center;
width:24px;
height:24px;
`
const MintingTime = styled.span`
color:#d9d9d9;
font-weight:600;
font-size:20px;
`
const MintingSub = styled.span`
color:#999999;
font-weight:400;
font-size:8px;
`
export const Timer = () => {
    return (<Container className="p-3 mx-1 flex-column">
        <div className="d-flex justify-content-between align-items-center">
            <MintingTime>22 :</MintingTime>
            <MintingTime>&nbsp;11 :</MintingTime>
            <MintingTime>&nbsp;2 :</MintingTime>
            <MintingTime>&nbsp;9</MintingTime>
        </div>
        <div className="d-flex justify-content-between align-items-center">
            <MintingSub>Days &nbsp; </MintingSub>
            <MintingSub>&nbsp; Hours &nbsp;</MintingSub>
            <MintingSub>&nbsp; Mins &nbsp;</MintingSub>
            <MintingSub>&nbsp; Secs &nbsp;</MintingSub>
        </div>
    </Container>)

}
export const Status = ({ status }) => {
    // console.log(status)
    return (
        <Container>
            {status == 'minting-now' ?
                <div className="p-3 d-flex">
                    <MintingNowIcon className="me-2" />
                    <span style={{ color: `${Colors.successDark}` }}>Minting now</span>
                </div> : status == 'mint-soldout' ?
                    <div className="p-3">
                        <TimerPause color={`${Colors.errorDark}`} className="me-2" />
                        <span style={{ color: `${Colors.errorDark}` }}>Mint Sold out</span>
                    </div> : status == 'mint-upcome' ?
                        <div className="p-2 d-flex flex-column justify-content-center align-items-center">
                            <NotificationBing color={`${Colors.successDark}`} />
                            <Line className="my-1" />
                            <span style={{ color: `${Colors.gray4}`, fontSize: "10px" }}>Let Me Know</span>
                        </div>
                        : <div className="p-3">
                            <TimerPause color={`${Colors.errorDark}`} className="me-2" />
                            <span style={{ color: `${Colors.errorDark}` }}>Mint ended</span>
                        </div>
            }
        </Container>
    )

}
export const LetMeKnow = () => {

}