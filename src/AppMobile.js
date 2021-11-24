import React , { useEffect,useState } from 'react';
import { history } from './helpers';
import { Redirect, Route, Router, Switch } from 'react-router';
import { Alert, Row } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';

import PrivateRoute from './mobile/components/privateRoute';


// Actions
import { userActions } from './actions'


//routes
import { Dashboard } from './mobile/components/main/dashboard'
import { AddOrder } from './mobile/components/order/addOrder'
import { Login } from './mobile/components/login'
import { Register } from './mobile/components/register';
import { Customers } from './mobile/components/customers/customers.js';
import { Finance } from './mobile/components/finance/finance.js';
import { Products } from './mobile/components/products/products';
import { AddProduct } from './mobile/components/products/addProduct';
import { EditProduct } from './mobile/components/products/editProduct';
import { Orders } from './mobile/components/order/orders';
import { Reminders } from './mobile/components/reminder/reminders';
import { Discounts } from './mobile/components/discounts/discounts';
import { Employees } from './mobile/components/employee/employees';
import { Determine } from './mobile/components/determine'
import { Setting } from './mobile/components/setting/setting';
import Bills from './mobile/components/finance/bills';
import { Applications } from './mobile/components/employee/applications';
import { Account } from './mobile/components/acounts/account';
import { SaleOpprotunity } from './mobile/components/order/saleOpprotunity';
import { Notes } from './mobile/components/order/notes'
import { Factor } from './mobile/components/order/factor/factor';
import { AddFactor } from './mobile/components/factors/addFactor';
import { Factors } from './mobile/components/factors/factors';
import { NoteFactor } from './mobile/components/factors/noteFactor'
import { Suppliers } from './mobile/components/suppliers/suppliers';
import { Stock } from './mobile/components/stock/stock';
import { Leads } from './mobile/components/leads/leads';
import { AddSeller } from './mobile/components/seller/addSeller';
import { ResetPassword } from './mobile/components/auth/authForgetPassword';
import { SuccessfulPayment } from './mobile/components/payment/successfulPayment'
import { UnSuccessfulPayment } from './mobile/components/payment/unsuccessfulPayment'


// Styles 
import 'bootstrap/dist/css/bootstrap.css';
import './mobile/assets/styles/formStyle.css';
import './mobile/assets/styles/baseStyle.css';
import './mobile/assets/styles/orderStyle.css';
import './mobile/assets/styles/productListStyle.css';
import './mobile/assets/styles/product.css'
import './mobile/assets/styles/dashboardStyle.css';
import './mobile/assets/styles/reminderStyle.css';
import './mobile/assets/styles/discountsStyle.css';
import './mobile/assets/styles/mainStyle.css';
import './mobile/assets/styles/financeStyle.css';
import './mobile/assets/styles/determineStyle.css';
import './mobile/assets/styles/employeeStyle.css';
import './mobile/assets/styles/settingStyle.css';
import './mobile/assets/styles/saleOpprotunityStyle.css';
import './mobile/assets/styles/notesStyle.css';
import './mobile/assets/styles/orderDetails.css';
import './mobile/assets/styles/factorStyle.css';
import './mobile/assets/styles/receiptStyle.css';
import './mobile/assets/styles/leadStyle.css'
import './mobile/assets/styles/accountStyle.css'
import './mobile/assets/styles/sellerStyle.css'
import './mobile/assets/styles/paymentStyle.css'

// Helper
import { socket } from './helpers/socketIo';
import { NotificationCallIncoming } from './mobile/components/notificationView/notifCallIncoming'
import { Sellers } from './mobile/components/seller/sellers';





function AppMobile() {

  const dispatch = useDispatch()
  const alert = useSelector(state => state.alert)
  const [incomCall , setIncomCall] = useState(false);
  const[ bodyLoading , setBodyLoading] = useState(false)
  const [incomCallMessage , setIncomCallMessage] = useState({});
  let isUserEntered = localStorage.getItem("user")
  useEffect(() => {
    
    console.log("_________________________________________________________TRY TO CONNECT_________________________________________________________")
    
    socket.on("connect", data => {
        console.log("_________________Connected_________________", socket.id)
        console.log(data)
    }); 

    socket.on("push", data => {
      if(window.location.pathname !== "/" || window.location.pathname !== "/register" ){
        setIncomCall(true)
        setIncomCallMessage(data.message)
        console.log("___________________________________________New Push___________________________________________", data)
      }
    
    }); 

}, [window.location.pathname])

    useEffect(() => {
      if(isUserEntered === null ){ return }
       dispatch(userActions.appInfo());
    }, [])


  return (
    <Router history={history}>
      {/* {
        alert.message &&
        <>
            <div className="modal-backdrop show"> 
            <Row className="justify-content-center text-center ">
                <Alert variant={alert.type}>
                    {alert.message}
                </Alert>
            </Row>
            </div>
        </>
      } */}
      <Switch>

        <Route exact path="/" component={Login} />
        <Route path="/register" component={Determine} />
        <PrivateRoute path="/products" component={Products} ></PrivateRoute>
        <PrivateRoute path="/orders" component={Orders} ></PrivateRoute>
        <PrivateRoute path="/customers" component={Customers} ></PrivateRoute>
        <PrivateRoute path="/reminders" component={Reminders} ></PrivateRoute>
        <PrivateRoute path="/discounts" component={Discounts} ></PrivateRoute>
        <PrivateRoute path="/finance" component={Finance}></PrivateRoute>
        <PrivateRoute path="/bills" component={Bills}></PrivateRoute>
        <PrivateRoute path="/dashboard" component={Dashboard} ></PrivateRoute>
        <Route path="/order/factor/:orderId/:keyLink" component={Factor} />
        <PrivateRoute path="/order/add" component={AddOrder} ></PrivateRoute>
        <PrivateRoute exact path="/employees" component={Employees} ></PrivateRoute>
        <PrivateRoute path="/setting" component={Setting}></PrivateRoute>
        <PrivateRoute path="/employees/add" component={Applications} ></PrivateRoute>
        <PrivateRoute path="/account" component={Account} ></PrivateRoute>
        <PrivateRoute path="/saleopprotunity" component={SaleOpprotunity}></PrivateRoute>
        <Route exact path="/order/notes" component={Notes}></Route>
        <Route exact path="/factor/note" component={NoteFactor}></Route>
        <PrivateRoute path="/factor/add" component={AddFactor} ></PrivateRoute>
        <PrivateRoute exact path="/factor" component={Factors} ></PrivateRoute>
        <PrivateRoute path="/factor/suppliers" component={Suppliers} ></PrivateRoute>
        <PrivateRoute path="/factor/stock" component={Stock} ></PrivateRoute>
        <PrivateRoute path="/seller/add" component={AddSeller} ></PrivateRoute>
        <PrivateRoute path="/seller" component={Sellers} ></PrivateRoute>
        <PrivateRoute path="/lead" component={Leads} ></PrivateRoute>
        <Route path="/password/reset" component={ResetPassword} ></Route>
        <Route path="/payment/successful" component={SuccessfulPayment} />
        <Route path="/payment/unsuccessful" component={UnSuccessfulPayment} />
        <Redirect from="*" to="/" />
      </Switch>
      <NotificationCallIncoming incomCall={incomCall} setIncomCall={setIncomCall} incomCallMessage={incomCallMessage} setIncomCallMessage={setIncomCallMessage} />
    </Router>
  );
}

export default AppMobile;