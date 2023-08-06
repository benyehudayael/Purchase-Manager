import { call, put, takeEvery, all } from 'redux-saga/effects';
import firebase from '../firebase';
import * as actions from '../actions/purchasesActions';

const db = firebase.firestore();

function* addPurchase(action) {
  try {
    const newPurchase = action.payload;
    yield call(() => db.collection('purchases').add(newPurchase));
    yield put({ type: 'ADD_PURCHASE_SUCCESS', payload: newPurchase });
  } catch (error) {
    yield put({ type: 'ADD_PURCHASE_FAILURE', payload: error });
  }
}

function* deletePurchase(action) {
  try {
    const purchaseId = action.payload;
    yield call(() => db.collection('purchases').doc(purchaseId).delete());
    yield put({ type: 'DELETE_PURCHASE_SUCCESS', payload: purchaseId });
  } catch (error) {
    yield put({ type: 'DELETE_PURCHASE_FAILURE', payload: error });
  }
}

function* removePurchasesByProductId(action) {
  try {
    const productId = action.payload;
    yield call(() => db.collection('purchases').where('productID', '==', Number(productId)).get()
      .then(snapshot => {
        snapshot.forEach(doc => doc.ref.delete());
        console.log('REMOVE_PURCHASES_BY_PRODUCT_ID succeeded in firebase')
      })
    );
    yield put({ type: 'REMOVE_PURCHASES_BY_PRODUCT_ID_SUCCESS', payload: productId });
  } catch (error) {
    yield put({ type: 'REMOVE_PURCHASES_BY_PRODUCT_ID_FAILURE', payload: error });
  }
}

function* removePurchasesByCustomerId(action) {
  try {
    const customerId = action.payload;
    yield call(() => db.collection('purchases').where('customerID', '==', Number(customerId)).get()
      .then(snapshot => {
        snapshot.forEach(doc => doc.ref.delete());
        console.log('REMOVE_PURCHASES_BY_CUSTOMER_ID succeeded in firebase')
      })
    );
    yield put({ type: 'REMOVE_PURCHASES_BY_CUSTOMER_ID_SUCCESS', payload: customerId });
  } catch (error) {
    yield put({ type: 'REMOVE_PURCHASES_BY_CUSTOMER_ID_FAILURE', payload: error });
  }
}

export function* purchasesSaga() {
  yield takeEvery(actions.ADD_PURCHASE, addPurchase);
  yield takeEvery(actions.DELETE_PURCHASE, deletePurchase);
  yield takeEvery(actions.REMOVE_PURCHASES_BY_PRODUCT_ID, removePurchasesByProductId);
  yield takeEvery(actions.REMOVE_PURCHASES_BY_CUSTOMER_ID, removePurchasesByCustomerId);
}