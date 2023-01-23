import styled from "styled-components";
import { Link } from "react-router-dom";

const LinkText = styled.a`
font-family: 'Roboto';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 19px;
letter-spacing: 0.0015em;
text-transform: capitalize;
color: ${({ theme }) => theme.primaryMain};
flex: none;
order: 0;
flex-grow: 0;
text-decoration:none;

&:hover{
    color: ${({ theme }) => theme.primaryDark};
    text-decoration:underline;
}
`
;

const LinkComp = ({ linkText, linkSize, loading, link }) => {
    var linkFontSize;
    linkSize == "large" || "medium" ? linkFontSize = "16px" : linkFontSize = "14px"
    return (
        <Link to={link} style={{ textDecoration: "none", width: "auto", height: "auto" }}><LinkText style={{ fontSize: linkFontSize }}>{linkText}</LinkText></Link>
    );
}

export default LinkComp;



