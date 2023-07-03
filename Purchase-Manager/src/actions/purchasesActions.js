export const addPurchase = (purchase) => {
    return {
        type: 'ADD_PURCHASE',
        payload: purchase
    };
};

export const deletePurchase = (purchaseId) => {
    return {
        type: 'DELETE_PURCHASE',
        payload: purchaseId
    };
};

export const removePurchasesByProductId = (productId) => {
    return {
        type: 'REMOVE_PURCHASES_BY_PRODUCT_ID',
        payload: productId,
    };
};

export const removePurchasesByCustomerId = (customerId) => {
    return {
        type: 'REMOVE_PURCHASES_BY_CUSTOMER_ID',
        payload: customerId,
    };
};