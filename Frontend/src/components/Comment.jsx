import imageTest from "../assets/Library.jpg"
import Reply from "./Reply"
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
export default function Comment() {
    return (
        <>
            <div style={{ fontWeight: 'lighter', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div>
                    <img style={{ width: '30px', height: '30px', borderRadius: '50%' }} src={imageTest}></img>
                </div>
                &#160; &#160;
                James Bond
                &#160;&#160;&#160;
                <p style={{ fontWeight: 'lighter', fontSize: '14px', textAlign: 'center' }}> 20 Hours Ago</p>
            </div>
            <div>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
            <div style={{ display: 'flex', fontWeight: 'lighter' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}><EmojiEmotionsIcon /> &#160;169k &#160; &#160;</div>
                <div>Reply</div>
            </div>
            <div style={{marginTop:'20px', display:'flex', width:'100%'}}>
                <formdata style={{width:'100%'}}>
                    <textarea type="text" style={{height:'200px',fontSize:'16px', borderRadius:'0px', width:'100%', resize:'none'}} />
                    <div style={{display:'flex', justifyContent:'right'}}>
                    <button style={{height:'30px', borderRadius:'5px'}}>Comment</button>
                    </div>
                </formdata>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: '10px' }}>
                <div style={{ fontWeight: 'bold' }}>Show Replies</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                <div style={{ width: '70%' }}>
                    <Reply comment='test123' />
                    <Reply comment='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.' />
                </div>
            </div>

        </>
    )
}