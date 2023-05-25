import { useDispatch } from "react-redux";
import { Modal, Typography, Box } from '@mui/material';
import axios from "axios";

function AssignTaskModal({ open, setOpen, style }) {
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
        dispatch({ type: 'CLEAR_PROPERTY_DETAILS' });
        dispatch({ type: 'FETCH_PROPERTY_TASKS' });
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
                    Assign Task:
                </Typography>
                <Typography id="modal-modal-description">
                </Typography>
                <h5></h5>
            </Box>
        </Modal>
    )
}

export default AssignTaskModal;