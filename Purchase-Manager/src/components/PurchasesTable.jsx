import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

const PurchasesTable = ({ purchases }) => {

    const products = useSelector(state => state.products);
    const customers = useSelector(state => state.customers);

    return (
        <TableContainer component={Paper} style={{ marginTop: '16px' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Customer</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {purchases.map(purchase => {
                        const customer = customers.find(cust => cust.id === purchase.customerID);
                        const product = products.find(prod => prod.id === purchase.productID);
                        return (
                            <TableRow key={purchase.id}>
                                <TableCell>
                                    {customer && <Link to={`/edit-customer/${customer.id}`}>
                                        {`${customer.firstName} ${customer.lastName}`}
                                    </Link>}
                                </TableCell>
                                <TableCell>
                                    {product && <Link to={`/edit-product/${product.id}`}>
                                        {product.name}
                                    </Link>}
                                </TableCell>
                                <TableCell>{purchase.date}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PurchasesTable;
