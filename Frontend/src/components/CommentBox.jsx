import { useState } from "react"
import axios from "../axios"

export default function CommentBox({ setOpenCommentBox, parentId }) {
    const [comment, setComment] = useState('')

    function handleSubmit() {
        const data = {
            content: comment
        }
        axios.post(`/comment/${parentId}`, data)
            .then(({ data }) => {
                console.log(data)
            })
    }

    return (
        <>
            <div style={{ marginTop: '20px', display: 'flex', width: '100%' }}>
                <form style={{ width: '100%' }}>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} type="text" style={{ minHeight: '50px', fontSize: '16px', borderRadius: '0px', width: '100%', resize: 'none' }} />
                    <div style={{ display: 'flex', justifyContent: 'right' }}>
                        <div style={{ height: '30px', borderRadius: '5px', marginRight: '10px', cursor: 'pointer' }} onClick={() => setOpenCommentBox((prev) => !prev)}>Close</div>
                        <div style={{ height: '30px', borderRadius: '5px', cursor: 'pointer' }} onClick={handleSubmit}>Comment</div>
                    </div>
                </form>
            </div>
        </>
    )
}