import { call, put, takeEvery } from 'redux-saga/effects';
import firebase from '../firebase';
import * as actions from '../actions/productsActions';

const db = firebase.firestore();
const COLLECTION = 'products';
const ID = 'id';

const addProductToDB = (product) => db.collection(COLLECTION).add(product);
const updateProductInDB = (product) => db.collection(COLLECTION)
    .where(ID, '==', product.id)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            db.collection(COLLECTION).doc(doc.id).update(product);
        });
    });
const deleteProductFromDB = (productId) => db.collection(COLLECTION)
    .where(ID, '==', Number(productId))
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            doc.ref.delete();
        });
    });

const addProduct = function* ({ payload: newProduct }) {
    try {
        yield call(addProductToDB, newProduct);
        yield put({ type: 'ADD_PRODUCT_SUCCESS', payload: newProduct });
    } catch (error) {
        yield put({ type: 'ADD_PRODUCT_FAILURE', payload: error });
    }
}

const updateProduct = function* ({ payload: updatedProduct }) {
    try {
        yield call(updateProductInDB, updatedProduct);
        yield put({ type: 'UPDATE_PRODUCT_SUCCESS', payload: updatedProduct });
    } catch (error) {
        yield put({ type: 'UPDATE_PRODUCT_FAILURE', payload: error });
    }
}

const deleteProduct = function* ({ payload: productId }) {
    try {
        yield call(deleteProductFromDB, productId);
        yield put({ type: 'DELETE_PRODUCT_SUCCESS', payload: productId });
    } catch (error) {
        yield put({ type: 'DELETE_PRODUCT_FAILURE', payload: error });
    }
}

export function* productsSaga() {
    yield takeEvery(actions.ADD_PRODUCT, addProduct);
    yield takeEvery(actions.UPDATE_PRODUCT, updateProduct);
    yield takeEvery(actions.DELETE_PRODUCT, deleteProduct);
}
