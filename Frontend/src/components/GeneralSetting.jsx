import { Avatar, Button, IconButton, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { purple } from "../utils";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export default function GeneralSetting({ community }) {
    const [previewLogo, setPreviewLogo] = useState('')
    const [previewBanner, setPreviewBanner] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [editPostApproval, setEditPostApproval] = useState(false)
    const [editJoinApproval, setEditJoinApproval] = useState(false)
    const [logo, setLogo] = useState('')
    const [banner, setBanner] = useState('')
    const [edit, setEdit] = useState(false)

    const {logout} = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        setEditDescription(community.description)
    }, [community])


    const setFileToBaseLogo = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setLogo(reader.result);
        }

    }
    const setFileToBaseBanner = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setBanner(reader.result);
        }

    }

    function handleLogo(e) {
        const file = e.target.files[0]
        setFileToBaseLogo(file)
        setPreviewLogo(URL.createObjectURL(file))
        // setErrorLogo('')
    }

    function handleBanner(e) {
        const file = e.target.files[0]
        setFileToBaseBanner(file)
        setPreviewBanner(URL.createObjectURL(file))
        // setErrorBanner('')
    }

    function handleEdit(e) {
        setEdit(true)
        if (community.post_approval === 1) {
            setEditPostApproval(true)
        }
        if (community.join_approval === 1) {
            setEditJoinApproval(true)
        }
    }

    function handleCancel() {
        setEdit(false)
    }

    function handleDeleteCommunity() {
        axios.delete(`/community/${community._id}`)
            .then(({ data }) => {
                navigate('/')
            })
    }

    function handleJoinApproval(e) {
        setEditJoinApproval(prevJoin => !prevJoin)

    }

    function handlePostApproval(e) {
        setEditPostApproval(prevPost => !prevPost)
    }

    function handleSubmit() {
        const data = {
            join_approval: editJoinApproval,
            post_approval: editPostApproval,
            description: editDescription,
            logo: logo ? logo : null,
            banner: banner ? banner : null
        }

        axios.put(`/community/${community._id}`, data)
            .then(({ data }) => {
                navigate(`/inddit/${community._id}`)
            })
    }

    return (
        <>
            <h2>General Setting</h2>
            <div>
                {/* <h3>Community Name</h3> */}
                <h2>I/{community.name}</h2>
            </div>
            <div>
                <h3>Description</h3>
                {edit ?
                    <form>
                        <textarea type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)}
                            style={{
                                width: '100%',
                                fontSize: '16px',
                                borderRadius: '5px',
                                height: '25px',
                                resize: 'block',
                                padding: '5px',
                                borderColor: 'black',
                                fontWeight: 'lighter',
                                fontFamily: 'inherit',
                                color: 'inherit'
                            }}>
                            {editDescription}
                        </textarea>
                    </form>
                    :
                    <p>{community.description}</p>
                }
            </div>
            <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
                {edit ? <>
                    {/* logo */}
                    <div>
                        <h3>Logo</h3>
                        <label htmlFor="logo">
                            <IconButton component="span">
                                <Avatar
                                    src={previewLogo ? previewLogo : community.logo}
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
                            onChange={handleLogo}>
                        </input>
                    </div>
                    {/* Banner */}
                    <div style={{ marginLeft: '-270px' }}>
                        <h3>Banner</h3>
                        <label htmlFor="banner">
                            <IconButton component="span">
                                <Avatar
                                    src={previewBanner ? previewBanner : community.banner}
                                    style={{
                                        width: "400px",
                                        height: "200px",
                                        borderRadius: '0px'
                                    }}
                                />
                            </IconButton>
                        </label>
                        <input
                            id="banner"
                            title="test"
                            type="file"
                            style={{ visibility: "hidden" }}
                            onChange={handleBanner}>
                        </input>
                    </div>
                </> :
                    <>
                        <div>
                            <h3>Logo</h3>
                            <img src={community.logo} style={{ width: '200px', height: '200px', padding: '5px' }}></img>
                        </div>
                        <div>
                            <h3>Banner</h3>
                            <img src={community.banner} style={{ width: '400px', height: '200px', padding: '5px' }}></img>
                        </div>
                    </>}
            </div>
            <div style={{ display: 'flex', gap: '50px', width: '100%' }}>
                <div style={{ width: '200px', height: '200px' }}>
                    <h3>Join Approval</h3>
                    {edit ?
                        <Switch checked={editJoinApproval} onChange={(e) => handleJoinApproval(e)} />
                        :
                        <Switch disabled checked={community.join_approval === 1 ? true : false} />
                    }
                </div>
                <div style={{ width: '200px', height: '200px' }}>
                    <h3>Post Approval</h3>
                    {edit ?
                        <Switch checked={editPostApproval} onChange={(e) => handlePostApproval(e)} />
                        :
                        <Switch disabled checked={community.post_approval === 1 ? true : false} />
                    }

                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '50%', gap: '30px' }}>

                {!edit ? <Button onClick={(e) => handleEdit(e)} variant="contained" style={{ backgroundColor: purple, width: '100px' }}>Edit</Button>
                    :
                    <>
                        <Button variant="contained" style={{ backgroundColor: purple, width: '100px' }} onClick={(e) => handleCancel(e)}>Cancel</Button>
                        <Button variant="contained" style={{ backgroundColor: purple, width: '150px' }} onClick={() => handleSubmit()}>Save Changes</Button>
                    </>
                }
            </div>

            <div style={{ marginTop: '100px', display: 'flex', justifyContent: 'flex-end', width: '50%' }}>
                <Button variant="contained" color="error" onClick={() => handleDeleteCommunity()}>Delete Community</Button>
            </div>
        </>
    )
}