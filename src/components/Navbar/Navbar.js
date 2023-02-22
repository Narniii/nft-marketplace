import Toggle from "../design/Toggler";
import { Link } from "react-router-dom";
import styled from "styled-components"
import NavLink from "../design/navLinks";
import { ButtonLarge } from "../design/Buttons";
import { Colors } from "../design/Colors";
import SearchBox from "./SearchBox";
import { Bag2, EmojiNormal, HambergerMenu, Profile, SearchNormal1, Wallet2, Youtube } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Cart } from "./ShoppingCart";
import WalletConnect from "./WalletConnect";
import { getuser, logOutUser } from "../../redux/actions";
import NavMenu from "./navMenu";
import { useWeb3React } from "@web3-react/core";
const Nav = styled.div`
  background:transparent;
  color: ${({ theme }) => theme.navIcons};
  height:70px;
  position:relative;
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

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    // setAnchorEl(event.currentTarget);
    setAnchorEl(document.getElementById("profile-tab"));
    setCartDesOpen(!cartDesOpen);
    setState({ ...state, [anchor]: open });
  };

  const walletDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    // setAnchorEl(event.currentTarget);
    setAnchorEl(document.getElementById("profile-tab"))
    setWalletDesOpen(!walletDesOpen);
    setWalletMenu({ ...walletMenu, [anchor]: open });
  };

  const TabletMenuDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setTabletMenu({ ...tabletMenu, [anchor]: open });
  };


  const { active, account, library, connector, activate, deactivate } = useWeb3React()
  const dispatch = useDispatch();
  const fetchUser = (walletAddress) => dispatch(getuser(walletAddress));
  const logOut = () => dispatch(logOutUser());

  useEffect(() => {
    if (active) {
      // if (account) {
      // console.log('accccounttttt', account)
      // console.log('act', active)
      console.log('im active')
      fetchUser(account)
      // }
    }
    else {
      // localStorage.removeItem('account')
      // localStorage.removeItem("lastActive")
      // console.log('im not active')
      // logOut()
    }
  }, [active, account]);
  console.log(window.location.pathname)

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


  return (
    <>
      {/* desktop navbar */}
      <Nav className="d-none d-lg-flex justify-content-between no-gutters">
        <div className="d-flex col-lg-5 col-xl-5 align-items-center justify-content-between">
          <div className="col-lg-1 col-lg-2 align-items-center">
            <Toggle theme={theme} toggleTheme={themeToggler} />
          </div>
          <div className="d-flex flex-nowrap col-lg-10 justify-content-between no-gutters">
            <NavLink theme={theme} linkText={"Explore"} linkSize={"medium"} link={"/explore"} />
            <NavLink theme={theme} linkText={"Stats"} linkSize={"medium"} link={"/stats"} />
            <NavLink theme={theme} linkText={"Create"} linkSize={"medium"} link={"/asset/create"} />
            <NavLink theme={theme} linkText={"Resources"} linkSize={"medium"} link={"/"} />
          </div>
        </div>
        <div className="d-flex col-lg-6 col-xl-5 align-items-center justify-content-between no-gutters">
          <div className="col-lg-7 align-items-center justify-content-center">
            <SearchBox theme={theme} id={'navSearch'} />
          </div>
          <div className="d-flex col-lg-4 justify-content-around no-gutters">
            <Link onClick={walletDrawer('right', true)} style={{ width: "auto", padding: "0", textDecoration: "none", color: theme == 'light' && window.location.pathname !== '/' ? `${Colors.gray6}` : "white" }}>{walletDesOpen ? <Wallet2 variant="Bold" /> : <Wallet2 />}</Link>
            <Link onClick={toggleDrawer('right', true)} style={{ width: "auto", padding: "0", textDecoration: "none", color: theme == 'light' && window.location.pathname !== '/' ? `${Colors.gray6}` : "white" }}>{cartDesOpen ? <Bag2 variant="Bold" /> : <Bag2 />}</Link>
            <Link id="profile-tab" style={{ width: "auto", padding: "0", textDecoration: "none", color: theme == 'light' && window.location.pathname !== '/' ? `${Colors.gray6}` : "white" }} onClick={handlePopper('top-end')}>{desOpen ? <Profile variant="Bold" /> : <Profile />}</Link>
          </div>
        </div>
        <Line />
      </Nav>


      {/* tablet navbar */}
      <Nav className="d-none d-sm-flex d-lg-none justify-content-between no-gutters align-items-center">
        <div className="col-1 align-items-center">
          <Toggle theme={theme} toggleTheme={themeToggler} />
        </div>
        <div className="col-7 align-items-center justify-content-center">
          <SearchBox theme={theme} id={'navSearchTablet'} />
        </div>
        <div className="d-flex col-3 justify-content-around no-gutters">
          <Link onClick={walletDrawer('bottom', true)} style={{ width: "auto", padding: "0", textDecoration: "none", color: theme == 'light' && window.location.pathname !== '/' ? `${Colors.gray6}` : "white" }}>{walletDesOpen ? <Wallet2 variant="Bold" /> : <Wallet2 />}</Link>
          <Link onClick={toggleDrawer('bottom', true)} style={{ width: "auto", padding: "0", textDecoration: "none", color: theme == 'light' && window.location.pathname !== '/' ? `${Colors.gray6}` : "white" }}>{cartDesOpen ? <Bag2 variant="Bold" /> : <Bag2 />}</Link>
          <Link style={{ width: "auto", padding: "0", textDecoration: "none", color: theme == 'light' && window.location.pathname !== '/' ? `${Colors.gray6}` : "white" }} onClick={TabletMenuDrawer('right', true)}><HambergerMenu /></Link>
        </div>
        <Line />
      </Nav>




      {/* mobile navbar */}
      <Nav className="d-flex d-sm-none justify-content-between no-gutters align-items-center">
        <div className="col-1 align-items-center">
          <Toggle theme={theme} toggleTheme={themeToggler} />
        </div>
        <div className="d-flex col-5 justify-content-around no-gutters">
          <Link style={{ width: "auto", padding: "0", textDecoration: "none", color: theme == 'light' && window.location.pathname !== '/' ? `${Colors.gray6}` : "white" }}><SearchNormal1 /></Link>
          <Link onClick={toggleDrawer('bottom', true)} style={{ width: "auto", padding: "0", textDecoration: "none", color: theme == 'light' && window.location.pathname !== '/' ? `${Colors.gray6}` : "white" }}>{cartDesOpen ? <Bag2 variant="Bold" /> : <Bag2 />}</Link>
          <Link style={{ width: "auto", padding: "0", textDecoration: "none", color: theme == 'light' && window.location.pathname !== '/' ? `${Colors.gray6}` : "white" }} onClick={() => setMenuOpen(true)}><HambergerMenu /></Link>
        </div>
        <Line />
      </Nav>




      <Cart handleClose={handleClose} toggleDrawer={toggleDrawer} state={state} theme={theme} cartDesOpen={cartDesOpen} anchorEl={anchorEl} />
      <WalletConnect handleClose={handleClose} toggleDrawer={walletDrawer} state={walletMenu} theme={theme} walletDesOpen={walletDesOpen} anchorEl={anchorEl} />
      <NavMenu handleClose={handleClose} desOpen={desOpen} mobOpen={menuOpen} anchorEl={anchorEl} theme={theme} toggleDrawer={TabletMenuDrawer} state={tabletMenu} themeToggler={themeToggler} />

    </>
  );
}

export default Navbar;