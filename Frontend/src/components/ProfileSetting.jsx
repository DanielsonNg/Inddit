import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthProvider"
import axios from "../axios"
import { Button } from "@mui/material"
import { purple } from "@mui/material/colors"
import ChangePasswordDialog from "./ChangePasswordDialog"
import ChangePictureDialog from "./ChangePictureDialog"
import { useNavigate } from "react-router-dom"

export default function ProfileSetting() {
    const { userData, logout } = useAuth()
    const [edit, setEdit] = useState(false)
    const [picture, setPicture] = useState(userData?.image)
    const [email, setEmail] = useState('')
    const [dialogChangePassword, setDialogChangePassword] = useState(false)
    const [dialogChangePicture, setDialogChangePicture] = useState(false)

    const navigate = useNavigate()

    const setFileToBasePicture = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPicture(reader.result);
        }

    }

    function handlePicture(e) {
        const file = e.target.files[0]
        setFileToBasePicture(file)
        setPicture(URL.createObjectURL(file))
        // setErrorLogo('')
    }

    useEffect(() => {
        (async () => {
            if (userData) {
                await axios.get(`/user/email/${userData?._id}`)
                    .then(({ data }) => {
                        // console.log(data)
                        setEmail(data.email)
                    })
            }
        })()
    }, [userData])

    const handleLogout = () => {
        logout()
        navigate('/')
    }


    return (
        <>
            {dialogChangePassword && <ChangePasswordDialog open={dialogChangePassword} setOpen={setDialogChangePassword} email={email} />}
            {dialogChangePicture && <ChangePictureDialog open={dialogChangePicture} setOpen={setDialogChangePicture} email={email} picture={userData?.image} handlePicture={handlePicture} />}
            <div style={{ display: 'flex', padding: '30px', columnGap: '200px' }}>
                <div>
                    <div>
                        <h2 style={{ fontWeight: 'lighter' }}>u/{userData?.name}</h2>
                    </div>
                    <h2 style={{ fontWeight: 'lighter' }}>Email : {email}</h2>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {edit ? <>
                        {/* image */}
                        <div>
                            <h3 style={{ fontWeight: 'lighter' }}>Profile Picture</h3>
                            <label htmlFor="logo">
                                <IconButton component="span">
                                    <Avatar
                                        src={picture}
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
                                onChange={handlePicture}>
                            </input>
                        </div>
                    </> :
                        <>
                            <div>
                                <h3>Profile Picture</h3>
                                <img src={userData?.image} style={{ width: '200px', height: '200px' }}></img>
                            </div>
                        </>}
                </div>
            </div>
            <div style={{ display: 'flex', padding: '30px', columnGap: '200px' }}>
                <div style={{ display: 'flex' }}>
                    <Button variant="contained" style={{ backgroundColor: purple }} onClick={() => setDialogChangePassword(true)}>Change Password</Button>
                </div>
                <div style={{ display: 'flex' }}>
                    <Button variant="contained" style={{ backgroundColor: purple }} onClick={() => setDialogChangePicture(true)}>Change Profile Picture</Button>
                </div>
            </div>
            <div style={{ display: 'flex', padding: '30px', columnGap: '200px' }}>
                <Button variant="contained" color="error" onClick={() => handleLogout()}>Logout</Button>
            </div>
        </>
    )
}