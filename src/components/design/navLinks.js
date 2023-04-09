
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { Colors } from "./Colors";


const NavLinkText = styled.a`
font-family: 'Roboto';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 19px;
letter-spacing: 0.0015em;
text-transform: capitalize;
// color: ${({ theme }) => theme.navLinkText};
flex: none;
order: 0;
flex-grow: 0;
margin-right:48px;
&:hover{
    color: ${({ theme }) => theme.linkHover} !important;
}
`
    ;
const NavLink = ({ linkText, linkSize, loading, link, theme, open, close }) => {
    var linkFontSize;
    linkSize == "large" || "medium" ? linkFontSize = "16px" : linkFontSize = "14px"
    return (
        <Link to={link} style={{ textDecoration: "none", width: "auto", height: "auto" }}>
            <NavLinkText onMouseEnter={open} style={{ fontSize: linkFontSize, textDecoration: "none", color: theme == 'light' && window.location.pathname !== '/' ? `${Colors.gray6}` : "white" }}>{linkText}</NavLinkText>
        </Link>
    );
}

export default NavLink;