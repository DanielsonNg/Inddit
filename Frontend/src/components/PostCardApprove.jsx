import styles from '../css/landingpage.module.css'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Button } from '@mui/material';
import { darkRed, purple } from '../utils';
import axios from '../axios';


export default function PostCardApprove(props) {
    async function handleApprove() {
        await axios.put(`/post/approve/${props.post._id}`)
            .then(({ data }) => {
                props.deleteInstant(props.index)
            })

    }

    async function handleReject() {
        await axios.delete(`/post/${props.post._id}`)
            .then(({ data }) => {
                props.deleteInstant(props.index)
            })

    }

    return (
        <>
            <div className={props.placement === 'landingpage' ? styles.cardmidLimited : styles.cardmid}>
                <div style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={props.post.community.logo} style={{ width: '30px', height: '30px', borderRadius: '50%' }} loading='lazy'></img>&#160;
                        <Link to={`/inddit/${props.post.community_id}`} style={{ color: 'white' }}>
                            <p style={{ fontWeight: 'lighter' }}>i/{props.post.community.name}</p>
                        </Link>
                        &#160;&#160;&#160;
                        <p style={{ fontWeight: 'lighter', fontSize: '14px', textAlign: 'center' }}> 20 Hours Ago</p>
                    </div>
                    <div style={{ fontWeight: 'lighter', display: 'flex', gap: '20px', cursor: 'pointer' }}>
                        <Button variant='contained' color='secondary' style={{ backgroundColor: purple, height: '40px' }} onClick={() => handleApprove()}>Approve</Button>
                        <Button variant='contained' color='secondary' style={{ backgroundColor: darkRed, height: '40px' }} onClick={() => handleReject()}>Reject</Button>
                    </div>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 'lighter' }}>
                    u/{props.post.author.username}
                </div>

                <div>
                    <h2>{props.post.title}</h2>
                </div>
                <div>
                    <h3>{props.post.description}</h3>
                </div>
                <div style={{ padding: '50px', display: 'flex', justifyContent: 'center', maxWidth: '100%' }}>
                    <img src={props.post.image} style={{ maxWidth: '100%' }}></img>
                </div>
            </div >
        </>
    )
}