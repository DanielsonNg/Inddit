import { useContext, useState } from 'react'
import styles from '../css/rootlayout.module.css'
import { Context } from '../layouts/RootLayout'


export default function LeftCard(props) {
    const [setOpen] = useContext(Context)

    return (
        <>
            {props.name !== "Create Community" ?
                <div className={styles.leftcard}>
                    {props.icon}&#160;&#160;&#160;{props.name}
                </div>
                :
                // Community creation
                <div className={styles.leftcard} onClick={()=>setOpen(true)}>
                    {props.icon}&#160;&#160;&#160;{props.name}
                </div>
            }

        </>
    )
}