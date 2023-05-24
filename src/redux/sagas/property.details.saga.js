import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchPropertyDetails(action) {
    try {
        const response = yield axios.get(`/api/properties/${action.id}`);
        yield put({ type: 'SET_PROPERTY_DETAILS', payload: response.data });
    } catch (error) {
        console.log(`Error getting property details: ${error}`);
        alert('Something went wrong.');
    }
}

function* propertyDetailsSaga() {
    yield takeLatest('GET_PROPERTY_DETAILS', fetchPropertyDetails);
}

export default propertyDetailsSaga;