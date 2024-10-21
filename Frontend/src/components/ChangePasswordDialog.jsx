import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import axios from '../axios';

export default function ChangePasswordDialog({ open, setOpen, email }) {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
        setError('')
    }

    const handleSubmit = (e) => {
        // e.preventDefault()
        const data = {
            email: email,
            password: password
        }

        axios.post(`/user/changePassword/request`, data)
            .then(({ data }) => {
                console.log(data)
            })
            .catch((error) => {
                setError('Wrong Current Password')
            })
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    component: 'form',
                    style: {
                        backgroundColor: 'black',
                        color: 'white',
                        borderRadius: '20px',
                        width: '100%',
                        padding: '39px'
                    }
                }}
            >
                <DialogTitle>Change Password</DialogTitle>
                <DialogContent>
                    {/* <h1>
                        New Community
                    </h1> */}
                    <h2>Current Password</h2>
                    <textarea
                        type="text"
                        style={{
                            width: '100%',
                            fontSize: '16px',
                            borderRadius: '20px',
                            height: '25px',
                            resize: 'block',
                            padding: '5px',
                            borderColor: 'black',
                            fontWeight: 'lighter',
                            fontFamily: 'inherit',
                            color: 'inherit'
                        }}
                        value={password}
                        onChange={() => handleChangePassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}