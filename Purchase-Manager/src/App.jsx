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
  const userRole = useSelector((state) => state.userRole);

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null;
  };

  const fetchCollectionData = async (collectionName) => {
    try {
      const collection = db.collection(collectionName);
      const snapshot = await collection.get();
      return snapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error(`Error fetching data from ${collectionName}`, error);
      return [];
    }
  };

  const loadInitialDataFromFirebase = useCallback(async () => {
    try {
      const products = await fetchCollectionData('products');
      const customers = await fetchCollectionData('customers');
      const purchases = await fetchCollectionData('purchases');
      const users = await fetchCollectionData('users');

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
    const storedUserRole = localStorage.getItem('userRole');
    dispatch({ type: 'SET_ROLE', payload: storedUserRole });

    if (!isAuthenticated) {
      navigate('/login');
    }

    if (storedUserRole !== 'admin' &&
      (location.pathname.includes('/edit-product/') ||
        location.pathname.includes('/edit-customer/'))
    ) {
      navigate('/no-access');
    }
  }, [navigate, isAuthenticated, location.pathname, dispatch]);

  const pageStyle = () => {
    return {
      height: '100%',
    };
  };

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
