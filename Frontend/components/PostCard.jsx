import styles from '../src/landingpage.module.css'
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import s from '../assets/s.jpg'

export default function PostCard() {
    return (
        <div className={styles.cardmid}>
            <div style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'row' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={s} style={{ width: '30px', height: '30px', borderRadius: '50%' }}></img>&#160;
                    <p>i/Programming</p>  &#160;&#160;
                    &#160;
                    <p style={{ fontWeight: 'lighter', fontSize: '14px', textAlign: 'center' }}> 20 Hours Ago</p>
                </div>
                <div>
                    Join Now
                </div>
            </div>
            <div className=''>
                <h2>React Framework</h2>
            </div>
            <div style={{ fontWeight: 'lighter' }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '50px', marginTop: '20px' }}>
                <div style={{ alignItems: 'center', borderRadius: '10px', display: 'flex' }}>
                    <ArrowCircleUpTwoToneIcon />&#160;&#160;
                    <p>51k</p>&#160;&#160;
                    <ArrowCircleDownTwoToneIcon />
                </div>
                <div style={{ alignItems: 'center', borderRadius: '10px', display: 'flex' }}>
                    <InsertCommentIcon />&#160;
                    71k
                </div>
            </div>
        </div>
    )
}