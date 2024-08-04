import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useStateContext } from "../context/ContextProvider"

export default function LoginPage() {
    const { setUser, setToken, token, user } = useStateContext()
    const [error, setError] = useState('')
    const [username, setUsername] = useState('')
    const [pwd, setPwd] = useState('')
    const navigate = useNavigate()
    // const refresh = useRefresh()

    useEffect(() => {

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post('http://localhost:3333/newlogin',
            //     {
            //         username: username,
            //         password: pwd,
            //         withCredentials: true
            //     },
            //     // {
            //     //     headers: { 'Content-Type': 'application/json' },
            //     //     withCredentials: true
            //     // }
            // );
            console.log(response.data.userFind)
            const accessToken = response?.data?.accessToken;
            // const roles = response?.data?.roles;
            setUser(response?.data?.userFind)
            setToken(accessToken)
            setUsername('');
            setPwd('');
            // navigate('/users')
            // navigate('/users');
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