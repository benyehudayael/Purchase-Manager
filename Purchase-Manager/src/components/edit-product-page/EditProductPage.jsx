import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, TextField, Button, Container, Grid, ListItemText, ListItem } from '@mui/material';
import { deleteProduct, updateProduct } from '../../actions/productsActions';
import { removePurchasesByProductId } from '../../actions/purchasesActions';

const EditProductPage = () => {
    const { productId: id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const products = useSelector((state) => state.products);
    const customers = useSelector((state) => state.customers);
    const purchases = useSelector((state) => state.purchases);

    const product = products.find((product) => product.id === Number(id));
    const [formData, setFormData] = useState({ name: '', price: '', quantity: '' });

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productQuantity, setProductQuantity] = useState(0);

    useEffect(() => {
        if (product) {
            const { name, price, quantity } = product;
            setFormData({ name, price, quantity });
        }
    }, [product]);

    const getProductCustomers = (productId) => {
        const customerIds = purchases
            .filter(purchase => purchase.productID === parseInt(productId, 10))
            .map(purchase => purchase.customerID);

        const filteredCustomers = customers.filter(customer =>
            customerIds.includes(customer.id)
        );

        return filteredCustomers;
    };

    const productCustomers = useMemo(() => getProductCustomers(id), [id, purchases, customers]);

    // const handleProductNameChange = event => {
    //     setProductName(event.target.value);
    // };

    // const handleProductPriceChange = event => {
    //     setProductPrice(event.target.valueAsNumber);
    // };

    // const handleProductQuantityChange = event => {
    //     setProductQuantity(event.target.valueAsNumber);
    // };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdateProduct = event => {
        event.preventDefault();
        const { name, price, quantity } = formData;

        if (!name || !price || !quantity) {
            alert("Please fill in all the required fields");
        } else {
            const updatedProduct = { id: product.id, ...formData };

            dispatch(updateProduct(updatedProduct));
            alert("Awesome! You've successfully updated the product.");
        }
    };

    const handleDeleteProduct = () => {
        dispatch(deleteProduct(id));
        dispatch(removePurchasesByProductId(id));
        alert('Product successfully deleted');
        navigate('/products');
    };

    return (
        <Container maxWidth="md"> {/* Wrap the entire component in a Container */}
            <Grid container spacing={3} justifyContent="space-around">
                <Grid item xs={12} md={6}>
                    {/* Product form */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Typography variant="h6">Edit Product: <span style={{ color: 'gray' }}>{product ? product.name : ''}</span></Typography>
                        <Box component="form" onSubmit={handleUpdateProduct} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <TextField label="Name" value={formData.name} name="name" onChange={handleInputChange} />
                            <TextField label="Price" type="number" value={formData.price} name="price" onChange={handleInputChange} />
                            <TextField label="Quantity" type="number" value={formData.quantity} name="quantity" onChange={handleInputChange} />
                            <Box sx={{ display: 'flex', gap: '16px' }}>
                                <Button variant="contained" type="submit">Update</Button>
                                <Button variant="contained" color="error" onClick={handleDeleteProduct}>Delete</Button>
                            </Box>
                        </Box>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* Customers who bought this product */}
                    <div>
                        <Typography variant="subtitle1" mt={3}>Customers who bought this product:</Typography>
                        {productCustomers.length > 0 ? (
                            productCustomers.map((customer, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemText primary={<Link to={`/edit-customer/${customer.id}`}>{`${customer.firstName} ${customer.lastName}`}</Link>} />
                                </ListItem>
                            ))
                        ) : (
                            <Typography variant="body1">No customers have bought this product.</Typography>
                        )}
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default EditProductPage;
