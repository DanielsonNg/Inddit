import { Avatar, Button, IconButton, Switch } from "@mui/material";
import { useState } from "react";
import { purple } from "../utils";
import addIcon from '../assets/t.png'
import axios from "../axios";
import { useNavigate } from "react-router-dom";

export default function GeneralSetting({ community }) {
    console.log(community)

    const [previewLogo, setPreviewLogo] = useState('')
    const [previewBanner, setPreviewBanner] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [editPostApproval, setEditPostApproval] = useState(false)
    const [editJoinApproval, setEditJoinApproval] = useState(false)
    const [logo, setLogo] = useState('')
    const [banner, setBanner] = useState('')
    const [edit, setEdit] = useState(false)

    const navigate = useNavigate()

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
        setEditPostApproval(community.post_approval)
        setEditJoinApproval(community.join_approval)
    }

    function handleDeleteCommunity(){
        axios.delete(`/community/${community._id}`)
        .then(({data})=>{
            navigate('/')
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
                <p>{community.description}</p>
            </div>
            <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
                {edit ? <>
                    {/* logo */}
                    <div>
                        <h3>Logo</h3>
                        <label htmlFor="logo">
                            <IconButton component="span">
                                <Avatar
                                    src={previewLogo ? previewLogo : addIcon}
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
                                    src={previewBanner ? previewBanner : addIcon}
                                    style={{
                                        // margin: "10px",
                                        width: previewBanner ? "400px" : "200px",
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
                            <img src={community.logo} style={{ width: '200px', height: '200px' }}></img>
                        </div>
                        <div>
                            <h3>Banner</h3>
                            <img src={community.banner} style={{ width: '400px', height: '200px' }}></img>
                        </div>
                    </>}
            </div>
            <div style={{ display: 'flex', gap: '50px', width: '100%' }}>
                <div style={{ width: '200px', height: '200px' }}>
                    <h3>Join Approval</h3>
                    <Switch disabled={edit ? false : true} checked={edit ? editJoinApproval : community.join_approval} onChange={() => handleJoinApproval()} />
                </div>
                <div style={{ width: '200px', height: '200px' }}>
                    <h3>Post Approval</h3>
                    <Switch disabled={edit ? false : true} checked={edit ? editPostApproval : community.post_approval} onChange={() => handlePostApproval()} />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '50%' }}>

                {!edit ? <Button onClick={() => setEdit(true)} variant="contained" style={{ backgroundColor: purple, width: '100px' }}>Edit</Button>
                    :
                    <>
                        <Button variant="contained" style={{ backgroundColor: purple, width: '150px' }} onClick={(e) => handleEdit(e)}>Cancel</Button>
                        <Button variant="contained" style={{ backgroundColor: purple, width: '150px' }}>Save Changes</Button>
                    </>
                }
            </div>

            <div style={{marginTop:'100px', display:'flex', justifyContent:'flex-end', width:'50%'}}>
                <Button variant="contained" color="error" onClick={()=>handleDeleteCommunity()}>Delete Community</Button>
            </div>
        </>
    )
}