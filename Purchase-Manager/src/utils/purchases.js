export const filterPurchases = (purchases, selectedCustomer, selectedProduct, selectedDate) => {
    return purchases.filter(purchase => {
        const customerMatch = !selectedCustomer || purchase.customerID === selectedCustomer.id;
        const productMatch = !selectedProduct || purchase.productID === selectedProduct.id;
        const dateMatch = !selectedDate || purchase.date === selectedDate;
        return customerMatch && productMatch && dateMatch;
    });
};

export const getPurchasedProductsByCustomerID = (purchases, products, customerID) => {
    const customerPurchases = purchases.filter(purchase => purchase.customerID === customerID);
    const dates = customerPurchases.map(purchase => {
        const date = purchase.date;
        const formattedDate = date.replace(/-/g, '/');
        return formattedDate;
    });
    const purchasedProducts = customerPurchases.map(purchase => {
        return products.find(product => product.id === purchase.productID);
    });
    return { purchasedProducts, dates };
};