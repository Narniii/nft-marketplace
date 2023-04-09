import { Box, Popper } from "@mui/material";
import { Link } from "react-router-dom";
import { EmailShareButton, FacebookShareButton, FacebookShareCount, TwitterShareButton, WhatsappShareButton } from "react-share";
import styled from "styled-components";
const Line = styled.div`
    background: linear-gradient(90deg,#60606000 0%, #80808080 50%,#918A7A00 100%);
    height:1px;
    align-self:center;
    width:80%;
`;
export const ListMenus = ({ open, anchorEl, handleClose, theme, id, field, tabs, close }) => {
    return (
        <>
            <Popper className="" open={open} anchorEl={anchorEl} placement={"bottom"} disableScrollLock={true} onMouseLeave={close}
            >
                <Box sx={{
                    transform: 'translateY(10px)',
                    borderRadius: "24px",
                    width: 150,
                    height: 'auto',
                    bgcolor: theme == 'light' ? "#ffffff" : "#272448",
                    p: 1,
                    overflow: "hidden",
                    boxShadow: theme == 'light' ? '0px 3px 10px rgba(0, 0, 0, 0.07)' : "unset",
                }}
                    className="d-flex flex-column">
                    {tabs.length > 0 ?
                        <>
                            {tabs.map((tab) => {
                                return <>
                                    {tab == tabs[0] ? undefined : <Line />}
                                    <Link to={tab.link} style={{ textDecoration: "none", color: "inherit", padding: "5px 10px" }}>
                                        <Box>{tab.title}</Box>
                                    </Link>
                                </>
                            })}
                        </> : <></>}
                </Box>
            </Popper>
        </>
    );
}



export const ShareListMenus = ({ open, anchorEl, handleClose, theme, id, field, tabs, close }) => {
    return (
        <>
            <Popper className="" open={open} anchorEl={anchorEl} placement={"bottom"} disableScrollLock={true} onMouseLeave={close}
            >
                <Box sx={{
                    transform: 'translateY(10px)',
                    borderRadius: "24px",
                    width: 150,
                    height: 'auto',
                    bgcolor: theme == 'light' ? "#ffffff" : "#272448",
                    p: 1,
                    overflow: "hidden",
                    boxShadow: theme == 'light' ? '0px 3px 10px rgba(0, 0, 0, 0.07)' : "unset",
                }}
                    className="d-flex flex-column">
                    {tabs.length > 0 ?
                        <>
                            {tabs.map((tab) => {
                                return <>
                                    {tab == tabs[0] ? undefined : <Line />}
                                    {tab.title == 'whatsapp' ?
                                        <WhatsappShareButton url={window.location.href} title='nft'>
                                            <Box>{tab.title}</Box>
                                        </WhatsappShareButton> :
                                        tab.title == 'facebook' ?
                                            <FacebookShareButton url={window.location.href} ><Box>{tab.title}</Box></FacebookShareButton> :
                                            tab.title == 'email' ?
                                                <EmailShareButton url={window.location.href} ><Box>{tab.title}</Box></EmailShareButton>
                                                :
                                                tab.title == 'twitter' ?
                                                    <TwitterShareButton url={window.location.href} ><Box>{tab.title}</Box></TwitterShareButton>
                                                    :
                                                    <Link to={tab.link} style={{ textDecoration: "none", color: "inherit", padding: "5px 10px" }}>
                                                        <Box>{tab.title}</Box>
                                                    </Link>

                                    }
                                </>
                            })}
                        </> : <></>}
                </Box>
            </Popper>
        </>

    )
};