import React, { useEffect, useState, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import firebase from './firebase';
import { Container, Typography } from '@mui/material';

import MenuPage from './components/menu-page/MenuPage';
import ProductsPage from './components/products-page/Products';
import EditProductPage from './components/edit-product-page/EditProductPage';
import EditCustomerPage from './components/edit-customer-page/EditCustomerPage';
import CustomersPage from './components/customers-page/CustomersPage';
import PurchasedPage from './components/purchased-page/PurchasedPage';
import LoginPage from './components/LoginPage';
import NoAccess from './components/NoAccess';
import GuardedRoute from './components/GuardedRoute';
import ErrorNotification from './components/ErrorNotification';
import { deleteError, setError } from './actions/errorActions';
import { startLoading, stopLoading } from './actions/loadingActions';
import './App.css';


const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const db = firebase.firestore();

  const location = useLocation();

  const isLoading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);

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
      throw new Error(`Failed to fetch data from ${collectionName}.`);
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
      const err = 'There was an error loading data. Please try again later.';
      dispatch(setError(err));
    }
  }, [db, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(startLoading());
      await loadInitialDataFromFirebase();
      dispatch(stopLoading());
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

  return (
    <Container className="fullHeight">
      {isLoading && <div className="load"></div>}
      {error && <ErrorNotification message={error} onClose={() => dispatch(deleteError())} />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MenuPage />} />
        <Route path="/products" element={<ProductsPage />} />
        {GuardedRoute({
          path: "/edit-product/:productId",
          element: <EditProductPage />,
          roles: ['admin']
        })}
        {GuardedRoute({
          path: "/edit-customer/:customerId",
          element: <EditCustomerPage />,
          roles: ['admin']
        })}
        <Route path="/no-access" element={<NoAccess />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/purchases" element={<PurchasedPage />} />
      </Routes>
    </Container>
  );
};

export default App;
