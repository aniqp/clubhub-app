import React from "react";
import history from '../Navigation/history';
import { useParams } from 'react-router-dom';
import { makeStyles, Grid, Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 800,
      margin: "0 auto",
      alignItems: "center",
      justifycontent: "center",
      marginTop: '30px'
    },
    btn: {
        background:'#3f51b5',
        color:'#fff',
        display:'flex',
        borderRadius:'18px',
        padding:'8px 15px',
        "&:hover":{
            background:'#5362b8'
        }
    },
    card: {
      border: "1px solid #ddd",
      borderRadius: 5,
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      padding: 16,
    }
  }));

const Events = () => {
    const classes = useStyles();
    const { clubID } = useParams();

    let testData = {
        title:'Event title',
        location:'RCH 302',
        time:'March 28th 2023',
        body:'The event is happening tomorrow',
        timeposted:'March 16th 2023',
        visibility:'public'
    }

    return(<>

        <Grid container>
            <Button className={classes.btn} onClick={() => history.push(`/clubboard/${clubID}/eventform`)}>
                <Typography style={{paddingRight:'5px'}}>+</Typography>
                <Typography>Add Event</Typography>
            </Button>
        </Grid>
    
    </>)

}

export default Events;
