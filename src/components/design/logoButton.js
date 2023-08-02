import React from 'react'
import { Link } from 'react-router-dom';
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
  @media screen and (max-width: 575px) {
    width:32px;
    height:32px;
      }   
  }
`;


const IconButton = ({ theme }) => {
    return (
        <Link to={'/transfer'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button>
            </Button>
        </Link>
    );
};
export default IconButton;
