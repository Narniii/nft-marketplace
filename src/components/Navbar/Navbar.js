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
import { getuser } from "../../redux/actions";
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

    setState({ ...state, [anchor]: open });
  };

  const walletDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

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
  useEffect(() => {
    if (active) {
      // if (account) {
        console.log('accccounttttt', account)
        console.log('act', active)
        fetchUser(account)
      // }
    }
    else {
      localStorage.removeItem('account')
      // localStorage.removeItem("lastActive")
      fetchUser()
    }
  }, [active, account]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [placement, setPlacement] = useState();
  const handlePopper = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setDesOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleClose = () => {
    setMenuOpen(false)
  }


  return (
    <>
      {/* desktop navbar */}
      <Nav className="d-none d-md-flex justify-content-between no-gutters">
        <div className="row col-md-6 col-xl-5 row align-items-center justify-content-between">
          <div className="col-md-1 col-lg-2 align-items-center">
            <Toggle theme={theme} toggleTheme={themeToggler} />
          </div>
          <div className="row flex-nowrap col-md-11 col-lg-10 justify-content-between no-gutters">
            <NavLink linkText={"Explore"} linkSize={"medium"} link={"/explore"} />
            <NavLink linkText={"Stats"} linkSize={"medium"} link={"/stats"} />
            <NavLink linkText={"Create"} linkSize={"medium"} link={"/asset/create"} />
            <NavLink linkText={"Resources"} linkSize={"medium"} link={"/"} />
          </div>
        </div>
        <div className="row col-md-6 col-xl-5 row align-items-center justify-content-between no-gutters">
          <div className="col-md-7 align-items-center justify-content-center">
            <SearchBox theme={theme} />
          </div>
          <div className="row col-md-4 justify-content-around no-gutters">
            <Link onClick={walletDrawer('right', true)} style={{ width: "auto", padding: "0", textDecoration: "none", color: "inherit" }}><Wallet2 /></Link>
            <Link onClick={toggleDrawer('right', true)} style={{ width: "auto", padding: "0", textDecoration: "none", color: "inherit" }}><Bag2 /></Link>
            <Link style={{ width: "auto", padding: "0", textDecoration: "none", color: "inherit" }} onClick={handlePopper('top-end')}><Profile /></Link>
          </div>
        </div>
        <Line />
      </Nav>


      {/* tablet navbar */}
      <Nav className="d-none d-sm-flex d-md-none justify-content-between no-gutters align-items-center">
        <div className="col-1 align-items-center">
          <Toggle theme={theme} toggleTheme={themeToggler} />
        </div>
        <div className="col-7 align-items-center justify-content-center">
          <SearchBox>
          </SearchBox>
        </div>
        <div className="row col-3 justify-content-around no-gutters">
          <Link onClick={walletDrawer('bottom', true)} style={{ width: "auto", padding: "0", textDecoration: "none", color: "inherit" }}><Wallet2 /></Link>
          <Link onClick={toggleDrawer('bottom', true)} style={{ width: "auto", padding: "0", textDecoration: "none", color: "inherit" }}><Bag2 /></Link>
          <Link style={{ width: "auto", padding: "0", textDecoration: "none", color: "inherit" }} onClick={TabletMenuDrawer('right', true)}><HambergerMenu /></Link>
        </div>
        <Line />
      </Nav>




      {/* mobile navbar */}
      <Nav className="d-flex d-sm-none justify-content-between no-gutters align-items-center">
        <div className="col-1 align-items-center">
          <Toggle theme={theme} toggleTheme={themeToggler} />
        </div>
        <div className="row col-5 justify-content-around no-gutters">
          <Link style={{ width: "auto", padding: "0", textDecoration: "none", color: "inherit" }}><SearchNormal1 /></Link>
          <Link onClick={toggleDrawer('bottom', true)} style={{ width: "auto", padding: "0", textDecoration: "none", color: "inherit" }}><Bag2 /></Link>
          <Link style={{ width: "auto", padding: "0", textDecoration: "none", color: "inherit" }} onClick={() => setMenuOpen(true)}><HambergerMenu /></Link>
        </div>
        <Line />
      </Nav>




      <Cart toggleDrawer={toggleDrawer} state={state} theme={theme} />
      <WalletConnect toggleDrawer={walletDrawer} state={walletMenu} theme={theme} />
      <NavMenu handleClose={handleClose} desOpen={desOpen} mobOpen={menuOpen} anchorEl={anchorEl} theme={theme} toggleDrawer={TabletMenuDrawer} state={tabletMenu} themeToggler={themeToggler} />

    </>
  );
}

export default Navbar;