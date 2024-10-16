import { useEffect, useState } from "react"
import axios from "../axios"
import PostCardApprove from "./PostCardApprove"
import NotFound from "./NotFound"


export default function PostsToApprove({ id, permission }) {
    const [posts, setPosts] = useState('')

    useEffect(() => {
        (async () => {
            await axios.get(`/postToApprove/${id}`)
                .then(({ data }) => {
                    setPosts(data)
                    console.log(data)
                })
        })()
    }, [])

    function deleteInstant(index) {
        const reduced = [...posts]
        reduced.splice(index, 1)
        setPosts(reduced)
    }

    return (
        <>
            <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', gap: '20px' }}>
                {posts.length > 0 ? posts.map((post, index) => (
                    <PostCardApprove key={index} placement='landingpage' post={post} index={index} deleteInstant={deleteInstant} />
                ))
                    : <NotFound />
                }
            </div>
        </>
    )
}