export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';

export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

export const addProduct = (product) => {
    return {
        type: ADD_PRODUCT,
        payload: product
    };
};

export const addProductSuccess = (product) => {
    return {
        type: ADD_PRODUCT_SUCCESS,
        payload: product
    };
};

export const addProductFailure = (error) => {
    return {
        type: ADD_PRODUCT_FAILURE,
        payload: error
    };
};

export const updateProduct = (product) => {
    return {
        type: UPDATE_PRODUCT,
        payload: product
    };
};

export const updateProductSuccess = (product) => {
    return {
        type: UPDATE_PRODUCT_SUCCESS,
        payload: product
    };
};

export const updateProductFailure = (error) => {
    return {
        type: UPDATE_PRODUCT_FAILURE,
        payload: error
    };
};

export const deleteProduct = (productId) => {
    return {
        type: DELETE_PRODUCT,
        payload: productId
    };
};

export const deleteProductSuccess = (productId) => {
    return {
        type: DELETE_PRODUCT_SUCCESS,
        payload: productId
    };
};

export const deleteProductFailure = (error) => {
    return {
        type: DELETE_PRODUCT_FAILURE,
        payload: error
    };
};
