import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, List, ListItem, ListItemText } from '@mui/material';

const PurchasesTable = ({ purchases }) => {

    const products = useSelector(state => state.products);
    const customers = useSelector(state => state.customers);

    const getPurchasedProductsByCustomerID = (customerID) => {
        const customerPurchases = purchases.filter(purchase => purchase.customerID === customerID);
        const dates = customerPurchases.map(purchase => {
            const date = purchase.date
            const formattedDate = date.replace(/-/g, '/');
            return formattedDate;
        });
        const purchasedProducts = customerPurchases.map(purchase => {
            return products.find(product => product.id === purchase.productID);
        });
        // const productIDs = customerPurchases.map(purchase => purchase.productID);
        // const purchasedProducts = products.filter(product => productIDs.includes(product.id));
        return { purchasedProducts, dates };
    };

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
                        const { purchasedProducts, dates } = getPurchasedProductsByCustomerID(customer.id);
                        if (purchasedProducts.length > 0 && dates.length > 0) {
                            return (
                                <TableRow key={customer.id}>
                                    <TableCell>
                                        {customer && <Link key={customer.id} to={`/edit-customer/${customer.id}`}>
                                            {`${customer.firstName} ${customer.lastName}`}
                                        </Link>}
                                    </TableCell>
                                    <TableCell style={{ display: "flex" }}>
                                        <List>
                                            {purchasedProducts && purchasedProducts.map((product, index) => {
                                                return (<ListItem key={index}>
                                                    <Link to={`/edit-product/${product.id}`}>
                                                        <ListItemText primary={product.name} />
                                                    </Link>
                                                </ListItem>)
                                            })}
                                        </List>
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
                        }
                        return null;
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PurchasesTable;
