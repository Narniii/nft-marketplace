import styled from "styled-components";
import { Colors } from "../design/Colors";
import mintingState from '../../assets/mintingState.png'
import { TimerPause } from "iconsax-react";

const Container = styled.div`
background-color:${Colors.gray9};
border:1px solid ${Colors.gray8};
border-radius:24px;
display:flex;
align-items-center;
justify-content-center;
padding:16px;
width:max-content;
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
    return (<Container className="flex-column">
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
            {status == 'minting-now' ? <>
                <MintingNowIcon className="me-2" />
                <span style={{ color: `${Colors.successDark}` }}>Minting now</span>
            </> : status == 'mint-soldout' ?
                <>
                    <TimerPause color={`${Colors.errorDark}`} className="me-2" />
                    <span style={{ color: `${Colors.errorDark}` }}>Mint Sold out</span>
                </> : <>
                    <TimerPause color={`${Colors.errorDark}`} className="me-2" />
                    <span style={{ color: `${Colors.errorDark}` }}>Mint ended</span>
                </>
            }
        </Container>
    )

}
export const LetMeKnow = () => {

}