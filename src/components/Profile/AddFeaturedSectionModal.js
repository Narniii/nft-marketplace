import { Box, InputBase, Modal, Skeleton, Typography } from "@mui/material";
import { ArrowLeft2, CloseSquare, Translate } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { removeItem } from "../../redux/actions";
import { MARKET_API } from "../../utils/data/market_api";
import { ButtonLarge } from "../design/Buttons";
import { Colors } from "../design/Colors";
import NoItemFound from "../NoItem";
import SelectFeaturedCard from "./SelectFeaturedCard";


const Line = styled.div`
    background: linear-gradient(90deg,#60606000 0%, #80808080 50%,#918A7A00 100%);
    height:1px;
    align-self:center;
    width:80%;
`;
const NextButtonHolder = styled.div`
display:flex;
justify-content:end;
background-color:transparent;
// width:300px;
padding:0 20px 20px 0;
width:100%;
@media screen and (max-width: 992px) {
    padding:20px;
}
@media screen and (max-width: 900px) {
    background-color: ${({ theme }) => theme.collectionCard};
    width:100%;
    padding:20px;
    box-shadow: 0px -5px 11px rgba(0, 0, 0, 0.12);
    border-radius: 48px 48px 0px 0px;
    position:fixed;
    bottom:0;    
}

    `

const InputBox = styled.div`
border:${({ theme }) => theme.searchBoxBorder};
box-shadow:${({ theme }) => theme.searchBoxShadow};
border-radius:30px;
background:transparent;
width:100%;
// @media screen and (max-width: 575px) {
//   width:100%;
// }
`;


