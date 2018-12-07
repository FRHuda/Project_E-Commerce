import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addState, addStateInvoice } from '../Actions';
// IMPORT CSS
import '../Supports/css/components/popup.css';


class TransactionDetail extends Component {

    open = (item) => {
        this.props.addState(item);
    }

    openUploadInvoice = (id, status) => {
        this.props.addStateInvoice(id, status);
    }

    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    render() {
        if (this.props.item.Status === 'Paid, Waiting Confirmation') {
            return (
                <tr onClick={() => this.open(this.props.detail)} >
                    <td>{this.props.item.Date}</td>
                    <td>{this.props.item.Name}</td>
                    <td>{this.props.item.Address}</td>
                    <td>{this.props.item.City}, {this.props.item.Province}</td>
                    <td>{this.props.item.PostCode}</td>
                    <td>{this.props.item.Phone}</td>
                    <td>Rp {this.numberWithCommas(this.props.item.TotalPrice)}</td>
                    <td>
                        {this.props.item.Status}
                        <input type="button" value="Confirm" className="btn btn-primary" onClick={() => this.openUploadInvoice(this.props.item.Id, this.props.item.Status)} />
                    </td>
                </tr>
            )
        }
        else if (this.props.item.Status === 'Transaction Done') {
            return (
                <tr onClick={() => this.open(this.props.detail)} >
                    <td>{this.props.item.Date}</td>
                    <td>{this.props.item.Name}</td>
                    <td>{this.props.item.Address}</td>
                    <td>{this.props.item.City}, {this.props.item.Province}</td>
                    <td>{this.props.item.PostCode}</td>
                    <td>{this.props.item.Phone}</td>
                    <td>Rp {this.numberWithCommas(this.props.item.TotalPrice)}</td>
                    <td>
                        {this.props.item.Status}
                        <p></p>
                        <input type="button" value="View Invoice" className="btn btn-primary" onClick={() => this.openUploadInvoice(this.props.item.Id, this.props.item.Status)} />
                    </td>
                </tr>
            )
        }
        else {
            return (
                <tr onClick={() => this.open(this.props.detail)} >
                    <td>{this.props.item.Date}</td>
                    <td>{this.props.item.Name}</td>
                    <td>{this.props.item.Address}</td>
                    <td>{this.props.item.City}, {this.props.item.Province}</td>
                    <td>{this.props.item.PostCode}</td>
                    <td>{this.props.item.Phone}</td>
                    <td>Rp {this.numberWithCommas(this.props.item.TotalPrice)}</td>
                    <td>{this.props.item.Status}</td>
                </tr>
            )
        }
    }
}

const mapStateToProps = state => {
    const transaction = state.transaction;

    return { transaction };
}

export default connect(mapStateToProps, { addState, addStateInvoice })(TransactionDetail);