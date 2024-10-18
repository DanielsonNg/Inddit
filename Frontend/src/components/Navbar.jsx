import { useAuth } from "../../context/AuthProvider"
import SearchIcon from '@mui/icons-material/Search';
import styles from "../css/rootlayout.module.css"
import { Link } from "react-router-dom";
import { purple } from "../utils";
import { useEffect } from "react";

export default function NavBar() {
    const { userData, token } = useAuth()
    return (
        <div className={styles.navbar}>
            <div className={styles.homeText}>
                <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
                    <h2>Inddit</h2>
                </Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
                <div className={styles.search} style={{ backgroundColor: 'rgb(28, 26, 26)', borderRadius: '10px', maxWidth: '500px', minWidth: '300px', height: '49px', paddingLeft: '20px', display: 'flex', alignItems: 'center' }}>
                    <SearchIcon /> <p style={{ fontWeight: 'lighter' }}>Search Inddit</p>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {token === null ? (
                    <Link to={'/login'} style={{ textDecoration: 'none', color: 'white' }}>
                        <div style={{ backgroundColor: purple, width: '100px', height: '49px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                            <p style={{ textDecoration: 'none' }}>Login</p>
                        </div>
                    </Link>)
                    :
                    <Link to={`/user/${userData._id}`} style={{ textDecoration: 'none', color: 'white' }}>
                        <div style={{ backgroundColor: "black", width: '70px', height: '70px', borderRadius: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginRight:"50px", marginBottom:'20px' }}>
                            <img src={userData.image} style={{width:'70px', height:'70px', borderRadius: '100px'}} ></img>
                        </div>
                    </Link>
                }
                {/* {token && (
                    <h1>{userData.name}</h1>
                )} */}

            </div>
        </div>
    )
}