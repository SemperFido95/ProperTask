import React, { useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import useReduxStore from '../../hooks/useReduxStore';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import PropertyModal from '../PropertyModal/PropertyModal';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const [id, setId] = useState('');
  const [open, setOpen] = React.useState(false);
  const store = useReduxStore();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_PROPERTY_TASKS' });
  }, [dispatch]);



  const viewDetails = propertyId => {
    dispatch({ type: 'GET_PROPERTY_DETAILS', id: propertyId });
    dispatch({ type: 'SET_OPEN', payload: true });
  }

  return (
    <div className="container">
      <h2 style={{ marginBottom: '50px' }}>Overview</h2>
      <div id='home-buttons' style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '50px' }}>
        <Button variant='outlined'>New Property</Button>
        <Button variant='outlined'>New Task</Button>
        <Button variant='outlined'>Assign Tasks</Button>
      </div>
      <div id='open-tasks'>
        <h2 style={{ marginBottom: '50px' }}>Open Tasks</h2>
        <Grid container spacing={2}>
          {
            store.propertyTasks.map(property => (
              <Grid key={property.id} xs={3}>
                <Card>
                  <CardContent>
                    <Typography variant='h5'>
                      {property.street}
                    </Typography>
                    <Typography>
                      {property.Tasks} {parseInt(property.Tasks) === 1 ? 'open task' : 'open tasks'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => viewDetails(property.id)}>Details</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          }
        </Grid>
        <PropertyModal 
          
        />
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
