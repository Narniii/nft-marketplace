import { ClickAwayListener, Divider, InputBase, Menu, MenuItem, Popper } from "@mui/material";
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
  &:hover{
  box-shadow: ${({ theme }) => theme.searchBoxShadowHover};
  }
  `;
const InputBox = styled.div`
    width:auto;
    color: ${({ theme }) => theme.inputBox};
`;


const SearchBox = ({ theme, id, phrase, searchingWhat }) => {
    const apiCall = useRef(undefined)
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false)
    const [placement, setPlacement] = useState()
    const [searchResults, setSearchResults] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [collections, setCollections] = useState(undefined)
    const [NFTs, setNFTs] = useState(undefined)
    const [users, setUsers] = useState(undefined)


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
            Search(event.target.value)

            if (searchResults) {
                for (var s = 0; s < searchResults.length; s++) {
                    if (searchResults[s].collections) {
                        setCollections(searchResults[s].collections)
                    }
                    if (searchResults[s].users) {
                        setUsers(searchResults[s].users)
                    }
                    if (searchResults[s].nfts) {
                        setNFTs(searchResults[s].nfts)
                    }
                }
            }

        }

        setPlacement(newPlacement);
    };
    const Search = async (phrase) => {
        setLoading(true)
        try {
            apiCall.current = MARKET_API.request({
                path: `/search/`,
                method: "post",
                body: {
                    phrase: phrase,
                    from: 0,
                    to: 3,
                }
            })
            const response = await apiCall.current.promise;
            console.log(response)
            if (!response.isSuccess)
                throw response
            setSearchResults(response.data)
            for (var s = 0; s < response.data.length; s++) {
                if (response.data[s].collections) {
                    setCollections(response.data[s].collections)
                }
                if (response.data[s].users) {
                    setUsers(response.data[s].users)
                }
                if (response.data[s].nfts) {
                    setNFTs(response.data[s].nfts)
                }
            }
            setLoading(false)


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
        // if (searchResults)
        // setOpen(true)

    }, [searchResults])

    return (
        <>
            <Box className="d-flex py-2 align-items-center" id={id} style={{ paddingLeft: "12px", boxShadow: theme == 'light' && window.location.pathname !== '/' ? 'inset 0px 0px 4px rgba(0, 0, 0, 0.2)' : "unset", border: theme == 'light' && window.location.pathname !== '/' ? "none" : "1px solid #b3b3b3" }}>
                <div className="col-2 p-0 d-flex align-items-center" style={{ height: "max-content", width: "auto", color: theme == 'light' && window.location.pathname !== '/' ? `${Colors.gray6}` : "white" }}>
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
            <ResPop loading={loading} theme={theme} open={open} anchorEl={anchorEl} id={id} searchResults={searchResults} collections={collections} NFTs={NFTs} users={users} searchingWhat={searchingWhat} setOpen={setOpen} />
        </>
    );
}

export default SearchBox;


export const ResPop = ({ loading, setOpen, theme, open, anchorEl, id, searchResults, collections, NFTs, users, searchingWhat }) => {
    const pWidth = window.document.getElementById(id)?.offsetWidth
    return (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
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
                sx={{ padding: '10px 0', width: `${pWidth}px`, borderRadius: "24px", bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36', overflow: "hidden", boxShadow: "0px 4px 18px rgba(0, 0, 0, 0.2)", }}
            >
                {loading ?
                    <MenuItem id="title" sx={{ color: theme == 'light' ? '#4d4d4d' : '#999999', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36', cursor: "context-menu", fontWeight: 500, fontSize: "14px", '&:hover': { bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36', } }}>Loading...</MenuItem>
                    :
                    <>
                        {searchResults && searchResults.length != 0 ?
                            <>
                                {id == 'navSearch' || id == 'navSearchTablet' ?
                                    <>

                                        {/* <======== search among collections , items , users in navbar  ========> */}

                                        {collections ?
                                            <>
                                                <MenuItem id="title" sx={{ color: theme == 'light' ? '#4d4d4d' : '#999999', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36', cursor: "context-menu", fontWeight: 600, fontSize: "14px", '&:hover': { bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36', } }}>Collection</MenuItem>
                                                {collections.map((collection) => {
                                                    return <MenuItem key={collection._id.$oid} id="result" sx={{
                                                        color: theme == 'light' ? '#808080' : '#f9f9f9', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36',
                                                        '&:hover': {
                                                            bgcolor: theme == 'light' ? `${Colors.gray1}` : `${Colors.dark3}`,
                                                        }
                                                    }}
                                                    >
                                                        <CollectionBrief image={collection.logo_path} id={collection._id.$oid} title={collection.title} price={collection.floor_price} itemsLength={collection.nft_ids.length} />
                                                    </MenuItem>
                                                })}
                                            </>
                                            : undefined}

                                        {users ?
                                            <>
                                                <MenuItem id="title" sx={{ color: theme == 'light' ? '#4d4d4d' : '#999999', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36', cursor: "context-menu", fontWeight: 600, fontSize: "14px", mt: 1, '&:hover': { bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36', } }}>Account</MenuItem>
                                                {users.map((user) => {
                                                    return <MenuItem key={user._id.$oid} id="result" sx={{
                                                        color: theme == 'light' ? '#808080' : '#f9f9f9', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36',
                                                        '&:hover': {
                                                            bgcolor: theme == 'light' ? `${Colors.gray1}` : `${Colors.dark3}`,
                                                        }
                                                    }}
                                                    ><AccountBrief username={user.username} image={user.avatar_path ? user.avatar_path : undefined} /></MenuItem>
                                                })}
                                            </>
                                            : undefined}

                                        {NFTs ? <>
                                            <MenuItem id="title" sx={{ color: theme == 'light' ? '#4d4d4d' : '#999999', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36', cursor: "context-menu", fontWeight: 600, fontSize: "14px", mt: 1, '&:hover': { bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36', } }}>Items</MenuItem>
                                            {NFTs.map((nft) => {
                                                return <MenuItem key={nft._id.$oid} id="result" sx={{
                                                    color: theme == 'light' ? '#808080' : '#f9f9f9', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36',
                                                    '&:hover': {
                                                        bgcolor: theme == 'light' ? `${Colors.gray1}` : `${Colors.dark3}`,
                                                    }
                                                }}
                                                ><ItemBrief wallet={nft.current_owner} id={nft._id.$oid} image={nft.nft_image_path} title={nft.title} collection={nft.collection_name} /></MenuItem>
                                            })}
                                        </> : undefined}

                                    </>
                                    :
                                    <>
                                        {/* <======== other search apis  ========> */}

                                        {collections && searchingWhat == 'collections' ?
                                            <>
                                                <MenuItem id="title" sx={{ color: theme == 'light' ? '#4d4d4d' : '#999999', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36', cursor: "context-menu", fontWeight: 600, fontSize: "14px", '&:hover': { bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36', } }}>Collection</MenuItem>
                                                {collections.map((collection) => {
                                                    return <MenuItem key={collection._id.$oid} id="result" sx={{
                                                        color: theme == 'light' ? '#808080' : '#f9f9f9', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36',
                                                        '&:hover': {
                                                            bgcolor: theme == 'light' ? `${Colors.gray1}` : `${Colors.dark3}`,
                                                        }
                                                    }}
                                                    >
                                                        <CollectionBrief image={collection.logo_path} id={collection._id.$oid} title={collection.title} price={collection.floor_price} itemsLength={collection.nft_ids.length} />
                                                    </MenuItem>
                                                })}
                                            </>
                                            : undefined}

                                        {users && searchingWhat == 'users' ?
                                            <>
                                                <MenuItem id="title" sx={{ color: theme == 'light' ? '#4d4d4d' : '#999999', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36', cursor: "context-menu", fontWeight: 600, fontSize: "14px", mt: 1, '&:hover': { bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36', } }}>Account</MenuItem>
                                                {users.map((user) => {
                                                    return <MenuItem key={user._id.$oid} id="result" sx={{
                                                        color: theme == 'light' ? '#808080' : '#f9f9f9', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36',
                                                        '&:hover': {
                                                            bgcolor: theme == 'light' ? `${Colors.gray1}` : `${Colors.dark3}`,
                                                        }
                                                    }}
                                                    ><AccountBrief image={user.avatar_path ? user.avatar_path : undefined} username={user.username} /></MenuItem>
                                                })}
                                            </>
                                            : undefined}

                                        {NFTs && searchingWhat == 'NFTs' ? <>
                                            <MenuItem id="title" sx={{ color: theme == 'light' ? '#4d4d4d' : '#999999', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36', cursor: "context-menu", fontWeight: 600, fontSize: "14px", mt: 1, '&:hover': { bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36', } }}>Items</MenuItem>
                                            {NFTs.map((nft) => {
                                                return <MenuItem key={nft._id.$oid} id="result" sx={{
                                                    color: theme == 'light' ? '#808080' : '#f9f9f9', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36',
                                                    '&:hover': {
                                                        bgcolor: theme == 'light' ? `${Colors.gray1}` : `${Colors.dark3}`,
                                                    }
                                                }}
                                                ><ItemBrief wallet={nft.current_owner} id={nft._id.$oid} image={nft.nft_image_path} title={nft.title} collection={nft.collection_name} /></MenuItem>
                                            })}
                                        </> : undefined}
                                    </>
                                }
                            </>
                            : <MenuItem id="title" sx={{ color: theme == 'light' ? '#4d4d4d' : '#999999', bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36', cursor: "context-menu", fontWeight: 600, fontSize: "14px", '&:hover': { bgcolor: theme == 'light' ? '#ffffff' : '#1E0E36', } }}>no results found</MenuItem>
                        }
                    </>}

            </Popper>
        </ClickAwayListener>
    )


}