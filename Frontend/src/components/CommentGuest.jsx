import { useEffect, useState } from "react";
import imageTest from "../assets/Library.jpg"
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import CommentBox from "./CommentBox";
import axios from "../axios";
import { usePost } from "../../context/PostProvider";
import { ADMIN_ROLE } from "../utils";
import { useAuth } from "../../context/AuthProvider"
import ReactTimeAgo from "react-time-ago";

export default function Comment({ comment, level, postId }) {
    let left = level * 5
    let right = 100 - left
    const [openReply, setOpenReply] = useState(false)
    const [replies, setReplies] = useState([])
    const [content, setContent] = useState(comment.content)
    const [likes, setLikes] = useState(comment.likes)
    const { userData } = useAuth()

    async function handleOpenReply() {
        setOpenReply((prevValue) => !prevValue)
        await axios.get(`/commentsGuest/${comment._id}`)
            .then(({ data }) => {
                setReplies(data)
            })
    }

    async function rreSetReply(value) {
        comment.is_replied = value
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
                        {comment?.user?.username}
                        &#160;&#160;&#160;
                        <p style={{ fontWeight: 'lighter', fontSize: '14px', textAlign: 'center' }}> <ReactTimeAgo date={new Date(comment.createdAt).getTime()} locale='en-US' /></p>
                    </div>
                    <div>
                        {comment.content ? content : ''}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'lighter', marginTop: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}><InsertEmoticonIcon /> &#160;{likes} &#160; &#160;</div>
                        </div>
                        <div>
                            {comment.is_replied === 1 ? <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0px' }}>
                                <div style={{ cursor: 'pointer' }} onClick={() => handleOpenReply()}>
                                    {openReply === false ? 'Show Replies' : 'Hide Replies'}
                                </div>
                            </div> : ''}
                        </div>
                    </div>
                    {openReply &&
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {replies ? replies.map((reply) => (
                                <div key={reply._id} style={{ width: '100%', marginTop: '20px' }}>
                                    <Comment key={reply._id} comment={reply} level={level + 1} reSetReply={rreSetReply} postId={postId} />
                                </div>
                            )) : ''
                            }
                        </div>}
                </div>
            </div >
        </>
    )
}