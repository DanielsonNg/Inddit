import styles from '../css/landingpage.module.css'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import s from '../../assets/s.jpg'
import { Link } from 'react-router-dom';

export default function PostCard(props) {
    // const style={
    //     overflow:'hidden'
    // }

    // function showMore() {
    //     style.overflow = 'show'
    // }
    return (
        <>
            <div className={props.placement === 'landingpage' ? styles.cardmidLimited : styles.cardmid}>
                <div style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={s} style={{ width: '30px', height: '30px', borderRadius: '50%' }}></img>&#160;
                        <Link to={`/inddit/${props.post.community_id}`} style={{ color: 'white' }}>
                            <p style={{ fontWeight: 'lighter' }}>i/{props.post.community.name}</p>
                        </Link>
                        &#160;&#160;&#160;
                        <p style={{ fontWeight: 'lighter', fontSize: '14px', textAlign: 'center' }}> 20 Hours Ago</p>
                    </div>
                    <div style={{ fontWeight: 'lighter' }}>
                        Join Now
                    </div>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 'lighter' }}>
                    u/{props.post.author.username}
                </div>
                <Link style={{ cursor: 'pointer', color: 'white' }} to={`/post/${props.post._id}`}>
                    <div>
                        <h2>{props.post.title}</h2>
                    </div>
                    <div className={props.placement === 'landingpage' ? styles.text : ''} style={{ fontWeight: 'lighter' }}>
                        {props.post.description}
                    </div>
                    <div style={{ padding: '50px', display: 'flex', justifyContent: 'center', maxWidth: '100%' }}>
                        <img src={props.post.image} style={{maxWidth:'100%'}}></img>
                    </div>
                </Link>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '50px', marginTop: '20px' }}>
                    <div style={{ alignItems: 'center', borderRadius: '10px', display: 'flex' }}>
                        <EmojiEmotionsIcon />&#160;&#160;
                        <p>{props.post.likes}</p>&#160;&#160;
                    </div>
                    <div style={{ alignItems: 'center', borderRadius: '10px', display: 'flex' }}>
                        <InsertCommentIcon />&#160;
                        71k
                    </div>
                </div>
            </div>
            {/* <div style={{
                display: 'flex', justifyContent: 'center', width: '100%', backgroundColor: 'black', marginTop: "-40px",
                borderRadius: '0px 0px 50px 50px', fontSize: '18px', cursor: 'pointer'}} 
                onClick={showMore}>
                Show More
            </div> */}
        </>
    )
}