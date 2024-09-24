import { useEffect, useState } from "react"
import styles from "../css/post.module.css"
import Comment from "./Comment"
import CommentBox from "./CommentBox"
import axios from "../axios"

export default function Comments({ postId }) {
    const [openNewComment, setOpenNewComment] = useState(false)
    const [comments, setComments] = useState([])

    useEffect(() => {
        axios.get(`/comments/${postId}`)
            .then(({ data }) => {
                // console.log(data)
                setComments(data)
            })
    }, [])


    return (
        <>
            {openNewComment && <CommentBox setOpenCommentBox={setOpenNewComment} parentId={postId} />}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>Comments</h1>
                {!openNewComment && <p style={{ fontWeight: 'lighter', fontSize: '16px', cursor: 'pointer' }} onClick={() => setOpenNewComment(prev => !prev)}>
                    Add New Comment
                </p>}
            </div>
            <div className={styles.commentCard}>
                {comments ? comments.map((comment)=>(
                    <Comment key={comment._id} comment={comment} level={0} />
                ))  : ''}
                {/* <Comment comment="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. " reply="test" level={0} replyrep="test" />
                <Comment comment="Aku haus beri aku minum" />
                <Comment comment="Aku haus beri aku minum" />
                <Comment comment="Aku haus beri aku minum" /> */}
            </div>
        </>
    )
}