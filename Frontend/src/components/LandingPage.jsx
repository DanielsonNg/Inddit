import PostCard from '../components/PostCard'
import styles from '../css/landingpage.module.css'
import RightCard from '../components/RightCard,';
import { useContext, useEffect, useState } from 'react';
import axios from '../axios';
import NotFound from './NotFound'
import Loading from './Loading';
import { AuthContext } from '../../context/AuthProvider';
import { Button } from '@mui/material';

export default function LandingPage() {
    const [posts, setPosts] = useState([])
    const { userData, isAuthenticated } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            const data = {
                user_id: userData?._id
            }
            await axios.post('/posts', data)
                .then(({ data }) => {
                    setPosts(data)
                    setLoading(false)
                })
                .catch((err) => {
                    setLoading(false)
                })
        })()
    }, [userData])

    function deletePostInstant(index) {
        const reducedArr = [...posts]
        reducedArr.splice(index, 1)
        setPosts(reducedArr)
    }

    async function test() {
        const data = {
            user_id: userData?._id
        }
        await axios.post(`/posts/hot`, data)
            .then(({ data }) => {
                console.log(data)
            })
    }

    return (
        <>
            <Button onClick={test}>Test</Button>
            <div className={styles.mid}>
                {loading && <Loading />}
                {!loading && <>
                    {posts.length > 0 ? posts.map((post, index) => (
                        <PostCard placement='landingpage' key={index} index={index} post={post} deletePostInstant={deletePostInstant} user_id={userData?._id} />
                    )) : <NotFound />}
                </>}
            </div>
            <div className={styles.right}>
                <h3>Trending</h3>
                <RightCard />
                <RightCard />
            </div>
        </>
    )
}