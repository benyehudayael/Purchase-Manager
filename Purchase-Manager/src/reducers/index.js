import { combineReducers } from 'redux';
import firebase from '../firebase';

const db = firebase.firestore();

const productsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return action.payload;
        case 'ADD_PRODUCT':
            const newProduct = action.payload;
            db.collection('products').add(newProduct);
            return [...state, newProduct];
        case 'UPDATE_PRODUCT':
            const updatedProduct = action.payload;
            db.collection('products').doc(String(updatedProduct.id)).set(updatedProduct);
            return state.map(product => (product.id === updatedProduct.id ? updatedProduct : product));
        case 'DELETE_PRODUCT':
            const productId = action.payload;
            db.collection('products').doc(productId).delete();
            return state.filter(product => product.id !== Number(productId));
        default:
            return state;
    }
};

const customersReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CUSTOMERS':
            return action.payload;
        case 'ADD_CUSTOMER':
            const newCustomer = action.payload;
            db.collection('customers').add(newCustomer);
            return [...state, newCustomer];
        case 'UPDATE_CUSTOMER':
            const updatedCustomer = action.payload;
            db.collection('customers').doc(String(updatedCustomer.id)).set(updatedCustomer);
            return state.map(customer => (customer.id === updatedCustomer.id ? updatedCustomer : customer));
        case 'DELETE_CUSTOMER':
            const customerId = action.payload;
            db.collection('customers').doc(String(customerId)).delete();
            return state.filter(customer => customer.id !== customerId);
        default:
            return state;
    }
};

const purchasesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PURCHASES':
            return action.payload;
        case 'ADD_PURCHASE':
            const newPurchase = action.payload;
            db.collection('purchases').add(newPurchase);
            return [...state, newPurchase];
        case 'DELETE_PURCHASE':
            const purchaseId = action.payload;
            db.collection('purchases').doc(purchaseId).delete();
            return state.filter(purchase => purchase.id !== purchaseId);
        case 'REMOVE_PURCHASES_BY_PRODUCT_ID': {
            const productId = action.payload;
            db.collection('purchases').where('productID', '==', String(productId)).get()
                .then(snapshot => {
                    snapshot.forEach(doc => doc.ref.delete());
                })
                .catch(error => {
                    console.error('Error removing purchases:', error);
                });
            return state.filter(purchase => purchase.productID !== productId);
        }
        case 'REMOVE_PURCHASES_BY_CUSTOMER_ID': {
            const customerId = action.payload;
            db.collection('purchases').where('customerID', '==', String(customerId)).get()
                .then(snapshot => {
                    snapshot.forEach(doc => doc.ref.delete());
                })
                .catch(error => {
                    console.error('Error removing purchases:', error);
                });
            return state.filter(purchase => purchase.customerID !== customerId);
        }
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    products: productsReducer,
    customers: customersReducer,
    purchases: purchasesReducer
});

export default rootReducer;
