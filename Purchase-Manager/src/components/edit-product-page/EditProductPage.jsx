import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, TextField, Button } from '@mui/material';
import { deleteProduct } from '../../actions/productsActions';
import { updateProduct } from '../../actions/productsActions';
import { removePurchasesByProductId } from '../../actions/purchasesActions';

const EditProductPage = () => {
    const { productId: id } = useParams();
    const products = useSelector((state) => state.products);
    const customers = useSelector((state) => state.customers);
    const purchases = useSelector((state) => state.purchases);
    const product = products.find((product) => product.id === parseInt(id, 10));
    const productCustomers = purchases
        .filter((purchase) => purchase.productID == parseInt(id, 10))
        .map((purchase) => {
            const customer = customers.find((customer) => customer.id === purchase.customerID);
            return customer;
        })
        .filter((customer) => customer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [productName, setProductName] = useState(product.name);
    const [productPrice, setProductPrice] = useState(product.price);
    const [productQuantity, setProductQuantity] = useState(product.quantity);

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    };

    const handleProductPriceChange = (event) => {
        setProductPrice(event.target.valueAsNumber);
    };

    const handleProductQuantityChange = (event) => {
        setProductQuantity(event.target.valueAsNumber);
    };

    const handleUpdateProduct = (event) => {
        event.preventDefault();
        if (!productName || !productPrice || !productQuantity) {
            alert("Please fill in all the required fields");
        }
        else {
            const updatedProduct = {
                id: product.id,
                name: productName,
                price: productPrice,
                quantity: productQuantity,
            };

            dispatch(updateProduct(updatedProduct));
            alert("Awesome! You've successfully updated the product.")
        }
    };

    const handleDeleteProduct = () => {
        dispatch(deleteProduct(id));
        dispatch(removePurchasesByProductId(id));
        alert('Product successfully deleted');
        navigate('/products');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ width: '329px', height: '410px', justifyContent: 'space-around', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6">Edit Product: {product.name}</Typography>
                <Box component="form" onSubmit={handleUpdateProduct} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <TextField label="Name" value={productName} onChange={handleProductNameChange} />
                    <TextField label="Price" type="number" value={productPrice} onChange={handleProductPriceChange} />
                    <TextField label="Quantity" type="number" value={productQuantity} onChange={handleProductQuantityChange} />
                    <Button variant="contained" type="submit">Update Product</Button>
                </Box>
                <Button variant="contained" color="error" onClick={handleDeleteProduct}>Delete Product</Button>
            </div>
            <div>
                <Typography variant="subtitle1" mt={3}>Customers who bought this product:</Typography>
                {productCustomers.length > 0 && productCustomers.map((customer) => (
                    <Typography variant="body1" key={customer?.id}>
                        <Link to={`/edit-customer/${customer?.id}`}>{customer?.firstName} {customer?.lastName}</Link>
                    </Typography>
                ))}
            </div>
        </div>
    );
};

export default EditProductPage;
