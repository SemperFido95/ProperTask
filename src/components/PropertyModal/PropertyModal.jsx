import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Typography, Box } from '@mui/material';
import { useDispatch } from 'react-redux';

function PropretyModal() {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const store = useSelector((store) => store);
    const dispatch = useDispatch();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            open={store.modalReducer}
            onClose={() => dispatch({ type: 'SET_OPEN', payload: false })}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'left' }} >
                    {Object.keys(store.propertyDetails).length === 0 ? '' : store.propertyDetails.info[0].street}
                </Typography>
                <Typography id="modal-modal-description">
                    {Object.keys(store.propertyDetails).length === 0 ? ''

                        :

                        `${store.propertyDetails.info[0].city}, 
                        ${store.propertyDetails.info[0].state}, 
                        ${store.propertyDetails.info[0].zip}`
                    }
                </Typography>
                <h5>Tasks:</h5>
                {/* <Typography>
                    <ul>
                        {

                        }
                    </ul>
                </Typography> */}
            </Box>
        </Modal>
    );
}

export default PropretyModal;
