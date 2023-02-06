import { FavoriteChart, I3DCubeScan } from "iconsax-react";
import styled from "styled-components";
import catPic from '../../assets/categories.svg'

const Card = styled.div`
    // border:1px solid white;
    `;

const InnerDiv = styled.div`
    background: ${({ theme }) => theme.itemCardsBackground};
    box-shadow: ${({ theme }) => theme.boxShadow};
    border-radius: 24px;
    height:150px;
    overflow:hidden;
    `

const CatDet = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-around;
`
const CatPics = styled.div`
    background-image: url(${catPic});
    background-size:contain;
    background-repeat:no-repeat;
    background-position:right;
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


const CategoryCard = () => {
    // console.log(window.location.pathname)
    return (
        <Card className="p-2 col-xs-12 col-sm-6 col-md-4 align-items-center justify-content-center align-self-center" >
            <InnerDiv className="d-flex p-3 justify-content-between">
                <CatDet className="col-6">
                    <h3 style={{ margin: 0, fontWeight: 600, }}>Title</h3>
                    <div className="d-flex flex-column p-0 justify-content-between">
                        <Det><I3DCubeScan size="20" />&nbsp;<DetNum>22</DetNum> <span style={{ fontSize: "12px" }}>Items</span></Det>
                        <Det><FavoriteChart size="20" />&nbsp;<DetNum>22</DetNum> <span style={{ fontSize: "12px" }}>Collections</span></Det>
                    </div>
                </CatDet>
                <CatPics className="col-6"></CatPics>
            </InnerDiv>

        </Card>
    );
}

export default CategoryCard;