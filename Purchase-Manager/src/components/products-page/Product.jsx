import React, { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import CustomerPurchase from './CustomerPurchase';
import { addPurchase } from '../../actions/purchasesActions';
import { updateProduct } from '../../actions/productsActions';

import { getRelatedCustomers } from '../../selectors';
const Product = ({ product: { id, name, price, quantity } }) => {

    const relatedCustomers = useSelector(state => getRelatedCustomers(state, id));

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
                {relatedCustomers.length === 0 ? (
                    <Typography variant="body2" color="textSecondary">
                        No customers have purchased this product yet.
                    </Typography>
                ) : (
                    <>
                        <Typography variant="body1" component="div" gutterBottom>
                            Customers who bought this product:
                        </Typography>
                        {relatedCustomers.map((customer) => (
                            <CustomerPurchase
                                key={customer?.id}
                                customer={customer}
                                handleSave={handleSave}
                            />
                        ))}
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default Product;
