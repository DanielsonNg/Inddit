import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useState } from "react";
import axios from "../axios";
import { useAuth } from "../../context/AuthProvider";



export default function ChangePictureDialog({ open, setOpen, email, picture, handlePicture }) {
    const [changePicture, setChangePicture] = useState('')
    const { setUserData, login, token } = useAuth()

    const setFileToBasePicture = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setChangePicture(reader.result);
        }

    }

    function handleDisplayPicture(e) {
        const file = e.target.files[0]
        setFileToBasePicture(file)
        setChangePicture(URL.createObjectURL(file))
        // setErrorLogo('')
    }

    async function handleChangePicture() {
        const data = {
            email: email,
            image: changePicture
        }
        await axios.post('/user/changePicture', data)
            .then(async ({ data }) => {
                setOpen(false)
                login(token, data.user)
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
                <DialogTitle>Change Profile Picture</DialogTitle>
                <DialogContent sx={{ display: 'flex' }}>
                    {/* image */}
                    <div>
                        <label htmlFor="logo">
                            <IconButton component="span">
                                <Avatar
                                    src={changePicture ? changePicture : picture}
                                    style={{
                                        width: "200px",
                                        height: "200px",
                                        borderRadius: '0px'
                                    }}
                                />
                            </IconButton>
                        </label>
                        <input
                            id="logo"
                            title="test"
                            type="file"
                            style={{ visibility: "hidden" }}
                            onChange={handleDisplayPicture}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="logo">
                            <IconButton component="span">
                                <Avatar
                                    src={changePicture ? changePicture : picture}
                                    style={{
                                        width: "200px",
                                        height: "200px",
                                        borderRadius: '50%'
                                    }}
                                />
                            </IconButton>
                        </label>
                        <input
                            id="logo"
                            title="test"
                            type="file"
                            style={{ visibility: "hidden" }}
                            onChange={handleDisplayPicture}>
                        </input>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                    <Button onClick={handleChangePicture}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}