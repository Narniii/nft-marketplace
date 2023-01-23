import Header from "../components/Home/Header";
import SlideSection from "../components/Home/SlideSection";
import Toggle from "../components/design/Toggler";
import TrendingSection from "../components/Home/TrendingSection";
import Footer from "../components/Footer";
import NotableCollections from "../components/Home/NotableCollections";
import BasicsSection from "../components/Home/BasicsSection";
import CategorySection from "../components/Home/BrowseCategory";

const Home = ({ theme, themeToggler }) => {
    return (
        <div className="container-fluid p-0 position-relative">
            <Header theme={theme} themeToggler={themeToggler} />
            <SlideSection theme={theme} />
            <TrendingSection theme={theme} />
            <NotableCollections theme={theme}/>
            <BasicsSection theme={theme}/>
            <CategorySection theme={theme}/>
            <Footer />
        </div>
    );
}

export default Home;