import React from 'react';
import { makeStyles, Grid, Typography, TextField, InputAdornment } from "@material-ui/core";
import { useParams } from 'react-router-dom';
import ClubBoardHeader from './ClubBoardHeader';
import { serverURL } from '../../constants/config';
import Members from './Members';
import AnnouncementPost from './AnnouncementPost';
import AnnouncementForm from './AnnouncementForm';
import search from '../../images/search-icon.png';
import { useUser } from '../Firebase';


const useStyles = makeStyles((theme) => ({
    root:{
        background:'#e7ecef',
        minHeight:'100vh'
    },
    textField: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',            
        marginTop: 0,
        fontWeight: 500
    },
    input: {
        background: 'white'
    },
    search:{
        height:'20px'
    }
}));

const ClubBoard = () => {
    const classes = useStyles();
    // Initialize user and admin status
    const user = useUser();
    const [admin, setAdmin] = React.useState(false);

    const { clubID } = useParams();
    const [clubTitle, setClubTitle] = React.useState();
    const [toggle, setToggle] = React.useState("1");
    const [clubAnnouncements, setClubAnnouncements] = React.useState([]);
    const [members, setMembers] = React.useState([]);
    

    const [searchTerm, setSearchTerm] = React.useState('');
    
    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    }

    const filteredAnnouncements = clubAnnouncements.filter((announcement) =>
        announcement.body.toLowerCase().includes(searchTerm.toLowerCase())
    )

    React.useEffect(() => {
        if (user) {
            let userID = user.uid;
            console.log(userID)
            getUserRole(userID);
        } else {
            setAdmin(false);
        }
    }, [user]);

    React.useEffect(() => {
        getClubAnnouncements();
        getClubTitle();
        getClubMembers();
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
                console.log(parsed);
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

    const getClubTitle = () => {
        callApiGetClubs()
            .then(res => {
                var parsed = JSON.parse(res.express);
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
        return body;
    }

    const handleToggle = (event, newToggle) => {
        if (newToggle !== null) {
            setToggle(newToggle);
        }
    };

    // CLUB ANNOUNCEMENTS
    const getClubAnnouncements = () => {
        console.log('updating announcements');
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

    // CLUB MEMBERS
    const getClubMembers = () => {
        console.log('getting members');
        callApiGetClubMembers()
            .then(res => {
                var parsed = JSON.parse(res.express);
                setMembers(parsed);
            })
    }


    const callApiGetClubMembers = async () => {
        const url = serverURL + '/api/getClubMembers';
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
        <Grid className={classes.root} sx={{height:'100%'}}>
            <ClubBoardHeader clubTitle={clubTitle} toggle={toggle} handleToggle={handleToggle}/>
            {toggle === '1' && 
                <Grid container>
                    <Grid xs={8}>
                        {admin && <AnnouncementForm clubID={clubID} onSubmit={getClubAnnouncements} />}
                        {Object.values(filteredAnnouncements).map((announcement, index) => (
                            <li key={announcement.id} style={{listStyle:'none'}}>
                                <AnnouncementPost 
                                    id={announcement.id} 
                                    name={clubTitle} 
                                    title={announcement.title} 
                                    body={announcement.body} 
                                    timestamp={announcement.time_posted}
                                    onSubmit={getClubAnnouncements}
                                    adminStatus={admin}
                                    visibility={announcement.visibility}/>
                            </li>
                        ))}
                    </Grid>
                    {clubAnnouncements.length > 0 &&
                    <Grid xs={4} style={{padding:'25px 0 0 0'}}>
                        <TextField 
                            className={classes.textField} 
                            id="outlined-basic" 
                            label="Search for Announcement" 
                            variant="filled"
                            color="success"
                            value={searchTerm}
                            onChange={handleSearchTerm} 
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <img className={classes.search} src={search} />
                                </InputAdornment>),
                                className: classes.input}} />
                    </Grid>}
                    {clubAnnouncements.length == 0 && 
                        <Grid container style={{display:'flex', justifyContent:'center', padding:'30px 0'}}>
                            <Typography variant={'h6'}><b>No Announcements</b></Typography>
                        </Grid>
                    }
                </Grid>}
            {toggle == '2' && <>Temp</>}
            {toggle == '3' && <>Temp</>}
            {toggle === '4' && 
                <Typography>
                    <Members name={clubTitle} members={members} />
                </Typography>}
            {toggle == '5' && <>Temp</>}
        </Grid>
    </>)

}

export default ClubBoard;