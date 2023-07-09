import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, CardContent, Typography } from '@mui/material';

import Product from './Product';

const ProductsPage = () => {
    const products = useSelector((state) => state.products);
    const purchases = useSelector((state) => state.purchases);
    const [totalPurchasedProducts, setTotalPurchasedProducts] = useState(0)

    useEffect(() => {
        setTotalPurchasedProducts(purchases.length);
    }, [purchases]);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '25px' }}>
            {/* Region 1 */}
            <Box sx={{ marginTop: '1rem' }}>
                <Typography variant="h6">Total Purchased Products:</Typography>
                <Card sx={{ maxWidth: 400, margin: '20px', padding: '1rem' }}>
                    <Typography variant="h4" align="center">{totalPurchasedProducts}</Typography>
                </Card>
            </Box>

            {/* Region 2 */}
            <Box>
                {products.map(product => (
                    <Product key={product.id} product={product} />
                ))}
            </Box>
        </Box>
    );
};

export default ProductsPage;
