import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid } from '@mui/material';

import PurchasesTable from '../PurchasesTable';
import { addPurchase } from '../../actions/purchasesActions';
import { setError } from '../../actions/errorActions';
import { generateUniqueId } from '../../helper';


const CustomersPage = () => {
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const dispatch = useDispatch();

    const customers = useSelector(state => state.customers);
    const products = useSelector(state => state.products);
    const purchases = useSelector(state => state.purchases);

    const [isPurchaseSuccess, setPurchaseSuccess] = useState(false);

    const resetSelections = () => {
        setSelectedProduct('');
        setSelectedCustomer('');
    };

    const handleBuyProduct = () => {
        try {
            const newPurchaseId = generateUniqueId();

            const newPurchase = {
                id: newPurchaseId,
                customerID: selectedCustomer,
                productID: selectedProduct,
                date: new Date().toISOString().slice(0, 10),
            };

            dispatch(addPurchase(newPurchase));
            setIsFormOpen(false);
            resetSelections();
            setPurchaseSuccess(true);
        } catch (error) {
            dispatch(setError(error));
        }
    };

    const handleCancel = () => {
        setIsFormOpen(false);
        resetSelections();
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setPurchaseSuccess(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, [isPurchaseSuccess]);

    return (
        <>
            <Typography style={{ width: 'fit-content', margin: '1rem auto 1rem auto' }} variant="h3">Customer Purchases</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    {/* Purchases Table */}
                    <div className="region1">
                        <PurchasesTable purchases={purchases} />
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* Purchase Form */}
                    <div className="region2">
                        <Button style={{ backgroundColor: 'black', color: 'white', margin: '16px' }} onClick={() => setIsFormOpen(true)}>Buy Product</Button>
                        {isFormOpen && (
                            <form style={{ gap: '1rem', }}>
                                <FormControl>
                                    <InputLabel>Select Product</InputLabel>
                                    <Select
                                        value={selectedProduct}
                                        onChange={e => setSelectedProduct(e.target.value)}
                                    >
                                        {products.map(product => (
                                            <MenuItem key={product.id} value={product.id}>
                                                {product.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl>
                                    <InputLabel>Select Customer</InputLabel>
                                    <Select
                                        value={selectedCustomer}
                                        onChange={e => setSelectedCustomer(e.target.value)}
                                    >
                                        {customers.map(customer => (
                                            <MenuItem key={customer.id} value={customer.id}>
                                                {customer.firstName} {customer.lastName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <Button variant="contained" onClick={handleBuyProduct} disabled={!selectedProduct || !selectedCustomer}>
                                    Buy
                                </Button>
                                <Button variant="contained" onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </form>
                        )}
                        {isPurchaseSuccess && (
                            <Typography variant="body1" style={{ color: 'green' }}>
                                Purchase successful!
                            </Typography>
                        )}
                    </div>
                </Grid>
            </Grid>
        </>
    );
};

export default React.memo(CustomersPage);;
