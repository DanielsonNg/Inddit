import PostCardGuest from '../components/PostCardGuest'
import styles from '../css/landingpage.module.css'
import RightCard from '../components/RightCard,';
import { useContext, useEffect, useRef, useState } from 'react';
import axios from '../axios';
import NotFound from './NotFound'
import Loading from './Loading';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate, useOutletContext } from 'react-router-dom';

export default function LandingPage() {
    const [posts, setPosts] = useState([])
    const { userData, isAuthenticated } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [hotCommunities, setHotCommunities] = useState([])
    const navigate = useNavigate()
    const [category, setCategory, searchDebounce] = useOutletContext()
    const pageRef = useRef(0)
    const maxPageRef = useRef(0)

    // const searchDebounce = useDebounce(search)

    useEffect(() => {
        (async () => {
            setLoading(true)
            const data = {
                user_id: userData?._id,
                category: category ? category : null
            }
            await axios.post(`/postsGuest?page=${0}`, data)
                .then(({ data }) => {
                    setPosts(data.posts)
                    setLoading(false)
                    maxPageRef.current = (Math.ceil(data.totalCount / 2) - 1)
                })
                .catch((err) => {
                    setLoading(false)
                })
            await axios.get('/communities/hot')
                .then(({ data }) => {
                    setHotCommunities(data)
                })
        })()
    }, [userData, category])

    useEffect(() => {
        (async () => {
            const data = {
                user_id: userData?._id,
                category: category ? category : null
            }
            await axios.post(`/postsGuest?page=${0}&search=${searchDebounce}`, data)
                .then(({ data }) => {
                    setPosts(data.posts)
                    setLoading(false)
                    maxPageRef.current = (Math.ceil(data.totalCount / 2) - 1)
                })
                .catch((err) => {
                    setLoading(false)
                })
        })()
    }, [searchDebounce])


    function deletePostInstant(index) {
        const reducedArr = [...posts]
        reducedArr.splice(index, 1)
        setPosts(reducedArr)
    }

    const handleScroll = async () => {
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
            const data = {
                user_id: userData?._id,
                category: category ? category : null
            }
            if (pageRef.current < maxPageRef.current) {
                try {
                    const response = await axios.post(`/postsGuest?page=${pageRef.current + 1}`, data)
                    setPosts(prevPosts => [...prevPosts, ...response.data.posts])
                    pageRef.current = pageRef.current + 1
                } catch (err) {
                    console.error("Error fetching more posts:", err)
                } finally {
                    setLoading(false)
                }

            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
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
                    {posts.length > 0 ? posts.map((post, index) => (
                        <PostCardGuest placement='landingpage' key={index} index={index} post={post} deletePostInstant={deletePostInstant} user_id={userData?._id} />)
                    ) : <NotFound />}
                </>}
            </div>
            <div className={styles.right}>
                <h3>Trending</h3>
                {hotCommunities ? hotCommunities.map((c) => (
                    <div key={c.community.name} onClick={() => navigate(`/inddit/${c.community._id}`)}>
                        <RightCard name={c.community.name} logo={c.community.logo} />
                    </div>
                ))
                    :
                    <NotFound />}
            </div>
        </>
    )
}