import { Typography } from "@mui/material";
import styled from "styled-components";
import noItemBG from '../assets/noItem.svg'
import { Colors } from "./design/Colors";

const NoItem = styled.div`
    background-image: url(${noItemBG});
    background-size:contain;
    background-repeat:no-repeat;
    background-position:center;
    border-radius:24px;
    background-color:${({ theme }) => theme.collectionCardHover};
    height:300px;
    width:300px;
`;
const BG = styled.div`
    border-radius:24px;
    background-color:${({ theme }) => theme.collectionCardHover};
    height:500px;
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;


const NoItemFound = ({text}) => {
    return (
        <BG>
            <NoItem />
            <Typography sx={{ color: `${Colors.gray4}`, textAlign: 'center', justifySelf: "center", width: "100%" }}>{text}</Typography>
        </BG>
    );
}

export default NoItemFound;