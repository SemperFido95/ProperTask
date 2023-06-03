// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Tooltip from '@mui/material/Tooltip';
// import IconButton from '@mui/material/IconButton';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import useReduxStore from '../../hooks/useReduxStore';
// import UpdatePropertyModal from '../UpdatePropertyModal/UpdatePropertyModal';
// import DeleteProperty from '../DeleteProperty/DeleteProperty';

// export default function AllProperties() {
//     const store = useReduxStore();
//     const [open, setOpen] = React.useState(false);
//     const [deleteOpen, setDeleteOpen] = React.useState(false);

//     const style = {
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: 500,
//         bgcolor: 'background.paper',
//         border: '2px solid #000',
//         boxShadow: 24,
//         p: 4,
//     };

//     return (
//         <div>
//             <h2>All Properties</h2>
//             <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Id</TableCell>
//                             <TableCell align="right">Street</TableCell>
//                             <TableCell align="right">City</TableCell>
//                             <TableCell align="right">State</TableCell>
//                             <TableCell align="right">Zip</TableCell>
//                             <TableCell align='right'>Edit</TableCell>
//                             <TableCell align='right'>Delete</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {store.propertyListReducer.map((property) => (
//                             <TableRow
//                                 key={property.id}
//                                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                             >
//                                 <TableCell component="th" scope="row">
//                                     {property.id}
//                                 </TableCell>
//                                 <TableCell align="right">{property.street}</TableCell>
//                                 <TableCell align="right">{property.city}</TableCell>
//                                 <TableCell align="right">{property.state}</TableCell>
//                                 <TableCell align="right">{property.zip}</TableCell>
//                                 <TableCell align='right'>
//                                     <Tooltip title='Edit'>
//                                         <IconButton onClick={() => setOpen(true)}>
//                                             <EditOutlinedIcon />
//                                         </IconButton>
//                                     </Tooltip>
//                                 </TableCell>
//                                 <TableCell align='right'>
//                                     <Tooltip title='Delete'>
//                                         <IconButton onClick={() => setDeleteOpen(true)}>
//                                             <DeleteOutlineIcon />
//                                         </IconButton>
//                                     </Tooltip>
//                                 </TableCell>
//                                 <UpdatePropertyModal
//                                 id={property.id}
//                                     street={property.street}
//                                     city={property.city}
//                                     state={property.state}
//                                     zip={property.zip}
//                                     open={open}
//                                     setOpen={setOpen}
//                                     style={style}
//                                 />
//                                 <DeleteProperty 
//                                     open={deleteOpen}
//                                     setOpen={setDeleteOpen}
//                                     propertyId={property.id}
//                                 />
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </div>

//     );
// }

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import useReduxStore from '../../hooks/useReduxStore';
import axios from 'axios';
import DeleteProperty from '../DeleteProperty/DeleteProperty';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
    GridRowModes,
    GridActionsCellItem,
} from '@mui/x-data-grid';

export default function AllProperties() {
    const dispatch = useDispatch();
    const store = useReduxStore();
    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState(0);
    const [updateObject, setUpdateObject] = React.useState({});

    useEffect(() => {
        dispatch({ type: 'FETCH_PROPERTY_TASKS' });
        setRows(store.propertyListReducer);
    }, [dispatch]);

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        console.log(updateObject);

    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
        setOpen(true);
        setDeleteId(id);
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow, id) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        console.log(updatedRow);
        axios.put(`/api/properties/${id}`, updatedRow).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(`Error updating property: ${error}`);
            alert('Something went wrong.');
        });
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const handleProcessRowUpdateError = error => {
        // setSnackbar({ children: error.message, severity: 'error' });
        console.log(error);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 180 },
        {
            field: 'street',
            headerName: 'Street',
            editable: true,
            width: 250
        },
        {
            field: 'city',
            headerName: 'City',
            width: 200,
            editable: true,
        },
        {
            field: 'state',
            headerName: 'State',
            width: 10,
            editable: true,
        },
        {
            field: 'zip',
            headerName: 'Zip',
            type: 'number',
            valueGetter: (params) => {
                if (!params.value) {
                    return params.value;
                }
                return `${params.value}`;
            },
            width: 200,
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 200,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <div>
            <h2>All Properties</h2>
            <Box
                sx={{
                    height: 500,
                    width: '100%',
                    '& .actions': {
                        color: 'text.secondary',
                    },
                    '& .textPrimary': {
                        color: 'text.primary',
                    },
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStart={handleRowEditStart}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={handleProcessRowUpdateError}
                    // slots={{
                    //     toolbar: EditToolbar,
                    // }}
                    slotProps={{
                        toolbar: { setRows, setRowModesModel },
                    }}
                />
                <DeleteProperty
                    open={open}
                    setOpen={setOpen}
                    propertyId={deleteId}
                />
            </Box>
        </div>
    );
}