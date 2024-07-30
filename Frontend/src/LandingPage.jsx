import LeftCard from '../components/LeftCard'
import PostCard from '../components/PostCard'
import styles from './landingpage.module.css'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import CodeIcon from '@mui/icons-material/Code';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import RightCard from '../components/RightCard,';

export default function LandingPage() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.navbar}>
                    <h2>Inddit</h2>
                    <div>
                        Search
                    </div>
                    <div>
                        Login
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <LeftCard name="Gaming" icon={<SportsEsportsIcon />} />
                        <LeftCard name="Programming" icon={<CodeIcon />} />
                        <LeftCard name="Music" icon={<AudiotrackIcon />}/>
                    </div>
                    <div className={styles.mid}>
                        <PostCard />
                        <PostCard />
                        <PostCard />
                    </div>
                    <div className={styles.right}>
                        <h3>Trending</h3>
                        <RightCard />
                        <RightCard />
                        
                    </div>
                </div>
            </div>
        </>
    )
}