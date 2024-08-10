import { useEffect } from "react"
import { useParams } from "react-router-dom"
import PostCard from "./PostCard"
import RightCard from "./RightCard,"
import styles from "../css/landingpage.module.css"
import Comments from "./Comments"

export default function Post() {
    let {id} = useParams()

    useEffect(() => {
     
    }, [])
    
    return (
        <>
            <div className={styles.mid}>
                <PostCard />
                <Comments />
                {/* <PostCard /> */}
            </div>
            <div className={styles.right}>
                <RightCard />
                <RightCard />
                <RightCard />
            </div>
        </>
    )
}