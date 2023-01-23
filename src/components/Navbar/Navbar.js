import Toggle from "../design/Toggler";
import { Link } from "react-router-dom";
import styled from "styled-components"
import NavLink from "../design/navLinks";
import { ButtonLarge } from "../design/Buttons";
import { Colors } from "../design/Colors";
import SearchBox from "./SearchBox";
import { Bag2, EmojiNormal, HambergerMenu, Profile, SearchNormal1, Wallet2, Youtube } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useState } from "react";
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Cart } from "./NavModals";
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
  const [state, setState] = useState({
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


  // const dispatch = useDispatch();
  // const apiCall = useRef(undefined)
  // const [create, setCreate] = useState(false)
  // const [user, setUser] = useState(undefined)

  // const userDetails = useSelector(state => state.userReducer)
  // console.log(userDetails)

  return (
    <>
      {/* desktop navbar */}
      <Nav className="d-none d-md-flex justify-content-between no-gutters">
        <div className="row col-md-6 col-xl-5 row align-items-center justify-content-between">
          <div className="col-md-1 col-lg-2 align-items-center">
            <Toggle theme={theme} toggleTheme={themeToggler} />
          </div>
          <div className="row col-md-11 col-lg-10 justify-content-between no-gutters">
            <NavLink linkText={"Explore"} linkSize={"medium"} link={"/"} />
            <NavLink linkText={"Stats"} linkSize={"medium"} link={"/"} />
            <NavLink linkText={"Create"} linkSize={"medium"} link={"/"} />
            <NavLink linkText={"Resources"} linkSize={"medium"} link={"/"} />
          </div>
        </div>
        <div className="row col-md-6 col-xl-5 row align-items-center justify-content-between no-gutters">
          <div className="col-md-7 align-items-center justify-content-center">
            <SearchBox>
            </SearchBox>
          </div>
          <div className="row col-md-4 justify-content-around no-gutters">
            <Link style={{ width: "auto", padding: "0", textDecoration: "none", color: "inherit" }}><Wallet2 /></Link>
            <Link onClick={toggleDrawer('right', true)} style={{ width: "auto", padding: "0", textDecoration: "none", color: "inherit" }}><Bag2 /></Link>
            <Link to="/profile" style={{ width: "auto", padding: "0", textDecoration: "none", color: "inherit" }}><Profile /></Link>
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
          <Link style={{ width: "auto", padding: "0", textDecoration: "none", color: "inherit" }}><Wallet2 /></Link>
          <Link onClick={toggleDrawer('bottom', true)} style={{ width: "auto", padding: "0", textDecoration: "none", color: "inherit" }}><Bag2 /></Link>
          <Link style={{ width: "auto", padding: "0", textDecoration: "none", color: "inherit" }}><HambergerMenu /></Link>
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
          <Link style={{ width: "auto", padding: "0", textDecoration: "none", color: "inherit" }}><HambergerMenu /></Link>
        </div>
        <Line />
      </Nav>




      <Cart toggleDrawer={toggleDrawer} state={state}/>
    </>
  );
}

export default Navbar;