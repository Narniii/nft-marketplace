import Toggle from "../design/Toggler";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"
import NavLink from "../design/navLinks";
import { ButtonLarge } from "../design/Buttons";
import { Colors } from "../design/Colors";
import SearchBox from "./SearchBox";
import { Bag2, CloseSquare, EmojiNormal, HambergerMenu, Profile, SearchNormal1, Wallet2, Youtube } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { Box, ClickAwayListener, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popper } from "@mui/material";
import { Cart } from "./ShoppingCart";
import WalletConnect from "./WalletConnect";
import { emptyCart, getuser, logOutUser } from "../../redux/actions";
import NavMenu from "./navMenu";
import { useWeb3React } from "@web3-react/core";
import { ListMenus } from "../listMenus";
import { MARKET_API } from "../../utils/data/market_api";
import { display } from "@mui/system";
import IconButton from "../design/logoButton";
const Nav = styled.div`
  background:transparent;
  color: ${({ theme }) => theme.navIcons};
  height:84px;
  position:relative;
  @media screen and (max-width: 575px) {
    height:56px;
  }
`;
const Line = styled.div`
  position:absolute;
  bottom:0;
  // left:0;
  height:1px;
  width:100%;
  margin:0 auto;
  transform: matrix(-1, 0, 0, 1, 0, 0);
  background: ${({ theme }) => theme.navBorderBackground};
`
const NotifDot = styled.div`
  position:absolute;
  height:5px;
  width:5px;
  border-radius:50%;
  // top:0;
  right:0;
  background-color: ${Colors.errorDark};
`

// const SearchBox = styled.div`
//   background:transparent;
//   color:text;
//   border:solid white 1px;
//   border-radius:24px;
//   // padding:5px;
//   height:48px;
//   align-content:center;
// `;


