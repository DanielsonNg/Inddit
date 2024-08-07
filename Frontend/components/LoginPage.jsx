import axios from "../src/axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import styles from "../src/css/loginpage.module.css"
import loginImage from "../src/assets/Night.jpg"
import Loading from "./Loading"

export default function LoginPage() {
    const { login, isAuthenticated } = useAuth()
    const [error, setError] = useState('')
    // const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const navigate = useNavigate()
    const [pwdError, setPwdError] = useState('')
    const [emailError, setEmailError] = useState('')

    const [loading, setLoading] = useState(false)

    const handleEmailChange = (e)=>{
        setEmail(e.target.value)
        setEmailError('')
    }

    const handlePasswordChange = (e) =>{
        setPwd(e.target.value)
        setPwdError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true) 
        if(!email) setEmailError('Please fill out email')
        if(!pwd) setPwdError('Please fill out password')
        
        try {
            const response = await axios.post('/newlogin',
                {
                    email: email,
                    password: pwd,
                    // withCredentials: true
                },
            );
            login(response.data.token, response.data.user)
            setEmail('');
            setPwd('');
            setEmailError('')
            setPwdError('')
            setLoading(false)
            navigate('/')
        } catch (err) {
            const error = err.response.data.message
            if (error?.password) setPwdError(error.password)
            if (error?.email) setEmailError(error.email)
            setLoading(false)
        }
    }

    return (
        <>
            {loading ? <Loading /> :
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
                                    <input className={styles.input} type="email" value={email} onChange={(e)=>handleEmailChange(e)} />
                                </div>
                                {emailError && <div style={{color:"red"}}>
                                    {emailError}
                                </div>}
                                <div style={{ paddingTop: "20px" }}>
                                    Password
                                </div>
                                <div>
                                    <input className={styles.input} type="password" value={pwd} onChange={(e)=>handlePasswordChange(e)} />
                                </div>
                                {pwdError && <div style={{color:"red"}}>
                                    {pwdError}
                                </div>}
                                <div className={styles.btnContainer}>
                                    <button className={styles.loginBtn}>Sign In</button>
                                </div>
                            </form>
                            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                                Don't Have An Account? &#160; <Link to="/register">Register Here</Link>
                            </div>
                        </div>
                        {/* Right */}
                        <div className={styles.right}>
                            <img src={loginImage}
                                style={{ width: '600px', borderRadius: '0px 20px 20px 0px' }}>
                            </img>
                        </div>
                    </div>
                </div>
            }

        </>
    )

}