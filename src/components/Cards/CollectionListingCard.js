import styled from "styled-components";

const Card = styled.div`
    height:80px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 8px;
    background: ${({ theme }) => theme.collectionCard};
    border-radius: 12px;
    cursor:pointer;
    &:hover{
        background: ${({ theme }) => theme.collectionCardHover};
    }
    &:active{
        background: ${({ theme }) => theme.collectionCardActive};
    }

    `
    ;
const ColLogoHolder = styled.div`
    box-sizing: border-box;
    background: #D9D9D9;
    border: 1px solid #D9D9D9;
    border-radius:50%;
    width:50px;
    height:50px;
    `;
const PriceUnit = styled.span`
color: ${({ theme }) => theme.pricesUnits};
font-weight:400;
`;


const CollectionCard = ({ theme, index, collectionLogo, collectionName, collectionFloor, collectionVolume }) => {
    return (
        <>
            {/*no mobile card */}
            <Card className="d-none d-sm-flex">
                <div style={{
                    display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                    // border: "1px solid blue",
                    width: "50%"
                }}>
                    <div>{index}&nbsp;&nbsp;</div>
                    <ColLogoHolder>{collectionLogo}</ColLogoHolder>
                    <div>&nbsp;&nbsp;{collectionName}&nbsp;</div>
                </div>
                <div style={{
                    display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                    // border: "1px solid blue",
                    fontWeight:600,
                    width: "25%",
                }}>
                    {collectionFloor}&nbsp;<PriceUnit>ETH</PriceUnit>
                </div>
                <div style={{
                    display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",
                    // border: "1px solid blue",
                    width: "25%",
                    fontWeight:600
                }}>
                    {collectionVolume}&nbsp;<PriceUnit>ETH</PriceUnit>
                </div>
            </Card>
            {/*mobile card */}
            <Card className="d-flex d-sm-none">
                <div style={{
                    display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                    // border: "1px solid blue",
                    width: "60%"
                }}>
                    <div>{index}&nbsp;&nbsp;</div>
                    <ColLogoHolder>{collectionLogo}</ColLogoHolder>
                    <div>&nbsp;&nbsp;{collectionName}&nbsp;&nbsp;</div>
                </div>
                <div style={{
                    display: "flex", flexDirection: "row", justifyContent: "end", alignItems: "center",
                    // border: "1px solid blue",
                    width: "30%",
                    fontWeight:600
                }}>
                    {collectionFloor}&nbsp;<PriceUnit>ETH</PriceUnit>
                </div>
            </Card>
        </>
    );
}

export default CollectionCard;