import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Container } from '@material-ui/core';
import MenuPage from './components/menu-page/MenuPage';
import ProductsPage from './components/products-page/Products';
import EditProductPage from './components/edit-product-page/EditProductPage';
import EditCustomerPage from './components/edit-customer-page/EditCustomerPage'
import { useDispatch } from 'react-redux';
import firebase from './firebase';
import CustomersPage from './components/customers-page/CustomersPage';
import PurchasedPage from './components/purchased-page/PurchasedPage';

const App = () => {

  const dispatch = useDispatch();
  const db = firebase.firestore();

  const loadInitialDataFromFirebase = async () => {
    try {
      const productsCollection = db.collection('products');
      const customersCollection = db.collection('customers');
      const purchasesCollection = db.collection('purchases');

      const productsSnapshot = await productsCollection.get();
      const customersSnapshot = await customersCollection.get();
      const purchasesSnapshot = await purchasesCollection.get();

      const products = productsSnapshot.docs.map((doc) => doc.data());
      const customers = customersSnapshot.docs.map((doc) => doc.data());
      const purchases = purchasesSnapshot.docs.map((doc) => doc.data());

      // Dispatch actions to set the initial state in the Redux store
      dispatch({ type: 'SET_PRODUCTS', payload: products });
      dispatch({ type: 'SET_CUSTOMERS', payload: customers });
      dispatch({ type: 'SET_PURCHASES', payload: purchases });

      console.log('Initial data loaded from Firebase successfully!');
    } catch (error) {
      console.error('Error loading initial data from Firebase:', error);
    }
  };

  loadInitialDataFromFirebase();

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Routes>
          <Route path="" element={<MenuPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/edit-product/:productId" element={<EditProductPage />} />
          <Route path="/edit-customer/:customerId" element={<EditCustomerPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/purchases" element={<PurchasedPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
