import axios from "axios"
import { useEffect } from "react"

export default function LoginPage() {

    useEffect(() => {
        axios.get('http://localhost:3333/api/products')
            .then(res => console.log('res: ' + res))
            .catch(err => console.log('err: ' + err))


    }, [])


    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <h1>Login Page</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <div >
                    <input style={{ height: '50px' }} type="username" name="username">
                    </input>
                </div>
            </div>
            <br></br>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <div>
                    <input style={{ height: '50px' }} type="password" name="password">
                    </input>
                </div>
            </div>
            <br></br>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
            <button style={{width:'100px', height:'100px'}}>Login</button>
            </div>
          
        </>
    )
}