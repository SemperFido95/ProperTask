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
  const user = useSelector((store) => store.user);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '150px'
  }));

  return (
    <div className="container">
      <h2>Overview</h2>
      <div id='home-buttons' style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button variant='outlined'>New Property</Button>
        <Button variant='outlined'>New Task</Button>
        <Button variant='outlined'>Assign Tasks</Button>
      </div>
      <div id='open-tasks'>
        <h2>Open Tasks</h2>
        <Grid container spacing={2}>
          <Grid xs={3}>
            <Card sx={{ width: 250, height: 150 }}>
              <CardContent>
                <Typography>
                  123 Main St
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={3}>
            <Card sx={{ width: 250, height: 150 }}>
              <CardContent>
                <Typography>
                  123 Main St
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={3}>
            <Card sx={{ width: 250, height: 150 }}>
              <CardContent>
                <Typography>
                  123 Main St
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={3}>
            <Card sx={{ width: 250, height: 150 }}>
              <CardContent>
                <Typography>
                  123 Main St
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={3}>
            <Card sx={{ width: 250, height: 150 }}>
              <CardContent>
                <Typography>
                  123 Main St
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={3}>
            <Card sx={{ width: 250, height: 150 }}>
              <CardContent>
                <Typography>
                  123 Main St
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={3}>
            <Card sx={{ width: 250, height: 150 }}>
              <CardContent>
                <Typography>
                  123 Main St
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={3}>
            <Card sx={{ width: 250, height: 150 }}>
              <CardContent>
                <Typography>
                  123 Main St
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
