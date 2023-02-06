import { InputBase, MenuItem, Popper } from "@mui/material";
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


const SearchBox = ({ theme }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false)
    const [placement, setPlacement] = useState()

    const handleChange = (newPlacement) => (event) => {
        if (event.target.value.length === 0) {
            setOpen((prev) => placement !== newPlacement || !prev);
        }
        else {
            setOpen(true)
            setAnchorEl(event.currentTarget);
        }

        setPlacement(newPlacement);
    };

    return (
        <>
            <Box className="row p-2">
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
                        // onChange={handleClick}
                        onChange={handleChange('top')}
                    />
                </div>
            </Box>

            <ResPop theme={theme} open={open} anchorEl={anchorEl} />
        </>
    );
}

export default SearchBox;


export const ResPop = ({ theme, open, anchorEl }) => {
    return (

        <Popper className="" open={open} anchorEl={anchorEl} placement={"top"} disableScrollLock={true}
            sx={{
                // transform: 'translateY(70px)',
                borderRadius: "24px",
                // width: '100%',
                width: 400,
                backgroundColor: theme == 'light' ? "#ffffff" : "#272448",
                boxShadow: '0px 0px 13px rgba(0, 0, 0, 0.29)',
                p: 0,
                overflow: "hidden",
                border: 'unset !important',
            }}>
            {console.log(anchorEl)}
            <Box sx={{}} className="d-flex flex-column">
                <MenuItem className='p-3'>something</MenuItem>
                <MenuItem className='p-3'>something</MenuItem>
                <MenuItem className='p-3'>something</MenuItem>
                <MenuItem className='p-3'>something</MenuItem>
                <MenuItem className='p-3'>something</MenuItem>
                <MenuItem className='p-3'>something</MenuItem>
                <MenuItem className='p-3'>something</MenuItem>
                <MenuItem className='p-3'>something</MenuItem>
            </Box>
        </Popper>
    )


}