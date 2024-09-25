import { useEffect, useState } from "react"
import styles from "../css/post.module.css"
import Comment from "./Comment"
import CommentBox from "./CommentBox"
import axios from "../axios"
import NotFound from "./NotFound"
import Loading from "./Loading"

export default function Comments({ postId }) {
    const [openNewComment, setOpenNewComment] = useState(false)
    const [comments, setComments] = useState([])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get(`/comments/${postId}`)
            .then(({ data }) => {
                setComments(data)
                setLoading(false)
            })
    }, [])

    function addCommentInstant(newComment){
        setLoading(true)
        setComments(prevComments => [...prevComments, newComment])
        setLoading(false)
    }

    return (
        <>
            {openNewComment && <CommentBox setOpenCommentBox={setOpenNewComment} parentId={postId} addComment={addCommentInstant} />}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>Comments</h1>
                {!openNewComment && <p style={{ fontWeight: 'lighter', fontSize: '16px', cursor: 'pointer' }} onClick={() => setOpenNewComment(prev => !prev)}>
                    Add New Comment
                </p>}
            </div>
            {loading && <Loading />}
            {!loading && <div className={styles.commentCard}>
                {comments.length > 0 ? comments.map((comment) => (
                    <Comment key={comment._id} addComment={addCommentInstant} comment={comment} level={0} />
                )) : <NotFound />}
            </div>}
        </>
    )
}