const AddFeatured = ({ open, handleClose, theme, setFeaturedItems, }) => {
    const apiCall = useRef(undefined)
    const [items, setItems] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const globalUser = useSelector(state => state.userReducer)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetchItems()
        return () => {
            if (apiCall.current != undefined)
                apiCall.current.cancel();

        }
    }, [])

    const fetchItems = async () => {
        try {
            apiCall.current = MARKET_API.request({
                path: `/nft/user/`,
                method: "post",
                body: {
                    wallet_address: globalUser.walletAddress
                }
            })
            const response = await apiCall.current.promise;
            console.log('user items', response)
            if (!response.isSuccess)
                throw response
            setItems(response.data)
            // setLoading(false)
        }
        catch (err) {
            console.log(err)
            if (err.status == 404) {
                setItems([])
            }
            else if (err.status == 500) {
                setErr("Internal server error")
            }
            // setLoading(false)
        }
    }

    useEffect(() => {
        if (items)
            setLoading(false)
    }, [items])

    const [checked, setChecked] = useState([])
    const [value, setValue] = useState(undefined)
    const [selectedItems, setSelectedItems] = useState([])
    const [section, setSection] = useState({})
    const [apiLoading, setApiLoading] = useState(false)
    const [successMesssage, setSuccessMesssage] = useState(false)

    const handleCheck = (e) => {
        console.log(e.target.current)
        e.preventDefault()
        var tempArr = checked;
        setValue(e.target.id)
        // console.log(e.target.id)
        if (tempArr.includes(e.target.id)) {
            const removeItem = tempArr.filter((item) => item != e.target.id);
            tempArr = removeItem
        }
        else {
            tempArr.push(e.target.id)
        }

        var tempItems = []
        for (var i = 0; i < items.length; i++) {
            if (tempArr.includes(items[i]._id.$oid)) {
                tempItems.push(items[i])
            }
        }


        setChecked(tempArr)
        setSelectedItems(tempItems)
        console.log(tempArr)

        if (tempArr.includes(e.target.id)) {
            window.document.getElementById(e.target.id).style.backgroundColor = `${Colors.recommendedDark}`;
            window.document.getElementById(e.target.id).style.borderColor = `${Colors.gray0}`;
        } else {
            window.document.getElementById(e.target.id).style.backgroundColor = `${Colors.gray0}`;
            window.document.getElementById(e.target.id).style.borderColor = `${Colors.recommendedDark}`;
        }

    }


    const [state, setState] = useState('select-items')
    const backStateHandler = () => {
        if (state == 'review-items') {
            setState('select-items')
        } else if (state == 'enter-details') {
            setState('review-items')
        }
    }

    const removeItem = (e) => {
        console.log(e.target.id)
        const removeItem = selectedItems.filter((item) => item._id.$oid !== e.target.id);
        const removeId = checked.filter((item) => item != e.target.id);
        console.log('remove id', removeId)
        console.log('remove item', removeItem)
        setChecked(removeId)
        setSelectedItems(removeItem)
    }


    const onChange = e => {
        var s = { ...section };
        s[e.target.name] = e.target.value;
        setSection(s)
    }

    const handleSubmit = async () => {
        console.log({
            title: section.title,
            description: section.description,
            nft_ids: checked,
            user_wallet: globalUser.walletAddress
        })
        try {
            apiCall.current = MARKET_API.request({
                path: `/featured/create/`,
                method: "post",
                body: {
                    title: section.title,
                    description: section.description ? section.description : ' ',
                    nft_ids: JSON.stringify(checked),
                    user_id: globalUser.walletAddress
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            let resp = await apiCall.current.promise;
            console.log('submit resp', resp)

            if (!resp.isSuccess)
                throw resp

            setSuccessMesssage('section created successfully')
            setApiLoading(false)
        }
        catch (err) {
            setErr(err.statusText)
            setApiLoading(false)
        }


    }


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            // className="d-md-none"
            // inputProps={{MenuProps: {disableScrollLock: true}}}
            disableScrollLock={true}
            className='d-flex align-items-center justify-content-center'
        >
            <Box
                sx={{
                    // position: "absolute",
                    // top: { xs: '0', md: '25%' },
                    // left: { xs: '0', md: '15%' },
                    width: { xs: '100%', md: '70%' },
                    height: { xs: '100%', md: 'auto' },
                    borderRadius: { xs: '0', md: '24px' },
                    bgcolor: theme == 'light' ? "#ffffff" : "#272448",
                    justifySelf: "center",
                    alignSelf: "center",
                    // padding: "20px"
                }}
                // onClick={toggleDrawer(anchor, false)}
                // onKeyDown={handleClose}
                className="d-flex flex-column justify-content-start"
            >
                <Box className='d-flex justify-content-between p-3 align-items-center align-items-center'>
                    {state == 'select-items' ?
                        <Typography sx={{ fontWeight: "bold", fontSize: "20px", display: "flex", alignItems: "center" }}>
                            Featured Items
                        </Typography>
                        :
                        state == 'review-items' ?
                            <Typography sx={{ fontWeight: "bold", fontSize: "20px", display: "flex", alignItems: "center" }}>
                                <ArrowLeft2 cursor="pointer" onClick={backStateHandler} />
                                <span>Review And Reorder Items</span>
                            </Typography>
                            :
                            <Typography sx={{ fontWeight: "bold", fontSize: "20px", display: "flex", alignItems: "center" }}>
                                <ArrowLeft2 cursor="pointer" onClick={backStateHandler} />
                                <span>Enter Details</span>
                            </Typography>
                    }
                    <CloseSquare onClick={handleClose} style={{ cursor: "pointer" }} />
                </Box>
                <Line className="mb-5" />
                <Box className="d-flex p-0" >
                    {loading ? <>
                        <div className="col-12 col-sm-6 col-md-4 p-1">
                            <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                        </div>
                        <div className="d-none d-sm-block col-12 col-sm-6 col-md-4 p-1">
                            <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                        </div>
                        <div className="d-none d-md-block col-12 col-sm-6 col-md-4 p-1">
                            <Skeleton variant="rounded" height={300} sx={{ width: "100%", borderRadius: "24px" }} />
                        </div>
                    </>
                        :
                        <>
                            {state == 'select-items' ?
                                <Box className="d-flex flex-column w-100">
                                    {items.length == 0 ?
                                        <NoItemFound text={'no item found'} />
                                        : <>
                                            <Box sx={{
                                                height: { xs: '100%', md: 540 },
                                                overflow: "scroll",
                                                '&::-webkit-scrollbar': {
                                                    display: 'none',
                                                }
                                            }} className="row p-3">
                                                {items.map((item) => {
                                                    return (
                                                        <SelectFeaturedCard checked={checked} state={state} index={checked.indexOf(item._id.$oid) + 1} handleCheck={handleCheck} itemId={item._id.$oid} itemImage={item.nft_image_path} itemName={item.title} />
                                                    )
                                                })}
                                            </Box>

                                            <NextButtonHolder className="">
                                                <div className="col-12 col-lg-3">
                                                    <ButtonLarge disabled={selectedItems.length == 0 ? true : false} onClick={() => setState('review-items')}>Next</ButtonLarge>
                                                </div>
                                            </NextButtonHolder>
                                        </>
                                    }
                                </Box>
                                :
                                state == 'review-items' ?
                                    <Box className="d-flex flex-column w-100">
                                        {selectedItems.length == 0 ?
                                            <NoItemFound text={'no item found'} />
                                            : <>
                                                <Box sx={{
                                                    height: { xs: '100%', md: 540 },
                                                    overflow: "scroll",
                                                    '&::-webkit-scrollbar': {
                                                        display: 'none',
                                                    }
                                                }} className="row p-3">
                                                    {selectedItems.map((item) => {
                                                        return (
                                                            <SelectFeaturedCard removeItem={removeItem} state={state} index={checked.length !== 0 ? checked.indexOf(item._id.$oid) + 1 : undefined} handleCheck={handleCheck} itemId={item._id.$oid} itemImage={item.nft_image_path} itemName={item.title} />
                                                        )
                                                    })}
                                                </Box>

                                                <NextButtonHolder className="">
                                                    <div className="col-12 col-lg-3">
                                                        <ButtonLarge disabled={selectedItems.length == 0 ? true : false} onClick={() => setState('enter-details')}>Next</ButtonLarge>
                                                    </div>
                                                </NextButtonHolder>
                                            </>
                                        }
                                    </Box>
                                    :
                                    state == 'enter-details' ?
                                        <Box className="d-flex flex-column w-100">
                                            <Box className="d-flex flex-column p-3">
                                                <p style={{ fontWeight: 500 }} className="mb-2">Title</p>
                                                <InputBox className="mb-5 py-2 px-3 d-flex justify-content-between">
                                                    <div className="col-11 p-0">
                                                        <InputBase
                                                            name="title"
                                                            onChange={onChange}
                                                            sx={{ color: "inherit", width: "100%", height: "100%" }}
                                                            placeholder="my featured items"
                                                            inputProps={{ 'aria-label': 'my featured items' }}
                                                        />
                                                    </div>
                                                </InputBox>
                                                <p style={{ fontWeight: 500 }} className="mb-2">description(optional)</p>
                                                <InputBox className="mb-5 py-2 px-3 d-flex justify-content-between">
                                                    <div className="col-11 p-0">
                                                        <InputBase
                                                            name="description"
                                                            onChange={onChange}
                                                            sx={{ color: "inherit", width: "100%", height: "100%" }}
                                                            placeholder="Add A Description"
                                                            inputProps={{ 'aria-label': 'Add A Description' }}
                                                        />
                                                    </div>
                                                </InputBox>
                                            </Box>
                                            {selectedItems.length == 0 ?
                                                <NoItemFound text={'no item found'} />
                                                : <>
                                                    <Box sx={{
                                                        height: { xs: '100%', md: 300 },
                                                        padding: '0 10px 0 10px',
                                                        overflow: "scroll",
                                                        '&::-webkit-scrollbar': {
                                                            display: 'none',
                                                        }
                                                    }} className="d-flex flex-wrap w-100">
                                                        {selectedItems.map((item) => {
                                                            return (
                                                                <SelectFeaturedCard state={state} index={checked.length !== 0 ? checked.indexOf(item._id.$oid) + 1 : undefined} handleCheck={handleCheck} itemId={item._id.$oid} itemImage={item.nft_image_path} itemName={item.title} />
                                                            )
                                                        })}
                                                    </Box>
                                                    <div className="d-flex col-12 justify-content-center justify-content-lg-end pe-lg-4 ">
                                                        {successMesssage ? <Typography sx={{ color: Colors.successDark }}>{successMesssage}</Typography> : undefined}
                                                    </div>

                                                    <NextButtonHolder className="">
                                                        <div className="col-12 col-lg-3">
                                                            <ButtonLarge disabled={checked.length == 0 ? true : false} onClick={handleSubmit}>Done</ButtonLarge>
                                                        </div>
                                                    </NextButtonHolder>
                                                </>
                                            }
                                        </Box>
                                        : undefined
                            }
                        </>
                    }
                </Box>
            </Box>
        </Modal>
    );
}

export default AddFeatured;