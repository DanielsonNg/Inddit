import { useEffect, useRef, useState } from "react"
import styles from "../css/registerpage.module.css"
import { Link, useNavigate } from "react-router-dom"
import registerImage from "../assets/Library.jpg"
import { useAuth } from "../../context/AuthProvider"
import axios from "../axios"
import Loading from "./Loading"


export default function RegisterPage() {
    const { login } = useAuth()
    // const { loading, error, registerUser } = useSignup()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [confirm, setConfirm] = useState('')

    const [loading, setLoading] = useState(false)

    const [errorUsername, setErrorUsername] = useState('')
    const [errorPwd, setErrorPwd] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorConfirm, setErrorConfirm] = useState('')

    const navigate = useNavigate()

    const handleUsernameChange = (e) =>{
        setUsername(e.target.value)
        setErrorUsername('')
    }

    const handleEmailChange = (e) =>{
        setEmail(e.target.value)
        setErrorEmail('')
    }

    const handlePasswordChange = (e) =>{
        setPwd(e.target.value)
        setErrorPwd('')
    }

    const handleConfirmChange = (e) =>{
        setConfirm(e.target.value)
        setErrorConfirm('')
    }


    const validateData = (e) => {
        e.preventDefault()
        setLoading(true)
        if(!username){
            setErrorUsername('Please Fill Out Username')
            setLoading(false)
        }
        if(!email){
            setErrorEmail('Please Fill Out Email')
            setLoading(false)
        }
       
        if(!confirm || confirm !== pwd){
            setErrorConfirm('Password Confirmation Incorrect')
            setLoading(false)
        }
        if(pwd.length < 8){
            if(!pwd){
                setErrorPwd('Please Fill Out Password')
            }else{
                setErrorPwd('Password need to be at least 8 characters long')
            }
            setLoading(false)
        }
        
        if(email && pwd && username && confirm && pwd === confirm){
            handleSubmit(e)
        }
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        let values = {
            "email": email,
            "username": username,
            "password": pwd
        }
        try {
            const res = await axios.post(`/newregister`, {
                email: values.email,
                username: values.username,
                password: values.password
            })
            const data = await res.data
            setLoading(false)
            if (res.status === 200) {
                await login(data.token, data.user)
                await navigate('/')
            }
        } catch (err) {
            let error = err.response.data.message
            if(error?.email) setErrorEmail(error.email)
            if(error?.username) setErrorUsername(error.username)
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
                                <h1>Register</h1>
                            </div>
                            {/* Form */}
                            <form onSubmit={validateData}>
                                <div>
                                    Username
                                </div>
                                <div>
                                    <input className={styles.input} type="text" value={username} onChange={(e) => handleUsernameChange(e)} />
                                </div>
                                {errorUsername && <div style={{color:'red'}}>
                                    {errorUsername}</div>}
                                <div style={{ paddingTop: '20px' }}>
                                    Email
                                </div>
                                <div>
                                    <input className={styles.input} type="email" value={email} onChange={(e) => handleEmailChange(e)} />
                                </div>
                                {errorEmail && <div style={{color:'red'}}>
                                {errorEmail}</div>}
                                <div style={{ paddingTop: "20px" }}>
                                    Password
                                </div>
                                <div>
                                    <input className={styles.input} type="password" value={pwd} onChange={(e) => handlePasswordChange(e)} />
                                </div>
                                {errorPwd && <div style={{color:'red'}}>
                                    {errorPwd}</div>}
                                <div style={{ paddingTop: '20px' }}>
                                    Confirm Password
                                </div>
                                <div>
                                    <input className={styles.input} type="password" value={confirm} onChange={(e) => handleConfirmChange(e)} />
                                </div>
                                {errorConfirm && <div style={{color:'red'}}>
                                {errorConfirm}</div>}
                                <div className={styles.btnContainer}>
                                    <button className={styles.loginBtn}>Sign Up</button>
                                </div>
                            </form>
                            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                                Already have an account? &#160; <Link to="/login">Sign in here</Link>
                            </div>
                        </div>
                        {/* Right */}
                        <div className={styles.right}>
                            <img src={registerImage}
                                style={{ width: '600px', borderRadius: '0px 20px 20px 0px' }}>
                            </img>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}