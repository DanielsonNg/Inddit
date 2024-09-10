import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, tabScrollButtonClasses, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../layouts/RootLayout';
import addIcon from '../assets/t.png'
import axios from '../axios';
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

    const getCategories = async () => {
        const categories = await axios.get('/categories/get')
        setCategories(categories.data)
    }

    useEffect(() => {
        getCategories()
    }, [])

    const setFileToBaseLogo = (file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setLogo(reader.result);
        }

    }
    const setFileToBaseBanner= (file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setBanner(reader.result);
        }

    }

    function handleLogo(e) {
        const file = e.target.files[0]
        setFileToBaseLogo(file)
        setPreviewLogo(URL.createObjectURL(file))
    }

    function handleBanner(e) {
        const file = e.target.files[0]
        setFileToBaseBanner(file)
        setPreviewBanner(URL.createObjectURL(file))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const data = {
            name: name,
            description: description,
            logo: logo,
            banner: banner,
            category: selectedCategory,
        }
        const response = await axios.post('/community/create', data)
        console.log(response)
        
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
                    onChange={(e) => setName(e.target.value)}
                />
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
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    {/* logo */}
                    <div>
                        <h2>Logo</h2>
                        {previewLogo ? (
                            <img
                                src={previewLogo}
                                width={'150px'}
                                height={'100px'}
                            />
                        ) : ''}
                        {!previewLogo && <label htmlFor="logo">
                            <IconButton component="span">
                                <Avatar
                                    src={addIcon}
                                    style={{
                                        // margin: "10px",
                                        width: "100px",
                                        height: "100px",
                                        borderRadius: '0px'
                                    }}
                                />
                            </IconButton>
                        </label>}
                        <input
                            id="logo"
                            title="test"
                            type="file"
                            style={{ visibility: "hidden" }}
                            onChange={handleLogo}>
                        </input>
                    </div>
                    {/* Banner */}
                    <div>
                        <h2>Banner</h2>
                        {previewBanner ? (
                            <img
                                src={previewBanner}
                                width={'150px'}
                                height={'100px'}
                            />
                        ) : ''}
                        {!previewBanner && <label htmlFor="banner">
                            <IconButton component="span">
                                <Avatar
                                    src={addIcon}
                                    style={{
                                        // margin: "10px",
                                        width: "100px",
                                        height: "100px",
                                        borderRadius: '0px'
                                    }}
                                />
                            </IconButton>
                        </label>}
                        <input
                            id="banner"
                            title="test"
                            type="file"
                            style={{ visibility: "hidden" }}
                            onChange={handleBanner}>
                        </input>
                    </div>
                </div>
                <h2>Category</h2>
                {/* <SelectInput>Select Community</SelectInput> */}
                <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory} style={{ width: '150px', height: '50px', backgroundColor: 'black', borderColor: 'black', borderRadius: '10px' }}>
                    <option value={null}>Select Category</option>
                    {categories ? categories.map((c) => (
                        <option value={c.name} key={c.name}>{c.name}</option>
                    )) :
                        (<option>Category is Empty</option>)
                    }
                </select>

            </DialogContent>
            <DialogActions>
                <Button sx={{ color: 'white' }} onClick={() => setOpen(false)}>Cancel</Button>
                <Button sx={{ color: 'white' }} onClick={handleSubmit}>Create Community</Button>
            </DialogActions>
        </Dialog>
    )
}