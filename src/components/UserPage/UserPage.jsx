import React, { useState } from 'react';
import { Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import useReduxStore from '../../hooks/useReduxStore';
import { Snackbar, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import PropertyModal from '../PropertyModal/PropertyModal';
import NewPropertyModal from '../NewPropertyModal/NewPropertyModal';
import NewTaskModal from '../NewTaskModal/NewTaskModal';
import AssignTaskModal from '../AssignTaskModal/AssignTaskModal';

function UserPage() {
  const [propertyOpen, setPropertyOpen] = useState(false);
  const [newPropertyOpen, setNewPropertyOpen] = useState(false);
  const [newTaskOpen, setNewTaskOpen] = useState(false);
  const [assignTaskOpen, setAssignTaskOpen] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const store = useReduxStore();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_PROPERTY_TASKS' });
  }, [dispatch]);

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

  const handleCloseSnackbar = () => setSnackbar(null);

  return (
    <div className="container">
      <h2 style={{ marginBottom: '50px' }}>Overview</h2>
      <div id='home-buttons' style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '50px' }}>
        <Button variant='outlined' onClick={() => setNewPropertyOpen(true)}>New Property</Button>
        <Button variant='outlined' onClick={() => setNewTaskOpen(true)}>New Task</Button>
        <Button variant='outlined' onClick={() => setAssignTaskOpen(true)}>Assign Tasks</Button>
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
          snackbar={snackbar}
          setSnackbar={setSnackbar}
        />
        <NewPropertyModal
          open={newPropertyOpen}
          setOpen={setNewPropertyOpen}
          style={style}
          snackbar={snackbar}
          setSnackbar={setSnackbar}
        />
        <NewTaskModal
          open={newTaskOpen}
          setOpen={setNewTaskOpen}
          style={style}
          snackbar={snackbar}
          setSnackbar={setSnackbar}
        />
        <AssignTaskModal
          open={assignTaskOpen}
          setOpen={setAssignTaskOpen}
          style={style}
          snackbar={snackbar}
          setSnackbar={setSnackbar}
        />
        {!!snackbar && (
          <Snackbar
            open
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={handleCloseSnackbar}
            autoHideDuration={6000}
          >
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </div>
    </div>
  );
}

export default UserPage;
