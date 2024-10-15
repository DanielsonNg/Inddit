import { useEffect, useState } from "react"
import axios from "../axios"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { cardColor, darkRed, purple } from "../utils";

export default function MembersToApprove({ id }) {
    const [members, setMembers] = useState([])

    useEffect(() => {
        (async () => {
            await axios.get(`/community/membersToApprove/${id}`)
                .then(({ data }) => {
                    setMembers(data)
                })
        })()
    }, [])

    async function handleAccept(tracker_id, index) {
        await axios.put(`/community/member/accept/${tracker_id}`)
            .then(({ data }) => {
                const reduced = [...members]
                reduced.splice(index, 1)
                setMembers(reduced)
            })
    }

    async function handleReject(tracker_id, index) {
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
                            <TableCell sx={{ color: 'white' }} >Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {members ? members.map((member, index) => (
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
                                <TableCell>
                                    <div style={{ color: 'white', display: 'flex', gap: '20px' }}>
                                        <Button variant='contained' color='secondary' style={{ backgroundColor: purple }} onClick={() => handleAccept(member.tracker._id, index)}>Accept</Button>
                                        <Button variant='contained' color='secondary' style={{ backgroundColor: darkRed }} onClick={() => handleReject(member.tracker._id, index)}>Reject</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )) :
                            <TableCell sx={{ color: 'white' }} >No Data</TableCell>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}