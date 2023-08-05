import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Autocomplete, TextField, Button, Grid } from '@mui/material';

import PurchasesTable from '../PurchasesTable';
import { filterPurchases } from '../../utils/purchases';

const PurchasedPage = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');

    const products = useSelector(state => state.products);
    const customers = useSelector(state => state.customers);
    const purchases = useSelector(state => state.purchases);
    const [filteredPurchases, setFilteredPurchases] = useState([])

    const handleSearch = useCallback(() => {
        const filteredPurchases = filterPurchases(purchases, selectedCustomer, selectedProduct, selectedDate);
        setFilteredPurchases(filteredPurchases);
    }, [selectedCustomer, selectedProduct, selectedDate, purchases]);

    return (
        <div>
            <h1>Purchases Overview</h1>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                    <Autocomplete
                        options={products}
                        getOptionLabel={product => product.name || ''}
                        value={selectedProduct}
                        onChange={(event, newValue) => setSelectedProduct(newValue)}
                        renderInput={params => (
                            <TextField {...params} label="Select Product" variant="outlined" />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Autocomplete
                        options={customers}
                        getOptionLabel={customer => `${customer.firstName} ${customer.lastName}` || ''}
                        value={selectedCustomer}
                        onChange={(event, newValue) => setSelectedCustomer(newValue)}
                        renderInput={params => (
                            <TextField {...params} label="Select Customer" variant="outlined" />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        label="Date"
                        type="date"
                        variant="outlined"
                        value={selectedDate}
                        onChange={event => setSelectedDate(event.target.value)}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={1}>
                    <Button variant="contained" onClick={handleSearch} fullWidth>
                        Search
                    </Button>
                </Grid>
            </Grid>
            {filteredPurchases.length > 0 ? (
                <PurchasesTable purchases={filteredPurchases} />
            ) : (
                <p>No purchases match your criteria.</p>
            )}
        </div>
    );
};

export default PurchasedPage;
