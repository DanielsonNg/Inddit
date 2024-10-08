import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Switch, tabScrollButtonClasses, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../layouts/RootLayout';
import addIcon from '../assets/t.png'
import axios from '../axios';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
// import { uploadImage } from '../../cloudinary';


export default function CreateCommunityDialog() {
    const { open, setOpen } = useContext(Context)
    const [previewBanner, setPreviewBanner] = useState('')
    const [previewLogo, setPreviewLogo] = useState('')
    const [banner, setBanner] = useState('')
    const [bannerUrl, setBannerUrl] = useState('')
    const [logo, setLogo] = useState('')
    const [logoUrl, setLogoUrl] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [joinApproval, setJoinApproval] = useState(true)

    const [errorName, setErrorName] = useState('')
    const [errorDescription, setErrorDescription] = useState('')
    const [errorBanner, setErrorBanner] = useState('')
    const [errorLogo, setErrorLogo] = useState('')
    const [errorCategory, setErrorCategory] = useState('')

    const navigate = useNavigate()

    const { userData, token } = useAuth()

    const label = { inputProps: { 'aria-label': 'Join Need Approval' } };

    const getCategories = async () => {
        const categories = await axios.get('/categories/get')
        setCategories(categories.data)
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        getCategories()
    }, [])

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
        setErrorLogo('')
    }

    function handleBanner(e) {
        const file = e.target.files[0]
        setFileToBaseBanner(file)
        setPreviewBanner(URL.createObjectURL(file))
        setErrorBanner('')
    }

    function handleName(e) {
        setName(e.target.value)
        setErrorName('')
    }

    function handleDescription(e) {
        setDescription(e.target.value)
        setErrorDescription('')
    }

    function handleCategory(e) {
        setSelectedCategory(e.target.value)
        setErrorCategory('')
    }

    async function save() {
        const data = {
            name: name,
            description: description,
            logo: logo,
            banner: banner,
            category: selectedCategory,
            user_id: userData._id,
            token: token,
            join_approval: joinApproval
        }
        await axios.post('/community/create', data)
            .then(({ data }) => {
                setLoading(false)
                setOpen(false)
                navigate(`/inddit/${data.data._id}`)
                window.location.reload()
            })
            .catch((err) => {
                setErrorLogo('File too Large')
                setLoading(false)
            })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        if (!name) {
            setErrorName('Please fill out Community Name')
            setLoading(false)
        }
        if (!description) {
            setErrorDescription('Please fill out Community Description')
            setLoading(false)
        }
        if (!logo) {
            setErrorLogo('Please Upload Community Logo')
            setLoading(false)
        }
        if (!banner) {
            setErrorBanner("Please upload Community Banner")
            setLoading(false)
        }
        if (!selectedCategory) {
            setErrorCategory('Please select community Category')
            setLoading(false)
        }

        if (name && description && logo && banner && selectedCategory) {
            save()
        }
    }

    async function handleJoinApproval() {
        setJoinApproval(prevJoin => !prevJoin)
    }

    return (
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
            {loading && <Loading />}
            {!loading && <>
                <DialogContent>
                    <h1>
                        New Community
                    </h1>
                    <h2>Community Name</h2>
                    <textarea
                        type="text"
                        style={{
                            width: '100%',
                            fontSize: '16px',
                            borderRadius: '20px',
                            height: '25px',
                            resize: 'block',
                            padding: '5px',
                            borderColor: 'black',
                            fontWeight: 'lighter',
                            fontFamily: 'inherit',
                            color: 'inherit'
                        }}
                        value={name}
                        onChange={handleName}
                    />
                    {errorName && <p style={{ color: 'red' }}>{errorName}</p>}
                    <h2>Community Description</h2>
                    <textarea
                        type="text"
                        style={{
                            width: '100%',
                            fontSize: '16px',
                            borderRadius: '20px',
                            height: '125px',
                            resize: 'block',
                            padding: '5px',
                            borderColor: 'black',
                            fontWeight: 'lighter',
                            fontFamily: 'inherit',
                            color: 'inherit'
                        }}
                        value={description}
                        onChange={handleDescription}
                    />
                    {errorDescription && <p style={{ color: 'red' }}>{errorDescription}</p>}
                    <div style={{ display: 'flex', justifyContent: 'space-evenly'}}>
                        {/* logo */}
                        <div>
                            <h2>Logo</h2>
                            <label htmlFor="logo">
                                <IconButton component="span">
                                    <Avatar
                                        src={previewLogo ? previewLogo : addIcon}
                                        style={{
                                            // margin: "10px",
                                            width: "100px",
                                            height: "100px",
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
                            {errorLogo && <p style={{ color: 'red' }}>{errorLogo}</p>}
                        </div>
                        {/* Banner */}
                        <div>
                            <h2>Banner</h2>
                            <label htmlFor="banner">
                                <IconButton component="span">
                                    <Avatar
                                        src={previewBanner ? previewBanner : addIcon}
                                        style={{
                                            // margin: "10px",
                                            width: previewBanner ? "200px" : "100px",
                                            height: "100px",
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
                            {errorBanner && <p style={{ color: 'red' }}>{errorBanner}</p>}
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly'}}>
                        <div style={{width:'100%'}}>
                            <h2>Category</h2>
                            <select onChange={handleCategory} value={selectedCategory} style={{ width: '150px', height: '50px', backgroundColor: 'black', borderColor: 'black', borderRadius: '10px' }}>
                                <option value={null}>Select Category</option>
                                {categories ? categories.map((c) => (
                                    <option value={c.name} key={c.name}>{c.name}</option>
                                )) :
                                    (<option>Category is Empty</option>)
                                }
                            </select>
                            {errorCategory && <p style={{ color: 'red' }}>{errorCategory}</p>}
                        </div>
                        <div style={{width:'100%'}}>
                            <h2>Join Approval</h2>
                            <Switch value={joinApproval} onChange={() => handleJoinApproval()} />
                        </div>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: 'white' }} onClick={() => setOpen(false)}>Cancel</Button>
                    <Button sx={{ color: 'white' }} onClick={handleSubmit}>Create Community</Button>
                </DialogActions>
            </>}
        </Dialog>
    )
}