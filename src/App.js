import React from 'react';
import { history } from '../src/helpers';
import { Dashboard } from './components/main/dashboard'
import { AddOrder } from './components/order/addOrder'
import PrivateRoute from './components/privateRoute';
import { Redirect, Route, Router, Switch } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';

//routes
import { Login } from './components/login'
import { Register } from './components/register';
import { Customers } from './components/customers/customers.js';
import { Finance } from './components/finance/finance.js';
import { Products } from './components/products/products';
import { AddProduct } from './components/products/addProduct';
import { EditProduct } from './components/products/editProduct';
import { Orders } from './components/order/orders';
import { Reminders } from './components/reminder/reminders';
import { Discounts } from './components/discounts/discounts';
import { Employees } from './components/employee/employees';
import { Determine } from './components/determine'
import { Setting } from './components/setting/setting';
import Bills from './components/finance/bills';
import { Applications } from './components/employee/applications';
import { Account } from './components/acounts/account';
import { SaleOpprotunity } from './components/order/saleOpprotunity';


function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Determine} />
        <PrivateRoute path="/products" component={Products} ></PrivateRoute>
        <PrivateRoute path="/orders" component={SaleOpprotunity} ></PrivateRoute>
        <PrivateRoute path="/customers" component={Customers} ></PrivateRoute>
        <PrivateRoute path="/reminders" component={Reminders} ></PrivateRoute>
        <PrivateRoute path="/discounts" component={Discounts} ></PrivateRoute>
        <PrivateRoute path="/finance" component={Finance}></PrivateRoute>
        <PrivateRoute path="/bills" component={Bills}></PrivateRoute>
        <PrivateRoute path="/dashboard" component={Dashboard} ></PrivateRoute>
        <PrivateRoute path="/order/add" component={AddOrder} ></PrivateRoute>
        <PrivateRoute path="/employees" component={Employees} ></PrivateRoute>
        <PrivateRoute path="/setting" component={Setting}></PrivateRoute>
        <PrivateRoute path="/employee/add" component={Applications} ></PrivateRoute>
        <PrivateRoute path="/account" component={Account} ></PrivateRoute>
        <PrivateRoute path="/saleopprotunity" component={SaleOpprotunity} ></PrivateRoute>
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;