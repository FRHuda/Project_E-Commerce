import React, { Component } from 'react';
import { connect } from 'react-redux';

import { submitOrder } from '../Actions';

// IMPORT CSS
import '../Supports/css/components/radiobutton.css';

class Checkout extends Component {

    submitOrder = () => {
        var via = '';
        if (document.getElementById("radio-1").checked === true) {
            via = 'Cash';
        }
        else if (document.getElementById("radio-2").checked === true) {
            via = 'Credit';
        }
        else {
            alert('You must choose via Cash or Credit');
            return;
        }

        if (window.confirm('Are You sure want to submit your order ?')) {

            const billingAddress = {
                name: this.refs.name.value,
                phone: this.refs.phone.value,
                address: this.refs.address.value,
                postcode: this.refs.postcode.value,
                city: this.refs.city.value,
                province: this.refs.province.value,
                email: this.refs.email.value,
                via: via
            }

            this.props.submitOrder(this.props.auth.idUser, this.props.cart.cart, billingAddress);
        }
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

    renderOrderDetails = () => {
        if (this.props.cart.cart == '') {
            return (
                <ul className="d-flex justify-content-between">
                    <span></span>
                </ul>
            )
        }
        else if (this.props.cart.cart !== '') {
            return this.props.cart.cart.map((item) => {
                return (
                    <ul className="d-flex justify-content-between">
                        <span>{item.Quantities} x {item.Name}</span>
                        <span>Rp {item.Price * item.Quantities}</span>
                    </ul>
                )
            })
        }
    }

    render() {
        return (
            <div>
                {/* <!-- ##### Header Area Start ##### --> */}
                <div class="breadcumb_area bg-img breadcumbimage">
                    <div class="container h-100">
                        <div class="row h-100 align-items-center">
                            <div class="col-12">
                                <div class="page-title text-center">
                                    <h2>Checkout</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- ##### Header Area End ##### --> */}

                {/* <!-- ##### Checkout Area Start ##### --> */}
                <div class="checkout_area section-padding-80">
                    <div class="container">
                        <div class="row">

                            <div class="col-12 col-md-6">
                                <div class="checkout_details_area mt-50 clearfix">

                                    <div class="cart-page-heading mb-30">
                                        <h5>Billing Address</h5>
                                    </div>

                                    <form action="#" method="post">
                                        <div class="row">
                                            <div class="col-md-6 mb-3">
                                                <label for="first_name">Your Name <span>*</span></label>
                                                <input type="text" ref="name" class="form-control" id="name" required defaultValue={this.props.auth.username} />
                                            </div>
                                            <div class="col-6 mb-3">
                                                <label for="phone_number">Phone No <span>*</span></label>
                                                <input type="number" ref="phone" class="form-control" id="phone_number" min="0" />
                                            </div>
                                            <div class="col-12 mb-3">
                                                <label for="street_address">Address <span>*</span></label>
                                                <input type="text" ref="address" class="form-control mb-3" id="street_address" />
                                            </div>
                                            <div class="col-6 mb-3">
                                                <label for="postcode">Postcode <span>*</span></label>
                                                <input type="number" ref="postcode" class="form-control" id="postcode" />
                                            </div>
                                            <div class="col-6 mb-3">
                                                <label for="city">Town/City <span>*</span></label>
                                                <input type="text" ref="city" class="form-control" id="city" />
                                            </div>
                                            <div class="col-6 mb-3">
                                                <label for="state">Province <span>*</span></label>
                                                <input type="text" ref="province" class="form-control" id="state" />
                                            </div>
                                            <div class="col-12 mb-4">
                                                <label for="email_address">Email Address <span>*</span></label>
                                                <input type="email" ref="email" class="form-control" id="email_address" required defaultValue={this.props.auth.email} />
                                            </div>

                                            {/* <div class="col-12">
                                                <div class="custom-control custom-checkbox d-block mb-2">
                                                    <input type="checkbox" class="custom-control-input" id="customCheck1" />
                                                    <label class="custom-control-label" for="customCheck1">Terms and conitions</label>
                                                </div>
                                                <div class="custom-control custom-checkbox d-block mb-2">
                                                    <input type="checkbox" class="custom-control-input" id="customCheck2" />
                                                    <label class="custom-control-label" for="customCheck2">Create an accout</label>
                                                </div>
                                                <div class="custom-control custom-checkbox d-block">
                                                    <input type="checkbox" class="custom-control-input" id="customCheck3" />
                                                    <label class="custom-control-label" for="customCheck3">Subscribe to our newsletter</label>
                                                </div>
                                            </div> */}
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div class="col-12 col-md-6 col-lg-5 ml-lg-auto">
                                <div class="order-details-confirmation">

                                    <div class="cart-page-heading">
                                        <h5>Your Order</h5>
                                        <p>The Details</p>
                                    </div>

                                    <ul class="order-details-form mb-4">
                                        <li><span>Product</span> <span>Total</span></li>
                                        <li>
                                            <div className="container" style={{ padding: 0 }}>
                                                {this.renderOrderDetails()}
                                            </div>
                                        </li>
                                        <li><span>Subtotal</span> <span>Rp {this.totalPrice()}</span></li>
                                        <li><span>Shipping</span> <span>Free</span></li>
                                        <li><span>Total</span> <span>Rp {this.totalPrice()}</span></li>
                                    </ul>

                                    <div className="d-flex">
                                        <div class="radio">
                                            <input id="radio-1" name="radio" type="radio" />
                                            <label for="radio-1" class="radio-label">Cash</label>
                                        </div>
                                        <div class="radio">
                                            <input id="radio-2" name="radio" type="radio" />
                                            <label for="radio-2" class="radio-label">Credit</label>
                                        </div>
                                    </div>

                                    <input type="button" className="btn essence-btn" value="Submit Order" onClick={this.submitOrder} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}


const mapStateToProps = state => {
    const auth = state.auth;
    const cart = state.cart;

    return { auth, cart };
};

export default connect(mapStateToProps, { submitOrder })(Checkout);