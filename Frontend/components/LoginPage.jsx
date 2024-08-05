import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"

export default function LoginPage() {
    const {login, isAuthenticated} = useAuth()
    const [error, setError] = useState('')
    const [username, setUsername] = useState('')
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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>Login Page</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div >
                        <input
                         style={{ height: '50px' }} 
                         type="text" 
                         value={username}
                         onChange={(e) => setUsername(e.target.value)}
                         >
                        </input>
                    </div>
                </div>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <input 
                        style={{ height: '50px' }} 
                        type="password" 
                        value={pwd}
                        onChange={(e)=> setPwd(e.target.value)}
                        >
                        </input>
                    </div>
                </div>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button style={{ width: '100px', height: '100px' }}>Login</button>
                </div>
            </form>
            <Link to="/register">
            Register
            </Link>
            {/* <button onClick={()=>refresh()}>Refresh</button> */}
        </>
    )
}