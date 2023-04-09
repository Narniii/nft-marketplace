import { InputBase, LinearProgress, useScrollTrigger } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { Add, Additem, Notification, NotificationBing, PercentageCircle, Profile, SecuritySafe, UsdCoin } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ButtonLarge, ButtonOutline } from "../components/design/Buttons";
import { Colors } from "../components/design/Colors";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import WalletConnect from "../components/Navbar/WalletConnect";
import AccountFeaturedItems from "../components/Profile/AccountFeaturedItems";
import AccountSupport from "../components/Profile/AccountSupportTab";
import Earnings from "../components/Profile/EarningsTab";
import FeaturedItems from "../components/Profile/FeaturedItems";
import NotificationSettings from "../components/Profile/NotificationsTab";
import OffersTab from "../components/Profile/OffersTab";
import ProfileDetails from "../components/Profile/ProfileDetailsTab";
import WalletConnectModal from "../components/wallet/WalletConnectModal";
import { API_CONFIG } from "../config";
import '../styles.css'
import { AUTH_API } from "../utils/data/auth_api";
import { BG_URL, PUBLIC_URL } from "../utils/utils";

const SectionContainer = styled.div`
// border:1px solid red;

`;
const ProfileMenuTabs = styled.div`
border-right: ${({ theme }) => theme.profileBorder};

`;
const InfoContainer = styled.div`

`;
const BannerContainer = styled.label`
height:150px;
background:${Colors.gradientPurpleStandard};
border-radius:12px;
// margin-bottom:60px;
position:relative;
background-size:cover;
background-repeat:no-repeat;
background-position:center;

`;
const LogoContainer = styled.label`
background:${Colors.gradientPurpleStandard};
border:1px solid;
border-color:${({ theme }) => theme.body};
border-radius:50%;
width:100px;
height:100px;
// overflow:hidden;
background-size:cover;
background-repeat:no-repeat;
background-position:center;
position:absolute;
left:20%;
top:-50%;
// z-index:1;
`
const RelativeLogoContainer = styled.div`
position:relative;
width:100px;
height:100px;

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
const AddBannerButt = styled.div`
border-radius: 12px;
background: ${({ theme }) => theme.addProPic};
border: ${({ theme }) => theme.addProPicBorder};
position:absolute;
right:8px;
bottom:8px;
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
// justify-content:start;
overflow-y:scroll;
scrollbar-width: none;
height:80vh;
-ms-overflow-style: none;
@media screen and (max-width: 600px) {
    align-items:start;
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
    const globalUser = useSelector(state => state.userReducer);
    const [value, setValue] = useState(window.location.hash ? window.location.hash.replace('#', '') : "profile")
    const [title, setTitle] = useState("Profile Details")
    const [loadErr, setLoadErr] = useState(undefined)
    const [walletMenu, setWalletMenu] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [avatar, setAvatar] = useState(undefined)
    const [banner, setBanner] = useState(undefined)
    const [avatarError, setAvatarError] = useState(undefined)
    const [bannerError, setBannerError] = useState(undefined)
    const [user, setUser] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [apiLoading, setApiLoading] = useState(false)
    const [walletConnect, setWalletConnect] = useState(false)
    const apiCall = useRef(undefined)

    useEffect(() => {
        getUser()
        return () => {
            if (apiCall.current != undefined)
                apiCall.current.cancel();

        }
    }, [])
    useEffect(() => {
        if (user)
            setLoading(false)
    }, [user])
    const getUser = async () => {
        try {
            apiCall.current = AUTH_API.request({
                path: `/user/get/`,
                method: "post",
                body: { username: globalUser.username },
            });
            let response = await apiCall.current.promise;
            console.log('uuuuseeeeeer', response)
            if (!response.isSuccess)
                throw response
            setUser(response.data)
            console.log(BANNER_PATH)
            if (response.data.avatar_path) {
                var AVATAR_PATH = response.data.avatar_path ? response.data.avatar_path.replace('root/dortzio/auth/media/', '') : undefined;
                var bg_AVATAR = BG_URL(PUBLIC_URL(`${API_CONFIG.AUTH_MEDIA_API_URL}${AVATAR_PATH}`))
                setAvatar(bg_AVATAR)
            }
            if (response.data.banner_path) {
                var BANNER_PATH = response.data.banner_path ? response.data.banner_path.replace('root/dortzio/auth/media/', '') : undefined;
                var bg_BANNER = BG_URL(PUBLIC_URL(`${API_CONFIG.AUTH_MEDIA_API_URL}${BANNER_PATH}`))
                setBanner(bg_BANNER)
            }
        }
        catch (err) {
            if (err.status == 404)
                setLoadErr("No user found.")
            else if (err.status == 500) {
                setLoadErr("Internal server error occured, please try again later.")
            }
            // else {
            //     setLoadErr('something went wrong , please try again later')
            // }
            setLoading(false)
        }
    }
    const walletDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setWalletMenu({ ...walletMenu, [anchor]: open });
    };
    const onLogoChange = (e) => {
        e.preventDefault()
        var u = { ...user };
        if (e.target.files && e.target.files[0] && e.target.files[0].type.indexOf("image") !== -1) {
            setAvatarError(undefined)
            u.avatar = e.target.files[0];
            const [file] = e.target.files;
            // setAvatarChanged(true)
            let avtTemp = URL.createObjectURL(file)
            // setAvatar();
            console.log('logo changed', file)
            setAvatar(`url(${avtTemp})`)
            setUser(u)
        }
        else {
            u[e.target.name] = undefined;
            setUser(u)
            setAvatar(undefined)
            setAvatarError("Selected file is not an image")
        }
    }

    const onBannerChange = (e) => {
        e.preventDefault()
        var u = { ...user };
        if (e.target.files && e.target.files[0] && e.target.files[0].type.indexOf("image") !== -1) {
            setBannerError(undefined)
            u.banner = e.target.files[0];
            const [file] = e.target.files;
            let bnTemp = URL.createObjectURL(file)
            console.log('banner changed', file)
            setBanner(`url(${bnTemp})`)
            setUser(u)
        }
        else {
            u[e.target.name] = undefined;
            setUser(u)
            setBanner(undefined)
            setBannerError("Selected file is not an image")
        }
    }
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

    const { active, account, library, connector, activate, deactivate } = useWeb3React()

    return (
        <>
            <div className="pdng">
                <Navbar theme={theme} themeToggler={themeToggler} />

                {globalUser.isLoggedIn && active ?
                    <>
                        {loading ?
                            <LinearProgress color="secondary" sx={{ my: 55, mx: 5 }} />
                            :
                            <>
                                <SectionContainer className="row my-4">
                                    <ProfileMenuTabs className="d-none d-lg-flex flex-column col-lg-3 p-0">
                                        <ReadingTitle className="menutab" onClick={handleSelect} id="profile" style={{ background: value == 'profile' && theme == 'light' ? `${Colors.gray1}` : value == 'profile' && theme == 'dark' ? `${Colors.dark4}` : 'inherit' }}><Profile />&nbsp;Profile</ReadingTitle>
                                        <ReadingTitle className="menutab" onClick={handleSelect} id="featured" style={{ background: value == 'featured' && theme == 'light' ? `${Colors.gray1}` : value == 'featured' && theme == 'dark' ? `${Colors.dark4}` : 'inherit' }}><Additem />&nbsp;Featured Items</ReadingTitle>
                                        <ReadingTitle className="menutab" onClick={handleSelect} id="notifications" style={{ background: value == 'notifications' && theme == 'light' ? `${Colors.gray1}` : value == 'notifications' && theme == 'dark' ? `${Colors.dark4}` : 'inherit' }}><Notification />&nbsp;Notifications</ReadingTitle>
                                        <ReadingTitle className="menutab" onClick={handleSelect} id="offers" style={{ background: value == 'offers' && theme == 'light' ? `${Colors.gray1}` : value == 'offers' && theme == 'dark' ? `${Colors.dark4}` : 'inherit' }}><PercentageCircle />&nbsp;Offers</ReadingTitle>
                                        <ReadingTitle className="menutab" onClick={handleSelect} id="support" style={{ background: value == 'support' && theme == 'light' ? `${Colors.gray1}` : value == 'support' && theme == 'dark' ? `${Colors.dark4}` : 'inherit' }}><SecuritySafe />&nbsp;Account Support</ReadingTitle>
                                        <ReadingTitle className="menutab" onClick={handleSelect} id="earning" style={{ background: value == 'earning' && theme == 'light' ? `${Colors.gray1}` : value == 'earning' && theme == 'dark' ? `${Colors.dark4}` : 'inherit' }}><UsdCoin />&nbsp;Earnings</ReadingTitle>
                                    </ProfileMenuTabs>
                                    <InfoContainer className="d-flex flex-column col-12 col-lg-9">
                                        <h2 style={{ fontWeight: 600 }}>{title}</h2>
                                        {value == "profile" ?
                                            <>
                                                <BannerContainer for="banner" onChange={onBannerChange} style={{ backgroundImage: banner ? banner : `${Colors.gradientPurpleStandard}` }}>
                                                    <input type="file" name="banner" id="banner" hidden />
                                                    <AddBannerButt><Add /></AddBannerButt>
                                                </BannerContainer>
                                                <RelativeLogoContainer>
                                                    <LogoContainer for="avatar" onChange={onLogoChange} style={{ backgroundImage: avatar ? avatar : `${Colors.gradientPurpleStandard}` }}>
                                                        {console.log('avatar', avatar, 'banner', banner)}
                                                        <input type="file" name="avatar" id="avatar" hidden />
                                                        <Logo>
                                                            <AddPicButt><Add /></AddPicButt>
                                                        </Logo>
                                                    </LogoContainer>
                                                </RelativeLogoContainer>


                                            </>
                                            : undefined}
                                        <DetailsContainer className="p-3">
                                            {value == "profile" ? <ProfileDetails globalUser={globalUser} user={user} setUser={setUser} avatar={avatar} banner={banner} /> : value == "support" ? <AccountSupport theme={theme} /> : value == "featured" ? <AccountFeaturedItems theme={theme} /> : value == "offers" ? <OffersTab /> : value == "notifications" ? <NotificationSettings theme={theme} /> : value == "earning" ? <Earnings theme={theme} /> : undefined}
                                        </DetailsContainer>
                                    </InfoContainer>
                                </SectionContainer>
                            </>
                        }</>
                    :
                    <SectionContainer className="d-flex my-5 justify-content-center align-items-center">
                        <ButtonLarge onClick={() => { setWalletConnect(!walletConnect) }}>connect wallet</ButtonLarge>
                        <WalletConnectModal open={walletConnect} handleClose={() => setWalletConnect(false)} theme={theme} />
                    </SectionContainer>
                }
            </div>
            {/* <Footer /> */}
        </>
    );
}

export default Account;