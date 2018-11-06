import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import transactionReducer from './transactionReducer';

export default combineReducers({
    auth: authReducer,
    cart: cartReducer,
    transaction: transactionReducer
});
