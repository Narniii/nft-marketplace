import { Link } from "react-router-dom";
import styled from "styled-components";
import bg from '../../assets/info-card-bg.svg'
import { Colors } from "../design/Colors";

const Card = styled.div`
// border:1px solid white;
height: 200px;

`
const OuterDiv = styled.div`
background: ${Colors.gradientPurpleStandard};
overflow:hidden;
// border:solid red 1px;
border-radius: 24px;
height: 100%;
`
const InnerDiv = styled.div`
height: 100%;
background-image: url(${bg});
// border:1px solid white;
background-size:cover;
background-repeat:no-repeat;
background-position:center;
overflow:hidden;
z-index:0;
// position:relative;
border-radius: 24px;

`

const Imagebg = styled.div`
height: 100%;
background-size:contain;
background-repeat:no-repeat;
background-position:center;
// z-index:2;
`

const ShadowedDiv = styled.div`
// position:absolute;
// bottom:0;
width:100%;
// z-index:1;
height: 100%;
background: linear-gradient(357.7deg, #4C1593 1.45%, rgba(72, 15, 145, 0) 30.57%);`

const InfoCard = ({ image }) => {
    // console.log(image)
    return (
        <Card className=" p-2 col-xs-12 col-sm-6 col-md-4 align-items-center align-self-center" >
            {/* <OuterDiv> */}
            <Link  to="/info/9898" style={{ textDecoration: "none", width: "auto", height: "auto" }}>
                <InnerDiv>
                    <Imagebg style={{ backgroundImage: `url(${image})` }}>
                        <ShadowedDiv className="position-relative" >
                            <div
                                style={{
                                    width: "100%",
                                    // height:"50px"
                                    // border: "1px solid blue"
                                }}
                                className="position-absolute bottom-0 p-3"
                            >
                                <h5 style={{ margin: 0, color: "white", fontWeight: "600" }}>What is Web3is Web3?</h5>
                            </div>
                        </ShadowedDiv>
                    </Imagebg>
                </InnerDiv>
            </Link>
            {/* </OuterDiv> */}
        </Card>

    );
}

export default InfoCard;