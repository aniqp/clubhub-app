import React from 'react';
import { makeStyles, IconButton, Grid, Typography, Card, Button, Menu, MenuItem, Collapse, CardContent, TextField } from "@material-ui/core";
import { useParams } from 'react-router-dom';
import ClubBoardHeader from './ClubBoardHeader';
import { serverURL } from '../../constants/config';
import Members from './Members';
import AnnouncementPost from './AnnouncementPost';
import AnnouncementForm from './AnnouncementForm';
import Events from './Events';
import search from '../../images/search-icon.png';
import comment from '../../images/comment.png';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import img1 from '../../images/announcement/img1.png';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors'
import { red } from '@material-ui/core/colors';



import { useUser } from '../Firebase';
import Announcements from './Announcements';


const useStyles = makeStyles((theme) => ({
    root:{
        background:'#f5f5f5',
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
    },avatar: {
        backgroundColor: red[500],
      },
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
    
    const testData = [
        { title:'What makes flyers unrivaled',
        body:'Rectangles are commonly used when drawing and are arguably one of the most used shapes in artwork and design. The Rectangle Tool makes it extremely quick and easy to draw rectangles and squares.Rectangles are commonly used when drawing and are arguably one of the most used shapes in artwork and design.',
        date:'March 28 2023',
        time:'8:38 PM',
        id:1,
        },
        {title:"WINTER 2023 VIDEO AUDITIONS EXTENSION",
        body:"The deadline for auditions for the AcaBella’s extended by 24 hours! Now is your chance to give your submission. We are getting ready for competing in the ICCA’s (International Championship of Collegiate A Cappella) at the end of January! We are looking for amazing human beings like you who are committed and excited to live out your Pitch Perfect dreams.",
        date:"March 30 2023",
        time:'2:40 PM',
        id:2,
        }
    ]

    const comments = [
        {name: "Larissa Troper",
        comment:'Good to know!',
        date:'March 29 2023'
        }
    ]

    // const temp1 = require('../../images/announcement/img1.png');
    // const temp2 = require('../../images/announcement/img2.png');
    const [expanded, setExpanded] = React.useState(null);


    const handleExpandClick = (clickedIndex) => {
        if (expanded === clickedIndex){
            setExpanded(null)
        } else {
            setExpanded(clickedIndex)
        }
    };

    return(<>
        <Grid className={classes.root} sx={{height:'100%'}}>
            <ClubBoardHeader clubID={clubID} clubTitle={clubTitle} toggle={toggle} handleToggle={handleToggle}/>
            {toggle === '1' && 
            <>
            <Grid style={{display:'flex'}}>
            <Grid xs={8} style={{padding:'0 20px'}}>
                {Object.values(testData).map((announcement, index) => <>
                <Card style={{maxHeight:'400px', margin:'25px 0 0', borderRadius:'0'}} >
                    <Grid style={{display:'flex'}}>
                        <Grid xs={8} style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                            <Grid style={{padding:'10px 20px 0', display:'flex', justifyContent:'end'}}>
                                <Grid style={{display:'flex', flexDirection:'column', alignItems:'end'}}>
                                    <Typography style={{color:'grey', fontSize:'11pt', letterSpacing:'0.5px'}}>{announcement.date}</Typography>
                                    <Typography style={{color:'grey', fontSize:'11pt', letterSpacing:'0.5px'}}>{announcement.time}</Typography>
                                </Grid>
                            </Grid>
                            <Grid style={{padding:'0 20px 20px'}}>
                                <Typography style={{color:'rgb(55,72,97)', fontSize:'14pt',margin:'-20px 0 10px 0', fontWeight:'600'}}>{announcement.title}</Typography>
                                <Typography style={{fontSize:'11pt'}}>{announcement.body}</Typography>
                            </Grid>
                            {admin &&
                            <Grid style={{background:'rgb(237,240,247)', display:'flex', justifyContent:'end', }}>
                                <LongMenu />
                            </Grid>}
                        </Grid>
                    {announcement.id === 1 &&
                        <Grid xs={4} style={{backgroundImage: `url(${img1})`,   
                        backgroundSize:'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition:'center'
                        }}></Grid>  }                           
                    {announcement.id === 2 &&
                        <Grid xs={4} style={{backgroundImage: `url(${img1})`,   
                        backgroundSize:'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition:'center'
                        }}></Grid> }
                    </Grid>
                </Card>
                </>)}
            </Grid>
            <Grid xs={4} style={{display:'flex', justifyContent:'center', marginTop:'25px'}}>
                 {admin && <AnnouncementForm clubID={clubID} onSubmit={getClubAnnouncements} />}
            </Grid>
            </Grid>
                

            </>}
            {toggle == '2' && <Events />}
            {toggle == '3' &&
                <Typography>
                    <Members name={clubTitle} members={members} />
                </Typography>}
            {toggle == '4' && <>Photos</>}
        </Grid>
    </>)

}

export default ClubBoard;





const ITEM_HEIGHT = 48;

const LongMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
          <MenuItem onClick={handleClose}>
            <EditIcon style={{marginRight:'5px'}} /> Edit Post
        </MenuItem>
        <MenuItem  onClick={handleClose}>
            <DeleteIcon style={{marginRight:'5px'}}/> Delete Post
            
        </MenuItem>
      </Menu>
    </div>
  );
}

                   // <Announcements 
            //     admin={admin} 
            //     clubAnnouncements={clubAnnouncements}
            //     filteredAnnouncements={filteredAnnouncements} 
            //     getClubAnnouncements={getClubAnnouncements}
            //     clubTitle={clubTitle}/>}  
            
            
            // <Grid container style={{display:'flex', justifyContent:'space-around', paddingTop:'20px'}}>
            //     <Grid container style={{display:'flex', justifyContent:'space-around'}}>
            //         <Grid xs={8}>
            //             <Card style={{padding:'20px'}}>
            //             <Typography style={{fontSize:'22pt', fontWeight:'300'}}>Upcoming Announcements</Typography>
            //                 {Object.values(filteredAnnouncements).map((announcement, index) => (
            //                     <li key={announcement.id} style={{listStyle:'none'}}>
            //                         <AnnouncementPost 
            //                             id={announcement.id} 
            //                             name={clubTitle} 
            //                             title={announcement.title} 
            //                             body={announcement.body} 
            //                             timestamp={announcement.time_posted}
            //                             onSubmit={getClubAnnouncements}
            //                             adminStatus={admin}
            //                             visibility={announcement.visibility}
            //                             onDashboard = {false}
            //                             />
            //                     </li>
            //                 ))}
            //             </Card>
            //         </Grid>
            //         </Grid>
                    {/* {clubAnnouncements.length > 0 &&
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
                    </Grid>} */}
                //     <Grid xs={4} style={{display:'flex', justifyContent:'center',}}>
                //         {admin && <AnnouncementForm clubID={clubID} onSubmit={getClubAnnouncements} />}
                //     </Grid>

                    
                //     {clubAnnouncements.length == 0 && 
                //         <Grid container style={{display:'flex', justifyContent:'center', padding:'30px 0'}}>
                //             <Typography variant={'h6'}><b>No Announcements</b></Typography>
                //         </Grid>
                //     }
                // </Grid>}
