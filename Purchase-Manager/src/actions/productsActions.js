export const addProduct = (product) => {
    return {
        type: 'ADD_PRODUCT',
        payload: product
    };
};

export const updateProduct = (product) => {
    return {
        type: 'UPDATE_PRODUCT',
        payload: product
    };
};

export const deleteProduct = (productId) => {
    return {
        type: 'DELETE_PRODUCT',
        payload: productId
    };
};
