import styles from '../css/landingpage.module.css'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import React, { useEffect, useState } from 'react';
import PostCardContent from './PostCardContent';
import PostCardContentLimited from './PostCardContentLimited';

export default function PostCard(props) {
    const [expand, setExpand] = useState(false)
    useEffect(() => {
        (async () => {
            if (props.post.placement === 'landingpage') {
                setExpand(false)
            }
        })()
    }, [])

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {!expand ?
                    <PostCardContentLimited placement={props.placement} key={props.post._id} deletePostInstant={props.deletePostInstant} user_id={props.user_id} post={props.post} index={props.index} /> :
                    <PostCardContent placement={props.placement} key={props.post._id} deletePostInstant={props.deletePostInstant} user_id={props.user_id} post={props.post} index={props.index} />
                }
                {!expand ?
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', backgroundColor: 'rgba(45, 45, 46, 0.5)', fontSize: '18px', cursor: 'pointer' }}
                        onClick={() => {
                            setExpand((prevExpand) => !prevExpand)
                        }}>
                        Show More
                    </div> :
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', backgroundColor: 'rgba(45, 45, 46, 0.5)', fontSize: '18px', cursor: 'pointer' }}
                        onClick={() => {
                            setExpand((prevExpand) => !prevExpand)
                        }}>
                        Show Less
                    </div>

                }
                <div className={styles.cardmidBottom}>
                    <div style={{ alignItems: 'center', borderRadius: '10px', display: 'flex', gap: '5px' }}>
                        <EmojiEmotionsIcon />
                        <p>{props.post.likes}</p>
                    </div>
                    <div style={{ alignItems: 'center', borderRadius: '10px', display: 'flex', gap: '5px' }}>
                        <InsertCommentIcon />&#160;
                        71k
                    </div>
                </div>
            </div>

        </>
    )
}