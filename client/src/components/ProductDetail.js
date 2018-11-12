import React, { Component } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { API_URL_MYSQL } from '../Supports/api-url/apiurl';
import { addToCart } from '../Actions';


class ProductDetail extends Component {
    state = { item: '' };

    componentWillMount() {
        let params = queryString.parse(this.props.location.search);
        const { productId } = params;

        axios.get(`${API_URL_MYSQL}/productdetail/${productId}`)
            .then(res => {
                this.setState({ item: res.data[0] });
            })
            .catch(err => {
                console.log(err);
            })
    }

    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    convertPrice = () => {
        var tampung = this.state.item.Price;
        var tampung1 = parseInt(tampung);
        return this.numberWithCommas(tampung1);
    }

    cekLogIn = (idUser, idProduct) => {
        if (idUser === 0) {
            alert('You Must Log In First');
            return window.location.href = '/login';
        }
        else {
            this.props.addToCart(idUser, idProduct);
        }
    }

    cek = () => {
        console.log(this.state.item);
    }

    render() {
        return (
            <div>
                <section class="single_product_details_area d-flex align-items-center" style={{ paddingTop: "80px", marginBottom: "250px" }}>
                    {/* <!-- Single Product Thumb --> */}
                    <div class="single_product_thumb clearfix">
                        <div class="product_thumbnail_slides owl-carousel" style={{ border: "3px solid" }}>
                            <img src={this.state.item.Img} style={{ height: "300px", marginTop: "8px" }} alt="" />
                        </div>
                    </div>

                    {/* <!-- Single Product Description --> */}
                    <div class="single_product_desc clearfix">
                        <span>{this.state.item.Category}</span>
                        <a >
                            <h2>{this.state.item.Name}</h2>
                        </a>
                        <input type="button" value="Cek" onClick={this.cek} />
                        <p class="product-price">Rp {this.convertPrice()}</p>
                        <p class="product-desc">{this.state.item.Description}</p>

                        {/* <!-- Form --> */}
                        <form class="cart-form clearfix">
                            {/* <!-- Cart & Favourite Box --> */}
                            <div class="cart-fav-box d-flex align-items-center justify-content-center">
                                {/* <!-- Cart --> */}
                                <input type="button" class="btn essence-btn" value="Add to cart" onClick={() => { this.cekLogIn(this.props.auth.idUser, this.state.item.Id) }} />
                            </div>
                        </form>
                    </div>
                </section>
                <footer className="footer_area clearfix">
                    <div class="container">
                        <div class="row">
                            {/* <!-- Single Widget Area --> */}
                            <div class="col-12 col-md-6">
                                <div class="single_widget_area d-flex mb-30">
                                    {/* <!-- Logo --> */}
                                    <div class="footer-logo mr-50">
                                        <a href="#">
                                            <img
                                                src="img/core-img/logo2.png"
                                                alt=""
                                            />
                                        </a>
                                    </div>
                                    {/* <!-- Footer Menu --> */}
                                    <div class="footer_menu">
                                        <ul>
                                            <li>
                                                <a href="shop.html">Shop</a>
                                            </li>
                                            <li>
                                                <a href="blog.html">Blog</a>
                                            </li>
                                            <li>
                                                <a href="contact.html">Contact</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Single Widget Area --> */}
                            <div class="col-12 col-md-6">
                                <div class="single_widget_area mb-30">
                                    <ul class="footer_widget_menu">
                                        <li>
                                            <a href="#">Order Status</a>
                                        </li>
                                        <li>
                                            <a href="#">Payment Options</a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                Shipping and Delivery
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">Guides</a>
                                        </li>
                                        <li>
                                            <a href="#">Privacy Policy</a>
                                        </li>
                                        <li>
                                            <a href="#">Terms of Use</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="row align-items-end">
                            {/* <!-- Single Widget Area --> */}
                            <div class="col-12 col-md-6">
                                <div class="single_widget_area">
                                    <div class="footer_heading mb-30">
                                        <h6>Subscribe</h6>
                                    </div>
                                    <div class="subscribtion_form">
                                        <form action="#" method="post">
                                            <input
                                                type="email"
                                                name="mail"
                                                class="mail"
                                                placeholder="Your email here"
                                            />
                                            <button
                                                type="submit"
                                                class="submit">
                                                <i
                                                    class="fa fa-long-arrow-right"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Single Widget Area --> */}
                            <div class="col-12 col-md-6">
                                <div class="single_widget_area">
                                    <div class="footer_social_area">
                                        <a
                                            href="#"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Facebook">
                                            <i
                                                class="fa fa-facebook"
                                                aria-hidden="true"
                                            />
                                        </a>
                                        <a
                                            href="#"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Instagram">
                                            <i
                                                class="fa fa-instagram"
                                                aria-hidden="true"
                                            />
                                        </a>
                                        <a
                                            href="#"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Twitter">
                                            <i
                                                class="fa fa-twitter"
                                                aria-hidden="true"
                                            />
                                        </a>
                                        <a
                                            href="#"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Pinterest">
                                            <i
                                                class="fa fa-pinterest"
                                                aria-hidden="true"
                                            />
                                        </a>
                                        <a
                                            href="#"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Youtube">
                                            <i
                                                class="fa fa-youtube-play"
                                                aria-hidden="true"
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const auth = state.auth;

    return { auth };
};

export default connect(mapStateToProps, { addToCart })(ProductDetail);