export const addCustomer = (customer) => {
    return {
        type: 'ADD_CUSTOMER',
        payload: customer
    };
};

export const updateCustomer = (customer) => {
    return {
        type: 'UPDATE_CUSTOMER',
        payload: customer
    };
};

export const deleteCustomer = (customerId) => {
    return {
        type: 'DELETE_CUSTOMER',
        payload: customerId
    };
};