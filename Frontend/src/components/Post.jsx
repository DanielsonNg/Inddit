import { useEffect } from "react"
import { useParams } from "react-router-dom"

export default function Post() {
    let {id} = useParams()

    useEffect(() => {
     
    }, [])
    
    return (
        <>
            <div>
                <h1>TEst</h1> <h1>TEst</h1> <h1>TEst</h1> <h1>TEst</h1> <h1>TEst</h1> <h1>TEst</h1>
            </div>
            <div>
            <h1>TEst</h1> <h1>TEst</h1> <h1>TEst</h1> <h1>TEst</h1> <h1>TEst</h1>
            </div>
        </>
    )
}