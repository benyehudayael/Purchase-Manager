import 'firebase/auth';
import firebase from 'firebase/app';
import { auth } from './firebase';

const storeTokenInLocalStorage = (token) => {
    localStorage.setItem('token', token);
};

const getTokenFromLocalStorage = () => {
    return localStorage.getItem('token');
};

const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('token');
};

export const login = async (email, password) => {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        const token = await user.getIdToken();

        const role = await getUserRole(user.uid);

        return {
            token,
            role
        };
    } catch (error) {
        throw new Error('Invalid email or password.');
    }
};

const getUserRole = async (uid) => {
    const db = firebase.firestore();
    try {
        const doc = await db.collection('userRoles').where('uid', '==', uid).get();
        if (!doc.empty) {
            const userRoleDoc = doc.docs[0];
            const d = userRoleDoc.data();
            return d.role;
        } else {
            return 'unknown';
        }
    } catch (error) {
        console.log('Error getting user role:', error);
        throw new Error('Failed to get user role.');
    }
};

export const logout = async () => {
    await auth.signOut();
    removeTokenFromLocalStorage();
};

// export const isAuthenticated = () => {
//     return auth.currentUser !== null;
// };
// export const isAuthenticated = async () => {
//     const token = getTokenFromLocalStorage();
//     if (token) {
//         try {
//             await firebase.auth().signInWithCredential(firebase.auth.EmailAuthProvider.credential(null, token));
//             return true;
//         } catch (error) {
//             console.error('Error authenticating with the stored token:', error);
//             removeTokenFromLocalStorage();
//         }
//     }

//     return false;
// };
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null;
};