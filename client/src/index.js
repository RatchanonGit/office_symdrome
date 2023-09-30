import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//Route
import { BrowserRouter } from 'react-router-dom';
//Redux
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './components/reducers/index';
import { createStore } from 'redux';

const store = createStore(rootReducer, composeWithDevTools())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


