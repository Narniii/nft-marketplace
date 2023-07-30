
import rectangleLight from '../../assets/rectangle-light.svg';
import rectangleDark from '../../assets/rectangle-dark.svg';
import headerDark from '../../assets/header-dark.svg';
import headerLight from '../../assets/header-light.svg';
import footerDark from '../../assets/footer-dark.svg';
import footerLight from '../../assets/footer-light.svg';
import arrowDownLight from '../../assets/arrow-down-white.png';
import arrowDownDark from '../../assets/arrow-down-dark.png';
import { Colors } from './Colors';


export const lightTheme = {

    body: '#ffffff',
    text: Colors.gray7,
    navIcons: window.location.pathname == "/" ? "#ffffff" : Colors.gray7,
    errorPageGradient: 'linear-gradient(304.23deg, #F9F9F9 2.18%, rgba(249, 249, 249, 0) 49.47%, rgba(249, 249, 249, 0.5) 100.31%)',
    profilePageGradient: 'linear-gradient(304.23deg, #F9F9F9 2.18%, rgba(249, 249, 249, 0) 49.47%, rgba(249, 249, 249, 0.5) 100.31%)',
    primaryLight: '#DABDFF',
    primaryDark: '#5D3393',
    primaryMain: "#9951F4",
    linkHover: "#5D3393",

    secondaryLight: '#BADAFF',
    secondaryDark: '#000581',
    secondaryMain: "#0008CF",

    textTertiary: '#808080',

    // gradientPurple: 'linear-gradient(276.27deg, #7830D2 0%, #BB86FF 97.78%)',
    gradientPurple: Colors.gradientPurpleLight,
    gradientPurpleStandard: 'background: linear-gradient(276.27deg, #580DB7 0%, #AB69FF 82.5%);',
    gradientBlue: 'linear-gradient(180deg, #509FFF 0%, #3C87E2 40.1%, #03418C 100%)',
    gradientOrange: 'linear-gradient(134.12deg, #F9CA13 21.12%, #FABF10 43.26%, #FF8A00 83.64%)',

    headerImage: headerLight,
    footerImage: footerLight,

    rectangle: rectangleLight,

    backgroundPrimary: 'linear-gradient(276.27deg, #7830D2 0%, #BB86FF 97.78%)',
    backgroundSecondary: '#ffffff',


    navBorderBackground: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(176,77,241,1) 50%, rgba(255,255,255,0.5) 100%)',
    navBorderBackground: 'linear-gradient(90deg, rgba(176,77,241,0) 0%, rgba(176,77,241,1) 50%, rgba(176,77,241,0) 100%)',
    toggleBackground: 'linear-gradient(90deg, #1E0E36 0%, #3F2463 44.14%, #9E64E7 97.78%)',


    titlerColor: Colors.gray7,
    titleColor: Colors.primaryDark,

    itemCardsBackground: '#FFFFFF',
    par: Colors.gray5,
    info: Colors.gray8,
    titleInformation: Colors.gray8,

    boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
    deeperBoxShadow: '0px 0px 14px rgba(0, 0, 0, 0.1)',
    catBoxShadow: '0px 0px 14px rgba(0, 0, 0, 0.1)',
    hoverBoxShadow: "0px 6px 20px rgba(0, 0, 0, 0.08)",

    collectionCard: '#ffffff',
    collectionCardHover: Colors.gray0,
    collectionCardActive: Colors.gray1,

    trendingSectionTitles: Colors.gray7,
    trendingSectionTitlesActive: Colors.primaryDark,
    trendingSectionSubTitles: Colors.gray6,
    socialConnectionProfileColor:Colors.gray8,

    arrowDown: arrowDownLight,

    prices: Colors.gray8,
    pricesUnits: Colors.gray5,

    creatorName: Colors.gray8,
    collectionDetailsTitle: Colors.gray4,
    collectionDetailsAnswer: Colors.gray8,

    searchBoxBorder: window.location.pathname == "/" ? `1px solid ${Colors.gray2}` : "none",
    // searchBoxShadow: window.location.pathname !== '/' ? 'inset 0px 0px 4px rgba(0, 0, 0, 0.2)' : "unset",
    searchBoxShadow: 'inset 0px 0px 4px rgba(0, 0, 0, 0.2)',
    searchBoxShadowHover:'inset 0px 0px 6px rgba(0, 0, 0, 0.3)',
    inputBox: Colors.gray1,
    navLinkText: window.location.pathname === "/" ? "white" : Colors.gray6,
    categoryDet: Colors.gray5,
    categoryDetNum: Colors.gray8,

    profileBorder: `1px solid ${Colors.gray2}`,
    collectionBorder: `1px solid ${Colors.gray2}`,

    activeTab: Colors.gray1,
    hoverIcon: "#d9d9d9",

    nftActivityBG: '#f9f9f9',
    nftActivityHover: Colors.gray1,

    toggleBGLD: Colors.gradientOrange,

    textSub: Colors.gray4,

    addProPic: Colors.gray0,
    addProPicBorder: `1px solid ${Colors.gray2}`,


    noteBG: Colors.errorLight,
    noteBoxShadow: 'unset',

    polyBG: '#ffffff',
    polyBX: ' inset 0px 4px 9px rgba(0, 0, 0, 0.12), inset 0px 0px 27px rgba(72, 72, 72, 0.17)',

    catImgBorder: `3px solid white`


}
export const darkTheme = {
    body: '#1E0E36',
    text: Colors.gray1,
    navIcons: Colors.gray1,
    errorPageGradient: 'linear-gradient(304.23deg, #2A0D55 2.18%, rgba(30, 14, 54, 0) 49.47%, #2A0D55 100.31%)',
    profilePageGradient: 'linear-gradient(304.23deg, #2A0D55 2.18%, rgba(30, 14, 54, 0) 49.47%, #2A0D55 100.31%)',
    primaryLight: '#DABDFF',
    primaryDark: '#5D3393',
    primaryMain: "#9951F4",
    linkHover: "#DABDFF",

    secondaryLight: '#BADAFF',
    secondaryDark: '#000581',
    secondaryMain: "#0008CF",

    headerImage: headerDark,
    footerImage: footerDark,

    textTertiary: '#DABDFF',

    // gradientPurple: 'linear-gradient(276.27deg, #400789 0%, #9E64E7 97.78%)',
    gradientPurple: Colors.gradientPurpleDark,
    gradientPurpleStandard: 'background: linear-gradient(276.27deg, #580DB7 0%, #AB69FF 82.5%);',
    gradientBlue: 'linear-gradient(180deg, #509FFF 0%, #3C87E2 40.1%, #03418C 100%)',
    gradientOrange: 'linear-gradient(134.12deg, #F9CA13 21.12%, #FABF10 43.26%, #FF8A00 83.64%)',

    rectangle: rectangleDark,

    backgroundPrimary: 'linear-gradient(276.27deg, #1E0E36 0%, #3F2463 44.14%, #9E64E7 97.78%)',
    backgroundSecondary: '#272448',


    // navBorderBackground: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(176,77,241,1) 50%, rgba(255,255,255,0.5) 100%)',
    navBorderBackground: 'linear-gradient(90deg, rgba(176,77,241,0) 0%, rgba(176,77,241,1) 50%, rgba(176,77,241,0) 100%)',
    toggleBackground: 'linear-gradient(90deg, #7830D2 0%, #BB86FF 97.78%)',


    titlerColor: Colors.gray2,
    titleColor: Colors.dark3,

    par: Colors.gray2,
    itemCardsBackground: Colors.dark2,
    info: Colors.gray3,
    titleInformation: Colors.gray1,

    // boxShadow: '0px 3px 4px rgba(190, 138, 255, 0.32)',
    boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
    catBoxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
    deeperBoxShadow: '0px 0px 14px rgba(190, 138, 255, 0.32)',
    hoverBoxShadow: "0px 0px 12px rgba(190, 138, 255, 0.32)",



    collectionCard: Colors.dark1,
    collectionCardHover: Colors.dark2,
    collectionCardActive: Colors.dark3,

    trendingSectionTitles: Colors.gray1,
    trendingSectionTitlesActive: Colors.primaryLight,
    trendingSectionSubTitles: Colors.gray3,
    socialConnectionProfileColor:Colors.gray0,

    arrowDown: arrowDownDark,

    prices: Colors.gray1,
    pricesUnits: Colors.gray2,

    creatorName: Colors.gray3,


    collectionDetailsTitle: Colors.gray3,
    collectionDetailsAnswer: Colors.gray0,


    searchBoxBorder: `solid 1px ${Colors.gray2}`,
    searchBoxShadow: 'unset',
    searchBoxShadowHover:'inset 0px 0px 10px rgba(0, 0, 0, 0.32) ,  0px 0px 8px rgba(190, 138, 255, 0.32)',
    // searchBoxShadowHover:'inset 0px 0px 8px rgba(190, 138, 255, 0.32)',

    inputBox: Colors.gray4,
    navLinkText: Colors.gray1,
    categoryDet: Colors.gray3,
    categoryDetNum: '#F9F9F9',

    profileBorder: `1px solid ${Colors.dark4}`,
    collectionBorder: `1px solid ${Colors.dark1}`,
    activeTab: Colors.dark4,

    // selectionBorder:"1px solid #D9D9D9"
    hoverIcon: "#332E5F",

    nftActivityBG: Colors.dark2,
    nftActivityHover: Colors.dark3,

    toggleBGLD: Colors.dark3,

    textSub: Colors.gray3,

    addProPic: Colors.dark3,
    addProPicBorder: `1px solid ${Colors.dark1}`,


    noteBG: Colors.dark3,
    noteBoxShadow: '0px 0px 13px rgba(0, 0, 0, 0.29)',


    polyBG: Colors.dark2,
    polyBX: '0px 0px 4px rgba(190, 138, 255, 0.32)',

    catImgBorder: `3px solid ${Colors.dark2}`


}
