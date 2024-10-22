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
    const [changeDialog, setChangeDialog] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [successChange, setSuccessChange] = useState('')
    const [errorConfirm, setErrorConfirm] = useState('')

    const handleClose = () => {
        setOpen(false);
        setError('')
        setErrorConfirm('')
    };
    const handleCloseNew = () => {
        setChangeDialog(false);
        setError('')
        setErrorConfirm('')
    };
    const handleCloseSuccess = () => {
        setSuccessChange(false);
        setOpen(false)
        setError('')
        setErrorConfirm('')
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
        setError('')
    }
    const handleChangeNewPassword = (e) => {
        setNewPassword(e.target.value)
        setErrorConfirm('')
        setError('')
    }
    const handleChangeConfirmNewPassword = (e) => {
        setConfirmNewPassword(e.target.value)
        setErrorConfirm('')
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
                setChangeDialog(data.isValid)
            })
            .catch((error) => {
                setError('Wrong Current Password')
            })
    }

    const handleSubmitNew = (e) => {
        if (newPassword !== confirmNewPassword) {
            setErrorConfirm('Confirm Password Doesn\'t match')
        } else {
            const data = {
                email: email,
                new_password: newPassword
            }

            axios.post('/user/changePassword', data)
                .then(({ data }) => {
                    setChangeDialog(false)
                    if (data.status === 'success') {
                        setSuccessChange(true)
                    }
                })
                .catch((error) => {
                    setErrorConfirm('New Password Need to be 8-12 Characters')
                })
        }
    }

    return (
        <>
            {successChange &&
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
                        <h2>Password Change Success</h2>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseSuccess}>Confirm</Button>
                    </DialogActions>
                </Dialog>}
            {changeDialog ?
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
                        <h2>New Password</h2>
                        <input
                            type="password"
                            style={{
                                width: '100%',
                                fontSize: '16px',
                                borderRadius: '10px',
                                height: '25px',
                                resize: 'block',
                                padding: '5px',
                                borderColor: 'black',
                                fontWeight: 'lighter',
                                fontFamily: 'inherit',
                                color: 'inherit'
                            }}
                            value={newPassword}
                            onChange={(e) => handleChangeNewPassword(e)}
                        />
                        <h2>Confirm New Password</h2>
                        <input
                            type="password"
                            style={{
                                width: '100%',
                                fontSize: '16px',
                                borderRadius: '10px',
                                height: '25px',
                                resize: 'block',
                                padding: '5px',
                                borderColor: 'black',
                                fontWeight: 'lighter',
                                fontFamily: 'inherit',
                                color: 'inherit'
                            }}
                            value={confirmNewPassword}
                            onChange={(e) => handleChangeConfirmNewPassword(e)}
                        />
                        {errorConfirm ? <p style={{color:'red'}}>{errorConfirm}</p> : ''}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseNew}>Cancel</Button>
                        <Button onClick={handleSubmitNew}>Submit</Button>
                    </DialogActions>
                </Dialog>
                :
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
                        <input
                            type="password"
                            style={{
                                width: '100%',
                                fontSize: '16px',
                                borderRadius: '10px',
                                height: '25px',
                                resize: 'block',
                                padding: '5px',
                                borderColor: 'black',
                                fontWeight: 'lighter',
                                fontFamily: 'inherit',
                                color: 'inherit'
                            }}
                            value={password}
                            onChange={(e) => handleChangePassword(e)}
                        />
                         {error ? <p style={{color:'red'}}>{error}</p> : ''}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                </Dialog>}
        </>
    )
}