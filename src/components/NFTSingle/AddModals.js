import { Box, InputBase, Modal } from "@mui/material";
import { AddSquare, CloseCircle, CloseSquare } from "iconsax-react";
import { useState } from "react";
import styled from "styled-components";
import { ButtonLarge, ButtonOutline } from "../design/Buttons";
const InP = styled.div`
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
const AddModals = ({ saveRoyalties, saveProperties, saveFunds, openRoyalties, openProperties, openFunds, handleClose, theme, prevProperties, prevRoyalties }) => {
    const [properties, setProperties] = useState(prevProperties)
    const [funds, setFunds] = useState([{ name: '', value: '', count: '' }])
    const [royalties, setRoyalties] = useState(prevRoyalties)
    function PropertyView({ property, setProperty, removeProperty }) {
        return (
            <div className="d-flex justify-content-between mb-1">
                <div className="d-flex flex-column col-7">
                    <InP className="d-flex p-2 me-2">
                        <InputBase
                            value={property.name}
                            sx={{ color: "inherit", padding: "0 !important" }}
                            placeholder="Character"
                            inputProps={{ 'aria-label': 'search google maps' }}
                            onChange={e => {
                                let p = { ...property };
                                p.name = e.target.value;
                                setProperty(p);
                            }} />
                    </InP>
                </div>
                <div className="d-flex flex-column col-5">
                    <div className="d-flex justify-content-between align-items-center">
                        <InP className="d-flex p-2 me-1">
                            <InputBase
                                sx={{ color: "inherit", padding: "0 !important" }}
                                placeholder="Male"
                                inputProps={{ 'aria-label': 'search google maps' }}
                                value={property.value} onChange={e => {
                                    let p = { ...property };
                                    p.value = e.target.value;
                                    setProperty(p);
                                }} />
                        </InP>
                        <CloseCircle size="28" onClick={e => removeProperty({ ...property })} />
                    </div>
                </div>
            </div>
        )
    }
    function RoyaltyView({ royalty, setRoyalty, removeRoyalty }) {
        return (
            <div className="d-flex justify-content-between mb-1">
                <div className="d-flex flex-column col-7">
                    <InP className="d-flex p-2 me-2">
                        <InputBase
                            value={royalty.wallet_address}
                            sx={{ color: "inherit", padding: "0 !important" }}
                            placeholder="wallet address"
                            inputProps={{ 'aria-label': 'search google maps' }}
                            onChange={e => {
                                let p = { ...royalty };
                                p.wallet_address = e.target.value;
                                setRoyalty(p);
                            }} />
                    </InP>
                </div>
                <div className="d-flex flex-column col-5">
                    <div className="d-flex justify-content-between align-items-center">
                        <InP className="d-flex p-2 me-1">
                            <InputBase
                                sx={{ color: "inherit", padding: "0 !important" }}
                                placeholder="5"
                                inputProps={{ 'aria-label': 'search google maps' }}
                                value={royalty.royalty} onChange={e => {
                                    let p = { ...royalty };
                                    p.royalty = e.target.value;
                                    setRoyalty(p);
                                }} />
                        </InP>
                        <CloseCircle size="28" onClick={e => removeRoyalty({ ...royalty })} />
                    </div>
                </div>
            </div>
        )
    }
    function FundView({ fund, setFund, removeFund }) {
        return (
            <div className="d-flex justify-content-between mb-1">
                <div className="d-flex flex-column col-6">
                    <InP className="d-flex p-2 me-2">
                        <InputBase
                            value={fund.name}
                            sx={{ color: "inherit", padding: "0 !important" }}
                            placeholder="Character"
                            inputProps={{ 'aria-label': 'search google maps' }}
                            onChange={e => {
                                let p = { ...fund };
                                p.name = e.target.value;
                                setFund(p);
                            }} />
                    </InP>
                </div>
                <div className="d-flex flex-column col-6">
                    <div className="d-flex justify-content-between align-items-center">
                        <InP className="d-flex p-2 ">
                            <InputBase
                                sx={{ color: "inherit", padding: "0 !important" }}
                                placeholder="4"
                                inputProps={{ 'aria-label': 'search google maps' }}
                                value={fund.value} onChange={e => {
                                    let p = { ...fund };
                                    p.value = e.target.value;
                                    setFund(p);
                                }} />
                        </InP>
                        <span className="mx-1">Of</span>
                        <InP className="d-flex p-2 ">
                            <InputBase
                                sx={{ color: "inherit", padding: "0 !important" }}
                                placeholder="4"
                                inputProps={{ 'aria-label': 'search google maps' }}
                                value={fund.count} onChange={e => {
                                    let p = { ...fund };
                                    p.count = e.target.value;
                                    setFund(p);
                                }} />
                        </InP>
                        <CloseCircle size="40" className="mx-1" onClick={e => removeFund({ ...fund })} />
                    </div>
                </div>
            </div>
        )
    }
    return (

        <>
            {/* add properties modal  */}
            <Modal
                open={openProperties}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                // className="d-md-none"
                // inputProps={{MenuProps: {disableScrollLock: true}}}
                disableScrollLock={true}
            >
                <Box sx={{
                    width: '50%',
                    // height: '50%',
                    borderRadius: "24px",
                    position: "absolute",
                    top: "25%",
                    left: "25%",
                    p: 4,
                    bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                    '@media screen and (max-width: 768px)': {
                        width: '90%',
                        left: "5%",

                    },
                }} className="d-flex flex-column justify-content-between">
                    <div className="d-flex flex-column">
                        <Box className="d-flex justify-content-between">
                            <div className="mb-4 d-flex justify-content-start" ><p style={{ margin: 0, fontWeight: "bold" }}>add properties</p></div><div className="d-flex justify-content-end" style={{ cursor: "pointer" }} onClick={handleClose}><CloseSquare /></div>
                        </Box>
                        <p>Properties show up underneath your item, are clickable, and can be filtered in your collection's sidebar.</p>
                        <div className="d-flex justify-content-between">
                            <div className="col-7">
                                <p style={{ fontWeight: 600 }}>Type</p>
                            </div>
                            <div className="col-5">
                                <p style={{ fontWeight: 600 }}>Name</p>
                            </div>
                        </div>
                        {properties ? <>
                            {properties.map((property, index) => {
                                const setProperty = (p) => {
                                    let pr = [...properties];
                                    pr[index] = { ...p };
                                    setProperties(pr);
                                };
                                const removeProperty = (p) => {
                                    let pr = [...properties];
                                    let indx = pr.indexOf(pr[index])
                                    pr.splice(indx, 1)
                                    setProperties(pr)
                                }
                                return <PropertyView key={index} property={property} setProperty={setProperty} removeProperty={removeProperty} />
                            })}</> : <></>}
                        <div className="d-flex justify-content-end mt-2 mb-5"><ButtonOutline onClick={() => {
                            let p = [...properties];
                            let pr = {
                                name: '',
                                value: '',
                            };;
                            p.push(pr);
                            setProperties(p);
                        }}
                            style={{ fontSize: "14px", padding: "5px 10px" }}><AddSquare size="15" className="me-1" />Add More</ButtonOutline>
                        </div>
                    </div>

                    <ButtonLarge onClick={() => saveProperties(properties)}>Save</ButtonLarge>
                </Box>
            </Modal>


            {/* add royalties modal  */}
            <Modal
                open={openRoyalties}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                // className="d-md-none"
                // inputProps={{MenuProps: {disableScrollLock: true}}}
                disableScrollLock={true}
            >
                <Box sx={{
                    width: '50%',
                    // height: '50%',
                    borderRadius: "24px",
                    position: "absolute",
                    top: "25%",
                    left: "25%",
                    p: 4,
                    bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                    '@media screen and (max-width: 768px)': {
                        width: '90%',
                        left: "5%",

                    },
                }} className="d-flex flex-column justify-content-between">
                    <div className="d-flex flex-column">
                        <Box className="d-flex justify-content-between">
                            <div className="mb-4 d-flex justify-content-start" ><p style={{ margin: 0, fontWeight: "bold" }}>add royalties</p></div><div className="d-flex justify-content-end" style={{ cursor: "pointer" }} onClick={handleClose}><CloseSquare /></div>
                        </Box>
                        <p>select royalty percentage.</p>
                        <div className="d-flex justify-content-between">
                            <div className="col-7">
                                <p style={{ fontWeight: 600 }}>wallet address</p>
                            </div>
                            <div className="col-5">
                                <p style={{ fontWeight: 600 }}>royalty</p>
                            </div>
                        </div>
                        {royalties.map((royalty, index) => {
                            const setRoyalty = (p) => {
                                let pr = [...royalties];
                                pr[index] = { ...p };
                                setRoyalties(pr);
                            };
                            const removeRoyalty = (p) => {
                                let pr = [...royalties];
                                let indx = pr.indexOf(pr[index])
                                pr.splice(indx, 1)
                                setRoyalties(pr)
                            }
                            return <RoyaltyView key={index} royalty={royalty} setRoyalty={setRoyalty} removeRoyalty={removeRoyalty} />
                        })}
                        <div className="d-flex justify-content-end mt-2 mb-5"><ButtonOutline onClick={() => {
                            let p = [...royalties];
                            let pr = {
                                wallet_address: '',
                                royalty: '',
                            };;
                            p.push(pr);
                            setRoyalties(p);
                        }}
                            style={{ fontSize: "14px", padding: "5px 10px" }}><AddSquare size="15" className="me-1" />Add More</ButtonOutline>
                        </div>
                    </div>

                    <ButtonLarge onClick={() => saveRoyalties(royalties)}>Save</ButtonLarge>
                </Box>
            </Modal>


            {/* add funds modal  */}
            <Modal
                open={openFunds}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                // className="d-md-none"
                // inputProps={{MenuProps: {disableScrollLock: true}}}
                disableScrollLock={true}
            >
                <Box sx={{
                    width: '50%',
                    // height: '50%',
                    borderRadius: "24px",
                    position: "absolute",
                    top: "25%",
                    left: "25%",
                    p: 4,
                    bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                    '@media screen and (max-width: 768px)': {
                        width: '90%',
                        left: "5%",

                    },

                }} className="d-flex flex-column justify-content-between">
                    <div className="d-flex flex-column">
                        <Box className="d-flex justify-content-between">
                            <div className="mb-4 d-flex justify-content-start" ><p style={{ margin: 0, fontWeight: "bold" }}>add funds</p></div><div className="d-flex justify-content-end" style={{ cursor: "pointer" }} onClick={handleClose}><CloseSquare /></div>
                        </Box>
                        <p>Properties show up underneath your item, are clickable, and can be filtered in your collection's sidebar.</p>
                        <div className="d-flex justify-content-between">
                            <div className="col-6">
                                <p style={{ fontWeight: 600 }}>Name</p>
                            </div>
                            <div className="col-6">
                                <p style={{ fontWeight: 600 }}>Value</p>
                            </div>
                        </div>

                        {funds.map((fund, index) => {
                            const setFund = (p) => {
                                let pr = [...funds];
                                pr[index] = { ...p };
                                setFunds(pr);
                            };
                            const removeFund = (p) => {
                                let pr = [...funds];
                                let indx = pr.indexOf(pr[index])
                                pr.splice(indx, 1)
                                setFunds(pr)
                            }
                            return <FundView key={index} fund={fund} setFund={setFund} removeFund={removeFund} />
                        })}
                        {/* <div className="d-flex justify-content-between">
                        <div className="d-flex flex-column col-6">
                            <InP className="d-flex p-2 me-2">
                                <InputBase
                                    sx={{ color: "inherit", padding: "0 !important" }}
                                    placeholder="Character"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                // onChange={handleClick}
                                // onChange={handleChange('top')}
                                />
                            </InP>
                        </div>
                        <div className="d-flex flex-column col-6">
                            <div className="d-flex justify-content-between align-items-center">
                                <InP className="d-flex p-2 ">
                                    <InputBase
                                        sx={{ color: "inherit", padding: "0 !important" }}
                                        placeholder="4"
                                        inputProps={{ 'aria-label': 'search google maps' }}
                                    // onChange={handleClick}
                                    // onChange={handleChange('top')}
                                    />
                                </InP>
                                <span className="mx-1">Of</span>
                                <InP className="d-flex p-2 ">
                                    <InputBase
                                        sx={{ color: "inherit", padding: "0 !important" }}
                                        placeholder="4"
                                        inputProps={{ 'aria-label': 'search google maps' }}
                                    // onChange={handleClick}
                                    // onChange={handleChange('top')}
                                    />
                                </InP>
                                <CloseCircle size="40" className="mx-1" />
                            </div>
                        </div>
                    </div> */}
                        <div className="d-flex justify-content-end mt-2 mb-5"><ButtonOutline style={{ fontSize: "14px", padding: "5px 10px" }} onClick={() => {
                            let p = [...funds];
                            let pr = {
                                name: '',
                                value: '',
                            };;
                            p.push(pr);
                            setFunds(p);
                        }}><AddSquare size="15" className="me-1" />Add More</ButtonOutline></div>
                    </div>

                    <ButtonLarge onClick={() => saveFunds(funds)}>Save</ButtonLarge>
                </Box>
            </Modal>


        </>);
}

export default AddModals;



