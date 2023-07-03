import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
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

        const updatedProduct = {
            id: product.id,
            name: productName,
            price: productPrice,
            quantity: productQuantity,
        };

        dispatch(updateProduct(updatedProduct));
    };

    const handleDeleteProduct = () => {
        dispatch(deleteProduct(id));
        dispatch(removePurchasesByProductId(id));
        alert('Product successfully deleted');
        navigate('/products');
    };

    return (
        <div>
            <div>
                <h2>Edit Product: {product.name}</h2>
                <form onSubmit={handleUpdateProduct}>
                    <label>
                        Name:
                        <input type="text" value={productName} onChange={handleProductNameChange} />
                    </label>
                    <label>
                        Price:
                        <input type="number" value={productPrice} onChange={handleProductPriceChange} />
                    </label>
                    <label>
                        Quantity:
                        <input type="number" value={productQuantity} onChange={handleProductQuantityChange} />
                    </label>
                    <button type="submit">Update Product</button>
                </form>
                <button onClick={handleDeleteProduct}>Delete Product</button>
            </div>

            <div>
                <h3>Customers who bought this product:</h3>
                {productCustomers.length > 0 && productCustomers.map((customer) => (
                    <div key={customer?.id}>
                        <Link to={`/edit-customer/${customer?.id}`}>{customer?.firstName} {customer?.lastName}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EditProductPage;
