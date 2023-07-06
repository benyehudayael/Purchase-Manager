import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PurchasesTable from '../PurchasesTable';
import { generateUniqueId } from '../../helper';
import {
    Button,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextField,
    Typography,
} from '@mui/material';

const CustomersPage = () => {
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const dispatch = useDispatch();
    const customers = useSelector(state => state.customers);
    const products = useSelector(state => state.products);
    const purchases = useSelector(state => state.purchases);

    const handleBuyProduct = () => {
        const newPurchaseId = generateUniqueId();

        const newPurchase = {
            id: newPurchaseId,
            customerID: selectedCustomer,
            productID: selectedProduct,
            date: new Date().toISOString().slice(0, 10),
        };

        dispatch({ type: 'ADD_PURCHASE', payload: newPurchase });

        setSelectedProduct('');
        setSelectedCustomer('');
    };

    const handleCancel = () => {
        setIsFormOpen(false);
        setSelectedProduct('');
        setSelectedCustomer('');
    };

    return (
        <>
            <Typography variant="h3">Customers</Typography>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div className="region1">
                    <PurchasesTable purchases={purchases} />
                </div>
                <div className="region2">
                    <Button onClick={() => setIsFormOpen(true)}>Buy Product</Button>
                    {isFormOpen && (
                        <form>
                            <FormControl>
                                <InputLabel>Select Product</InputLabel>
                                <Select
                                    value={selectedProduct}
                                    onChange={e => setSelectedProduct(e.target.value)}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
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
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {customers.map(customer => (
                                        <MenuItem key={customer.id} value={customer.id}>
                                            {customer.firstName} {customer.lastName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Button variant="contained" onClick={handleBuyProduct}>
                                Buy
                            </Button>
                            <Button variant="contained" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default CustomersPage;
