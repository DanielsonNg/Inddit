import { useState } from "react"
import axios from "../axios"
import { useAuth } from "../../context/AuthProvider"

export default function CommentBox({ setOpenCommentBox, parentId, addComment, postId }) {
    const [comment, setComment] = useState('')
    const { userData } = useAuth()

    function handleSubmit() {
        const data = {
            content: comment,
            userId: userData._id,
            postId: postId
        }
        axios.post(`/comment/${parentId}`, data)
            .then(({ data }) => {
                // console.log(data)
                addComment(data)
                setOpenCommentBox((prev) => !prev)
            })

    }

    return (
        <>
            <div style={{ marginTop: '20px', display: 'flex', width: '100%' }}>
                <form style={{ width: '100%' }}>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} type="text" style={{ minHeight: '50px', fontSize: '16px', borderRadius: '0px', width: '100%', resize: 'none' }} />
                    <div style={{ display: 'flex', justifyContent: 'right' }}>
                        <div style={{ height: '30px', borderRadius: '5px', marginRight: '10px', cursor: 'pointer' }} onClick={() => setOpenCommentBox(false)}>Close</div>
                        <div style={{ height: '30px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleSubmit()}>Comment</div>
                    </div>
                </form>
            </div>
        </>
    )
}