import { useDispatch } from "react-redux";
import { Modal, Typography, Box, TextField, Button, FormLabel } from '@mui/material';
import axios from "axios";
import { useState } from "react";

function NewPropertyModal({ open, setOpen, style, snackbar, setSnackbar }) {
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('')
    const [state, setState] = useState('');
    const [zip, setZip] = useState(0);
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
        dispatch({ type: 'CLEAR_PROPERTY_DETAILS' });
        dispatch({ type: 'FETCH_PROPERTY_TASKS' });
    }

    const addProperty = event => {
        event.preventDefault();
        const propertyObject = {
            street,
            city,
            state,
            zip
        }

        axios.post('/api/properties', propertyObject).then(response => {
            console.log('posting new property');
            handleClose();
            setSnackbar({ children: 'Property successfully created', severity: 'success' });
        }).catch(error => {
            console.log(`Error adding property: ${error}`);
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
            <Box
                sx={style}
                autoComplete="off"
            >
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center', marginBottom: '30px' }} >
                    New Property:
                </Typography>
                <Box
                    component="form"
                    onSubmit={addProperty}
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <TextField
                            id="outlined-success"
                            label="Street"
                            onChange={event => setStreet(event.target.value)}
                            size="small"
                        />
                        <TextField
                            id="outlined-success"
                            label="City"
                            onChange={event => setCity(event.target.value)}
                            size="small"
                        />
                        <TextField
                            id="outlined-success"
                            label="State"
                            onChange={event => setState(event.target.value)}
                            size="small"
                        />
                        <TextField
                            id="outlined-success"
                            label="Zip"
                            onChange={event => setZip(event.target.value)}
                            size="small"
                        />
                        <Button type="submit" variant="outlined">Add</Button>
                    </div>
                </Box>
            </Box>
        </Modal>
    )
}

export default NewPropertyModal;