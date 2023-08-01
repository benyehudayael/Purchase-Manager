import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Box, List, ListItem, ListItemText, Container, Grid } from '@mui/material';

import { updateCustomer, deleteCustomer } from '../../actions/customersActions';
import { removePurchasesByCustomerId } from '../../actions/purchasesActions'

const EditCustomerPage = () => {
    const { customerId: id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const customers = useSelector((state) => state.customers);
    const products = useSelector((state) => state.products);
    const purchases = useSelector((state) => state.purchases);

    const customer = customers.find((customer) => customer.id === Number(id));
    const [formData, setFormData] = useState({ firstName: '', lastName: '', city: '' });
    const [productsCustomer, setProductsCustomer] = useState([]);

    useEffect(() => {
        if (customer) {
            const { firstName, lastName, city } = customer;
            setFormData({ firstName, lastName, city });
        }
    }, [customer]);

    useEffect(() => {
        const customerPurchases = purchases.filter(purchase => purchase.customerID === Number(id));
        const productIds = customerPurchases.map(purchase => purchase.productID);
        const pC = products.filter(product => productIds.includes(product.id));
        setProductsCustomer(pC);
    }, [id, purchases, products]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdateCustomer = event => {
        event.preventDefault();
        const { firstName, lastName, city } = formData;

        if (!firstName || !lastName || !city) {
            alert("Please fill in all the required fields");
        } else {
            const updatedCustomer = { id: customer.id, ...formData };

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
        <Container maxWidth="md"> {/* Wrap the entire component in a Container */}
            <Grid container spacing={3} justifyContent="space-around">
                <Grid item xs={12} md={6}>
                    {/* Customer form */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Typography variant="h6">Edit Customer: <span style={{ color: 'gray' }}>
                            {customer ? `${customer.firstName} ${customer.lastName}` : ''}
                        </span></Typography>
                        <Box component="form" onSubmit={handleUpdateCustomer} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <TextField label="First Name" value={formData.firstName} name="firstName" onChange={handleInputChange} />
                            <TextField label="Last Name" value={formData.lastName} name="lastName" onChange={handleInputChange} />
                            <TextField label="City" value={formData.city} name="city" onChange={handleInputChange} />
                            <Box sx={{ display: 'flex', gap: '16px' }}>
                                <Button variant="contained" type="submit">Update</Button>
                                <Button variant="contained" color="error" onClick={handleDeleteCustomer}>Delete</Button>
                            </Box>
                        </Box>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* Products purchased by this customer */}
                    <div>
                        <Typography variant="subtitle1" mt={3}>Products purchased by this customer:</Typography>
                        {productsCustomer.length > 0 ? (
                            <List>
                                {productsCustomer.map(product => (
                                    <ListItem key={product.id} disablePadding>
                                        <ListItemText primary={<Link to={`/edit-product/${product.id}`}>{product.name}</Link>} />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography variant="body1">No products have been bought by this customer.</Typography>
                        )}
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default EditCustomerPage;
