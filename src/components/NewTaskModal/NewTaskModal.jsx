import { useDispatch } from "react-redux";
import { Modal, Typography, Box, TextField, Button } from '@mui/material';
import axios from "axios";
import { useState } from "react";

function NewTaskModal({ open, setOpen, style, snackbar, setSnackbar }) {
    const dispatch = useDispatch();
    const [task, setTask] = useState('');

    const handleClose = () => {
        setOpen(false);
        dispatch({ type: 'CLEAR_PROPERTY_DETAILS' });
        dispatch({ type: 'FETCH_PROPERTY_TASKS' });
    }

    const addTask = event => {
        event.preventDefault();

        axios.post('/api/tasks', { task }).then(response => {
            console.log(response);
            setSnackbar({ children: 'Task successfully created', severity: 'success' });
        }).catch(error => {
            console.log(`Error adding task: ${error}`);
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
                    New Task:
                </Typography>
                <Typography id="modal-modal-description">
                </Typography>
                <Box
                    component="form"
                    onSubmit={addTask}
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField
                            id="outlined-success"
                            label="Task"
                            onChange={event => setTask(event.target.value)}
                            size="small"
                        />
                        <Button type="submit" variant="outlined">Add</Button>
                    </div>
                </Box>
            </Box>
        </Modal>
    )
}

export default NewTaskModal;