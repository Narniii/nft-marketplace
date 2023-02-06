import { ArrowDown2, ArrowSquareRight, ArrowSwapVertical, BagTick, CloseSquare, DocumentDownload, FilterSearch, Grid1, Grid2, Grid5, HambergerMenu, Logout, Refresh2 } from "iconsax-react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Colors } from "../design/Colors";
import '../../styles.css'


const ItemsContainerDesktop = styled.div`
    display: flex;
    height:350px;
    flex-direction: column;
    width:100%;
    overflow-y:scroll;
    scrollbar-width: 5px;
    // -ms-overflow-style: none;
    &::-webkit-scrollbar {
        height: 7px;
        width: 7px;
        background:white;
        border:0.5px solid #D9D9D9;
        border-radius:20px !important;
    }
    &::-webkit-scrollbar-thumb {
        height:5px;
        width:5px;
        // width:10px !important;
        background: ${Colors.primaryDark}; 
        border-radius: 20px;
    }
    &::-webkit-scrollbar-button{
        // background:${Colors.primaryDark};
        // width:3px;
        // content : ${<ArrowDown2 size="10" color="purple" />}
        display:none;
    }
`;
const ProductCardDesktop = styled.div`
    padding :10px 0;
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    width:100%;
    &:hover{
        background-color:${({ theme }) => theme.collectionCardHover};
    }
`;
const Subtitle = styled.p`
    color: ${({ theme }) => theme.par};
    display:flex;
    align-items:center;
    margin:0;
    @media screen and (max-width: 768px) {
        font-size:14px;
    }

`
const Recommend = styled.span`
    color: ${Colors.recommendedDark};
    display:flex;
    align-items:center;
    // font-size:12px;
    @media screen and (max-width: 768px) {
        font-size:14px;
    }

`
const Price = styled.p`
    color: ${({ theme }) => theme.trendingSectionSubTitles};
    margin:0;
    display:flex;
    align-items:center;
    @media screen and (max-width: 768px) {
        font-size:14px;
    }

`

const OfferHistory = ({theme}) => {
    return (
        <ItemsContainerDesktop className="my-2 d-flex">
            <div className="my-1 d-flex justify-content-between">
                <Subtitle style={{ width: "150px",  }}>Price</Subtitle>
                {/* <Subtitle style={{ width: "250px",  }}>Product</Subtitle> */}
                <Subtitle style={{ width: "200px",  }}>USD Price</Subtitle>
                {/* <Subtitle style={{ width: "100px",  }}>Quantity</Subtitle> */}
                <Subtitle style={{ width: "200px",  }}>Floor Difference</Subtitle>
                <Subtitle style={{ width: "150px",  }}>Expiration</Subtitle>
                <Subtitle style={{ width: "150px",  }}>From</Subtitle>
            </div>
            <ProductCardDesktop className="my-1">
                <Price style={{ width: "150px",  }}>0.5 WETH</Price>
                {/* <Price style={{ width: "250px",  }}><ItemImage />Product Name</Price> */}
                <Subtitle style={{ width: "200px",  }}>101 ETH</Subtitle>
                {/* <Subtitle style={{ width: "100px",  }}>1</Subtitle> */}
                <Subtitle style={{ width: "200px",  }}>14% below</Subtitle>
                <Subtitle style={{ width: "150px",  }}>2 days</Subtitle>
                <Recommend style={{ width: "150px",  }}>Na..987</Recommend>
            </ProductCardDesktop>

            <ProductCardDesktop className="my-1">
                <Price style={{ width: "150px",  }}>0.5 WETH</Price>
                {/* <Price style={{ width: "250px",  }}><ItemImage />Product Name</Price> */}
                <Subtitle style={{ width: "200px",  }}>101 ETH</Subtitle>
                {/* <Subtitle style={{ width: "100px",  }}>1</Subtitle> */}
                <Subtitle style={{ width: "200px",  }}>14% below</Subtitle>
                <Subtitle style={{ width: "150px",  }}>2 days</Subtitle>
                <Recommend style={{ width: "150px",  }}>Na..987</Recommend>
            </ProductCardDesktop>

            <ProductCardDesktop className="my-1">
                <Price style={{ width: "150px",  }}>0.5 WETH</Price>
                {/* <Price style={{ width: "250px",  }}><ItemImage />Product Name</Price> */}
                <Subtitle style={{ width: "200px",  }}>101 ETH</Subtitle>
                {/* <Subtitle style={{ width: "100px",  }}>1</Subtitle> */}
                <Subtitle style={{ width: "200px",  }}>14% below</Subtitle>
                <Subtitle style={{ width: "150px",  }}>2 days</Subtitle>
                <Recommend style={{ width: "150px",  }}>Na..987</Recommend>
            </ProductCardDesktop>

            <ProductCardDesktop className="my-1">
                <Price style={{ width: "150px",  }}>0.5 WETH</Price>
                {/* <Price style={{ width: "250px",  }}><ItemImage />Product Name</Price> */}
                <Subtitle style={{ width: "200px",  }}>101 ETH</Subtitle>
                {/* <Subtitle style={{ width: "100px",  }}>1</Subtitle> */}
                <Subtitle style={{ width: "200px",  }}>14% below</Subtitle>
                <Subtitle style={{ width: "150px",  }}>2 days</Subtitle>
                <Recommend style={{ width: "150px",  }}>Na..987</Recommend>
            </ProductCardDesktop>

            <ProductCardDesktop className="my-1">
                <Price style={{ width: "150px",  }}>0.5 WETH</Price>
                {/* <Price style={{ width: "250px",  }}><ItemImage />Product Name</Price> */}
                <Subtitle style={{ width: "200px",  }}>101 ETH</Subtitle>
                {/* <Subtitle style={{ width: "100px",  }}>1</Subtitle> */}
                <Subtitle style={{ width: "200px",  }}>14% below</Subtitle>
                <Subtitle style={{ width: "150px",  }}>2 days</Subtitle>
                <Recommend style={{ width: "150px",  }}>Na..987</Recommend>
            </ProductCardDesktop>

            <ProductCardDesktop className="my-1">
                <Price style={{ width: "150px",  }}>0.5 WETH</Price>
                {/* <Price style={{ width: "250px",  }}><ItemImage />Product Name</Price> */}
                <Subtitle style={{ width: "200px",  }}>101 ETH</Subtitle>
                {/* <Subtitle style={{ width: "100px",  }}>1</Subtitle> */}
                <Subtitle style={{ width: "200px",  }}>14% below</Subtitle>
                <Subtitle style={{ width: "150px",  }}>2 days</Subtitle>
                <Recommend style={{ width: "150px",  }}>Na..987</Recommend>
            </ProductCardDesktop>

            <ProductCardDesktop className="my-1">
                <Price style={{ width: "150px",  }}>0.5 WETH</Price>
                {/* <Price style={{ width: "250px",  }}><ItemImage />Product Name</Price> */}
                <Subtitle style={{ width: "200px",  }}>101 ETH</Subtitle>
                {/* <Subtitle style={{ width: "100px",  }}>1</Subtitle> */}
                <Subtitle style={{ width: "200px",  }}>14% below</Subtitle>
                <Subtitle style={{ width: "150px",  }}>2 days</Subtitle>
                <Recommend style={{ width: "150px",  }}>Na..987</Recommend>
            </ProductCardDesktop>

        </ItemsContainerDesktop>
    );
}

export default OfferHistory;