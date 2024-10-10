import { Button, Switch } from "@mui/material";
import { useState } from "react";
import { purple } from "../utils";

export default function GeneralSetting({ community }) {
    const [previewLogo, setPreviewLogo] = useState('')
    const [previewBanner, setPreviewBanner] = useState('')
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
                <div>
                    <h3>Logo</h3>
                    <img src={community.logo} style={{ width: '200px', height: '200px' }}></img>
                </div>
                <div>
                    <h3>Banner</h3>
                    <img src={community.banner} style={{ width: '400px', height: '200px' }}></img>
                </div>
            </div>
            <div style={{ display: 'flex', gap: '50px', width: '100%' }}>
                <div style={{ width: '200px', height: '200px' }}>
                    <h3>Join Approval</h3>
                    <Switch /*checked={joinApproval} value={joinApproval} onChange={() => handleJoinApproval()}*/ />
                </div>
                <div style={{ width: '200px', height: '200px' }}>
                    <h3>Post Approval</h3>
                    <Switch /*checked={postApproval} value={postApproval} onChange={() => handlePostApproval()}*/ />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '50%' }}>

                {/* <Button variant="contained" style={{ backgroundColor: purple, width:'100px' }}>Edit</Button> */}
                <Button variant="contained" style={{ backgroundColor: purple, width:'150px' }}>Save Changes</Button>
            </div>
        </>
    )
}