import styled from "styled-components";

const Card = styled.div`
    height:80px;
    background: ${({ theme }) => theme.collectionCardHover};
    border-radius: 12px;
    // cursor:pointer;
    // &:hover{
    //     background: ${({ theme }) => theme.collectionCardActive};
    // }
    // &:active{
    //     background: ${({ theme }) => theme.collectionCardActive};
    // }
    `
    ;

const EmptyListingCard = () => {
    return (
        <Card className="my-2">
        </Card>
    );
}

export default EmptyListingCard;