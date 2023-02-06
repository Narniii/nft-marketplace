import { Box, InputBase, MenuItem } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../components/design/Colors";
import Navbar from "../../components/Navbar/Navbar";
import imageBG from '../../assets/image.png'
import SearchBox from "../../components/Navbar/SearchBox";
import { Add, ArrowDown2, Chart, Chart1, InfoCircle, Lock, Lock1, NotificationBing, Star, Star1 } from "iconsax-react";
import { ButtonLarge } from "../../components/design/Buttons";
import '../../styles.css'
import { useSelector } from "react-redux";
import AddModals from "../../components/NFTSingle/AddModals";
const FieldsContainer = styled.div`
    border-radius: 24px;
    background: ${({ theme }) => theme.profilePageGradient};
    display: flex;
    flex-direction: column;
    justify-content:space-between;
`;
const Line = styled.div`
  height:1px;
  width:70%;
  justify-self:center;
  margin:40px auto;
  transform: matrix(-1, 0, 0, 1, 0, 0);
  background: ${({ theme }) => theme.navBorderBackground};
`
const InputBox = styled.div`
border:${({ theme }) => theme.searchBoxBorder};
box-shadow:${({ theme }) => theme.searchBoxShadow};
border-radius:30px;
background:transparent;
width:100%;
@media screen and (max-width: 600px) {
  width:100%;
}
`;
const AddButton = styled.div`
background:${Colors.gradientPurpleStandard};
border-radius:12px;
width:40px;
height:40px;
display:flex;
justify-content:center;
align-items:center;
color:white;
border:1px solid ${Colors.gray2};
cursor:pointer;
`;
const Inf = styled.p`
color:${({ theme }) => theme.info};
margin:0;
`;
const ChainSelect = styled.select`
background:${({ theme }) => theme.itemCardsBackground};
border-radius: 24px;
border:none;
box-shadow:${({ theme }) => theme.boxShadow};
height:50px;
font-weight:600;
color:${({ theme }) => theme.text};
padding:16px;
-webkit-appearance:none;
-moz-appearance:none;
appearance:none;
width:100%;
`;


