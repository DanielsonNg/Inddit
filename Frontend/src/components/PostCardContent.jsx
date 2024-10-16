import { Link, useNavigate } from 'react-router-dom'
import styles from '../css/landingpage.module.css'
import { Dropdown } from '@mui/base/Dropdown'
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem} from '@mui/material';
import { ADMIN_ROLE, cardColor } from '../utils'
import { useState } from 'react'

export default function PostCardContent(props) {
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [content, setContent] = useState(props.post.description)
    const editPost = (value) => {
        setContent(value)
        setOpen(false)
    }

    const navigate = useNavigate()

    const deletePost = async () => {
        await axios.delete(`/post/${props.post._id}`)
            .then(({ data }) => {
                if (props.placement === 'landingpage') {
                    props.deletePostInstant(props.index)
                    setOpen(false)
                } else {
                    navigate('/')
                }
            })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const data = {
            content: content
        }
        await axios.put(`/post/${props.post._id}`, data)
            .then(({ data }) => {
                editPost(data.description)
                setContent(data.description)
                setOpenEdit(false)
            })
    }
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
                        <p style={{ fontWeight: 'lighter', fontSize: '14px', textAlign: 'center' }}> 20 Hours Ago</p>
                    </div>
                    <div style={{ fontWeight: 'lighter', display: 'flex', gap: '20px', cursor: 'pointer' }}>
                        {!props.post.tracker[0]?.permission ? 'Join Now' : ''}
                        {props.post.tracker[0]?.permission < ADMIN_ROLE ?
                            props.post.author._id === props.user_id &&
                            <Dropdown open={open}>
                                <MenuButton onClick={() => setOpen((prevVal) => !prevVal)} style={{ height: '30px', backgroundColor: cardColor, borderColor: cardColor, borderRadius: '20px' }}>...</MenuButton>
                                <Menu style={{ backgroundColor: cardColor, borderRadius: '10px', marginTop: '10px', borderBlockColor: 'white' }}>
                                    <MenuItem onClick={() => setOpenEdit(true)}>Edit Post</MenuItem>
                                    <MenuItem onClick={() => deletePost()}>Delete Post</MenuItem>
                                </Menu>
                            </Dropdown>
                            :
                            props.post.tracker[0]?.permission ?
                                <Dropdown open={open}>
                                    <MenuButton onClick={() => setOpen((prevVal) => !prevVal)} style={{ height: '30px', backgroundColor: cardColor, borderColor: cardColor, borderRadius: '20px' }}>...</MenuButton>
                                    <Menu style={{ backgroundColor: cardColor, borderRadius: '10px', marginTop: '10px', borderBlockColor: 'white' }}>
                                        {props.post.author._id === props.user_id ? <MenuItem onClick={() => setOpenEdit(true)}>Edit Post</MenuItem> : ''}
                                        {props.post.author._id === props.user_id || props.post.tracker[0]?.permission >= ADMIN_ROLE ?
                                            <MenuItem onClick={() => deletePost()}>Delete Post</MenuItem> : ''
                                        }
                                    </Menu>
                                </Dropdown> : ''}
                    </div>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 'lighter' }}>
                    u/{props.post.author.username}
                </div>
                <Link style={{ cursor: 'pointer', color: 'white' }} to={`/post/${props.post._id}`}>
                    <div>
                        <h2>{props.post.title}</h2>
                    </div>
                </Link>
                {openEdit && <div className={props.placement === 'landingpage' ? styles.text : ''} style={{ fontWeight: 'lighter' }}>
                    <div style={{ marginTop: '20px', display: 'flex', width: '99%' }}>
                        <form style={{ width: '100%' }}>
                            <textarea value={content} onChange={(e) => setContent(e.target.value)} type="text" style={{ minHeight: '50px', fontSize: '16px', borderRadius: '0px', width: '100%', resize: 'none' }} />
                            <div style={{ display: 'flex', justifyContent: 'right' }}>
                                <div style={{ height: '30px', borderRadius: '5px', marginRight: '10px', cursor: 'pointer' }} onClick={() => setOpenEdit(false)}>Close</div>
                                <div style={{ height: '30px', borderRadius: '5px', cursor: 'pointer' }} onClick={(e) => handleSubmit(e)}>Edit</div>
                            </div>
                        </form>
                    </div>
                </div>}
                {!openEdit && <div className={props.placement === 'landingpage' ? styles.text : ''} style={{ fontWeight: 'lighter' }}>
                    <Link style={{ cursor: 'pointer', color: 'white' }} to={`/post/${props.post._id}`}>
                        {content}
                    </Link>
                </div>}
                {props.post.image ? <Link style={{ cursor: 'pointer', color: 'white' }} to={`/post/${props.post._id}`}>
                    <div style={{ padding: '50px', display: 'flex', justifyContent: 'center', maxWidth: '100%' }}>
                        <img src={props.post.image} style={{ maxWidth: '100%' }}></img>
                    </div>
                </Link > : ''}
            </div>
        </>
    )
}