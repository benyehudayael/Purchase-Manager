import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, Typography, Grid } from '@mui/material';

import Product from './Product';

const ProductsPage = () => {
    const products = useSelector((state) => state.products);
    const purchases = useSelector((state) => state.purchases);

    const [totalPurchasedProducts, setTotalPurchasedProducts] = useState(purchases.length);

    useEffect(() => {
        setTotalPurchasedProducts(purchases.length);
        const unsubscribe = () => {
            setTotalPurchasedProducts(purchases.length);
        };

        return unsubscribe;
    }, [purchases]);

    return (
        <Box sx={{ marginTop: '25px' }}>
            <Grid container spacing={2} justifyContent="space-around">
                {/* Total amount of purchased products */}
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h5" marginLeft='20px' width='fitContent'>Total purchased products:</Typography>
                    <Typography variant="h2" align="center">{totalPurchasedProducts}</Typography>
                </Grid>
                {/* Products data */}
                <Grid item xs={12} sm={6} md={8}>
                    {products.length > 0 ? (
                        <>
                            <Typography variant="h5" marginLeft='20px' width='fitContent'>Product-customer overview:</Typography>
                            {products.map((product) => (
                                <Product key={product.id} product={product} />
                            ))}
                        </>
                    ) : (
                        <Typography variant="h6" align="center">
                            No products available.
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductsPage;
