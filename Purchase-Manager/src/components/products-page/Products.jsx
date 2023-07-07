import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, CardContent, Typography } from '@mui/material';

import Product from './Product';

const ProductsPage = () => {
    const products = useSelector((state) => state.products);
    const [totalPurchasedProducts, setTotalPurchasedProducts] = useState(0)

    const calculateTotalPurchasedProducts = () => {
        return products.reduce((total, product) => total + product.quantity, 0);
    };
    useEffect(() => {
        const total = calculateTotalPurchasedProducts();
        setTotalPurchasedProducts(total);
    }, [products]);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            {/* Region 1 */}
            <Box>
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
