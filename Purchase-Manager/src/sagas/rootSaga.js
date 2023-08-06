import { all } from 'redux-saga/effects';
import { productsSaga } from './productsSaga';
import { customersSaga } from './customersSaga';
import { purchasesSaga } from './purchasesSaga';

export default function* rootSaga() {
    yield all([
        productsSaga(),
        customersSaga(),
        purchasesSaga()
    ]);
}
