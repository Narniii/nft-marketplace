import styled from "styled-components";
import { Colors } from "./Colors";

const UnChecked = styled.div`
width:25px;
height:25px;
border-color:${({ theme }) => theme.trendingSectionTitles};
border:1px solid;
border-radius:50%;
`
const Checked = styled.div`
width:25px;
height:25px;
// border-color:${Colors.successDark};
border:1px solid ${Colors.successDark};
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
padding:4px;
`
const InnerChecked = styled.div`
width:100%;
height:100%;
background-color:${Colors.successDark};
border-radius:50%;
`
const Bullet = ({ isChecked, onClick }) => {
    console.log(isChecked)
    return (
        <div style={{ width: "auto", height: "auto", borderRadius: "50%", cursor: "pointer" }} onClick={onClick}>
            {isChecked ?
                <Checked>
                    <InnerChecked />
                </Checked>
                :
                <UnChecked />}

        </div>
    );
}

export default Bullet;