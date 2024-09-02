import styles from "../css/post.module.css"
import Comment from "./Comment"

export default function Comments(){
    return(
        <>
        <h1>Comments</h1>
        <div className={styles.commentCard}>
           <Comment comment="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. " reply="test" level={0} replyrep="test"/>
           <Comment comment="Aku haus beri aku minum" />
           <Comment comment="Aku haus beri aku minum" />
           <Comment comment="Aku haus beri aku minum" />
        </div>
        </>
    )
}