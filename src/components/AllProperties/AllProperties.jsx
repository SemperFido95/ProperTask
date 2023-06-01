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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function AllProperties() {
    const store = useReduxStore();

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
                                        <IconButton>
                                            <EditOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align='right'>
                                    <Tooltip title='Delete'>
                                        <IconButton>
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}