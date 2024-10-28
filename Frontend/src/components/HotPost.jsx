import EmojiEmotions from '@mui/icons-material/EmojiEmotions'
import styles from '../css/common.module.css'

export default function HotPost({author, image, likes, comments, content}) {
    return (
        <div style={{ marginTop: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={image} style={{ width: '20px', height: '20px', borderRadius: '50%' }}></img>&#160;
                u/{author}
            </div>
            <div className={styles.text} style={{ fontWeight: 'lighter', fontSize: '14px', marginTop: '5px' }}>
                {content}
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ alignItems: 'center', borderRadius: '10px', display: 'flex', fontSize: '14px' }}>
                    <p>{likes}</p>&#160; <EmojiEmotions /> &#160;&#160;&#160;
                </div>
                <div style={{ alignItems: 'center', borderRadius: '10px', display: 'flex', fontSize: '14px' }}>
                    <p>{comments}</p> &#160; Comments
                </div>
            </div>
        </div>
    )
}