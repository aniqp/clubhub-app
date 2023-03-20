import React, {useState} from 'react';
import { Tooltip, makeStyles, Radio, RadioGroup, FormControlLabel, TextField, InputAdornment, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Grid, } from '@material-ui/core';
import search from '../../../../images/search-icon.png';
import add from '../../../../images/add-icon.png';
import remove from '../../../../images/remove-icon.png';
import caution from '../../../../images/caution-icon.png';
import { Pagination } from "@material-ui/lab";
import { serverURL } from '../../../../constants/config';

const useStyles = makeStyles((theme) => ({
    adminBtnGroup:{
        display:'flex', 
        flexDirection:'column',
    },
    adminBtn:{
        minWidth:'130px',
        padding:'5px 15px',
        color:'white',
        borderRadius:'8px',
        textTransform:'none',
        marginBottom:'10px'
    },
    input: {
        background: '#fff'
    },
    search:{
        height:'20px'
    },
    img:{
        height:'30px'
    },
    radiobtn:{
        background:'#fff',
        textTransform:'none',
        width:'100%',
        justifyContent:'space-between',
    }, 
    radioFont:{
        padding:'15px',
        color:'#36454F',
        fontWeight:'600'
    },
    select:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        minWidth:'200px',
        textTransform:'none',
        background:'#fff',
        padding:'15px',
        border: "0.5px solid #36454F",
        borderRadius:'4px',
        "&:hover": {
            border: "2px solid #36454F",
            color:'white'
          }

    }, activeButton:{
        border:'2px solid #36454F'
    },
}));

const ManageAdminDialog = ({open, close, members, onChange, currentUser}) => {
    const classes = useStyles();

    const [openConfirmationDialog, setOpenConfirmationDialog] = React.useState(false);

    const currentAdmins = members.filter((member) => (
        (member.role.includes('admin' || 'owner')) && (member.uid != currentUser.uid))
    );  

    const currentMembers = members.filter((member) => (
        member.role.includes('user'))
    ); 

    const [btn, setBtn] = React.useState('');
    const [addAdmin, setAddAdmin] = React.useState('');
    const [removeAdmin, setRemoveAdmin] = React.useState('');
    const [isAddActive, setIsAddActive] = React.useState(false);
    const [isRemoveActive, setIsRemoveActive] = React.useState(false);
    
    const handleSubmit = () => {
        // Add new admin
        if (btn === '1'){
            callApiAddAdmin()
            .then(res => {
                var parsed = JSON.parse(res.express); 
                setAddAdmin('');
                setIsAddActive(false);
                onChange();
            })

        }
        // Remove admin
        if (btn === '2'){
            callApiRemoveAdmin()
            .then(res => {
                var parsed = JSON.parse(res.express); 
                setRemoveAdmin('');
                setIsRemoveActive(false);
                onChange();
            })
        }
        setBtn('');
    }

    const callApiAddAdmin = async () => {
        const url = serverURL + "/api/addAdmin";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: addAdmin,
          }),
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    const callApiRemoveAdmin = async () => {
        const url = serverURL + "/api/removeAdmin";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: removeAdmin,
          }),
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    const handleAddClick = (e) => {
        setIsAddActive(current => !current);
        setBtn('1');
        if (isRemoveActive){
            setIsRemoveActive(current => !current);
            setRemoveAdmin('');
        }
    }

    const handleRemoveClick = (e) => {
        setIsRemoveActive(current => !current);
        setBtn('2');
        if (isAddActive){
            setIsAddActive(current => !current);
            setAddAdmin('');
        }
    }

    const [disabled, setDisabled] = React.useState(true);

    React.useEffect(() => {
        console.log('check')
        console.log('')
        if ((btn !=='') && (addAdmin !== '' || removeAdmin !=='')){
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [btn, addAdmin, removeAdmin])

    if (!open) return null
    return(<>
        <Dialog open={open} close={close} >
            <DialogTitle style={{background:'#eceef8', width:'500px', borderBottom:'#eceef8 solid 1px'}} className={classes.dialogTitle}>
                <span style={{display:'flex', width:'100%', borderBottom:'0.5px solid #c6cceb', paddingBottom:'10px'}}>Manage Club Admins</span>
            </DialogTitle>
            <DialogContent style={{background:'#eceef8', paddingBottom:'40px', minHeight:'120px', width:'500px'}}>
                <Grid className={classes.test} style={{display:'flex', justifyContent:'space-between'}}>
                    <button name='add' 
                        className={`${classes.select} ` + (isAddActive && `${classes.activeButton}`)}
                        onClick={handleAddClick} >
                        <img src={add} className={classes.img} />
                        <Typography 
                            className={classes.radioFont}>Add Admin</Typography>
                    </button>
                    <button 
                        name='remove' 
                        className={`${classes.select} ` + (isRemoveActive && `${classes.activeButton}`)}
                        onClick={handleRemoveClick} >
                        <img src={remove} className={classes.img} />
                        <Typography className={classes.radioFont}>Remove Admin</Typography>
                    </button>
                </Grid>
                <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {btn === '1' && 
                    <List title={"Select a member to become admin"} arr={currentMembers} onSelect={setAddAdmin}/>}
                    {btn === '2' && 
                    <List title={"Select an admin to remove"} arr={currentAdmins} onSelect={setRemoveAdmin}/>}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{close(); setBtn('');}}>Cancel</Button>
                <Button disabled={disabled} id='submit-btn' onClick={()=>{setOpenConfirmationDialog(true);}}>Submit</Button>
                <ConfirmationDialog 
                    open={openConfirmationDialog} 
                    back={()=>{setOpenConfirmationDialog(false)}} 
                    cancel={close} 
                    onSubmit={handleSubmit}
                    addAdmin={addAdmin}
                    removeAdmin={removeAdmin}
                    add={isAddActive}
                    members={members}
                    />
            </DialogActions>
        </Dialog >
        </>)
};

