import axios from "../src/axios"
import useAuth from "./useAuth"


export default function useRefresh() {
    const { setAuth } = useAuth
    const refresh = async ()=>{
        const response = await axios.get('/refresh',{
            withCredentials: true
        })
        setAuth(prev =>{
            console.log(JSON.stringify(prev))
            console.log(response.data.accessToken)
            return {...prev, accessToken: response.data.accessToken}
        })
        return response.data.accessToken
    }
    return refresh
}