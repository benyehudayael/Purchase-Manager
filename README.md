:sparkles: :love_you_gesture: :heartpulse: :star: :sparkles: :sunny: :cherry_blossom:
# Store Management Web Application

This is a web application built with React for managing a store's data including customers, products, and purchases. The application utilizes Redux and Firebase for handling data storage and management.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository to your local machine:
`git clone https://github.com/your-username/your-repo.git`

2. Install the necessary dependencies using the package manager of your choice (e.g., npm or yarn):
   npm install

3. Set up Firebase configuration by creating a `firebase.js` file in the project's `src` directory. Inside the `firebase.js` file, add the following code and replace the placeholders with your Firebase configuration values:

```javascript
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID'
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export const auth = firebase.auth();

export default firebase; 
```

4. Start the development server:
```
npm run dev
```
6. Open the application in your browser at http://localhost:5173.
## Features

- **User Authentication:** Only registered users can access the application. Administrators have additional privileges for editing products and customers.
- **Menu Page:** A centralized page with links to navigate to different sections of the application, including Products, Customers, and Purchases.
- **Products Page:** View and manage product information, including name, price, and quantity. See a list of customers who have purchased a specific product and add a new purchase to a customer.
- **Customers Page:** Display a table of customers along with their purchased products and dates. Purchase new products for customers.
- **Purchases Page:** Filter and search purchases by customer, product type, and date, displaying the relevant information.
- **Edit Product Page:** Update or delete product data, including the ability to remove all related purchase data from the database. View the list of customers associated with the product.
- **Edit Customer Page:** Update or delete customer data, including the ability to remove all related purchase data from the database. View the list of products purchased by the customer.

## Technologies Used

- React
- Redux
- Firebase
- Material-UI
  
### Note:

1. For using the application effectively, you will need to create the necessary collections in your Firebase project: *products*, *customers*, *purchases*, and *userRoles*. It is recommended to set up some predefined data for *products*, *customers*, and *userRoles* to kickstart your store management journey.
2. User accounts need to be created in Firebase Authentication to grant access to the application. This ensures secure and personalized user experiences within the store management app.

:sparkles: :love_you_gesture: :heartpulse: :star: :sparkles: :sunny: :cherry_blossom:
