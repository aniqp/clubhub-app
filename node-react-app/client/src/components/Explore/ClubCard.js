import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button,Card, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";


const ClubCard = (props) => {

    const truncate = (input) => {
        if (input.length > 100) {
           return input.substring(0, 200) + '...';
        }
        return input;
    };

    return(
        <Card variant="outlined" style={{margin:'0 0 20px 0',padding:'10px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <Grid item xs={8}>
                <Typography variant='h6' style={{padding:'0 0 10px 0'}}>{props.club.name}</Typography>
                <Typography style={{fontSize:'0.8rem'}}>{truncate(props.club.description)}</Typography>
            </Grid>
            <Grid item xs={3} style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                <Button color='primary' variant='outlined'>Club Details</Button>
                <Button color='secondary' variant='outlined'>Join Club</Button>
            </Grid>
        </Card>
    )
    
}

export default ClubCard;