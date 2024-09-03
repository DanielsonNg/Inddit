import styles from '../css/rootlayout.module.css'


export default function LeftCard(props) {
    console.log(props.name)
    return (
        <div className={styles.leftcard}>
            {props.icon}&#160;&#160;&#160;{props.name}
        </div>
    )
}