export const getCustomersByProductId = (productId, purchases, customers) => {
    const customerIds = purchases
        .filter(purchase => purchase.productID === parseInt(productId, 10))
        .map(purchase => purchase.customerID);

    const filteredCustomers = customers.filter(customer =>
        customerIds.includes(customer.id)
    );

    return filteredCustomers;
};