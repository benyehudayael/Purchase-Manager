export const ADD_CUSTOMER = 'ADD_CUSTOMER';
export const ADD_CUSTOMER_SUCCESS = 'ADD_CUSTOMER_SUCCESS';
export const ADD_CUSTOMER_FAILURE = 'ADD_CUSTOMER_FAILURE';

export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
export const UPDATE_CUSTOMER_SUCCESS = 'UPDATE_CUSTOMER_SUCCESS';
export const UPDATE_CUSTOMER_FAILURE = 'UPDATE_CUSTOMER_FAILURE';

export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';
export const DELETE_CUSTOMER_SUCCESS = 'DELETE_CUSTOMER_SUCCESS';
export const DELETE_CUSTOMER_FAILURE = 'DELETE_CUSTOMER_FAILURE';

export const addCustomer = (customer) => {
    return {
        type: ADD_CUSTOMER,
        payload: customer
    };
};

export const updateCustomer = (customer) => {
    return {
        type: UPDATE_CUSTOMER,
        payload: customer
    };
};

export const deleteCustomer = (customerId) => {
    return {
        type: DELETE_CUSTOMER,
        payload: customerId
    };
};

export const addCustomerSuccess = (customer) => ({
    type: ADD_CUSTOMER_SUCCESS,
    payload: customer,
});

export const addCustomerFailure = (error) => ({
    type: ADD_CUSTOMER_FAILURE,
    payload: error,
});

export const updateCustomerSuccess = (customer) => ({
    type: UPDATE_CUSTOMER_SUCCESS,
    payload: customer,
});

export const updateCustomerFailure = (error) => ({
    type: UPDATE_CUSTOMER_FAILURE,
    payload: error,
});

export const deleteCustomerSuccess = (customerId) => ({
    type: DELETE_CUSTOMER_SUCCESS,
    payload: customerId,
});

export const deleteCustomerFailure = (error) => ({
    type: DELETE_CUSTOMER_FAILURE,
    payload: error,
});
