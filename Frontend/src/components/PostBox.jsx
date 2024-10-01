import { useState } from "react"
import axios from "../axios"

export default function PostBox({ setOpenEditPost, id, content, editPost }) {
    const [editContent, setEditContent] = useState(content)

    function handleSubmit() {
        const data = {
            content: editContent
        }
        axios.put(`/post/${id}`, data)
            .then(({ data }) => {
                editPost(data.description)
                setEditContent(data.description)
                setOpenEditPost(false)
            })
    }

    return (
        <>
            <div style={{ marginTop: '20px', display: 'flex', width: '99%' }}>
                <form style={{ width: '100%' }}>
                    <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} type="text" style={{ minHeight: '50px', fontSize: '16px', borderRadius: '0px', width: '100%', resize: 'none' }} />
                    <div style={{ display: 'flex', justifyContent: 'right' }}>
                        <div style={{ height: '30px', borderRadius: '5px', marginRight: '10px', cursor: 'pointer' }} onClick={() => setOpenEditPost(false)}>Close</div>
                        <div style={{ height: '30px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleSubmit()}>Edit</div>
                    </div>
                </form>
            </div>
        </>
    )
}