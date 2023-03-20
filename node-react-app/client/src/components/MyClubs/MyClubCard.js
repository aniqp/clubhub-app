import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Card, Typography, CardActions, CardContent, CardMedia } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import history from '../Navigation/history';
import academic from '../../images/club-images/academic.jpg'
import business from '../../images/club-images/business.jpg'
import charity from '../../images/club-images/charity.jpg'
import creativeArt from '../../images/club-images/creative_art.jpg'
import cultural from '../../images/club-images/cultural.jpg'
import environmental from '../../images/club-images/environmental.jpg'
import games from '../../images/club-images/games.jpg'
import health from '../../images/club-images/health.jpg'
import media from '../../images/club-images/media.jpg'
import politicsSocialAwareness from '../../images/club-images/politics_social_awareness.jpg'
import religious from '../../images/club-images/religious.jpg'
import { useUser } from '../Firebase/context';
import { toast } from 'react-toastify'; 
import "react-toastify/dist/ReactToastify.css";
import { serverURL } from '../../constants/config';
import close from '../../images/close-icon.png';
import caution from '../../images/caution-icon.png';


const MyClubCard = (props) => {

    const truncate = (input) => {
        if (input.length > 100) {
            return input.substring(0, 200) + '...';
        }
        return input;
    };

    toast.configure();
    const notify = (name) => {
        toast.success("Your request to leave "+name+" was successful", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
        });
    }

    function getClubCategory(club) {
        const category = club.categories.split(',')[0]
        if(category == 'academic') {
            return academic 
        }
        else if (category == "business-and-entrepreneurial") {
            return business
        }
        else if (category == "charitable-community-service-international-development") {
            return charity
        }
        else if(category == "creative-arts-dance-and-music") {
            return creativeArt
        }
        else if(category == "cultural") {
            return cultural
        }
        else if(category == "environmental-and-sustainability") {
            return environmental
        }
        else if(category == "games-recreational-and-social") {
            return games
        }
        else if(category == "health-promotion") {
            return health
        }
        else if(category == "media-publications-and-web-development") {
            return media
        }
        else if(category == "political-and-social-awareness") {
            return politicsSocialAwareness
        }
        else if(category == "religious-and-spiritual") {
            return religious
        }
    }

    const user = useUser();
    
    const handleClick = (clubId, userId, clubName) => {
        let data = {
            clubId:clubId,
            userId:userId,
            clubName:clubName
        }
        
        callApiLeaveClub(data)
        .then(res => {
            setLeaveClubsModalOpen(false);
            props.onChange();
            notify(clubName);
        })
    };

    const callApiLeaveClub = async (data) => {
        const url = serverURL + '/api/leaveClub';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                clubId: data.clubId,
                userId: data.userId
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    const [admin, setAdmin] = React.useState(false);
    const [leaveClubsModalOpen, setLeaveClubsModalOpen] = React.useState(false);
    const[leaveClub, setLeaveClub] = React.useState({});

    const handleLeaveClub = (id, name) => {
        let data = {id:id, name:name};
        setLeaveClub(data);
        setLeaveClubsModalOpen(true);
    }

    return (
        <Grid container spacing={2}>
            {props.clubs.map((club) => (
                    <Grid item xs={6} sm={6} med={6}>
                        <Card variant="outlined" style = {{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxWidth: 600}} >
                            <CardMedia
                                image = {getClubCategory(club)}
                                style = {{height: "125px"}}
                            >
                            </CardMedia>
                            <CardContent>
                                <Typography variant='h6' style={{ padding: '0 0 10px 0' }}>{club.name}</Typography>
                                <Typography style={{ fontSize: '0.8rem' }}>{truncate(club.description)}</Typography>
                            </CardContent>
                            <CardActions style={{display:'flex', justifyContent:'space-between'}}>
                                <Button style={{ border: '1.5px solid' }} onClick={() => history.push(`/clubboard/${club.id}`)} color='primary' variant='outlined' >View Board</Button>
                                <Button style={{ border: '1.5px solid' }} onClick={() =>{handleLeaveClub(club.id, club.name)}} color='secondary' variant='outlined'>Leave Club</Button>
                                <LeaveClubModal key={club.id} clubData={leaveClub} open={leaveClubsModalOpen} onClose={() => setLeaveClubsModalOpen(false)} onSubmit={()=> handleClick(leaveClub.id, user.uid, leaveClub.name)}/>
                            </CardActions>
                        </Card>
                    </Grid>
            ))}
        </Grid>
    )

}

export default MyClubCard;

const MODAL_STYLES = {
    position:'fixed',
    top:'50%',
    left:'50%',
    transform:'translate(-50%, -50%)',
    backgroundColor:'#fff',
    zIndex:1000,
    width:'30vw',
    borderRadius:'8px'
}

const OVERLAY_STYLES = {
    position:'fixed', 
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 0,
    backgroundColor:'rgba(0,0,0,.4)',
    zIndex:1000
}

const LeaveClubModal = ({ open, clubData, onClose, onSubmit }) => {
    if (!open) return null
    return(
        <>
            <div style={OVERLAY_STYLES} />
            <div style={MODAL_STYLES}>
                <Grid container style={{display:'flex', flexDirection:'column'}}>
                    <Grid item style={{display:'flex', justifyContent:'end', paddingTop:'5px'}}>
                        <Button onClick={onClose}><img src={close} style={{height:'25px'}}></img></Button>
                    </Grid>
                    <Grid item style={{display:'flex', justifyContent:'center'}}>
                        <img src={caution} style={{height:'70px', marginLeft:'15px'}} />
                        <Box>
                            <Typography style={{margin:'10px 20px 5px 20px', fontWeight:'600', letterSpacing:'0.02em'}}>Leave Club</Typography>
                            <Typography style={{margin:'0 20px 20px 20px'}}>Are you sure you want to leave {clubData.name}?</Typography>
                        </Box> 
                    </Grid>
                    <Grid style={{display:'flex', flexDirection:'row', justifyContent:'center', padding:'10px 10px 15px 10px'}}>
                        <Button fullWidth onClick={onClose} variant='outlined' style={{margin:'0 10px'}}>Cancel</Button>
                        <Button fullWidth onClick={onSubmit} variant='outlined' style={{margin:'0 10px', background:'#F01C39', color:'white'}}>Leave</Button>   
                    </Grid>
                </Grid>
            </div>
        </>
    )

}