export default ManageAdminDialog;

const AdminPagination = ({arr, numPerPage}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const numberOfElementsPerPage = numPerPage;

    const indexOfLastElement = (currentPage) * numberOfElementsPerPage;
    const indexOfFirstElement = indexOfLastElement - numberOfElementsPerPage;
    const currentElements = arr.slice(indexOfFirstElement, indexOfLastElement);
    
    const handlePageClick = (event, value) => {
        setCurrentPage(value);
    }

    return(<>
        <Pagination variant="outlined" color="primary" shape='rounded' count={Math.ceil(currentElements.length/numberOfElementsPerPage)} page={currentPage} onChange={handlePageClick} />
    </>)
}

const List = ({title, arr, onSelect}) => {
    const classes = useStyles();
    const [radioBtn, setRadioBtn] = React.useState('1');
    const [selectedMember, setSelectedMember] = React.useState(''); 
    const [searchTerm, setSearchTerm] = React.useState('');
    
    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value);
        setRadioBtn('');
        setSelectedMember('');
    }

    const handleRatioBtn = (e) => {
        setRadioBtn(e.target.value);
        onSelect(e.target.value);
    }

    const filteredMembers = arr.filter((member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return(
    <Grid style={{width:'100%', marginTop:'30px', paddingTop:'20px', borderTop:'0.5px solid #c6cceb'}} >
        <Typography style={{paddingBottom:'10px'}}><b>{title}</b></Typography>
        <Search value={searchTerm} onChange={handleSearchTerm}/> 
        <RadioGroup
            column
            name="position"
            value={radioBtn}
            onChange={handleRatioBtn}
            className={classes.radioGroup}
            color='primary'
                >
            <Grid style={{display:'flex', flexDirection:'column', background:'#fff', width:'100%', borderRadius:'8px'}}>
                {Object.values(filteredMembers).map((member) => (
                    <Button className={classes.radiobtn} style={{background:'#fff', textTransform:'none', borderBottom:'1px lightgray solid', borderRadius:'0'}}>
                        <Typography style={{marginLeft:'10px'}}>{member.name}</Typography>
                        <FormControlLabel
                            value={member.uid}
                            control={<Radio />}
                            labelPlacement="start"
                            color='primary'
                        />  
                    </Button>   
                    ))}
                </Grid>
                <Grid item style={{display:'flex', justifyContent:'center', width:'100%', marginTop:'10px'}}>
                    <AdminPagination arr={arr} numPerPage={5} />
                </Grid>
            </RadioGroup>
            {selectedMember && 
            <Grid style={{paddingTop:'30px'}}>
                <Typography>The selected new club owner is <b>{selectedMember}</b></Typography>
            </Grid>
            }
       </Grid> )
}

const Search = ({value, onChange}) => {
    const classes = useStyles();

    return(<>
    <Grid style={{marginBottom:'20px', width:'100%'}}>
        <TextField 
            id="outlined-basic" 
            label="Search Members" 
            variant="filled"
            color="success"
            fullWidth
            value={value}
            onChange={onChange} 
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <img className={classes.search} src={search} />
                </InputAdornment>),
                onKeyDown: (e) => {
                    if (e.key === 'Enter') {
                    e.stopPropagation();
                    }
                }, className: classes.input}} />
    </Grid>
    </>)

}

const ConfirmationDialog = ({open, back, cancel, addAdmin, removeAdmin, add, members, onSubmit}) => {
    const classes = useStyles();
    let user = ""
    let title = ""
    let action = ""

    if (add){
        title = "Add Club Admin"
        user = members.find((member) => member.uid == addAdmin);
        if (user){
            action = "Are you sure you want to make the following user a club admin?"
            user = user.name;
        }
    } else {
        title = "Remove Club Admin"
        user = members.find((member) => member.uid == removeAdmin);
        if (user) {
            action = "Are you sure you want to remove the following user from club admins?"
            user = user.name;
        }
    }

    if (!open) return null
    return(
    <Dialog open={open} close={back} >
        <DialogContent style={{background:'#eceef8', paddingBottom:'10px', minHeight:'120px', width:'400px'}}>
            <Grid container style={{display:'flex', flexDirection:'column'}}>
                    <Grid item style={{display:'flex', justifyContent:'center'}}>
                        <Box style={{textAlign:'center'}}>
                            <Typography style={{margin:'0 0 20px 0'}}>
                                {action}
                                <br /><br />
                                <b>{user}</b>
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