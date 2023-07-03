import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App.jsx'
import './index.css'
import appReducer from './reducers/index.js'
import { legacy_createStore as createStore } from 'redux';

const appStore = createStore(appReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
)
