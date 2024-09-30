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

export default function IndditPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [community, setCommunity] = useState({
        name: '',
        description: '',
        logo: ''
    })

    const [posts, setPosts] = useState()

    const [loading, setLoading] = useState(false)

    function deletePostInstant(index) {
        const reducedArr = [...posts]
        reducedArr.splice(index, 1)
        setPosts(reducedArr)
    }

    useEffect(() => {
        (async () => {
            setLoading(true)
            await axios.get(`/community/${id}`)
                .then(({ data }) => {
                    // console.log(data)
                    setCommunity(data)
                    setLoading(false)
                })
                .catch((error) => {
                    console.log(error)
                    navigate('/')
                    setLoading(false)
                })

            await axios.get('/posts')
                .then(({ data }) => {
                    setPosts(data)
                })
        })()

    }, [])


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
                        <img src={loginImage}
                            style={{ width: '100%', height: '140px', borderRadius: '20px', }}>
                        </img>
                    </div>
                </div>
                <div className={styles.desktop}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-55px', justifyContent: 'space-between', padding: '0px 50px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', flexWrap: 'wrap' }}>
                            <div>
                                <img src={s} style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'black' }}></img>&#160;
                            </div>
                            <div style={{ marginTop: '40px' }}>
                                <h1>i/{community.name}</h1>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '30px', marginTop: '40px', alignItems: "center" }}>
                            <div>
                                <Link to={`/post/create/${id}`}>
                                    <Button color='secondary'>
                                        <h3>Create Post</h3>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.mobile}>
                    <div style={{ display: 'flex' }}>
                        <div>
                            <img src={s} style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'black' }}></img>&#160;
                        </div>
                        <h3>I/{community.name}</h3>
                    </div>
                    <div>
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
                <div style={{padding:'0px 50px 10px 50px', width:'100%', flexWrap:'wrap', fontSize:'16px', fontWeight:'lighter'}}>
                    {community.description}
                </div>
                {/* Content */}
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
                    <div className={styles.mid}>
                        {posts ? posts.map((post, index)=>(
                            <PostCard key={index} placement='landingpage' post={post} index={index} deletePostInstant={deletePostInstant} />
                        )) :''}
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