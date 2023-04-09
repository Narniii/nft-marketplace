import Modal from '@mui/material/Modal';
import React, { useEffect, useRef, useState } from "react";
import { Box, Button, ClickAwayListener, Divider, Drawer, Hidden, keyframes, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Popper, Typography } from "@mui/material";
import { ArrowLeft2, ArrowRight2, ArrowUp2, Bag2, Calendar, CardSend, Chart1, CloseSquare, DocumentText, Edit2, EmojiNormal, GlobalSearch, HambergerMenu, Heart, Logout, LogoutCurve, Notification, Profile, ProfileDelete, SearchNormal1, Setting5, Star1, Trash, Wallet2, Youtube } from "iconsax-react";
import '../../styles.css'
import styled from "styled-components";
import { Colors } from "../design/Colors";
// import { styled } from "@mui/system";
import { ButtonLarge, ButtonMedium } from "../design/Buttons";
import lightBG from '../../assets/lightNoblur.svg'
// import lightBG from '../../assets/navMenuBg-light.svg'
import darkBG from '../../assets/darkNoblur.svg'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { logOutUser } from '../../redux/actions';
import WalletConnectModal from '../wallet/WalletConnectModal';
import dayMode from '../../assets/daymode.svg'
import nightMode from '../../assets/nightmode.svg'

const showUp = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const SwitchS = styled.label`
position: relative;
display: inline-block;
width: 55px;
height: 30px;
`
const SwitchInput = styled.input`
opacity: 0;
width: 0;
height: 0;
`
const Slide = styled.span`
position: absolute;
cursor: pointer;
top: 0;
left: 0;
right: 0;
bottom: 0;
/* background-color: #ccc; */
background: #F9F9F9;
-webkit-transition: .4s;
transition: .4s;
border: 0.5px solid #D9D9D9;
&:before{
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  // left: 1px;
  // right: 1px;
  bottom: 1px;
  top: 1px;
  background:${({ theme }) => theme.toggleBGLD};
  /* background: inherit; */
  -webkit-transition: .4s;
  transition: .4s;
  border-radius:50px;
}
`
const themeHere = window.localStorage.getItem('theme');
const DesktopStyle = {
  transform: 'translateY(26px)',
  borderRadius: "24px",
  width: 400,
  bgcolor: themeHere == 'light' ? "#F9F9F9" : "#272448",
  p: 4,
  boxShadow: themeHere == 'light' ? '0px 3px 10px rgba(0, 0, 0, 0.07)' : "unset",
};

const TabletStyle = {
  width: '100%',
  height: '100%',
  p: 4,
  bgcolor: themeHere == 'light' ? "#F9F9F9" : "#272448",
};

const MobileStyle = {
  width: '100%',
  height: '100%',
  p: 4,
  bgcolor: themeHere == 'light' ? "#F9F9F9" : "#272448",
};
const NotifDot = styled.div`
  height:20px;
  // width:20px;
  padding:0px 5px;
  border-radius:50%;
  // top:0;
  right:0;
  background-color: ${Colors.errorLight};
  color: ${Colors.errorDark};
  font-size:12px;
  display:flex;
  justify-content:center;
`


