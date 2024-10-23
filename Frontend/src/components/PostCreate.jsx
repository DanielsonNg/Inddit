import styles from "../css/landingpage.module.css"
import HotPost from "./HotPost"
import imageTest from '../assets/Night.jpg'
import { useEffect, useState } from "react"
import addIcon from '../assets/t.png'
import { Avatar, IconButton, Select } from "@mui/material"
import SelectInput from "@mui/material/Select/SelectInput"
import axios from "../axios"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider"
import Loading from "./Loading"

export default function PostCreate() {
    const [image, setImage] = useState([])
    const [preview, setPreview] = useState()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)

    const { id } = useParams()
    const { userData } = useAuth()

    const [community, setCommunity] = useState({
        name: '',
        description: '',
        logo: ''
    })

    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            setLoading(true)
            await axios.get(`/community/${id}`)
                .then(({ data }) => {
                    setCommunity({
                        id: data._id,
                        name: data.name,
                        description: data.description,
                        logo: data.logo,
                    })
                    setLoading(false)
                })
        })()
    }, [])

    function setFileToBase(file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setImage(reader.result)
        }
    }


    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        const data = {
            title: title,
            content: content,
            image: image,
            community_id: community.id,
            user_id: userData._id
        }
        await axios.post('/post/create', data)
            .then(({data}) => {
                setLoading(false)
                navigate(`/post/${data._id}`)
            })
            .catch((error) => {
                // console.log(error)
                setLoading(false)
            })
    }

    function handleImage(e) {
        const file = e.target.files[0]
        setFileToBase(file)
        setPreview(URL.createObjectURL(file))
    }
    return (
        <>
            {loading &&
                <div style={{display:'flex', justifyContent:'center', width:'100%'}}>

                    <Loading />
                </div>
            }
            {!loading && <>
                <div className={styles.mid}>
                    <div style={{ width: '100%' }}>
                        <h1>New Post</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div style={{ backgroundColor: 'rgb(28, 26, 26)', padding: '30px', borderRadius: '20px', display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
                            <div style={{ width: '100%' }}>
                                <h2>Post Title *</h2>
                                <textarea
                                    type="text"
                                    value={title}
                                    onChange={(e) => { setTitle(e.target.value) }}
                                    style={{
                                        width: '100%',
                                        fontSize: '16px',
                                        borderRadius: '20px',
                                        height: '75px',
                                        resize: 'block',
                                        padding: '5px',
                                        borderColor: 'black',
                                        fontWeight: 'lighter',
                                        fontFamily: 'inherit',
                                        color: 'inherit'
                                    }}
                                />
                            </div>
                            <div style={{ width: '100%' }}>
                                <h2>Content *</h2>
                                <textarea
                                    type="text"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    style={{
                                        width: '100%',
                                        fontSize: '16px',
                                        borderRadius: '20px',
                                        height: '125px',
                                        resize: 'block',
                                        padding: '5px',
                                        borderColor: 'black',
                                        fontWeight: 'lighter',
                                        fontFamily: 'inherit',
                                        color: 'inherit'
                                    }}
                                />
                            </div>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <h2>Image</h2>
                                <div style={{ display: 'flex', gap: '20px', width: '100%', flexWrap: 'wrap' }}>
                                    {preview ?
                                        <img
                                            src={preview}
                                            width={'150px'}
                                            height={'100px'}
                                        />
                                        :
                                        <>
                                            <label htmlFor="images">
                                                <IconButton component="span">
                                                    <Avatar
                                                        src={addIcon}
                                                        style={{
                                                            // margin: "10px",
                                                            width: "100px",
                                                            height: "100px",
                                                            borderRadius: '0px'
                                                        }}
                                                    />
                                                </IconButton>
                                            </label>
                                            <input
                                                id="images"
                                                title="test"
                                                type="file"
                                                style={{ visibility: "hidden" }}
                                                onChange={handleImage}>
                                            </input>
                                        </>
                                    }
                                </div>
                            </div>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                <button style={{ height: '50px', fontSize: '20px', backgroundColor: 'black', borderColor: 'black', borderRadius: '10px' }}>Create New Post</button>
                            </div>
                        </div>
                    </form>
                </div>
                {/* Right */}
                <div className={styles.right}>
                    <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                        <img src={community.logo} style={{ width: '30px', height: '30px', borderRadius: '50%' }}></img>&#160;
                        I/{community.name}
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        {/* i/{community.description} */}
                    </div>
                    <div style={{ fontWeight: 'lighter' }}>
                        {community.description}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '10px ' }}>
                        25k Members
                    </div>
                    {/* <div style={{ fontWeight: 'bold', marginTop: '10px' }}>
                    Hot Posts
                </div>
                <HotPost />
                <HotPost />
                <HotPost />
                <HotPost /> */}
                </div>
            </>}

        </>
    )
}