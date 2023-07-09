import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import CustomerPurchase from './CustomerPurchase';
import { addPurchase } from '../../actions/purchasesActions';
import { updateProduct } from '../../actions/productsActions';

const Product = ({ product }) => {
    const { id, name, price, quantity } = product;
    const customers = useSelector((state) => state.customers);
    const purchases = useSelector((state) => state.purchases);
    const [filteredCustomers, setFilteredCustomers] = useState([]);

    useEffect(() => {
        setFilteredCustomers(filteredTheCustomers);
    }, [purchases, customers]);

    const filteredTheCustomers = useMemo(() => {
        const customerIds = purchases
            .filter(purchase => purchase.productID === id)
            .map(purchase => purchase.customerID);

        return customers
            .filter(customer => customerIds.includes(customer.id))
            .map(customer => {
                const purchase = purchases.find(
                    purchase => purchase.customerID === customer.id && purchase.productID === id
                );
                return {
                    ...customer,
                    purchasedDate: purchase ? purchase.date : null
                };
            });
    }, [purchases, customers, id]);

    const dispatch = useDispatch();

    const handleSave = useCallback(
        (customerId, selectedProduct) => {
            const currentDate = new Date();
            const newPurchase = {
                id: currentDate.toString(),
                customerID: customerId,
                productID: selectedProduct.id,
                date: currentDate.toISOString().slice(0, 10),
            };
            const updatedProduct = { ...selectedProduct, quantity: selectedProduct.quantity - 1 };

            dispatch(addPurchase(newPurchase));
            dispatch(updateProduct(updatedProduct));
        },
        [dispatch]
    );

    return (
        <Card sx={{ width: '325px', margin: '20px' }}>
            <CardContent>
                <Typography variant="h6" component="div">
                    <Link to={`/edit-product/${id}`}>{name}</Link>
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Price: {price}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Quantity: {quantity}
                </Typography>
                <Typography variant="body1" component="div" gutterBottom>
                    Customers who bought this product:
                </Typography>
                {filteredCustomers.map((customer) => (
                    <CustomerPurchase
                        key={customer?.id}
                        customer={customer}
                        handleSave={handleSave}
                    />
                ))}
            </CardContent>
        </Card>
    );
};

export default Product;
