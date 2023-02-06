import { Grid1, Grid2, Grid5, HambergerMenu } from "iconsax-react";
import { useState } from "react";
import styled from "styled-components";
import ItemCard from "../Cards/ItemCard";

const Selection = styled.div`
display: flex;
flex-direction: row;
align-items: center;
cursor:pointer;
background: transparent;
justify-content:space-between;
border: 1px solid #D9D9D9;
border-radius: 24px;
overflow:hidden;
height:100%;
`;

const IconContainer = styled.div`
border-left: 1px solid #D9D9D9;
height:100%;
padding:18px;
&:hover{
    background-color: ${({ theme }) => theme.hoverIcon};
}
`;
const FeaturedItems = () => {
    const [view, setView] = useState('m')
    const handleViewChange = (v) => {
        setView(v)
    }
    
    return (
        <>
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 style={{ fontWeight: "bold" }}>Beans</h5>
                    <Selection className="d-flex">
                        <IconContainer className="text-center d-flex justify-content-center align-items-center" onClick={()=>handleViewChange('xs')}><HambergerMenu size="20" /></IconContainer>
                        <IconContainer className="text-center d-flex justify-content-center align-items-center" onClick={()=>handleViewChange('s')}><Grid1 size="20" /></IconContainer>
                        <IconContainer className="text-center d-flex justify-content-center align-items-center" onClick={()=>handleViewChange('m')}><Grid2 size="20" /></IconContainer>
                        <IconContainer className="text-center d-flex justify-content-center align-items-center" onClick={()=>handleViewChange('l')}><Grid5 size="20" /></IconContainer>
                    </Selection>
                </div>
                <div className="row mt-2">
                    <ItemCard view={view} itemID={'1'} />
                    <ItemCard view={view} itemID={'2'}/>
                    <ItemCard view={view} itemID={'3'}/>
                    <ItemCard view={view} itemID={'4'}/>
                    <ItemCard view={view} itemID={'5'}/>
                    <ItemCard view={view} itemID={'6'}/>
                </div>

            </div>
        </>
    );
}

export default FeaturedItems;