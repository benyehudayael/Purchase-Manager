import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CustomerPurchase = ({ customer, handleSave }) => {
    const { id, firstName, lastName, city, purchasedDate } = customer;
    const products = useSelector((state) => state.products);

    const [selectedProduct, setSelectedProduct] = useState('');
    const [isAddingProduct, setIsAddingProduct] = useState(false);

    const handleAddClick = () => {
        setIsAddingProduct(!isAddingProduct);
    };
    const handleLoacalSave = () => {
        var product = products.find((product) => product.id === parseInt(selectedProduct, 10))
        handleSave(id, product);
        setSelectedProduct('');
        setIsAddingProduct(false);
    }

    return (
        <div key={id}>
            <p>
                <Link to={`/edit-customer/${id}`}>
                    {firstName} {lastName}
                </Link>
            </p>
            <p>Purchased Date: {purchasedDate}</p>
            <button onClick={handleAddClick}>{isAddingProduct ? 'Cancel' : 'Add'}</button>
            {isAddingProduct && (
                <div>
                    <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
                        <option value="">Select a product</option>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={() => handleLoacalSave()}>Save</button>
                </div>
            )}
        </div>
    );
};

export default CustomerPurchase;
