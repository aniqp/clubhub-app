import React, {useState} from 'react';
import { makeStyles, Dialog, IconButton, Grid, Radio, RadioGroup, InputLabel,FormControlLabel, Box, Typography,InputAdornment, Card, Button, Menu, MenuItem, Collapse, CardContent, TextField } from "@material-ui/core";
import { useParams } from 'react-router-dom';
import ClubBoardHeader from './ClubBoardHeader';
import Skeleton from '@material-ui/lab/Skeleton';
import { serverURL } from '../../constants/config';
import AnnouncementPost from './AnnouncementPost';
import AnnouncementForm from './AnnouncementForm';
import publicIcon from '../../images/public-icon.png';
import privateIcon from '../../images/private-icon.png';
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
import caution from '../../images/caution-icon.png';
import Edit from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import lock from '../../images/lock-icon.png';
import { toast } from 'react-toastify'; 
import "react-toastify/dist/ReactToastify.css";




const useStyles = makeStyles((theme) => ({
    root:{
        background:'#f5f5f5',
        minHeight:'100vh',
        paddingBottom:'50px'
    },
    textField: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',            
        marginTop: 0,
        fontWeight: 500
    },
    search:{
        height:'20px'
    },
    avatar: {
        backgroundColor: red[500],
    },
    boxshadow:{
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
    },    
    label:{
        color:'grey',
        fontSize:'9pt',
        marginBottom:'5px',
        letterSpacing:'1px'
    },
    card:{
        margin:'20px 50px',
        display:'flex',
        padding:'18px',
        alignItems:'center',

    }, 
    input:{
        width:'100%',
        // margin: '5px 0 10px 0',
        border: 'rgba(0, 0, 0, 0.23) 1px solid',
        padding: '10px',
        background:'white',
        borderRadius: '5px',
        border:'#e6e6e6 1px solid',
        '&:hover':{
            border:'1px solid black'
        },
    },
    profile: {
        height:'50px',
        paddingRight:'15px'
    },
    btn:{
        width:'100%',
        textTransform:'none',
        padding:'13px 10px',
        justifyContent:'start',
        background:'rgb(242,242,242)',
        "&:hover":{
            background:'#d9d9d9'
        }
    },
    radiobtn:{
        textTransform:'none',
        width:'100%',
        justifyContent:'space-between',
    },
    img:{
        height:'45px',
        width:'45px',
    },
    sidebarImg:{
        height:'180px',
        borderRadius:'12px',
    },
    sidebarBtn:{
        textTransform:'none',
        background:'#3f51b5',
        color:'#fff',
        display:'flex',
        borderRadius:'18px',
        padding:'8px 15px',
        "&:hover":{
            background:'#5362b8'
        }
    },
    radioFont :{
        marginLeft:'10px',
        fontSize:'14px',
        fontWeight:'600',
        color:'rgb(75,75,75)',
    },
    header:{
        margin:'-32px',
        color:'#36454F',
        fontWeight:'600',
        fontSize:'16pt'
    },
    subheader:{
        fontWeight:'600',
        paddingBottom:'10px',
        color:'#36454F'
    },
    divider:{
        // margin:'25px 0 5px 0',
        // borderBottom:'1px solid #d9d9d9'
    },
    radioGroup:{
        '&&:hover': {
            backgroundColor: 'transparent',
        }
        
    },

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
                    <Post admin={admin} announcement={announcement} onChange={getClubAnnouncements}/>
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

const Post = ({admin, announcement, onChange}) => {
    const classes = useStyles();
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [editModalOpen, setEditModalOpen] = React.useState(false);

    const handleDeleteClick = () => {
        callApiDeleteAnnouncement()
            .then(res => {
                var parsed = JSON.parse(res.express);
                onChange();
            })
        setDeleteModalOpen(false);
    }

    const callApiDeleteAnnouncement = async () => {
        const url = serverURL + '/api/deleteAnnouncement';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                id: announcement.id
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    toast.configure();
    const notify = () => {
        // console.log('in')
        toast.success("Success: Announcement post was edited.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
        });
    }


    const handleEditClick = (data) => {
        console.log(data);
        callApiEditAnnouncement(data)
            .then(res => {
                console.log('response')
                var parsed = JSON.parse(res.express);
                notify();
                onChange();  
            })  
        setEditModalOpen(false); 
         
    }

    const callApiEditAnnouncement = async (data) => {
        const url = serverURL + '/api/editAnnouncement';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                id: announcement.id,
                newTitle : data.title,
                newBody: data.content,
                visibility: data.access, 
                placeholderImage: parseInt(data.placeholderImage),
                
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    let radiobtnVal = '1';
    if (announcement.visibility === 'private'){
        radiobtnVal = '2';
    }

    return(<>
        {((announcement.visibility === 'private' && admin) || (announcement.visibility === 'public')) &&
        <Card style={{maxHeight:'400px', boxShadow:'none', margin:'25px 0 0', borderRadius:'10px', background:'none',}} >
        {admin &&
        <Grid style={{background:'rgba(218, 224, 238, 0.8)', display:'flex', justifyContent:'end', }}>
            <LongMenu onDelete={() => {setDeleteModalOpen(true)}} onEdit={() => setEditModalOpen(true)}/>
            <DeleteAnnouncement open={deleteModalOpen} close={()=> setDeleteModalOpen(false)} title={announcement.title} body={announcement.body} handleDelete={handleDeleteClick}/>
            <PostModal 
                open={editModalOpen} 
                onClose={()=> setEditModalOpen(false)} 
                onEdit={handleEditClick}
                a_title={announcement.title} 
                a_content={announcement.body}
                a_radiobtn={radiobtnVal}
                image={announcement.placeholderPhoto.toString()}
                />
        </Grid>}
        <Grid style={{display:'flex'}} className={classes.boxShadow} >
            <Grid xs={8} style={{boxShadow:'rgba(99, 99, 99, 0.2) 2px 8px 8px', background:'#fff', display:'flex', flexDirection:'column'}}>
                <Grid style={{padding:'20px 20px 0px', display:'flex', justifyContent:'end'}}>
                    <Grid style={{display:'flex', flexDirection:'column', alignItems:'end'}}>
                        {announcement.visibility === 'private' && 
                            <>
                                <Box style={{display:'flex', marginBottom:'5px', justifyContent:'center'}}>
                                    <img src={lock} style={{height:'15px', marginRight:'5px'}} />
                                    <Typography variant="body2" color='primary'>Admin Visibility</Typography>
                                </Box>
                        </>}
                        <Typography style={{color:'grey', fontSize:'11pt', letterSpacing:'0.5px'}}>{announcement.time_posted_text}</Typography>
                    </Grid>
                </Grid>
                <Grid style={{padding:'0 20px 20px'}}>
                    <Typography style={{color:'rgb(55,72,97)', fontSize:'14pt', marginTop:'10px', marginBottom:'5px', fontWeight:'600'}}>{announcement.title}</Typography>
                    <Typography style={{fontSize:'11pt'}}>{announcement.body}</Typography>
                </Grid>
            </Grid>
            <Grid xs={4}>
                <AnnouncementImage image={announcement.placeholderPhoto} skeletonWidth={200} skeletonHeight={200}/>
            </Grid>             
        </Grid>
    </Card>}
    </>
    )
}


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
                style={{display: loading?"none":"block", width:"100%", height:'230px', borderRadius:'0 0 10px 0'}} 
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

const LongMenu = ({onDelete, onEdit}) => {
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
        <MenuItem onClick={()=>{onEdit(); handleClose();}}>
            <EditIcon onClick={onEdit} style={{marginRight:'5px'}} /> Edit Post
        </MenuItem>
        <MenuItem  onClick={()=>{onDelete(); handleClose();}}>
            <DeleteIcon style={{marginRight:'5px'}}/> Delete Post
        </MenuItem>
      </Menu>
    </div>
  );
}


const DeleteAnnouncement = ({open, close, title, body, handleDelete}) => {

    const truncate = (input) => {
        if (input.length > 100) {
           return input.substring(0, 100) + '...';
        }
        return input;
    };

    return(
        <Dialog open={open} close={close}>
            <Grid container style={{display:'flex', flexDirection:'column'}}>
                <Grid item style={{display:'flex', justifyContent:'end', paddingTop:'5px'}}>
                    <Button onClick={close}><img src={close} style={{height:'25px'}}></img></Button>
                </Grid>
                <Grid item style={{display:'flex', justifyContent:'center'}}>
                    <img src={caution} style={{height:'70px', marginLeft:'15px'}} />
                    <Box>
                        <Typography style={{margin:'10px 20px 5px 20px', fontWeight:'600', letterSpacing:'0.02em'}}>Delete Announcement</Typography>
                        <Typography style={{margin:'0 20px 20px 20px'}}>Are you sure you want to delete the following announcement?</Typography>
                        <Typography style={{margin:'0 20px 6px 20px'}}>
                            <b>Title:</b> {title}
                        </Typography>
                        <Typography style={{margin:'0 20px 20px 20px'}}>
                            <b>Content:</b> {truncate(body)}
                        </Typography>
                    </Box> 
                </Grid>
                <Grid style={{display:'flex', flexDirection:'row', justifyContent:'center', padding:'10px 10px 15px 10px'}}>
                    <Button fullWidth onClick={close} variant='outlined' style={{margin:'0 10px'}}>Cancel</Button>
                    <Button fullWidth onClick={handleDelete} variant='outlined' style={{margin:'0 10px', background:'#F01C39', color:'white'}}>Delete</Button>   
                </Grid>
            </Grid>
        </Dialog>
    )
}

const PostModal = ({ open, onClose, onEdit, a_title, a_content, a_radiobtn, image }) => {
    const classes= useStyles();
    const [title, setTitle] = React.useState(a_title);
    const [content, setContent] = React.useState(a_content);
    const [radiobtn, setRadiobtn] = React.useState(a_radiobtn);
    
    // Error Messages
    const [isTitleMissing, setIsTitleMissing] = React.useState(false);
    const [isContentMissing, setIsContentMissing] = React.useState(false);

    const handleEnteredTitle = (event) => {
        setTitle(event.target.value);
        setIsTitleMissing(false);
    }

    const handleEnteredBody = (event) => {
        setContent(event.target.value);
        setIsContentMissing(false);
    }

    const handlePost = () => {
        let caughtError = false;
        let access = {1:'public', 2:'private'}

        if (title === "") {
            setIsTitleMissing(true);
            caughtError = true;
        }

        if (content === "") {
            setIsContentMissing(true);
            caughtError = true;
        }

        if (!caughtError){
            let data = {
                title: title,
                content: content,
                access: access[radiobtn],
                placeholderImage: placeholderImage,
            }
            onEdit(data);
        
            setTitle('');
            setContent('');
            setRadiobtn('1');
            setPlaceholderImage('1');
            onClose();
        }
    }

    const handleRadioBtn1 = () => {
        setRadiobtn('1')
    }

    const handleRadioBtn2 = () => {
        setRadiobtn('2')
    }

    const [placeholderImage, setPlaceholderImage] = React.useState(image)
    const handlePlaceholderImageRadioBtn = (e) =>{
        setPlaceholderImage(e.target.value);
    }
    console.log(open)
    if (!open) return null

    return(
        <>
            <Dialog open={open} close={onClose}>
                <Grid style={{padding:'40px', background:'#fff', display:'flex', flexDirection:'column'}}>
                    <Grid item style={{borderBottom:'lightgrey 0.5px solid', display:'flex', justifyContent:'space-between'}}>
                        <Grid>
                            <Typography style={{fontWeight:'300', fontSize:'20pt', marginBottom:'10px', }}>Edit Announcement</Typography>
                        </Grid> 
                        <Grid>
                            <IconButton onClick={onClose}>
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <InputLabel className={classes.label} style={{marginTop:'20px'}}>ANNOUNCEMENT TITLE</InputLabel>
                    <Grid style={{display:'flex', flexDirection:'column'}}>
                        {isTitleMissing && (
                            <Typography style={{ color: "rgb(255,0,0)"}} variant={"body2"}>
                            Please enter an announcement title
                            </Typography>
                        )}
                        <input value={title} onChange={handleEnteredTitle} className={classes.input} placeholder='Title' required style={{marginBottom:'10px'}}/>
                        {isContentMissing && (
                            <Typography style={{ color: "rgb(255,0,0)"}} variant={"body2"}>
                            Please enter content for the announcement
                            </Typography>
                        )}
                        <InputLabel className={classes.label} style={{marginTop:'5px'}}>ANNOUNCEMENT CONTENT</InputLabel>
                        <textarea value={content} onChange={handleEnteredBody} placeholder="Content" className={classes.input} rows='4' style={{resize:'none'}}/>                    
                    </Grid>
                    <Grid style={{display:'flex', flexDirection:'column', padding:'10px 0 20px 0'}}>
                        <Grid item style={{display:'flex'}}>
                            <InputLabel className={classes.label} style={{margin:'20px 0 10px'}}>WHO SHOULD SEE THIS ANNOUNCEMENT POST?</InputLabel>
                        </Grid>
                        <RadioGroup
                            column
                            name="position"
                            value={radiobtn}
                            className={classes.radioGroup}
                        >
                            <Button className={classes.radiobtn} onClick={handleRadioBtn1}>
                                <Grid style={{display:'flex', alignItems:'center'}}>
                                    <Grid style={{background:'lightgray', borderRadius:'50%', padding:'3px'}}>
                                        <img src={publicIcon} className={classes.img} />
                                    </Grid>
                                    <Grid style={{textAlign:'left'}}>
                                        <Typography className={classes.radioFont}>All Club Members</Typography>
                                        <Typography style={{fontSize:'9pt', marginLeft:'10px'}}>Visible by general club members, admins, and club owner</Typography>
                                    </Grid>
                                </Grid>
                                <FormControlLabel
                                value="1"
                                control={<Radio />}
                                labelPlacement="start"
                                className={classes.test}
                                />
                            </Button>
                            <Button className={classes.radiobtn} onClick={handleRadioBtn2}>
                                <Grid style={{display:'flex', alignItems:'center'}}>
                                    <Grid style={{background:'lightgray', borderRadius:'50%', padding:'3px'}}>
                                        <img src={privateIcon} className={classes.img} />
                                    </Grid>
                                    <Grid style={{textAlign:'left'}}>
                                        <Typography className={classes.radioFont}>Admins Only</Typography>
                                        <Typography style={{fontSize:'9pt', marginLeft:'10px'}}>Not visible by general club members</Typography>
                                    </Grid>
                                </Grid>
                                <FormControlLabel
                                value="2"
                                control={<Radio />}
                                labelPlacement="start"
                                />
                            </Button>
                        </RadioGroup>
                    </Grid>
                    <Grid style={{borderTop:'1px dashed lightgray', margin:'10px 0', paddingTop:'10px'}}>
                        <InputLabel className={classes.label} style={{marginTop:'20px'}}>SELECT A PLACEHOLDER IMAGE</InputLabel>
                    </Grid>
                    <RadioGroup onChange={handlePlaceholderImageRadioBtn} value={placeholderImage} style={{display:'flex', flexDirection:'row', overflow:'hidden', margin:'10px'}}>
                        <Grid style={{display:'flex', overflowX:'scroll'}}>
                            <PlaceholderImageOption value={1} />
                            <PlaceholderImageOption value={2} />
                            <PlaceholderImageOption value={3} />
                            <PlaceholderImageOption value={4} />
                            <PlaceholderImageOption value={5} />
                            <PlaceholderImageOption value={6} />
                            <PlaceholderImageOption value={7} />
                            <PlaceholderImageOption value={8} />
                            <PlaceholderImageOption value={9} />
                            <PlaceholderImageOption value={10} />
                            <PlaceholderImageOption value={11} />
                            <PlaceholderImageOption value={12} />
                        </Grid>
                    </RadioGroup>
                    <Grid style={{display:'flex', justifyContent:'end'}}>
                        <Button variant='outlined' color='primary' onClick={handlePost}>
                            Edit Announcement
                        </Button>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

const PlaceholderImageOption = ({value}) => {
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

    return(
        <Grid style={{marginLeft:'10px', display:'flex', flexDirection:'column'}}>
            <img src={placeholders[value]} style={{height:'100px'}} />
            <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                <Radio value={value.toString()}/>
            </div>
        </Grid>
    )
}


function convertTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
}

const datetimeTextFormat = () => {
    const weekdays = {
        Mon:'Mon',
        Tue:'Tues',
        Wed:'Wed',
        Thu:'Thurs',
        Fri:'Fri',
        Sat:'Sat',
        Sun:'Sun'
    }

    const months = {
        Jan:'January',
        Feb:'February',
        Mar:'March',
        Apr:'April',
        May:'May',
        Jun:'June',
        Jul:'July',
        Aug:'August',
        Sep:'September',
        Oct:'October',
        Nov:'November',
        Dec:'December'
    }

    let d = Date().toString();
    d = d.split(' ')
    return weekdays[d[0]] + ' ' + months[d[1]] + ' ' + d[2] + ' ' + d[3] + ' ' + convertTime(d[4].slice(0,5))    
}