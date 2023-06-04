import { useDispatch } from "react-redux";
import { Modal, Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import { useState } from "react";
import useReduxStore from '../../hooks/useReduxStore';

function AssignTaskModal({ open, setOpen, style, snackbar, setSnackbar }) {
    const dispatch = useDispatch();
    const store = useReduxStore();
    const [task, setTask] = useState(0);
    const [property, setProperty] = useState(0);
    const [id, setId] = useState(0);

    const handleClose = () => {
        setOpen(false);
        dispatch({ type: 'CLEAR_PROPERTY_DETAILS' });
        dispatch({ type: 'FETCH_PROPERTY_TASKS' });
    }

    const assignTask = event => {
        event.preventDefault();
        axios.post(`/api/property-tasks`, { task: task, id: property }).then(response => {
            console.log(response);
            setSnackbar({ children: 'Task assigned', severity: 'success' });
        }).catch(error => {
            console.log(`Error assigning task: ${error}`);
            setSnackbar({ children: error.message, severity: 'error' });
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
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center', marginBottom: '30px' }} >
                    Assign Task:
                </Typography>
                <Box
                    sx={{ minWidth: 120 }}
                    component="form"
                    onSubmit={assignTask}
                    style={{ textAlign: 'center', width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto' }}
                >
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Task:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={task}
                            label="Tasks"
                            onChange={event => setTask(event.target.value)}
                            size="small"
                        >
                            {
                                store.taskReducer.map(task => (
                                    <MenuItem key={task.id} value={task.id}>{task.task}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <FormControl style={{ marginTop: '30px' }} fullWidth>
                        <InputLabel id="property-select-label">Property:</InputLabel>
                        <Select
                            labelId="property-select-label"
                            id="property-select"
                            value={property}
                            label="Property"
                            onChange={event => setProperty(event.target.value)}
                            size="small"
                        >
                            {
                                store.propertyListReducer.map(property => (
                                    <MenuItem key={property.id} value={property.id}>{property.street}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <Button style={{ marginTop: '30px' }} variant="outlined" onClick={assignTask}>Assign</Button>
                </Box>
                <h5></h5>
            </Box>
        </Modal>
    )
}

export default AssignTaskModal;