import styled from 'styled-components';
import testnft from '../assets/test1.png'
import testAcc from '../assets/sampleProfile.png'
import testCol from '../assets/testpic.png'


const ItemImage = styled.div`
    background-image: url(${testnft});
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;
    height:35px;
    width:35px;
    border-radius:8px;
`;
const ColImage = styled.div`
    background-image: url(${testCol});
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;
    height:35px;
    width:35px;
    border-radius:8px;
`;
const AccountImage = styled.div`
    background-image: url(${testAcc});
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;
    height:35px;
    width:35px;
    border-radius:50%;
`;

export const CollectionBrief = () => {
    return (
        <div className="d-flex justify-content-between align-items-center w-100">
            <div className="d-flex align-items-center">
                <ColImage />
                <div className='d-flex flex-column justify-content-center align-items-start ms-2'><span>collection name</span><span style={{ fontSize: "10px" }}>22 items</span></div>
            </div>
            <div className='d-flex align-items-center'>150 ETH</div>
        </div>
    )
}
export const AccountBrief = () => {
    return (
        <div className="d-flex justify-content-between align-items-center w-100">
            <div className="d-flex align-items-center">
                <AccountImage />
                <div className='ms-2'>Account Name</div>
            </div>
            <div className='d-flex align-items-center'></div>
        </div>
    )
}
export const ItemBrief = () => {
    return (
        <div className="d-flex justify-content-between align-items-center w-100">
            <div className="d-flex align-items-center">
                <ItemImage />
                <div className='d-flex flex-column justify-content-center align-items-start ms-2'><span>Item name</span><span style={{ fontSize: "10px" }}>collection name</span></div>
            </div>
            <div className='d-flex align-items-center'></div>
        </div>
    )
}