import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import transactionReducer from './transactionReducer';
import addressReducer from './addressReducer';
import InvoiceReducer from './InvoiceReducer';

export default combineReducers({
    auth: authReducer,
    cart: cartReducer,
    transaction: transactionReducer,
    address: addressReducer,
    invoice: InvoiceReducer
});
