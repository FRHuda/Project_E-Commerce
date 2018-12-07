import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API_URL_MYSQL } from '../Supports/api-url/apiurl';
import { confirmPayment, rejectPayment } from '../Actions';
import axios from 'axios';


class ConfirmInvoice extends Component {

    confirmPayment = () => {
        axios.put(`${API_URL_MYSQL}/confirmpayment/${this.props.invoice.transactionId}`)
            .then(response => {
                console.log(response);
                this.props.confirmPayment();
                window.location.href = "/profile";
            })
            .catch(err => {
                console.log(err);
            })
    }

    rejectPayment = () => {
        axios.put(`${API_URL_MYSQL}/rejectpayment/${this.props.invoice.transactionId}`)
            .then(response => {
                console.log(response);
                this.props.rejectPayment();
                window.location.href = "/profile";
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        if (this.props.invoice.status === 'Transaction Done') {
            return (
                <div>
                    <img className="col-md-12" src={require(`../Supports/InvoiceImage/${this.props.invoice.transactionId}.jpg`)} alt="" />
                </div>
            )
        }

        else if (this.props.invoice.transactionId == 0) {
            return (
                <div>
                    <h1>{this.props.invoice.transactionId}</h1>
                </div>
            )
        }

        else if (this.props.invoice.transactionId !== 0) {
            return (
                <div>
                    <img className="col-md-12" src={require(`../Supports/InvoiceImage/${this.props.invoice.transactionId}.jpg`)} alt="" />
                    <input type="button" className="btn btn-success col-md-12" value="Confirm" onClick={this.confirmPayment} />
                    <input type="button" className="btn btn-danger col-md-12" value="Reject" onClick={this.rejectPayment} />
                </div>
            )
        }
    }
}


const mapStateToProps = state => {
    const invoice = state.invoice;
    return { invoice };
};


export default connect(mapStateToProps, { confirmPayment, rejectPayment })(ConfirmInvoice);