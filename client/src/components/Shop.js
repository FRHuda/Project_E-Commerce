import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { UncontrolledCollapse } from 'reactstrap';
import { addToCart } from '../Actions';
import { API_URL_MYSQL } from '../Supports/api-url/apiurl';


class Shop extends Component {
    state = { data: [], dataRender: [], brand: [], category: [], subcategory: [], page: 1 };


    componentWillMount() {
        let params = queryString.parse(this.props.location.search);
        const { category, brand, subcategory, search, page } = params;

        axios.get(`${API_URL_MYSQL}/render/category`)
            .then(data => {
                this.setState({ category: data.data });
            }).catch(err => {
                console.log(err);
            });

        axios.get(`${API_URL_MYSQL}/render/subcategory`)
            .then(data => {
                this.setState({ subcategory: data.data });
            }).catch(err => {
                console.log(err);
            });

        axios.get(`${API_URL_MYSQL}/render/brand`)
            .then(data => {
                this.setState({ brand: data.data });
            }).catch(err => {
                console.log(err);
            });

        axios.get(`${API_URL_MYSQL}/shop?category=${category}&brand=${brand}&subcategory=${subcategory}&search=${search}`)
            .then(data => {
                this.setState({ totalPage: Math.ceil(data.data.length / 9) });
                this.setState({ data: data.data });
                this.setStateData(this.state.page);
            })
            .catch(err => {
                console.log(err);
            });

        if (page !== undefined) {
            this.setState({ page: page });
        }
    }

    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    setStateData = (halaman) => {
        var dataTemp = this.state.data;
        var hasil = [];
        var j = 0;
        if (halaman > 1 && halaman !== this.state.totalPage) {
            j = (halaman * 10) - 10 - (halaman - 1);
        }
        if (halaman == this.state.totalPage) {
            for (var i = j; i < dataTemp.length; i++) {
                hasil.push(dataTemp[i]);
            }
        }
        else if (halaman !== this.state.totalPage) {
            for (var i = j; i < (halaman * 10) - halaman; i++) {
                hasil.push(dataTemp[i]);
            }
        }
        this.setState({ dataRender: hasil });

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

    sortLowPrice = () => {
        var tampung = this.state.data;
        tampung.sort(function (a, b) {
            return a.Price - b.Price;
        });
        this.setState({ data: tampung });
        this.setStateData(this.state.page);

    }

    sortHighPrice = () => {
        var tampung = this.state.data;
        tampung.sort(function (a, b) {
            return b.Price - a.Price;
        });
        this.setState({ data: tampung });
        this.setStateData(this.state.page);
    }

    sortNewest = () => {
        var tampung = this.state.data;
        tampung.sort(function (a, b) {
            return b.Id - a.Id;
        });
        this.setState({ data: tampung });
        this.setStateData(this.state.page);
    }

    sortOldest = () => {
        var tampung = this.state.data;
        var hasil = tampung.sort(function (a, b) {
            return a.Id - b.Id;
        });
        this.setState({ data: hasil });
        this.setStateData(this.state.page);
    }

    // RENDER FUNCTION
    renderSingleProduct = () => {
        if (this.state.dataRender.length == 0) {
            return <h1>Please Wait</h1>
        }
        else {
            return this.state.dataRender.map(item => {
                if (item !== undefined) {
                    return (
                        <div class="col-12 col-sm-6 col-lg-4">
                            <div class="single-product-wrapper">
                                {/* <!-- Product Image --> */}
                                <a href={`/productdetail?productId=${item.Id}`}>
                                    <div class="product-img">
                                        {/* <img src={require('../Supports/image/acer-nitro-5.jpg')} alt=""/> */}
                                        <img src={item.Img} alt="" style={{ width: "250px", height: "230px" }} />
                                        {/* <!-- Hover Thumb --> */}
                                        <img class="hover-img" style={{ borderStyle: "outset", width: "250px", height: "230px" }} src={item.Img} alt="" />
                                    </div>
                                </a>

                                {/* <!-- Product Description --> */}
                                <div class="product-description">
                                    <span>topshop</span>
                                    <a href="single-product-details.html">
                                        <h6>{item.Name}</h6>
                                    </a>
                                    <p class="product-price">Rp {this.numberWithCommas(item.Price)}</p>
                                    {/* <!-- Hover Content --> */}
                                    <div class="hover-content">
                                        {/* <!-- Add to Cart --> */}
                                        <div class="add-to-cart-btn">
                                            <input type="button" class="btn essence-btn" value="Add to cart" onClick={() => { this.cekLogIn(this.props.auth.idUser, item.Id) }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
            });
        }
    };

    renderTitle = () => {
        let params = queryString.parse(this.props.location.search);
        const { category, brand, subcategory, search } = params;
        if (category !== undefined) {
            return category;
        }
        else if (brand !== undefined) {
            return brand;
        }
        else if (subcategory !== undefined) {
            return subcategory;
        }
        else if (search !== undefined) {
            return `Search For ${search}`
        }
        else {
            return 'All Product';
        }
    }

    renderBrands = () => {
        return this.state.brand.map((item) => {
            return (
                <li>
                    <a href={`/shop?brand=${item.Name}`}>{item.Name}</a>
                </li>
            );
        });
    };

    renderSubCategory = (id) => {
        var item = this.state.subcategory.filter(item => item.CategoryId == id);
        return item.map(item => {
            return (
                <li>
                    <a href={`/shop?subcategory=${item.Name}`}>{item.Name}</a>
                </li>
            )
        })
    }

    renderCategory = () => {
        return this.state.category.map((item) => {
            return (
                <li>
                    <button className="btn btn-default" id={`${item.Name}`} style={{ marginBottom: '1rem', width: '150px', backgroundColor: "#8c8c8c" }}>{item.Name}</button>
                    <UncontrolledCollapse toggler={`#${item.Name}`} className="sub-menu">
                        <li>
                            <a href={`/shop?category=${item.Name}`}>All</a>
                        </li>
                        {this.renderSubCategory(item.Id)}
                    </UncontrolledCollapse>
                </li>
            );
        })
    }

    renderPagination = () => {
        let params = queryString.parse(this.props.location.search);
        const { category, brand, subcategory, search, page } = params;
        var isi = '';
        if (category !== undefined) {
            isi = `?category=${category}`;
        }
        else if (brand !== undefined) {
            isi = `?brand=${brand}`;
        }
        else if (subcategory !== undefined) {
            isi = `?subcategory=${subcategory}`;
        }
        else if (search !== undefined) {
            isi = `?search=${search}`;
        }
        else {
            isi = `?`;
        }
        var thisUrl = this.props.location.pathname + isi;

        if (this.state.page == 1 && this.state.page === this.state.totalPage) {
            return (
                <ul class="pagination mt-50 mb-70">
                    <li class="page-item disabled">
                        <a class="page-link" href={`${thisUrl}`}>
                            <i class="fa fa-angle-left" />
                        </a>
                    </li>
                    <li class="page-item disabled">
                        <a class="page-link" href={`${thisUrl}`}>1</a>
                    </li>
                    <li class="page-item disabled">
                        <a class="page-link" href={`${thisUrl}`}>
                            <i class="fa fa-angle-right" />
                        </a>
                    </li>
                </ul>
            )
        }
        else if (this.state.page == 1 && this.state.page !== this.state.totalPage) {
            return (
                <ul class="pagination mt-50 mb-70">
                    <li class="page-item disabled">
                        <a class="page-link" href={`${thisUrl}&page=${parseInt(this.state.page) - 1}`}>
                            <i class="fa fa-angle-left" />
                        </a>
                    </li>
                    {this.renderPageDetail(this.state.totalPage)}
                    <li class="page-item">
                        <a class="page-link" href={`${thisUrl}&page=${parseInt(this.state.page) + 1}`}>
                            <i class="fa fa-angle-right" />
                        </a>
                    </li>
                </ul>
            )
        }
        else if (this.state.page == this.state.totalPage) {
            return (
                <ul class="pagination mt-50 mb-70">
                    <li class="page-item">
                        <a class="page-link" href={`${thisUrl}&page=${parseInt(this.state.page) - 1}`}>
                            <i class="fa fa-angle-left" />
                        </a>
                    </li>
                    {this.renderPageDetail(this.state.totalPage)}
                    <li class="page-item disabled">
                        <a class="page-link" href={`${thisUrl}&page=${parseInt(this.state.page) + 1}`}>
                            <i class="fa fa-angle-right" />
                        </a>
                    </li>
                </ul>
            )
        }
        else {
            return (
                <ul class="pagination mt-50 mb-70">
                    <li class="page-item">
                        <a class="page-link" href={`${thisUrl}&page=${parseInt(this.state.page) - 1}`}>
                            <i class="fa fa-angle-left" />
                        </a>
                    </li>
                    {this.renderPageDetail(this.state.totalPage)}
                    <li class="page-item">
                        <a class="page-link" href={`${thisUrl}&page=${parseInt(this.state.page) + 1}`}>
                            <i class="fa fa-angle-right" />
                        </a>
                    </li>
                </ul>
            )
        }

    }

    renderPageDetail = (totalPage) => {
        let params = queryString.parse(this.props.location.search);
        const { category, brand, subcategory, search, page } = params;
        var isi = '';
        if (category !== undefined) {
            isi = `?category=${category}`;
        }
        else if (brand !== undefined) {
            isi = `?brand=${brand}`;
        }
        else if (subcategory !== undefined) {
            isi = `?subcategory=${subcategory}`;
        }
        else if (search !== undefined) {
            isi = `?search=${search}`;
        }
        else {
            isi = '?';
        }
        var thisUrl = this.props.location.pathname + isi;
        var output = [];
        for (var i = 1; i <= totalPage; i++) {
            output.push(
                <li class={this.state.page == i ? 'page-item active' : 'page-item'}>
                    <a class="page-link" href={`${thisUrl}&page=${i}`}>{i}</a>
                </li>
            )
        }
        return output;
    }


    render() {
        // if (this.state.data = '' || this.state.brand == '' || this.state.category == '' || this.state.subcategory == '') {
        //     return (
        //         <div class="loading-container" style={{ marginTop: "300px" }}>
        //             <div class="loading"></div>
        //             <div id="loading-text">loading</div>
        //         </div>
        //     )
        // }

        return (
            <div>
                {/* <!-- ##### Header Area Start ##### --> */}
                <div class="breadcumb_area bg-img breadcumbimage">
                    <div class="container h-100">
                        <div class="row h-100 align-items-center">
                            <div class="col-12">
                                <div class="page-title text-center">
                                    <h2>{this.renderTitle()}</h2>
                                    <input type="button" value="Cek" onClick={() => console.log(this.state)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- ##### Header Area End ##### --> */}

                {/* <!-- ##### Shop Grid Area Start ##### --> */}
                <section class="shop_grid_area section-padding-80">
                    <div class="container">
                        <div class="row">
                            <div class="col-12 col-md-4 col-lg-3">
                                <div class="shop_sidebar_area">
                                    {/* <!-- ##### Single Widget ##### --> */}
                                    <div class="widget catagory mb-50">
                                        {/* <!-- Widget Title --> */}
                                        <h6 class="widget-title mb-30">
                                            Catagories
                                        </h6>

                                        {/* <!--  Catagories  --> */}
                                        <div class="catagories-menu">
                                            <ul id="menu-content2" class="menu-content collapse show">
                                                {this.renderCategory()}
                                            </ul>
                                        </div>
                                    </div>


                                    {/* <!-- ##### Single Widget ##### --> */}
                                    <div class="widget brands mb-50">
                                        {/* <!-- Widget Title 2 --> */}
                                        <p class="widget-title2 mb-30">
                                            Brands Laptop
                                        </p>
                                        <div class="widget-desc">
                                            <ul>
                                                {this.renderBrands()}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12 col-md-8 col-lg-9">
                                <div class="shop_grid_product_area">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="product-topbar d-flex align-items-center justify-content-between">
                                                {/* <!-- Total Products --> */}
                                                <div class="total-products">
                                                    <p>
                                                        <span>
                                                            {this.state.data.length}
                                                        </span>{' '}
                                                        products found
                                                    </p>
                                                </div>
                                                {/* <!-- Sorting --> */}
                                                <div class="product-sorting d-flex">
                                                    <p>Sort by:</p>
                                                    <select
                                                        name="select"
                                                        id="sortByselect">
                                                        <option value="value" onClick={this.sortNewest}>
                                                            Newest
                                                            </option>
                                                        <option value="value" onClick={this.sortOldest}>
                                                            Oldest
                                                            </option>
                                                        <option value="value" onClick={this.sortLowPrice}>
                                                            Low Price
                                                            </option>
                                                        <option value="value" onClick={this.sortHighPrice}>
                                                            High Price
                                                            </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        {this.renderSingleProduct()}
                                    </div>
                                </div>
                                {/* <!-- Pagination --> */}
                                <nav aria-label="navigation">
                                    {this.renderPagination()}
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- ##### Shop Grid Area End ##### --> */}

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
        );
    }
}

const mapStateToProps = state => {
    const auth = state.auth;

    return { auth };
};

export default connect(
    mapStateToProps,
    { addToCart }
)(Shop);
