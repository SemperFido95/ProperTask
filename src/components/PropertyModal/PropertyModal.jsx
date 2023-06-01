import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Typography, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DeleteTask from '../DeleteTask/DeleteTask';

function PropertyModal({ open, setOpen, style }) {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const store = useSelector((store) => store);
    const dispatch = useDispatch();
    const info = Object.keys(store.propertyDetails).length === 0 ? '' : store.propertyDetails.info[0];
    const tasks = Object.keys(store.propertyDetails).length === 0 ? [''] : store.propertyDetails.tasks;
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [id, setId] = useState(0);
    const [propertyId, setPropertyId] = useState(0);

    const deleteDialog = (taskId, propertyId) => {
        setId(taskId);
        setPropertyId(propertyId)
        // console.log('task ID:', id);
        setDeleteOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        dispatch({ type: 'CLEAR_PROPERTY_DETAILS' });
        dispatch({ type: 'FETCH_PROPERTY_TASKS' });
    }

    const markComplete = (event, propertyId) => {
        console.log(event)
        let status = event.target.checked;
        let id = Number(event.target.id);
        let completeObject = {};
        status === true ? completeObject.complete = true : completeObject.complete = false;
        axios.put(`/api/properties/${id}`, completeObject).then((response) => {
            console.log(response);
            dispatch({ type: 'GET_PROPERTY_DETAILS', id: propertyId });
        }).catch((error) => {
            console.log(`Error in PUT ${error}`);
            alert('Something went wrong');
        });
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center' }} >
                    {info.street}
                </Typography>
                <Typography id="modal-modal-description" style={{ textAlign: 'center' }}>
                    {`${info.city}, ${info.state}, ${info.zip}`}
                </Typography>
                {/* <h5>Tasks:</h5> */}
                <Typography variant='h6'>
                    Tasks:
                </Typography>
                <ul style={{ paddingLeft: 0 }}>
                    {
                        tasks.map(task => (
                            <li key={task.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox defaultChecked={task.complete} id={task.id}/>}
                                            // id={task.id}
                                            
                                            label={task.task}
                                            onChange={(event) => markComplete(event, info.id)}
                                        />
                                    </FormGroup>
                                    <IconButton onClick={() => deleteDialog(task.id, info.id)}>
                                        <DeleteOutlineOutlinedIcon />
                                    </IconButton>
                                </div>
                                <Divider />
                                <DeleteTask 
                                    open={deleteOpen}
                                    setOpen={setDeleteOpen}
                                    taskId={id}
                                    propertyId={propertyId}
                                />
                            </li>
                        ))
                    }
                </ul>
            </Box>
        </Modal>
    );
}

export default PropertyModal;
