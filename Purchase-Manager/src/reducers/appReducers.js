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
            db.collection('products')
                .where('id', '==', updatedProduct.id)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        db.collection('products').doc(doc.id).update(updatedProduct);
                    });
                })
                .catch((error) => {
                    console.error('Error updating product:', error);
                });
            return state.map(product => (product.id === updatedProduct.id ? updatedProduct : product));
        case 'DELETE_PRODUCT':
            const productId = action.payload;
            db.collection('products')
                .where('id', '==', Number(productId))
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.delete().then(() => {
                            console.log('Product successfully deleted!');
                        });
                    });
                })
                .catch((error) => {
                    console.error('Error deleting product:', error);
                });
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
            db.collection('customers').where('id', '==', updatedCustomer.id).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        db.collection('customers').doc(doc.id).update(updatedCustomer);
                    });
                })
                .catch((error) => {
                    console.error('Error updating customer:', error);
                });
            return state.map(customer => (customer.id === updatedCustomer.id ? updatedCustomer : customer));
        case 'DELETE_CUSTOMER':
            const customerId = action.payload;
            db.collection('customers').where('id', '==', Number(customerId)).get()
                .then(snapshot => {
                    snapshot.forEach(doc => doc.ref.delete());
                    console.log('DELETE_CUSTOMER succeeded in firebase')
                })
                .catch(error => {
                    console.error('Error DELETE_CUSTOMER:', error);
                });
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
            db.collection('purchases').where('productID', '==', Number(productId)).get()
                .then(snapshot => {
                    snapshot.forEach(doc => doc.ref.delete());
                    console.log('REMOVE_PURCHASES_BY_PRODUCT_ID succeeded in firebase')
                })
                .catch(error => {
                    console.error('Error removing purchases:', error);
                });
            return state.filter(purchase => purchase.productID !== productId);
        }
        case 'REMOVE_PURCHASES_BY_CUSTOMER_ID': {
            const customerId = action.payload;
            db.collection('purchases').where('customerID', '==', Number(customerId)).get()
                .then(snapshot => {
                    snapshot.forEach(doc => doc.ref.delete());
                    console.log('REMOVE_PURCHASES_BY_CUSTOMER_ID succeeded in firebase')
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

const usersReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USERS':
            return action.payload;
        default:
            return state;
    }
};

const userRoleReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_ROLE':
            return action.payload;
        default:
            return state;
    }
};

const errorReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_ERROR':
            return action.payload;
        default:
            return state;
    }
};

const loadingReducer = (state = false, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return true;
        case 'STOP_LOADING':
            return false;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    products: productsReducer,
    customers: customersReducer,
    purchases: purchasesReducer,
    users: usersReducer,
    userRole: userRoleReducer,
    error: errorReducer,
    loading: loadingReducer
});

export default rootReducer;
