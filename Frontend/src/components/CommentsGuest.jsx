import { useEffect, useState } from "react"
import styles from "../css/post.module.css"
import CommentGuest from "./CommentGuest"
import axios from "../axios"
import Loading from "./Loading"
import NoData from "./NoData"
import { useAuth } from "../../context/AuthProvider"

export default function Comments({ postId }) {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        axios.get(`/commentsGuest/${postId}`)
            .then(({ data }) => {
                setComments(data)
                setLoading(false)
            })

    }, [])

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>Comments</h1>
            </div>
            {loading && <Loading />}
            {!loading && <div className={styles.commentCard}>
                {comments.length > 0 ? comments.map((comment, index) => (
                    <CommentGuest key={comment._id}  postId={postId} index={index} comment={comment} level={0} 
                        reSetReply={function reSetReply(value) {
                            comment.is_replied = value
                        }}

                    />
                )) : <NoData type='Comment' />}
            </div>}
        </>
    )
}