
import LeftCardManage from "./LeftCardManageCommunity";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axios';
import GeneralSetting from './GeneralSetting';
import MembersPage from "./MembersPage";
export default function ManageCommunity() {
    const navigate = useNavigate()
    const [selectedSetting, setSelectedSetting] = useState(0)
    const { id } = useParams()
    const [community, setCommunity] = useState('')

    useEffect(() => {
        axios.get(`/community/${id}`)
            .then(({ data }) => {
                setCommunity(data)
            })
    }, [])

    async function handleSetting(value) {
        setSelectedSetting(prevValue => value)
    }

    const style = {
        backgroundColor: 'gray'
    }

    return (
        <>
            <div style={{ display: 'flex', padding: '10px', gap: '2em', }}>
                {/* Left */}
                <div style={{ width: '15%', display: 'flex', flexDirection: 'column' }}>
                    <div onClick={() => handleSetting(0)} >
                        <LeftCardManage name="General" />
                    </div>
                    <div onClick={() => handleSetting(1)}>
                        <LeftCardManage name="Members" />
                    </div>
                    <div onClick={() => navigate(-1)}>
                        <LeftCardManage name="Back" />
                    </div>
                </div>

                {/* Right */}
                <div style={{ width: '72%', minHeight: '100vh', borderLeft: '1px solid rgb(97, 93, 93)', padding: '10px 50px 20px 50px', display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {/* General Setting */}
                    {selectedSetting === 0 && <GeneralSetting community={community} />}
                    {/* Manage Members */}
                    {selectedSetting === 1 && <MembersPage community={community} />}
                </div>

            </div>
        </>
    )
}