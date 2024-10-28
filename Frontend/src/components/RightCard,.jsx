import styles from '../css/landingpage.module.css'
import s from '../../assets/s.jpg'

export default function RightCard({name, logo}) {
    return (
        <div className={styles.rightcard} >
            <img src={logo} style={{ width: '30px', height: '30px', borderRadius: '50%' }} loading='lazy'></img>&#160;&#160;
            <p style={{ fontWeight: 'lighter' }}>i/{name}</p>
        </div>
    )
}