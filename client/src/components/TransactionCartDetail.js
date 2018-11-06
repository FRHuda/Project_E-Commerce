import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closePopUp } from '../Actions';

class TransactionCartDetail extends Component {

    render() {
        return (
            <tr>
                <td>{this.props.item.Name}</td>
                <td>{this.props.item.Price}</td>
                <td>{this.props.item.Quantities}</td>
            </tr>
        )
    }
}

const mapStateToProps = state => {
    const transaction = state.transaction;

    return { transaction };
}

export default connect(mapStateToProps, { closePopUp })(TransactionCartDetail);