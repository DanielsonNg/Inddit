import { useAuth } from "../context/AuthProvider"
import SearchIcon from '@mui/icons-material/Search';
import styles from "../src/css/rootlayout.module.css"
import { Link } from "react-router-dom";

export default function NavBar() {
    const { userData, token} = useAuth()
    return (
        <div className={styles.navbar}>
            <h2>Inddit</h2>
            <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
                <div style={{ backgroundColor: 'rgb(28, 26, 26)', borderRadius: '10px', width: '500px', height: '49px', paddingLeft: '20px', display: 'flex', alignItems: 'center' }}>
                    <SearchIcon /> <p style={{ fontWeight: 'lighter' }}>Search Inddit</p>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {token === null && (
                    <Link to={'/login'} style={{ textDecoration: 'none', color: 'white' }}>
                        <div style={{ backgroundColor: 'rgb(71, 3, 110)', width: '100px', height: '49px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                            <p style={{ textDecoration: 'none' }}>Login</p>
                        </div>
                    </Link>)
                }
                {token && (
                    <h1>Welcome, {userData.name}</h1>
                )}

            </div>
        </div>
    )
}