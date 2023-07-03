import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Grid, Box } from '@material-ui/core';
import Select from 'react-select';

const PurchasedPage = () => {
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const dispatch = useDispatch();
    const customers = useSelector(state => state.customers);
    const products = useSelector(state => state.products);

    const handleSearch = () => {
        // Implement your search logic here
    };

    const productOptions = products.map(product => ({
        value: product.id,
        label: product.name
    }));

    const customerOptions = customers.map(customer => ({
        value: customer.id,
        label: `${customer.firstName} ${customer.lastName}`
    }));

    return (
        <div>
            <h1>Purchased Page</h1>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <Box mt={2}>
                        <Select
                            value={selectedProduct}
                            onChange={option => setSelectedProduct(option.value)}
                            options={productOptions}
                            placeholder="Select Product"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Box mt={2}>
                        <Select
                            value={selectedCustomer}
                            onChange={option => setSelectedCustomer(option.value)}
                            options={customerOptions}
                            placeholder="Select Customer"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Box mt={2}>
                        <TextField
                            label="Date"
                            type="date"
                            value={selectedDate}
                            onChange={e => setSelectedDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box mt={2}>
                        <Button variant="contained" color="primary" onClick={handleSearch}>
                            Search
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default PurchasedPage;
