import PostCard from '../components/PostCard'
import styles from '../css/landingpage.module.css'
import RightCard from '../components/RightCard,';


export default function LandingPage() {
    return (
        <>
            <div className={styles.mid}>
                <PostCard placement='landingpage' />
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