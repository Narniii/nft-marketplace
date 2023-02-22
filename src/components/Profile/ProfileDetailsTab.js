import { CircularProgress, InputBase, Skeleton, Typography } from "@mui/material";
import { NotificationBing } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AUTH_API } from "../../utils/data/auth_api";
import { ButtonLarge } from "../design/Buttons";
import { Colors } from "../design/Colors";

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

const ProfileDetails = ({ globalUser, user, setUser, avatar, banner }) => {
    const [loading, setLoading] = useState(true)
    const [apiLoading, setApiLoading] = useState(false)
    const [successMesssage, setSuccessMesssage] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const [extras, setExtras] = useState({})


    useEffect(() => {
        if (user) {
            setExtras(user.extra)
            setLoading(false)
        }
    }, [user])

    // console.log(user)
    // const [user, setUser] = useState({})
    const apiCall = useRef(undefined)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setApiLoading(true)
        if (user.avatar) {
            const avatarData = new FormData()
            avatarData.append('id', globalUser.userId);
            avatarData.append('avatar', user.avatar);
            try {
                apiCall.current = AUTH_API.request({
                    path: `/user/edit/avatar/`,
                    method: "post",
                    body: avatarData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                let resp = await apiCall.current.promise;
                console.log('avatar up resp', resp)

                if (!resp.isSuccess)
                    throw resp
                setSuccessMesssage('avatar updated successfully')
                // setApiLoading(false)
            }
            catch (err) {
                console.log('edit avatar err', err)
                setErr(err.statusText)
                // setApiLoading(false)
            }

        }
        if (user.banner) {
            const bannerData = new FormData()
            bannerData.append('id', globalUser.userId);
            bannerData.append('banner', user.banner);
            try {
                apiCall.current = AUTH_API.request({
                    path: `/user/edit/banner/`,
                    method: "post",
                    body: bannerData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                let resp = await apiCall.current.promise;
                console.log('banner up resp', resp)

                if (!resp.isSuccess)
                    throw resp
                setSuccessMesssage('banner updated successfully')
                // setApiLoading(false)
            }
            catch (err) {
                console.log('edit banner err', err)
                setErr(err.statusText)
                // setApiLoading(false)
            }

        }
        const formData = new FormData();
        formData.append('id', globalUser.userId);
        formData.append('username', user.username);
        formData.append('description', user.description);
        console.log(extras)
        console.log(JSON.stringify(extras))
        formData.append('extra', JSON.stringify(extras));

        try {
            apiCall.current = AUTH_API.request({
                path: `/user/edit/`,
                method: "post",
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            let resp = await apiCall.current.promise;
            console.log('user edit resp', resp)

            if (!resp.isSuccess)
                throw resp

            setSuccessMesssage('updated successfully')
            setApiLoading(false)
        }
        catch (err) {
            console.log('edit user err', err)
            setErr(err.statusText)
            setLoading(false)
            setApiLoading(false)
        }

    }


    const onChange = e => {
        var u = { ...user };
        u[e.target.name] = e.target.value;
        setUser(u);
    }
    const AddtoExtras = e => {
        var ue = { ...extras };
        ue[e.target.name] = e.target.value;
        setExtras(ue);
    }
    return (
        <>{loading ?
            <Skeleton variant="rounded" sx={{ width: "100%", height: "100%", borderRadius: "24px" }} /> :
            <>
                <p className="align-self-start" style={{ fontWeight: "bold" }}>Username</p>
                <InputBox className="d-flex px-3 py-2 mb-3 justify-content-between">
                    <div className="col-11 p-0">
                        <InputBase
                            name="username"
                            onChange={onChange}
                            placeholder={user.username ? user.username : "enter username"}
                            sx={{ color: "inherit", width: "100%", height: "100%" }}
                            inputProps={{ 'aria-label': 'enter username' }}
                        />
                    </div>
                    <div className="col-1 p-0 text-center d-flex justify-content-end align-items-center"><NotificationBing size="14" /></div>
                </InputBox>
                <p className="align-self-start" style={{ fontWeight: "bold" }}>Bio</p>
                <InputBox className="d-flex px-3 py-2 mb-3 justify-content-between">
                    <div className="col-11 p-0">
                        <InputBase
                            sx={{ color: "inherit", width: "100%", height: "100%" }}
                            name="description"
                            onChange={onChange}
                            placeholder={user.description ? user.description : "enter bio"}
                            inputProps={{ 'aria-label': 'enter bio' }}
                        />
                    </div>
                    <div className="col-1 p-0 text-center d-flex justify-content-end align-items-center"><NotificationBing size="14" /></div>
                </InputBox>
                <p className="align-self-start" style={{ fontWeight: "bold" }}>Email Address</p>
                <InputBox className="d-flex px-3 py-2 mb-3 justify-content-between">
                    <div className="col-11 p-0">
                        <InputBase
                            sx={{ color: "inherit", width: "100%", height: "100%" }}
                            name="email"
                            onChange={AddtoExtras}
                            placeholder={user.extra.email ? user.extra.email : "example@gmail.com"}
                            inputProps={{ 'aria-label': 'enter email' }}
                        />
                    </div>
                    <div className="col-1 p-0 text-center d-flex justify-content-end align-items-center"><NotificationBing size="14" /></div>
                </InputBox>
                <p className="align-self-start" style={{ fontWeight: "bold" }}>Social Connections</p>
                <p className="align-self-start" style={{ fontSize: "14px" }}>Help collectors verify your account by connecting social accounts</p>
                <p className="align-self-start" style={{ fontWeight: "bold" }}>Link</p>
                <InputBox className="d-flex px-3 py-2 mb-3 justify-content-between">
                    <div className="col-11 p-0">
                        <InputBase
                            sx={{ color: "inherit", width: "100%", height: "100%" }}
                            name="link"
                            onChange={AddtoExtras}
                            placeholder={user.extra.link ? user.extra.link : "example.com"}
                            inputProps={{ 'aria-label': 'enter link' }}
                        />
                    </div>
                    <div className="col-1 p-0 text-center d-flex justify-content-end align-items-center"><NotificationBing size="14" /></div>
                </InputBox>
                <p className="align-self-start" style={{ fontWeight: "bold" }}>Wallet Address</p>
                <InputBox className="d-flex px-3 py-2 mb-3 justify-content-between">
                    <div className="col-11 p-0">
                        <InputBase
                            sx={{ color: "inherit", width: "100%", height: "100%" }}
                            name="wallet_address"
                            disabled
                            placeholder={globalUser.walletAddress}
                            inputProps={{ 'aria-label': 'enter email' }}
                        />
                    </div>
                    <div className="col-1 p-0 text-center d-flex justify-content-end align-items-center"><NotificationBing size="14" /></div>
                </InputBox>
                <ButtonHolder className="d-flex p-0 my-4">
                    {apiLoading ? <ButtonLarge ><CircularProgress sx={{ color: "white" }} /></ButtonLarge> :
                        <ButtonLarge onClick={handleSubmit}>save</ButtonLarge>}
                </ButtonHolder>


                {/* error and success messages */}
                <ButtonHolder className="d-flex p-0 justify-content-center align-items-center">
                    {err ? <Typography sx={{ fontSize: "12px", color: `${Colors.errorDark}` }}>{err}</Typography> : undefined}
                    {successMesssage ? <Typography sx={{ fontSize: "12px", color: `${Colors.successDark}` }}>{successMesssage}</Typography> : undefined}
                </ButtonHolder>


            </>
        }</>
    );
}

export default ProfileDetails;