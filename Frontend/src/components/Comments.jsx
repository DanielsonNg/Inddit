import { useEffect, useState } from "react"
import styles from "../css/post.module.css"
import Comment from "./Comment"
import CommentBox from "./CommentBox"
import axios from "../axios"
import Loading from "./Loading"
import NoData from "./NoData"
import { useAuth } from "../../context/AuthProvider"

export default function Comments({ postId }) {
    const [openNewComment, setOpenNewComment] = useState(false)
    const [comments, setComments] = useState([])

    const [loading, setLoading] = useState(false)
    const { userData } = useAuth()

    // const [liked, setLiked] = useState(false)
    // const [likes, setLikes] = useState(0)


    useEffect(() => {
        setLoading(true)
        if (userData) {
            const data = {
                user_id: userData._id
            }
            axios.post(`/comments/${postId}`, data)
                .then(({ data }) => {
                    setComments(data)
                    setLoading(false)
                })
        }
    }, [userData])

    function addCommentInstant(newComment) {
        setLoading(true)
        setComments(prevComments => [...prevComments, newComment])
        setLoading(false)
    }

    function deleteCommentInstant(index) {
        const reducedArr = [...comments]
        reducedArr.splice(index, 1)
        setComments(reducedArr)
    }



    return (
        <>
            {openNewComment && <CommentBox setOpenCommentBox={setOpenNewComment} parentId={postId} addComment={addCommentInstant} postId={postId} />}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>Comments</h1>
                {!openNewComment && <p style={{ fontWeight: 'lighter', fontSize: '16px', cursor: 'pointer' }} onClick={() => setOpenNewComment(prev => !prev)}>
                    Add New Comment
                </p>}
            </div>
            {loading && <Loading />}
            {!loading && <div className={styles.commentCard}>
                {comments.length > 0 ? comments.map((comment, index) => (
                    <Comment key={comment._id} addComment={addCommentInstant} deleteCommentInstant={deleteCommentInstant} postId={postId}
                        index={index} comment={comment} level={0} userId={userData._id} 
                        reSetReply={function reSetReply(value) {
                            comment.is_replied = value
                        }} 
                      
                        />
                )) : <NoData type='Comment' />}
            </div>}
        </>
    )
}