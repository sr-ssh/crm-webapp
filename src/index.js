import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './helpers';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';


import './assets/styles/formStyle.css';
import './assets/styles/baseStyle.css';
import './assets/styles/orderStyle.css';
import './assets/styles/productListStyle.css';
import './assets/styles/product.css'
import './assets/styles/dashboardStyle.css';
import './assets/styles/reminderStyle.css';
import './assets/styles/discountsStyle.css';
import './assets/styles/mainStyle.css';
import './assets/styles/financeStyle.css';
import './assets/styles/determineStyle.css';
import './assets/styles/employeeStyle.css';
import './assets/styles/settingStyle.css';
import './assets/styles/saleOpprotunityStyle.css';
import './assets/styles/notesStyle.css';


import { BrowserRouter } from 'react-router-dom';



ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


