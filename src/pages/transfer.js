import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import bg from '../assets/bgOpMin.svg'
import errPic from '../assets/404err.svg'
import '../styles.css'
import SSelection from "../components/Selection";
import GiftCard from "../components/Cards/giftCard";
import { useState } from "react";

const Container = styled.div`
    margin:50px 0;
    display:flex;
    flex-direction:column;
`
const CardsContainer = styled.div`
    display:flex;
    flex-wrap:wrap;
    margin-top:10px;
`

const Transfer = ({ theme, themeToggler }) => {
    const selectOptions = ['$', 'MT', 'HT', '€', '£']
    const [selectValue, setSelectValue] = useState('$')
    const handleSelection = (e) => {
        setSelectValue(e.target.id)
    }
    const gifts = [
        { price: '2', priceUnit: 'MT' },
        { price: '5', priceUnit: 'MT' },
        { price: '10', priceUnit: 'MT' },
        { price: '20', priceUnit: 'MT' },
        { price: '500', priceUnit: 'HT' },
        { price: '10', priceUnit: '$' },
        { price: '20', priceUnit: '$' },
        { price: '30', priceUnit: '$' },
        { price: '50', priceUnit: '$' },
        { price: '100', priceUnit: '$' },
        { price: '100', priceUnit: '€' },
        { price: '10', priceUnit: '£' },
        { price: '50', priceUnit: '£' },
        { price: '100', priceUnit: '£' },
    ]
    return (
        <>
            <div className="pdng">
                <Navbar theme={theme} themeToggler={themeToggler} />
                <Container>
                    <div className="d-flex justify-content-end align-items-center">
                        <SSelection id={'giftUnits'} width={'100px'} theme={theme} tabs={selectOptions} handleSelect={handleSelection} selectValue={selectValue} />
                    </div>
                    <CardsContainer>
                        {gifts.filter(gift => gift.priceUnit == selectValue).map(filteredGift => (
                            <GiftCard theme={theme} price={filteredGift.price} priceUnit={filteredGift.priceUnit} />
                        ))}

                    </CardsContainer>
                </Container>
            </div>
        </>
    );
}

export default Transfer;