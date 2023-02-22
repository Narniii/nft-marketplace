import { ArrowDown2, Dribbble, Ethereum, Global, Instagram, More, Share, Star, TimerStart } from "iconsax-react";
import { Tab, Tabs } from "react-bootstrap";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import bannerPic from '../assets/profileBanner.svg'
import logoPic from '../assets/testpic.png'
import '../styles.css'
import { Colors } from "../components/design/Colors";
import CreatedTab from "../components/Profile/CreatedTab";
import ActivityTab from "../components/Profile/ActivityTab";
import FavoritedTab from "../components/Profile/FavoritedTab";
import FeaturedItems from "../components/Profile/FeaturedItems";
import Collected from "../components/Profile/CollectedTab";
import { Box, LinearProgress, Skeleton, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AUTH_API } from "../utils/data/auth_api";
import { BG_URL, PUBLIC_URL } from "../utils/utils";
import { API_CONFIG } from "../config";

const Banner = styled.div`
//   background-image: url(${bannerPic});
  background-size:cover;
  background-repeat:no-repeat;
  background-position:center;
  height:300px;
  position:relative;
  width:100%;
  @media screen and (max-width: 575px) {
    height:150px;
  }

`;
const Logo = styled.div`
//   background-image: url(${logoPic});
  background-size:cover;
  background-repeat:no-repeat;
  background-position:center;
  height:300px;
  width:300px;
  top:65%;
  left:32px;
  border:5px solid;
  border-color:${({ theme }) => theme.body};
  border-radius: 50%;
  @media screen and (max-width: 992px) {
    top:75%;
    height:170px;
    width:170px;

  }
  @media screen and (max-width: 768px) {
    height:170px;
    width:170px;
    left:24px;
    top:75%;

  }
  @media screen and (max-width: 575px) {
    height:100px;
    width:100px;
    left:16px;
    top:70%;

  }
`;
const Empty = styled.div`
height:200px;
width:300px;
// background-color:pink;
@media screen and (max-width: 992px) {
    height:70px;
    width:170px;
}
@media screen and (max-width: 768px) {
  height:70px;
  width:170px;
}
@media screen and (max-width: 575px) {
  height:50px;
  width:100px;
}
`;
const Cnt = styled.div`
width: calc(100% - 300px);
// background-color:blue;
@media screen and (max-width: 992px) {
    width: calc(100% - 170px);
}
@media screen and (max-width: 768px) {
    width: calc(100% - 170px);
}
@media screen and (max-width: 575px) {
    width: 100%;
}
`;
const Line = styled.div`
background: linear-gradient(90deg,#60606000 0%, #80808080 50%,#918A7A00 100%);
height:1px;
width:60%;
`;
const OwnerName = styled.span`
color: ${({ theme }) => theme.trendingSectionTitles};
font-weight:600;
`
const Subtitle = styled.span`
color: ${({ theme }) => theme.trendingSectionSubTitles};
font-weight:600;
`



