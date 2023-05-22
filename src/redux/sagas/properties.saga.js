import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { response } from 'express';

// properties Saga: will be loaded when user logs in 

function* fetchPropertyTasks() {
    try {
        // get all properties for logged in user
        const response = yield axios.get('/api/property-tasks');

        yield put({ type: 'SET_PROPERTY_TASKS', payload: response.data });
    } catch (error) {
        console.log (`Error getting properties: ${error}`);
        alert('Something went wrong.');
    }
}

function* propertyTaskSaga() {
    yield takeLatest('FETCH_PROPERTY_TASKS', fetchPropertyTasks);
}

export default propertyTaskSaga;