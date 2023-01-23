import { InputBase } from "@mui/material";
import { NotificationBing } from "iconsax-react";
import styled from "styled-components";
import { ButtonLarge } from "../design/Buttons";

const InputBox = styled.div`
border:${({ theme }) => theme.searchBoxBorder};
box-shadow:${({ theme }) => theme.searchBoxShadow};
border-radius:30px;
background:transparent;
width:60%;
@media screen and (max-width: 600px) {
  width:100%;
}
`;
const ButtonHolder = styled.div`
width:60%;
@media screen and (max-width: 600px) {
  width:100%;
}
`;

const ProfileDetails = () => {
    return (
        <>
            <p style={{ fontWeight: "bold" }}>Username</p>
            <InputBox className="row px-3 py-2 mb-3 justify-content-between">
                <div className="col-11 p-0">
                    <InputBase
                        sx={{ color: "inherit", width: "100%", height: "100%" }}
                        placeholder="Example@gmail.com"
                        inputProps={{ 'aria-label': 'enter email' }}
                    />
                </div>
                <div className="col-1 p-0 text-center d-flex justify-content-center align-items-center"><NotificationBing size="14" /></div>
            </InputBox>
            <p style={{ fontWeight: "bold" }}>Bio</p>
            <InputBox className="row px-3 py-2 mb-3 justify-content-between">
                <div className="col-11 p-0">
                    <InputBase
                        sx={{ color: "inherit", width: "100%", height: "100%" }}
                        placeholder="Example@gmail.com"
                        inputProps={{ 'aria-label': 'enter email' }}
                    />
                </div>
                <div className="col-1 p-0 text-center d-flex justify-content-center align-items-center"><NotificationBing size="14" /></div>
            </InputBox>
            <p style={{ fontWeight: "bold" }}>Email Address</p>
            <InputBox className="row px-3 py-2 mb-3 justify-content-between">
                <div className="col-11 p-0">
                    <InputBase
                        sx={{ color: "inherit", width: "100%", height: "100%" }}
                        placeholder="Example@gmail.com"
                        inputProps={{ 'aria-label': 'enter email' }}
                    />
                </div>
                <div className="col-1 p-0 text-center d-flex justify-content-center align-items-center"><NotificationBing size="14" /></div>
            </InputBox>
            <p style={{ fontWeight: "bold" }}>Social Connections</p>
            <p style={{ fontSize: "14px" }}>Help collectors verify your account by connecting social accounts</p>
            <p style={{ fontWeight: "bold" }}>Link</p>
            <InputBox className="row px-3 py-2 mb-3 justify-content-between">
                <div className="col-11 p-0">
                    <InputBase
                        sx={{ color: "inherit", width: "100%", height: "100%" }}
                        placeholder="Example@gmail.com"
                        inputProps={{ 'aria-label': 'enter email' }}
                    />
                </div>
                <div className="col-1 p-0 text-center d-flex justify-content-center align-items-center"><NotificationBing size="14" /></div>
            </InputBox>
            <p style={{ fontWeight: "bold" }}>Wallet Address</p>
            <InputBox className="row px-3 py-2 mb-3 justify-content-between">
                <div className="col-11 p-0">
                    <InputBase
                        sx={{ color: "inherit", width: "100%", height: "100%" }}
                        placeholder="Example@gmail.com"
                        inputProps={{ 'aria-label': 'enter email' }}
                    />
                </div>
                <div className="col-1 p-0 text-center d-flex justify-content-center align-items-center"><NotificationBing size="14" /></div>
            </InputBox>
            <ButtonHolder className="row p-0">
                <ButtonLarge>save</ButtonLarge>
            </ButtonHolder>


        </>
    );
}

export default ProfileDetails;