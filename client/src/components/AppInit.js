import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import '../App.css';

import Header from './Header';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import Shop from './Shop';
import AdminAdd from './AdminAdd';
import Admin from './Admin';
import RegiserPage from './RegiserPage';
import ProductDetail from './ProductDetail';
import Checkout from './Checkout';
import Transaction from './Transaction';



class AppInit extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Route exact path='/admin' component={Admin} />
                <Route path='/admin/add' component={AdminAdd} />
                <Route exact path='/' component={HomePage} />
                <Route exact path='/login' component={LoginPage} />
                <Route exact path='/shop' component={Shop} />
                <Route exact path='/register' component={RegiserPage} />
                <Route exact path='/productdetail' component={ProductDetail} />
                <Route exact path='/checkout' component={Checkout} />
                <Route exact path='/transaction' component={Transaction} />
            </div>
        )
    }
}

export default AppInit;