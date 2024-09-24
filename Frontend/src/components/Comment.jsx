import { useEffect, useState } from "react";
import imageTest from "../assets/Library.jpg"
import Reply from "./Reply"
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import CommentBox from "./CommentBox";
import axios from "../axios";
export default function Comment({ comment, level }) {
    // console.log(comment)
    let left = level * 5
    let right = 100 - left
    const [openComment, setOpenCommentBox] = useState(false)
    const [openReply, setOpenReply] = useState(false)

    const [replies, setReplies] = useState([])

    async function handleOpenReply() {
        setOpenReply((prevValue) => !prevValue)
        await axios.get(`/comments/${comment._id}`)
            .then(({ data }) => {
                setReplies(data)
                console.log(data)
            })
    }

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
                        James Bond
                        &#160;&#160;&#160;
                        <p style={{ fontWeight: 'lighter', fontSize: '14px', textAlign: 'center' }}> 20 Hours Ago</p>
                    </div>
                    <div>
                        {comment.content ? comment.content : ''}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'lighter', marginTop: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}><EmojiEmotionsIcon /> &#160;169k &#160; &#160;</div>
                            <div style={{ cursor: 'pointer' }} onClick={() => setOpenCommentBox(prevValue => !prevValue)}>Reply</div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0px' }}>
                                <div style={{ cursor: 'pointer' }} onClick={() => handleOpenReply()}>
                                    {openReply === false ? 'Show Replies' : 'Hide Replies'}
                                </div>
                            </div>
                        </div>
                    </div>
                    {openComment && <CommentBox setOpenCommentBox={setOpenCommentBox} parentId={comment._id} />}

                    {openReply && 
                    <div style={{ display: 'flex', flexDirection:'column'}}>
                        {replies ? replies.map((reply) => (
                            <div style={{width:'100%', marginTop: '20px'}}>
                                <Comment key={reply._id} comment={reply} level={level + 1} />
                            </div>
                        )) : ''
                        }
                    </div>}
                </div>
            </div>
        </>
    )
}