import React from 'react';
import { Grid, Typography, AppBar, Toolbar,  } from "@material-ui/core";
import { useParams } from 'react-router-dom';
import SideBar from './Sidebar';
import AnnouncementPost from './AnnouncementPost';
import AnnouncementForm from './AnnouncementForm.js';
import { makeStyles } from "@material-ui/core/styles";
import { useUser } from '../Firebase';
import { serverURL } from '../../constants/config';
import ClubBoardHeader from './ClubBoardHeader';

const useStyles = makeStyles((theme) => ({
    // clubTitle:{
    //     fontWeight:'600',
    //     fontFamily: 'Arvo, serif',
    // },

}));

const Announcements = ({admin, clubAnnouncements, clubTitle, getClubAnnouncements}) => {
    const classes = useStyles();

    return(
        <>
        {(clubAnnouncements.length > 0) ? (<>
            {Object.values(clubAnnouncements).map((announcement, index) => (
                <li key={announcement.id} style={{listStyle:'none'}}>
                    <AnnouncementPost 
                        id={announcement.id} 
                        name={clubTitle} 
                        title={announcement.title} 
                        body={announcement.body} 
                        timestamp={announcement.time_posted}
                        onChange={getClubAnnouncements}
                        adminStatus={admin}/>
                </li>))}
            </> ) : (
            <Grid container style={{display:'flex', justifyContent:'center', padding:'30px 0'}}>
                <Typography variant={'h6'}><b>No Announcements</b></Typography>
            </Grid>
        )}
        </>
    )


}

export default Announcements;