import styles from "../src/css/common.module.css"

export default function Loading(){
    return(
        <div style={{display:'flex', justifyContent:'center', height:'500px', alignItems:'center', alignContent:'center'}}>
            <div className={styles.loader} />
        </div>
    )
}