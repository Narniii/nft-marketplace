import { ArrowRight2 } from "iconsax-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CategoryCard from "../Cards/CategoryCard";
import CollectionCard from "../Cards/CollectionCard";
import ItemCard from "../Cards/ItemCard";
import '../../styles.css'
import { useEffect, useState } from "react";
import { categories } from "../../utils/Categories";
import { Typography } from "@mui/material";
import { Colors } from "../design/Colors";
const SectionContainer = styled.div`
    // height:50vh;
    // border:1px solid white;
    // padding: 0 32px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    margin-top:120px;
    margin-bottom:120px;
    @media screen and (max-width: 992px) {
        margin-top:54px;
    }

`;

const CategorySection = ({ theme }) => {
    const [availableCategories, setAvailableCategories] = useState([])
    useEffect(() => {
        if (categories)
            setAvailableCategories(categories)
    }, [categories])
    return (
        <SectionContainer className="pdng">
            <div style={{ marginBottom: "20px" }} className=" d-flex justify-content-between">
                <div className="d-flex col-sx-11 col-sm-9 col-md-6 justify-content-start align-items-center">
                    <h4 className="d-none d-lg-flex" style={{ margin: 0, fontWeight: 500 }}>
                        Browse By Category
                    </h4>
                    <h5 className="d-none d-sm-flex d-lg-none" style={{ margin: 0, fontWeight: 500 }}>
                        Browse By Category
                    </h5>
                    <h6 className="d-flex d-sm-none" style={{ margin: 0, fontWeight: 500 }}>
                        Browse By Category
                    </h6>
                </div>
                <Link to='/explore' style={{ textDecoration: "none", color: "inherit", fontSize: "14px" }} className="d-none d-sm-flex col-sm-3 col-md-6 justify-content-end align-items-center">
                    {/* <Link to='/explore' style={{ textDecoration: "none" }}> */}
                    Show more
                    <div style={{ width: "auto", padding: "0" }}><ArrowRight2 size="20" /></div>
                    {/* </Link> */}
                </Link>
                <Link to='/explore' style={{ textDecoration: "none", color: "inherit" }} className="d-flex d-sm-none col-1 justify-content-end align-items-center">
                    <div style={{ width: "auto", padding: "0" }}><ArrowRight2 size="20" /></div>
                </Link>
            </div>
            <div className="row justify-content-between">
                {availableCategories && availableCategories.length !== 0 ?
                    <>
                        {availableCategories.slice(0, 6).map((category) => {
                            return <CategoryCard title={category.title} images={category.images} />
                        })}
                    </> :
                    <>
                        <Typography sx={{ color: `${Colors.primaryMain}`, textAlign: 'center' }}>No categories available</Typography>
                    </>}
            </div>
        </SectionContainer>

    );
}

export default CategorySection;