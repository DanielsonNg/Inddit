import PostCard from '../components/PostCard'
import styles from '../css/landingpage.module.css'
import RightCard from '../components/RightCard,';
import { useContext, useEffect, useState } from 'react';
import axios from '../axios';
import NotFound from './NotFound'
import Loading from './Loading';
import { AuthContext } from '../../context/AuthProvider';

export default function LandingPageGuest() {
    const [posts, setPosts] = useState([])
    const { userData, isAuthenticated } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
            (async () => {
                setLoading(true)
                await axios.post('/postsGuest', data)
                    .then(({ data }) => {
                        setPosts(data)
                        setLoading(false)
                    })
                    .catch((err) => {
                        setLoading(false)
                    })
            })()
    }, [])

    function deletePostInstant(index) {
        const reducedArr = [...posts]
        reducedArr.splice(index, 1)
        setPosts(reducedArr)
    }

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