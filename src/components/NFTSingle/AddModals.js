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
const AddModals = ({
    openProperties,
    saveProperties,
    openRoyalties,
    saveRoyalties,
    openLevels,
    saveLevels,
    openStats,
    saveStats,
    prevProperties, prevRoyalties, prevLevels, prevStats,
    handleClose, theme,
}) => {
    const [properties, setProperties] = useState(prevProperties)
    const [levels, setLevels] = useState(prevLevels)
    const [stats, setStats] = useState(prevStats)
    const [royalties, setRoyalties] = useState(prevRoyalties)

    function PropertyView({ property, setProperty, removeProperty }) {
        console.log(property)
        return (
            <div className="d-flex justify-content-between mb-1">
                <div className="d-flex flex-column col-7">
                    <InP className="d-flex p-2 me-2">
                        <InputBase
                            value={property.name !== '' ? property.name : undefined}
                            sx={{ color: "inherit", padding: "0 !important" }}
                            placeholder={property.name !== '' ? property.name : "Character"}
                            inputProps={{ 'aria-label': '' }}
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
                                placeholder={property.value !== '' ? property.value : "Man"}
                                inputProps={{ 'aria-label': '' }}
                                value={property.value !== '' ? property.value : undefined} onChange={e => {
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
                            value={royalty.wallet_address !== ' ' ? royalty.wallet_address : undefined}
                            sx={{ color: "inherit", padding: "0 !important" }}
                            placeholder={royalty.wallet_address !== ' ' ? royalty.wallet_address : 'wallet address'}
                            inputProps={{ 'aria-label': '' }}
                            onChange={e => {
                                let p = { ...royalty };
                                p.wallet_address = e.target.value.toString();
                                setRoyalty(p);
                            }} />
                    </InP>
                </div>
                <div className="d-flex flex-column col-5">
                    <div className="d-flex justify-content-between align-items-center">
                        <InP className="d-flex p-2 me-1">
                            {console.log(royalty.royalty !== '0')}

                            <InputBase
                                sx={{ color: "inherit", padding: "0 !important" }}
                                placeholder={royalty.royalty !== '0' ? royalty.royalty : '5'}
                                inputProps={{ 'aria-label': '' }}
                                value={royalty.royalty !== '0' ? royalty.royalty : undefined} onChange={e => {
                                    let p = { ...royalty };
                                    p.royalty = e.target.value.toString();
                                    setRoyalty(p);
                                }} />
                        </InP>
                        <CloseCircle size="28" onClick={e => removeRoyalty({ ...royalty })} />
                    </div>
                </div>
            </div>
        )
    }
    function LevelView({ level, setLevel, removeLevel }) {
        return (
            <div className="d-flex justify-content-between mb-1">
                <div className="d-flex flex-column col-6">
                    <InP className="d-flex p-2 me-2">
                        <InputBase
                            value={level.name !== '' ? level.name : undefined}
                            sx={{ color: "inherit", padding: "0 !important" }}
                            placeholder="Speed"
                            inputProps={{ 'aria-label': '' }}
                            onChange={e => {
                                let p = { ...level };
                                p.name = e.target.value;
                                setLevel(p);
                            }} />
                    </InP>
                </div>
                <div className="d-flex flex-column col-6">
                    <div className="d-flex justify-content-between align-items-center">
                        <InP className="d-flex p-2 ">
                            <InputBase
                                type="number"
                                sx={{ color: "inherit", padding: "0 !important" }}
                                placeholder="4"
                                inputProps={{ 'aria-label': '' }}
                                value={level.value !== '' ? level.value : undefined} onChange={e => {
                                    let p = { ...level };
                                    p.value = e.target.value;
                                    setLevel(p);
                                }} />
                        </InP>
                        <span className="mx-1">Of</span>
                        <InP className="d-flex p-2 ">
                            <InputBase
                                type="number"
                                sx={{ color: "inherit", padding: "0 !important" }}
                                placeholder="4"
                                inputProps={{ 'aria-label': '' }}
                                value={level.count !== '' ? level.count : undefined} onChange={e => {
                                    let p = { ...level };
                                    p.count = e.target.value;
                                    setLevel(p);
                                }} />
                        </InP>
                        <CloseCircle size="40" className="mx-1" onClick={e => removeLevel({ ...level })} />
                    </div>
                </div>
            </div>
        )
    }
    function StatView({ stat, setStat, removeStat }) {
        return (
            <div className="d-flex justify-content-between mb-1">
                <div className="d-flex flex-column col-6">
                    <InP className="d-flex p-2 me-2">
                        <InputBase
                            value={stat.name !== '' ? stat.name : undefined}
                            sx={{ color: "inherit", padding: "0 !important" }}
                            placeholder="Speed"
                            inputProps={{ 'aria-label': '' }}
                            onChange={e => {
                                let p = { ...stat };
                                p.name = e.target.value;
                                setStat(p);
                            }} />
                    </InP>
                </div>
                <div className="d-flex flex-column col-6">
                    <div className="d-flex justify-content-between align-items-center">
                        <InP className="d-flex p-2 ">
                            <InputBase
                                type="number"
                                sx={{ color: "inherit", padding: "0 !important" }}
                                placeholder="4"
                                inputProps={{ 'aria-label': '' }}
                                value={stat.value !== '' ? stat.value : undefined} onChange={e => {
                                    let p = { ...stat };
                                    p.value = e.target.value;
                                    setStat(p);
                                }} />
                        </InP>
                        <span className="mx-1">Of</span>
                        <InP className="d-flex p-2 ">
                            <InputBase
                                type="number"
                                sx={{ color: "inherit", padding: "0 !important" }}
                                placeholder="4"
                                inputProps={{ 'aria-label': '' }}
                                value={stat.count !== '' ? stat.count : undefined} onChange={e => {
                                    let p = { ...stat };
                                    p.count = e.target.value;
                                    setStat(p);
                                }} />
                        </InP>
                        <CloseCircle size="40" className="mx-1" onClick={e => removeStat({ ...stat })} />
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
                        {properties && properties.length !== 0 ? <>
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
                        <div className="d-flex mt-2 mb-5 align-self-end"><ButtonOutline onClick={() => {
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
                        {royalties ? <>
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
                        </> : undefined}
                        <div className="d-flex mt-2 mb-5 align-self-end"><ButtonOutline onClick={() => {
                            let p = [...royalties];
                            let pr = {
                                wallet_address: ' ',
                                royalty: '0',
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


            {/* add levels modal  */}
            <Modal
                open={openLevels}
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
                            <div className="mb-4 d-flex justify-content-start" ><p style={{ margin: 0, fontWeight: "bold" }}>Add Levels</p></div><div className="d-flex justify-content-end" style={{ cursor: "pointer" }} onClick={handleClose}><CloseSquare /></div>
                        </Box>
                        <p>Levels are numerical traits that show as a progress bar</p>
                        <div className="d-flex justify-content-between">
                            <div className="col-6">
                                <p style={{ fontWeight: 600 }}>Name</p>
                            </div>
                            <div className="col-6">
                                <p style={{ fontWeight: 600 }}>Value</p>
                            </div>
                        </div>
                        {levels ? <>
                            {levels.map((level, index) => {
                                const setLevel = (p) => {
                                    let pr = [...levels];
                                    pr[index] = { ...p };
                                    setLevels(pr);
                                };
                                const removeLevel = (p) => {
                                    let pr = [...levels];
                                    let indx = pr.indexOf(pr[index])
                                    pr.splice(indx, 1)
                                    setLevels(pr)
                                }
                                return <LevelView key={index} level={level} setLevel={setLevel} removeLevel={removeLevel} />
                            })}
                        </> : <></>}
                        <div className="d-flex mt-2 mb-5 align-self-end"><ButtonOutline onClick={() => {
                            let p = [...levels];
                            let pr = {
                                name: '',
                                value: '',
                            };;
                            p.push(pr);
                            setLevels(p);
                        }}><AddSquare size="15" className="me-1" />Add More</ButtonOutline></div>
                    </div>

                    <ButtonLarge onClick={() => saveLevels(levels)}>Save</ButtonLarge>
                </Box>
            </Modal>


            {/* add stats modal  */}
            <Modal
                open={openStats}
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
                            <div className="mb-4 d-flex justify-content-start" ><p style={{ margin: 0, fontWeight: "bold" }}>Add Stats</p></div><div className="d-flex justify-content-end" style={{ cursor: "pointer" }} onClick={handleClose}><CloseSquare /></div>
                        </Box>
                        <p>Stats are numerical traits that show as Numbers</p>
                        <div className="d-flex justify-content-between">
                            <div className="col-6">
                                <p style={{ fontWeight: 600 }}>Name</p>
                            </div>
                            <div className="col-6">
                                <p style={{ fontWeight: 600 }}>Value</p>
                            </div>
                        </div>
                        {stats ? <>
                            {stats.map((stat, index) => {
                                const setStat = (p) => {
                                    let pr = [...stats];
                                    pr[index] = { ...p };
                                    setStats(pr);
                                };
                                const removeStat = (p) => {
                                    let pr = [...stats];
                                    let indx = pr.indexOf(pr[index])
                                    pr.splice(indx, 1)
                                    setStats(pr)
                                }
                                return <StatView key={index} stat={stat} setStat={setStat} removeStat={removeStat} />
                            })}
                        </> : <></>}
                        <div className="d-flex mt-2 mb-5 align-self-end"><ButtonOutline onClick={() => {
                            let p = [...stats];
                            let pr = {
                                name: '',
                                value: '',
                            };;
                            p.push(pr);
                            setStats(p);
                        }}><AddSquare size="15" className="me-1" />Add More</ButtonOutline></div>
                    </div>

                    <ButtonLarge onClick={() => saveStats(stats)}>Save</ButtonLarge>
                </Box>
            </Modal>

        </>);
}

export default AddModals;



