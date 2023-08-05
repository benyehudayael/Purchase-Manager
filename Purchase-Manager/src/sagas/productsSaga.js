import { call, put, takeEvery } from 'redux-saga/effects';
import firebase from '../firebase';
import * as actions from '../actions/productsActions';

const db = firebase.firestore();

function* addProduct(action) {
    const newProduct = action.payload;
    yield call([db.collection('products'), 'add'], newProduct);
    yield put({ type: actions.ADD_PRODUCT_SUCCESS, payload: newProduct });
}

function* updateProduct(action) {
    const updatedProduct = action.payload;
    yield call([db.collection('products'), 'doc', updatedProduct.id, 'update'], updatedProduct);
    yield put({ type: actions.UPDATE_PRODUCT_SUCCESS, payload: updatedProduct });
}

function* deleteProduct(action) {
    const productId = action.payload;
    yield call([db.collection('products'), 'doc', productId, 'delete']);
    yield put({ type: actions.DELETE_PRODUCT_SUCCESS, payload: productId });
}

export function* productsSaga() {
    yield takeEvery(actions.ADD_PRODUCT, addProduct);
    yield takeEvery(actions.UPDATE_PRODUCT, updateProduct);
    yield takeEvery(actions.DELETE_PRODUCT, deleteProduct);
}
