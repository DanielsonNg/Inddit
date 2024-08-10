
import styles from '../css/rootlayout.module.css'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import CodeIcon from '@mui/icons-material/Code';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Navbar'
import LeftCard from '../components/LeftCard';
import { useAuth } from '../../context/AuthProvider';

export default function RootLayout() {
    const { logout } = useAuth()

    const handleLogout = () => {
        logout()
    }
    return (
        <>
            {/* <button onClick={handleLogout}>
                Logout
            </button> */}
            <div className={styles.container}>
                <NavBar />
                <div className={styles.content}>
                    <div className={styles.left}>
                        <LeftCard name="Gaming" icon={<SportsEsportsIcon />} />
                        <LeftCard name="Programming" icon={<CodeIcon />} />
                        <LeftCard name="Music" icon={<AudiotrackIcon />} />
                    </div>
                    {/* <div className={styles.mid}>
                        <PostCard />
                        <PostCard />
                        <PostCard />
                    </div>
                    <div className={styles.right}>
                        <h3>Trending</h3>
                        <RightCard />
                        <RightCard />
                    </div> */}
                    <div className={styles.rightSide}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}