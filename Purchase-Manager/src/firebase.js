import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCEEU1M2ApKXzGnaLJKIa50Oc8dXmnCoDc",
    authDomain: "purchase-manager-59fb3.firebaseapp.com",
    projectId: "purchase-manager-59fb3",
    storageBucket: "purchase-manager-59fb3.appspot.com",
    messagingSenderId: "898625149522",
    appId: "1:898625149522:web:2b249003169f3549101d8b",
    measurementId: "G-STG3T0VMTN"
};

if (!firebase.apps.length) {
    // Initialize Firebase app
    firebase.initializeApp(firebaseConfig);
}
export const auth = firebase.auth();

export default firebase;



// const getCollection = async (collectionName) => {
//     const querySnapshot = await getDocs(collection(firestore, collectionName));
//     const collectionData = querySnapshot.docs.map((doc) => doc.data());
//     return collectionData;
// };