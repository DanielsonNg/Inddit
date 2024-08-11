import { useEffect } from "react"
import { useParams } from "react-router-dom"
import PostCard from "./PostCard"
import RightCard from "./RightCard,"
import styles from "../css/landingpage.module.css"
import Comments from "./Comments"
import imageTest from '../assets/Night.jpg'
import HotPost from "./HotPost"

export default function Post() {
    let { id } = useParams()

    useEffect(() => {

    }, [])

    return (
        <>
            <div className={styles.mid}>
                <PostCard placement="post" />
                <Comments />
                {/* <PostCard /> */}
            </div>
            <div className={styles.right}>
                <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                    <img src={imageTest} style={{ width: '30px', height: '30px', borderRadius: '50%' }}></img>&#160;
                    I/Memes
                </div>
                <div style={{ marginTop: '10px' }}>
                    Meme Community
                </div>
                <div style={{ fontWeight: 'lighter' }}>
                    This description describe a description of a inddit good.
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '10px ' }}>
                    25k Members
                </div>
                <div style={{ fontWeight: 'bold', marginTop: '10px' }}>
                    Hot Posts
                </div>
                <HotPost />
                <HotPost />
                <HotPost />
                <HotPost />
            </div>
        </>
    )
}