import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";

const CollectionSingle = ({ theme, themeToggler }) => {
    return (
        <>
            <div style={{ padding: "0 32px" }}>
                <Navbar theme={theme} themeToggler={themeToggler} />
                <div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CollectionSingle;