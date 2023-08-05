import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, List, ListItem, ListItemText, Grid } from '@mui/material';

import { getPurchasedProductsByCustomerID } from '../utils/purchases'

const PurchasesTable = ({ purchases }) => {
    const products = useSelector(state => state.products);
    const customers = useSelector(state => state.customers);

    return (
        <TableContainer component={Paper} style={{ marginTop: '16px' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Customer</TableCell>
                        <TableCell>purchases</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customers.map(customer => {
                        const { purchasedProducts, dates } = getPurchasedProductsByCustomerID(purchases, products, customer.id);
                        if (purchasedProducts.length > 0 && dates.length > 0) {
                            return (
                                <TableRow key={customer.id}>
                                    <TableCell>
                                        {customer && <Link key={customer.id} to={`/edit-customer/${customer.id}`}>
                                            {`${customer.firstName} ${customer.lastName}`}
                                        </Link>}
                                    </TableCell>
                                    <TableCell>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <List>
                                                    {purchasedProducts && purchasedProducts.map((product, index) => {
                                                        return (
                                                            <ListItem key={index}>
                                                                <Link to={`/edit-product/${product.id}`}>
                                                                    <ListItemText primary={product.name} />
                                                                </Link>
                                                            </ListItem>
                                                        );
                                                    })}
                                                </List>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <List>
                                                    {dates && dates.map((date, index) => (
                                                        <ListItem key={index}>
                                                            <ListItemText primary={date} />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            );
                        }
                        return null;
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default React.memo(PurchasesTable);
