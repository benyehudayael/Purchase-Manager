import { combineReducers } from 'redux';

const productsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return action.payload;
        case 'ADD_PRODUCT_SUCCESS':
            return [...state, action.payload];
        case 'UPDATE_PRODUCT_SUCCESS':
            const updatedProduct = action.payload;
            return state.map(product => (product.id === Number(updatedProduct.id) ? updatedProduct : product));
        case 'DELETE_PRODUCT_SUCCESS':
            const productId = action.payload;
            return state.filter(product => product.id !== Number(productId));
        default:
            return state;
    }
};

const customersReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CUSTOMERS':
            return action.payload;
        case 'ADD_CUSTOMER_SUCCESS':
            return [...state, action.payload];
        case 'UPDATE_CUSTOMER_SUCCESS':
            const updatedCustomer = action.payload;
            return state.map(customer => (customer.id === Number(updatedCustomer.id) ? updatedCustomer : customer));
        case 'DELETE_CUSTOMER_SUCCESS':
            const customerId = action.payload;
            return state.filter(customer => customer.id !== Number(customerId));
        default:
            return state;
    }
};

const purchasesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PURCHASES':
            return action.payload;
        case 'ADD_PURCHASE_SUCCESS':
            return [...state, action.payload];
        case 'DELETE_PURCHASE_SUCCESS':
            const purchaseId = action.payload;
            return state.filter(purchase => purchase.id !== Number(purchaseId));
        case 'REMOVE_PURCHASES_BY_PRODUCT_ID_SUCCESS':
            return state.filter(purchase => purchase.productID !== action.payload);
        case 'REMOVE_PURCHASES_BY_CUSTOMER_ID_SUCCESS':
            return state.filter(purchase => purchase.customerID !== action.payload);
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
