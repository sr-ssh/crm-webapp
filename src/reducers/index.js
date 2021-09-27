import { combineReducers } from 'redux';
import { authentication, register, verificationCode } from './authenticationReducer';
import { alert } from './alertReducer';
import { getCustomers, getCustomer, getExcelCustomers } from './customerReducer'
import { getProducts, addProduct, editProduct, uploadExcelProducts } from './productReducer'
import { financeSummary, bill } from './financeReducer'
import {
    addOrder, getOrders, setOrdersFilter, editOrderStatus, getOrderSms, deliverySms, editOrderSms, cancelProductOrder, editOrderQuantity,
    editOrderPrice, editProducOrder, orderDetails, getShareLinkOrder, uploadDoc
} from './orderReducer'
import { getReminders } from './reminderReducer'
import { getDiscounts } from './discountReducer';
import { addDiscount } from './discountReducer';
import { getEmployees, editEmployee, addEmployee, deleteEmployee, getApplications, addApplication } from './employeeReducer';
import { getPermissions } from './employeeReducer';
import { getUserInfo, editUserInfo } from './userReducer';
import { getNotes, addNotes, editStatusNotes } from './notesReducer'
import { getShareLinkConfig, editShareLinkConfig } from './settingReducer'
import { getStock, addStock, editStock } from './stockReducer';
import { getSupplier, getSuppliers, getExcelSuppliers } from './supplierReducer';
import { addReceipt, confirmShop, getReceipts, editReceiptStatus, editReceipt } from './receiptReducer';

export default combineReducers({
    authentication,
    register,
    alert,
    getProducts,
    addProduct,
    editProduct,
    getCustomers,
    getCustomer,
    financeSummary,
    editOrderStatus,
    bill,
    addOrder,
    getOrders,
    setOrdersFilter,
    getReminders,
    getDiscounts,
    addDiscount,
    getEmployees,
    editEmployee,
    addEmployee,
    deleteEmployee,
    getPermissions,
    verificationCode,
    getUserInfo,
    getOrderSms,
    getApplications,
    addApplication,
    editUserInfo,
    deliverySms,
    editOrderSms,
    cancelProductOrder,
    editOrderQuantity,
    editOrderPrice,
    editProducOrder,
    getNotes,
    addNotes,
    orderDetails, uploadDoc,
    getExcelCustomers,
    getShareLinkConfig,
    editShareLinkConfig,
    getShareLinkOrder,
    editStatusNotes,
    getStock, addStock, editStock,
    getSupplier, getSuppliers, getExcelSuppliers,
    addReceipt, confirmShop,
    getReceipts, editReceiptStatus, editReceipt,
    uploadExcelProducts
})