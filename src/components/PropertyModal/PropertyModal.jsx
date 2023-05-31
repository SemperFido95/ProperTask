import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Typography, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import PropertyPopover from '../PropertyPopover/PropertyPopover';

function PropertyModal({ open, setOpen, style }) {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const store = useSelector((store) => store);
    const dispatch = useDispatch();
    const info = Object.keys(store.propertyDetails).length === 0 ? '' : store.propertyDetails.info[0];
    const tasks = Object.keys(store.propertyDetails).length === 0 ? [''] : store.propertyDetails.tasks;

    const handleClose = () => {
        setOpen(false);
        dispatch({ type: 'CLEAR_PROPERTY_DETAILS' });
        dispatch({ type: 'FETCH_PROPERTY_TASKS' });
    }

    const markComplete = (event, propertyId) => {
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
        })
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'left' }} >
                    {info.street}
                </Typography>
                <Typography id="modal-modal-description">
                    {`${info.city}, ${info.state}, ${info.zip}`}
                </Typography>
                <h5>Tasks:</h5>
                {/* <ul>
                    {
                        tasks.map(task => (
                            <li key={task.id}>
                                <input id={task.id} type="checkbox" defaultChecked={task.complete} onChange={(event) => markComplete(event, info.id)} />
                                {task.task}
                            </li>
                        ))
                    }
                </ul> */}
                <ul style={{paddingLeft: 0}}>
                    {
                        tasks.map(task => (
                            <li key={task.id}>
                                <PropertyPopover 
                                    id={task.id}
                                    complete={task.complete}
                                    task={task.task}
                                />
                                {/* <input id={task.id} type="checkbox" defaultChecked={task.complete} onChange={(event) => markComplete(event, info.id)} />
                                {task.task} */}
                            </li>
                        ))
                    }
                </ul>
                
            </Box>
        </Modal>
    );
}

export default PropertyModal;
