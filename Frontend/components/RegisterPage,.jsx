import { useEffect, useRef, useState } from "react"
import useSignup from "../hooks/useSignup"
import styles from "../src/css/registerpage.module.css"
import { Link } from "react-router-dom"
import registerImage from "../src/assets/Library.jpg"

export default function RegisterPage() {
    const { loading, error, registerUser } = useSignup()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [confirm, setConfirm] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        let values = {
            "email": email,
            "username": username,
            "password": pwd
        }
        registerUser(values)
    }

    return (
        <>
            <div className={styles.root}>
                <div className={styles.container}>
                    {/* Left */}
                    <div className={styles.left}>
                        <div>
                            <h1>Register</h1>
                        </div>
                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <div>
                                Username
                            </div>
                            <div>
                                <input className={styles.input} type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div style={{ paddingTop: '20px' }}>
                                Email
                            </div>
                            <div>
                                <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div style={{ paddingTop: "20px" }}>
                                Password
                            </div>
                            <div>
                                <input className={styles.input} type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
                            </div>
                            <div style={{ paddingTop: '20px' }}>
                                Confirm Password
                            </div>
                            <div>
                                <input className={styles.input} type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                            </div>
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
        </>
    )
}