import { Status, Timer } from "../components/Drops/states";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import '../styles.css'
const Drops = ({ theme, themeToggler }) => {
    return (<>
        <div className="pdng">
            <Navbar theme={theme} themeToggler={themeToggler} />
            <Status status={"minting-now"} />
            <Status status={"mint-soldout"} />
            <Status status={"mint-ended"} />
            <Timer />
        </div>
        <Footer />
    </>);
}

export default Drops;