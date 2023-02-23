import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Sidebar.css";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles({
    root: {
      position: "sticky",
      top: "5rem",
      borderRadius: '0 10px 0 10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems:'center',
      boxShadow: "0px 8px 9px -5px rgb(0 0 0 / 10%), 0px 15px 22px 2px rgb(0 0 0 / 1%), 0px 6px 28px 5px rgb(0 0 0 / 1%)",
    },
  });

  export default function SideBar(props) {
    
    return(
      <ToggleButtonGroup
        className="ToggleButtonGroup"
        value={props.value}
        exclusive
        onChange={props.handleToggle}
        style={{display:'flex', flexDirection:'column'}}
      >
        <ToggleButton className='ToggleButton' value="1">
            Announcements
        </ToggleButton>
        <ToggleButton className='ToggleButton' disabled value="2">
          Upcoming Events
        </ToggleButton>
        <ToggleButton className='ToggleButton' disabled value="3">
            Polls
        </ToggleButton>
        <ToggleButton className='ToggleButton' value="4">
          Members
        </ToggleButton>
        <ToggleButton className='ToggleButton' disabled value="5">
          Photos
        </ToggleButton>
      </ToggleButtonGroup>
    );
  }