const NavMenu = ({ state, toggleDrawer, mobOpen, desOpen, anchorEl, handleClose, theme, anchor, themeToggler, notifications }) => {
  // const { globalUser } = useSelector(state => state);
  // console.log('salalalala',globalUser)
  const globalUser = useSelector(state => state.userReducer);
  const [selected, setSelected] = useState(undefined);
  const { active, account, library, connector, activate, deactivate } = useWeb3React()
  const dispatch = useDispatch();
  const logOut = () => dispatch(logOutUser());
  const [walletConnect, setWalletConnect] = useState(false)
  async function disconnect() {
    try {
      deactivate()
      logOut()
      localStorage.removeItem("lastActive")
      localStorage.removeItem('account')
    } catch (ex) {
      console.log(ex)
    }
  }

  const toggleSelected = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setSelected(event.target.id);
    console.log(event.target.id)
  };


  // tablet & mobile menu 
  const list = (anchor) => (
    <Box
      sx={{
        border: theme == 'light' ? "0.2px solid #e6e6e6" : "0.2px solid #332E5F",
        height: "100%", bgcolor: theme == 'light' ? "#ffffff" : "#272448",
        color: theme == 'light' ? "#333333" : "#e6e6e6", width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300, overflow: "hidden",
        borderTopLeftRadius: anchor == 'right' ? "24px" : 0, borderBottomLeftRadius: anchor == 'right' ? "24px" : 0

      }}
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className="d-flex flex-column justify-content-between"
    >
      <div>
        <Box className='d-flex flex-column justify-content-start'
          sx={{ height: "150px", backgroundOrigin: "center", backgroundSize: "contain", width: "100%", backgroundRepeat: "no-repeat", backgroundImage: theme == 'light' ? `url(${lightBG})` : `url(${darkBG})`, }}
        >
          <Box className='d-flex justify-content-between p-3 align-items-center align-items-center'>
            <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>Menu</Typography>
            <CloseSquare className='d-none d-sm-flex' onClick={toggleDrawer(anchor, false)} style={{ cursor: "pointer" }} />
            <CloseSquare className='d-flex d-sm-none' onClick={handleClose} style={{ cursor: "pointer" }} />
          </Box>
        </Box>
        <>
          {selected == 'languages' ?
            <>
              <Box sx={{ cursor: "pointer" }} onClick={() => setSelected(undefined)} className='d-flex justify-content-between p-3 align-items-center'>
                <Box className='d-flex align-items-center'><ArrowLeft2 size="18" className='me-1' />languages</Box>
              </Box>
              <Box className='d-flex justify-content-between p-3 align-items-center'>
                <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />English</Box>
                <ArrowRight2 size="18" />
              </Box>
              <Box className='d-flex justify-content-between p-3 align-items-center'>
                <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />German</Box>
                <ArrowRight2 size="18" />
              </Box>
            </>
            :
            selected == 'stats' ?
              <>
                <Box sx={{ cursor: "pointer" }} onClick={() => setSelected(undefined)} className='d-flex justify-content-between p-3 align-items-center'>
                  <Box className='d-flex align-items-center'><ArrowLeft2 size="18" className='me-1' />Stats</Box>
                </Box>
                <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + "stats"} className='d-flex justify-content-between p-3 align-items-center'>
                  <Box className='d-flex align-items-center'>Rankings</Box>
                </Link>
                <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + "stats/activity"} className='d-flex justify-content-between p-3 align-items-center'>
                  <Box className='d-flex align-items-center'>Activity</Box>
                </Link>
              </>
              :
              selected == 'drops' ?
                <>
                  <Box sx={{ cursor: "pointer" }} onClick={() => setSelected(undefined)} className='d-flex justify-content-between p-3 align-items-center'>
                    <Box className='d-flex align-items-center'><ArrowLeft2 size="18" className='me-1' />Drops</Box>
                  </Box>
                  <Box className='d-flex justify-content-between p-3 align-items-center'>
                    <Box className='d-flex align-items-center'>coming soon</Box>
                  </Box>
                  <Box className='d-flex justify-content-between p-3 align-items-center'>
                    <Box className='d-flex align-items-center'>coming soon</Box>
                  </Box>
                </>
                :
                selected == 'account' ?
                  <>
                    <Box sx={{ cursor: "pointer" }} onClick={() => setSelected(undefined)} className='d-flex justify-content-between p-3 align-items-center'>
                      <Box className='d-flex align-items-center'><ArrowLeft2 size="18" className='me-1' />Account</Box>
                    </Box>
                    {globalUser.isLoggedIn && active ?
                      <Link to={'/' + 'profile/' + globalUser.username} style={{ textDecoration: "none", color: "inherit" }}><MenuItem className='p-3'>profile</MenuItem></Link> : <MenuItem className='p-3' onClick={() => { setWalletConnect(!walletConnect) }}>profile</MenuItem>}
                    {globalUser.isLoggedIn && active ?
                      <Link to={'/' + 'profile/' + globalUser.username + '/#favorited'} style={{ textDecoration: "none", color: "inherit" }}><MenuItem className='p-3'>Favorites</MenuItem></Link> : <MenuItem onClick={() => { setWalletConnect(!walletConnect) }} className='p-3'>Favorites</MenuItem>}
                    {/* <MenuItem className='p-3'><Heart className='me-2' />Favorites</MenuItem> */}
                    {globalUser.isLoggedIn && active ?
                      <Link to={'/' + 'stats' + '/#watchlist'} style={{ textDecoration: "none", color: "inherit" }}><MenuItem className='p-3'>Watchlist</MenuItem></Link> : <MenuItem onClick={() => { setWalletConnect(!walletConnect) }} className='p-3'>Watchlist</MenuItem>}
                    {globalUser.isLoggedIn && active ?
                      <Link to={'/' + 'my-collections'} style={{ textDecoration: "none", color: "inherit" }}><MenuItem className='p-3'>My Collections</MenuItem></Link>
                      : <MenuItem onClick={() => { setWalletConnect(!walletConnect) }} className='p-3'>My Collections</MenuItem>}
                    {globalUser.isLoggedIn && active ?
                      <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'asset/create'}>
                        <MenuItem className='p-3'>create</MenuItem>
                      </Link> :
                      <MenuItem className='p-3' onClick={() => { setWalletConnect(!walletConnect) }} >create</MenuItem>
                    }
                    {globalUser.isLoggedIn && active ?
                      <Link style={{ textDecoration: "none", color: "inherit" }}>
                        <Box onClick={toggleSelected} id="account-setting" className='d-flex justify-content-between p-3 align-items-center'>
                          <Box onClick={toggleSelected} id="account-setting" className='d-flex align-items-center'>Account Setting</Box>
                          <ArrowRight2 size="18" />
                        </Box>
                      </Link>
                      :
                      <MenuItem onClick={() => { setWalletConnect(!walletConnect) }} className='p-3 d-flex justify-content-between'><div className='d-flex'>Account Settings</div></MenuItem>
                    }
                  </>
                  :
                  selected == "account-setting" ?
                    <>
                      <Box sx={{ cursor: "pointer" }} onClick={() => setSelected('account')} className='d-flex justify-content-between p-3 align-items-center'>
                        <Box className='d-flex align-items-center'><ArrowLeft2 size="18" className='me-1' />Account Setting</Box>
                      </Box>
                      <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'account/setting/#profile'}>
                        <Box className='d-flex justify-content-between p-3 align-items-center'>
                          <Box className='d-flex align-items-center'>Profile</Box>
                        </Box>
                      </Link>
                      <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'account/setting/#featured'}>
                        <Box className='d-flex justify-content-between p-3 align-items-center'>
                          <Box className='d-flex align-items-center'>Featured</Box>
                        </Box>
                      </Link>
                      <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'account/setting/#offers'}>
                        <Box className='d-flex justify-content-between p-3 align-items-center'>
                          <Box className='d-flex align-items-center'>Offers</Box>
                        </Box>
                      </Link>
                      <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'account/setting/#notifications'}>
                        <Box className='d-flex justify-content-between p-3 align-items-center'>
                          <Box className='d-flex align-items-center'>Notifications</Box>
                        </Box>
                      </Link>
                      <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'account/setting/#support'}>
                        <Box className='d-flex justify-content-between p-3 align-items-center'>
                          <Box className='d-flex align-items-center'>Account Support</Box>
                        </Box>
                      </Link>
                      <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'account/setting/#earning'}>
                        <Box className='d-flex justify-content-between p-3 align-items-center'>
                          <Box className='d-flex align-items-center'>Earnings</Box>
                        </Box>
                      </Link>

                    </>
                    :
                    <>
                      {globalUser.isLoggedIn && active ?
                        <>
                          <Box onClick={toggleSelected} id="account" className='d-flex justify-content-between p-3 align-items-center'>
                            <Box className='d-flex align-items-center'><Profile size="18" className='me-2' />Account</Box>
                            <ArrowRight2 size="18" />
                          </Box>
                          <Link to="/explore" style={{ textDecoration: "none", color: "inherit" }}>
                            <Box className='d-flex justify-content-between p-3 align-items-center'>
                              <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />Explore</Box>
                              <ArrowRight2 size="18" />
                            </Box>
                          </Link>
                          <Box onClick={toggleSelected} id="drops" className='d-flex justify-content-between p-3 align-items-center'>
                            <Box className='d-flex align-items-center'><Calendar size="18" className='me-2' />Drops</Box>
                            <ArrowRight2 size="18" />
                          </Box>
                          <Box onClick={toggleSelected} id="stats" className='d-flex justify-content-between p-3 align-items-center'>
                            <Box className='d-flex align-items-center'><Chart1 size="18" className='me-2' />Stats</Box>
                            <ArrowRight2 size="18" />
                          </Box>
                          <Link to="/asset/create" style={{ textDecoration: "none", color: "inherit" }}>
                            <Box className='d-flex justify-content-between p-3 align-items-center'>
                              <Box className='d-flex align-items-center'><Edit2 size="18" className='me-2' />Create</Box>
                            </Box>
                          </Link>
                          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                            <Box className='d-flex justify-content-between p-3 align-items-center'>
                              <Box className='d-flex align-items-center'><DocumentText size="18" className='me-2' />Resources</Box>
                              <ArrowRight2 size="18" />
                            </Box>
                          </Link>
                        </>
                        :
                        <>
                          <Link to="/explore" style={{ textDecoration: "none", color: "inherit" }}>
                            <Box className='d-flex justify-content-between p-3 align-items-center'>
                              <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />Explore</Box>
                              <ArrowRight2 size="18" />
                            </Box>
                          </Link>
                          <Box onClick={toggleSelected} id="drops" className='d-flex justify-content-between p-3 align-items-center'>
                            <Box className='d-flex align-items-center'><Calendar size="18" className='me-2' />Drops</Box>
                            <ArrowRight2 size="18" />
                          </Box>
                          <Box onClick={toggleSelected} id="stats" className='d-flex justify-content-between p-3 align-items-center'>
                            <Box onClick={toggleSelected} id="stats" className='d-flex align-items-center'><Chart1 size="18" className='me-2' />Stats</Box>
                            <ArrowRight2 onClick={toggleSelected} id="stats" size="18" />
                          </Box>
                          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                            <Box className='d-flex justify-content-between p-3 align-items-center'>
                              <Box className='d-flex align-items-center'><DocumentText size="18" className='me-2' />Resources</Box>
                              <ArrowRight2 size="18" />
                            </Box>
                          </Link>
                        </>}
                      {/* <Link style={{ textDecoration: "none", color: "inherit" }}> */}
                      <Box onClick={toggleSelected} id="languages" className='d-flex justify-content-between p-3 align-items-center'>
                        <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />Languages</Box>
                        <ArrowRight2 size="18" />
                      </Box>
                      {/* </Link> */}
                      {globalUser.isLoggedIn && active ?
                        <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'notifications'}>
                          <Box id="notifications" className='d-flex justify-content-between p-3 align-items-center'>
                            <Box className='d-flex align-items-center'><Notification size="18" className='me-2' />Notifications
                            </Box>
                            {notifications.length > 0 ? <NotifDot className='ms-3'>{notifications.length}</NotifDot> : undefined}
                          </Box>
                        </Link> : undefined}

                      {globalUser.isLoggedIn && active ?
                        <Box className='d-flex justify-content-between p-3 align-items-center' sx={{ cursor: "pointer" }}>
                          <Box className='d-flex align-items-center' onClick={disconnect}><LogoutCurve className='me-2' />Logout</Box>
                        </Box>
                        : undefined}

                    </>}
        </>
      </div>
      <div>
        {globalUser.isLoggedIn && active ? undefined :
          <div className='px-3'>
            <ButtonMedium onClick={() => setWalletConnect(true)}>Connect Wallet</ButtonMedium>
          </div>}
        <Box className='d-flex justify-content-between align-items-center px-3' sx={{ marginTop: "12px", height: '70px', background: theme == 'light' ? 'linear-gradient(96.14deg, #FFFFFF 19.61%, #E6F1FF 99.09%)' : '#332E5F' }}>
          <div className='d-flex'>
            <p className='m-0 me-2'>{theme == 'light' ? 'light mode' : 'night mode'}</p>
            <SwitchS className="switch">
              <SwitchInput type="checkbox" checked={theme == 'light' ? true : false} onChange={themeToggler} />
              <Slide className="sliderMenu" ></Slide>
            </SwitchS>
          </div>
          <img src={theme == 'light' ? dayMode : nightMode} width="50px" height="50px" />
        </Box>
      </div>
    </Box>
  );


  return (
    <>
      {/* desktop menu */}
      <Drawer
        // BackdropProps={{ invisible: true }}
        PaperProps={{
          elevation: 0, sx: {
            backgroundColor: "transparent",
            top: { xs: '56px', sm: '84px' },
            right: { xs: '16px', sm: '32px' },
            //  transform: { xs: 'translateY(-16px,56px)', sm: 'translate(-32px,84px)' },
          }
        }}
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
        disableScrollLock={true}
        className="d-none d-lg-flex justify-content-end"
      >
        <Box sx={{
          // transform: { xs: 'translateY(-16px,56px)', sm: 'translate(-32px,84px)' },
          borderRadius: "24px",
          width: 432,
          height: "auto",
          // bgcolor: theme == 'light' ? "#ffffff" : "#272448",
          p: 0,
          overflow: "hidden",
          boxShadow: theme == 'light' ? '0px 3px 10px rgba(0, 0, 0, 0.07)' : "unset",
          alignItems: 'end',
        }}
          className="d-flex flex-column">




          <Box sx={{
            border: theme == 'light' ? "0.2px solid #e6e6e6" : "0.2px solid #332E5F",
            // transform: 'translate(-32px,30px)',
            borderRadius: "24px",
            width: 400,
            bgcolor: theme == 'light' ? "#ffffff" : "#272448",
            p: 0,
            overflow: "hidden",
            boxShadow: theme == 'light' ? '0px 3px 10px rgba(0, 0, 0, 0.07)' : "unset",
            animation: `${showUp} 200ms ease`,
            color: theme == 'light' ? "#333333" : "#e6e6e6"
          }}
            className="d-flex flex-column">
            {selected == 'languages' ?
              <>
                <Box sx={{ cursor: "pointer" }} onClick={() => setSelected(undefined)} className='d-flex justify-content-between p-3 align-items-center'>
                  <Box className='d-flex align-items-center'><ArrowLeft2 size="18" className='me-1' />languages</Box>
                </Box>
                <Box className='d-flex justify-content-between p-3 align-items-center'>
                  <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />English</Box>
                  <ArrowRight2 size="18" />
                </Box>
                <Box className='d-flex justify-content-between p-3 align-items-center'>
                  <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />German</Box>
                  <ArrowRight2 size="18" />
                </Box>
              </> :
              <>
                {globalUser.isLoggedIn && active ?
                  <Link to={'/' + 'profile/' + globalUser.username} style={{ textDecoration: "none", color: "inherit" }}><MenuItem className='p-3'><Profile className='me-2' />profile</MenuItem></Link> : <MenuItem className='p-3' onClick={() => { setWalletConnect(!walletConnect) }}><Profile className='me-2' />profile</MenuItem>}
                {globalUser.isLoggedIn && active ?
                  <Link to={'/' + 'profile/' + globalUser.username + '/#favorited'} style={{ textDecoration: "none", color: "inherit" }}><MenuItem className='p-3'><Heart className='me-2' />Favorites</MenuItem></Link> : <MenuItem onClick={() => { setWalletConnect(!walletConnect) }} className='p-3'><Heart className='me-2' />Favorites</MenuItem>}
                {/* <MenuItem className='p-3'><Heart className='me-2' />Favorites</MenuItem> */}
                {globalUser.isLoggedIn && active ?
                  <Link to={'/' + 'stats' + '/#watchlist'} style={{ textDecoration: "none", color: "inherit" }}><MenuItem className='p-3'><Star1 className='me-2' />Watchlist</MenuItem></Link> : <MenuItem onClick={() => { setWalletConnect(!walletConnect) }} className='p-3'><Star1 className='me-2' />Watchlist</MenuItem>}
                {globalUser.isLoggedIn && active ?
                  <Link to={'/' + 'my-collections'} style={{ textDecoration: "none", color: "inherit" }}><MenuItem className='p-3'><GlobalSearch className='me-2' />My Collections</MenuItem></Link>
                  : <MenuItem className='p-3' onClick={() => { setWalletConnect(!walletConnect) }}><GlobalSearch className='me-2' />My Collections</MenuItem>}
                {globalUser.isLoggedIn && active ?
                  <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'asset/create'}>
                    <MenuItem className='p-3'><Edit2 className='me-2' />create</MenuItem>
                  </Link> :
                  <MenuItem className='p-3' onClick={() => { setWalletConnect(!walletConnect) }} ><Edit2 className='me-2' />create</MenuItem>
                }
                {globalUser.isLoggedIn && active ?
                  <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'account/setting'}>
                    <MenuItem className='p-3 d-flex justify-content-between'><div className='d-flex'><Setting5 className='me-2' />Account Settings</div></MenuItem>
                  </Link> :
                  <MenuItem onClick={() => { setWalletConnect(!walletConnect) }} className='p-3 d-flex justify-content-between'><div className='d-flex'><Setting5 className='me-2' />Account Settings</div></MenuItem>
                }
                {globalUser.isLoggedIn && active ?
                  <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'notifications'}>
                    <Box id="notifications" className='d-flex justify-content-between p-3 align-items-center'>
                      <Box className='d-flex align-items-center'><Notification size="18" className='me-2' />Notifications
                      </Box>
                      {notifications.length > 0 ? <NotifDot className='ms-3'>{notifications.length}</NotifDot> : undefined}
                    </Box>
                  </Link> : undefined}
                <MenuItem className='p-3 d-flex justify-content-between' ><div style={{ height: "100%", width: "100%" }} className='d-flex align-items-center' onClick={toggleSelected} id="languages" ><GlobalSearch className='me-2' />Language&nbsp;<span style={{ fontSize: "14px", color: theme == 'light' ? `${Colors.gray6}` : `${Colors.gray4}` }}>(English)</span></div><ArrowRight2 size="18" /></MenuItem>
                {globalUser.isLoggedIn && active ?
                  <MenuItem className='p-3' onClick={disconnect}><LogoutCurve className='me-2' />Logout</MenuItem> : undefined}
                <Box className='d-flex justify-content-between align-items-center px-3' sx={{ marginTop: "12px", height: '70px', background: theme == 'light' ? 'linear-gradient(96.14deg, #FFFFFF 19.61%, #E6F1FF 99.09%)' : '#332E5F' }}>
                  <div className='d-flex align-items-center'>
                    <p className='m-0 me-2'>{theme == 'light' ? 'light mode' : 'night mode'}</p>
                    <SwitchS className="switch">
                      <SwitchInput type="checkbox" checked={theme == 'light' ? true : false} onChange={themeToggler} />
                      <Slide className="sliderMenu"></Slide>
                    </SwitchS>
                  </div>
                  <img src={theme == 'light' ? dayMode : nightMode} width="50px" height="50px" />
                </Box>
              </>}
          </Box>







        </Box>
      </Drawer>


      {/* <Popper className="d-none d-lg-flex" open={desOpen} anchorEl={anchorEl} placement={"bottom"} disableScrollLock={true}
      >
        <Box sx={{
          border: theme == 'light' ? "0.2px solid #e6e6e6" : "0.2px solid #332E5F",
          // transform: 'translate(-32px,30px)',
          borderRadius: "24px",
          width: 400,
          bgcolor: theme == 'light' ? "#ffffff" : "#272448",
          p: 0,
          overflow: "hidden",
          boxShadow: theme == 'light' ? '0px 3px 10px rgba(0, 0, 0, 0.07)' : "unset",
          animation: `${showUp} 200ms ease`
        }}
          className="d-flex flex-column">
          {selected == 'languages' ?
            <>
              <Box sx={{ cursor: "pointer" }} onClick={() => setSelected(undefined)} className='d-flex justify-content-between p-3 align-items-center'>
                <Box className='d-flex align-items-center'><ArrowLeft2 size="18" className='me-1' />languages</Box>
              </Box>
              <Box className='d-flex justify-content-between p-3 align-items-center'>
                <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />English</Box>
                <ArrowRight2 size="18" />
              </Box>
              <Box className='d-flex justify-content-between p-3 align-items-center'>
                <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />German</Box>
                <ArrowRight2 size="18" />
              </Box>
            </> :
            <>
              {globalUser.isLoggedIn && active ?
                <Link to={'/' + 'profile/' + globalUser.username} style={{ textDecoration: "none", color: "inherit" }}><MenuItem className='p-3'><Profile className='me-2' />profile</MenuItem></Link> : <MenuItem className='p-3' onClick={() => { setWalletConnect(!walletConnect) }}><Profile className='me-2' />profile</MenuItem>}
              {globalUser.isLoggedIn && active ?
                <Link to={'/' + 'profile/' + globalUser.username + '/#favorited'} style={{ textDecoration: "none", color: "inherit" }}><MenuItem className='p-3'><Heart className='me-2' />Favorites</MenuItem></Link> : <MenuItem onClick={() => { setWalletConnect(!walletConnect) }} className='p-3'><Heart className='me-2' />Favorites</MenuItem>}
              {globalUser.isLoggedIn && active ?
                <Link to={'/' + 'stats' + '/#watchlist'} style={{ textDecoration: "none", color: "inherit" }}><MenuItem className='p-3'><Star1 className='me-2' />Watchlist</MenuItem></Link> : <MenuItem onClick={() => { setWalletConnect(!walletConnect) }} className='p-3'><Star1 className='me-2' />Watchlist</MenuItem>}
              {globalUser.isLoggedIn && active ?
                <Link to={'/' + 'my-collections'} style={{ textDecoration: "none", color: "inherit" }}><MenuItem className='p-3'><GlobalSearch className='me-2' />My Collections</MenuItem></Link>
                : <MenuItem className='p-3' onClick={() => { setWalletConnect(!walletConnect) }}><GlobalSearch className='me-2' />My Collections</MenuItem>}
              {globalUser.isLoggedIn && active ?
                <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'asset/create'}>
                  <MenuItem className='p-3'><Edit2 className='me-2' />create</MenuItem>
                </Link> :
                <MenuItem className='p-3' onClick={() => { setWalletConnect(!walletConnect) }} ><Edit2 className='me-2' />create</MenuItem>
              }
              {globalUser.isLoggedIn && active ?
                <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'account/setting'}>
                  <MenuItem className='p-3 d-flex justify-content-between'><div className='d-flex'><Setting5 className='me-2' />Account Settings</div></MenuItem>
                </Link> :
                <MenuItem onClick={() => { setWalletConnect(!walletConnect) }} className='p-3 d-flex justify-content-between'><div className='d-flex'><Setting5 className='me-2' />Account Settings</div></MenuItem>
              }
              <MenuItem className='p-3 d-flex justify-content-between' ><div style={{ height: "100%", width: "100%" }} className='d-flex align-items-center' onClick={toggleSelected} id="languages" ><GlobalSearch className='me-2' />Language&nbsp;<span style={{ fontSize: "14px", color: theme == 'light' ? `${Colors.gray6}` : `${Colors.gray4}` }}>(English)</span></div><ArrowRight2 size="18" /></MenuItem>
              {globalUser.isLoggedIn && active ?
                <MenuItem className='p-3' onClick={disconnect}><LogoutCurve className='me-2' />Logout</MenuItem> : undefined}
              <Box className='d-flex justify-content-between align-items-center px-3' sx={{ marginTop: "12px", height: '70px', background: theme == 'light' ? 'linear-gradient(96.14deg, #FFFFFF 19.61%, #E6F1FF 99.09%)' : '#332E5F' }}>
                <div className='d-flex'>
                  <p className='m-0 me-1'>{theme == 'light' ? 'light mode' : 'night mode'}</p>
                  <SwitchS className="switch">
                    <SwitchInput type="checkbox" checked={theme == 'light' ? true : false} onChange={themeToggler} />
                    <Slide className="sliderMenu"></Slide>
                  </SwitchS>
                </div>
              </Box>
            </>}
        </Box>
      </Popper> */}


      {/* mobile menu */}
      <Modal
        open={mobOpen}
        onClose={handleClose}
        // anchor={'bottom'}
        // open={state['bottom']}
        // onClose={toggleDrawer('bottom', false)}

        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="d-sm-none"
        // inputProps={{MenuProps: {disableScrollLock: true}}}
        disableScrollLock={true}
      >
        {list('bottom')}
      </Modal>



      {/* tablet menu */}
      <Drawer
        className="d-none d-sm-block d-lg-none"
        // BackdropProps={{ invisible: true }}
        disableScrollLock={true}
        PaperProps={{
          elevation: 0, style: {
            backgroundColor: "transparent",
          }
        }}
        sx={{
          overflow: "auto",
        }}
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
      >
        {list('right')}
      </Drawer>


      <WalletConnectModal open={walletConnect} handleClose={() => setWalletConnect(false)} theme={theme} />

    </>
  );
}
export default NavMenu;