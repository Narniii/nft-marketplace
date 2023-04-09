import { NotificationBing } from "iconsax-react";
import styled from "styled-components";
import { Colors } from "./Colors";

const Container = styled.div`
box-shadow: ${({ theme }) => theme.noteBoxShadow};
background-color: ${({ theme }) => theme.noteBG};
border-radius: 24px;
display: flex;
width:max-content;
color:${Colors.errorDark};
font-size:12px;
align-items:center;
&:hover{
    box-shadow:${({ theme }) => theme.hoverBoxShadow}
}
@media screen and (max-width: 768px) {
    font-size:10px;
}
`;
const Notification = ({ onClick }) => {
    return (
        <Container className="py-1 px-2" onClick={onClick}>
            <NotificationBing size="12" className="me-1" />
            <span>notification</span>
        </Container>
    );
}

export default Notification;