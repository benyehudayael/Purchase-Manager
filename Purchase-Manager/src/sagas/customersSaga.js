import { call, put, takeEvery } from 'redux-saga/effects';
import firebase from '../firebase';
import * as actions from '../actions/customersActions';

const db = firebase.firestore();

function* addCustomer(action) {
    const newCustomer = action.payload;
    yield call([db.collection('customers'), 'add'], newCustomer);
    yield put({ type: actions.ADD_CUSTOMER_SUCCESS, payload: newCustomer });
}

function* updateCustomer(action) {
    const updatedCustomer = action.payload;
    yield call([db.collection('customers'), 'doc', updatedCustomer.id, 'update'], updatedCustomer);
    yield put({ type: actions.UPDATE_CUSTOMER_SUCCESS, payload: updatedCustomer });
}

function* deleteCustomer(action) {
    const customerId = action.payload;
    yield call([db.collection('customers'), 'doc', customerId, 'delete']);
    yield put({ type: actions.DELETE_CUSTOMER_SUCCESS, payload: customerId });
}

export function* customersSaga() {
    yield takeEvery(actions.ADD_CUSTOMER, addCustomer);
    yield takeEvery(actions.UPDATE_CUSTOMER, updateCustomer);
    yield takeEvery(actions.DELETE_CUSTOMER, deleteCustomer);
}
