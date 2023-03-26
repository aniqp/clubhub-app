import React, {useState} from 'react';
import { makeStyles, IconButton, Grid, Typography,InputAdornment, Card, Button, Menu, MenuItem, Collapse, CardContent, TextField } from "@material-ui/core";
import { useParams } from 'react-router-dom';
import ClubBoardHeader from './ClubBoardHeader';
import Skeleton from '@material-ui/lab/Skeleton';
import { serverURL } from '../../constants/config';
import AnnouncementPost from './AnnouncementPost';
import AnnouncementForm from './AnnouncementForm';
import Events from './Events';
import search from '../../images/search-icon.png';
import comment from '../../images/comment.png';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { red } from '@material-ui/core/colors';
import img1 from '../../images/announcements/img1.png'
import img2 from '../../images/announcements/img2.png'
import img3 from '../../images/announcements/img3.png'
import img4 from '../../images/announcements/img4.png'
import img5 from '../../images/announcements/img5.png'
import img6 from '../../images/announcements/img6.png'
import img7 from '../../images/announcements/img7.png'
import img8 from '../../images/announcements/img8.png'
import img9 from '../../images/announcements/img9.png'
import img10 from '../../images/announcements/img10.png'
import img11 from '../../images/announcements/img11.png'
import img12 from '../../images/announcements/img12.png'
import { useUser } from '../Firebase';


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
    },
    avatar: {
        backgroundColor: red[500],
    },
    boxshadow:{
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
    }
}));

const ClubBoard = () => {
    const classes = useStyles();
    // Initialize user and admin status
    const user = useUser();
    const [admin, setAdmin] = React.useState(false);
    const [noAnnouncementMsg, setNoAnnouncementMsg] = React.useState('')

    const { clubID } = useParams();
    const [clubTitle, setClubTitle] = React.useState();
    // const [toggle, setToggle] = React.useState("2");
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
            // console.log(userID)
            getUserRole(userID);
        } else {
            setAdmin(false);
        }
    }, [user]);

    React.useEffect(() => {
        getClubAnnouncements();
        // getClubTitle();
        // getClubMembers();
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
                // console.log(parsed);
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

    // const getClubTitle = () => {
    //     callApiGetClubs()
    //         .then(res => {
    //             var parsed = JSON.parse(res.express);
    //             setClubTitle(parsed[0].name)
    //         })
    // }

    // const callApiGetClubs = async () => {
    //     const url = serverURL + '/api/getClubs';
    //     const response = await fetch(url, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             //authorization: `Bearer ${this.state.token}`
    //         },
    //         body: JSON.stringify({
    //             clubID: clubID
    //         })
    //     });
    //     const body = await response.json();
    //     if (response.status !== 200) throw Error(body.message);
    //     return body;
    // }

    // const handleToggle = (event, newToggle) => {
    //     if (newToggle !== null) {
    //         setToggle(newToggle);
    //     }
    // };

    // CLUB ANNOUNCEMENTS
    const getClubAnnouncements = () => {
        // console.log('updating announcements');
        callApiGetClubAnnouncements()
            .then(res => {
                var parsed = JSON.parse(res.express);
                setClubAnnouncements(parsed);
                if (parsed.length == 0){
                    setNoAnnouncementMsg('No Announcements')
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

    // CLUB MEMBERS
    const getClubMembers = () => {
        // console.log('getting members');
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
        <ClubBoardHeader active={"1"}/>
        <Grid className={classes.root} sx={{height:'100%'}}>
            <Grid style={{display:'flex'}}>
                <Grid xs={8} style={{padding:'0 20px'}} >
                {Object.values(clubAnnouncements).map((announcement, index) => <>
                <Card style={{maxHeight:'400px', boxShadow:'none', margin:'25px 0 0', borderRadius:'0', background:'none',}} >
                    <Grid style={{display:'flex'}} className={classes.boxShadow} >
                        <Grid xs={8} style={{boxShadow: 'rgba(99, 99, 99, 0.2) 2px 8px 8px', background:'#fff', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                            <Grid style={{padding:'20px 20px', display:'flex', justifyContent:'end'}}>
                                <Grid style={{display:'flex', flexDirection:'column', alignItems:'end'}}>
                                    <Typography style={{color:'grey', fontSize:'11pt', letterSpacing:'0.5px'}}>{announcement.time_posted_text}</Typography>
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
                        <Grid xs={4}>
                            <AnnouncementImage image={announcement.placeholderPhoto} skeletonWidth={200} skeletonHeight={200}/>
                        </Grid>             
                    </Grid>
                </Card>
                </>)}
            </Grid>
            <Grid xs={4} style={{display:'flex', justifyContent:'center', marginTop:'25px'}}>
                    {admin && <AnnouncementForm clubID={clubID} onSubmit={getClubAnnouncements} />}
            </Grid>
        </Grid>
        </Grid>
    </>)

}

export default ClubBoard;


const AnnouncementImage = ({image, skeletonWidth, skeletonHeight}) => {
    const placeholders = {
        1:img1,
        2:img2,
        3:img3,
        4:img4,
        5:img5,
        6:img6,
        7:img7,
        8:img8,
        9:img9,
        10:img10,
        11:img11,
        12:img12,
    }

    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    return(
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", }} >
            <img 
                src={placeholders[image]} 
                className={classes.img}
                style={{display: loading?"none":"block", width:"100%"}} 
                onLoad={(e)=>{setLoading(false)}} />
            <Skeleton 
                variant="rect" 
                animation="pulse" 
                width={skeletonWidth} 
                height={skeletonHeight} 
                style={{display: !loading&&"none", borderRadius:'12px'}} />
        </div> 
    )
}


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
