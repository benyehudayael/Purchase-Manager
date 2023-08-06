import { call, put, takeEvery } from 'redux-saga/effects';
import firebase from '../firebase';
import * as actions from '../actions/customersActions';

const db = firebase.firestore();

function* addCustomer(action) {
    try {
        const newCustomer = action.payload;
        yield call(() => db.collection('customers').add(newCustomer));
        yield put({ type: 'ADD_CUSTOMER_SUCCESS', payload: newCustomer });
    } catch (error) {
        yield put({ type: 'ADD_CUSTOMER_FAILURE', payload: error });
    }
}

function* updateCustomer(action) {
    try {
        const updatedCustomer = action.payload;
        yield call(() => db.collection('customers')
            .where('id', '==', updatedCustomer.id)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    db.collection('customers').doc(doc.id).update(updatedCustomer);
                });
            })
        );
        yield put({ type: 'UPDATE_CUSTOMER_SUCCESS', payload: updatedCustomer });
    } catch (error) {
        yield put({ type: 'UPDATE_CUSTOMER_FAILURE', payload: error });
    }
}

function* deleteCustomer(action) {
    try {
        const customerId = action.payload;
        yield call(() => db.collection('customers')
            .where('id', '==', Number(customerId))
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete().then(() => {
                        console.log('Customer successfully deleted!');
                    });
                });
            })
        );
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
