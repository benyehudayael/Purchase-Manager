import 'firebase/auth';
import firebase from 'firebase/app';
import { auth } from './firebase';


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
    localStorage.removeItem('token');
};

export const isAuthenticated = () => {
    return auth.currentUser !== null;
};
