import { ArrowRight2 } from "iconsax-react";
import styled from "styled-components";
import CollectionCard from "../Cards/CollectionCard";
import InfoCard from "../Cards/InfoCard";
import '../../styles.css'
import CustomSlider from "../CustomSlider";
import { Typography } from "@mui/material";
import { Colors } from "../design/Colors";
import { InformationData } from "../../utils/informationData";

const SectionContainer = styled.div`
    // padding: 0 32px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    margin-top:120px;
    @media screen and (max-width: 992px) {
        margin-top:54px;
    }

`;
const Card = styled.div`
border:solid 1px white;
`;

const BasicsSection = ({ theme }) => {

    // const informartions = [infoImage1, infoImage2, infoImage3,infoImage4]

    const informartions = InformationData.informations
    console.log(informartions)
    return (
        <SectionContainer className="pdng">
            <div style={{ marginBottom: "20px" }} className=" d-flex justify-content-between">
                <div className="d-flex col-sx-11 col-sm-9 col-md-6 justify-content-start align-items-center">
                    <h4 className="d-none d-lg-flex" style={{ margin: 0, fontWeight: 500 }}>
                        Get Comfortable With The Basics
                    </h4>
                    <h5 className="d-none d-sm-flex d-lg-none" style={{ margin: 0, fontWeight: 500 }}>
                        Get Comfortable With The Basics
                    </h5>
                    <h6 className="d-flex d-sm-none" style={{ margin: 0, fontWeight: 500 }}>
                        Get Comfortable With The Basics
                    </h6>
                </div>
                <div className="d-none d-sm-flex col-sm-3 col-md-6 justify-content-end align-items-center" style={{ cursor: "pointer", fontSize: "14px" }}>
                    Show more
                    <div style={{ width: "auto", padding: "0" }}><ArrowRight2 size="20" /></div>
                </div>
                <div className="d-flex d-sm-none col-1 justify-content-end align-items-center" style={{ cursor: "pointer" }}>
                    <div style={{ width: "auto", padding: "0" }}><ArrowRight2 size="20" /></div>
                </div>
            </div>
            {informartions.length == 0 ?
                <Typography sx={{ color: `${Colors.primaryMain}`, textAlign: 'center' }}>No information found.</Typography>
                :
                informartions.length < 3 ?
                    <CustomSlider
                        theme={theme}
                        slidesCount={informartions.length}>
                        {informartions.map((info, index) => {
                            return <InfoCard key={info.id} nextInfo={index + 1} slider={true} image={info.card_image} title={info.title} id={info.id} />
                        })}
                    </CustomSlider>
                    :
                    <CustomSlider
                        theme={theme}
                    >
                        {informartions.map((info, index) => {
                            return <InfoCard key={info.id} nextInfo={index + 1} slider={true} image={info.card_image} title={info.title} id={info.id} />
                        })}
                    </CustomSlider>
            }

        </SectionContainer>

    );
}

export default BasicsSection;