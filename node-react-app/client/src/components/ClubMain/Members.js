import React, { useState } from 'react';
import { makeStyles, Checkbox, Radio, RadioGroup, FormControlLabel, TextField, InputAdornment, Box, Dialog, DialogTitle, DialogContent, DialogActions, Paper, Typography, Button, Grid, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import profile from '../../images/profile-icon.png';
import membersIcon from '../../images/members.png';
import { useUser } from '../Firebase';
import search from '../../images/search-icon.png';
import info from '../../images/info-icon.png';
import { Pagination } from "@material-ui/lab";
import ManageAdmin from './members/dialogs/ManageAdmin';
import TransferOwnership from './members/dialogs/TransferOwner';
import { useParams } from 'react-router-dom';
import { serverURL } from '../../constants/config';
import ClubBoardHeader from './ClubBoardHeader';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        padding: '20px 10px 20px 30px',
        background:'#e7ecef',
        minHeight:'100vh',

    },
    search: {
        height: '20px'
    },
    card: {
        display: 'flex',
        // margin:'10px 10px',
        padding: '10px 10px',
        alignItems: 'center',
        height: '75px',
        borderRadius: '0'
    },
    header: {
        display: 'flex',
        // padding:'0 10px 0px 10px',
        boxShadow: 'none',
        background: 'none',
    },
    profile: {
        height: '30px',
        padding: '0 15px 0 5px'
    },
    memberCount: {
        margin: '10px 0 30px 0',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    headerFont: {
        fontWeight: '600'

    },
    role: {
        padding: '5px 15px',
        borderRadius: '5px',
    },
    ownerRole: {
        background: 'rgba(149, 0, 204, 0.1)'

    },
    adminRole: {
        background: 'rgba(255, 104, 104, 0.1)'
    },
    userRole: {
        background: 'rgba(136, 191, 255, 0.1)',
    },
    text1: {
        color: 'rgba(0, 0, 0, 0.6)'
    },
    text2: {
        fontWeight: '600',
        fontSize: '25pt'
    },
    adminBtnGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    adminBtn: {
        minWidth: '130px',
        padding: '5px 15px',
        color: 'white',
        borderRadius: '8px',
        textTransform: 'none',
        marginBottom: '10px'
    },
    input: {
        background: '#fff'
    },
    search: {
        height: '20px'
    },
    radiobtn: {
        textTransform: 'none',
        width: '100%',
        justifyContent: 'space-between',
    }, 
    img:{
        height:'18px'
    }




}));

const Members = ({ name, onChange }) => {
    const user = useUser();
    const { clubID } = useParams();
    const [members, setMembers] = React.useState([]);
    const [currentUserRole, setCurrentUserRole] = React.useState('');
    const [isAdmin, setIsAdmin] = React.useState(false);


    React.useEffect(() => {
        getClubMembers();
    }, []);

    React.useEffect(() => {
        if (members.length > 0){
            setCurrentUserRole(members.find((member) => member.uid == user.uid).role)
            
            if (currentUserRole !== 'user'){
                setIsAdmin(true);
            }
        }
    }, [members]);

    
    
    console.log(currentUserRole)
    const [openOwnerDialog, setOpenOwnerDialog] = React.useState(false);
    const [openAdminDialog, setOpenAdminDialog] = React.useState(false);

    const classes = useStyles();

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpenOwnerDialog(false);
            setOpenAdminDialog(false);
        }
    };

    // CLUB MEMBERS
    const getClubMembers = () => {
        console.log('getting members');
        callApiGetClubMembers()
            .then(res => {
                var parsed = JSON.parse(res.express);
                console.log('pre')
                console.log(members)

                setMembers(parsed);
                console.log('post')
                console.log(members)
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

    return ( <>
        <ClubBoardHeader active={"4"}/>
        <Grid container className={classes.root}>
            <Grid item xs={3}>
                <Card className={classes.memberCount } >
                    <img src={membersIcon} style = {{ height: '50px' } } /> 
                    <Typography className = { classes.text2 } color = 'primary' > 
                        { members.length } 
                    </Typography> 
                    <Typography className = { classes.text1 } color = "text.secondary" > 
                        Club Members
                    </Typography> 
                </Card> 
                {isAdmin &&
                    <div className = { classes.adminBtnGroup } >
                        {currentUserRole === 'owner' && <>
                        <Button 
                            onClick = {() => { setOpenOwnerDialog(true) }}
                            className = { classes.adminBtn } 
                            style = {{ background: '#283371' }}>
                                Transfer Club Ownership 
                        </Button> 
                        <TransferOwnership open={openOwnerDialog} close={handleClose} members={members.slice(1, members.length)} currentUser={user} onChange={getClubMembers}/> 
                        </>}
                        <Button 
                            onClick = {() => { setOpenAdminDialog(true) } }
                            className = { classes.adminBtn }
                            style = {{ background: '#5566c3' } } > 
                            Manage Admins 
                        </Button> 
                        <ManageAdmin open={openAdminDialog} close={handleClose} members={members} onChange={getClubMembers}/>
                    </div>}    
            </Grid> 
            <Grid item xs = { 6 } style = {{ padding: '10px 0 0 60px' }}>
                 {members.length > 0 &&
                    <TableContainer component = { Paper } >
                        <Table sx = {{ minWidth: 300 }}>
                            <TableHead >
                                <TableRow >
                                    <TableCell >
                                        <Typography>Club Members</Typography> 
                                    </TableCell> 
                                </TableRow> 
                            </TableHead> 
                            {members.map((member) => ( 
                            <TableBody >
                                <TableRow sx = {{ '&:last-child td, &:last-child th':{ border: 0 }}} >
                                    <TableCell component = "th" scope = "row" >
                                        <Grid style = {{ display: 'flex' }}>
                                            <Grid xs = { 6 }>
                                                <img src ={profile} className = { classes.profile }/>
                                                {member.name} 
                                            </Grid> 
                                            <Grid> 
                                            {member.role === 'owner' && ( 
                                                <Typography className = {[classes.role, classes.ownerRole] } > { member.role } </Typography>
                                                )} 
                                            {member.role === 'admin' && ( 
                                            <Typography className = {[classes.role, classes.adminRole] } > { member.role } </Typography>
                                            )} 
                                            {member.role === 'user' && ( 
                                            <Typography className = {[classes.role, classes.userRole] } > { member.role } </Typography>
                                            )} 
                                            </Grid> 
                                        </Grid> 
                                    </TableCell> 
                                </TableRow> 
                            </TableBody>))} 
                        </Table> 
                    </TableContainer>} 
            </Grid>        
        </Grid>
        </>)
}

export default Members;