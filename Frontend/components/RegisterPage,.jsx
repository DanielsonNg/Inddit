import { useEffect, useRef, useState } from "react"
import useSignup from "../hooks/useSignup"

export default function RegisterPage() {
    const { loading, error, registerUser } = useSignup()
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        let values = {
            "username": user,
            "password": pwd
        }
        registerUser(values)
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>Register Page</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <input
                            type="text"
                            id="username"
                            required
                            autoComplete="off"
                            style={{ height: '50px' }}
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />

                    </div>

                </div>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            style={{ height: '50px' }}
                        />

                    </div>
                </div>
                <br></br>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                        style={{ height: '50px' }}
                    >Sign Up</button>
                </div>
            </form>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p>
                    Already registered?<br />
                    <span className="line">
                        {/*put router link here*/}
                        <a href="/login">Sign In</a>
                    </span>
                </p>
            </div>
        </>
    )
}