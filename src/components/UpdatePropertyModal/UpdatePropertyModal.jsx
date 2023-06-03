import { useDispatch } from "react-redux";
import { Modal, Typography, Box, TextField, Button, FormLabel } from '@mui/material';
import axios from "axios";
import { useState } from "react";

function UpdatePropertyModal({ open, setOpen, style, id, street, city, state, zip }) {
    const [newStreet, setNewStreet] = useState('');
    const [newCity, setNewCity] = useState('')
    const [newState, setNewState] = useState('');
    const [newZip, setNewZip] = useState(0);
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
        dispatch({ type: 'CLEAR_PROPERTY_DETAILS' });
        dispatch({ type: 'FETCH_PROPERTY_TASKS' });
    }

    const updateProperty = event => {
        event.preventDefault();
        const streetValue = newStreet === '' ? street : newStreet;
        const cityValue = newCity === '' ? city : newCity;
        const stateValue = newState === '' ? state : newState;
        const zipValue = newZip === 0 ? zip : newZip;
        const propertyObject = {
            streetValue,
            cityValue,
            stateValue,
            zipValue
        }

        axios.put(`/api/properties/${id}`, propertyObject).then(response => {
            console.log(response);
            handleClose();
        }).catch(error => {
            console.log(`Error adding property: ${error}`);
            alert('Something went wrong.');
        });
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ backgroundColor: 'none' }}
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
                    onSubmit={updateProperty}
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <TextField
                            id="outlined-success"
                            placeholder={street}
                            onChange={event => setNewStreet(event.target.value)}
                            size="small"
                        />
                        <TextField
                            placeholder={city}
                            id="outlined-success"
                            onChange={event => setNewCity(event.target.value)}
                            size="small"
                        />
                        <TextField
                            id="outlined-success"
                            placeholder={state}
                            onChange={event => setNewState(event.target.value)}
                            size="small"
                        />
                        <TextField
                            id="zip-field"
                            placeholder={zip}
                            onChange={event => setNewZip(event.target.value)}
                            size="small"
                        />
                        <Button type="submit" variant="contained">Update</Button>
                    </div>
                </Box>
            </Box>
        </Modal>
    )
}

export default UpdatePropertyModal;