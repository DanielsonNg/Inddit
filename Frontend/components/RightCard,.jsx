import styles from '../src/landingpage.module.css'
import s from '../assets/s.jpg'

export default function RightCard() {
    return (
        <div className={styles.rightcard} >
            <img src={s} style={{ width: '30px', height: '30px', borderRadius: '50%' }}></img>&#160;&#160;
            <p style={{ fontWeight: 'lighter' }}>i/Memes</p>
        </div>
    )
}