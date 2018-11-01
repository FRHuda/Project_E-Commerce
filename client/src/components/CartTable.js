import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showCart, deleteCart, updateQty } from '../Actions';
import { Link } from 'react-router-dom';

class CartTable extends Component {

    componentWillMount() {
        this.props.showCart(this.props.auth.idUser);
    }



    totalPrice = () => {
        if (this.props.cart.cart === []) {
            return 0;
        }
        if (this.props.cart.cart.length >= 1) {
            var total = 0;
            this.props.cart.cart.map(item => {
                total = total + (item.Price * item.Quantities);
            });
            return total;
        }
    };


    renderCartTable = () => {
        if (this.props.cart.cart === []) {
            return <p>EMPTY</p>;
        }
        if (this.props.cart.cart !== []) {
            return this.props.cart.cart.map((item, index) => {
                return (
                    <li className="clearfix">
                        <img className="img" src={item.Img} alt={index} />
                        <span className="item-name">{item.Name}</span>
                        <span className="item-price">Rp {item.Price}</span>
                        <span style={{ marginRight: "5px" }} className="item-quantity">
                            Qty:
                        </span>
                        <span class="_grid">
                            <button className="btn btn-qty" style={{ height: "20px", width: "20px" }} onClick={() => this.props.updateQty(this.props.auth.idUser, item.IdCart, item.Quantities - 1)}>
                                <span className="fa fa-minus" style={{ marginLeft: "-6.5px", marginTop: "-7.5px", position: "absolute" }} ></span>
                            </button>
                            <span style={{ margin: "3px" }}>{item.Quantities}</span>
                            <button className="btn btn-qty" style={{ height: "20px", width: "20px" }} onClick={() => this.props.updateQty(this.props.auth.idUser, item.IdCart, item.Quantities + 1)}>
                                <span className="fa fa-plus" style={{ marginLeft: "-6.5px", marginTop: "-7.5px", position: "absolute" }} ></span>
                            </button>
                        </span>
                        <span>
                            <button className="btn btn-danger" style={{ height: "20px", width: "20px", marginLeft: "5px" }} type="submit" onClick={() => this.props.deleteCart(this.props.auth.idUser, item.Id)}>
                                <span className="fa fa-times" style={{ marginLeft: "-6.5px", marginTop: "-7.5px", position: "absolute" }} />
                            </button>
                        </span>
                    </li>
                );
            });
        }
    };

    render() {
        return (
            <div className="container-cart">
                <div className="shopping-cart">
                    <div className="shopping-cart-header">
                        <i className="fa fa-shopping-cart cart-icon" />
                        <span className="badge">
                            {this.props.cart.cart.length}
                        </span>
                        <div className="shopping-cart-total">
                            <span className="lighter-text">Total:</span>
                            <span className="main-color-text">
                                {this.totalPrice()}
                            </span>
                        </div>
                    </div>

                    <ul className="shopping-cart-items">
                        {this.renderCartTable()}
                    </ul>

                    <Link to='/checkout' className="button" >Checkout</Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const auth = state.auth;
    const cart = state.cart;

    return { auth, cart };
};

export default connect(mapStateToProps, { showCart, deleteCart, updateQty })(CartTable);
