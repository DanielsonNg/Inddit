import styles from "../css/post.module.css"
import Comment from "./Comment"

export default function Comments(){
    return(
        <>
        <h1>Comments</h1>
        <div className={styles.commentCard}>
           <Comment />
           <Comment />
        </div>
        </>
    )
}