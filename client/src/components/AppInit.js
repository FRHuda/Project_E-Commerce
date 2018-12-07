import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import '../App.css';

import Header from './Header';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import Shop from './Shop';
import RegisterPage from './RegisterPage';
import ProductDetail from './ProductDetail';
import Checkout from './Checkout';
import Transaction from './Transaction';
import Profile from './Profile';
import CobaUpload from './CobaUpload';
import ForgetPassword from './ForgetPassword';



class AppInit extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Route exact path='/profile' component={Profile} />
                <Route exact path='/' component={HomePage} />
                <Route exact path='/login' component={LoginPage} />
                <Route exact path='/shop' component={Shop} />
                <Route exact path='/register' component={RegisterPage} />
                <Route exact path='/productdetail' component={ProductDetail} />
                <Route exact path='/checkout' component={Checkout} />
                <Route exact path='/transaction' component={Transaction} />
                <Route exact path='/cobaupload' component={CobaUpload} />
                <Route exact path='/forgetpassword' component={ForgetPassword} />
            </div>
        )
    }
}

export default AppInit;