const CreateNFT = ({ theme, themeToggler }) => {
    const [nft, setNft] = useState({
        img: undefined,
        name: '',
        description: '',
        collection: -1,
        supply: '',
        royalty: '',
        price: ''
    })
    const [loading, setLoading] = useState(true)
    const [apiLoading, setApiLoading] = useState(false)
    const [successMesssage, setSuccessMesssage] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const [collectionErr, setCollectionErr] = useState(undefined)
    const [fetchedCollections, setFetchedCollections] = useState([])
    const [logo, setLogo] = useState(imageBG);
    const [logoErr, setLogoErr] = useState(undefined)
    const apiCall = useRef(undefined)
    const [properties, setProperties] = useState([])
    const [royalties, setRoyalties] = useState([])
    const [addProperties, setAddProperties] = useState(false)
    const [addFunds, setAddFunds] = useState(false)
    const handleClose = () => {
        setAddProperties(false)
        setAddFunds(false)
    }
    const onLogoChange = (e) => {
        var n = { ...nft };
        if (e.target.files && e.target.files[0] && e.target.files[0].type.indexOf("image") !== -1) {
            setLogoErr(undefined)
            n.img = e.target.files[0];
            const [file] = e.target.files;
            setLogo(URL.createObjectURL(file));
            setNft(n);
        }
        else {
            n[e.target.name] = undefined;
            setNft(n);
            setLogo(imageBG)
            setLogoErr("Selected file is not an image")
        }
    }

    useEffect(() => {
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])
    // useEffect(() => {
    //     if (userDetails.isLoggedIn)
    //         fetchCollections()
    // }, [userDetails])

    const onChange = e => {
        var n = { ...nft };
        n[e.target.name] = e.target.value;
        setNft(n);
    }

    // const { globalUser } = useSelector(state => state.userReducer);
    // const { caart } = useSelector(state => state.cart);
    // console.log(globalUser)
    // console.log(caart)

    return (<>
        <div style={{ padding: "0 32px" }}>
            <Navbar theme={theme} themeToggler={themeToggler} />
            <div className="d-flex flex-column px-0 py-2">
                <h5 className="my-1" style={{ fontWeight: "bold" }}>Create New Item</h5>
                <FieldsContainer className="p-3">
                    {/* first section fields */}
                    <div className="p-0 d-flex flex-column flex-md-row-reverse">
                        <div className="col-12 col-sm-6 d-flex justify-content-end align-items-center">
                            <Box sx={{
                                border: `2px dashed ${Colors.gray1}`,
                                width: '340px',
                                height: '300px',
                                borderRadius: '20px',
                                position: 'relative',
                                margin: { xs: '0 auto', sm: 0 }
                            }}>
                                <label onChange={onLogoChange} htmlFor="logo">
                                    <input type="file" name="logo" id="logo" hidden />
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundImage: `url(${logo})`, backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        borderRadius: '20px',
                                        cursor: 'pointer',
                                        position: 'absolute',
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                        top: 0,
                                        right: 0
                                    }} />
                                </label>
                            </Box>
                        </div>
                        <div className="col-12 col-sm-8 col-md-6 d-flex flex-column justify-content-between align-items-start">
                            <div className="w-100 d-flex flex-column p-0">
                                <p style={{ fontWeight: "bold", margin: 0 }}>name</p>
                                <InputBox className="p-2 d-flex justify-content-between">
                                    <div className="col-11 p-0">
                                        <InputBase
                                            sx={{ color: "inherit", width: "100%", height: "100%" }}
                                            placeholder="Example@gmail.com"
                                            inputProps={{ 'aria-label': 'enter email' }}
                                        />
                                    </div>
                                    <div className="col-1 p-0 text-center d-flex justify-content-center align-items-center"><NotificationBing size="14" /></div>
                                </InputBox>
                            </div>


                            <div className="w-100 d-flex flex-column p-0">
                                <p style={{ fontWeight: "bold", margin: 0 }}>External link</p>
                                <InputBox className="p-2 d-flex justify-content-between">
                                    <div className="col-11 p-0">
                                        <InputBase
                                            sx={{ color: "inherit", width: "100%", height: "100%" }}
                                            placeholder="Example@gmail.com"
                                            inputProps={{ 'aria-label': 'enter email' }}
                                        />
                                    </div>
                                    <div className="col-1 p-0 text-center d-flex justify-content-center align-items-center"><NotificationBing size="14" /></div>
                                </InputBox>
                            </div>


                            <div className="w-100 d-flex flex-column p-0">
                                <p style={{ fontWeight: "bold", margin: 0 }}>Description</p>
                                <InputBox className="p-2 d-flex justify-content-between">
                                    <div className="col-11 p-0">
                                        <InputBase
                                            sx={{ color: "inherit", width: "100%", height: "100%" }}
                                            placeholder="Example@gmail.com"
                                            inputProps={{ 'aria-label': 'enter email' }}
                                        />
                                    </div>
                                    <div className="col-1 p-0 text-center d-flex justify-content-center align-items-center"><NotificationBing size="14" /></div>
                                </InputBox>
                            </div>

                            <div className="w-100 d-flex flex-column p-0">
                                <p style={{ fontWeight: "bold", margin: 0 }}>collection</p>
                                <InputBox className="p-2 d-flex justify-content-between">
                                    <div className="col-11 p-0">
                                        <InputBase
                                            sx={{ color: "inherit", width: "100%", height: "100%" }}
                                            placeholder="Example@gmail.com"
                                            inputProps={{ 'aria-label': 'enter email' }}
                                        />
                                    </div>
                                    <div className="col-1 p-0 text-center d-flex justify-content-center align-items-center"><NotificationBing size="14" /></div>
                                </InputBox>
                            </div>



                        </div>
                    </div>

                    <Line />
                    {/* second section fields */}
                    <div className="col-12 col-sm-8 col-md-6 d-flex flex-column justify-content-between align-items-start">
                        <div className="my-1 w-100 d-flex flex-row p-0 justify-content-between align-items-center">
                            <div className="d-flex align-items-center justify-content-start"><Inf><Star1 size="26" /></Inf><div className="ms-1 d-flex flex-column justify-content-center align-items-start">
                                <p style={{ fontWeight: "bold", margin: 0, fontSize: "14px" }}>Levels</p><Inf style={{ fontSize: "12px" }}>Numerical traits that show as a progress bar</Inf></div></div>
                            <AddButton onClick={() => setAddProperties(true)}><Add size="20" /></AddButton>
                        </div>

                        <div className="my-1 w-100 d-flex flex-row p-0 justify-content-between align-items-center">
                            <div className="d-flex align-items-center justify-content-start"><Inf><Chart1 size="26" /></Inf><div className="ms-1 d-flex flex-column justify-content-center align-items-start">
                                <p style={{ fontWeight: "bold", margin: 0, fontSize: "14px" }}>Stats</p><Inf style={{ fontSize: "12px" }}>Numerical traits that show as Numbers</Inf></div></div>
                            <AddButton onClick={() => setAddFunds(true)}><Add size="20" /></AddButton>
                        </div>


                        <div className="my-1 w-100 d-flex flex-row p-0 justify-content-between align-items-center">
                            <div className="d-flex align-items-center justify-content-start"><Inf><Lock1 size="26" /></Inf><div className="ms-1 d-flex flex-column justify-content-center align-items-start">
                                <p style={{ fontWeight: "bold", margin: 0, fontSize: "14px" }}>Numerical traits that just show as numbers</p><Inf style={{ fontSize: "12px" }}>Set this item as explicit and sensitive contentinfo</Inf>
                            </div>
                            </div>
                            <label className="switch">
                                <input type="checkbox" />
                                <span className="slider round"></span>
                            </label>
                        </div>

                        <div className="my-1 w-100 d-flex flex-row p-0 justify-content-between align-items-center">
                            <div className="d-flex align-items-center justify-content-start"><Inf><InfoCircle size="26" /></Inf><div className="ms-1 d-flex flex-column justify-content-center align-items-start">
                                <p style={{ fontWeight: "bold", margin: 0, fontSize: "14px" }}>Numerical traits that just show as numbers</p><Inf style={{ fontSize: "12px" }}>Set this item as explicit and sensitive contentinfo</Inf></div></div>
                            <label className="switch">
                                <input type="checkbox" />
                                <span className="slider round"></span>
                            </label>
                        </div>


                    </div>

                    <Line />
                    {/* third section fields */}
                    <div className="col-12 col-sm-8 col-md-6 d-flex flex-column justify-content-between align-items-start">
                        <div className="w-100 d-flex flex-column p-0">
                            <p style={{ fontWeight: "bold", margin: 0 }}>Supply</p>
                            <InputBox className="p-2 d-flex justify-content-between">
                                <div className="col-11 p-0">
                                    <InputBase
                                        sx={{ color: "inherit", width: "100%", height: "100%" }}
                                        placeholder="Example@gmail.com"
                                        inputProps={{ 'aria-label': 'enter email' }}
                                    />
                                </div>
                                <div className="col-1 p-0 text-center d-flex justify-content-center align-items-center"><NotificationBing size="14" /></div>
                            </InputBox>
                        </div>


                        <div className="w-100 d-flex flex-column p-0">
                            <p style={{ fontWeight: "bold", margin: 0 }}>Freeze Metadata</p>
                            <InputBox className="p-2 d-flex justify-content-between">
                                <div className="col-11 p-0">
                                    <InputBase
                                        sx={{ color: "inherit", width: "100%", height: "100%" }}
                                        placeholder="Example@gmail.com"
                                        inputProps={{ 'aria-label': 'enter email' }}
                                    />
                                </div>
                                <div className="col-1 p-0 text-center d-flex justify-content-center align-items-center"><NotificationBing size="14" /></div>
                            </InputBox>
                        </div>


                        <div className="w-100 d-flex flex-column p-0">
                            <p style={{ fontWeight: "bold", margin: 0 }}>Blockchain</p>
                            <label className="position-relative">
                                <ChainSelect>
                                    <option>Ethereum</option>
                                    <option>Solana</option>
                                    <option>Near</option>
                                    <ArrowDown2 />
                                </ChainSelect>
                                <div className="position-absolute top-50 translate-middle end-0" ><ArrowDown2 /></div>
                            </label>
                        </div>


                        <ButtonLarge className="my-5">save</ButtonLarge>
                    </div>
                </FieldsContainer>
            </div>
        </div>

        <AddModals openFunds={addFunds} openProperties={addProperties} handleClose={handleClose} theme={theme} />
    </>);
}

export default CreateNFT;