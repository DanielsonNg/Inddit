import { useEffect, useState } from "react"
import axios from "../axios"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ADMIN_ROLE, cardColor, darkRed, lightRed, OWNER_ROLE, purple } from "../utils";

export default function Members({ id, permission }) {
    const [members, setMembers] = useState([])
    useEffect(() => {
        (async () => {
            await axios.get(`/community/members/${id}`)
                .then(({ data }) => {
                    setMembers(data)
                })
        })()
    }, [])

    async function handlePromote(tracker_id, index) {
        await axios.put(`/community/member/promote/${tracker_id}`)
            .then(async ({ data }) => {
                let updated = [...members]
                updated[index].tracker.permission = data.permission
                updated[index].role = 'Admin'
                setMembers(updated)
            })
    }

    async function handleDemote(tracker_id, index) {
        await axios.put(`/community/member/demote/${tracker_id}`)
            .then(({ data }) => {
                let updated = [...members]
                updated[index].tracker.permission = data.permission
                updated[index].role = 'Member'
                setMembers(updated)
            })
    }
    async function handleKick(tracker_id, index) {
        await axios.put(`/community/member/kick/${tracker_id}`)
            .then(({ data }) => {
                const reduced = [...members]
                reduced.splice(index, 1)
                setMembers(reduced)
            })
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, backgroundColor: cardColor, color: 'white' }} >
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: 'white' }} >User</TableCell>
                            <TableCell sx={{ color: 'white' }} >Email</TableCell>
                            <TableCell sx={{ color: 'white' }} >Role</TableCell>
                            <TableCell sx={{ color: 'white' }} >Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {members.length > 0 ? members.map((member, index) => (
                            <TableRow
                                key={member.username}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ color: 'white' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>

                                        <img style={{ height: '50px', borderRadius: '50%' }} src={member.image}></img>
                                        &#160; &#160;
                                        {member.username}
                                    </div>
                                </TableCell>
                                <TableCell sx={{ color: 'white' }} >{member.email}</TableCell>
                                <TableCell sx={{ color: 'white' }} >{member.role}</TableCell>
                                {member.role !== 3 &&
                                    <TableCell sx={{ color: 'white' }} >
                                        <div style={{ display: 'flex', gap: '20px' }}>
                                            {permission === OWNER_ROLE ?
                                                // Owner Permit
                                                member.role === 'Member' ?
                                                    // Action to Member
                                                    <>
                                                        <Button variant="contained" style={{ backgroundColor: purple }} onClick={() => handlePromote(member.tracker._id, index)}>
                                                            Promote
                                                        </Button>
                                                        <Button variant="contained" style={{ backgroundColor: darkRed }} onClick={() => handleKick(member.tracker._id, index)}>
                                                            Kick
                                                        </Button>
                                                    </>
                                                    :
                                                    // Action to Admin
                                                    member.role === 'Admin' ?
                                                        <>
                                                            <Button variant="contained" style={{ backgroundColor: lightRed }} onClick={() => handleDemote(member.tracker._id, index)}>
                                                                Demote
                                                            </Button>
                                                            <Button variant="contained" style={{ backgroundColor: darkRed }} onClick={() => handlePromote(member.tracker._id, index)}>
                                                                Kick
                                                            </Button>
                                                        </> : '' : ''
                                            }
                                            {permission === ADMIN_ROLE &&
                                                member.role === 'Member' &&
                                                <Button variant="contained" style={{ backgroundColor: darkRed }} onClick={() => handleKick(member.tracker._id, index)}>
                                                    Kick
                                                </Button>
                                            }

                                        </div>
                                    </TableCell>}
                            </TableRow>
                        )) :
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={{ color: 'white' }} >No Data...</TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}