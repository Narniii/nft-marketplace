import { InputBase, useScrollTrigger } from "@mui/material";
import { Add, Additem, Notification, NotificationBing, PercentageCircle, Profile, SecuritySafe, UsdCoin } from "iconsax-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Colors } from "../components/design/Colors";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import AccountSupport from "../components/Profile/AccountSupportTab";
import FeaturedItems from "../components/Profile/FeaturedItems";
import NotificationSettings from "../components/Profile/NotificationsTab";
import OffersTab from "../components/Profile/OffersTab";
import ProfileDetails from "../components/Profile/ProfileDetailsTab";
import '../styles.css'

const SectionContainer = styled.div`

`;
const ProfileMenuTabs = styled.div`
border-right: ${({ theme }) => theme.profileBorder};

`;
const InfoContainer = styled.div`

`;
const BannerContainer = styled.div`
height:150px;
background:${Colors.gradientPurpleStandard};
border-radius:12px;
margin-bottom:60px;
position:relative;
`;
const LogoContainer = styled.div`
background:${Colors.gradientPurpleStandard};
border:1px solid;
border-color:${({ theme }) => theme.body};
border-radius:50%;
width:100px;
height:100px;
// overflow:hidden;
position:absolute;
left:5%;
bottom:-30%;
// z-index:1;
`
const Logo = styled.div`
width:100%;
height:100%;
position:relative;
`
const AddPicButt = styled.div`
border-radius: 12px;
background: ${({ theme }) => theme.addProPic};
border: ${({ theme }) => theme.addProPicBorder};
position:absolute;
right:-3%;
bottom:-3%;
height:38px;
width:38px;
// z-index:2;
display:flex;
justify-content:center;
align-items:center;
cursor:pointer;
`
const DetailsContainer = styled.div`
background: ${({ theme }) => theme.profilePageGradient};
border-radius: 24px;
display:flex;
flex-direction:column;
// justify-content:between;
overflow-y:scroll;
scrollbar-width: none;
height:80vh;
-ms-overflow-style: none;
@media screen and (max-width: 600px) {
    align-items:center;
}
  
&::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
}
`;
const ReadingTitle = styled.div`
background: ${({ theme }) => theme.body};
border-radius: 24px;
padding:15px 30px;
cursor:pointer;
display:flex;
&:active{
    background:${({ theme }) => theme.activeTab};
}
`
const Account = ({ theme, themeToggler }) => {
    const [value, setValue] = useState("profile")
    const [title, setTitle] = useState("Profile Details")
    useEffect(() => {
        if (value == "profile") {
            setTitle("Profile Details")
        } else if (value == "featured") {
            setTitle("Featured Items")

        } else if (value == "offers") {
            setTitle("Offer Settings")

        } else if (value == "notifications") {
            setTitle("Notification Settings")

        } else if (value == "support") {
            setTitle("Account Support")

        } else if (value == "earning") {
            setTitle("Earning")

        } else setValue("profile")
    }, [value])
    const handleSelect = (e) => {
        e.preventDefault()
        setValue(e.target.id)
    }
    return (
        <>
            <div className="pdng">
                <Navbar theme={theme} themeToggler={themeToggler} />
                <SectionContainer className="row my-4">
                    <ProfileMenuTabs className="d-none d-md-flex flex-column col-md-3 p-0">
                        <ReadingTitle className="menutab" onClick={handleSelect} id="profile" style={{ background: value == 'profile' && theme == 'light' ? `${Colors.gray1}` : value == 'profile' && theme == 'dark' ? `${Colors.dark4}` : 'inherit' }}><Profile />&nbsp;Profile</ReadingTitle>
                        <ReadingTitle className="menutab" onClick={handleSelect} id="featured" style={{ background: value == 'featured' && theme == 'light' ? `${Colors.gray1}` : value == 'featured' && theme == 'dark' ? `${Colors.dark4}` : 'inherit' }}><Additem />&nbsp;Featured Items</ReadingTitle>
                        <ReadingTitle className="menutab" onClick={handleSelect} id="notifications" style={{ background: value == 'notifications' && theme == 'light' ? `${Colors.gray1}` : value == 'notifications' && theme == 'dark' ? `${Colors.dark4}` : 'inherit' }}><Notification />&nbsp;Notifications</ReadingTitle>
                        <ReadingTitle className="menutab" onClick={handleSelect} id="offers" style={{ background: value == 'offers' && theme == 'light' ? `${Colors.gray1}` : value == 'offers' && theme == 'dark' ? `${Colors.dark4}` : 'inherit' }}><PercentageCircle />&nbsp;Offers</ReadingTitle>
                        <ReadingTitle className="menutab" onClick={handleSelect} id="support" style={{ background: value == 'support' && theme == 'light' ? `${Colors.gray1}` : value == 'support' && theme == 'dark' ? `${Colors.dark4}` : 'inherit' }}><SecuritySafe />&nbsp;Account Support</ReadingTitle>
                        <ReadingTitle className="menutab" onClick={handleSelect} id="earning" style={{ background: value == 'earning' && theme == 'light' ? `${Colors.gray1}` : value == 'earning' && theme == 'dark' ? `${Colors.dark4}` : 'inherit' }}><UsdCoin />&nbsp;Earnings</ReadingTitle>
                    </ProfileMenuTabs>



                    <InfoContainer className="d-flex flex-column col-12 col-md-9">
                        <h2 style={{ fontWeight: 600 }}>{title}</h2>
                        {value == "profile" ?
                            <BannerContainer><LogoContainer>
                                <Logo>
                                    <AddPicButt><Add /></AddPicButt>
                                </Logo>
                            </LogoContainer></BannerContainer> : undefined}
                        <DetailsContainer className="p-3">
                            {value == "profile" ? <ProfileDetails /> : value == "support" ? <AccountSupport theme={theme} /> : value == "featured" ? <FeaturedItems /> : value == "offers" ? <OffersTab /> : value == "notifications" ? <NotificationSettings theme={theme} /> : undefined}
                        </DetailsContainer>
                    </InfoContainer>
                </SectionContainer>
            </div>
            {/* <Footer /> */}
        </>
    );
}

export default Account;