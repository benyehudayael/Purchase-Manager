import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Autocomplete, TextField, Button } from '@mui/material';
import PurchasesTable from '../PurchasesTable';
import { initializeUseSelector } from 'react-redux/es/hooks/useSelector';

const PurchasedPage = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');

    const products = useSelector(state => state.products);
    const customers = useSelector(state => state.customers);
    const purchases = useSelector(state => state.purchases);
    const [filteredPurchases, setFilteredPurchases] = useState([])

    const handleSearch = () => {
        setFilteredPurchases([]);

        const filteredPurchases = purchases.filter(purchase => {
            const customerMatch = !selectedCustomer || purchase.customerID == selectedCustomer.id;
            const productMatch = !selectedProduct || purchase.productID == selectedProduct.id;
            const dateMatch = !selectedDate || purchase.date == selectedDate;
            return customerMatch && productMatch && dateMatch;
        });

        setFilteredPurchases(filteredPurchases);
        console.log(filteredPurchases);
    };

    return (
        <div>
            <h1>Purchased Page</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Autocomplete
                    options={products}
                    getOptionLabel={product => product.name || ''}
                    value={selectedProduct}
                    onChange={(event, newValue) => setSelectedProduct(newValue)}
                    renderInput={params => (
                        <TextField {...params} label="Select Product" variant="outlined" />
                    )}
                />
                <Autocomplete
                    options={customers}
                    getOptionLabel={customer => `${customer.firstName} ${customer.lastName}` || ''}
                    value={selectedCustomer}
                    onChange={(event, newValue) => setSelectedCustomer(newValue)}
                    renderInput={params => (
                        <TextField {...params} label="Select Customer" variant="outlined" />
                    )}
                />
                <TextField
                    label="Date"
                    type="date"
                    variant="outlined"
                    value={selectedDate}
                    onChange={event => setSelectedDate(event.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
                <Button variant="contained" onClick={handleSearch}>Search</Button>
            </div>
            {filteredPurchases.length > 0 && (
                <PurchasesTable purchases={filteredPurchases} />
            )}
        </div>
    );
};

export default PurchasedPage;
