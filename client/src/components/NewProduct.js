import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-responsive-carousel';
import { connect } from 'react-redux';
import { API_URL_MYSQL } from '../Supports/api-url/apiurl';
import { addToCart } from '../Actions';

import Loading from './Loading';

class NewProduct extends Component {
    state = { item: [] }

    componentWillMount() {
        axios.get(`${API_URL_MYSQL}/getnewproduct`)
            .then(res => {
                console.log(res.data);
                this.setState({ item: res.data });
            })
            .catch(err => {
                console.log(err);
            })
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

    renderProduct = () => {
        return this.state.item.map(item => {
            return (
                <div class="col-12 col-sm-6 col-lg-4">
                    <div class="single-product-wrapper">
                        {/* <!-- Product Image --> */}
                        <a href={`/productdetail?productId=${item.Id}`}>
                            <div class="product-img" >
                                {/* <img src={require('../Supports/image/acer-nitro-5.jpg')} alt=""/> */}
                                <img src={item.Img} alt="" style={{ height: "250px", width: "300px" }} />
                                {/* <!-- Hover Thumb --> */}
                                <img class="hover-img" style={{ borderStyle: "outset", height: "250px", width: "300px", marginLeft: "85px" }} src={item.Img} alt="" />
                            </div>
                        </a>

                        {/* <!-- Product Description --> */}
                        <div class="product-description">
                            <span>topshop</span>
                            <a href="single-product-details.html">
                                <h6>{item.Name}</h6>
                            </a>
                            <p class="product-price">Rp {item.Price}</p>
                            {/* <!-- Hover Content --> */}
                            <div class="hover-content">
                                {/* <!-- Add to Cart --> */}
                                <div class="add-to-cart-btn" style={{ margin: "70px", marginTop: "0px" }}>
                                    <input type="button" class="btn essence-btn" value="Add to cart" onClick={() => { this.cekLogIn(this.props.auth.idUser, item.Id) }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        if (this.state.item !== []) {
            return (
                <div className="d-flex isi-carousel">
                    {this.renderProduct()}
                </div >
            )
        }
        else {
            return (
                <div>
                    <Loading />
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    const auth = state.auth;

    return { auth };
};

export default connect(mapStateToProps, { addToCart })(NewProduct);