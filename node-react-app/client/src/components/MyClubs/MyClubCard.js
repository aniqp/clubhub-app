import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button,Card, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import history from '../Navigation/history';

const MyClubCard = (props) => {

    const truncate = (input) => {
        if (input.length > 100) {
           return input.substring(0, 200) + '...';
        }
        return input;
    };
    console.log('props')
    console.log(props.clubs)
    return(
        <ul style={{padding:'0'}}>
            {props.clubs.map((club) => (
                <li key={club.id} style={{listStyle:'none'}}>
                    <Card variant="outlined" style={{margin:'0 0 20px 0',padding:'10px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                        <Grid item xs={8}>
                            <Typography variant='h6' style={{padding:'0 0 10px 0'}}>{club.name}</Typography>
                            <Typography style={{fontSize:'0.8rem'}}>{truncate(club.description)}</Typography>
                        </Grid>
                        <Grid item xs={3} style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                            <Button onClick={() => history.push(`/clubs/${club.id}`)} color='primary' variant='outlined' >Club Details</Button>
                            <Button color = 'secondary' variant='outlined'>Join Club</Button>
                        </Grid>
                    </Card>
                </li>
            ))}
        </ul>
    )
    
}

export default MyClubCard;