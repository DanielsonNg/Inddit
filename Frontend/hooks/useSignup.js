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
        try {
            setError(null)
            setLoading(false)
            const res = await axios.post(`/newregister`,{
                email: values.email,
                username: values.username,
                password: values.password
            })
            const data = await res.data
            if(res.status === 200){
                await login(data.token, data.user)
                navigate('/')
            }else if(res.status === 401){
                setError(data.message)
            }else{
                console.error('Registration Failed')
            }
        } catch (error) {
            // console.error(error)
        } finally{
            setLoading(false)
        }
    }


    return{loading, error, registerUser}
}