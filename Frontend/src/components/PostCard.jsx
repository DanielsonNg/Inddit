import styles from '../css/landingpage.module.css'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import s from '../../assets/s.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem, styled } from '@mui/material';
import React from 'react';
import { cardColor } from '../utils/index'
import axios from '../axios'

export default function PostCard(props) {
    const navigate = useNavigate()
    const editPost = () => {
        //edit post
    }

    const deletePost = async () => {
        axios.delete(`/post/${props.post._id}`)
            .then(({ data }) => {
                if (props.placement === 'landingpage') {

                } else {
                    navigate('/')
                }
            })
    }

    return (
        <>
            <div className={props.placement === 'landingpage' ? styles.cardmidLimited : styles.cardmid}>
                <div style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={s} style={{ width: '30px', height: '30px', borderRadius: '50%' }}></img>&#160;
                        <Link to={`/inddit/${props.post.community_id}`} style={{ color: 'white' }}>
                            <p style={{ fontWeight: 'lighter' }}>i/{props.post.community.name}</p>
                        </Link>
                        &#160;&#160;&#160;
                        <p style={{ fontWeight: 'lighter', fontSize: '14px', textAlign: 'center' }}> 20 Hours Ago</p>
                    </div>
                    <div style={{ fontWeight: 'lighter', display: 'flex', gap: '20px' }}>
                        Join Now
                        <Dropdown >
                            <MenuButton style={{ height: '30px', backgroundColor: cardColor, borderColor: cardColor, borderRadius: '20px' }}>...</MenuButton>
                            <Menu style={{ backgroundColor: cardColor, borderRadius: '10px', marginTop: '10px', borderBlockColor: 'white' }}>
                                <MenuItem onClick={() => editPost()}>Edit Post</MenuItem>
                                <MenuItem onClick={() => deletePost()}>Delete Post</MenuItem>
                                {/* <MenuItem onClick={createHandleMenuClick('Log out')}>Log out</MenuItem> */}
                            </Menu>
                        </Dropdown>
                    </div>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 'lighter' }}>
                    u/{props.post.author.username}
                </div>
                <Link style={{ cursor: 'pointer', color: 'white' }} to={`/post/${props.post._id}`}>
                    <div>
                        <h2>{props.post.title}</h2>
                    </div>
                    <div className={props.placement === 'landingpage' ? styles.text : ''} style={{ fontWeight: 'lighter' }}>
                        {props.post.description}
                    </div>
                    <div style={{ padding: '50px', display: 'flex', justifyContent: 'center', maxWidth: '100%' }}>
                        <img src={props.post.image} style={{ maxWidth: '100%' }}></img>
                    </div>
                </Link>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '50px', marginTop: '20px' }}>
                    <div style={{ alignItems: 'center', borderRadius: '10px', display: 'flex' }}>
                        <EmojiEmotionsIcon />&#160;&#160;
                        <p>{props.post.likes}</p>&#160;&#160;
                    </div>
                    <div style={{ alignItems: 'center', borderRadius: '10px', display: 'flex' }}>
                        <InsertCommentIcon />&#160;
                        71k
                    </div>
                </div>
            </div>
            {/* <div style={{
                display: 'flex', justifyContent: 'center', width: '100%', backgroundColor: 'black', marginTop: "-40px",
                borderRadius: '0px 0px 50px 50px', fontSize: '18px', cursor: 'pointer'}} 
                onClick={showMore}>
                Show More
            </div> */}
        </>
    )
}