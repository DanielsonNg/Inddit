import { createContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import PostCard from "./PostCard"
import RightCard from "./RightCard,"
import styles from "../css/landingpage.module.css"
import Comments from "./Comments"
import imageTest from '../assets/Night.jpg'
import HotPost from "./HotPost"
import axios from "../axios"
import Loading from "./Loading"
import { useAuth } from "../../context/AuthProvider"
import { PostProvider, usePost } from "../../context/PostProvider"

export default function Post() {
    let { id } = useParams()
    const [post, setPost] = useState()
    const {userData} = useAuth()
    const {setPermission} = usePost()

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            // console.log(userData)
            setLoading(true)
            const data = {
                user_id: userData?._id
            }
            if(userData){
                await axios.post(`/post/${id}`, data)
                    .then(({ data }) => {
                        setPost(data[0])
                        setPermission(data[0]?.tracker[0]?.permission ? data[0].tracker[0].permission : null)
                        setLoading(false)
                    })
            }
        })()
      
    }, [userData])

    function deletePostInstant(index) {
        navigate('/')
    }

    return (
        <>
            <div className={styles.mid}>
                {post ? <PostCard placement="post" key={post._id} deletePostInstant={deletePostInstant} user_id={userData?._id} post={post} /> : <Loading />}
                <Comments postId={id} />
                {/* <PostCard /> */}
            </div>
            {post && <div className={styles.right}>
                <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                    <img src={imageTest} style={{ width: '30px', height: '30px', borderRadius: '50%' }}></img>&#160;
                    I/{post.community.name}
                </div>
                <div style={{ marginTop: '10px' }}>
                    {post.category.name} Community
                </div>
                <div style={{ fontWeight: 'lighter' }}>
                    {post.community.description}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '10px ' }}>
                    25k Members
                </div>
                <div style={{ fontWeight: 'bold', marginTop: '10px' }}>
                    Hot Posts
                </div>
                <HotPost />
                <HotPost />
                <HotPost />
                <HotPost />
            </div>}
        </>
    )
}