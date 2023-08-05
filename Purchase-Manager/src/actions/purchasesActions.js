export const ADD_PURCHASE = 'ADD_PURCHASE';
export const ADD_PURCHASE_SUCCESS = 'ADD_PURCHASE_SUCCESS';
export const ADD_PURCHASE_FAILURE = 'ADD_PURCHASE_FAILURE';

export const DELETE_PURCHASE = 'DELETE_PURCHASE';
export const DELETE_PURCHASE_SUCCESS = 'DELETE_PURCHASE_SUCCESS';
export const DELETE_PURCHASE_FAILURE = 'DELETE_PURCHASE_FAILURE';

export const REMOVE_PURCHASES_BY_PRODUCT_ID = 'REMOVE_PURCHASES_BY_PRODUCT_ID';
export const REMOVE_PURCHASES_BY_PRODUCT_ID_SUCCESS = 'REMOVE_PURCHASES_BY_PRODUCT_ID_SUCCESS';
export const REMOVE_PURCHASES_BY_PRODUCT_ID_FAILURE = 'REMOVE_PURCHASES_BY_PRODUCT_ID_FAILURE';

export const REMOVE_PURCHASES_BY_CUSTOMER_ID = 'REMOVE_PURCHASES_BY_CUSTOMER_ID';
export const REMOVE_PURCHASES_BY_CUSTOMER_ID_SUCCESS = 'REMOVE_PURCHASES_BY_CUSTOMER_ID_SUCCESS';
export const REMOVE_PURCHASES_BY_CUSTOMER_ID_FAILURE = 'REMOVE_PURCHASES_BY_CUSTOMER_ID_FAILURE';

export const addPurchase = (purchase) => {
    return {
        type: ADD_PURCHASE,
        payload: purchase
    };
};

export const addPurchaseSuccess = (purchase) => {
    return {
        type: ADD_PURCHASE_SUCCESS,
        payload: purchase
    };
};

export const addPurchaseFailure = (error) => {
    return {
        type: ADD_PURCHASE_FAILURE,
        payload: error
    };
};

export const deletePurchase = (purchaseId) => {
    return {
        type: DELETE_PURCHASE,
        payload: purchaseId
    };
};

export const deletePurchaseSuccess = (purchaseId) => {
    return {
        type: DELETE_PURCHASE_SUCCESS,
        payload: purchaseId
    };
};

export const deletePurchaseFailure = (error) => {
    return {
        type: DELETE_PURCHASE_FAILURE,
        payload: error
    };
};

export const removePurchasesByProductId = (productId) => {
    return {
        type: REMOVE_PURCHASES_BY_PRODUCT_ID,
        payload: productId
    };
};

export const removePurchasesByProductIdSuccess = (productId) => {
    return {
        type: REMOVE_PURCHASES_BY_PRODUCT_ID_SUCCESS,
        payload: productId
    };
};

export const removePurchasesByProductIdFailure = (error) => {
    return {
        type: REMOVE_PURCHASES_BY_PRODUCT_ID_FAILURE,
        payload: error
    };
};

export const removePurchasesByCustomerId = (customerId) => {
    return {
        type: REMOVE_PURCHASES_BY_CUSTOMER_ID,
        payload: customerId
    };
};

export const removePurchasesByCustomerIdSuccess = (customerId) => {
    return {
        type: REMOVE_PURCHASES_BY_CUSTOMER_ID_SUCCESS,
        payload: customerId
    };
};

export const removePurchasesByCustomerIdFailure = (error) => {
    return {
        type: REMOVE_PURCHASES_BY_CUSTOMER_ID_FAILURE,
        payload: error
    };
};
