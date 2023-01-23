import { ArrowRight2 } from "iconsax-react";
import styled from "styled-components";
import CollectionCard from "../Cards/CollectionCard";
import InfoCard from "../Cards/InfoCard";
import ItemCard from "../Cards/ItemCard";
import infoImage1 from '../../assets/info-pics1.svg'
import infoImage2 from '../../assets/info-pics2.svg'
import infoImage3 from '../../assets/info-pics3.svg'
const SectionContainer = styled.div`
    padding: 0 32px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    margin:50px auto;

`;
const Card = styled.div`
border:solid 1px white;
`;

const BasicsSection = ({ theme }) => {
    return (
        <SectionContainer>
            <div className="row p-2 justify-content-between">
                <div className="row col-sx-11 col-sm-9 col-md-6 justify-content-start align-items-center">
                    <h3 style={{ margin: 0, fontWeight: "600" }}>
                        Get Comfortable With The Basics
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
            </div>
        </SectionContainer>

    );
}

export default BasicsSection;