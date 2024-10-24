import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthProvider"
import axios from "../axios"
import NotFound from "./NotFound"
import PostCard from "./PostCard"

export default function LikedPost() {
    const { userData } = useAuth()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        (async () => {
            if (userData) {
                const data = {
                    user_id: userData._id
                }
                await axios.get(`/post/liked/${userData._id}`)
                    .then(({ data }) => {
                        setPosts(data)
                    })
            }
        })()
    }, [])

    function deletePostInstant(index) {
        const reducedArr = [...posts]
        reducedArr.splice(index, 1)
        setPosts(reducedArr)
    }


    return (
        <>
            <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>

                {posts.length > 0 ? posts.map((post, index) => (
                    <PostCard placement='landingpage' key={index} index={index} post={post} deletePostInstant={deletePostInstant} user_id={userData?._id} />
                )) : <NotFound />}
            </div>
        </>
    )
}