import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomer, deleteCustomer } from '../../actions/customersActions';
import { removePurchasesByCustomerId } from '../../actions/purchasesActions';
import { TextField, Button, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const EditCustomerPage = () => {
    const { customerId: id } = useParams();
    const [productsCustomer, setProductsCustomer] = useState([]);
    const customers = useSelector((state) => state.customers);
    const products = useSelector((state) => state.products);
    const purchases = useSelector((state) => state.purchases);
    const customer = customers.find((customer) => customer.id === parseInt(id, 10));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [customerFirstName, setCustomerFirstName] = useState(customer.firstName);
    const [customerLastName, setCustomerLastName] = useState(customer.lastName);
    const [customerCity, setCustomerCity] = useState(customer.city);

    const customerPurchases = purchases.filter((purchase) => purchase.customerID == Number(id));

    const productIds = customerPurchases.map((purchase) => purchase.productID);

    useEffect(() => {
        const pC = products.filter((product) => productIds.includes(product.id));
        setProductsCustomer(pC);
    }, []);

    const handleCustomerFirstNameChange = (event) => {
        setCustomerFirstName(event.target.value);
    };

    const handleCustomerLastNameChange = (event) => {
        setCustomerLastName(event.target.value);
    };

    const handleCustomerCityChange = (event) => {
        setCustomerCity(event.target.value);
    };

    const handleUpdateCustomer = (event) => {
        event.preventDefault();

        const updatedCustomer = {
            id: customer.id,
            firstName: customerFirstName,
            lastName: customerLastName,
            city: customerCity,
        };

        dispatch(updateCustomer(updatedCustomer));
    };

    const handleDeleteCustomer = () => {
        dispatch({ type: 'DELETE_CUSTOMER', payload: id });
        dispatch({ type: 'REMOVE_PURCHASES_BY_CUSTOMER_ID', payload: id });
        alert('Customer successfully deleted');
        navigate('/products');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ width: '329px', height: '410px', justifyContent: 'space-around', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6">Edit Customer: {customer.firstName} {customer.lastName}</Typography>
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
                    {productsCustomer.map((product, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemText primary={<Link to={`/edit-product/${product.id}`}>{product.name}</Link>} />
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    );
};

export default EditCustomerPage;
