import PostCard from '../components/PostCard'
import styles from '../css/landingpage.module.css'
import RightCard from '../components/RightCard,';
import loginImage from "../assets/Night.jpg"
import s from '../../assets/s.jpg'
import HotPost from './HotPost';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../axios';
import { Button } from '@mui/material';
import Loading from './Loading';
import { useAuth } from "../../context/AuthProvider"
import NotFound from './NotFound';

export default function IndditPage() {
    const { userData } = useAuth()
    const { id } = useParams()
    const navigate = useNavigate()
    const [community, setCommunity] = useState({
        name: '',
        description: '',
        logo: ''
    })

    const [posts, setPosts] = useState()

    const [loading, setLoading] = useState(false)
    const [join, setJoin] = useState(0)

    function deletePostInstant(index) {
        const reducedArr = [...posts]
        reducedArr.splice(index, 1)
        setPosts(reducedArr)
    }

    async function setPermission() {
        const data = {
            user_id: userData?._id,
            community_id: id
        }
        if (userData?._id) {
            await axios.post(`/community/permission`, data)
                .then(({ data }) => {
                    data ? setJoin(data.permission) : setJoin(null)
                })
        }
    }

    useEffect(() => {
        (async () => {
            if (userData) {
                setLoading(true)
                const data = {
                    user_id: userData?._id,
                    community_id: id
                }
                await axios.get(`/community/${id}`)
                    .then(({ data }) => {
                        setCommunity(data)
                    })
                    .catch((error) => {
                        navigate('/')
                    })
                await axios.post(`/community/posts/${id}`, data)
                    .then(({ data }) => {
                        setPosts(data)
                        setLoading(false)
                    })
                await setPermission()
            }
        })()
    }, [userData])

    async function handleJoin(e) {
        e.preventDefault()
        const data = {
            user_id: userData._id
        }
        await axios.post(`/community/join/${community._id}`, data)
            .then(async ({ data }) => {
                setJoin(data.is_join)
            })
        await axios.post(`/community/posts/${id}`, data)
            .then(({ data }) => {
                setPosts(data)
                setLoading(false)
            })
        await setPermission()
    }

    async function handleLeave(e) {
        e.preventDefault()
        const data = {
            user_id: userData._id
        }
        await axios.post(`/community/leave/${community._id}`, data)
            .then(async ({ data }) => {
                setJoin(data.is_join)
            })
        await axios.post(`/community/posts/${id}`, data)
            .then(({ data }) => {
                setPosts(data)
                setLoading(false)
            })
        await setPermission()
    }


    return (
        <>
            {loading &&
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Loading />
                </div>
            }
            {!loading && <div style={{ width: '100%' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'center', minWidth: '300px', width: '100%' }}>
                    <div style={{ width: '100%' }}>
                        <img src={community.banner} loading='lazy'
                            style={{ width: '100%', height: '140px', borderRadius: '20px' }}>
                        </img>
                    </div>
                </div>
                <div className={styles.desktop}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-55px', justifyContent: 'space-between', padding: '0px 50px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', flexWrap: 'wrap' }}>
                            <div>
                                <img src={community.logo} style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'black' }}></img>&#160;
                            </div>
                            <div style={{ marginTop: '40px' }}>
                                <h1>i/{community?.name}</h1>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '30px', marginTop: '40px', alignItems: "center" }}>

                            {join === null && <div onClick={(e) => handleJoin(e)}
                                style={{ borderBlock: '2px solid gray', cursor: 'pointer', minWidth: '200px', height: "40px", borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                Join Community
                            </div>}
                            {join === 0 && <div
                                style={{ borderBlock: '2px solid gray', cursor: 'pointer', minWidth: '200px', height: "40px", borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                Requesting Join
                            </div>}
                            {join > 0 && userData?._id !== community.owner_id && <div onClick={(e) => handleLeave(e)}
                                style={{ borderBlock: '2px solid gray', cursor: 'pointer', minWidth: '200px', height: "40px", borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                Leave Community
                            </div>}
                            {join > 0 && <div>
                                <Link to={`/post/create/${id}`}>
                                    <Button color='secondary' style={{ borderRadius: '20px', height: '40px' }}>
                                        <h3 style={{ fontWeight: 'lighter' }}>Create Post</h3>
                                    </Button>
                                </Link>
                            </div>}
                            {join > 1 && <div onClick={() => navigate(`/community/manage/${id}`)}
                                style={{ borderBlock: '2px solid gray', cursor: 'pointer', minWidth: '200px', height: "40px", borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                Manage Community
                            </div>}
                        </div>
                    </div>
                </div>
                <div className={styles.mobile}>
                    <div style={{ display: 'flex' }}>
                        <div>
                            <img src={s} style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'black' }}></img>&#160;
                        </div>
                        <h3>I/{community?.name}</h3>
                    </div>
                    <div>
                        <div>
                            Join
                        </div>
                        <Link to={'/post/create'}>
                            <Button color="secondary">
                                Create Post
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className={styles.mobile} style={{ display: 'none' }}>
                    <h1>de</h1>
                </div>
                <div style={{ padding: '0px 50px 10px 50px', width: '100%', flexWrap: 'wrap', fontSize: '16px', fontWeight: 'lighter' }}>
                    {community?.description}
                </div>
                {/* Content */}
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
                    <div className={styles.mid}>
                        {posts?.length > 0 ? posts.map((post, index) => (
                            <PostCard key={index} placement='landingpage' user_id={userData?._id} post={post} index={index} deletePostInstant={deletePostInstant} />
                        )) :
                            <NotFound />
                        }
                        {/* <PostCard placement='landingpage' />
                        <PostCard placement='landingpage' />
                        <PostCard placement='landingpage' /> */}
                    </div>
                    <div className={styles.right}>
                        <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                            <img src={s} style={{ width: '30px', height: '30px', borderRadius: '50%' }}></img>&#160;
                            I/Memes
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            Meme Community
                        </div>
                        <div style={{ fontWeight: 'lighter' }}>
                            This description describe a description of a inddit good.
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '10px ' }}>
                            25k Members
                        </div>
                        <div style={{ fontWeight: 'bold', marginTop: '10px' }}>
                            Hot Posts
                        </div>
                        <HotPost />
                        <HotPost />
                        <HotPost />
                        <HotPost />
                    </div>
                </div>
            </div>}
        </>
    )
}