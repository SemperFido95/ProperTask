import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import useReduxStore from '../../hooks/useReduxStore';
import { Snackbar, Alert } from '@mui/material';
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
    const [snackbar, setSnackbar] = React.useState(null);

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
    };

    const handleCloseSnackbar = () => setSnackbar(null);

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
        setSnackbar({ children: 'Property successfully updated', severity: 'success' });
        axios.put(`/api/properties/${id}`, updatedRow).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(`Error updating property: ${error}`);
            setSnackbar({ children: error.message, severity: 'error' });
        });
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const handleProcessRowUpdateError = error => {
        console.log(error);
        setSnackbar({ children: 'property update failed.', severity: 'error' });
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
            width: 100,
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
                    snackbar={snackbar}
                    setSnackbar={setSnackbar}
                />
                {!!snackbar && (
                    <Snackbar
                        open
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        onClose={handleCloseSnackbar}
                        autoHideDuration={6000}
                    >
                        <Alert {...snackbar} onClose={handleCloseSnackbar} />
                    </Snackbar>
                )}                
            </Box>
        </div>
    );
}