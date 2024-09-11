
import styles from '../css/rootlayout.module.css'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import CodeIcon from '@mui/icons-material/Code';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Navbar'
import LeftCard from '../components/LeftCard';
import { useAuth } from '../../context/AuthProvider';
import AddIcon from '@mui/icons-material/Add';
import { createContext, useState } from 'react';
import CreateCommunityDialog from '../components/CreateCommunityDialog';
import { Button } from '@mui/material';
import axios from "../axios"

export const Context = createContext()

export default function RootLayout() {
    const { logout } = useAuth()
    const [open, setOpen] = useState('')

    const handleLogout = () => {
        logout()
    }

    function test() {
        let fd = new FormData()
        fd.append("category", "test")
        axios.post('/category/insert', fd);
    }

    return (
        <>
            {/* <Button onClick={test}>
                Test
            </Button> */}
            <Context.Provider value={{open, setOpen}} >
                {/* <button onClick={handleLogout}>
                Logout
            </button> */}
                {open && (
                    <CreateCommunityDialog />
                )}
                <div className={styles.container}>
                    <NavBar />
                    <div className={styles.content}>

                        <div className={styles.left}>
                            <LeftCard name="Gaming" icon={<SportsEsportsIcon />} />
                            <LeftCard name="Programming" icon={<CodeIcon />} />
                            <LeftCard name="Music" icon={<AudiotrackIcon />} />
                            <hr></hr>
                            <LeftCard name="Create Community" icon={<AddIcon />} />
                        </div>
                        <div className={styles.rightSide}>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </Context.Provider>
        </>
    )
}