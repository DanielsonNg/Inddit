import { useEffect } from "react"
import { useAuth } from "../../context/AuthProvider"
import axios from "../axios"

export default function SavedPost() {
    const { userData } = useAuth()
    useEffect(() => {
        (async () => {
            if (userData) {
                const data = {
                    user_id: userData._id
                }
                await axios.get(`/post/saved/${userData._id}`)
                    .then(({ data }) => {
                        console.log(data)
                    })
            }
        })()
    }, [])


    return (
        <>
        </>
    )
}