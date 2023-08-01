import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, Typography } from '@mui/material';

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
        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '25px' }}>
            {/* Total amount of purchased products */}
            <Box>
                <Typography variant="h6">Total purchased products:</Typography>
                <Card sx={{ maxWidth: 400, margin: '20px', padding: '1rem' }}>
                    <Typography variant="h4" align="center">{totalPurchasedProducts}</Typography>
                </Card>
            </Box>
            {/* Products data */}
            <Box>
                {products.length > 0 ? (<>
                    <Typography variant="h6">Product-customer overview:</Typography>
                    {products.map(product => <Product key={product.id} product={product} />)}
                </>
                ) : (
                    <Typography variant="h6" align="center">
                        No products available.
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default ProductsPage;
