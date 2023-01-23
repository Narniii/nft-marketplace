import { InputBase } from "@mui/material";
import { SearchNormal1 } from "iconsax-react";
import { useState } from "react";
import styled from "styled-components";
import NavMenu from "./navMenu";

const Box = styled.div`
  background:transparent;
  border: ${({ theme }) => theme.searchBoxBorder};
  box-shadow: ${({ theme }) => theme.searchBoxShadow};
  border-radius:24px;
  align-content:center;
  //color: ${({ theme }) => theme.navIcons};
  color:#e6e6e6;
  color: ${({ theme }) => theme.navIcons};

  `;
const InputBox = styled.div`
    width:auto;
    color: ${({ theme }) => theme.inputBox};
`;


const SearchBox = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box className="row p-2">
            {/* <NavMenu open={open} anchorEl={anchorEl} handleClose={handleClose} /> */}
            <div className="col-2 p-0 d-flex align-items-center" style={{ width: "auto" }}>
                <SearchNormal1
                    size="24"
                // color="#E6E6E6"
                />
            </div>
            <div className="col-10 ">
                <InputBase
                    sx={{ color: "inherit", padding: "0 !important" }}
                    placeholder="Search..."
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onChange={handleClick}
                />
            </div>
        </Box>
    );
}

export default SearchBox;