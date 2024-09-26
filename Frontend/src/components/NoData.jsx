export default function NoData({type}) {
    return (
        <>
            <div style={{width:'100%', display:'flex'}}>
                {type ? type : ''} Not Found...
            </div>
        </>
    )
}