import { useEffect } from "react"
import { useStateContext } from "../context/ContextProvider"

export default function NotFound(){
    const {user, token} = useStateContext()

    useEffect(() => {
      console.log(user,token)
    }, [])
    
    return(
        <h1>404 - Not Found</h1>
    )
}