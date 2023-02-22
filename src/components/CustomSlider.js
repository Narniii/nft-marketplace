import React from 'react'
import Slider from "react-slick";
import { Box } from '@mui/material';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Colors } from './design/Colors';
import { useDarkMode } from "./design/useDarkMode"

function SampleNextArrow(props) {
    const { onClick } = props;
    console.log(props)
    // const [theme, themeToggler, mountedComponent] = useDarkMode();  
    // if (!mountedComponent) return <div />

    return (
        <Box
            sx={{
                display: "flex",
                background: props.theme == 'light' ? '#FFFFFF' : `${Colors.dark3}`,
                width: { xs: '35px', sm: '40px' },
                height: { xs: '35px', sm: '40px' },
                borderRadius: '12px',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: '50%',
                right: '-1%',
                zIndex: 4,
                transform: 'translate(0, -50%)',
                // boxShadow: '0px 0px 20px 3px rgba(0,0,0,0.5)',
                border: '0.5px solid #d9d9d9',
                cursor: 'pointer'
            }}
            onClick={onClick}
        >
            <ArrowRight2 />
        </Box>
    );
}

function SamplePrevArrow(props) {
    const { onClick } = props;
    console.log(props.theme)
    return (
        <Box
            sx={{
                display: "flex",
                background: props.theme == 'light' ? '#FFFFFF' : `${Colors.dark3}`,
                width: { xs: '35px', sm: '40px' },
                height: { xs: '35px', sm: '40px' },
                borderRadius: '12px',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: '50%',
                left: '-1%',
                zIndex: 4,
                transform: 'translate(0, -50%)',
                // boxShadow: '0px 0px 20px 3px rgba(0,0,0,0.5)',
                border: '0.5px solid #d9d9d9',
                cursor: 'pointer'
            }}
            onClick={onClick}
        >
            <ArrowLeft2 />
        </Box>
    );
}
export default function CustomSlider({ children, slidesCount, slidesCountTablet, items, theme }) {
    const settings = {
        // infinite: true,
        // dots: false,
        slidesToShow: slidesCount ? slidesCount : 3,
        slidesToScroll: slidesCount ? slidesCount : 3,
        nextArrow: <SampleNextArrow theme={theme} />,
        prevArrow: <SamplePrevArrow theme={theme} />,
        // lazyLoad: true,
        // autoplay: false,
        // autoplaySpeed: 2000,
        speed: 500,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: slidesCountTablet ? slidesCountTablet : 2,
                    slidesToScroll: slidesCountTablet ? slidesCountTablet : 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: slidesCountTablet ? slidesCountTablet : 2,
                    slidesToScroll: slidesCountTablet ? slidesCountTablet : 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]

    };
    return (
        <>
            <div className="imgslider">
                <Slider {...settings}>
                    {children}
                </Slider>
            </div>
        </>
    )

}
