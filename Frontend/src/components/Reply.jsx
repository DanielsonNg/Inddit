import imageTest from "../assets/Library.jpg"
export default function Reply(props){
    // console.log(props)
    return(
        <>
        <div style={{fontWeight:'lighter', display:'flex', flexDirection:'row', alignItems:'center'}}>
            <div>
                <img style={{width:'30px', height:'30px', borderRadius:'50%'}} src={imageTest}></img>
            </div>
            &#160; &#160;
            James Bond
            &#160;&#160;&#160;
                <p style={{ fontWeight: 'lighter', fontSize: '14px', textAlign: 'center' }}> 20 Hours Ago</p>
         </div>
         <div>
         {props.comment}
         </div>
         <div style={{display:'flex', justifyContent:'flex-end', width:'100%', marginTop:'10px'}}>
         </div>
        </>
    )
}