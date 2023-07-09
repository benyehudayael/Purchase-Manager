import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, List, ListItem, ListItemText } from '@mui/material';

const PurchasesTable = ({ purchases }) => {

    const products = useSelector(state => state.products);
    const customers = useSelector(state => state.customers);
    const getPurchasedProductsByCustomerID = (customerID) => {
        const customerPurchases = purchases.filter(purchase => purchase.customerID === customerID);
        const dates = customerPurchases.map(purchase => purchase.date);
        const productIDs = customerPurchases.map(purchase => purchase.productID);
        const purchasedProducts = products.filter(product => productIDs.includes(product.id));
        return { purchasedProducts, dates };
    };

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
                    {customers.map(customer => {
                        const { purchasedProducts, dates } = getPurchasedProductsByCustomerID(customer.id);
                        return (
                            <TableRow key={customer.id}>
                                <TableCell>
                                    {customer && <Link key={customer.id} to={`/edit-customer/${customer.id}`}>
                                        {`${customer.firstName} ${customer.lastName}`}
                                    </Link>}
                                </TableCell>
                                <TableCell>
                                    {purchasedProducts && purchasedProducts.map(product => {
                                        console.log(product.name)
                                        return (<ListItem key={product.id}>
                                            <Link to={`/edit-product/${product.id}`}>
                                                {product.name}
                                            </Link>
                                        </ListItem>)

                                    })}
                                </TableCell>
                                <TableCell>
                                    <List>
                                        {dates && dates.map((date, index) => (
                                            <ListItem key={index}>
                                                <ListItemText primary={date} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PurchasesTable;
