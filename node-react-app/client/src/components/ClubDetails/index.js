import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { SignIn } from '../SignIn';
import { useUser } from '../Firebase';
import { Hello } from '../Hello';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import { CardHeader } from '@material-ui/core';
import Item from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";


//Dev mode
const serverURL = ""; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 1500,
      alignItems: "center",
      justifycontent: "center",
      marginLeft: '100px'
    },
    title:{
        textAlign:'justify',
        borderRadius:'3px',
        marginTop: '50px',
        maxWidth: 1150,
        marginLeft: '-15px',
        fontFamily: 'Arvo, serif'
    }

  }));


const ClubDetails = () => {

    const classes = useStyles();
    const [clubTitle, setClubTitle] = React.useState()
    const [clubDescription, setClubDescription] = React.useState("")

    const { clubID } = useParams();

    React.useEffect(() => {
        getClubs();
    }, []);

    const getClubs = () => {
        callApiGetClubs()
            .then(res => {
                console.log("callApiGetClubs returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("callApiGetClubs: ", parsed);
                setClubTitle(parsed[0].name)
                setClubDescription(parsed[0].description)
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
        console.log("Searched club: ", body);
        return body;
    }

    return (
        <Grid className = {classes.root}>
            <Typography className = {classes.title} variant='h4' align="center">
                {clubTitle}
            </Typography>
            <br></br>
            <Grid container spacing={4} direction = "column">
                <Grid item xs={9} style={{padding:'20px 0'}}>
                    <Item>
                        <Card
                            variant="elevation"
                            style={{ backgroundColor: 'light-grey' }}>
                            <CardHeader title="Description" />
                            <CardContent>
                                <Typography variant='p' color='textPrimary'>
                                    {clubDescription}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Item>
                </Grid>
                <Grid container direction = "row" spacing = {1}>
                    <Grid item xs={3}>
                        <Item>
                            <Card variant="elevation">
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={require("../../images/bliss.png")}
                                    title="placeholder"
                                    alt='unsplash image'
                                />
                                <CardHeader title="Photo" />
                                <CardContent>
                                    <Typography variant='body2' color='textPrimary'>
                                        Placeholder
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>
                            <Card
                                variant="elevation" >
                                <CardHeader title="Photo" />
                                <CardContent>
                                    <Typography variant='body2' color='textPrimary'>
                                        Placeholder
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>
                            <Card
                                variant="elevation" >
                                <CardHeader title="Photo" />
                                <CardContent>
                                    <Typography variant='body2' color='textPrimary'>
                                        Placeholder
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Item>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}


export default ClubDetails;
