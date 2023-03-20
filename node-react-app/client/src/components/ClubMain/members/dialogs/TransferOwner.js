import React, {useState} from 'react';
import { makeStyles, Radio, RadioGroup, FormControlLabel, TextField, InputAdornment, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Grid, } from '@material-ui/core';
import search from '../../../../images/search-icon.png';
import { Pagination } from "@material-ui/lab";
import { serverURL } from '../../../../constants/config';
import { useParams } from 'react-router-dom';
import caution from '../../../../images/caution-icon.png';


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

const TransferOwnership = ({ open, close, members, onChange, currentUser, changeUserStatus }) => {
    const classes = useStyles();
    const {clubID} = useParams();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [openConfirmationDialog, setOpenConfirmationDialog] = React.useState(false);

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

    const handleSubmit = () => {
        changeUserStatus('admin'); 

        callApiTransferOwner()
            .then(res => {
                var parsed = JSON.parse(res.express);
                onChange();
            })
    }

    const callApiTransferOwner = async () => {
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
            role:'admin',
          }),
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    const [disabled, setDisabled] = React.useState(true);

    React.useEffect(() => {
        if (radioBtn !== ''){
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [radioBtn])


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
            </Box>
        </DialogContent> 
        <DialogActions >
            <Button onClick = {
                () => { close();
                    setRadioBtn('');
                    setSelectedMember('') } } > Cancel </Button> 
            <Button disabled={disabled} onClick = {()=>{setOpenConfirmationDialog(true);}}> Ok </Button> 
            <ConfirmationDialog 
                open={openConfirmationDialog}
                back={()=>{setOpenConfirmationDialog(false)}} 
                cancel={close} 
                onSubmit={handleSubmit}
                members={members}
                selectedMember={selectedMember}/>
        </DialogActions> 
    </Dialog>

    </>)
};

export default TransferOwnership;

const ConfirmationDialog = ({open, back, cancel, onSubmit, selectedMember}) => {
    const classes = useStyles();

    if (!open) return null
    return(
    <Dialog open={open} close={back} >
        <DialogContent style={{background:'#eceef8', paddingBottom:'10px', minHeight:'120px', width:'400px'}}>
            <Grid container style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <img src={caution} style={{width:'75px', marginBottom:'5px'}} />
                <Grid item style={{display:'flex', justifyContent:'center'}}>
                    <Box style={{textAlign:'center'}}>
                        <Typography style={{margin:'0 0 20px 0'}}>
                            Are you sure you want to transfer club ownership to <b>{selectedMember}</b>?
                            <br /><br />
                            <p style={{color:'red'}}>You will lose club owner privileges and be downgraded to admin</p>
                        </Typography>
                    </Box> 
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions style={{display:'flex', justifyContent:'space-between'}}>
            <Grid>
                <Button onClick={()=>{back();}}>Back</Button>
            </Grid>
            <Grid>
                <Button onClick={()=>{back();cancel();}}>Cancel</Button>
                <Button onClick={()=>{back();cancel(); onSubmit();}}>Confirm</Button>
            </Grid>
        </DialogActions>
    </Dialog >
    )
}