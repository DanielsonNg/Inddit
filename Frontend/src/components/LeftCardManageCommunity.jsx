import styles from '../css/rootlayout.module.css'
export default function LeftCardManage(props) {

    return (
        <>
            <div className={styles.leftcard}>
                {props.icon}&#160;&#160;&#160;{props.name}
            </div>
        </>
    )
}