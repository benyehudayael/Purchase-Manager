import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { findProductById, isProductAvailable } from '../../utils/products';

const CustomerPurchase = ({ customer: { id, firstName, lastName, purchasedDate }, handleSave }) => {
    const products = useSelector((state) => state.products);

    const [selectedProduct, setSelectedProduct] = useState('');
    const [isAddingProduct, setIsAddingProduct] = useState(false);

    const handleAddClick = () => setIsAddingProduct(prev => !prev);

    const handleLocalSave = () => {
        var product = findProductById(products, selectedProduct);

        if (isProductAvailable(product)) {
            handleSave(id, product);
            setSelectedProduct('');
            setIsAddingProduct(false);
        } else {
            alert('Product is out of stock');
        }
    }

    return (
        <Card className='card' sx={{ marginBottom: '20px' }}>
            <CardContent>
                <Typography variant="h6" component="div">
                    <Link to={`/edit-customer/${id}`}>
                        {firstName} {lastName}
                    </Link>
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Purchased Date: {purchasedDate}
                </Typography>
                <Button variant="contained" onClick={handleAddClick}>
                    {isAddingProduct ? 'Cancel' : 'Add'}
                </Button>
                {isAddingProduct && (
                    <div style={{ marginTop: '10px' }}>
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel>Select a product</InputLabel>
                            <Select
                                value={selectedProduct}
                                onChange={(e) => setSelectedProduct(e.target.value)}
                            >
                                {products.map((product) => (
                                    <MenuItem key={product.id} value={product.id}>
                                        {product.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            onClick={handleLocalSave}
                            style={{ margin: '10px' }}
                            disabled={!selectedProduct}
                        >
                            Save
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default React.memo(CustomerPurchase);
