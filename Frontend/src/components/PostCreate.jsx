import styles from "../css/landingpage.module.css"
import HotPost from "./HotPost"
import imageTest from '../assets/Night.jpg'
import { useEffect, useState } from "react"
import addIcon from '../assets/t.png'
import { Avatar, IconButton, Select } from "@mui/material"
import SelectInput from "@mui/material/Select/SelectInput"
import axios from "../axios"

export default function PostCreate() {
    const [image, setImage] = useState([])
    const [preview, setPreview] = useState([])
    const [communities, setCommunities] = useState([])

    useEffect(() => {
        (async () => {
            const communities = await axios.get('/communities/get')
            setCommunities(communities.data)
            console.log(communities)
        })()
    }, [])


    function handleSubmit(e) {
        e.preventDefault()
        console.log('submitting')
    }

    function handleImage(e) {
        const file = e.target.files[0]
        setImage(prevImage => [...prevImage, file])
        setPreview(prevPreview => [...prevPreview, URL.createObjectURL(file)])
    }
    return (
        <>
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
                        <div>
                            <h2>Community</h2>
                            {/* <SelectInput>Select Community</SelectInput> */}
                            <select style={{ width: '150px', height: '50px', backgroundColor: 'black', borderColor: 'black', borderRadius: '10px' }}>
                                <option>I/Test</option>
                                <option>I/Error 400004</option>
                                <option>I/Programming</option>
                                <option>I/Gaming</option>
                            </select>
                        </div>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <h2>Image</h2>
                            <div style={{ display: 'flex', gap: '20px', width: '100%', flexWrap: 'wrap' }}>
                                {preview ? preview.map((p) => (
                                    <img
                                        src={p}
                                        width={'150px'}
                                        height={'100px'}
                                    />
                                )) :
                                    ''}
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
                    <img src={imageTest} style={{ width: '30px', height: '30px', borderRadius: '50%' }}></img>&#160;
                    I/Memes
                </div>
                <div style={{ marginTop: '10px' }}>
                    Meme Community
                </div>
                <div style={{ fontWeight: 'lighter' }}>
                    This description describe a description of a inddit good.
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
        </>
    )
}