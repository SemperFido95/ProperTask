import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export default function DeleteTask2({ open, setOpen, rows, setRows, taskId, id }) {
    const dispatch = useDispatch();

    const deleteItem = () => {
        axios.delete(`/api/tasks/${id}`).then(response => {
            console.log(response);
            setRows(rows.filter((row) => row.id !== id));
            handleClose();
        }).catch(error => {
            console.log(`Error deleting property task:`, error);
            alert('Something went wrong.');
        });
    }

    const handleClose = () => {
        dispatch({ type: 'FETCH_PROPERTY_TASKS' });
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete this task?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action is irreversible. If you wish to continue,
                        select "delete" below. Otherwise, select "cancel" to return to the list of tasks.
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                    <Button variant='outlined' color='error' onClick={deleteItem} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}