import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addState } from '../Actions';
// IMPORT CSS
import '../Supports/css/components/popup.css';


class TransactionDetail extends Component {

    open = (item) => {
        this.props.addState(item);
    }

    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    render() {
        return (
            <tr onClick={() => this.open(this.props.item.cart)} >
                <td>{this.props.item.billingAddress.date}</td>
                <td>{this.props.item.billingAddress.name}</td>
                <td>{this.props.item.billingAddress.address}</td>
                <td>{this.props.item.billingAddress.city}, {this.props.item.billingAddress.province}</td>
                <td>{this.props.item.billingAddress.postcode}</td>
                <td>{this.props.item.billingAddress.phone}</td>
                <td>Rp {this.numberWithCommas(this.props.item.totalPrice)}</td>
                <td>{this.props.item.billingAddress.via}</td>
            </tr>
        )
    }
}

const mapStateToProps = state => {
    const transaction = state.transaction;

    return { transaction };
}

export default connect(mapStateToProps, { addState })(TransactionDetail);