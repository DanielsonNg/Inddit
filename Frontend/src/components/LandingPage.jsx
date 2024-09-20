import PostCard from '../components/PostCard'
import styles from '../css/landingpage.module.css'
import RightCard from '../components/RightCard,';
import { useEffect, useState } from 'react';
import axios from '../axios';

export default function LandingPage() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        (async () => {
            await axios.get('/posts')
                .then(({ data }) => {
                    setPosts(data)
                })
        })()
    }, [])

    return (
        <>
            <div className={styles.mid}>
                {posts ? posts.map((post, index) => (
                      <PostCard placement='landingpage' key={index} post={post} />
                )) : ''}
                {/* <PostCard placement='landingpage' />
                <PostCard placement='landingpage' />
                <PostCard placement='landingpage' /> */}
            </div>
            <div className={styles.right}>
                <h3>Trending</h3>
                <RightCard />
                <RightCard />
            </div>
        </>
    )
}