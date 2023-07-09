import React, { useEffect, useMemo, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import firebase from './firebase';
import { Container } from '@mui/material';

import MenuPage from './components/menu-page/MenuPage';
import ProductsPage from './components/products-page/Products';
import EditProductPage from './components/edit-product-page/EditProductPage';
import EditCustomerPage from './components/edit-customer-page/EditCustomerPage';
import CustomersPage from './components/customers-page/CustomersPage';
import PurchasedPage from './components/purchased-page/PurchasedPage';
import LoginPage from './components/LoginPage';
import NoAccess from './components/NoAccess';


const App = () => {

  const dispatch = useDispatch();
  const db = firebase.firestore();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useMemo(() => {
    const token = localStorage.getItem('token');
    return token !== null;
  }, []);

  const loadInitialDataFromFirebase = useCallback(async () => {
    try {
      const productsCollection = db.collection('products');
      const customersCollection = db.collection('customers');
      const purchasesCollection = db.collection('purchases');
      const usersCollection = db.collection('users');

      const productsSnapshot = await productsCollection.get();
      const customersSnapshot = await customersCollection.get();
      const purchasesSnapshot = await purchasesCollection.get();
      const usersSnapshot = await usersCollection.get();

      const products = productsSnapshot.docs.map((doc) => doc.data());
      const customers = customersSnapshot.docs.map((doc) => doc.data());
      const purchases = purchasesSnapshot.docs.map((doc) => doc.data());
      const users = usersSnapshot.docs.map((doc) => doc.data());

      dispatch({ type: 'SET_PRODUCTS', payload: products });
      dispatch({ type: 'SET_CUSTOMERS', payload: customers });
      dispatch({ type: 'SET_PURCHASES', payload: purchases });
      dispatch({ type: 'SET_USERS', payload: users });

      console.log('Initial data loaded from Firebase successfully!');
    } catch (error) {
      console.error('Error loading initial data from Firebase:', error);
    }
  }, [db, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      await loadInitialDataFromFirebase();
    };

    fetchData();
  }, [loadInitialDataFromFirebase]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userRole');
    dispatch({ type: 'SET_ROLE', payload: storedUserRole });
  }, [dispatch]);

  const userRole = useSelector((state) => state.userRole);

  useEffect(() => {
    if (
      userRole !== 'admin' &&
      (location.pathname.includes('/edit-product/') ||
        location.pathname.includes('/edit-customer/'))
    ) {
      navigate('/no-access');
    }
  }, [userRole, location.pathname, navigate]);

  const pageStyle = useMemo(() => {
    return {
      height: '100%',
    };
  }, []);

  return (
    <Container style={pageStyle}>
      <Routes>
        <Route path="/login" element={<LoginPage style={pageStyle} />} />
        <Route path="/" element={<MenuPage style={pageStyle} />} />
        <Route path="/products" element={<ProductsPage style={pageStyle} />} />
        {userRole === 'admin' && (
          <>
            <Route path="/edit-product/:productId" element={<EditProductPage style={pageStyle} />} />
            <Route path="/edit-customer/:customerId" element={<EditCustomerPage style={pageStyle} />} />
          </>
        )}
        <Route path="/no-access" element={<NoAccess style={pageStyle} />} />
        <Route path="/customers" element={<CustomersPage style={pageStyle} />} />
        <Route path="/purchases" element={<PurchasedPage style={pageStyle} />} />
      </Routes>
    </Container>
  );
};

export default App;
