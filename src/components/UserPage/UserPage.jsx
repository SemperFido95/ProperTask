import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { Button } from '@mui/material';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Overview</h2>
      <div id='home-buttons' style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button variant='outlined'>New Property</Button>
        <Button variant='outlined'>New Task</Button>
        <Button variant='outlined'>Assign Tasks</Button>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
