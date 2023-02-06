import { Select } from "@mui/material";
import { styled } from "@mui/system";
import { ArrowDown2 } from "iconsax-react";
import { Colors } from "./design/Colors";

const Selection = styled(Select)`
display: flex;
flex-direction: row;
align-items: center;
cursor:pointer;
background: transparent;
justify-content:space-between;
border: 1px solid #D9D9D9;
border-radius: 24px;
overflow:hidden;
// height:100%;
// width:200px;
&:active{
    border-bottom-right-radius:0;
    border-bottom-left-radius:0;
  };
  &:before{
    border-color:#d9d9d9;
    };
  &:after{
    border-color:#d9d9d9;
    }
`;

export const SelectionB = ({ theme }) => {

    return (<Selection
        displayEmpty
        inputProps={{ MenuProps: { disableScrollLock: true } }}
        BackdropProps={{ invisible: true }}
        IconComponent={ArrowDown2}
        sx={{ color: theme == ' light' ? '#888888' : '#f9f9f9' }}
    >
    </Selection>)
}