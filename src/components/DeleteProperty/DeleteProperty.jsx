import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Snackbar, Alert } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export default function DeleteProperty({ open, setOpen, propertyId, Snackbar, setSnackbar }) {
    const dispatch = useDispatch();

    const deleteItem = () => {
        axios.delete(`/api/properties/${propertyId}`).then(response => {
            console.log(response);
            dispatch({ type: 'FETCH_PROPERTY_TASKS' });
            handleClose();
            setSnackbar({ children: 'Property successfully deleted', severity: 'success' });
        }).catch(error => {
            console.log(`Error deleting property:`, error);
            setSnackbar({ children: error.message, severity: 'error' });
        });
    }

    const handleClose = () => {
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
                    {"Delete this property?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action is irreversible. If you wish to continue, 
                        select "delete" below. Otherwise, select "cancel" to return to the list of properties.
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{display: 'flex', justifyContent: 'space-around'}}>
                    <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                    <Button variant='outlined' color='error' onClick={deleteItem} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}