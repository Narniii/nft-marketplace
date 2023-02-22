import { Divider, InputBase, MenuItem, Popper } from "@mui/material";
import { SearchNormal1 } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MARKET_API } from "../../utils/data/market_api";
import { AccountBrief, CollectionBrief, ItemBrief } from "../Brief";
import { Colors } from "../design/Colors";
import NavMenu from "./navMenu";

const Box = styled.div`
  background:transparent;
//   border: ${({ theme }) => theme.searchBoxBorder};
//   box-shadow: ${({ theme }) => theme.searchBoxShadow};
  border-radius:24px;
  align-content:center;
  //color: ${({ theme }) => theme.navIcons};
  color:#e6e6e6;
  color: ${({ theme }) => theme.navIcons};
  width:100%;
  `;
const InputBox = styled.div`
    width:auto;
    color: ${({ theme }) => theme.inputBox};
`;


const SearchBox = ({ theme, id, phrase }) => {
    const apiCall = useRef(undefined)
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false)
    const [placement, setPlacement] = useState()
    const [searchResults, setSearchResults] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const handleChange = (newPlacement) => (event) => {
        console.log(window.document.getElementById(id))
        console.log(document.getElementById(id)?.offsetWidth)
        if (event.target.value.length === 0) {
            setOpen((prev) => placement !== newPlacement || !prev);
        }
        else {
            setOpen(true)
            // setAnchorEl(event.currentTarget);
            setAnchorEl(window.document.getElementById(id));
        }

        setPlacement(newPlacement);
    };
    const Search = async () => {
        try {
            apiCall.current = MARKET_API.request({
                path: `/search/`,
                method: "post",
                body: {
                    phrase: phrase
                }
            })
            const response = await apiCall.current.promise;
            if (!response.isSuccess)
                throw response
            setSearchResults(response.data)
        }
        catch (err) {
            if (err.status == 404) {
                setSearchResults([])
            }
            else {
                setErr("Internal server error")
            }
        }
    }
    useEffect(() => {
        if (searchResults)
            setLoading(false)

    }, [searchResults])

    return (
        <>
            <Box className="d-flex p-2" id={id} style={{ boxShadow: theme == 'light' && window.location.pathname !== '/' ? 'inset 0px 0px 4px rgba(0, 0, 0, 0.2)' : "unset", border: theme == 'light' && window.location.pathname !== '/' ? "none" : "1px solid white" }}>
                <div className="col-2 p-0 d-flex align-items-center" style={{ width: "auto", color: theme == 'light' && window.location.pathname !== '/' ? `${Colors.gray6}` : "white" }}>
                    <SearchNormal1
                        size="24"
                    // color="#E6E6E6"
                    />
                </div>
                <div className="col-10 ms-2">
                    <InputBase
                        sx={{ color: theme == 'light' && window.location.pathname !== '/' ? `${Colors.gray6}` : "white", padding: "0 !important", width: "100%" }}
                        placeholder="Search..."
                        inputProps={{ 'aria-label': 'search google maps' }}
                        // onChange={handleClick}
                        onChange={handleChange('top')}
                    />
                </div>
            </Box>
            <ResPop theme={theme} open={open} anchorEl={anchorEl} id={id} />
        </>
    );
}

export default SearchBox;


