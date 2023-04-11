import { FavoriteChart, I3DCubeScan } from "iconsax-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import catPic from '../../assets/categories.svg'
import catPic from '../../assets/sport-cat.png'

const Card = styled.div`
    // border:1px solid white;
    padding-left:12px;
    padding-right:12px;
    padding-bottom:24px;
    
    @media screen and (max-width: 992px) {
        padding-left:8px;
        padding-right:8px;
        padding-bottom:16px;
    
    }
    
    `;

const InnerDiv = styled.div`
    background: ${({ theme }) => theme.itemCardsBackground};
    box-shadow: ${({ theme }) => theme.catBoxShadow};
    border-radius: 24px;
    height:200px;
    overflow:hidden;

    &:hover{
        box-shadow: ${({ theme }) => theme.hoverBoxShadow};
    }
    padding-left:20px;
    &:hover .imgTwo{
        right:0;
    }
    &:hover .imgThree{
        right:0;
    }
    &:hover .imgOne{
        right:0;
    }

    
    `

const CatDet = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    
`
const TiTler = styled.h3`
font-size:18px;
margin:0;
text-transform:capitalize;
font-weight:500;
@media screen and (max-width: 1200px) {
    font-size:16px;
}
`
const CatPics = styled.div`
    // background-image: url(${catPic});
    // background-size:contain;
    // background-repeat:no-repeat;
    // background-position:right;

    // border:1px solid red;

    display:flex;
    align-items:center;
    position:relative;
`
const Det = styled.p`
    margin:0;
    color: ${({ theme }) => theme.categoryDet};
    `
const DetNum = styled.span`
    color: ${({ theme }) => theme.categoryDetNum};
    font-size:14px;
    font-weight:600;
`
const IconParent = styled.span`
    color: ${({ theme }) => theme.categoryDet};
    margin:0;
    color: ${({ theme }) => theme.categoryDet};
`;
const CatImg1 = styled.img`
position:absolute;
right:-10%;
// width:200px;
height:100%;
border-radius:24px;
z-index:3;
transition:500ms ease;
border:3px solid;
border-color:${({ theme }) => theme.itemCardsBackground};
@media screen and (max-width: 1200px) {
    right:-25%;
}
@media screen and (max-width: 575px) {
    right:-15%;
}

`
const CatImg2 = styled.img`
position:absolute;
right:25%;
// width:120px;
height:140px;
border-radius:24px;
z-index:2;
filter:grayScale(50);
transition:500ms ease;
border:3px solid;
border-color:${({ theme }) => theme.itemCardsBackground};
@media screen and (max-width: 1200px) {
    right:20%;
}
@media screen and (max-width: 575px) {
    right:20%;
}

`
const CatImg3 = styled.img`
position:absolute;
right:55%;
// width:100px;
height:105px;
border-radius:24px;
z-index:1;
filter:grayScale(100);
transition:500ms ease;
border:3px solid;
border-color:${({ theme }) => theme.itemCardsBackground};
@media screen and (max-width: 1200px) {
    right:50%;
}
@media screen and (max-width: 575px) {
    right:45%;
}


`


const CategoryCard = ({ title, images }) => {
    // console.log(window.location.pathname)
    return (
        <Card className="col-xs-12 col-sm-6 col-lg-4 align-items-center justify-content-center align-self-center" >
            <Link style={{ textDecoration: "none", color: "inherit" }} to={'/' + 'explore' + '/#' + title}>
                <InnerDiv className="d-flex justify-content-between">
                    <CatDet className="col-4">
                        <TiTler >{title}</TiTler>
                        {/* <div className="d-flex flex-column p-0 justify-content-between">
                            <Det><I3DCubeScan size="20" />&nbsp;<DetNum>22</DetNum> <span style={{ fontSize: "12px" }}>Items</span></Det>
                            <Det><FavoriteChart size="20" />&nbsp;<DetNum>22</DetNum> <span style={{ fontSize: "12px" }}>Collections</span></Det>
                        </div> */}
                    </CatDet>
                    <CatPics className="col-8">
                        <CatImg3 className="imgOne" src={images[2]} />
                        <CatImg2 className="imgTwo" src={images[1]} />
                        <CatImg1 className="imgThree" src={images[0]} />
                    </CatPics>
                </InnerDiv>
            </Link>
        </Card>
    );
}

export default CategoryCard;