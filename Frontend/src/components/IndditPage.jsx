import PostCard from '../components/PostCard'
import styles from '../css/landingpage.module.css'
import RightCard from '../components/RightCard,';
import loginImage from "../assets/Night.jpg"
import s from '../../assets/s.jpg'
import HotPost from './HotPost';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../axios';

export default function IndditPage() {
    const { id } = useParams()
    const [community, setCommunity] = useState({})
    useEffect(() => {
        (async () => {
            await axios.get(`/community/${id}`)
            .then((res)=>{
                console.log(res)
            })
        })()

    }, [])


    return (
        <>
            <div style={{ width: '100%' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
                    <img src={loginImage}
                        style={{ width: '90%', height: '140px', borderRadius: '20px' }}>
                    </img>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-55px', justifyContent: 'space-between', padding: '0px 100px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                        <div>
                            <img src={s} style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'black' }}></img>&#160;
                        </div>
                        <div style={{ marginTop: '40px' }}>
                            <h1>i/Programming</h1>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '30px', marginTop: '40px', alignItems: "center" }}>
                        <div>
                            <h3>Create Post</h3>
                        </div>
                    </div>
                </div>
                {/* Content */}
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
                    <div className={styles.mid}>
                        <PostCard placement='landingpage' />
                        <PostCard placement='landingpage' />
                        <PostCard placement='landingpage' />
                    </div>
                    <div className={styles.right}>
                        <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                            <img src={s} style={{ width: '30px', height: '30px', borderRadius: '50%' }}></img>&#160;
                            I/Memes
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            Meme Community
                        </div>
                        <div style={{ fontWeight: 'lighter' }}>
                            This description describe a description of a inddit good.
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '10px ' }}>
                            25k Members
                        </div>
                        <div style={{ fontWeight: 'bold', marginTop: '10px' }}>
                            Hot Posts
                        </div>
                        <HotPost />
                        <HotPost />
                        <HotPost />
                        <HotPost />
                    </div>
                </div>
            </div>
        </>
    )
}