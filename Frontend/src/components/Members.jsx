import { useEffect, useState } from "react"
import axios from "../axios"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { cardColor } from "../utils";

export default function Members({ id }) {
    const [members, setMembers] = useState([])

    useEffect(() => {

        (async () => {
            await axios.get(`/community/members/${id}`)
                .then(({ data }) => {
                    setMembers(data)
                })
        })()

    }, [])

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
                        {members ? members.map((member) => (
                            <TableRow
                                key={member.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ color: 'white', display:'flex', alignItems:'center' }}>
                                    <img style={{ width: '30px', height: '30px', borderRadius: '50%' }} src={member.image}></img> 
                                    &#160; &#160; 
                                    {member.username}
                                </TableCell>
                                <TableCell sx={{ color: 'white' }} >{member.email}</TableCell>
                                <TableCell sx={{ color: 'white' }} >{member.role}</TableCell>
                                <TableCell sx={{ color: 'white' }} >Promote/Kick</TableCell>
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