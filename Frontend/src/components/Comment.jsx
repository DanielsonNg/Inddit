import imageTest from "../assets/Library.jpg"
export default function Comment() {
    return (
        <>
         <div style={{fontWeight:'lighter', display:'flex', flexDirection:'row', alignItems:'center'}}>
            <div>
                <img style={{width:'30px', height:'30px', borderRadius:'50%'}} src={imageTest}></img>
            </div>
            &#160; &#160;
            James Bond
         </div>
         <div>
         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
         </div>
         <div style={{display:'flex', justifyContent:'flex-end', width:'100%', marginTop:'10px'}}>
         <div style={{fontWeight:'bold'}}>Show Replies</div>
         </div>
        </>
    )
}