import React, {useState} from 'react';
import { makeStyles, Radio, Button, RadioGroup, FormControlLabel, Switch, MenuItem, Select, Grid, TextField, Typography, InputLabel, Box } from '@material-ui/core';
import checkmark from '../../images/checkmark.png'
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
// import img1 from '../../images/announcements/papertemp1.jpg'
// import img2 from '../../images/announcements/papertemp2.jpg'
// import img3 from '../../images/announcements/papertemp3.jpg'
// import img4 from '../../images/announcements/papertemp4.jpg'
// import img5 from '../../images/announcements/papertemp5.jpg'
import img1 from '../../images/events/celebration.png'
import img2 from '../../images/events/meeting.png'
import img3 from '../../images/events/celebration2.png'
import img4 from '../../images/events/karaoke.png'
import img5 from '../../images/events/meeting2.png'
import img6 from '../../images/events/cocktail.png'
import img7 from '../../images/events/conference.png'
import img8 from '../../images/events/celebration3.png'
import img9 from '../../images/events/concert.png'
import img10 from '../../images/events/meeting3.jpg'


const useStyles = makeStyles((theme) => ({
    root: {
        margin:'20px auto',
    },
    btn: {
    },
    input:{
        width:'100%',
        // margin: '5px 0 10px 0',
        border: 'rgba(0, 0, 0, 0.23) 1px solid',
        padding: '10px',
        background:'white',
        borderRadius: '5px',
        border:'#e6e6e6 1px solid',
        '&:hover':{
            border:'1px solid black'
        },
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    label:{
        color:'grey',
        fontSize:'8pt',
        marginBottom:'5px',
        letterSpacing:'1px'
    },
    OutlinedTextField: {
        // ... your other styles
        "& .MuiOutlinedInput-input": {
          padding: '10px 0',
          width:'150px'
        },
        "& .MuiInputBase-root":{
            justifyContent:'center',
            display:'flex'
        }
    },
    dropdown:{
        "& .MuiSelect-root":{
            paddingLeft:'10px',
        }
    }
    
  }));

const EventForm = () => {
    const classes = useStyles();
    const [characterCountDisplay, setCharacterCountDisplay] = React.useState(310);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [startDate, setStartDate] = React.useState(dayjs().format("YYYY-MM-DD"));
    const [startTime, setStartTime] = React.useState('');
    const [endDate, setEndDate] = React.useState(dayjs().format("YYYY-MM-DD"));
    const [endTime, setEndTime] = React.useState('')
    const [locationType, setLocationType] = React.useState('')
    const [allDay, setAllDay] = React.useState(false);
    const [timeDisabled, setTimeDisabled] = React.useState(false);

    dayjs.extend(customParseFormat);
    const date1 = dayjs(startDate, "YYYY-MM-DD");
    const date2 = dayjs(endDate, "YYYY-MM-DD");
    const time1 = dayjs(startTime, "HH:mm");
    const time2 = dayjs(startTime, "HH:mm");
    console.log(time1);

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
        setCharacterCountDisplay(310 - (e.target.value).length)
    }
 
    const handleStartDate = (e) => {
        setStartDate(e.target.value);
        let newDate1 = dayjs(e.target.value,"YYYY-MM-DD")
        if (newDate1.$d > date2.$d){
            setEndDate(e.target.value);
        }
    }

    const handleStartTime = (e) => {
        setStartTime(e.target.value);
    }

    const handleEndDate = (e) => {
        setEndDate(e.target.value);
        let newDate2 = dayjs(e.target.value,"YYYY-MM-DD")
        if (newDate2.$d < date1.$d){
            setStartDate(e.target.value);
        }
    }

    const handleEndTime = (e) => {
        setEndTime(e.target.value);
    }

    const handleAllDaySwitch = (e) => {
        setAllDay(e.target.checked);
        if (e.target.checked){
            setTimeDisabled(true);
            setStartTime('');
            setEndTime('');
        }else{
            setTimeDisabled(false);
        }
    }

    const handleLocationType = (e) => {
        setLocationType(e.target.value);
        console.log(e.target.value);
    }

    // CONVERT 24HR to 12HR TIMESTAMP
    function convertTime(str) {
        let result = '';
        let hour1 = Number(str[0] - '0');
        let hour2 = Number(str[1] - '0');
        let hh;
        if (hour2) {
            hh = hour1 * 10 + hour2;
        } else {
            hh = 0
        }
        let meridien;

        if (hh < 12) {
            meridien = 'AM';
        } else {
            meridien = 'PM';
        }
        hh %= 12;

        if (hh == 0) {
            result += '12';

            for (let i = 2; i < 5; i++){
                result+=str[i]
            }
        } else {
            result += hh;
            for (let i = 2; i < 5; i++){
                result+=str[i]
            } 
        }
        result += ' ' + meridien;
        return result;
    }
    const todaysDate = dayjs().format("YYYY-MM-DD")


    // console.log(day1.$d>day2.$d);

    return(<>
        <Grid container className={classes.root}>
            <Grid container style={{margin:'20px', background:'#fff', borderRadius:'5px', width:'600px'}}>
                <Grid item fullWidth style={{width:'100%', borderBottom:'lightgrey 0.5px solid', margin:'20px'}}>
                    <Typography style={{fontWeight:'300', fontSize:'20pt', marginBottom:'10px', }}>Create Event</Typography>
                </Grid>
                <Grid item style={{width:'100%', margin:'5px 20px'}}>
                    <InputLabel className={classes.label}>NAME OF EVENT</InputLabel>
                    <input className={classes.input} placeholder='Title'/> 
                </Grid>
                <Grid item style={{width:'100%', margin:'5px 20px 20px'}}>
                    <InputLabel className={classes.label}>SHORT DESCRIPTION</InputLabel>
                    <textarea maxlength={310} onChange={handleDescription} className={classes.input} placeholder='Description' multiline rows={3} />                   
                     <Grid style={{display:'flex', justifyContent:'end', color:'grey'}} >
                       <Typography style={{fontSize:'8.5pt'}}>{characterCountDisplay}/310 Characters</Typography>
                    </Grid>
                </Grid>
                <Grid item style={{width:'100%', margin:'5px 20px', display:'flex', alignItems:'center'}}>
                    <Grid item>
                        <InputLabel className={classes.label} style={{paddingBottom:'10px'}}>
                            START DATE
                        </InputLabel>
                        <TextField 
                            type='date' 
                            variant='outlined'
                            value={startDate}
                            onChange={handleStartDate}
                            className={[classes.textField, classes.OutlinedTextField]}
                            style={{marginLeft:0}}
                            InputLabelProps={{
                                shrink:true,
                            }} />
                            
                    </Grid>
                    <Grid item>
                        <InputLabel className={classes.label} style={{paddingBottom:'10px'}}>STARTS AT</InputLabel>
                        <TextField
                            type="time"
                            variant='outlined'
                            value={startTime}
                            disabled={timeDisabled}
                            onChange={handleStartTime}
                            style={{marginLeft:0}}
                            className={[classes.textField, classes.OutlinedTextField]}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid>
                    <FormControlLabel style={{paddingLeft:'10px'}}
                        control={<Switch checked={allDay} color='primary' onChange={handleAllDaySwitch} />}
                        label="All Day"
                    />
                    </Grid>
                </Grid>
                <Grid item style={{width:'100%', margin:'5px 20px', display:'flex'}}>
                    <Grid item>                        
                        <InputLabel className={classes.label} style={{paddingBottom:'10px'}}>END DATE</InputLabel>
                        <TextField 
                            type='date'
                            variant='outlined'
                            value={endDate}
                            onChange={handleEndDate}
                            className={[classes.textField, classes.OutlinedTextField]}
                            style={{marginLeft:0}}
                            InputLabelProps={{
                                shrink:true,
                            }} />
                    </Grid>
                    <Grid item>
                        <InputLabel className={classes.label} style={{paddingBottom:'10px'}}>ENDS AT</InputLabel>
                        <TextField
                            type="time"
                            variant='outlined'
                            value={endTime}
                            disabled={timeDisabled}
                            onChange={handleEndTime}
                            style={{marginLeft:0}}
                            className={[classes.textField, classes.OutlinedTextField]}
                            inputProps={{ min: {startDate} }}
                            InputLabelProps={{
                                shrink: true,
                        
                            }}
                        />
                    </Grid>
                </Grid>

                {(startDate && startTime) &&
                <Grid style={{margin:'5px 20px', display:'flex', alignContent:'center'}}>
                    <img src={checkmark} style={{height:'18px', paddingRight:'5px'}}/>
                        This event will take place on {startDate} at {convertTime(startTime)} 
                </Grid>}
                {(endDate && startDate !== endDate) && 
                <Grid style={{margin:'5px 20px', display:'flex', alignContent:'center'}}>
                        <img src={checkmark} style={{height:'18px', paddingRight:'5px'}}/>
                        This event will take place from {startDate} to {endDate}
                </Grid>}
                <Grid item style={{width:'100%', margin:'25px 20px 5px', display:'flex', justifyContent:'space-between'}}>
                    <Grid xs={4}>
                        <InputLabel className={classes.label} style={{marginBottom:'10px'}}>LOCATION TYPE</InputLabel>
                        <Select
                            variant='outlined'
                            className={[classes.OutlinedTextField, classes.dropdown]}
                            onChange={handleLocationType}>
                            <MenuItem value={'in-person'}>In-person</MenuItem>
                            <MenuItem value={'online'}>Online</MenuItem>
                        </Select>
                    </Grid>
                    {locationType === 'online' &&
                        <Grid xs={8} style={{display:'flex', flexDirection:'column'}}>
                        <InputLabel className={classes.label}>MEETING URL</InputLabel>
                        <Grid style={{display:'flex', width:'100%'}}>
                            <Grid>
                                <input placeholder='https://' disabled style={{background:'rgba(55,55,55,0.1)', height:'44px', letterSpacing:'0.5px', padding:'10px', width:'70px',borderRadius:'5px 0 0 5px', border:'1px solid lightgrey', borderRight:0}}/>
                            </Grid>
                            <Grid style={{width:'100%'}}>
                                <input style={{width:'100%', borderRadius:'0 5px 5px 0',height:'44px', border:'1px solid lightgrey'}}/>
                            </Grid>
                        </Grid>
                    </Grid>}
                    {locationType === 'in-person' &&
                    <Grid xs={8}>
                        <InputLabel className={classes.label}>LOCATION</InputLabel>
                        <input className={classes.input} placeholder='Location'/> 
                    </Grid>}
                </Grid>
                <Grid item style={{width:'100%', margin:'25px 20px 20px', paddingBottom:'20px', borderBottom:'1px dashed lightgray', display:'flex', justifyContent:'space-between'}}>
                    <Grid xs={5} style={{display:'flex', flexDirection:'column'}}>
                        <InputLabel className={classes.label}>PRICE (optional)</InputLabel>
                        <Grid style={{display:'flex', width:'100%'}}>
                            <Grid>
                            <button disabled style={{color:'white', background:'rgb(53,134,247)', height:'44px', letterSpacing:'0.5px', padding:'10px', width:'70px',borderRadius:'5px 0 0 5px', border:'1px solid rgb(53,134,247)', borderRight:0}}>CAD$</button>
                            </Grid>
                            <Grid style={{width:'100%'}}>
                                <input type='number' style={{paddingLeft:'10px', width:'100%', borderRadius:'0 5px 5px 0',height:'44px', border:'1px solid lightgrey', borderLeft:'0'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid style={{margin:'5px 20px'}}>
                    <InputLabel className={classes.label}>SELECT A PLACEHOLDER IMAGE</InputLabel>
                    <InputLabel className={classes.label}>This is the main photo that will be displayed in the events page.</InputLabel>
                </Grid>
                <RadioGroup style={{display:'flex', flexDirection:'row', overflow:'hidden', margin:'10px'}}>
                    <Grid style={{display:'flex', overflowX:'scroll'}}>
                            <Grid style={{marginLeft:'10px', display:'flex', flexDirection:'column'}}>
                                <img src={img1} style={{height:'100px'}} />
                                <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                                    <Radio value={'1'}/>
                                </div>
                            </Grid>
                            <Grid style={{marginLeft:'10px', display:'flex', flexDirection:'column'}}>
                                <img src={img2} style={{height:'100px'}} />
                                <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                                    <Radio value={'2'}/>
                                </div>
                            </Grid>
                            <Grid style={{marginLeft:'10px', display:'flex', flexDirection:'column'}}>
                                <img src={img3} style={{height:'100px'}} />
                                <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                                    <Radio value={'3'}/>
                                </div>
                            </Grid>
                            <Grid style={{marginLeft:'10px', display:'flex', flexDirection:'column'}}>
                                <img src={img4} style={{height:'100px'}} />
                                <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                                    <Radio value={'4'}/>
                                </div>
                            </Grid>
                            <Grid style={{marginLeft:'10px', display:'flex', flexDirection:'column'}}>
                                <img src={img5} style={{height:'100px'}} />
                                <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                                    <Radio value={'5'}/>
                                </div>
                            </Grid>
                            <Grid style={{marginLeft:'10px', display:'flex', flexDirection:'column'}}>
                                <img src={img6} style={{height:'100px'}} />
                                <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                                    <Radio value={'6'}/>
                                </div>
                            </Grid>
                            <Grid style={{marginLeft:'10px', display:'flex', flexDirection:'column'}}>
                                <img src={img7} style={{height:'100px'}} />
                                <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                                    <Radio value={'7'}/>
                                </div>
                            </Grid>
                            <Grid style={{marginLeft:'10px', display:'flex', flexDirection:'column'}}>
                                <img src={img8} style={{height:'100px'}} />
                                <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                                    <Radio value={'8'}/>
                                </div>
                            </Grid>
                            <Grid style={{marginLeft:'10px', display:'flex', flexDirection:'column'}}>
                                <img src={img9} style={{height:'100px'}} />
                                <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                                    <Radio value={'9'}/>
                                </div>
                            </Grid>
                            <Grid style={{marginLeft:'10px', display:'flex', flexDirection:'column'}}>
                                <img src={img10} style={{height:'100px'}} />
                                <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                                    <Radio value={'10'}/>
                                </div>
                            </Grid>
                    </Grid>
                </RadioGroup>
                {/* <Grid style={{margin:'15px 20px 0'}}>
                    <InputLabel className={classes.label}>UPLOAD ATTACHMENTS</InputLabel>
                </Grid>
                <Grid style={{margin:'5px 20px 20px', width:'100%', background:'rgb(247,247,247)', height:'130px', borderRadius:'8px', border:'1px dashed lightgray'}}>
                    <Grid>
                        <Button variant="contained" component="label">
                            Select Files
                            <input hidden accept="image/*" multiple type="file" />
                        </Button>
                    </Grid>
                </Grid> */}
                <Grid style={{margin:'5px 20px 20px', width:'100%'}}>
                    <Button style={{width:'100%', color:'white', background:'rgb(53,134,247)'}}>Create Event
                    </Button>
                    
                </Grid>
            </Grid>
        </Grid>
    </>)
}

export default EventForm;