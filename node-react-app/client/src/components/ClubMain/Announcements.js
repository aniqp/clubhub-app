import React, {useState} from 'react';
import { makeStyles, Grid, Typography } from "@material-ui/core";
import { useParams } from 'react-router-dom';
import ClubBoardHeader from './ClubBoardHeader';
import { serverURL } from '../../constants/config';
import AnnouncementForm from './AnnouncementForm';
import { useUser } from '../Firebase';
import "react-toastify/dist/ReactToastify.css";
import AnnouncementPost from './AnnouncementPost';
import img from '../../images/no-announcements.jpg'

const useStyles = makeStyles((theme) => ({
    root:{
        background:'#f5f5f5',
        minHeight:'100vh',
        paddingBottom:'50px',
    },
    img:{
        height:'400px'
    },
}));

const Announcements = () => {
    const classes = useStyles();
    const { clubID } = useParams();
    const user = useUser();
    const [admin, setAdmin] = React.useState(false);
    const [noAnnouncementMsg, setNoAnnouncementMsg] = React.useState('')
    const [clubAnnouncements, setClubAnnouncements] = React.useState([]);
    
    React.useEffect(() => {
        if (user) {
            let userID = user.uid;
            getUserRole(userID);
        } else {
            setAdmin(false);
        }
    }, [user]);

    React.useEffect(() => {
        getClubAnnouncements();
    }, []);

    const getUserRole = (userID) => {
        callApiGetUserRole(userID)
            .then(res => {
                var parsed = JSON.parse(res.express);
                if (parsed.length >= 1){
                    if (parsed[0].role === 'owner' || parsed[0].role === 'admin'){
                        setAdmin(true);
                    }
                } else {
                    setAdmin(false);
                }
            })
    }

    const callApiGetUserRole = async (userID) => {
        const url = serverURL + '/api/getCurrentUserRole';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                clubID: clubID,
                userID: userID,
            })
        });

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    // CLUB ANNOUNCEMENTS
    const getClubAnnouncements = () => {
        callApiGetClubAnnouncements()
            .then(res => {
                var parsed = JSON.parse(res.express);
                setClubAnnouncements(parsed);
                if (parsed.length == 0){
                    setNoAnnouncementMsg('NO ANNOUNCEMENTS YET')
                }
                if (parsed.length > 0) {
                    let x = parsed.find((announcement)=> announcement.visibility === 'public')
                    if (!x){
                        console.log('in')
                        setNoAnnouncementMsg('NO ANNOUNCEMENTS YET')
                    }
                }
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

    
    return(<>
        <ClubBoardHeader active={"1"}/>
            <Grid className={[classes.root]} sx={{height:'100%'}}>
                <Grid style={{display:'flex'}}>
                    {(clubAnnouncements.length > 0 && noAnnouncementMsg === '') ?
                    <Grid xs={8} style={{padding:'0 20px'}} >
                        {Object.values(clubAnnouncements).map((announcement, index) => <>
                            <AnnouncementPost onDashboard={false} admin={admin} announcement={announcement} onChange={getClubAnnouncements}/>
                        </>)}
                    </Grid>
                    :
                    <Grid style={{display:'flex', justifyContent:'center', paddingTop:'50px', width:'100%'}}>
                        {noAnnouncementMsg.length > 0 &&
                        <Grid style={{borderRadius:'5px', alignItems:'center', background:'#fff', display:'flex', flexDirection:'column', padding:'50px'}}>
                            <img src={img} className={classes.img} />
                            <Typography style={{letterSpacing:'1px',fontSize:'18pt', color:'grey'}}>{noAnnouncementMsg}</Typography>
                        </Grid>}
                    </Grid>
                    }
                    <Grid xs={4} style={{display:'flex', justifyContent:'center', marginTop:'25px'}}>
                        {admin && <AnnouncementForm clubID={clubID} onSubmit={getClubAnnouncements} />}
                    </Grid>
                </Grid>
        </Grid>
    </>)
}

export default Announcements;