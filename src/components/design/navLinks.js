
import styled from "styled-components";
import { Link } from "react-router-dom";


const NavLinkText = styled.a`
font-family: 'Roboto';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 19px;
letter-spacing: 0.0015em;
text-transform: capitalize;
color: ${({ theme }) => theme.navLinkText};
flex: none;
order: 0;
flex-grow: 0;
&:hover{
    color: ${({ theme }) => theme.primaryDark};
}
`
    ;
const NavLink = ({ linkText, linkSize, loading, link }) => {
    var linkFontSize;
    linkSize == "large" || "medium" ? linkFontSize = "16px" : linkFontSize = "14px"
    return (
        <Link to={link} style={{ textDecoration: "none", width: "auto", height: "auto" }}><NavLinkText style={{ fontSize: linkFontSize , textDecoration:"none" }}>{linkText}</NavLinkText></Link>
    );
}

export default NavLink;