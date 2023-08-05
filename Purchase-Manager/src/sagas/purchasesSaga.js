import { call, put, takeEvery } from 'redux-saga/effects';
import firebase from '../firebase';
import * as actions from '../actions';

const db = firebase.firestore();

function* addPurchase(action) {
    const newPurchase = action.payload;
    yield call([db.collection('purchases'), 'add'], newPurchase);
    yield put({ type: actions.ADD_PURCHASE_SUCCESS, payload: newPurchase });
}

function* deletePurchase(action) {
    const purchaseId = action.payload;
    yield call([db.collection('purchases'), 'doc', purchaseId, 'delete']);
    yield put({ type: actions.DELETE_PURCHASE_SUCCESS, payload: purchaseId });
}

function* removePurchasesByProductId(action) {
    const productId = action.payload;
    // This operation might need more careful handling as it requires multiple deletes
    // You might need to fetch the documents first and then iterate over them to delete one by one
    yield call([db.collection('purchases'), 'where', 'productID', '==', productId, 'get']);
    // TODO: Add deletion code here
}

function* removePurchasesByCustomerId(action) {
    const customerId = action.payload;
    // This operation might need more careful handling as it requires multiple deletes
    // You might need to fetch the documents first and then iterate over them to delete one by one
    yield call([db.collection('purchases'), 'where', 'customerID', '==', customerId, 'get']);
    // TODO: Add deletion code here
}

export function* purchasesSaga() {
    yield takeEvery(actions.ADD_PURCHASE, addPurchase);
    yield takeEvery(actions.DELETE_PURCHASE, deletePurchase);
    yield takeEvery(actions.REMOVE_PURCHASES_BY_PRODUCT_ID, removePurchasesByProductId);
    yield takeEvery(actions.REMOVE_PURCHASES_BY_CUSTOMER_ID, removePurchasesByCustomerId);
}
