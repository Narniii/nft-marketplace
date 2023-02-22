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
    margin:50px auto;

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
            <div className="d-flex p-2 justify-content-between">
                <div className="d-flex col-sx-11 col-sm-9 col-md-6 justify-content-start align-items-center">
                    <h3 style={{ margin: 0, fontWeight: "600" }}>
                        Get Comfortable With The Basics
                    </h3>
                </div>
                <div className="d-none d-sm-flex col-sm-3 col-md-6 justify-content-end align-items-center" style={{ cursor: "pointer" }}>
                    Show more
                    <div style={{ width: "auto", padding: "0" }}><ArrowRight2 /></div>
                </div>
                <div className="d-flex d-sm-none col-1 justify-content-end align-items-center" style={{ cursor: "pointer" }}>
                    <div style={{ width: "auto", padding: "0" }}><ArrowRight2 /></div>
                </div>
            </div>
            {informartions.length == 0 ?
                <Typography sx={{ color: `${Colors.primaryMain}`, textAlign: 'center' }}>No information found.</Typography>
                :
                informartions.length < 3 ?
                    <CustomSlider
                        theme={theme}
                        slidesCount={informartions.length}>
                        {informartions.map((info) => {
                            return <InfoCard slider={true} image={info.card_image} title={info.title} id={info.id} />
                        })}
                    </CustomSlider>
                    :
                    <CustomSlider
                        theme={theme}
                    >
                        {informartions.map((info) => {
                            return <InfoCard slider={true} image={info.card_image} title={info.title} id={info.id} />
                        })}
                    </CustomSlider>
            }

            {/* 
            <div className="d-none d-md-flex row justify-content-between">
                <InfoCard image={infoImage1} className="p-2 col-xs-12 col-sm-6 col-md-4 align-items-center align-self-center" />
                <InfoCard image={infoImage2} className="p-2 col-xs-12 col-sm-6 col-md-4 align-items-center align-self-center" />
                <InfoCard image={infoImage3} className="p-2 col-xs-12 col-sm-6 col-md-4 align-items-center align-self-center" />
            </div>
            <div className="d-none d-sm-flex d-md-none row justify-content-between">
                <InfoCard image={infoImage1} className="p-2 col-xs-12 col-sm-6 col-md-4 align-items-center align-self-center" />
                <InfoCard image={infoImage2} className="p-2 col-xs-12 col-sm-6 col-md-4 align-items-center align-self-center" />
            </div>
            <div className="d-flex d-sm-none row justify-content-between">
                <InfoCard image={infoImage1} className="p-2 col-xs-12 col-sm-6 col-md-4 align-items-center align-self-center" />
            </div> */}
        </SectionContainer>

    );
}

export default BasicsSection;