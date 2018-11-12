import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closePopUp } from '../Actions';

class TransactionCartDetail extends Component {

    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    render() {
        return (
            <tr>
                <td><img src={this.props.item.Img} alt={this.props.item.Id} style={{ width: "150px", height: "120px" }} /></td>
                <td>{this.props.item.Name}</td>
                <td>Rp {this.numberWithCommas(this.props.item.Price)}</td>
                <td>{this.props.item.Quantities}</td>
                <td>Rp {this.numberWithCommas(this.props.item.Price * this.props.item.Quantities)}</td>
            </tr>
        )
    }
}

const mapStateToProps = state => {
    const transaction = state.transaction;

    return { transaction };
}

export default connect(mapStateToProps, { closePopUp })(TransactionCartDetail);