const ProfilePage = ({ theme, themeToggler }) => {
    const { username } = useParams()
    console.log(window.location.hash.replace('#', ''))
    const apiCall = useRef(undefined)
    const [user, setUser] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [userLoading, setUserLoading] = useState(true)
    const [loadErr, setLoadErr] = useState(undefined)
    const [avatar, setAvatar] = useState(undefined)
    const [banner, setBanner] = useState(undefined)
    const [desLong, setDesLong] = useState(false)

    const navigate = useNavigate()
    const shorten = (str) => {
        if (str)
            return str.length > 10 ? str.substring(0, 7) + "..." : str;
        return 'undefined'
    }
    const shortenDes = (str) => {
        if (str)
            return str.length > 100 ? str.substring(0, 70) + "..." : str;
        return 'undefined'
    }
    const convertDate = (TSdate) => {
        const date = new Date(TSdate);
        const day = date.getDate()
        const month = date.toLocaleString('default', { month: 'short' });
        console.log(day);
        return <span>{month + day}</span>
    }

    const getUser = async () => {
        try {
            apiCall.current = AUTH_API.request({
                path: `/user/get/`,
                method: "post",
                body: { username: username },
            });
            let response = await apiCall.current.promise;
            console.log('uuuuseeeeeer', response)
            if (!response.isSuccess)
                throw response
            var AVATAR_PATH = response.data.avatar_path ? response.data.avatar_path.replace('root/NFTMarketplace-Backend/auth/media/', '') : undefined;
            var BANNER_PATH = response.data.banner_path ? response.data.banner_path.replace('root/NFTMarketplace-Backend/auth/media/', '') : undefined;
            var bg_AVATAR = BG_URL(PUBLIC_URL(`${API_CONFIG.AUTH_MEDIA_API_URL}${AVATAR_PATH}`))
            var bg_BANNER = BG_URL(PUBLIC_URL(`${API_CONFIG.AUTH_MEDIA_API_URL}${BANNER_PATH}`))
            console.log('banner', BANNER_PATH)
            setAvatar(bg_AVATAR)
            setBanner(bg_BANNER)
            setUser(response.data)


        }
        catch (err) {
            console.log(err)
            if (err.status == 404)
                navigate('/404')
            else if (err.status == 500) {
                setLoadErr("Internal server error occured, please try again later.")
            }
            // else {
            //     console.log(err, 'heeelllooooo ???')
            //     setLoadErr('something went wrong , please try again later')
            // }
            // setLoading(false)
        }
    }
    useEffect(() => {
        getUser()
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();

        }
    }, [])
    useEffect(() => {
        if (user)
            setUserLoading(false)
    }, [user])
    useEffect(() => {
        if (user || loadErr)
            setLoading(false)
    }, [user, loadErr])
    return (
        <>
            <div className="pdng">
                <Navbar theme={theme} themeToggler={themeToggler} />
            </div>
            {loading ? <LinearProgress color="secondary" sx={{ my: 55, mx: 5 }} /> :
                <>
                    {loadErr ? <Typography sx={{ color: `${Colors.primaryMain}`, textAlign: 'center', my: 55, mx: 5 }}>{loadErr}</Typography>
                        :
                        <>
                            {userLoading ?
                                <Skeleton variant="round" sx={{ borderRadius: "24px", height: "400px", width: "100%" }} /> :
                                <div className="d-flex flex-column p-0 m-0 justify-content-between">
                                    <Banner style={{ backgroundImage: banner ? banner : `${Colors.gradientPurpleStandard}` }}><Logo style={{ backgroundImage: avatar ? avatar : `${Colors.gradientPurpleStandard}` }} className="position-absolute" /></Banner>
                                    <div className="pdng d-flex justify-content-between justify-content-sm-start w-100">
                                        <Empty />
                                        <div className="mt-2 align-items-center d-flex d-sm-none" style={{ height: "25px" }}>
                                            <div style={{ borderRight: `dashed 1px ${Colors.gray3}`, height: "auto" }}><Instagram style={{ cursor: "pointer" }} size="20" className="m-1" /><Dribbble style={{ cursor: "pointer" }} size="20" className="m-1" /><Global style={{ cursor: "pointer" }} size="20" className="m-1" /></div>
                                            <div ><Share style={{ cursor: "pointer" }} size="20" className="m-1" /><More style={{ cursor: "pointer" }} size="20" className="m-1" /></div>
                                        </div>
                                        <Cnt className="mt-2 mt-md-3 ps-2 pt-2 ms-1 mx-md-0 d-none d-sm-flex flex-column justify-content-start">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h5 style={{ fontWeight: 600 }}>{user.username}</h5>
                                                <div className="align-items-center d-flex" style={{ height: "25px" }}>
                                                    <div style={{ borderRight: `dashed 1px ${Colors.gray3}`, height: "auto" }}><Instagram style={{ cursor: "pointer" }} size="20" className="m-1" /><Dribbble style={{ cursor: "pointer" }} size="20" className="m-1" /><Global style={{ cursor: "pointer" }} size="20" className="m-1" /></div>
                                                    <div ><Share style={{ cursor: "pointer" }} size="20" className="m-1" /><More style={{ cursor: "pointer" }} size="20" className="m-1" /></div>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-start align-items-center">
                                                <p className="my-0 d-flex align-items-center me-2">
                                                    <Ethereum color={Colors.recommendedDark} />
                                                    {shorten(user.user_id)}
                                                </p>
                                                <p className="my-0 d-flex align-items-center ms-2">
                                                    <TimerStart />
                                                    Joined &nbsp; {convertDate(user.reg_date.$date)}
                                                </p>
                                            </div>
                                            <p className="m-0">{desLong ? <>{user.description}</> : <>{shortenDes(user.description)}</>}</p>
                                            {user.description && user.description.length > 100 && !desLong ?
                                                <p style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => setDesLong(true)}>See More <ArrowDown2 size="16" /></p> : undefined}
                                        </Cnt>
                                    </div>
                                    <Cnt className="pdng mt-2 d-flex d-sm-none flex-column">
                                        <h5 style={{ fontWeight: 600 }}>{user.username}</h5>
                                        <div className="d-flex justify-content-start align-items-center">
                                            <p className="my-0 d-flex align-items-center me-2">
                                                <Ethereum color={Colors.recommendedDark} />
                                                {shorten(user.user_id)}
                                            </p>
                                            <p className="my-0 d-flex align-items-center ms-2">
                                                <TimerStart />
                                                Joined &nbsp; {convertDate(user.reg_date.$date)}
                                            </p>
                                        </div>
                                        <p className="m-0">{desLong ? <>{user.description}</> : <>{shortenDes(user.description)}</>}</p>
                                        {user.description && user.description.length > 100 && !desLong ?
                                            <p style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => setDesLong(true)}>See More <ArrowDown2 size="16" /></p> : undefined}
                                    </Cnt>
                                </div>
                            }
                            <Box sx={{ marginTop: { xs: '48px', sm: "68px" }, marginBottom: { xs: '48px', sm: "200px" } }} className="pdng">
                                <Tabs
                                    defaultActiveKey={window.location.hash ? window.location.hash.replace('#', '') : "featured"}
                                    // className="mb-3 tab-scroll"
                                    className="m-0 mb-3 tab-scroll"
                                    style={{
                                        color: theme === 'light' ? "#5D3393" : "#DABDDF",
                                        borderBottom: "none",
                                        width: "max-content"
                                        // borderColor: theme === 'light' ? "#5D3393" : "#DABDDF",
                                    }}
                                >
                                    <Tab eventKey="featured" title="Featured">
                                        <FeaturedItems theme={theme} />
                                    </Tab>
                                    <Tab eventKey="collected" title="Collected">
                                        <Collected userWallet={user.user_id} theme={theme} />
                                    </Tab>
                                    <Tab eventKey="created" title="Created">
                                        <CreatedTab userWallet={user.user_id} theme={theme} />
                                    </Tab>
                                    <Tab eventKey="activity" title="Activity" >
                                        <ActivityTab userWallet={user.user_id} theme={theme} />
                                    </Tab>
                                    <Tab eventKey="favorited" title="Favorited">
                                        <FavoritedTab userWallet={user.user_id} theme={theme} />
                                    </Tab>
                                    <Tab eventKey="More" title={<span>More<ArrowDown2 size="12" /></span>}>

                                        {/* style={{ color: theme == 'light' ? Colors.gray7 : Colors.gray1, }} */}
                                    </Tab>

                                </Tabs>
                            </Box>
                        </>
                    }
                </>
            }
            <Footer />
        </>
    );
}

export default ProfilePage;