import { useState } from "react";
import LeftCardManage from "./LeftCardManageCommunity";
import ProfileSetting from "./ProfileSetting";
import { useNavigate } from "react-router-dom";
import SavedPost from "./SavedPost";


export default function UserPage() {
    const [selectedSetting, setSelectedSetting] = useState(0)
    const navigate = useNavigate()
    
    async function handleSetting(value) {
        setSelectedSetting(prevValue => value)
    }

    return (
        <>
            <div style={{ display: 'flex', padding: '10px', gap: '2em', }}>
                {/* Left */}
                <div style={{ width: '15%', display: 'flex', flexDirection: 'column' }}>
                    <div onClick={() => handleSetting(0)} >
                        <LeftCardManage name="Profile" />
                    </div>
                    <div onClick={() => handleSetting(1)}>
                        <LeftCardManage name="Post" />
                    </div>
                    <div onClick={() => handleSetting(2)}>
                        <LeftCardManage name="Saved Post" />
                    </div>
                    <div onClick={() => handleSetting(3)}>
                        <LeftCardManage name="Liked Post" />
                    </div>
                    <div onClick={() => navigate(-1)}>
                        <LeftCardManage name="Back" onClick={() => navigate(-1)} />
                    </div>
                </div>

                {/* Right */}
                <div style={{ width: '72%', minHeight: '100vh', borderLeft: '1px solid rgb(97, 93, 93)', padding: '10px 50px 20px 50px', display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {/* General Setting */}
                    {selectedSetting === 0 && <ProfileSetting />}
                    {selectedSetting === 1 && <ProfileSetting />}
                    {selectedSetting === 2 && <SavedPost />}
                </div>

            </div>
        </>
    )
}