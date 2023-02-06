import { ButtonLarge, ButtonOutline } from "../design/Buttons";
import OfferCard from "./OfferCard";

const OffersTab = () => {
    return (
        <>
            <div className="col-12 col-sm-9 col-md-8">
                <div className="d-flex flex-column ">
                    <p>Set a minimum offer for collections to ignore low offers</p>
                    <ButtonOutline className="my-4">View My Offers</ButtonOutline>
                    <OfferCard />
                    <OfferCard />
                    <OfferCard />
                    <OfferCard />
                    <OfferCard />
                    <OfferCard />
                    <div className="my-5"><ButtonLarge>Save</ButtonLarge></div>
                </div>
            </div>
        </>
    );
}

export default OffersTab;