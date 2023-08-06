import { call, put, takeEvery } from 'redux-saga/effects';
import firebase from '../firebase';
import * as actions from '../actions/productsActions';

const db = firebase.firestore();

function* addProduct(action) {
    try {
        const newProduct = action.payload;
        yield call(() => db.collection('products').add(newProduct));
        yield put({ type: 'ADD_PRODUCT_SUCCESS', payload: newProduct });
    } catch (error) {
        yield put({ type: 'ADD_PRODUCT_FAILURE', payload: error });
    }
}

function* updateProduct(action) {
    try {
        const updatedProduct = action.payload;
        yield call(() => db.collection('products')
            .where('id', '==', updatedProduct.id)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    db.collection('products').doc(doc.id).update(updatedProduct);
                });
            })
        );
        yield put({ type: 'UPDATE_PRODUCT_SUCCESS', payload: updatedProduct });
    } catch (error) {
        yield put({ type: 'UPDATE_PRODUCT_FAILURE', payload: error });
    }
}

function* deleteProduct(action) {
    try {
        const productId = action.payload;
        yield call(() => db.collection('products')
            .where('id', '==', Number(productId))
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete().then(() => {
                        console.log('Product successfully deleted!');
                    });
                });
            })
        );
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