export const ResPop = ({ theme, open, anchorEl, id }) => {
    const pWidth = document.getElementById(id)?.offsetWidth
    // console.log(pWidth)

    return (

        <Popper
            className="mt-1"
            PaperProps={{
                style: {
                    // width: '60%',
                    // backgroundColor: "transparent",
                }
            }}
            disableScrollLock={true}
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            // onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            sx={{ width: `${pWidth}px`, borderRadius: "24px", overflow: "hidden", boxShadow: "0px 4px 18px rgba(0, 0, 0, 0.2)" }}
        >
            {id == 'navSearch' || 'navSearchTablet' ?
                <>
                    {/* <======== search among collections , items , users in navbar  ========> */}

                    <MenuItem id="title" sx={{ color: theme == 'light' ? '#4d4d4d' : '#999999', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36', cursor: "context-menu", fontWeight: 600, '&:hover': { bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36', } }}>collection</MenuItem>

                    <MenuItem id="something" sx={{
                        color: theme == 'light' ? '#808080' : '#f9f9f9', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36',
                        '&:hover': {
                            bgcolor: theme == 'light' ? `${Colors.gray1}` : `${Colors.dark3}`,
                        }
                    }}
                    ><CollectionBrief /></MenuItem>
                    <MenuItem id="account" sx={{
                        color: theme == 'light' ? '#808080' : '#f9f9f9', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36', '&:hover': {
                            bgcolor: theme == 'light' ? `${Colors.gray1}` : `${Colors.dark3}`,
                        }
                    }}
                    ><CollectionBrief /></MenuItem>
                    <MenuItem id="log" sx={{
                        '&:hover': {
                            bgcolor: theme == 'light' ? `${Colors.gray1}` : `${Colors.dark3}`,
                        }
                        , color: theme == 'light' ? '#808080' : '#f9f9f9', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36'
                    }}
                    ><CollectionBrief /></MenuItem>

                    <MenuItem id="title" sx={{ color: theme == 'light' ? '#4d4d4d' : '#999999', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36', cursor: "context-menu", fontWeight: 600, '&:hover': { bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36', } }}>Account</MenuItem>
                    <MenuItem id="something" sx={{
                        color: theme == 'light' ? '#808080' : '#f9f9f9', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36',
                        '&:hover': {
                            bgcolor: theme == 'light' ? `${Colors.gray1}` : `${Colors.dark3}`,
                        }
                    }}
                    ><AccountBrief /></MenuItem>
                    <MenuItem id="account" sx={{
                        color: theme == 'light' ? '#808080' : '#f9f9f9', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36', '&:hover': {
                            bgcolor: theme == 'light' ? `${Colors.gray1}` : `${Colors.dark3}`,
                        }
                    }}
                    ><AccountBrief /></MenuItem>
                    <MenuItem id="log" sx={{
                        '&:hover': {
                            bgcolor: theme == 'light' ? `${Colors.gray1}` : `${Colors.dark3}`,
                        }
                        , color: theme == 'light' ? '#808080' : '#f9f9f9', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36'
                    }}
                    ><AccountBrief /></MenuItem>

                    <MenuItem id="title" sx={{ color: theme == 'light' ? '#4d4d4d' : '#999999', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36', cursor: "context-menu", fontWeight: 600, '&:hover': { bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36', } }}>Items</MenuItem>
                    <MenuItem id="something" sx={{
                        color: theme == 'light' ? '#808080' : '#f9f9f9', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36',
                        '&:hover': {
                            bgcolor: theme == 'light' ? `${Colors.gray1}` : `${Colors.dark3}`,
                        }
                    }}
                    ><ItemBrief /></MenuItem>
                    <MenuItem id="account" sx={{
                        color: theme == 'light' ? '#808080' : '#f9f9f9', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36', '&:hover': {
                            bgcolor: theme == 'light' ? `${Colors.gray1}` : `${Colors.dark3}`,
                        }
                    }}
                    ><ItemBrief /></MenuItem>
                    <MenuItem id="log" sx={{
                        '&:hover': {
                            bgcolor: theme == 'light' ? `${Colors.gray1}` : `${Colors.dark3}`,
                        }
                        , color: theme == 'light' ? '#808080' : '#f9f9f9', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36'
                    }}
                    ><ItemBrief /></MenuItem>


                </>
                :
                <>
                    {/* <======== other search apis  ========> */}

                    <MenuItem id="something" sx={{
                        color: theme == 'light' ? '#808080' : '#f9f9f9', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36',
                        '&:hover': {
                            bgcolor: theme == 'light' ? `${Colors.gray1}` : `${Colors.dark3}`,
                        }
                    }}
                    ><ItemBrief /></MenuItem>
                    <MenuItem id="account" sx={{
                        color: theme == 'light' ? '#808080' : '#f9f9f9', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36', '&:hover': {
                            bgcolor: theme == 'light' ? `${Colors.gray1}` : `${Colors.dark3}`,
                        }
                    }}
                    ><ItemBrief /></MenuItem>
                    <MenuItem id="log" sx={{
                        '&:hover': {
                            bgcolor: theme == 'light' ? `${Colors.gray1}` : `${Colors.dark3}`,
                        }
                        , color: theme == 'light' ? '#808080' : '#f9f9f9', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36'
                    }}
                    ><ItemBrief /></MenuItem>
                </>}

        </Popper >


        // <Popper
        //     PaperProps={{
        //         style: {
        //             width: 400,
        //             backgroundColor: "transparent",
        //             transform: 'translateY(70px)',
        //         }
        //     }}
        //     className="" open={open} anchorEl={anchorEl} placement={"top"} disableScrollLock={true}
        //     sx={{
        //         // transform: 'translateY(70px)',
        //         borderRadius: "24px",
        //         // width: '100%',
        //         width: 400,
        //         backgroundColor: theme == 'light' ? "#ffffff" : "#272448",
        //         boxShadow: '0px 0px 13px rgba(0, 0, 0, 0.29)',
        //         p: 0,
        //         overflow: "hidden",
        //         border: 'unset !important',
        //     }}>
        //     {console.log(anchorEl)}
        //     <Box sx={{}} className="d-flex flex-column">
        //         <MenuItem className='p-3'>something</MenuItem>
        //         <MenuItem className='p-3'>something</MenuItem>
        //         <MenuItem className='p-3'>something</MenuItem>
        //         <MenuItem className='p-3'>something</MenuItem>
        //         <MenuItem className='p-3'>something</MenuItem>
        //         <MenuItem className='p-3'>something</MenuItem>
        //         <MenuItem className='p-3'>something</MenuItem>
        //         <MenuItem className='p-3'>something</MenuItem>
        //     </Box>
        // </Popper>
    )


}