import { createContext, useContext, useState } from "react";


export const PostContext = createContext({})

export const PostProvider = ({ children }) => {
    const [permission, setPermission] = useState(null)

    return(
        <PostContext.Provider value={{permission, setPermission}}>
            {children}
        </PostContext.Provider>
    )
}

export const usePost = () => useContext(PostContext)