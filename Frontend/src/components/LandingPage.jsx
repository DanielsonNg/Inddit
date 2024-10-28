import PostCard from '../components/PostCard'
import styles from '../css/landingpage.module.css'
import RightCard from '../components/RightCard,';
import { useContext, useEffect, useState } from 'react';
import axios from '../axios';
import NotFound from './NotFound'
import Loading from './Loading';
import { AuthContext } from '../../context/AuthProvider';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const [posts, setPosts] = useState([])
    const { userData, isAuthenticated } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [hotCommunities, setHotCommunities] = useState([])
    const navigate = useNavigate()

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
            await axios.get('/communities/hot')
                .then(({ data }) => {
                    setHotCommunities(data)
                })
        })()
    }, [userData])

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
                    {posts.length > 0 ? posts.map((post, index) => (
                        <PostCard placement='landingpage' key={index} index={index} post={post} deletePostInstant={deletePostInstant} user_id={userData?._id} />
                    )) : <NotFound />}
                </>}
            </div>
            <div className={styles.right}>
                <h3>Trending</h3>
                {hotCommunities ? hotCommunities.map((c) => (
                    <div key={c.community.name} onClick={()=>navigate(`/inddit/${c.community._id}`)}>
                        <RightCard  name={c.community.name} logo={c.community.logo} />
                    </div>
                ))
                    :
                    <NotFound />}
            </div>
        </>
    )
}