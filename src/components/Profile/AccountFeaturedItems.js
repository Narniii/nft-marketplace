import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { MARKET_API } from "../../utils/data/market_api";
import { ButtonLarge, ButtonMedium } from "../design/Buttons";
import AddFeatured from "./AddFeaturedSectionModal";

const Contnr = styled.div`
width:60%;
@media screen and (max-width: 992px) {
    width: 90%;
};
@media screen and (max-width: 575px) {
    width: 100%;
};
`
const AddButtonHolder = styled.div`
width:300px;
margin-top:56px;
@media screen and (max-width: 575px) {
    width: 100%;
};

`

const AccountFeaturedItems = ({ theme }) => {
    const [featuredItems, setFeaturedItems] = useState([])
    const [openAddModal, setOpenAddModal] = useState(false)
    return (
        <Contnr className="d-flex flex-column justify-content-start">
            <p className="m-0">Featured items will appear on your profile’s “Featured” tab. You can add up to 10 featured sections to your profile.</p>
            <AddButtonHolder>
                <ButtonMedium onClick={() => setOpenAddModal(true)}>Create Section</ButtonMedium>
            </AddButtonHolder>
            <AddFeatured setFeaturedItems={setFeaturedItems} open={openAddModal} theme={theme} handleClose={() => setOpenAddModal(false)} />
        </Contnr>
    );
}

export default AccountFeaturedItems;