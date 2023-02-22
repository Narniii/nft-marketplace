import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import imageBG from '../../assets/image.png'
import { PUBLIC_URL } from "../../utils/utils"
import '../../styles.css'
import Navbar from "../../components/Navbar/Navbar"

const EditCollection = ({ theme, themeToggler }) => {
    const { id } = useParams()
    console.log(id)
    const globalUser = useSelector(state => state.userReducer)
    const [thisCollection, setThisCollection] = useState(undefined)
    const [imageChanged, setImageChanged] = useState(false)
    const [collection, setCollection] = useState({
        logo: undefined,
        banner: undefined,
        title: undefined,
        // categories: [],
        description: undefined,
        links: [
            { website: undefined },
            { discord: undefined },
            { instagram: undefined },
            { telegram: undefined }
        ],
        category: '',
        royalty: undefined,
        // isExplicit: false,
    })
    const [loading, setLoading] = useState(true)
    const apiCall = useRef(undefined)
    const [successMesssage, setSuccessMesssage] = useState(undefined)
    const [err, setErr] = useState(undefined)
    const [fetchedCollections, setFetchedCollections] = useState([])
    const [editing, setEditing] = useState(false)
    const [logo, setLogo] = useState(imageBG);
    const [logoChanged, setLogoChanged] = useState(false)
    const [bannerChanged, setBannerChanged] = useState(false)
    const [banner, setBanner] = useState(PUBLIC_URL(imageBG));
    const [logoErr, setLogoErr] = useState(undefined)
    const [bannerErr, setBannerErr] = useState(undefined)

    return (<>

        <div className="pdng">
            <Navbar theme={theme} themeToggler={themeToggler} />

        </div>



        {/* <AddModals saveFunds={saveFunds} saveProperties={saveProperties} saveRoyalties={saveRoyalties} openRoyalties={addRoyalties} openFunds={addFunds} openProperties={addProperties} handleClose={handleClose} theme={theme} /> */}

    </>);
}

export default EditCollection;