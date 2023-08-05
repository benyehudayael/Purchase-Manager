export const getProductsByCustomerId = (customerId, purchases, products) => {
    const customerPurchases = purchases.filter(purchase => purchase.customerID === customerId);
    const productIds = customerPurchases.map(purchase => purchase.productID);
    return products.filter(product => productIds.includes(product.id));
};

export const findProductById = (products, productId) => {
    return products.find((product) => product.id === Number(productId));
};

export const isProductAvailable = (product) => {
    return product && product.quantity > 0;
};