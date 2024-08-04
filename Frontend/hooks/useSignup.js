import { useState } from "react"
import { useAuth } from "../context/AuthProvider"
import axios from "../src/axios"
import { useNavigate } from "react-router-dom"

export default function useSignup(){
    const {login} = useAuth()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const navigate = useNavigate()

    async function registerUser(values){
        // if(values.password !== values.passwordConfirm){
        //     return setError('Password confirmation failed')
        // }
        try {
            setError(null)
            setLoading(false)
            const res = await fetch('http://localhost:3333/newregister',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            })
            const data = await res.json()
            if(res.status === 200){
                // message.success(data.message)
                await login(data.token, data.user)
                navigate('/')
            }else if(res.status === 401){
                setError(data.message)
            }else{
                console.error('Registration Failed')
            }
        } catch (error) {
            console.error(error)
        } finally{
            setLoading(false)
        }
    }


    return{loading, error, registerUser}
}