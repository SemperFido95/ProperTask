import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM

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
          <Grid xs={3}>
            <Card>
              <CardContent>
                <Typography variant='h5'>
                  123 Main St
                </Typography>
                <Typography>
                  Tasks: 2
                </Typography>
              </CardContent>
              <CardActions>
                <Button>Details</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid xs={3}>
            <Card>
              <CardContent>
                <Typography variant='h5'>
                  123 Main St
                </Typography>
                <Typography>
                  Tasks: 2
                </Typography>
              </CardContent>
              <CardActions>
                <Button>Details</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid xs={3}>
            <Card>
              <CardContent>
                <Typography variant='h5'>
                  123 Main St
                </Typography>
                <Typography>
                  Tasks: 2
                </Typography>
              </CardContent>
              <CardActions>
                <Button>Details</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid xs={3}>
            <Card>
              <CardContent>
                <Typography variant='h5'>
                  123 Main St
                </Typography>
                <Typography>
                  Tasks: 2
                </Typography>
              </CardContent>
              <CardActions>
                <Button>Details</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid xs={3}>
            <Card>
              <CardContent>
                <Typography variant='h5'>
                  123 Main St
                </Typography>
                <Typography>
                  Tasks: 2
                </Typography>
              </CardContent>
              <CardActions>
                <Button>Details</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid xs={3}>
            <Card>
              <CardContent>
                <Typography variant='h5'>
                  123 Main St
                </Typography>
                <Typography>
                  Tasks: 2
                </Typography>
              </CardContent>
              <CardActions>
                <Button>Details</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid xs={3}>
            <Card>
              <CardContent>
                <Typography variant='h5'>
                  123 Main St
                </Typography>
                <Typography>
                  Tasks: 2
                </Typography>
              </CardContent>
              <CardActions>
                <Button>Details</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid xs={3}>
            <Card>
              <CardContent>
                <Typography variant='h5'>
                  123 Main St
                </Typography>
                <Typography>
                  Tasks: 2
                </Typography>
              </CardContent>
              <CardActions>
                <Button>Details</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
