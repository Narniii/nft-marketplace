import { Box, FormControl, makeStyles, Menu, MenuItem, Popper, Select } from "@mui/material";
import { styled } from "@mui/system";
import { ArrowDown2, ArrowSwapVertical, ArrowUp2, FilterSearch, Grid1, Grid2, Grid5, HambergerMenu } from "iconsax-react";
import { Colors } from "./design/Colors";
import React, { useState } from "react";
import '../styles.css';
import SSelection from "./Selection";
import SearchBox from "./Navbar/SearchBox";

// const useStyles = makeStyles(theme => ({
//   quantityRoot: {
//     color: "#FFFFFF",
//     backgroundColor: "#303039",
//     opacity: 0.6,
//     borderRadius: "5px",
//     "&:hover": {
//       backgroundColor: "#1E1E24",
//       borderRadius: "5px",
//       opacity: 1
//     },
//     "&:focus-within": {
//       backgroundColor: "#1E1E24",
//       borderRadius: "5px",
//       opacity: 1
//     },
//     "& .MuiOutlinedInput-notchedOutline": {
//       border: "1px solid #484850"
//     },
//     "&:hover .MuiOutlinedInput-notchedOutline": {
//       border: "1px solid #484850"
//     },
//     "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
//       border: "1px solid #484850",
//       borderRadius: "5px 5px 0 0"
//     },
//     "& .Mui-disabled": {
//       color: "#FFFFFF",
//       opacity: 0.6
//     },
//     "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
//       border: "1px solid #484850"
//     }
//   },
//   selectRoot: {
//     color: "#FFFFFF"
//   },
//   icon: {
//     color: "#FFFFFF"
//   },
//   selectPaper: {
//     backgroundColor: "#1E1E24",
//     border: "1px solid #484850",
//     borderRadius: "5px",
//     color: "#FFFFFF",
//     "& li:hover": {
//       backgroundColor: "#303039"
//     }
//   }
// }));

const Selection = styled(Select)`
display: flex;
flex-direction: row;
align-items: center;
cursor:pointer;
background: transparent;
justify-content:space-between;
border: 1px solid #D9D9D9;
border-radius: 24px;
overflow:hidden;
// height:100%;
// width:200px;
// &:active{
//     border-bottom-right-radius:0;
//     border-bottom-left-radius:0;
//   };
//   &:before{
//     border-color:#d9d9d9;
//     };
//   &:after{
//     border-color:#d9d9d9;
//     }
//   &:focus-within{
//     border-bottom-right-radius:0;
//     border-bottom-left-radius:0;
//     }
`;
const SelectionBox = styled(Box)`
display: flex;
flex-direction: row;
align-items: center;
cursor:pointer;
background: transparent;
justify-content:space-between;
border: 1px solid #D9D9D9;
border-radius: 24px;
overflow:hidden;
height:50px;
`;
const IconContainer = styled(Box)`
    border-left: 1px solid #D9D9D9;
    height:100%;
    padding:4px 0 5px;
    &:hover{
        background-color: ${({ theme }) => theme.hoverIcon};
    }
`;



const Selectionn = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor:pointer;
    background: transparent;
    justify-content:space-between;
    border: 1px solid #D9D9D9;
    border-radius: 24px;
    overflow:hidden;
    height:100%;
    font-size:14px;
