import React from 'react'
import { func, string } from 'prop-types';
import styled from "styled-components"

const Button = styled.button`
  background: ${({ theme }) => theme.toggleBackground};
  border:none;
  color: ${({ theme }) => theme.text};
  border-radius: 50%;
  cursor: pointer;
  width:50px;
  height:50px;
  flex:none;
  order:0;
  flex-grow:0;
  }
`;


const Toggle = ({ theme, toggleTheme }) => {
    return (
        <Button onClick={toggleTheme} >
        </Button>
    );
};
Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}
export default Toggle;
