import { createContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import PostCardGuest from "./PostCardGuest"
import RightCard from "./RightCard,"
import styles from "../css/landingpage.module.css"
import CommentsGuest from "./CommentsGuest"
import imageTest from '../assets/Night.jpg'
import HotPost from "./HotPost"
import axios from "../axios"
import Loading from "./Loading"
import { useAuth } from "../../context/AuthProvider"
import { usePost } from "../../context/PostProvider"
import NotFound from "./NotFound"

export default function PostGuest() {
    let { id } = useParams()
    const [post, setPost] = useState()
    const { userData } = useAuth()
    const { setPermission } = usePost()
    const [hotPosts, setHotPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            setLoading(true)
            await axios.get(`/postGuest/${id}`)
                .then(async ({ data }) => {
                    setPost(data[0])
                    setLoading(false)
                    await axios.get(`/community/posts/hot/${data[0].community_id}`)
                        .then(({ data }) => {
                            setHotPosts(data)
                        })
                })
        })()

    }, [userData])

    function deletePostInstant(index) {
        navigate('/')
    }

    return (
        <>
            <div className={styles.mid}>
                {post ? <PostCardGuest placement="post" key={post._id} deletePostInstant={deletePostInstant} user_id={userData?._id} post={post} /> : <Loading />}
                <CommentsGuest postId={id} />
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
                {hotPosts ? hotPosts.map((post) => (
                    <div style={{ cursor: 'pointer' }} onClick={() => navigate(`/post/${post._id}`)} key={post._id}>
                        <HotPost author={post.author.username} likes={post.likes} comments={post.comments} content={post.description} image={post.author.image} />
                    </div>
                ))
                    :
                    <NotFound />
                }
            </div>}
        </>
    )
}