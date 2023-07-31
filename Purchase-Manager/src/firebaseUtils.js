import firebase from './firebase';
import { setError } from './actions/errorActions';

const db = firebase.firestore();

export const fetchCollectionData = async (collectionName) => {
    try {
        const collection = db.collection(collectionName);
        const snapshot = await collection.get();
        return snapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error(`Error fetching data from ${collectionName}`, error);
        throw new Error(`Failed to fetch data from ${collectionName}.`);
    }
};

export const loadInitialDataFromFirebase = async (dispatch) => {
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
};