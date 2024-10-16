import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { Tabs } from "@mui/material";
import PropTypes from 'prop-types';
import MembersToApprove from './MembersToApprove';
import { useEffect, useState } from 'react';
import axios from "../axios";
import Members from './Members';
import PostsToApprove from './PostsToApprove';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function MembersPage({ community, permission }) {
    const [members, setMembers] = useState('')
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        (async () => {
            await axios.get(`/community/membersToApprove/${community._id}`)
                .then(({ data }) => {
                    setMembers(data)
                })
        })()
    }, [])


    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', color: 'white' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="inherit" indicatorColor="secondary">
                        <Tab label="Members" {...a11yProps(0)} />
                        <Tab label="Requests" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Members id={community._id} permission={permission} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <MembersToApprove id={community._id} permission={permission} />
                </CustomTabPanel>
            </Box>


        </>
    )
}