import styles from '../css/landingpage.module.css'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import React, { useEffect, useState } from 'react';
import PostCardContent from './PostCardContent';
import PostCardContentLimited from './PostCardContentLimited';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { useAuth } from "../../context/AuthProvider"
import axios from '../axios';

export default function PostCard(props) {
    const [expand, setExpand] = useState(false)
    const [liked, setLiked] = useState(false)
    const { userData } = useAuth()
    const [likes, setLikes] = useState(props.post.likes)
    useEffect(() => {
        (async () => {
            if (props.post.placement === 'landingpage') {
                setExpand(false)
            }
            const data = {
                user_id: userData?._id
            }
            await axios.post(`/post/track/like/${props.post._id}`, data)
                .then(({ data }) => {
                    setLiked(data.like)
                })
        })()
    }, [])

    async function handleLike() {
        const data = {
            user_id: userData?._id
        }
        await axios.post(`/post/like/${props.post._id}`, data)
            .then(({ data }) => {
                setLiked(true)
                setLikes(prevLikes => prevLikes + 1)
            })
    }

    async function handleUnlike() {
        const data = {
            user_id: userData?._id
        }
        await axios.post(`/post/unlike/${props.post._id}`, data)
            .then(({ data }) => {
                setLiked(false)
                setLikes(prevLikes => prevLikes - 1)
            })

    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {!expand ?
                    <PostCardContentLimited placement={props.placement} key={props.post._id} deletePostInstant={props.deletePostInstant} user_id={props.user_id} post={props.post} index={props.index} /> :
                    <PostCardContent placement={props.placement} key={props.post._id} deletePostInstant={props.deletePostInstant} user_id={props.user_id} post={props.post} index={props.index} />
                }
                {!expand ?
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', backgroundColor: 'rgba(194, 194, 194, 0.1)', fontSize: '18px', cursor: 'pointer' }}
                        onClick={() => {
                            setExpand((prevExpand) => !prevExpand)
                        }}>
                        Show More
                    </div> :
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', backgroundColor: 'rgba(194, 194, 194, 0.1)', fontSize: '18px', cursor: 'pointer' }}
                        onClick={() => {
                            setExpand((prevExpand) => !prevExpand)
                        }}>
                        Show Less
                    </div>

                }
                <div className={styles.cardmidBottom}>
                    <div style={{ alignItems: 'center', borderRadius: '10px', display: 'flex', gap: '5px' }}>
                        {!liked && <div style={{ display: 'flex', alignItems: 'center', cursor:'pointer' }} onClick={() => handleLike()}>
                            <InsertEmoticonIcon />
                        </div>}
                        {liked && <div style={{ display: 'flex', alignItems: 'center', cursor:'pointer' }} onClick={() => handleUnlike()}>
                            <EmojiEmotionsIcon />
                        </div>}
                        <p>{likes}</p>
                    </div>
                    <div style={{ alignItems: 'center', borderRadius: '10px', display: 'flex', gap: '5px' }}>
                        <InsertCommentIcon />
                        71k
                    </div>
                </div>
            </div>

        </>
    )
}