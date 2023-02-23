import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useParams } from 'react-router-dom';
import SideBar from './Sidebar';
import AnnouncementPost from './AnnouncementPost';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { createMuiTheme } from '@material-ui/core';
import AnnouncementForm from '../AnnouncementForm.js';


const theme = createMuiTheme({
    typography: {
        button:{
            textTransform:'none'
        }
    }
})

const classes = {
    root:{
        margin:'20px 10px 0 10px',
    },
    
}

const serverURL = ""; 

const ClubMain = () => {
    const { clubID } = useParams();
    const [clubTitle, setClubTitle] = React.useState();
    const [clubAnnouncements, setClubAnnouncements] = React.useState([]);

    const [toggle, setToggle] = React.useState("1");
    
    const handleToggle = (event, newToggle) => {
        if (newToggle !== null) {
            setToggle(newToggle);
        }
    };

    console.log(toggle);
    React.useEffect(() => {
        getClubAnnouncements();
        getClubTitle();
    }, []);

    const getClubTitle = () => {
        callApiGetClubs()
            .then(res => {
                console.log("callApiGetClubs returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("callApiGetClubs: ", parsed);
                setClubTitle(parsed[0].name)
            })
    }

    const callApiGetClubs = async () => {
        const url = serverURL + '/api/getClubs';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                clubID: clubID
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Searched club: ", body);
        return body;
    }

    const getClubAnnouncements = () => {
    
        callApiGetClubAnnouncements()
            .then(res => {
                var parsed = JSON.parse(res.express);
                setClubAnnouncements(parsed);
            })
    }

    const callApiGetClubAnnouncements = async () => {
        const url = serverURL + '/api/getClubAnnouncements';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                clubID: clubID
            })
        });

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    return (
        <div style={classes.root}>
            <Grid
            container
            spacing={5}
            >
                <Grid item xs={12} style={{background:'white', padding:'50px', borderBottom:'1px black solid'}}>
                    <Typography variant="div" component="h1">{clubTitle}</Typography>
                </Grid>
                <Grid item xs={8} style={{paddingTop:0}}>
                    {toggle === '1' && <>
                        {(clubAnnouncements.length > 0) ? (<>
                            {Object.values(clubAnnouncements).map((announcement, index) => (
                                <AnnouncementPost title={announcement.title} body={announcement.body}/>
                        ))}
                        </> ) : (<Typography variant={'h6'}><b>No Announcements</b></Typography>)
                    }</>}
                    {toggle === '4' &&
                        <Typography>
                            Members
                        </Typography>
                    } 
                </Grid>
                <Grid item xs={4} style={{padding:'0px'}}>
                    <SideBar value={toggle} handleToggle={handleToggle} />
                    {toggle === '1' && <AnnouncementForm />}
                </Grid>
            </Grid>
        </div>
    )
}

export default ClubMain;

// {(clubAnnouncements.length > 0) ? (<>
//     {Object.values(clubAnnouncements).map((announcement, index) => (
//         <>
//             <AnnouncementPost />
            
//             Hello

//         </>
//     ))}
//     </> ) : (<Typography variant={'h6'}><b>No Announcements</b></Typography>)
// } 