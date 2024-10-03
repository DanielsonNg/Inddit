import PostCard from '../components/PostCard'
import styles from '../css/landingpage.module.css'
import RightCard from '../components/RightCard,';
import { useEffect, useState } from 'react';
import axios from '../axios';
import NotFound from './NotFound'
import Loading from './Loading';
import { useAuth } from '../../context/AuthProvider';

export default function LandingPage() {
    const [posts, setPosts] = useState([])
    const { userData } = useAuth()
    const [loading, setLoading] = useState(false)

    function deletePostInstant(index) {
        const reducedArr = [...posts]
        reducedArr.splice(index, 1)
        setPosts(reducedArr)
    }

    useEffect(() => {
        (async () => {
            setLoading(true)
            const data = {
                user_id: userData._id
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

    return (
        <>
            <div className={styles.mid}>
                {loading && <Loading />}
                {!loading && <>
                    {posts ? posts.map((post, index) => (
                        <PostCard placement='landingpage' key={index} index={index} post={post} deletePostInstant={deletePostInstant} />
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