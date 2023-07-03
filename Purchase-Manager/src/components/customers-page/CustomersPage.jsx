import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { generateUniqueId } from '../../helper'

const CustomersPage = () => {
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const dispatch = useDispatch();
    const customers = useSelector(state => state.customers);
    const products = useSelector(state => state.products);
    const purchases = useSelector(state => state.purchases);

    const handleBuyProduct = () => {
        const newPurchaseId = generateUniqueId();

        const newPurchase = {
            id: newPurchaseId,
            customerID: selectedCustomer,
            productID: selectedProduct,
            date: new Date().toISOString().slice(0, 10),
        };

        dispatch({ type: 'ADD_PURCHASE', payload: newPurchase });

        setSelectedProduct('');
        setSelectedCustomer('');
    };

    const handleCancel = () => {
        setIsFormOpen(false);
        setSelectedProduct('');
        setSelectedCustomer('');
    };

    return (
        <>
            <h1>Customers Page</h1>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div className="region1">
                    <h2>Region 1</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Product Name</th>
                                <th>Purchased Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchases.map(purchase => {
                                const customer = customers.find(cust => cust.id == purchase.customerID);
                                const product = products.find(prod => prod.id == purchase.productID);
                                return (
                                    <tr key={purchase?.id}>
                                        <td>{customer && (<Link to={`/edit-customer/${customer.id}`}>{customer.firstName}</Link>)}</td>
                                        <td>
                                            {product && (<Link to={`/edit-product/${product.id}`}>{product.name}</Link>)}
                                        </td>
                                        <td>{purchase.date}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="region2">
                    <button onClick={() => setIsFormOpen(true)}>Buy Product</button>
                    {isFormOpen && (
                        <form>
                            <select
                                value={selectedProduct}
                                onChange={(e) => setSelectedProduct(e.target.value)}
                            >
                                <option value="">Select Product</option>
                                {products.map((product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={selectedCustomer}
                                onChange={(e) => setSelectedCustomer(e.target.value)}
                            >
                                <option value="">Select Customer</option>
                                {customers.map((customer) => (
                                    <option key={customer.id} value={customer.id}>
                                        {customer.firstName} {customer.lastName}
                                    </option>
                                ))}
                            </select>

                            <button type="button" onClick={handleBuyProduct}>
                                Buy
                            </button>
                            <button type="button" onClick={handleCancel}>
                                Cancel
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default CustomersPage;
