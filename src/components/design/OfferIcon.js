import styled from 'styled-components';
import offerIcon from '../../assets/OfferIconLinear.svg'
import offerIconLight from '../../assets/offerIconLightMode.svg'
import offerIconDark from '../../assets/offerIconDarkMode.svg'
const ItemImage = styled.div`
    // background-image: url(${offerIcon});
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;
`;


const OfferIconOutline = ({ size, className, theme }) => {
    var pw = `${size}px`
    return (<ItemImage className={className} style={{ width: pw, height: pw, backgroundImage: theme = 'light' ? `url(${offerIconLight})` : `url(${offerIconDark})` }} />);
}

export default OfferIconOutline;