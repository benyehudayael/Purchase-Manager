import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';

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

import { deleteError } from './actions/errorActions';
import { loadInitialDataFromFirebase } from './firebaseUtils';
import { startLoading, stopLoading } from './actions/loadingActions';
import { isAuthenticated } from './auth'
import './App.css';


const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const isLoading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);
  const isLoggedIn = isAuthenticated();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(startLoading());
      await loadInitialDataFromFirebase(dispatch);
      dispatch(stopLoading());
    };

    fetchData();
  }, [loadInitialDataFromFirebase]);

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userRole');
    dispatch({ type: 'SET_ROLE', payload: storedUserRole });

    if (!isLoggedIn) {
      navigate('/login');
    }

    if (storedUserRole !== 'admin' &&
      (location.pathname.includes('/edit-product/') ||
        location.pathname.includes('/edit-customer/'))
    ) {
      navigate('/no-access');
    }
  }, [navigate, isLoggedIn, location.pathname, dispatch]);

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
