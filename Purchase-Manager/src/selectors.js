import { createSelector } from 'reselect';

const getCustomers = state => state.customers;
const getPurchases = state => state.purchases;

const makeGetRelatedCustomers = () => {
    return createSelector(
        [getCustomers, getPurchases, (_, productId) => productId],
        (customers, purchases, productId) => {
            const customerIds = purchases
                .filter(purchase => purchase.productID === productId)
                .map(purchase => purchase.customerID);

            return customers
                .filter(customer => customerIds.includes(customer.id))
                .map(customer => {
                    const purchase = purchases.find(
                        purchase => purchase.customerID === customer.id && purchase.productID === productId
                    );
                    return {
                        ...customer,
                        purchasedDate: purchase ? purchase.date : null
                    };
                });
        }
    )
};

export const getRelatedCustomers = makeGetRelatedCustomers();
