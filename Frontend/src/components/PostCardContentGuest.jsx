import { Link, useNavigate } from 'react-router-dom'
import styles from '../css/landingpage.module.css'
import { Dropdown } from '@mui/base/Dropdown'
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem } from '@mui/material';
import { ADMIN_ROLE, cardColor } from '../utils'
import { useState } from 'react'
import ReactTimeAgo from 'react-time-ago'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';

export default function PostCardContent(props) {
    const [content, setContent] = useState(props.post.description)

    const navigate = useNavigate()
    return (
        <>
            <div className={styles.cardmid}>
                <div style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={props.post.community.logo} style={{ width: '30px', height: '30px', borderRadius: '50%' }} loading='lazy'></img>&#160;
                        <Link to={`/inddit/${props.post.community_id}`} style={{ color: 'white' }}>
                            <p style={{ fontWeight: 'lighter' }}>i/{props.post.community.name}</p>
                        </Link>
                        &#160;&#160;&#160;
                        <p style={{ fontWeight: 'lighter', fontSize: '14px', textAlign: 'center' }}> <ReactTimeAgo date={new Date(props.post.createdAt).getTime()} locale='en-US' /></p>
                    </div>
                    <div style={{ fontWeight: 'lighter', display: 'flex', gap: '20px', cursor: 'pointer' }}>
                    </div>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 'lighter' }}>
                    u/{props.post.author.username}
                </div>
                <Link style={{ cursor: 'pointer', color: 'white' }} to={`/post/${props.post._id}`}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '100%', wordBreak: 'break-all' }}>
                        <h2>{props.post.title}</h2>
                    </div>
                </Link>
                <div style={{ fontWeight: 'lighter' }}>
                    <Link style={{ cursor: 'pointer', color: 'white' }} to={`/post/${props.post._id}`}>
                        {content}
                    </Link>
                </div>
                {props.post.image ? <Link style={{ cursor: 'pointer', color: 'white' }} to={`/post/${props.post._id}`}>
                    <div style={{ padding: '50px', display: 'flex', justifyContent: 'center', maxWidth: '100%' }}>
                        <img src={props.post.image} style={{ maxWidth: '100%' }}></img>
                    </div>
                </Link > : ''}
            </div>
        </>
    )
}