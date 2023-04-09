import { Link } from "react-router-dom";
import styled from "styled-components";
import bg from '../../assets/info-card-bg.svg'
import { Colors } from "../design/Colors";

const Card = styled.div`
// border:1px solid white;
height: 250px;
width:100%;
padding-left:12px;
padding-right:12px;
@media screen and (max-width: 992px) {
    padding-left:8px;
    padding-right:8px;
}
@media screen and (max-width: 575px) {
    padding-left:8px;
    padding-right:8px;
}

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
text-transform:${Colors.body};
`

const Imagebg = styled.div`
height: 100%;
// background-size:contain;
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
background: linear-gradient(357.57deg, #4C1593 14.65%, rgba(72, 15, 145, 0) 25.82%,rgba(72, 15, 145, 0) 97.28%);
`

const InfoCard = ({ image, slider, title, id, nextInfo }) => {
    return (
        <>{slider ?
            <Card className=" col-xs-12 col-sm-6 col-md-4 align-items-center align-self-center" >
                {/* <OuterDiv> */}
                <Link to={'/' + 'info/' + id} style={{ textDecoration: "none", width: "auto", height: "auto" }}>
                    <InnerDiv>
                        <Imagebg style={{ backgroundImage: `url(${image})` }}>
                            <ShadowedDiv className="position-relative" >
                                <div
                                    style={{
                                        width: "100%",
                                        // height:"50px"
                                        // border: "1px solid blue"
                                        padding: "20px",
                                    }}
                                    className="position-absolute bottom-0"
                                >
                                    <h5 style={{ margin: 0, color: "white", fontWeight: 500 }}>{title}</h5>
                                </div>
                            </ShadowedDiv>
                        </Imagebg>
                    </InnerDiv>
                </Link>
                {/* </OuterDiv> */}
            </Card>
            :
            <div className="col-xs-12 col-sm-6 col-md-4 p-0">
                <Card className=" align-items-center align-self-center" >
                    {/* <OuterDiv> */}
                    <Link to={'/' + 'info/' + id} style={{ textDecoration: "none", width: "auto", height: "auto" }}>
                        <InnerDiv>
                            <Imagebg style={{ backgroundImage: `url(${image})` }}>
                                <ShadowedDiv className="position-relative" >
                                    <div
                                        style={{
                                            width: "100%",
                                            // height:"50px"
                                            // border: "1px solid blue"
                                            padding: "20px",
                                        }}
                                        className="position-absolute bottom-0"
                                    >
                                        <h5 style={{ margin: 0, color: "white", fontWeight: 500 }}>{title}</h5>
                                    </div>
                                </ShadowedDiv>
                            </Imagebg>
                        </InnerDiv>
                    </Link>
                    {/* </OuterDiv> */}
                </Card>
            </div>}
        </>
    );
}

export default InfoCard;