import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { API_URL_MONGODB } from '../Supports/api-url/apiurl';
import { closePopUp } from '../Actions';
import TransactionDetail from './TransactionDetail';
import TransactionCartDetail from './TransactionCartDetail';

// IMPORT CSS
import '../Supports/css/components/transaction.css';
import '../Supports/css/components/popup.css';

class Transaction extends Component {
    state = { list: [] };

    componentWillMount() {
        axios.get(`${API_URL_MONGODB}/alltransaction`)
            .then(data => {
                this.setState({ list: data.data });
            })
            .catch(err => {
                console.log(err);
            })
    }

    close = () => {
        this.props.closePopUp();
    }

    renderDetail = () => {
        return this.state.list.map((item) => {
            return <TransactionDetail item={item} user={this.state.user} />
        })
    }

    renderCartDetail = () => {
        return this.props.transaction.item.map(item => {
            return <TransactionCartDetail item={item} />
        })
    }

    render() {
        if (this.state.list == '') {
            return (
                <div>
                    <div class="breadcumb_area bg-img breadcumbimage">
                        <div class="container h-100">
                            <div class="row h-100 align-items-center">
                                <div class="col-12">
                                    <div class="page-title text-center">
                                        <h2>Transactions</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h1>You Don't Have Any Transaction History</h1>
                    </div>
                </div>
            )
        }

        else {
            return (
                <div>
                    <div class="breadcumb_area bg-img breadcumbimage">
                        <div class="container h-100">
                            <div class="row h-100 align-items-center">
                                <div class="col-12">
                                    <div class="page-title text-center">
                                        <h2>Transactions</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Name</th>
                                    <th>Shipping Address</th>
                                    <th>Town/City, Province</th>
                                    <th>Post Code</th>
                                    <th>Phone Number</th>
                                    <th>Total Price</th>
                                    <th>Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderDetail()}
                            </tbody>
                        </table>

                        {/* POP UP */}
                        <div class={`pop-up ${this.props.transaction.open}`} style={{ height: "600px" }}>
                            <div class="content">
                                <div class="container">
                                    <span class="close" onClick={this.close}>close</span>
                                    <table style={{ width: "700px", marginLeft: "-100px" }}>
                                        <tr>
                                            <th>Preview</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total Price</th>
                                        </tr>
                                        {this.renderCartDetail()}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    const auth = state.auth;
    const transaction = state.transaction;
    return { auth, transaction };
};

export default connect(mapStateToProps, { closePopUp })(Transaction);