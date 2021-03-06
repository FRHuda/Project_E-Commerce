import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown
} from 'reactstrap';
import { connect } from 'react-redux';
import { onLogOut, keepLogin, showCart, getAddress } from '../Actions';
import axios from 'axios';
import { API_URL_MYSQL } from '../Supports/api-url/apiurl';


// IMPORT COMPONENT
import CartTable from './CartTable';

// CSS
import '../Supports/css/components/cart.css';
import '../Supports/css/components/search.css';



class Header extends Component {
    state = { subcategory: [] }

    componentWillMount() {
        axios.get(`${API_URL_MYSQL}/render/subcategory`)
            .then(data => {
                this.setState({ subcategory: data.data });
            }).catch(err => {
                console.log(err);
            });

        if (this.props.auth.username !== '') {
            this.props.getAddress(this.props.auth.idUser);
        }
    }


    onLogOutClick = () => {
        this.props.onLogOut();
    };

    search = (e) => {
        console.log(e);
        var enterKey = 13;
        if (e.charCode === enterKey) {
            window.location.href = `/shop?search=${this.refs.search.value}`;
        }
    }

    // RENDER FUNCTION

    renderTabProfile = () => {
        if (this.props.auth.statusId == 1) {
            return (
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle className="btn btn-primary" nav>
                        <span className="fa fa-user" />
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem style={{ fontSize: 11 }} header>
                            Halo Admin,
                        </DropdownItem>
                        <DropdownItem href='/profile'>{this.props.auth.username}</DropdownItem>
                        <div class="dropdown-divider" />
                        <DropdownItem onClick={this.onLogOutClick}>
                            LogOut
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            );
        } else {
            return (
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle className="btn btn-primary" nav>
                        <span className="fa fa-user" />
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem style={{ fontSize: 11 }} header>
                            Halo,
                        </DropdownItem>
                        <DropdownItem href='/profile'>{this.props.auth.username}</DropdownItem>
                        <div class="dropdown-divider" />
                        <DropdownItem onClick={this.onLogOutClick}>
                            LogOut
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            );
        }
    };

    renderSubCategory = (id) => {
        return this.state.subcategory.map(item => {
            if (item.CategoryId == id) {
                return (
                    <DropdownItem href={`/shop?subcategory=${item.Name}`}>{item.Name}</DropdownItem>
                )
            }
        })
    }

    renderNavbar = () => {
        if (this.props.auth.username !== '') {
            return (
                <div style={{ marginBottom: '60px' }}>
                    <nav class="navbar navbar-shadow navbar-expand-sm bg-light navbar-light fixed-top">
                        {/* <!-- Brand/logo --> */}
                        <Link to="/" className="navlink">Project</Link>

                        <button
                            class="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarText"
                            aria-controls="navbarText"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon" />
                        </button>

                        {/* <!-- Links --> */}
                        <ul
                            class="navbar-nav collapse navbar-collapse d-flex justify-content-between"
                            id="navbarText">
                            <div className="d-flex">
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Categories
                                    </DropdownToggle>
                                    <DropdownMenu style={{ marginLeft: '-65px', width: '1520px' }}>
                                        <div className="d-flex">
                                            <div className="col-3">
                                                <div Header className="justify-content-center d-flex">Computer</div>
                                                <div class="dropdown-divider" />
                                                {this.renderSubCategory(1)}
                                            </div>
                                            <div className="col-3">
                                                <div Header className="justify-content-center d-flex">Component</div>
                                                <div class="dropdown-divider" />
                                                {this.renderSubCategory(2)}
                                            </div>
                                            <div className="col-3">
                                                <div Header className="justify-content-center d-flex">Accecories</div>
                                                <div class="dropdown-divider" />
                                                {this.renderSubCategory(3)}
                                            </div>
                                            {/* <div className="col-3">
                                                <img src="https://images-na.ssl-images-amazon.com/images/I/41KIZ8g7gFL.jpg" alt="" />
                                            </div> */}
                                        </div>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>Pages</DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="/">Home</DropdownItem>
                                        <DropdownItem href="/shop">Shop</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>Contact</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>
                            <div className="d-flex">
                                <div>
                                    <input ref="search" type="search" placeholder="Search" onKeyPress={(e) => { this.search(e) }} />
                                </div>
                            </div>
                            <div className="d-flex">
                                <UncontrolledDropdown nav inNavbar style={{ marginRight: '20px' }}>
                                    <DropdownToggle className="btn btn-primary" nav>
                                        <span className="fa fa-shopping-cart">
                                            {' '}
                                            {this.props.cart.cart.length}
                                        </span>
                                    </DropdownToggle>
                                    <DropdownMenu style={{ marginLeft: '-290px', width: "400px", maxHeight: "450px" }}>
                                        <CartTable />
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                {this.renderTabProfile()}
                            </div>
                        </ul>
                    </nav>
                </div>
            );
        }
        return (
            <div style={{ marginBottom: '60px' }}>
                <nav class="navbar navbar-expand-sm bg-light navbar-light fixed-top">
                    {/* <!-- Brand/logo --> */}
                    <Link to="/" className="navlink">Project</Link>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarText"
                        aria-controls="navbarText"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon" />
                    </button>

                    {/* <!-- Links --> */}
                    <ul class="navbar-nav collapse navbar-collapse d-flex justify-content-between" id="navbarText">
                        <div className="d-flex">
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>Categories</DropdownToggle>
                                <DropdownMenu style={{ marginLeft: '-65px', width: '1520px' }}>
                                    <div className="d-flex">
                                        <div className="col-3">
                                            <div Header className="justify-content-center d-flex">Computer</div>
                                            <div class="dropdown-divider" />
                                            {this.renderSubCategory(1)}
                                        </div>
                                        <div className="col-3">
                                            <div Header className="justify-content-center d-flex">Component</div>
                                            <div class="dropdown-divider" />
                                            {this.renderSubCategory(2)}
                                        </div>
                                        <div className="col-3">
                                            <div Header className="justify-content-center d-flex">Accecories</div>
                                            <div class="dropdown-divider" />
                                            {this.renderSubCategory(3)}
                                        </div>
                                        {/* <div className="col-3">
                                                <img src="https://images-na.ssl-images-amazon.com/images/I/41KIZ8g7gFL.jpg" alt="" />
                                            </div> */}
                                    </div>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>Pages</DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem href="/">Home</DropdownItem>
                                    <DropdownItem href="/shop">Shop</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>Contact</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                        <div className="d-flex">
                            <div>
                                <input ref="search" type="search" placeholder="Search" onKeyPress={(e) => { this.search(e) }} />
                            </div>
                        </div>
                        <div className="d-flex">
                            <li class="nav-item">
                                <div className="nav-link">
                                    <span className="fa fa-user" />
                                    <Link to="/register"> Sign Up</Link>
                                </div>
                            </li>
                            <li class="nav-item">
                                <div className="nav-link">
                                    <span className="fa fa-sign-in" />
                                    <Link to="/login"> Log In</Link>
                                </div>
                            </li>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle className="btn btn-primary" nav>
                                    <span className="fa fa-shopping-cart">{' '}
                                        {this.props.cart.cart.length}
                                    </span>
                                </DropdownToggle>
                                <DropdownMenu style={{ marginLeft: '-275px' }}>
                                    <CartTable />
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </ul>
                </nav>
            </div>
        );
    };

    render() {
        return this.renderNavbar();
    }
}

const mapStateToProps = state => {
    const auth = state.auth;
    const cart = state.cart;

    return { auth, cart };
};

export default connect(
    mapStateToProps,
    { onLogOut, keepLogin, showCart, getAddress }
)(Header);