const Navbar = ({ theme, themeToggler }) => {
  //navbar menus ===============>
  const [menuOpen, setMenuOpen] = useState(false)
  const [desOpen, setDesOpen] = useState(false)
  const [walletDesOpen, setWalletDesOpen] = useState(false)
  const [cartDesOpen, setCartDesOpen] = useState(false)
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [walletMenu, setWalletMenu] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [tabletMenu, setTabletMenu] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [desktopMenu, setDesktopMenu] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    // setAnchorEl(event.currentTarget);
    setAnchorEl(document.getElementById("profile-tab"));
    if (open) {
      setCartDesOpen(true);
      setState({ ...state, [anchor]: true });
    } else {
      setCartDesOpen(false)
      setState({ ...state, [anchor]: false });
    }
    // if (cartDesOpen) {
    //   setCartDesOpen(false);
    // } else { setCartDesOpen(true) }
    // setState({ ...state, [anchor]: open });
  };
  const walletDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    // setAnchorEl(event.currentTarget);
    setAnchorEl(document.getElementById("profile-tab"))
    if (walletDesOpen) {
      setWalletDesOpen(false);
    } else { setWalletDesOpen(true) }
    setWalletMenu({ ...walletMenu, [anchor]: open });
  };
  const TabletMenuDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    if (desOpen) {
      setDesOpen(false);
    } else { setDesOpen(true) }
    setTabletMenu({ ...tabletMenu, [anchor]: open });
  };
  const { active, account, library, connector, activate, deactivate } = useWeb3React()
  const globalUser = useSelector(state => state.userReducer)
  const dispatch = useDispatch();
  const fetchUser = (walletAddress) => dispatch(getuser(walletAddress));
  const logOut = () => dispatch(logOutUser());
  const [anchorEl, setAnchorEl] = useState(null);
  const [placement, setPlacement] = useState();
  const handlePopper = (newPlacement) => (event) => {
    setAnchorEl(document.getElementById("profile-tab"));
    setDesOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  const handleClose = () => {
    setMenuOpen(false)
    setDesOpen(false)
    setWalletDesOpen(false)
    setCartDesOpen(false)
  }
  // navbar list =====================>
  const statsOptions = [{ title: 'Ranking', link: "/" + "stats" }, { title: "Activity", link: "/" + "stats/activity" }]
  const [listAnchor, setListAnchor] = useState(null);
  const [openList, setOpenList] = useState(false)
  const handleList = (e) => {
    setOpenList(true)
    setListAnchor(e.currentTarget);
  }
  const closeList = (e) => {
    setOpenList(false)
  }


  // remove all items in the shopping cart -->
  // const removeAll = () => dispatch(emptyCart());
  // useEffect(() => {
  //     removeAll()
  // }, [])



  //notifications ====================>
  const apiCall = useRef(null)
  const [notifications, setNotifications] = useState([])
  const [err, setErr] = useState(undefined)
  useEffect(() => {
    return () => {
      if (apiCall.current) {
        apiCall.current.cancel();
      }
    }
  }, [])

  const fetchNotifications = async () => {
    try {
      apiCall.current = MARKET_API.request({
        path: `/notif/get/latest/`,
        method: "post",
        body: { wallet_address: globalUser.walletAddress },
      });
      const response = await apiCall.current.promise;
      console.log(response)

      if (!response.isSuccess)
        throw response
      var data = response.data
      let min_bid_tresh = data.min_bid_tresh

      let auction_expiration_notifs = data.auction_expiration.notifs
      let bid_activity_notifs = data.bid_activity.notifs
      let item_sold_notifs = data.item_sold.notifs
      let outbid_notifs = data.outbid.notifs
      let owned_item_updates_notifs = data.owned_item_updates.notifs
      let price_change_notifs = data.price_change.notifs

      const notifs = [...auction_expiration_notifs,
      ...bid_activity_notifs,
      ...item_sold_notifs,
      ...outbid_notifs,
      ...owned_item_updates_notifs,
      ...owned_item_updates_notifs,
      ...price_change_notifs];
      var unreadNotifs = []
      for (var i = 0; i < notifs.length; i++) {
        if (notifs[i].seen == false) {
          unreadNotifs.push(notifs[i])
        }
      }
      setNotifications(unreadNotifs)
      if (unreadNotifs.length > 0) {
        var newNotifs = []
        for (var j = 0; j < unreadNotifs.length; j++) {
          let this_time = parseFloat(new Date().getTime())
          let last_time = parseFloat(unreadNotifs[j].fired_at.$date)
          let difference = Math.abs(this_time - last_time) / 1000
          let days = Math.floor(difference / 86400);
          let hours = Math.floor(difference / 3600) % 24;
          let minutes = Math.floor(difference / 60) % 60;
          let seconds = Math.floor(difference % 60);
          // console.log('differencee????', days, hours, minutes, seconds)
          if (days == 0 && hours == 0 && minutes < 2 && seconds < 60) {
            newNotifs.push(unreadNotifs[j])
          }
        }
        if (newNotifs.length > 0) {
          setOpenNotif(true)
        }
      }
    }
    catch (err) {
      console.log(err)
      if (err.status == 404) {
        setNotifications([])
        registerNotif()
      }
      else if (err.status == 500) {
        setErr("Internal server error")
      }
    }
  }
  const registerNotif = async () => {
    try {
      apiCall.current = MARKET_API.request({
        path: `/notif/register/`,
        method: "post",
        body: {
          wallet_address: globalUser.walletAddress,
          item_sold: 0,
          bid_activity: 0,
          price_change: 0,
          auction_expiration: 0,
          outbid: 0,
          owned_item_updates: 0,
          min_bid_tresh: '0'
        },
      });
      const response = await apiCall.current.promise;
      console.log(response)
      if (!response.isSuccess)
        throw response
      fetchNotifications()
    }
    catch (err) {
      console.log(err)
      if (err.status == 404) {
        setNotifications([])
      }
      else if (err.status == 500) {
        setErr("Internal server error")
      }
    }
  }
  useEffect(() => {
    if (active && globalUser.isLoggedIn) {
      let fetchInterval = setInterval(() => {
        fetchNotifications()
      }, 60000);
      return () => clearInterval(fetchInterval)
    }
  }, [])

  const [openNotif, setOpenNotif] = useState(false)
  const navigate = useNavigate()
  return (
    <>
      {/* desktop navbar */}
      <Nav className="d-none d-lg-flex justify-content-between no-gutters">
        <div className="d-flex col-lg-6 col-xl-6 align-items-center justify-content-start">
          <div className="me-5 align-items-center">
            <IconButton theme={theme} />
          </div>
          <div className="d-flex flex-nowrap justify-content-between no-gutters">
            <NavLink theme={theme} linkText={"Explore"} linkSize={"medium"} link={"/explore"} />
            <NavLink open={handleList} close={closeList} link={'/' + 'stats'} theme={theme} linkText={"Stats"} linkSize={"medium"} />
            <ListMenus close={closeList} open={openList} anchorEl={listAnchor} theme={theme} handleClose={() => setOpenList(false)} tabs={statsOptions} />
            <NavLink theme={theme} linkText={"Create"} linkSize={"medium"} link={"/asset/create"} />
            <NavLink theme={theme} linkText={"Home"} linkSize={"medium"} link={"/"} />
          </div>
        </div>
        <div className="d-flex col-lg-6 col-xl-5 align-items-center justify-content-between no-gutters">
          <div className="align-items-center justify-content-center" style={{ marginRight: "46px", width: "100%" }}>
            <SearchBox theme={theme} id={'navSearch'} />
          </div>
          <div className="d-flex justify-content-between no-gutters">
            {/* <ClickAwayListener onClickAway={() => setWalletDesOpen(false)}> */}
            <Link onClick={walletDrawer('right', true)} style={{ width: "auto", padding: "0", textDecoration: "none", color: theme == 'light' && window.location.pathname !== '/' ? `${Colors.gray6}` : "white" }}>{walletDesOpen ? <Wallet2 variant="Bold" cursor="pointer" /> : <Wallet2 className="navIcH" />}</Link>
            {/* </ClickAwayListener> */}
            {/* <ClickAwayListener onClickAway={() => setCartDesOpen(false)}> */}
            <Link onClick={toggleDrawer('right', true)} style={{ marginRight: "32px", marginLeft: "32px", width: "auto", padding: "0", textDecoration: "none", color: theme == 'light' && window.location.pathname !== '/' ? `${Colors.gray6}` : "white" }}>{cartDesOpen ? <Bag2 variant="Bold" cursor="pointer" /> : <Bag2 className="navIcH" />}</Link>
            {/* </ClickAwayListener> */}
            {/* <ClickAwayListener onClickAway={() => setDesOpen(false)}> */}
            <Link id="profile-tab" style={{ width: "auto", padding: "0", textDecoration: "none", color: theme == 'light' && window.location.pathname !== '/' ? `${Colors.gray6}` : "white" }}
              onClick={TabletMenuDrawer('right', true)}
            // onClick={handlePopper('bottom')}
            >
              {desOpen ?
                <div className="p-relative" style={{ width: '24px', height: '24px' }}>
                  <Profile variant="Bold" cursor="pointer" />
                  {notifications && notifications.length > 0 ? <NotifDot /> : undefined}
                </div>
                :
                <div className="p-relative" style={{ width: '24px', height: '24px' }}>
                  <Profile className="navIcH" />
                  {notifications && notifications.length > 0 ? <NotifDot /> : undefined}
                </div>}
            </Link>
            {/* </ClickAwayListener> */}
          </div>
        </div>
        <Line />
      </Nav>


      {/* tablet navbar */}
      <Nav className="d-none d-sm-flex d-lg-none justify-content-between align-items-center">
        <div className="d-flex align-items-center col-6">
          <div className="d-flex align-items-center me-3">
            <IconButton theme={theme} />
          </div>
          <div className="d-flex align-items-center justify-content-center w-100">
            <SearchBox theme={theme} id={'navSearchTablet'} />
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <Link onClick={walletDrawer('bottom', true)} style={{ width: "auto", padding: "0", textDecoration: "none", color: theme == 'light' && window.location.pathname !== '/' ? `${Colors.gray6}` : "white" }}>{walletDesOpen ? <Wallet2 variant="Bold" cursor="pointer" /> : <Wallet2 />}</Link>
          <Link onClick={toggleDrawer('bottom', true)} style={{ marginLeft: "32px", marginRight: "32px", width: "auto", padding: "0", textDecoration: "none", color: theme == 'light' && window.location.pathname !== '/' ? `${Colors.gray6}` : "white" }}>{cartDesOpen ? <Bag2 variant="Bold" cursor="pointer" /> : <Bag2 />}</Link>
          <Link style={{ width: "auto", padding: "0", textDecoration: "none", color: theme == 'light' && window.location.pathname !== '/' ? `${Colors.gray6}` : "white" }} onClick={TabletMenuDrawer('right', true)}>
            <div className="p-relative" style={{ width: '24px', height: '24px' }}>
              <HambergerMenu />
              {notifications && notifications.length > 0 ? <NotifDot /> : undefined}
            </div>
          </Link>
        </div>
        <Line />
      </Nav>




      {/* mobile navbar */}
      <Nav className="d-flex d-sm-none justify-content-between align-items-center">
        <div className="d-flex col-6 align-items-center">
          <IconButton theme={theme} />
        </div>
        <div className="d-flex col-6 justify-content-end">
          <Link style={{ width: "auto", padding: "0", textDecoration: "none", color: theme == 'light' && window.location.pathname !== '/' ? `${Colors.gray6}` : "white" }}><SearchNormal1 /></Link>
          <Link onClick={toggleDrawer('bottom', true)} style={{ marginLeft: "24px", marginRight: "24px", width: "auto", padding: "0", textDecoration: "none", color: theme == 'light' && window.location.pathname !== '/' ? `${Colors.gray6}` : "white" }}>{cartDesOpen ? <Bag2 variant="Bold" cursor="pointer" /> : <Bag2 />}</Link>
          <Link style={{ width: "auto", padding: "0", textDecoration: "none", color: theme == 'light' && window.location.pathname !== '/' ? `${Colors.gray6}` : "white" }} onClick={() => setMenuOpen(true)}>
            <div className="p-relative" style={{ width: '24px', height: '24px' }}>
              <HambergerMenu />
              {notifications && notifications.length > 0 ? <NotifDot /> : undefined}
            </div>
          </Link>
        </div>
        <Line />
      </Nav>




      <Cart handleClose={handleClose} toggleDrawer={toggleDrawer} state={state} theme={theme} cartDesOpen={cartDesOpen} anchorEl={anchorEl} />
      <WalletConnect handleClose={handleClose} toggleDrawer={walletDrawer} state={walletMenu} theme={theme} walletDesOpen={walletDesOpen} anchorEl={anchorEl} />
      <NavMenu handleClose={handleClose} desOpen={desOpen} mobOpen={menuOpen} anchorEl={anchorEl} theme={theme} toggleDrawer={TabletMenuDrawer} state={tabletMenu} themeToggler={themeToggler} notifications={notifications} />

      <Popper
        className=""
        BackdropProps={{ invisible: true }}
        disableScrollLock={true}
        PaperProps={{
          elevation: 0, style: {
            backgroundColor: "transparent",
            alignItems: "end",
            justifyContent: "end"
          }
        }}
        sx={{
          overflow: "auto",
          top: '90% !important',
          // left: { xs: 0, md: '75% !important' },
          zIndex: 999999,
          width: '100%',
          display: "flex",
          justifyContent: "end",
        }}
        placement="bottom-end"
        // modifiers={{
        //   offset: {
        //   enabled: true,
        //   offset: '0, 30'
        //  }
        // }}      
        // anchor={'right'}
        anchorEl={window.document}
        open={openNotif}
        onClose={() => setOpenNotif(false)}
      >
        <Box
          sx={{
            // transform: 'translateY(10px)',
            borderRadius: "24px",
            width: 300,
            height: 70,
            zIndex: 999999,
            // position: 'absolute',
            // bottom: 0,
            // right: 0,
            bgcolor: theme == 'light' ? Colors.gray0 : Colors.dark4,
            my: 1,
            mx: 1,
            px: 2,
            overflow: "hidden",
            boxShadow: theme == 'light' ? '0px 3px 10px rgba(0, 0, 0, 0.07)' : "unset",
            '&:hover': {
              color: Colors.primaryMain
            }
          }}
          className="d-flex justify-content-between align-items-center">
          <p className="m-0 me-3" style={{ cursor: "pointer", }} onClick={() => navigate('/' + 'notifications')}>
            you have new notifications
          </p>
          <div style={{ cursor: "pointer" }} onClick={() => setOpenNotif(false)}>
            <CloseSquare color={Colors.primaryDark} />
          </div>

        </Box>
      </Popper>

    </>
  );
}

export default Navbar;