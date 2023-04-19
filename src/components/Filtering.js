import { ArrowSwapVertical, FilterSearch, Grid1, Grid2, Grid5, HambergerMenu } from "iconsax-react";
import styled from "styled-components";
import SearchBox from "./Navbar/SearchBox";
import SSelection from "./Selection";

const IconContainer = styled.div`
    border-left: 1px solid #D9D9D9;
    height:50px;
    // padding:4px 0 5px;
    // padding:16px;
    &:hover{
        background-color: ${({ theme }) => theme.hoverIcon};
    }
`;

const Selectionn = styled.div`
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
    font-size:14px;
`;

export const Filtering = ({ theme, handleFilter, handleViewChange, selectOptions, id, selectionId, view, searchingWhat, handleSelection, selectValue }) => {
    return (
        <div className="p-0 d-flex w-100 justify-content-center align-items-center mb-4">
            <div className="d-flex w-100 p-0 justify-content-between align-items-center">
                <div className="d-none d-sm-flex col-sm-4 col-md-5 p-0">
                    <SearchBox theme={theme} id={id} searchingWhat={searchingWhat} />
                </div>
                <div className="d-none d-sm-block col-4 col-md-3 p-0">
                    <div className="mx-1">
                        <SSelection id={selectionId} width={'100%'} theme={theme} tabs={selectOptions} handleSelect={handleSelection} selectValue={selectValue} />
                    </div>
                </div>
                <div className="d-none d-sm-block col-3 p-0">
                    <Selectionn className="mx-1 d-flex ">
                        <IconContainer className="col-3 p-1 p-md-2 text-center d-flex justify-content-center align-items-center" style={{ backgroundColor: view == 'xs' ? theme == 'light' ? '#d9d9d9' : '#332E5F' : 'unset' }} onClick={() => handleViewChange('xs')}><HambergerMenu /></IconContainer>
                        <IconContainer className="col-3 p-1 p-md-2 text-center d-flex justify-content-center align-items-center" style={{ backgroundColor: view == 's' ? theme == 'light' ? '#d9d9d9' : '#332E5F' : 'unset' }} onClick={() => handleViewChange('s')}><Grid1 /></IconContainer>
                        <IconContainer className="col-3 p-1 p-md-2 text-center d-flex justify-content-center align-items-center" style={{ backgroundColor: view == 'm' ? theme == 'light' ? '#d9d9d9' : '#332E5F' : 'unset' }} onClick={() => handleViewChange('m')}><Grid2 /></IconContainer>
                        <IconContainer className="col-3 p-1 p-md-2 text-center d-flex justify-content-center align-items-center" style={{ backgroundColor: view == 'l' ? theme == 'light' ? '#d9d9d9' : '#332E5F' : 'unset' }} onClick={() => handleViewChange('l')}><Grid5 /></IconContainer>
                    </Selectionn>
                </div>



                {/* filter search mobile */}
                <div className="d-flex d-sm-none col-sm-4 col-md-5 p-0" style={{ width: 'calc(100% - 44px)' }}>
                    <SearchBox theme={theme} id={id} searchingWhat={searchingWhat} />
                </div>
                <div className="ms-2 d-flex  justify-content-end d-sm-none p-0">
                    <div className="d-block d-sm-none p-0" style={{ width: "max-content" }}>
                        <Selectionn style={{ borderRadius: "12px", }} className="me-1 d-flex p-3 d-flex justify-content-center">
                            <div style={{ width: "auto" }}><ArrowSwapVertical size="20" /></div>
                        </Selectionn>
                    </div>
                    <div className="p-0" style={{ width: "max-content" }}>
                        <Selectionn style={{ borderRadius: "12px", }} className="d-flex p-3 d-flex justify-content-center" onClick={handleFilter}>
                            <div style={{ width: "auto" }}><FilterSearch size="20" /></div>
                        </Selectionn>
                    </div>
                </div>

                {/* filter search tablet and desktop */}
                <div className="d-none d-sm-flex col-2 col-sm-1 p-0" style={{ width: "max-content" }}>
                    <Selectionn style={{ borderRadius: "12px", }} className="mx-1 d-flex p-3 p-sm-2 p-md-3 d-flex justify-content-center" onClick={handleFilter}>
                        <div style={{ width: "auto" }}><FilterSearch size="20" /></div>
                    </Selectionn>
                </div>
            </div>
        </div>
    )
}