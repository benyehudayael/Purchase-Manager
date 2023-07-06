import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';
import CustomerPurchase from './CustomerPurchase';
import { useDispatch, useSelector } from 'react-redux';
import { addPurchase } from '../../actions/purchasesActions';
import { updateProduct } from '../../actions/productsActions';

const Product = ({ product }) => {
    const { id, name, price, quantity } = product;
    const customers = useSelector((state) => state.customers);
    const purchases = useSelector((state) => state.purchases);
    const [filteredCustomers, setFilteredCustomers] = useState([]);

    useEffect(() => {
        const fC = customersWhoBoughtProduct()
        setFilteredCustomers(fC);
    }, [purchases, customers]);

    const customersWhoBoughtProduct = () => {
        const customerIds = purchases
            .filter((purchase) => purchase.productID === id)
            .map((purchase) => purchase.customerID);

        return customers
            .filter((customer) => customerIds.includes(customer.id))
            .map((customer) => {
                const purchase = purchases.find(
                    (purchase) => purchase.customerID === customer.id && purchase.productID === id
                );
                return {
                    ...customer,
                    purchasedDate: purchase ? purchase.date : null
                };
            });
    };

    const dispatch = useDispatch();

    const handleSave = (customerId, selectedProduct) => {
        const currentDate = new Date();
        const newPurchase = {
            id: currentDate.toString(),
            customerID: customerId,
            productID: selectedProduct.id,
            date: currentDate.toISOString().slice(0, 10),
        };
        const product = { ...selectedProduct, quantity: selectedProduct.quantity - 1 }
        dispatch(addPurchase(newPurchase));
        dispatch(updateProduct(product));
    };

    return (
        <Card sx={{ maxWidth: 400, marginBottom: '20px' }}>
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
                <Typography variant="h6" component="div">
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
