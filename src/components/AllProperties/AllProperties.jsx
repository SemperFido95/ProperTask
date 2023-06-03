import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import useReduxStore from '../../hooks/useReduxStore';
import UpdatePropertyModal from '../UpdatePropertyModal/UpdatePropertyModal';
import DeleteProperty from '../DeleteProperty/DeleteProperty';

export default function AllProperties() {
    const store = useReduxStore();
    const [open, setOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);

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
        <div>
            <h2>All Properties</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Street</TableCell>
                            <TableCell align="right">City</TableCell>
                            <TableCell align="right">State</TableCell>
                            <TableCell align="right">Zip</TableCell>
                            <TableCell align='right'>Edit</TableCell>
                            <TableCell align='right'>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {store.propertyListReducer.map((property) => (
                            <TableRow
                                key={property.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {property.id}
                                </TableCell>
                                <TableCell align="right">{property.street}</TableCell>
                                <TableCell align="right">{property.city}</TableCell>
                                <TableCell align="right">{property.state}</TableCell>
                                <TableCell align="right">{property.zip}</TableCell>
                                <TableCell align='right'>
                                    <Tooltip title='Edit'>
                                        <IconButton onClick={() => setOpen(true)}>
                                            <EditOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align='right'>
                                    <Tooltip title='Delete'>
                                        <IconButton onClick={() => setDeleteOpen(true)}>
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <UpdatePropertyModal
                                id={property.id}
                                    street={property.street}
                                    city={property.city}
                                    state={property.state}
                                    zip={property.zip}
                                    open={open}
                                    setOpen={setOpen}
                                    style={style}
                                />
                                <DeleteProperty 
                                    open={deleteOpen}
                                    setOpen={setDeleteOpen}
                                    propertyId={property.id}
                                />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}