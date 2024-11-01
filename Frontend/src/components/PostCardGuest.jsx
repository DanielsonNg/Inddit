import styles from '../css/landingpage.module.css'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import React, { useEffect, useRef, useState } from 'react';
import PostCardContentGuest from './PostCardContentGuest';
import PostCardContentLimitedGuest from './PostCardContentLimitedGuest';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { useAuth } from "../../context/AuthProvider"
import axios from '../axios';

export default function PostCard(props) {
    const [expand, setExpand] = useState(false)
    const [liked, setLiked] = useState(false)
    const { userData } = useAuth()
    const [likes, setLikes] = useState(props.post.likes)
    const [saved, setSaved] = useState(false)

    const [showMoreButton, setShowMoreButton] = useState(false)
    const contentRef = useRef(null)


    useEffect(() => {
        if (contentRef.current) {
            const contentHeight = contentRef.current.offsetHeight;
            const maxHeight = 300;
            if (contentHeight > maxHeight) {
                setShowMoreButton(true);
            } else {
                setShowMoreButton(false);
            }
        }
    }, [expand]);

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {!expand ?
                    <div ref={contentRef}>
                        <PostCardContentLimitedGuest placement={props.placement} key={props.post._id} deletePostInstant={props.deletePostInstant} user_id={props.user_id} post={props.post} index={props.index} expand={expand} saved={saved} setSaved={setSaved} userData={userData} />
                    </div>
                    :
                    <div ref={contentRef}>
                        <PostCardContentGuest placement={props.placement} key={props.post._id} deletePostInstant={props.deletePostInstant} user_id={props.user_id} post={props.post} index={props.index} saved={saved} setSaved={setSaved} userData={userData} />
                    </div>
                }
                {showMoreButton && (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            backgroundColor: 'rgba(194, 194, 194, 0.1)',
                            fontSize: '18px',
                            cursor: 'pointer'
                        }}
                        onClick={() => setExpand(prevExpand => !prevExpand)}
                    >
                        {expand ? 'Show Less' : 'Show More'}
                    </div>
                )}
                <div className={styles.cardmidBottom}>
                    <div style={{ alignItems: 'center', borderRadius: '10px', display: 'flex', gap: '5px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleLike()}>
                            <InsertEmoticonIcon />
                        </div>
                        <p>{likes}</p>
                    </div>
                    <div style={{ alignItems: 'center', borderRadius: '10px', display: 'flex', gap: '5px' }}>
                        <InsertCommentIcon />
                        {props.post.comments ? props.post.comments : 0}
                    </div>
                </div>
            </div>

        </>
    )
}