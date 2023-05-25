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
import NewPropertyModal from '../NewPropertyModal/NewPropertyModal';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const [id, setId] = useState('');
  const [propertyOpen, setPropertyOpen] = useState(false);
  const [newPropertyOpen, setNewPropertyOpen] = useState(false);
  const [newTaskOpen, setNewTaskOpen] = useState(false);
  const [assignTaskOpen, setAssignTaskOpen] = useState(false);
  const store = useReduxStore();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_PROPERTY_TASKS' });
  }, [dispatch]);

  const newPropertyModal = () => {
    setNewPropertyOpen(true);
  }

  const viewDetails = propertyId => {
    dispatch({ type: 'GET_PROPERTY_DETAILS', id: propertyId });
    setPropertyOpen(true);
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

  return (
    <div className="container">
      <h2 style={{ marginBottom: '50px' }}>Overview</h2>
      <div id='home-buttons' style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '50px' }}>
        <Button variant='outlined' onClick={() => newPropertyModal()}>New Property</Button>
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
          open={propertyOpen}
          setOpen={setPropertyOpen}
          style={style}
        />
        <NewPropertyModal 
          open={newPropertyOpen}
          setOpen={setNewPropertyOpen}
          style={style}
        />
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
