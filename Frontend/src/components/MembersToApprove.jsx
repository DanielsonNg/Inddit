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

    async function handleAccept(tracker_id) {
        await axios.put(`/community/member/accept/${tracker_id}`)
            .then(({ data }) => {
                console.log(data)
            })
    }

    async function handleReject(tracker_id) {
        await axios.put(`/community/member/kick/${tracker_id}`)
            .then(({ data }) => {
                console.log(data)
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
                        {members ? members.map((member) => (
                            <TableRow
                                key={member.username}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                                    <img style={{ width: '30px', height: '30px', borderRadius: '50%' }} src={member.image}></img>
                                    &#160; &#160;
                                    {member.username}
                                </TableCell>
                                <TableCell sx={{ color: 'white' }} >{member.email}</TableCell>
                                <TableCell sx={{ color: 'white', display: 'flex', gap: '20px' }} >

                                    <Button variant='contained' color='secondary' style={{ backgroundColor: purple }} onClick={()=>handleAccept(member.tracker._id)}>Accept</Button>
                                    <Button variant='contained' color='secondary' style={{ backgroundColor: darkRed }} onClick={()=>handleReject(member.tracker._id)}>Reject</Button>
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