
import styles from '../css/rootlayout.module.css'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import CodeIcon from '@mui/icons-material/Code';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar'
import LeftCard from '../components/LeftCard';
import { useAuth } from '../../context/AuthProvider';
import AddIcon from '@mui/icons-material/Add';
import { createContext, useEffect, useState } from 'react';
import CreateCommunityDialog from '../components/CreateCommunityDialog';
import { Button } from '@mui/material';
import axios from "../axios"
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useDebounce } from '../../hooks/useDebounce';

export const Context = createContext()

export default function RootLayout() {
    const { logout, token } = useAuth()
    const [open, setOpen] = useState('')
    const [category, setCategory] = useState('')

    const navigate = useNavigate()
    const handleCategory = (category) => {
        navigate('/')
        setCategory(category)
    }

    const [search, setSearch] = useState('')
    const searchDebounce = useDebounce(search)


    return (
        <>
            <Context.Provider value={{ open, setOpen }} >
                {open && (
                    <CreateCommunityDialog />
                )}
                <div className={styles.container}>
                    <NavBar setSearch={setSearch} search={search} />
                    <div className={styles.content}>

                        <div className={styles.left}>
                            <div onClick={() => handleCategory('Gaming')}>
                                <LeftCard name="Gaming" icon={<SportsEsportsIcon />} />
                            </div>
                            <div onClick={() => handleCategory('Programming')}>
                                <LeftCard name="Programming" icon={<CodeIcon />} />
                            </div>
                            <div onClick={() => handleCategory('Music')}>
                                <LeftCard name="Music" icon={<AudiotrackIcon />} />
                            </div>
                            <div onClick={() => handleCategory('Travel')}>
                                <LeftCard name="Travel" icon={<LocalAirportIcon />} />
                            </div>
                            <div onClick={() => handleCategory('Cook')}>
                                <LeftCard name="Cook" icon={<RestaurantIcon />} />
                            </div>
                            <hr></hr>
                            {token && <LeftCard name="Create Community" icon={<AddIcon />} />}
                        </div>
                        <div className={styles.rightSide}>
                            <Outlet context={[category, setCategory, searchDebounce]} />
                        </div>
                    </div>
                </div>
            </Context.Provider>
        </>
    )
}