import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useParams } from 'react-router-dom';
import SideBar from './Sidebar';
import AnnouncementPost from './AnnouncementPost';

const classes = {
    root:{
        textAlign: "center",
        margin:'20px 10px 0 10px'
    },
    
}

const serverURL = ""; 

const ClubMain = () => {
    const { clubID } = useParams();
    const [clubTitle, setClubTitle] = React.useState();
    const [clubAnnouncements, setClubAnnouncements] = React.useState([]);

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
        //console.log('in')

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        //console.log("Searched club: ", body);
        return body;
    }

    console.log('in');
    return (
        <div style={classes.root}>
            <Grid
            container
            spacing={5}
            >
                <Grid item xs={8}>
                    <Typography variant="div" component="h1">
                        {clubTitle} ANNOUNCEMENTS
                    </Typography>
                    {(clubAnnouncements.length > 0) ? (<>
                        {Object.values(clubAnnouncements).map((announcement, index) => (
                            <>
                                <AnnouncementPost title={announcement.title} body={announcement.body}/>
                            </>
                        ))}
                        </> ) : (<Typography variant={'h6'}><b>No Announcements</b></Typography>)
                    } 
                </Grid>
                <Grid item xs={4}>
                    <SideBar />
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