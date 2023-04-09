import styled from "styled-components";

const Contnr = styled.div`
text-align:justify;
width:60%;
@media screen and (max-width: 992px) {
    width: 90%;
};
@media screen and (max-width: 575px) {
    width: 100%;
};
`

const Comp = styled.div`
border-radius:24px;
background-color: ${({ theme }) => theme.collectionCardActive};
padding: 20px;
font-size:14px;
display:flex;
align-items:center;
justify-content:center;
`

const Earnings = () => {
    return (
        <>
            <Contnr className="d-flex flex-column">
                <p>
                    To access your 2022 Creator Earnings where this wallet is listed as the collection owner on Ethereum, Arbitrum, Avalanche, Klaytn, Optimism, and Polygon using OpenSea, see below.As a reminder, you are solely responsible for validating this information and determining what taxes you owe. This information is provided on a collection owner basis. If no collection owner exists, earnings information is listed for the wallet set to receive creator earnings.Please note, the information in this report reflects publicly available information from the Ethereum, Arbitrum, Avalanche, Klaytn, Optimism, and Polygon blockchains, except for the estimated USD conversion rate, which was obtained from www.coincap.io and measured as of the transaction minute. This report does not include Creator Earnings earned on Solana and BSC.For any questions, including requests for Creator Earnings information from Solana and BSC, please reach out to creatorearnings@opensea.io.
                    This wallet address does not have any creator earnings from sales using OpenSea in 2022.
                </p>
                <Comp>
                    this wallet address does not have any creator earnings from sales using Dorta Club in 2023.
                </Comp>
            </Contnr>
        </>
    );
}

export default Earnings;