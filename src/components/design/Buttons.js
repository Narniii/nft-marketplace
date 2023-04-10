import styled, { keyframes } from 'styled-components'
import { Colors } from './Colors';

export const ButtonLarge = styled.button`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 16px 12px;
// gap: 8px;
// width: 348px;
width:100%;
height: 56px;
background: ${Colors.gradientPurpleStandard};
mix-blend-mode: normal;
box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.15);
border-radius: 24px;
flex: none;
border:none;
color: white;
order: 1;
flex-grow: 0;
&:hover{
    background: linear-gradient(276.27deg, #7830D2 0%, #BB86FF 97.78%);}
}
`;
export const ButtonMedium = styled.button`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
// padding: 12px;
padding:10px 20px;
// gap: 6px;
border:none;
// width: 330px;
width:100%;
height: 44px;
background: #9951F4;
mix-blend-mode: normal;
box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.15);
border-radius: 24px;
color:white;
font-size:14px;
background: ${Colors.gradientPurpleStandard};
&:hover{
    background: linear-gradient(276.27deg, #7830D2 0%, #BB86FF 97.78%);
}
`;
export const ButtonMediumChangable = styled.button`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
border:none;
width:100%;
height: 44px;
// padding-left:20px;
overflow:hidden;
padding:0;
background: #9951F4;
mix-blend-mode: normal;
box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.15);
border-radius: 24px;
color:white;
font-size:14px;
background: ${Colors.gradientPurpleStandard};
// &:hover{
//     background: linear-gradient(276.27deg, #7830D2 0%, #BB86FF 97.78%);
// }
`;

export const ButtonSmall = styled.button`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 12px;
gap: 6px;
width: 320px;
height: 40px;
border:none;
background: ${Colors.gradientPurpleStandard};
mix-blend-mode: normal;
box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.15);
border-radius: 24px;
color:white;
&:hover{
    background: linear-gradient(276.27deg, #7830D2 0%, #BB86FF 97.78%);
}
`;
export const ButtonXSmall = styled.button`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
// padding: 12px 16px;
// gap: 4px;
border:none;
// width: 100px;
width:100%;
font-size:1rem;
font-weight:600;
height: 40px;
padding:15px 30px;
background: ${Colors.gradientPurpleStandard};
mix-blend-mode: normal;
box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.15);
border-radius: 24px;
color:white;
&:hover{
    background: linear-gradient(276.27deg, #7830D2 0%, #BB86FF 97.78%);
}
`;


const buttonShowUp = keyframes`
0% {height: 0px; color:transparent; }
30% {color:transparent;}
100% {height: 100%;color:white;}
`

export const AddToCartButton = styled.button`
background: linear-gradient(276.27deg, #4F04AE 0%, #A159FC 88.41%);
width:100%;
height:100%;
// opacity:0;
// display:none;
border-bottom-left-radius:24px;
border-bottom-right-radius:24px;
border:none;
transition:10ms linear;
// transform-origin:bottom;
color:#ffffff;
animation-name: ${buttonShowUp};
animation-duration: 0.5s;
animation-iteration-count: 1;

`;



export const ButtonOutline = styled.button`
color:#9951F4;
border:solid 1px #9951F4;
background-color:transparent;
border-radius:24px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding:10px 20px;
width:100%;
`
export const ButtonOutlineLarge = styled.button`
color:#9951F4;
border:solid 1px #9951F4;
background-color:transparent;
border-radius:24px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding:10px 20px;
width:100%;
height:56px;
`

export const ButtonOutlineLight = styled.button`
color:#f9f9f9;
border:solid 1px #f9f9f9;
background-color:transparent;
border-radius:24px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding:5px 20px;
`

export const ButtonDisabled = styled.button`
background: linear-gradient(90deg, #767676 2.08%, #A9A9A9 47.4%, #D2D2D2 100%);
border-radius: 24px;
display: flex;
flex-direction: row;
align-items: center;
border:none;
color:white;

`