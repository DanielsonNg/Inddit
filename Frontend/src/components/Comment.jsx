import { useState } from "react";
import imageTest from "../assets/Library.jpg"
import Reply from "./Reply"
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import CommentBox from "./CommentBox";
export default function Comment(props) {
    console.log(props)
    let left = props.level * 5
    let right = 100 - left
    const [openComment, setOpenCommentBox] = useState(false)
    const [openReply, setOpenReply] = useState(false)

   

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
                        {props.comment ? props.comment : ''}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'lighter', marginTop: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}><EmojiEmotionsIcon /> &#160;169k &#160; &#160;</div>
                            <div style={{ cursor: 'pointer' }} onClick={() => setOpenCommentBox(prevValue => !prevValue)}>Reply</div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0px' }}>
                                {props.reply && <div style={{cursor: 'pointer' }} onClick={() => setOpenReply((prevValue) => !prevValue)}>
                                    {openReply === false ? 'Show Replies' : 'Hide Replies'}
                                </div>}
                            </div>
                        </div>
                    </div>
                    {openComment && <CommentBox setOpenCommentBox={setOpenCommentBox} />}

                    {openReply && <div style={{ display: 'flex', marginTop: '20px' }}>
                        {props.reply?.length > 0 && <div>
                            <Comment comment={props.reply} reply={props.replyrep} level={props.level + 1} />
                        </div>}
                    </div>}
                </div>
            </div>
        </>
    )
}