`;
export const SelectionB = ({ theme }) => {
  const [expanded, setExpanded] = useState(false)
  // const classes = useStyles();


  return (
    // <FormControl
    // variant="outlined"
    // classes={{
    //   root: classes.quantityRoot
    // }}
    // >
    <Selection
      // classes={{
      //   root: classes.selectRoot,
      //   icon: classes.icon
      // }}
      // MenuProps={{ classes: { paper: classes.selectPaper } }}
      displayEmpty
      inputProps={{ MenuProps: { disableScrollLock: true } }}
      BackdropProps={{ invisible: true }}
      IconComponent={ArrowDown2}
      onClick={() => setExpanded(!expanded)}
      sx={{ color: theme == 'light' ? '#888888' : '#f9f9f9', borderBottomRightRadius: expanded ? 0 : '24px', borderBottomLeftRadius: expanded ? 0 : '24px', }}
    >
    </Selection>
    // </FormControl>
  )
}









export const SelectionC = ({ theme, width, tabs }) => {
  const [expanded, setExpanded] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = useState(tabs[0])
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setExpanded(!expanded)
    if (!expanded)
      setAnchorEl(event.currentTarget);
    else
      setAnchorEl(null)
  };
  const handleClose = (e) => {
    setValue(e.target.id)
    setAnchorEl(null);
  };

  return (
    <SelectionBox
      className="p-3"
      onClick={handleClick}
      sx={{ width: { width }, color: theme == 'light' ? '#888888' : '#f9f9f9', borderBottomRightRadius: expanded ? 0 : '24px', borderBottomLeftRadius: expanded ? 0 : '24px', }}
    >
      <span style={{ color: "inherit" }}>{value}</span>
      {expanded ? <ArrowUp2 /> : <ArrowDown2 />}


      <Popper
        PaperProps={{
          style: {
            width: { width },
            backgroundColor: "transparent",
          }
        }}
        disableScrollLock={true}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{ zIndex: 50, width: { width }, borderBottomLeftRadius: "24px", borderBottomRightRadius: "24px", borderBottom: "1px solid #d9d9d9", borderRight: "1px solid #d9d9d9", borderLeft: "1px solid #d9d9d9", overflow: "hidden" }}
      >
        {tabs.map((tab, index) => (
          <MenuItem id={tab} sx={{ color: theme == 'light' ? '#808080' : '#f9f9f9', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36' }}
            onClick={handleClose}>{tab}</MenuItem>
        ))}
        {/* <MenuItem id="profile" sx={{ color: theme == 'light' ? '#808080' : '#f9f9f9', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36' }}
          onClick={handleClose}>Profile</MenuItem>
        <MenuItem id="account" sx={{ color: theme == 'light' ? '#808080' : '#f9f9f9', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36' }}
          onClick={handleClose}>My account</MenuItem>
        <MenuItem id="log" sx={{ color: theme == 'light' ? '#808080' : '#f9f9f9', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36' }}
          onClick={handleClose}>Logout</MenuItem> */}
      </Popper>


      {/* <Menu
        PaperProps={{
          style: {
            width: {width},
            backgroundColor: "transparent",
          }
        }}
        disableScrollLock={true}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{ width: {width} }}
      >
        <MenuItem id="profile" sx={{ color: theme == 'light' ? '#808080' : '#f9f9f9', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36' }}
          onClick={handleClose}>Profile</MenuItem>
        <MenuItem id="account" sx={{ color: theme == 'light' ? '#808080' : '#f9f9f9', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36' }}
          onClick={handleClose}>My account</MenuItem>
        <MenuItem id="log" sx={{ color: theme == 'light' ? '#808080' : '#f9f9f9', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36' }}
          onClick={handleClose}>Logout</MenuItem>
      </Menu> */}
    </SelectionBox>

  )
}



export const Filteringt = ({ theme, handleFilter }) => {
  return (
    <div style={{ backgroundColor: "pink" }} className="mb-4 row w-100 p-0 justify-content-between align-items-center">
      <div className="col-8 col-sm-4 col-md-5"><SearchBox /></div>
      <div className="d-none d-sm-block col-4 col-md-3">
        <div className="mx-1">
          <SSelection id={'test'} width={'100%'} theme={theme} tabs={['salam', 'khubi', 'khodafez']} />
        </div>
      </div>
      <div className="d-none d-sm-block col-3">
        <Selectionn className="mx-1 d-flex ">
          <IconContainer className="col-3 p-2 text-center d-flex justify-content-center align-items-center" ><HambergerMenu /></IconContainer>
          <IconContainer className="col-3 p-2 text-center d-flex justify-content-center align-items-center" ><Grid1 /></IconContainer>
          <IconContainer className="col-3 p-2 text-center d-flex justify-content-center align-items-center" ><Grid2 /></IconContainer>
          <IconContainer className="col-3 p-2 text-center d-flex justify-content-center align-items-center" ><Grid5 /></IconContainer>
        </Selectionn>
      </div>
      <div className="d-block d-sm-none col-2 col-sm-1">
        <Selectionn className="mx-1 d-flex p-2 d-flex justify-content-center">
          <div style={{ width: "auto" }}><ArrowSwapVertical /></div>
        </Selectionn>
      </div>
      <div className="col-2 col-sm-1">
        <Selectionn className="mx-1 d-flex p-2 d-flex justify-content-center">
          <div style={{ width: "auto" }} onClick={handleFilter}><FilterSearch size="20" /></div>
        </Selectionn>
      </div>
    </div>
  )
}





// mobile menu backup

// <Box sx={{
//   width: '100%',
//   height: '100%',
//   p: 0,
//   bgcolor: theme == 'light' ? "#ffffff" : "#272448",
// }}
//   className="d-flex flex-column justify-content-between">
//   <div>
//     <Box className='d-flex flex-column justify-content-start'
//       sx={{ height: "150px", backgroundOrigin: "center", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundImage: theme == 'light' ? `url(${lightBG})` : `url(${darkBG})`, }}
//     >
//       <Box className='d-flex justify-content-between p-3 align-items-center align-items-center'>
//         <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>Menu</Typography>
//         <CloseSquare onClick={handleClose} style={{ cursor: "pointer" }} />
//       </Box>
//     </Box>
//     <>
//       {selected == 'languages' ?
//         <>
//           <Box sx={{ cursor: "pointer" }} onClick={() => setSelected(undefined)} className='d-flex justify-content-between p-3 align-items-center'>
//             <Box className='d-flex align-items-center'><ArrowLeft2 size="18" className='me-1' />languages</Box>
//           </Box>
//           <Box className='d-flex justify-content-between p-3 align-items-center'>
//             <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />English</Box>
//             <ArrowRight2 size="18" />
//           </Box>
//           <Box className='d-flex justify-content-between p-3 align-items-center'>
//             <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />German</Box>
//             <ArrowRight2 size="18" />
//           </Box>
//         </>
//         :
//         <>
//           {globalUser.isLoggedIn ?
//             <>
//               <Link to="/account/setting" style={{ textDecoration: "none", color: "inherit" }}>
//                 <Box className='d-flex justify-content-between p-3 align-items-center'>
//                   <Box className='d-flex align-items-center'><Profile size="18" className='me-2' />Account</Box>
//                   <ArrowRight2 size="18" />
//                 </Box>
//               </Link>
//               <Link to="/wallet" style={{ textDecoration: "none", color: "inherit" }}>
//                 <Box className='d-flex justify-content-between p-3 align-items-center'>
//                   <Box className='d-flex align-items-center'><Wallet2 size="18" className='me-2' />wallet</Box>
//                   <ArrowRight2 size="18" />
//                 </Box>
//               </Link>
//               <Link to="/explore" style={{ textDecoration: "none", color: "inherit" }}>
//                 <Box className='d-flex justify-content-between p-3 align-items-center'>
//                   <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />Explore</Box>
//                   <ArrowRight2 size="18" />
//                 </Box>
//               </Link>
//               <Link to="/drops" style={{ textDecoration: "none", color: "inherit" }}>
//                 <Box className='d-flex justify-content-between p-3 align-items-center'>
//                   <Box className='d-flex align-items-center'><Calendar size="18" className='me-2' />Drops</Box>
//                   <ArrowRight2 size="18" />
//                 </Box>
//               </Link>
//               <Link to="/stats" style={{ textDecoration: "none", color: "inherit" }}>
//                 <Box className='d-flex justify-content-between p-3 align-items-center'>
//                   <Box className='d-flex align-items-center'><Chart1 size="18" className='me-2' />Stats</Box>
//                   <ArrowRight2 size="18" />
//                 </Box>
//               </Link>
//               <Link to="/asset/create" style={{ textDecoration: "none", color: "inherit" }}>
//                 <Box className='d-flex justify-content-between p-3 align-items-center'>
//                   <Box className='d-flex align-items-center'><Edit2 size="18" className='me-2' />Create</Box>
//                   <ArrowRight2 size="18" />
//                 </Box>
//               </Link>
//               <Link to="/resources" style={{ textDecoration: "none", color: "inherit" }}>
//                 <Box className='d-flex justify-content-between p-3 align-items-center'>
//                   <Box className='d-flex align-items-center'><DocumentText size="18" className='me-2' />Resources</Box>
//                   <ArrowRight2 size="18" />
//                 </Box>
//               </Link>
//             </>
//             :
//             <>
//               <Link to="/explore" style={{ textDecoration: "none", color: "inherit" }}>
//                 <Box className='d-flex justify-content-between p-3 align-items-center'>
//                   <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />Explore</Box>
//                   <ArrowRight2 size="18" />
//                 </Box>
//               </Link>
//               <Link to="/drops" style={{ textDecoration: "none", color: "inherit" }}>
//                 <Box className='d-flex justify-content-between p-3 align-items-center'>
//                   <Box className='d-flex align-items-center'><Calendar size="18" className='me-2' />Drops</Box>
//                   <ArrowRight2 size="18" />
//                 </Box>
//               </Link>
//               <Link to="/stats" style={{ textDecoration: "none", color: "inherit" }}>
//                 <Box className='d-flex justify-content-between p-3 align-items-center'>
//                   <Box className='d-flex align-items-center'><Chart1 size="18" className='me-2' />Stats</Box>
//                   <ArrowRight2 size="18" />
//                 </Box>
//               </Link>
//               <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
//                 <Box className='d-flex justify-content-between p-3 align-items-center'>
//                   <Box className='d-flex align-items-center'><DocumentText size="18" className='me-2' />Resources</Box>
//                   <ArrowRight2 size="18" />
//                 </Box>
//               </Link>
//             </>}
//           <Link style={{ textDecoration: "none", color: "inherit" }}>
//             <Box onClick={toggleSelected} id="languages" className='d-flex justify-content-between p-3 align-items-center'>
//               <Box className='d-flex align-items-center'><GlobalSearch size="18" className='me-2' />Languages</Box>
//               <ArrowRight2 size="18" />
//             </Box>
//           </Link>
//         </>
//       }
//     </>
//   </div>
//   <div>
//     {globalUser.isLoggedIn ? undefined :
//       <div className='px-2'>
//         <ButtonLarge>Connect Wallet</ButtonLarge>
//       </div>}
//     <Box className='d-flex justify-content-between align-items-center px-2' sx={{ marginTop: "12px", height: '70px', background: theme == 'light' ? 'linear-gradient(96.14deg, #FFFFFF 19.61%, #E6F1FF 99.09%)' : '#332E5F' }}>
//       <div className='d-flex'>
//         <p className='m-0 me-1'>{theme == 'light' ? 'light mode' : 'night mode'}</p>
//         <SwitchS className="switch">
//           <SwitchInput type="checkbox" checked={theme == 'light' ? true : false} onChange={themeToggler} />
//           <Slide className="sliderMenu" ></Slide>
//         </SwitchS>
//       </div>
//     </Box>
//   </div>
// </Box>
