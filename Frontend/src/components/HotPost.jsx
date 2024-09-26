import EmojiEmotions from '@mui/icons-material/EmojiEmotions'
import imageTest from '../assets/Night.jpg'

export default function HotPost() {
    return (
        <div style={{ marginTop: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={imageTest} style={{ width: '20px', height: '20px', borderRadius: '50%' }}></img>&#160;
                u/member123
            </div>
            <div style={{ fontWeight: 'lighter', fontSize: '14px', marginTop: '5px' }}>
                Smaller This description describe a description of a inddit good.
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ alignItems: 'center', borderRadius: '10px', display: 'flex', fontSize: '14px' }}>
                    <p>69k</p>&#160; <EmojiEmotions /> &#160;&#160;&#160;
                </div>
                <div style={{ alignItems: 'center', borderRadius: '10px', display: 'flex', fontSize: '14px' }}>
                    <p>42k</p> &#160; Comments
                </div>
            </div>
        </div>
    )
}