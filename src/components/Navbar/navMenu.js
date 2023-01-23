import { Divider, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Paper, Popover } from "@mui/material";
import { Check } from "iconsax-react";

const NavMenu = ({ open, anchorEl, handleClose }) => {
  return (
    // <Menu
    //   sx={{ maxWidth: '100%',padding:0,borderRadius:"24px",backgroundColor:"red" }}
    //   anchorEl={anchorEl}
    //   open={open}
    //   onClose={handleClose}
    //   disableScrollLock={true}
    // >

    // <Popover
    //   // id={id}
    //   open={open}
    //   anchorEl={anchorEl}
    //   onClose={handleClose}
    //   anchorOrigin={{
    //     vertical: "bottom",
    //     horizontal: "right"
    //   }}
    //   transformOrigin={{
    //     vertical: "top",
    //     horizontal: "left"
    //   }}
    //   disableScrollLock={true}
    // >
    <Paper sx={{
      maxWidth: '100%', padding: "0", borderRadius: "24px",
      // backgroundColor: "yellow"
    }}>
      <MenuList sx={{
        padding: "20px", borderRadius: "24px",
        // backgroundColor: "purple"
      }} dense>
        <MenuItem sx={{ padding: 0 }}>
          <ListItemIcon>
            <Check />
          </ListItemIcon>
          <ListItemText inset>Single</ListItemText>
        </MenuItem>
        <MenuItem sx={{ padding: 0 }}>
          <ListItemIcon>
            <Check />
          </ListItemIcon>
          <ListItemText inset>1.15</ListItemText>
        </MenuItem>
        <MenuItem sx={{ padding: 0 }}>
          <ListItemIcon>
            <Check />
          </ListItemIcon>
          <ListItemText inset>Double</ListItemText>
        </MenuItem>
        <MenuItem sx={{ padding: 0 }}>
          <ListItemIcon>
            <Check />
          </ListItemIcon>
          Custom: 1.2
        </MenuItem>
        <Divider />
        <MenuItem sx={{ padding: 0 }}>
          <ListItemIcon>
            <Check />
          </ListItemIcon>
          <ListItemText>Add space before paragraph</ListItemText>
        </MenuItem>
        <MenuItem sx={{ padding: 0 }}>
          <ListItemIcon>
            <Check />
          </ListItemIcon>
          <ListItemText>Add space after paragraph</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ padding: 0 }}>
          <ListItemIcon>
            <Check />
          </ListItemIcon>
          <ListItemText>Custom spacing...</ListItemText>
        </MenuItem>
      </MenuList>
      {/* </Menu> */}
      {/*</Popover>*/}
    </Paper>
  );
}

export default NavMenu;