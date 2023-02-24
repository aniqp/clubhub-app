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
        primary: {
            main: "#fafafa",
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
        <Box >
            <Typography variant='h3' align="inherit">
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
                                <Typography variant='body2' color='textPrimary'>
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
        </Box>
    )
}


export default withStyles(styles)(ClubDetails);
