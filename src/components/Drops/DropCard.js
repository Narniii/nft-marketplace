import { Box, Typography } from "@mui/material";
// import colBg from '../../assets/UFESLT8MzQoDaA3UDkjDSj.jpg'
import testImg from '../../assets/test1.png'
import styled from "styled-components";
import { Status, Timer } from "./states";
import { Link } from "react-router-dom";

const ImgHolder = styled.div`
    width:100px;
    height:100px;
    border-radius:50%;
    border:1px solid white;
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;
    @media screen and (max-width: 768px) {
        width:55px;
        height:55px;
    }
    

`
const DropCard = ({ status, theme, colBg }) => {

    function makeID(length) {
        let result = 'dorta-';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    const id = makeID(10)

    return (
        <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'drops/' + id + '/' + status}>
            <Box className="my-3 col-12 d-flex flex-column justify-content-between" sx={{
                backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundImage: `url(${colBg})`,
                borderRadius: "24px", overflow: "hidden", height: { xs: "340px", sm: "450px", md: "470px" }
            }}>
                <Box
                    sx={{
                        background: 'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.442708) 41.67%, rgba(0, 0, 0, 0) 100%)',
                        // height: "120px"
                    }}
                    className=" p-2 p-sm-3 d-flex flex-column flex-sm-row justify-content-between align-items-start">
                    <div className="col-12 col-sm-7 d-flex align-items-center">
                        <ImgHolder className="me-2" style={{ backgroundImage: `url(${testImg})` }} />
                        <div className="d-flx flex-column">
                            <Typography sx={{ fontWeight: 600, fontSize: { xs: "16px", md: "20px" }, color: "white" }}>CHCC Genesis Collection Chest</Typography>
                            <Typography sx={{ fontWeight: 600, fontSize: { xs: "14px", md: "16px" }, color: "white" }}> <span style={{ fontWeight: 400 }}>By:</span>Splinterlands</Typography>
                            <div className="w-100 d-flex align-item-center justify-content-between">
                                <Typography sx={{ fontWeight: 400, fontSize: { xs: "10px", md: "12px" }, color: "white" }}>6500items</Typography>
                                <Typography sx={{ fontWeight: 400, fontSize: { xs: "10px", md: "12px" }, color: "white" }}>0.25 ETH</Typography>
                                <Typography sx={{ fontWeight: 400, fontSize: { xs: "10px", md: "12px" }, color: "white" }}>25 oct</Typography>
                            </div>
                        </div>
                    </div>
                    <div className="d-none d-sm-flex align-items-center justify-content-sm-end">
                        {status == 'mint-upcome' ?
                            <Timer />
                            :
                            undefined
                        }
                        <Status status={status} />
                    </div>
                </Box>
                <div className=" p-2 p-sm-3 d-flex d-sm-none align-items-center justify-content-sm-end">
                    {status == 'mint-upcome' ?
                        <Timer />
                        :
                        undefined
                    }
                    <Status status={status} />
                </div>

            </Box>
        </Link>
    );
}

export default DropCard;