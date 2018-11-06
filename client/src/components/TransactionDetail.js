import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addState } from '../Actions';
// IMPORT CSS
import '../Supports/css/components/popup.css';


class TransactionDetail extends Component {

    open = (item) => {
        this.props.addState(item);
    }

    render() {
        return (
            <div>
                <tr onClick={() => this.open(this.props.item.cart)} >
                    <td>{this.props.item.billingAddress.date}</td>
                    <td>{this.props.item.billingAddress.address}</td>
                    <td>{this.props.item.billingAddress.phone}</td>
                </tr>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const transaction = state.transaction;

    return { transaction };
}

export default connect(mapStateToProps, { addState })(TransactionDetail);