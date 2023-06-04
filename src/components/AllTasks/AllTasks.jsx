import * as React from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import useReduxStore from '../../hooks/useReduxStore';
import { Snackbar, Alert, useScrollTrigger } from '@mui/material';
import axios from 'axios';
import DeleteProperty from '../DeleteProperty/DeleteProperty';
import DeleteTask2 from '../DeleteTask/DeleteTask2';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
    GridRowModes,
    GridActionsCellItem,
} from '@mui/x-data-grid';

export default function AllTasks() {
    const dispatch = useDispatch();
    const store = useReduxStore();
    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState(0);
    const [snackbar, setSnackbar] = React.useState(null);

    useEffect(() => {
        dispatch({ type: 'FETCH_PROPERTY_TASKS' });
        setRows(store.taskReducer);
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
        setDeleteId(id);
        setOpen(true);
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
        setSnackbar({ children: 'User successfully saved', severity: 'success' });
        axios.put(`/api/tasks/${id}`, updatedRow).then(response => {
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
        setSnackbar({ children: error.message, severity: 'error' });
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 500 },
        {
            field: 'task',
            headerName: 'Task',
            editable: true,
            width: 400,
            headerAlign: 'left',
            align: 'left'
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 250,
            cellClassName: 'actions',
            headerAlign: 'right',
            align: 'right',
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
            <h2>All Tasks</h2>
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
                    slotProps={{
                        toolbar: { setRows, setRowModesModel },
                    }}
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
                <DeleteTask2
                    open={open}
                    setOpen={setOpen}
                    id={deleteId}
                    rows={rows}
                    setRows={setRows}
                />
            </Box>
        </div>
    );
}