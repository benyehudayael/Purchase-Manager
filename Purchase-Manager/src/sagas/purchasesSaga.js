import { call, put, takeEvery } from 'redux-saga/effects';
import firebase from '../firebase';
import * as actions from '../actions/purchasesActions';

const db = firebase.firestore();
const COLLECTION = 'purchases';
const PRODUCT_ID = 'productID';
const CUSTOMER_ID = 'customerID';

const addPurchaseToDB = (purchase) => db.collection(COLLECTION).add(purchase);
const deletePurchaseFromDB = (purchaseId) => db.collection(COLLECTION).doc(purchaseId).delete();
const removePurchasesByProductIdFromDB = (productId) => db.collection(COLLECTION)
  .where(PRODUCT_ID, '==', Number(productId))
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => doc.ref.delete());
  });
const removePurchasesByCustomerIdFromDB = (customerId) => db.collection(COLLECTION)
  .where(CUSTOMER_ID, '==', Number(customerId))
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => doc.ref.delete());
  });

const addPurchase = function* ({ payload: newPurchase }) {
  try {
    yield call(addPurchaseToDB, newPurchase);
    yield put({ type: 'ADD_PURCHASE_SUCCESS', payload: newPurchase });
  } catch (error) {
    yield put({ type: 'ADD_PURCHASE_FAILURE', payload: error });
  }
}

const deletePurchase = function* ({ payload: purchaseId }) {
  try {
    yield call(deletePurchaseFromDB, purchaseId);
    yield put({ type: 'DELETE_PURCHASE_SUCCESS', payload: purchaseId });
  } catch (error) {
    yield put({ type: 'DELETE_PURCHASE_FAILURE', payload: error });
  }
}

const removePurchasesByProductId = function* ({ payload: productId }) {
  try {
    yield call(removePurchasesByProductIdFromDB, productId);
    yield put({ type: 'REMOVE_PURCHASES_BY_PRODUCT_ID_SUCCESS', payload: productId });
  } catch (error) {
    yield put({ type: 'REMOVE_PURCHASES_BY_PRODUCT_ID_FAILURE', payload: error });
  }
}

const removePurchasesByCustomerId = function* ({ payload: customerId }) {
  try {
    yield call(removePurchasesByCustomerIdFromDB, customerId);
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
