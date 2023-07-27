import { createSelector } from 'reselect';

const getCustomers = (state) => state.customers;
const getPurchases = (state) => state.purchases;

export const makeGetPurchasesForProduct = () => {
    return createSelector(
        [getPurchases],
        (purchases, productId) => purchases.filter(purchase => purchase.productID === productId)
    );
}

export const makeGetCustomersForProduct = () => {
    return createSelector(
        [getCustomers, makeGetPurchasesForProduct()],
        (customers, productPurchases) => {
            const customerIds = productPurchases.map(purchase => purchase.customerID);
            return customers.filter(customer => customerIds.includes(customer.id));
        }
    );
}
