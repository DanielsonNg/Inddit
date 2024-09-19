import PostCard from '../components/PostCard'
import styles from '../css/landingpage.module.css'
import RightCard from '../components/RightCard,';
import { useEffect } from 'react';
import axios from '../axios';

export default function LandingPage() {

    useEffect(() => {
      (async()=>{
        await axios.get('/posts')
        .then(({data})=>{
            console.log(data)
        })
      })()
    }, [])
    
    return (
        <>
            <div className={styles.mid}>
                <PostCard placement='landingpage'/>
                <PostCard placement='landingpage' />
                <PostCard placement='landingpage' />
            </div>
            <div className={styles.right}>
                <h3>Trending</h3>
                <RightCard />
                <RightCard />
            </div>
        </>
    )
}