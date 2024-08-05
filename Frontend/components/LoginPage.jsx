import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import styles from "../src/css/loginpage.module.css"
import loginImage from "../src/assets/Night.jpg"

export default function LoginPage() {
    const { login, isAuthenticated } = useAuth()
    const [error, setError] = useState('')
    // const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const navigate = useNavigate()
    useEffect(() => {

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3333/newlogin',
                {
                    username: username,
                    password: pwd,
                    withCredentials: true
                },
                // {
                //     headers: { 'Content-Type': 'application/json' },
                //     withCredentials: true
                // }
            );
            login(response.data.token, response.data.user)
            setUsername('');
            setPwd('');
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className={styles.root}>
                <div className={styles.container}>
                    {/* Left */}
                    <div className={styles.left}>
                        <div>
                            <h1>Login</h1>
                        </div>
                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <div>
                                Email
                            </div>
                            <div>
                                <input className={styles.input} type="email" value={email} onChange={(e)=> setEmail(e.target.value)}  />
                            </div>
                            <div style={{paddingTop:"20px"}}>
                                Password
                            </div>
                            <div>
                                <input className={styles.input} type="password" value={pwd} onChange={(e)=> setPwd(e.target.value)}  />
                            </div>
                            <div className={styles.btnContainer}>
                            <button className={styles.loginBtn}>Sign In</button>
                            </div>
                        </form>
                        <div style={{display:'flex', justifyContent:'center', flexDirection:'row'}}>
                            Don't Have An Account? &#160; <Link to="/register">Register Here</Link>
                        </div>
                    </div>
                    {/* Right */}
                    <div className={styles.right}>
                        <img src={loginImage}
                            style={{ width: '600px', borderRadius:'0px 20px 20px 0px' }}>
                        </img>
                    </div>
                </div>
            </div>
        </>
    )

}