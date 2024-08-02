import { useEffect } from "react"
import { useState } from "react"
import axios from "../src/axios"
import useRefresh from "../hooks/useRefresh"
import useAuth from "../hooks/useAuth"
import { useStateContext } from "../context/ContextProvider"

// export default function Users() {
//     const [users, setUsers] = useState()
//     const refresh = useRefresh()

//     useEffect(() => {
//         let isMounted = true
//         const controller = new AbortController() //cancel request

//         const getUsers = async () => {
//             try {
//                 const res = await axios.get('/users', {
//                     signal: controller.signal
//                 })
//                 console.log(res.data)
//                 isMounted && setUsers(res.data)
//             } catch (error) {
//                 console.error(error)
//             }
//         }

//         getUsers()
//         return () => {
//             isMounted = false
//             controller.abort()
//         }
//     }, [])

//     return (
//         <>
//             <div>
//                 <h1>Users List</h1>
//                 {users?.length ?
//                     (
//                         <ul>{users.map((user, i) => <li key={i}>{user?.username}</li>)}</ul>
//                     ) : (
//                         <h2>No users found</h2>
//                     )
                   
//                 }
//                 <button onClick={()=>refresh()}>Refresh</button>
//             </div>
//         </>
//     )
// }

export default function Users(){
    const {user} = useStateContext()

    useEffect(() => {
      console.log(user)
    }, [])
    
    return(
        <h1>Test</h1>
    )
}