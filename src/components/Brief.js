import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { API_CONFIG } from '../config';
import { shortenMedium } from '../utils/countingFunctions';
import { BG_URL, PUBLIC_URL } from '../utils/utils';
import { Colors } from './design/Colors';

const ItemImage = styled.div`
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;
    height:35px;
    width:35px;
    border-radius:8px;
`;
const ColImage = styled.div`
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;
    height:35px;
    width:35px;
    border-radius:8px;
`;
const AccountImage = styled.div`
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;
    height:35px;
    width:35px;
    border-radius:50%;
`;
export const CollectionBrief = ({ title, price, itemsLength, image, id }) => {
    const navigate = useNavigate()

    return (
        <Link className="d-flex justify-content-between align-items-center w-100" style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'collection/' + title + '/' + id}>
            <div className="d-flex align-items-center">
                <ColImage style={{ backgroundImage: image ? BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${image.replace('root/dortzio/market/media/', '')}`)) : `${Colors.gradientPurpleStandard}` }} />
                <div className='d-flex flex-column justify-content-center align-items-start ms-2'><span style={{ fontSize: "14px" }}>{shortenMedium(title)}</span><span style={{ fontSize: "10px" }}>{itemsLength} items</span></div>
            </div>
            <div className='d-flex align-items-center align-self-start' style={{ fontSize: "14px" }}>{price} ETH</div>
        </Link>
    )
}
export const AccountBrief = ({ username, image }) => {
    const navigate = useNavigate()

    return (
        <Link className="d-flex justify-content-between align-items-center w-100" style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'profile/' + username}>
            <div className="d-flex align-items-center">
                <AccountImage style={{ backgroundImage: image ? BG_URL(PUBLIC_URL(`${API_CONFIG.AUTH_MEDIA_API_URL}${image.replace('root/dortzio/auth/media/', '')}`)) : `${Colors.gradientPurpleStandard}` }} />
                <div className='ms-2' style={{ fontSize: "14px" }}>{shortenMedium(username)}</div>
            </div>
            <div className='d-flex align-items-center'></div>
        </Link>
    )
}
export const ItemBrief = ({ title, collection, image, id, wallet }) => {
    const navigate = useNavigate()

    return (
        <Link className="d-flex justify-content-between align-items-center w-100" style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'assets/ethereum/' + wallet + '/' + id}>
            <div className="d-flex align-items-center">
                <ItemImage style={{ backgroundImage: image ? BG_URL(PUBLIC_URL(`${API_CONFIG.MARKET_MEDIA_API_URL}${image.replace('root/dortzio/market/media/', '')}`)) : `${Colors.gradientPurpleStandard}` }} />
                <div className='d-flex flex-column justify-content-center align-items-start ms-2'><span style={{ fontSize: "14px" }}>{shortenMedium(title)}</span><span style={{ fontSize: "10px" }}>{shortenMedium(collection)}</span></div>
            </div>
            <div className='d-flex align-items-center'></div>
        </Link>
    )
}