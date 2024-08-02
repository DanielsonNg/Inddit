import LeftCard from '../components/LeftCard'
import PostCard from '../components/PostCard'
import styles from './landingpage.module.css'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import CodeIcon from '@mui/icons-material/Code';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import RightCard from '../components/RightCard,';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useStateContext } from '../context/ContextProvider';

export default function LandingPage() {
    const {user} = useStateContext
    useEffect(() => {
      console.log(user)
    }, [])
    
    return (
        <>
            <div className={styles.container}>
                <div className={styles.navbar}>
                    <h2>Inddit</h2>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
                        <div style={{ backgroundColor: 'rgb(28, 26, 26)', borderRadius: '10px', width: '500px', height: '49px', paddingLeft: '20px', display: 'flex', alignItems: 'center' }}>
                            <SearchIcon /> <p style={{ fontWeight: 'lighter' }}>Search Inddit</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Link to={'/login'}>
                        <div style={{ backgroundColor: 'rgb(100, 3, 156)', width:'100px', height: '49px', borderRadius: '10px',  display: 'flex', alignItems: 'center', justifyContent:'center', fontWeight:'bold' }}>
                            Login
                        </div>
                        </Link>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <LeftCard name="Gaming" icon={<SportsEsportsIcon />} />
                        <LeftCard name="Programming" icon={<CodeIcon />} />
                        <LeftCard name="Music" icon={<AudiotrackIcon />} />
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