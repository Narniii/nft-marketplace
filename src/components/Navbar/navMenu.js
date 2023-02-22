import Modal from '@mui/material/Modal';
import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Divider, Drawer, Hidden, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Popper, Typography } from "@mui/material";
import { ArrowLeft2, ArrowRight2, ArrowUp2, Bag2, Calendar, CardSend, Chart1, CloseSquare, DocumentText, Edit2, EmojiNormal, GlobalSearch, HambergerMenu, Heart, Logout, LogoutCurve, Profile, ProfileDelete, SearchNormal1, Setting5, Star1, Trash, Wallet2, Youtube } from "iconsax-react";
import '../../styles.css'
import styled from "styled-components";
import testPic from '../../assets/testpic.png'
import { Colors } from "../design/Colors";
// import { styled } from "@mui/system";
import { ButtonLarge } from "../design/Buttons";
import lightBG from '../../assets/lightNoblur.svg'
import darkBG from '../../assets/darkNoblur.svg'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { logOutUser } from '../../redux/actions';

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


const NavMenu = ({ state, toggleDrawer, mobOpen, desOpen, anchorEl, handleClose, theme, anchor, themeToggler }) => {
  // const { globalUser } = useSelector(state => state);
  // console.log('salalalala',globalUser)
  const globalUser = useSelector(state => state.userReducer);
  const [selected, setSelected] = useState(undefined);
  const { active, account, library, connector, activate, deactivate } = useWeb3React()
  const dispatch = useDispatch();
  const logOut = () => dispatch(logOutUser());
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

  // tablet menu 
  const list = (anchor) => (
    <Box
      sx={{
        border: theme == 'light' ? "0.2px solid #e6e6e6" : "0.2px solid #332E5F",
        height: "100%", bgcolor: theme == 'light' ? "#ffffff" : "#272448", color: theme == 'light' ? "#333333" : "#e6e6e6", width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300, overflow: "hidden"
      }}
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className="d-flex flex-column justify-content-between"
    >
      <div>
        <Box className='d-flex flex-column justify-content-start'
          sx={{ height: "150px", backgroundOrigin: "center", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundImage: theme == 'light' ? `url(${lightBG})` : `url(${darkBG})`, }}
        >
          <Box className='d-flex justify-content-between p-3 align-items-center'>
            <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>Menu</Typography>
            <CloseSquare onClick={toggleDrawer(anchor, false)} style={{ cursor: "pointer" }} />
          </Box>
        </Box>
        <>
          {selected == 'languages' ? <>
            <>
              <Box sx={{ cursor: "pointer" }} onClick={() => setSelected(undefined)} className='d-flex justify-content-between p-4'>
                <Box className='d-flex align-items-center'><ArrowLeft2 size="18" className='me-2' />languages</Box>
              </Box>
              <Box className='d-flex justify-content-between p-4'>
                <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />English</Box>
                <ArrowRight2 />
              </Box>
              <Box className='d-flex justify-content-between p-4'>
                <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />German</Box>
                <ArrowRight2 />
              </Box>
            </>
          </> : <>
            {globalUser.isLoggedIn ?
              <>
                <Link to="/account/setting" style={{ textDecoration: "none", color: "inherit" }}>
                  <Box className='d-flex justify-content-between p-4'>
                    <Box className='d-flex align-items-center'><Profile size="18" className='me-2' />Account</Box>
                    <ArrowRight2 />
                  </Box>
                </Link>
                <Link to="/wallet" style={{ textDecoration: "none", color: "inherit" }}>
                  <Box className='d-flex justify-content-between p-4'>
                    <Box className='d-flex align-items-center'><Wallet2 size="18" className='me-2' />wallet</Box>
                    <ArrowRight2 />
                  </Box>
                </Link>
                <Link to="/explore" style={{ textDecoration: "none", color: "inherit" }}>
                  <Box className='d-flex justify-content-between p-4'>
                    <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />Explore</Box>
                    <ArrowRight2 />
                  </Box>
                </Link>
                <Link to="/drops" style={{ textDecoration: "none", color: "inherit" }}>
                  <Box className='d-flex justify-content-between p-4'>
                    <Box className='d-flex align-items-center'><Calendar size="18" className='me-2' />Drops</Box>
                    <ArrowRight2 />
                  </Box>
                </Link>
                <Link to="/stats" style={{ textDecoration: "none", color: "inherit" }}>
                  <Box className='d-flex justify-content-between p-4'>
                    <Box className='d-flex align-items-center'><Chart1 size="18" className='me-2' />Stats</Box>
                    <ArrowRight2 />
                  </Box>
                </Link>
                <Link to="/asset/create" style={{ textDecoration: "none", color: "inherit" }}>
                  <Box className='d-flex justify-content-between p-4'>
                    <Box className='d-flex align-items-center'><Edit2 size="18" className='me-2' />Create</Box>
                    <ArrowRight2 />
                  </Box>
                </Link>
                <Link to="/resources" style={{ textDecoration: "none", color: "inherit" }}>
                  <Box className='d-flex justify-content-between p-4'>
                    <Box className='d-flex align-items-center'><DocumentText size="18" className='me-2' />Resources</Box>
                    <ArrowRight2 />
                  </Box>
                </Link>
                {/* <Link to="/explore" style={{ textDecoration: "none", color: "inherit" }}>
              <Box className='d-flex justify-content-between p-4'>
                <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />Languages</Box>
                <ArrowRight2 />
              </Box>
            </Link> */}
              </>
              :
              <>
                <Link to="/explore" style={{ textDecoration: "none", color: "inherit" }}>
                  <Box className='d-flex justify-content-between p-4'>
                    <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />Explore</Box>
                    <ArrowRight2 />
                  </Box>
                </Link>
                <Link to="/drops" style={{ textDecoration: "none", color: "inherit" }}>
                  <Box className='d-flex justify-content-between p-4'>
                    <Box className='d-flex align-items-center'><Calendar size="18" className='me-2' />Drops</Box>
                    <ArrowRight2 />
                  </Box>
                </Link>
                <Link to="/stats" style={{ textDecoration: "none", color: "inherit" }}>
                  <Box className='d-flex justify-content-between p-4'>
                    <Box className='d-flex align-items-center'><Chart1 size="18" className='me-2' />Stats</Box>
                    <ArrowRight2 />
                  </Box>
                </Link>
                <Link to="/resources" style={{ textDecoration: "none", color: "inherit" }}>
                  <Box className='d-flex justify-content-between p-4'>
                    <Box className='d-flex align-items-center'><DocumentText size="18" className='me-2' />Resources</Box>
                    <ArrowRight2 />
                  </Box>
                </Link>
                {/* <Link to="/explore" style={{ textDecoration: "none", color: "inherit" }}>
              <Box className='d-flex justify-content-between p-4'>
                <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />Languages</Box>
                <ArrowRight2 />
              </Box>
            </Link> */}
              </>}
            <Link style={{ textDecoration: "none", color: "inherit" }}>
              <Box onClick={toggleSelected} id="languages" className='d-flex justify-content-between p-4'>
                <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />Languages</Box>
                <ArrowRight2 />
              </Box>
            </Link>
          </>}
        </>

      </div>
      <div>
        <div className='px-2'>
          <ButtonLarge>Connect Wallet</ButtonLarge>
        </div>
        <Box className='d-flex justify-content-between align-items-center px-2' sx={{ marginTop: "12px", height: '70px', background: theme == 'light' ? 'linear-gradient(96.14deg, #FFFFFF 19.61%, #E6F1FF 99.09%)' : '#332E5F' }}>
          <div className='d-flex'>
            <p className='m-0 me-1'>{theme == 'light' ? 'light mode' : 'night mode'}</p>
            <SwitchS className="switch">
              <SwitchInput type="checkbox" checked={theme == 'light' ? true : false} onChange={themeToggler} />
              <Slide className="sliderMenu" ></Slide>
            </SwitchS>
          </div>
        </Box>
      </div>
      {/* <Box className='d-flex flex-column justify-content-start' sx={{ height: "150px", backgroundOrigin: "center", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundImage: theme == 'light' ? `url(${lightBG})` : `url(${darkBG})`, }}>
        <Box className='d-flex justify-content-between p-3 align-items-center'>
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>Menu</Typography>
          <CloseSquare onClick={handleClose} style={{ cursor: "pointer" }} />
        </Box>
      </Box> */}
    </Box>
  );



  return (
    <>
      {/* desktop menu */}
      <Popper className="d-none d-lg-flex" open={desOpen} anchorEl={anchorEl} placement={"top-end"} disableScrollLock={true}
      >
        <Box sx={{
          border: theme == 'light' ? "0.2px solid #e6e6e6" : "0.2px solid #332E5F",
          transform: 'translateY(26px)',
          borderRadius: "24px",
          width: 400,
          bgcolor: theme == 'light' ? "#ffffff" : "#272448",
          p: 0,
          overflow: "hidden",
          boxShadow: theme == 'light' ? '0px 3px 10px rgba(0, 0, 0, 0.07)' : "unset",
        }}
          className="d-flex flex-column">
          {selected == 'languages' ?
            <>
              <Box sx={{ cursor: "pointer" }} onClick={() => setSelected(undefined)} className='d-flex justify-content-between p-4'>
                <Box className='d-flex align-items-center'><ArrowLeft2 size="18" className='me-2' />languages</Box>
              </Box>
              <Box className='d-flex justify-content-between p-4'>
                <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />English</Box>
                <ArrowRight2 />
              </Box>
              <Box className='d-flex justify-content-between p-4'>
                <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />German</Box>
                <ArrowRight2 />
              </Box>
            </> :
            <>
              {globalUser.isLoggedIn ?
                <Link to={'/' + 'profile/' + globalUser.username} style={{ textDecoration: "none", color: "inherit" }}><MenuItem className='p-3'><Profile className='me-2' />profile</MenuItem></Link> : undefined}
              {globalUser.isLoggedIn ?
                <Link to={'/' + 'profile/' + globalUser.username + '/#favorited'} style={{ textDecoration: "none", color: "inherit" }}><MenuItem className='p-3'><Heart className='me-2' />Favorites</MenuItem></Link> : undefined}
              {/* <MenuItem className='p-3'><Heart className='me-2' />Favorites</MenuItem> */}
              <Link to={'/' + 'stats' + '/#watchlist'} style={{ textDecoration: "none", color: "inherit" }}><MenuItem className='p-3'><Star1 className='me-2' />Watchlist</MenuItem></Link>
              {globalUser.isLoggedIn ?
                <Link to={'/' + 'my-collections'} style={{ textDecoration: "none", color: "inherit" }}><MenuItem className='p-3'><GlobalSearch className='me-2' />My Collections</MenuItem></Link>
                : undefined}
              <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'asset/create'}>
                <MenuItem className='p-3'><Edit2 className='me-2' />create</MenuItem>
              </Link>
              <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'account/setting'}>
                <MenuItem className='p-3 d-flex justify-content-between'><div className='d-flex'><Setting5 className='me-2' />Account Settings</div><ArrowRight2 /></MenuItem>
              </Link>
              <MenuItem className='p-3 d-flex justify-content-between' ><div style={{ height: "100%", width: "100%" }} className='d-flex' onClick={toggleSelected} id="languages" ><GlobalSearch className='me-2' />Language</div><ArrowRight2 /></MenuItem>
              {globalUser.isLoggedIn ?
                <MenuItem className='p-3' onClick={disconnect}><LogoutCurve className='me-2' />Logout</MenuItem> : undefined}
              <Box className='d-flex justify-content-between align-items-center px-2' sx={{ marginTop: "12px", height: '70px', background: theme == 'light' ? 'linear-gradient(96.14deg, #FFFFFF 19.61%, #E6F1FF 99.09%)' : '#332E5F' }}>
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
      </Popper>


      {/* mobile menu */}
      <Modal
        open={mobOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="d-sm-none"
        // inputProps={{MenuProps: {disableScrollLock: true}}}
        disableScrollLock={true}
      >
        <Box sx={{
          width: '100%',
          height: '100%',
          p: 0,
          bgcolor: theme == 'light' ? "#ffffff" : "#272448",
        }}
          className="d-flex flex-column justify-content-between">
          <div>
            <Box className='d-flex flex-column justify-content-start'
              sx={{ height: "150px", backgroundOrigin: "center", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundImage: theme == 'light' ? `url(${lightBG})` : `url(${darkBG})`, }}
            >
              <Box className='d-flex justify-content-between p-3 align-items-center'>
                <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>Menu</Typography>
                <CloseSquare onClick={handleClose} style={{ cursor: "pointer" }} />
              </Box>
            </Box>
            <>
              {selected == 'languages' ?
                <>
                  <Box sx={{ cursor: "pointer" }} onClick={() => setSelected(undefined)} className='d-flex justify-content-between p-4'>
                    <Box className='d-flex align-items-center'><ArrowLeft2 size="18" className='me-2' />languages</Box>
                  </Box>
                  <Box className='d-flex justify-content-between p-4'>
                    <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />English</Box>
                    <ArrowRight2 />
                  </Box>
                  <Box className='d-flex justify-content-between p-4'>
                    <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />German</Box>
                    <ArrowRight2 />
                  </Box>
                </>
                :
                <>
                  {globalUser.isLoggedIn ?
                    <>
                      <Link to="/account/setting" style={{ textDecoration: "none", color: "inherit" }}>
                        <Box className='d-flex justify-content-between p-4'>
                          <Box className='d-flex align-items-center'><Profile size="18" className='me-2' />Account</Box>
                          <ArrowRight2 />
                        </Box>
                      </Link>
                      <Link to="/wallet" style={{ textDecoration: "none", color: "inherit" }}>
                        <Box className='d-flex justify-content-between p-4'>
                          <Box className='d-flex align-items-center'><Wallet2 size="18" className='me-2' />wallet</Box>
                          <ArrowRight2 />
                        </Box>
                      </Link>
                      <Link to="/explore" style={{ textDecoration: "none", color: "inherit" }}>
                        <Box className='d-flex justify-content-between p-4'>
                          <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />Explore</Box>
                          <ArrowRight2 />
                        </Box>
                      </Link>
                      <Link to="/drops" style={{ textDecoration: "none", color: "inherit" }}>
                        <Box className='d-flex justify-content-between p-4'>
                          <Box className='d-flex align-items-center'><Calendar size="18" className='me-2' />Drops</Box>
                          <ArrowRight2 />
                        </Box>
                      </Link>
                      <Link to="/stats" style={{ textDecoration: "none", color: "inherit" }}>
                        <Box className='d-flex justify-content-between p-4'>
                          <Box className='d-flex align-items-center'><Chart1 size="18" className='me-2' />Stats</Box>
                          <ArrowRight2 />
                        </Box>
                      </Link>
                      <Link to="/asset/create" style={{ textDecoration: "none", color: "inherit" }}>
                        <Box className='d-flex justify-content-between p-4'>
                          <Box className='d-flex align-items-center'><Edit2 size="18" className='me-2' />Create</Box>
                          <ArrowRight2 />
                        </Box>
                      </Link>
                      <Link to="/resources" style={{ textDecoration: "none", color: "inherit" }}>
                        <Box className='d-flex justify-content-between p-4'>
                          <Box className='d-flex align-items-center'><DocumentText size="18" className='me-2' />Resources</Box>
                          <ArrowRight2 />
                        </Box>
                      </Link>
                      {/* <Link style={{ textDecoration: "none", color: "inherit" }}>
                      <Box onClick={toggleSelected} id="languages" className='d-flex justify-content-between p-4'>
                        <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />Languages</Box>
                        <ArrowRight2 />
                      </Box>
                    </Link> */}
                      {/* </>} */}
                    </>
                    :
                    <>
                      <Link to="/explore" style={{ textDecoration: "none", color: "inherit" }}>
                        <Box className='d-flex justify-content-between p-4'>
                          <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />Explore</Box>
                          <ArrowRight2 />
                        </Box>
                      </Link>
                      <Link to="/drops" style={{ textDecoration: "none", color: "inherit" }}>
                        <Box className='d-flex justify-content-between p-4'>
                          <Box className='d-flex align-items-center'><Calendar size="18" className='me-2' />Drops</Box>
                          <ArrowRight2 />
                        </Box>
                      </Link>
                      <Link to="/stats" style={{ textDecoration: "none", color: "inherit" }}>
                        <Box className='d-flex justify-content-between p-4'>
                          <Box className='d-flex align-items-center'><Chart1 size="18" className='me-2' />Stats</Box>
                          <ArrowRight2 />
                        </Box>
                      </Link>
                      <Link to="/resources" style={{ textDecoration: "none", color: "inherit" }}>
                        <Box className='d-flex justify-content-between p-4'>
                          <Box className='d-flex align-items-center'><DocumentText size="18" className='me-2' />Resources</Box>
                          <ArrowRight2 />
                        </Box>
                      </Link>
                      {/* <Link style={{ textDecoration: "none", color: "inherit" }}>
                  <Box onClick={toggleSelected} id="languages" className='d-flex justify-content-between p-4'>
                    <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />Languages</Box>
                    <ArrowRight2 />
                  </Box>
                </Link> */}
                    </>}
                  <Link style={{ textDecoration: "none", color: "inherit" }}>
                    <Box onClick={toggleSelected} id="languages" className='d-flex justify-content-between p-4'>
                      <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />Languages</Box>
                      <ArrowRight2 />
                    </Box>
                  </Link>
                </>
              }
            </>

            {/* </> */}
          </div>
          <div>
            <div className='px-2'>
              <ButtonLarge>Connect Wallet</ButtonLarge>
            </div>
            <Box className='d-flex justify-content-between align-items-center px-2' sx={{ marginTop: "12px", height: '70px', background: theme == 'light' ? 'linear-gradient(96.14deg, #FFFFFF 19.61%, #E6F1FF 99.09%)' : '#332E5F' }}>
              <div className='d-flex'>
                <p className='m-0 me-1'>{theme == 'light' ? 'light mode' : 'night mode'}</p>
                <SwitchS className="switch">
                  <SwitchInput type="checkbox" checked={theme == 'light' ? true : false} onChange={themeToggler} />
                  <Slide className="sliderMenu" ></Slide>
                </SwitchS>
              </div>
            </Box>
          </div>
        </Box>
      </Modal>



      {/* tablet menu */}
      <Drawer
        className="d-none d-sm-block d-lg-none"
        BackdropProps={{ invisible: true }}
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

    </>
  );
}
export default NavMenu;