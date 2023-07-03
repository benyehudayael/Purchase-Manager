import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomer, deleteCustomer } from '../../actions/customersActions';
import { removePurchasesByCustomerId } from '../../actions/purchasesActions';


const EditCustomerPage = () => {
    const { customerId: id } = useParams();
    const [productsCustomer, setProductsCustomer] = useState([]);
    const customers = useSelector((state) => state.customers);
    const products = useSelector((state) => state.products);
    const purchases = useSelector((state) => state.purchases);
    const customer = customers.find((customer) => customer.id === parseInt(id, 10));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [customerFirstName, setCustomerFirstName] = useState(customer.firstName);
    const [customerLastName, setCustomerLastName] = useState(customer.lastName);
    const [customerCity, setCustomerCity] = useState(customer.city);

    const customerPurchases = purchases.filter((purchase) => purchase.customerID == Number(id));

    const productIds = customerPurchases.map((purchase) => purchase.productID);

    useEffect(() => {
        const pC = products.filter((product) => productIds.includes(product.id));
        setProductsCustomer(pC);
    }, []);

    const handleCustomerFirstNameChange = (event) => {
        setCustomerFirstName(event.target.value);
    };

    const handleCustomerLastNameChange = (event) => {
        setCustomerLastName(event.target.value);
    };

    const handleCustomerCityChange = (event) => {
        setCustomerCity(event.target.value);
    };

    const handleUpdateCustomer = (event) => {
        event.preventDefault();

        const updatedCustomer = {
            id: customer.id,
            firstName: customerFirstName,
            lastName: customerLastName,
            city: customerCity,
        };

        dispatch(updateCustomer(updatedCustomer));
    };

    const handleDeleteCustomer = () => {
        dispatch(deleteCustomer(id));
        dispatch(removePurchasesByCustomerId(id));
        alert('Customer successfully deleted');
        navigate('/products');
    };

    return (
        <>
            <div>
                <h2>Edit Customer: {customer.firstName} {customer.lastName}</h2>
                <form onSubmit={handleUpdateCustomer}>
                    <label>
                        First Name:
                        <input type="text" value={customerFirstName} onChange={handleCustomerFirstNameChange} />
                    </label>
                    <label>
                        Last Name:
                        <input type="text" value={customerLastName} onChange={handleCustomerLastNameChange} />
                    </label>
                    <label>
                        City:
                        <input type="text" value={customerCity} onChange={handleCustomerCityChange} />
                    </label>
                    <button type="submit">Update Customer</button>
                </form>
                <button onClick={handleDeleteCustomer}>Delete Customer</button>
            </div>
            <div>
                <ul>
                    {productsCustomer.map((product, index) => (
                        <li key={index}>
                            <Link to={`/edit-product/${product.id}`}>{product.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default EditCustomerPage;
