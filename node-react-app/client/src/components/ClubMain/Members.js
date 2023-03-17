import React, { useState } from 'react';
import { makeStyles, Checkbox, Radio, RadioGroup, FormControlLabel, TextField, InputAdornment, Box, Dialog, DialogTitle, DialogContent, DialogActions, Paper, Typography, Button, Grid, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import profile from '../../images/profile-icon.png';
import membersIcon from '../../images/members.png';
import { useUser } from '../Firebase';
import search from '../../images/search-icon.png';
import info from '../../images/info-icon.png';
import { Pagination } from "@material-ui/lab";
import ManageAdmin from './members/dialogs/ManageAdmin';
import { useParams } from 'react-router-dom';
import { serverURL } from '../../constants/config';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        padding: '20px 10px 20px 30px',

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

const Members = ({ name, members, isAdmin, onChange }) => {
    const user = useUser();

    const currentUserRole = (
        (members.find((member) => member.uid == user.uid)).role
    )
    
        console.log(currentUserRole)
    const [openOwnerDialog, setOpenOwnerDialog] = React.useState(false);
    const [openAdminDialog, setOpenAdminDialog] = React.useState(false);

    const classes = useStyles();

    // const handleClickOpen = () => {
    //     // setOpen(true);

    // };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpenOwnerDialog(false);
            setOpenAdminDialog(false);
        }
    };

    return ( 
        <Grid container className = { classes.root } >
            <Grid item xs = { 3 } >
                <Card className = { classes.memberCount } >
                    <img src = { membersIcon } style = {{ height: '50px' } } /> 
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
                        <OwnerDialog open={ openOwnerDialog }close = { handleClose } classes = { classes } members = { members.slice(1, members.length)} currentUser={user}/> 
                        </>}
                        <Button 
                            onClick = {() => { setOpenAdminDialog(true) } }
                            className = { classes.adminBtn }
                            style = {{ background: '#5566c3' } } > 
                            Manage Admins 
                        </Button> 
                        <ManageAdmin open={openAdminDialog} close={handleClose} members={members} onChange={onChange}/>
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
    )
}

export default Members;

const OwnerDialog = ({ open, close, classes, members, onChange, currentUser }) => {
    const {clubID} = useParams();
    const [searchTerm, setSearchTerm] = React.useState('');


    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value);
        setRadioBtn('');
        setSelectedMember('');
    }

    const filteredMembers = members.filter((member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [radioBtn, setRadioBtn] = React.useState('');
    const [selectedMember, setSelectedMember] = React.useState('');

    const handleRatioBtn = (e) => {
        setRadioBtn(e.target.value);
        let select = members.find((member) => member.uid === e.target.value)
        setSelectedMember(select.name)
    }


    // PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(4);

    const indexOfLastUser = (currentPage) * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredMembers.slice(indexOfFirstUser, indexOfLastUser);

    const handlePageClick = (event, value) => {
        setCurrentPage(value);
    }

    const [checked, setChecked] = React.useState(false);

    const handleCheckbox = (e) => {
        setChecked(current => !current);
        
    }

    const handleSubmit = () => {
        let role = 'user'
        if (checked){
            role = 'admin'
        }

        callApiTransferOwner(role)
            .then(res => {
                var parsed = JSON.parse(res.express);  
            })
    }

    const callApiTransferOwner = async (role) => {
        const url = serverURL + "/api/transferClubOwnership";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newOwnerID: radioBtn,
            oldOwnerID: currentUser.uid,
            clubID: clubID,
            role:role,
          }),
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };



    if (!open) return null
    return ( <>
        <Dialog open = { open } close = { close } >
            <DialogTitle style = {{ background: '#eceef8', width: '500px', borderBottom: '#eceef8 solid 1px' }} className = { classes.dialogTitle } >
                <span style = {
                    { display: 'flex', width: '100%', borderBottom: '0.5px solid #c6cceb', paddingBottom: '10px' }}>
                        Transfer Club Ownership 
                </span> 
            </DialogTitle> 
            <DialogContent style = {{ background: '#eceef8', paddingBottom: '25px', minHeight: '380px', width: '500px' }}>
                <Box component = "form" sx = {{ display: 'flex', flexWrap: 'wrap' }}>
                <Grid style = {{ marginBottom: '20px', width: '100%' }}>
                    <TextField
                    id = "outlined-basic"
                    label = "Search Members"
                    variant = "filled"
                    color = "success"
                    fullWidth value = { searchTerm }
                    onChange = { handleSearchTerm }
                    InputProps = {{
                        startAdornment: ( 
                            <InputAdornment position = "start" >
                            <img className = { classes.search }
                            src = { search }/> 
                            </InputAdornment>),
                            onKeyDown: (e) => {
                                if (e.key === 'Enter') {
                                    e.stopPropagation();
                                }
                            },className: classes.input}}
                        /> 
                </Grid> 
                <Grid style = {{ width: '100%' }}>
                    <RadioGroup
                    column
                    name = "position"
                    value = {radioBtn}
                    onChange = {handleRatioBtn}
                    className = {classes.radioGroup}
                    color = 'primary'>
                        <Grid style = {{ display: 'flex', flexDirection: 'column', background: '#fff', width: '100%', borderRadius: '8px' }}> 
                            {Object.values(currentUsers).map((member) => ( 
                                <Button className = {classes.radiobtn} style = {{background: '#fff', textTransform: 'none', borderBottom: '1px lightgray solid', borderRadius: '0' }}>
                                    <Typography style = {{marginLeft: '10px' }}>{ member.name }</Typography> 
                                    <FormControlLabel value = {member.uid}
                                    control = {< Radio />}
                                    labelPlacement = "start"
                                    color = 'primary' />
                                </Button>   
                            ))} 
                        </Grid> 
                        <Grid item style = {{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '10px' }}>
                            <Pagination 
                                variant = "outlined"
                                color = "primary"
                                shape = 'rounded'
                                count = { Math.ceil(filteredMembers.length / usersPerPage) }
                                page = { currentPage }
                                onChange = { handlePageClick }
                            /> 
                        </Grid> 
                    </RadioGroup> 
                </Grid> 
                {selectedMember &&
                    <Grid style = {{ paddingTop: '30px' }}>
                    <Typography> The selected new club owner is <b> {selectedMember}</b></Typography>
                    </Grid>} 
                <Grid style={{display:'flex', justifyContent:'end', paddingTop:'25px', width:'100%', alignItems:'center'}}>
                    <FormControlLabel control={<Checkbox value="1" onChange={handleCheckbox}/>} label="Stay as Admin?" labelPlacement="start"/>
                    {/* <img src={info} className={classes.img}/> */}
                </Grid>
            </Box>
        </DialogContent> 
        <DialogActions >
            <Button onClick = {
                () => { close();
                    setRadioBtn('');
                    setSelectedMember('') } } > Cancel </Button> 
            <Button onClick = {()=>{handleSubmit(); close();}}> Ok </Button> 
        </DialogActions> 
    </Dialog>

    </>)
};