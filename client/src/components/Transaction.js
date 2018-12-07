import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { API_URL_MYSQL } from '../Supports/api-url/apiurl';
import { closePopUp } from '../Actions';
import TransactionDetail from './TransactionDetail';
import TransactionCartDetail from './TransactionCartDetail';
import UploadInvoice from './UploadInvoice';

// IMPORT CSS
import '../Supports/css/components/transaction.css';
import '../Supports/css/components/popup.css';


class Transaction extends Component {
    state = { transaction: [], transactiondetail: [] };

    componentWillMount() {
        axios.get(`${API_URL_MYSQL}/transaction/${this.props.auth.idUser}`)
            .then(data => {
                this.setState({ transaction: data.data });
            })
            .catch(err => {
                console.log(err);
            })

        axios.get(`${API_URL_MYSQL}/transactiondetail/${this.props.auth.idUser}`)
            .then(data => {
                this.setState({ transactiondetail: data.data });
            })
            .catch(err => {
                console.log(err);
            })
    }

    close = () => {
        this.props.closePopUp();
    }

    renderDetail = () => {
        return this.state.transaction.map((transaction) => {
            var detail = [];
            this.state.transactiondetail.map(tdetail => {
                if (tdetail.TransactionId === transaction.Id) {
                    detail.push(tdetail);
                }
            })

            return <TransactionDetail item={transaction} detail={detail} />
        })
    }

    renderCartDetail = () => {
        return this.props.transaction.item.map(item => {
            return <TransactionCartDetail item={item} />
        })
    }

    renderUploadInvoice = () => {
        return <UploadInvoice />
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
                                    <th>Status</th>
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

                        {/* POP UP INVOICE*/}
                        <div class={`pop-up ${this.props.invoice.openUpload}`} style={{ height: "600px" }}>
                            <div class="content">
                                <div class="container">
                                    <span class="close" onClick={this.close}>close</span>
                                    {this.renderUploadInvoice()}
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
    const invoice = state.invoice;
    return { auth, transaction, invoice };
};

export default connect(mapStateToProps, { closePopUp })(Transaction);