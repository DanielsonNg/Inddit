import { useEffect, useState } from "react"
import axios from "../axios"


export default function MembersToApprove({ community }) {
    const [members, setMembers] = useState('')

    useEffect(() => {
        (async () => {
            await axios.get(`/community/membersToApprove/${community._id}`)
                .then(({ data }) => {
                    setMembers(data)
                })
        })()
    }, [])
    return (
        <>
        </>
    )
}