import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button,Card, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import history from '../Navigation/history';
import { useUser } from '../Firebase/context';


const serverURL = "";

const useStyles = makeStyles((theme) => ({
    li:{
        listStyle:'none'
    },
    card: {
        height:'125px',
        margin:'0 0 20px 0',
        padding:'10px',
        display:'flex', 
        flexDirection:'row', 
        justifyContent:'space-between'
    },
    exploreBtns:{
        display:'flex', 
        flexDirection:'column', 
        justifyContent:'space-around',
        outline:'0.8px'
    },
    btn:{
        border:'1.5px solid',
    }

}));

const ClubCard = ({club, isMember}) => {
    const classes = useStyles(); 

    const truncate = (input) => {
        if (input.length > 100) {
           return input.substring(0, 200) + '...';
        }
        return input;
    };

    return(
        <li key={club.id} className={classes.li}>
            <Card variant="outlined" className={classes.card}>
                <Grid item xs={8}>
                    <Typography variant='h6' style={{padding:'0 0 10px 0'}}>{club.name}</Typography>
                    <Typography style={{fontSize:'0.8rem'}}>{truncate(club.description)}</Typography>
                </Grid>
                <Grid item xs={3} className={classes.exploreBtns}>
                    <Button className={classes.btn} onClick={() => history.push(`/clubs/${club.id}`)} color='primary' variant='outlined'>Club Details</Button>
                    {isMember.includes(club.id) ? (                           
                        <Button disabled className={classes.btn} color='secondary' variant='outlined'>Join Club</Button>
                    ) : (                            
                        <Button className={classes.btn} color='secondary' variant='outlined'>Join Club</Button>
                    )}
                </Grid>
            </Card>
        </li>
    )
    
}

export default ClubCard;