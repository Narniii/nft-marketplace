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
`;
const Notification = ({ onClick }) => {
    return (
        <Container className="p-1" onClick={onClick}>
            <NotificationBing size="12" />
            <span>notification</span>
        </Container>
    );
}

export default Notification;