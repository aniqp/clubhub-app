import React from 'react';
import { Grid, Typography, Card  } from "@material-ui/core";
import { useParams } from 'react-router-dom';
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

const Announcements = ({clubID, admin, clubAnnouncements, clubTitle, getClubAnnouncements, filteredAnnouncements}) => {
    const classes = useStyles();
    console.log(clubAnnouncements);

    return(
        <Grid container style={{display:'flex', justifyContent:'space-around', paddingTop:'20px', marginLeft:'18px'}}>
            <Grid xs={8}>
                <Card style={{padding:'20px'}}>
                    <Typography style={{fontSize:'22pt', fontWeight:'300'}}>Recent Announcements</Typography>
                    {Object.values(filteredAnnouncements).map((announcement, index) => (
                        <AnnouncementPost 
                            id={announcement.id} 
                            name={clubTitle} 
                            title={announcement.title} 
                            body={announcement.body} 
                            timestamp={announcement.time_posted}
                            onSubmit={getClubAnnouncements}
                            adminStatus={admin}
                            visibility={announcement.visibility}
                            onDashboard = {false}
                            />
                    ))}
                </Card>
            </Grid>
            <Grid xs={3} style={{display:'flex', justifyContent:'center'}}>
                {admin && <AnnouncementForm clubID={clubID} onSubmit={getClubAnnouncements} />}
            </Grid>
                
            {clubAnnouncements.length == 0 && 
                <Grid container style={{display:'flex', justifyContent:'center', padding:'30px 0'}}>
                    <Typography variant={'h6'}><b>No Announcements</b></Typography>
                </Grid>
            }
        </Grid>
    )


}

export default Announcements;