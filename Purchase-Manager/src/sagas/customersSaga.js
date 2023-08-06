import { call, put, takeEvery } from 'redux-saga/effects';
import firebase from '../firebase';
import * as actions from '../actions/customersActions';

const db = firebase.firestore();
const COLLECTION = 'customers';
const ID = 'id';

const addCustomerToDB = (customer) => db.collection(COLLECTION).add(customer);
const updateCustomerInDB = (customer) => db.collection(COLLECTION)
    .where(ID, '==', customer.id)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            db.collection(COLLECTION).doc(doc.id).update(customer);
        });
    });
const deleteCustomerFromDB = (customerId) => db.collection(COLLECTION)
    .where(ID, '==', Number(customerId))
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            doc.ref.delete();
        });
    });

const addCustomer = function* ({ payload: newCustomer }) {
    try {
        yield call(addCustomerToDB, newCustomer);
        yield put({ type: 'ADD_CUSTOMER_SUCCESS', payload: newCustomer });
    } catch (error) {
        yield put({ type: 'ADD_CUSTOMER_FAILURE', payload: error });
    }
}

const updateCustomer = function* ({ payload: updatedCustomer }) {
    try {
        yield call(updateCustomerInDB, updatedCustomer);
        yield put({ type: 'UPDATE_CUSTOMER_SUCCESS', payload: updatedCustomer });
    } catch (error) {
        yield put({ type: 'UPDATE_CUSTOMER_FAILURE', payload: error });
    }
}

const deleteCustomer = function* ({ payload: customerId }) {
    try {
        yield call(deleteCustomerFromDB, customerId);
        yield put({ type: 'DELETE_CUSTOMER_SUCCESS', payload: customerId });
    } catch (error) {
        yield put({ type: 'DELETE_CUSTOMER_FAILURE', payload: error });
    }
}

export function* customersSaga() {
    yield takeEvery(actions.ADD_CUSTOMER, addCustomer);
    yield takeEvery(actions.UPDATE_CUSTOMER, updateCustomer);
    yield takeEvery(actions.DELETE_CUSTOMER, deleteCustomer);
}
