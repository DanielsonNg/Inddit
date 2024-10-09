import { useEffect, useState } from "react";
import imageTest from "../assets/Library.jpg"
import Reply from "./Reply"
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import CommentBox from "./CommentBox";
import axios from "../axios";
import { usePost } from "../../context/PostProvider";
import { useAuth } from "../../context/AuthProvider";
import { ADMIN_ROLE } from "../utils";
export default function Comment({ comment, level, deleteCommentInstant, index, reSetReply, userId }) {
    // console.log(userId)
    let left = level * 5
    let right = 100 - left
    const [openComment, setOpenCommentBox] = useState(false)
    const [openReply, setOpenReply] = useState(false)

    const [replies, setReplies] = useState([])

    const [content, setContent] = useState(comment.content)
    const [edit, setEdit] = useState(comment.content)
    const [openEdit, setOpenEdit] = useState(false)

    const { permission } = usePost()

    async function handleOpenReply() {
        setOpenReply((prevValue) => !prevValue)
        await axios.get(`/comments/${comment._id}`)
            .then(({ data }) => {
                setReplies(data)
                // console.log(data)
            })
    }

    function addCommentInstant(newComment) {
        setReplies(prevReplies => [...prevReplies, newComment])
        comment.is_replied = 1
        setOpenReply(true)
    }

    function deleteReplyInstant(index) {
        const reducedArr = [...replies]
        reducedArr.splice(index, 1)
        setReplies(reducedArr)
    }

    async function handleEdit(e) {
        setEdit(e.target.value)
    }

    async function submitEdit() {
        const params = {
            userId: comment?.user?._id ? comment.user._id : null,
            newContent: edit
        }
        axios.post(`/comment/edit/${comment._id}`, params)
            .then(({ data }) => {
                setContent(data.content)
                setOpenEdit(false)
            })
    }

    async function deleteComment() {
        axios.delete(`/comment/${comment._id}`)
            .then(({ data }) => {
                // console.log(data)
                reSetReply(data.is_replied)
                deleteCommentInstant(index)
            })
    }

    async function rreSetReply(value) {
        comment.is_replied = value
    }

    // useEffect(() => {
    //     console.log(permission)
    // }, [permission])

    return (
        <>
            <div style={{ display: 'grid', gridTemplateColumns: `${left}% ${right}%`, minWidth: '300px' }}>
                <div>
                </div>
                <div>
                    <div style={{ fontWeight: 'lighter', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div>
                            <img style={{ width: '30px', height: '30px', borderRadius: '50%' }} src={imageTest}></img>
                        </div>
                        &#160; &#160;
                        {comment?.user?.username}
                        &#160;&#160;&#160;
                        <p style={{ fontWeight: 'lighter', fontSize: '14px', textAlign: 'center' }}> 20 Hours Ago</p>
                    </div>
                    {openEdit &&
                        <form style={{ width: '100%' }}>
                            <textarea value={edit} onChange={(e) => handleEdit(e)} type="text" style={{ minHeight: '50px', fontSize: '16px', borderRadius: '0px', width: '100%', resize: 'none' }} />
                            <div style={{ display: 'flex', justifyContent: 'right' }}>
                                <div style={{ height: '30px', borderRadius: '5px', marginRight: '10px', cursor: 'pointer' }} onClick={() => setOpenEdit((prev) => !prev)}>Close</div>
                                <div style={{ height: '30px', borderRadius: '5px', cursor: 'pointer' }} onClick={submitEdit}>Edit Comment</div>
                            </div>
                        </form>
                    }
                    {!openEdit && <div>
                        {comment.content ? content : ''}
                    </div>}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'lighter', marginTop: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}><EmojiEmotionsIcon /> &#160;{comment.likes} &#160; &#160;</div>
                            <div style={{ cursor: 'pointer' }} onClick={() => setOpenCommentBox(prevValue => !prevValue)}>Reply</div>&#160; &#160;

                            {permission < ADMIN_ROLE ?
                                comment.user._id === userId &&
                                <>
                                    <div style={{ cursor: 'pointer' }} onClick={() => setOpenEdit(prevValue => !prevValue)}>Edit</div> &#160; &#160;
                                    <div style={{ cursor: 'pointer' }} onClick={() => deleteComment()}>Delete</div>
                                </>
                                :
                                permission ?
                                    <>
                                        {comment.user._id === userId ?
                                            <>
                                                <div style={{ cursor: 'pointer' }} onClick={() => setOpenEdit(prevValue => !prevValue)}>Edit</div> &#160; &#160;
                                            </> : ''}
                                        {comment.user._id === userId || permission >= ADMIN_ROLE ?
                                            <div style={{ cursor: 'pointer' }} onClick={() => deleteComment()}>Delete</div> : ''
                                        }
                                    </> : ''}
                            {/* 
                            <div style={{ cursor: 'pointer' }} onClick={() => setOpenEdit(prevValue => !prevValue)}>Edit</div>&#160; &#160;
                            <div style={{ cursor: 'pointer' }} onClick={() => deleteComment()}>Delete</div> */}
                        </div>
                        <div>
                            {comment.is_replied === 1 ? <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0px' }}>
                                <div style={{ cursor: 'pointer' }} onClick={() => handleOpenReply()}>
                                    {openReply === false ? 'Show Replies' : 'Hide Replies'}
                                </div>
                            </div> : ''}
                        </div>
                    </div>
                    {openComment && <CommentBox setOpenCommentBox={setOpenCommentBox} parentId={comment._id} addComment={addCommentInstant} />}
                    {openReply &&
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {replies ? replies.map((reply) => (
                                <div key={reply._id} style={{ width: '100%', marginTop: '20px' }}>
                                    <Comment key={reply._id} comment={reply} level={level + 1} deleteCommentInstant={deleteReplyInstant} reSetReply={rreSetReply} userId={userId} />
                                </div>
                            )) : ''
                            }
                        </div>}
                </div>
            </div >
        </>
    )
}