import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

import { updateCustomer, deleteCustomer } from '../../actions/customersActions';
import { removePurchasesByCustomerId } from '../../actions/purchasesActions'

const EditCustomerPage = () => {
    const { customerId: id } = useParams();
    const [productsCustomer, setProductsCustomer] = useState([]);
    const customers = useSelector((state) => state.customers);
    const products = useSelector((state) => state.products);
    const purchases = useSelector((state) => state.purchases);
    const customer = customers.find((customer) => customer.id === parseInt(id, 10));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [customerFirstName, setCustomerFirstName] = useState('');
    const [customerLastName, setCustomerLastName] = useState('');
    const [customerCity, setCustomerCity] = useState('');

    useEffect(() => {
        if (customer) {
            setCustomerFirstName(customer.firstName);
            setCustomerLastName(customer.lastName);
            setCustomerCity(customer.city);
        }
    }, [customer]);

    useEffect(() => {
        const customerPurchases = purchases.filter(purchase => purchase.customerID === Number(id));
        const productIds = customerPurchases.map(purchase => purchase.productID);
        const pC = products.filter(product => productIds.includes(product.id));
        setProductsCustomer(pC);
    }, [id, purchases, products]);

    const handleCustomerFirstNameChange = event => {
        setCustomerFirstName(event.target.value);
    };

    const handleCustomerLastNameChange = event => {
        setCustomerLastName(event.target.value);
    };

    const handleCustomerCityChange = event => {
        setCustomerCity(event.target.value);
    };

    const handleUpdateCustomer = event => {
        event.preventDefault();

        if (!customerFirstName || !customerLastName || !customerCity) {
            alert("Please fill in all the required fields");
        } else {
            const updatedCustomer = {
                id: customer.id,
                firstName: customerFirstName,
                lastName: customerLastName,
                city: customerCity,
            };

            dispatch(updateCustomer(updatedCustomer));
            alert("Awesome! You've successfully updated the customer.")
        }
    };

    const handleDeleteCustomer = () => {
        dispatch(deleteCustomer(id));
        dispatch(removePurchasesByCustomerId(id));
        alert('Customer successfully deleted');
        navigate('/products');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ width: '329px', height: '410px', justifyContent: 'space-around', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6">Edit Customer: {customer ? `${customer.firstName} ${customer.lastName}` : ''}</Typography>
                <Box component="form" onSubmit={handleUpdateCustomer} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <TextField label="First Name" value={customerFirstName} onChange={handleCustomerFirstNameChange} />
                    <TextField label="Last Name" value={customerLastName} onChange={handleCustomerLastNameChange} />
                    <TextField label="City" value={customerCity} onChange={handleCustomerCityChange} />
                    <Button variant="contained" type="submit">Update Customer</Button>
                </Box>
                <Button variant="contained" color="error" onClick={handleDeleteCustomer}>Delete Customer</Button>
            </div>
            <div>
                <Typography variant="subtitle1" mt={3}>Products purchased by this customer:</Typography>
                <List>
                    {productsCustomer.map(product => (
                        <ListItem key={product.id} disablePadding>
                            <ListItemText primary={<Link to={`/edit-product/${product.id}`}>{product.name}</Link>} />
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    );
};

export default EditCustomerPage;
