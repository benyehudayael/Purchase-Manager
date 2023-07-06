import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { Card, CardContent, Typography, Button } from '@mui/material';
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
                <h2>Total Purchased Products:</h2>
                <Card sx={{ maxWidth: 400, margin: '20px', padding: '1rem' }}>
                    <h2 style={{ width: 'fit-content', margin: 'auto' }}>{totalPurchasedProducts}</h2>
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
