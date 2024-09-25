import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PostCard from "./PostCard"
import RightCard from "./RightCard,"
import styles from "../css/landingpage.module.css"
import Comments from "./Comments"
import imageTest from '../assets/Night.jpg'
import HotPost from "./HotPost"
import axios from "../axios"
import Loading from "./Loading"

export default function Post() {
    let { id } = useParams()
    const [post, setPost] = useState()

    const [loading, setLoading] = useState(false)

    useEffect(() => {
      
        (async () => {
            setLoading(true)
            await axios.get(`/post/${id}`)
                .then(({ data }) => {
                    setPost(data[0])
                    setLoading(false)
                })
        })()
      
    }, [])

    return (
        <>
            <div className={styles.mid}>
                {post ? <PostCard placement="post" post={post} /> : <Loading />}
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