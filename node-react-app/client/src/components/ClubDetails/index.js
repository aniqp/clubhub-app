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
import { SignOut } from '../SignOut';
import { Hello } from '../Hello';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import { CardHeader } from '@material-ui/core';
import Item from '@material-ui/core/Grid';


//Dev mode
const serverURL = ""; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

const opacityValue = 0.9;

const theme = createTheme({
    palette: {
        type: 'dark',
        background: {
            default: "#000000"
        },
        primary: {
            main: "#52f1ff",
        },
        secondary: {
            main: "#b552f7",
        },
    },
});

const customTheme = createTheme({
    palette: {
        background: {
            default: "#000000"
        },
        primary: {
            main: "#52f1ff",
        },
        secondary: {
            main: "#b552f7",
        },
    },
});

const styles = theme => ({
    root: {
        body: {
            backgroundColor: "#000000",
            opacity: opacityValue,
            overflow: "hidden",
        },
    },
    mainMessage: {
        opacity: opacityValue,
    },

    mainMessageContainer: {
        marginTop: "20vh",
        marginLeft: theme.spacing(20),
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(4),
        },
    },
    paper: {
        overflow: "hidden",
    },
    message: {
        opacity: opacityValue,
        maxWidth: 250,
        paddingBottom: theme.spacing(2),
    },

});


class ClubDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: 1,
            mode: 0
        }
    };

    componentDidMount() {
        //this.loadUserSettings();
    }


    loadUserSettings() {
        this.callApiLoadUserSettings()
            .then(res => {
                //console.log("loadUserSettings returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("loadUserSettings parsed: ", parsed[0].mode)
                this.setState({ mode: parsed[0].mode });
            });
    }

    callApiLoadUserSettings = async () => {
        const url = serverURL + "/api/loadUserSettings";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                userID: this.state.userID
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("User settings: ", body);
        return body;
    }

    render() {
        const { classes } = this.props;

        const mainMessage = (
            <Grid
                container
                spacing={0}
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                style={{ minHeight: '100vh' }}
                className={classes.mainMessageContainer}
            >
                <Grid item>
                    <MuiThemeProvider theme={customTheme}>
                        <Details />
                    </MuiThemeProvider>
                </Grid>
            </Grid>
        )


        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <CssBaseline />
                    <Paper
                        className={classes.paper}
                    >
                        <SignIn />
                        <SignOut />
                        <Hello />
                        {/* <UserName /> */}
                        {mainMessage}
                    </Paper>

                </div>
            </MuiThemeProvider>
        );
    }
}

ClubDetails.propTypes = {
    classes: PropTypes.object.isRequired
};

const Details = () => {
    return (
        <Box>
            <Typography variant='h3' align="inherit">
                Club 1
            </Typography>
            <br></br>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Item>
                        <Card
                            variant="outlined">
                            <CardHeader title="Description" />
                            <CardContent>
                                <Typography variant='body2' color='textPrimary'>
                                    Club 1 is fun, Club 1 is fun,Club 1 is fun,Club 1 is fun,Club 1 is fun,Club 1 is fun,Club 1 is fun,
                                    Club 1 is fun,Club 1 is fun,Club 1 is fun,Club 1 is fun,

                                </Typography>
                            </CardContent>
                        </Card>
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>
                        <Card
                            variant="outlined" >
                            <CardHeader title="Additional Information" />
                            <CardContent>
                                <Typography variant='body2' color='textPrimary'>
                                    New members should read the documentation.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Item>
                </Grid>
                <Grid item xs={3}>
                    <Item>
                        <Card variant="outlined">
                        <CardMedia
                                sx={{ height: 140 }}
                                image="../../../images/bliss.png"
                                title="placeholder"
                                alt='unsplash image'
                            />
                            <CardHeader title="Photo"/>
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
                            variant="outlined" >
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
                            variant="outlined" >
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
        </Box>
    )
}


export default withStyles(styles)(ClubDetails);