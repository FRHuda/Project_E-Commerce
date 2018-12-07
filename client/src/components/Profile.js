import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateAkun, addAddress, updateAddress } from '../Actions';
import { API_URL_MYSQL } from '../Supports/api-url/apiurl';
import axios from 'axios';
import Transaction from './Transaction';

import '../Supports/css/components/profile.css';
import AdminPage from './AdminPage';

class Profile extends Component {
    state = { active: 1, admin: false, editProfile: false, editAlamat: false };

    componentWillMount() {
        if (this.props.auth.statusId === 1) {
            this.setState({ admin: true });
        }
    }

    toggle = (id) => {
        this.setState({ active: id });
    }

    saveProfile = () => {
        const { username, phone, birthday } = this.refs;
        const user = {
            username: username.value,
            phone: phone.value,
            birthday: birthday.value
        }
        if (username.value === '' || phone.value === '' || birthday.value === '') {
            alert('Please fill the whole form');
            return;
        }
        if (window.confirm('Are you sure to update your profil ?')) {
            this.props.updateAkun(user, this.props.auth.idUser);
            this.setState({ editProfile: false });
        }
    }

    saveAddress = () => {
        const { address, postcode, towncity, province } = this.refs;
        const data = {
            Address: address.value,
            PostCode: postcode.value,
            TownCity: towncity.value,
            Province: province.value
        }
        if (address.value === '' || postcode.value === '' || towncity.value === '' || province.value === '') {
            alert('Please fill the whole form');
            return;
        }
        if (window.confirm('Are you sure to update your profil ?')) {
            this.props.updateAddress(data, this.props.auth.idUser);
            this.setState({ editAlamat: false });
        }
    }

    addAddress = () => {
        const { address, postcode, towncity, province } = this.refs;
        const id = this.props.auth.idUser;
        if (address.value === '' || postcode.value === '' || towncity.value === '' || province.value === '') {
            alert('Please fill the whole form');
            return;
        }
        if (window.confirm('Are you sure want to save this address ?')) {
            this.props.addAddress({
                address: address.value,
                postcode: postcode.value,
                towncity: towncity.value,
                province: province.value,
                id
            });
        }
    }

    editPassword = () => {
        var realpass = '';
        axios.get(`${API_URL_MYSQL}/getpassword/${this.props.auth.idUser}`)
            .then(response => {
                realpass = response.data[0].Pass;
                var pass = prompt('Input your recent password');
                if (pass === realpass) {
                    var newpassword = prompt('Enter your New Password');
                    axios.put(`${API_URL_MYSQL}/changepassword/${this.props.auth.idUser}`, {
                        newPassword: newpassword
                    })
                        .then(response => {
                            alert('Change Password Success!');
                        })
                        .catch(err => {
                            console.log(err);
                            alert(err);
                        })
                }
                else {
                    alert(`Wrong Password`);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    renderPhone = () => {
        var output = '+62';
        if (this.props.auth.Phone === null) {
            return;
        }
        else {
            return output;
        }
    }

    renderProfile = () => {
        if (this.state.editProfile) {
            return (
                <div className="dashboard-section col-sm-12">

                    <div className="row dashboard-section">
                        <div className="col-sm-4 d-flex">
                            <h2 className="section-header">Profile</h2>
                            <span>
                                <button type="button" className="btn btn-default" onClick={this.saveProfile}><span className="fa fa-save"></span> Save</button>
                            </span>
                        </div>
                        {this.renderProfileDetail()}
                    </div>

                </div>
            )
        }
        else {
            return (
                <div className="dashboard-section col-sm-12">

                    <div className="row dashboard-section">
                        <div className="col-sm-4 d-flex">
                            <h2 className="section-header">Profile</h2>
                            <span>
                                <button type="button" className="btn btn-default" onClick={() => this.setState({ editProfile: true })}><span className="fa fa-edit"></span> Edit</button>
                            </span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-4">
                            <h4 className="main-titles">Username</h4>
                            <p>{this.props.auth.username}</p>
                        </div>

                        <div className="col-sm-4">
                            <h4 className="main-titles">Phone Number</h4>
                            <p>{this.renderPhone()}{this.props.auth.phone}</p>
                        </div>

                        <div className="col-sm-4">
                            <h4 className="main-titles">Email</h4>
                            <p>{this.props.auth.email}</p>
                        </div>
                        <div className="col-sm-4">
                            <h4 className="main-titles">Birthday</h4>
                            <p>{this.props.auth.birthday}</p>
                        </div>
                        <div className="col-sm-4">
                            <h4 className="main-titles">Password</h4>
                            <div className='d-flex'>
                                <span className="col-md-5" />
                                <p>********</p>
                                <button type="button" className="btn btn-default" onClick={this.editPassword}><span className="fa fa-edit"></span> Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
    renderProfileDetail = () => {
        if (this.props.auth.editProfile) {
            return (
                <div class="loading-container" style={{ marginTop: "300px" }}>
                    <div class="loading"></div>
                    <div id="loading-text">loading</div>
                </div>
            )
        }
        else {
            return (
                <div className="row">
                    <div className="col-sm-4">
                        <h4 className="main-titles">Username</h4>
                        <input type="text" ref="username" className="btn" style={{ borderColor: "cyan" }} defaultValue={this.props.auth.username} />
                    </div>

                    <div className="col-sm-4">
                        <h4 className="main-titles">Phone Number</h4>
                        <input type="number" ref="phone" className="btn" style={{ borderColor: "cyan" }} defaultValue={this.props.auth.phone} />
                    </div>

                    <div className="col-sm-4">
                        <h4 className="main-titles">Email</h4>
                        <p>{this.props.auth.email}</p>
                    </div>
                    <div className="col-sm-4">
                        <h4 className="main-titles">Birthday</h4>
                        <input type="text" ref="birthday" className="btn" style={{ borderColor: "cyan" }} defaultValue={this.props.auth.birthday} />
                    </div>
                    <div className="col-sm-4">
                        <h4 className="main-titles">Password</h4>
                        <p>********</p>
                    </div>
                </div>
            )
        }
    }

    renderAlamat = () => {
        if (this.props.address.UserId === 0) {
            return (
                <div className="dashboard-section col-sm-12">

                    <div className="row dashboard-section">
                        <div className="col-sm-4 d-flex">
                            <h2 className="section-header">Address</h2>
                            <span>
                                <button type="button" className="btn btn-default" onClick={this.addAddress}><span className="fa fa-save"></span> Save</button>
                                <p style={{ color: "grey", fontSize: "11px" }}>You don't have address</p>
                            </span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-8">
                            <h4 className="main-titles">Address</h4>
                            <input type="text" ref="address" className="btn" style={{ borderColor: "cyan" }} />
                        </div>

                        <div className="col-sm-4">
                            <h4 className="main-titles">Post Code</h4>
                            <input type="number" ref="postcode" maxLength='5' className="btn" style={{ borderColor: "cyan" }} />
                        </div>

                        <div className="col-sm-4">
                            <h4 className="main-titles">Town/City</h4>
                            <input type="text" ref="towncity" className="btn" style={{ borderColor: "cyan" }} />
                        </div>
                        <div className="col-sm-4">
                            <h4 className="main-titles">Province</h4>
                            <input type="text" ref="province" className="btn" style={{ borderColor: "cyan" }} />
                        </div>
                    </div>

                </div>
            )
        }
        else {
            if (this.state.editAlamat) {
                return (
                    <div className="dashboard-section col-sm-12">

                        <div className="row dashboard-section">
                            <div className="col-sm-4 d-flex">
                                <h2 className="section-header">Address</h2>
                                <span>
                                    <button type="button" className="btn btn-default" onClick={this.saveAddress}><span className="fa fa-save"></span> Save</button>
                                </span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="main-titles">Address</h4>
                                <input type="text" ref="address" className="btn" defaultValue={this.props.address.Address} style={{ borderColor: "cyan" }} />
                            </div>

                            <div className="col-sm-4">
                                <h4 className="main-titles">Post Code</h4>
                                <input type="number" ref="postcode" maxLength='5' className="btn" defaultValue={this.props.address.PostCode} style={{ borderColor: "cyan" }} />
                            </div>

                            <div className="col-sm-4">
                                <h4 className="main-titles">Town/City</h4>
                                <input type="text" ref="towncity" className="btn" defaultValue={this.props.address.TownCity} style={{ borderColor: "cyan" }} />
                            </div>
                            <div className="col-sm-4">
                                <h4 className="main-titles">Province</h4>
                                <input type="text" ref="province" className="btn" defaultValue={this.props.address.Province} style={{ borderColor: "cyan" }} />
                            </div>
                        </div>

                    </div>
                )
            }
            else {
                return (
                    <div className="dashboard-section col-sm-12">

                        <div className="row dashboard-section">
                            <div className="col-sm-4 d-flex">
                                <h2 className="section-header">Address</h2>
                                <span>
                                    <button type="button" className="btn btn-default" onClick={() => this.setState({ editAlamat: true })}><span className="fa fa-edit"></span> Edit</button>
                                </span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="main-titles">Address</h4>
                                <p>{this.props.address.Address}</p>
                            </div>

                            <div className="col-sm-4">
                                <h4 className="main-titles">Post Code</h4>
                                <p>{this.props.address.PostCode}</p>
                            </div>

                            <div className="col-sm-4">
                                <h4 className="main-titles">Town/City</h4>
                                <p>{this.props.address.TownCity}</p>
                            </div>
                            <div className="col-sm-4">
                                <h4 className="main-titles">Province</h4>
                                <p>{this.props.address.Province}</p>
                            </div>
                        </div>

                    </div>
                )
            }
        }
    }


    render() {
        if (this.props.auth.username === '') {
            return <Redirect to="/login" />
        }

        return (
            <div>
                {/* <!-- start dashboard --> */}
                <div className="dashboard-outer">
                    <div className="dashboard-sidebar">
                        {/* <!--     logo container --> */}
                        <div style={{ padding: "20px" }}>
                            <img className="rounded-circle" style={{ height: "150px", width: "150px" }} src="https://vignette.wikia.nocookie.net/rocklee/images/b/bb/Itachi.png/revision/latest?cb=20141115180733&path-prefix=pt-br" alt="" />
                        </div>
                        {/* <!--     logo container --> */}
                        <nav>
                            <div className="dashboard-nav-outer">
                                <ul className="dashboard-nav">
                                    <div id="dashboard">
                                        <li class={this.state.active === 1 ? 'dashboard-nav-item is-active' : 'dashboard-nav-item'} onClick={() => this.toggle(1)}>
                                            Your Profile
                                        </li>
                                        <li class={this.state.active === 2 ? 'dashboard-nav-item is-active' : 'dashboard-nav-item'} onClick={() => this.toggle(2)}>
                                            Transaction
                                        </li>
                                        <li class={this.state.active === 3 ? 'dashboard-nav-item is-active' : 'dashboard-nav-item'} hidden={!this.state.admin} onClick={() => this.toggle(3)}>
                                            Admin
                                        </li>
                                    </div>
                                </ul>
                            </div>
                        </nav>

                    </div>

                    {/* YOUR PROFILE */}
                    <div className="dashboard-main" style={{ display: this.state.active === 1 ? 'block' : 'none' }}>
                        {/* PROFILE */}
                        {this.renderProfile()}
                        {/* ALAMAT */}
                        {this.renderAlamat()}
                    </div>

                    {/* TRANSACTION */}
                    <div className="dashboard-main" style={{ display: this.state.active === 2 ? 'block' : 'none' }}>
                        <Transaction />
                    </div>

                    {/* ADMIN */}
                    <div className="dashboard-main" style={{ display: this.state.active === 3 ? 'block' : 'none' }}>
                        <AdminPage />
                    </div>

                </div>
                {/* <!-- end dashboard --> */}
            </div >
        )
    }
}

const mapStateToProps = state => {
    const auth = state.auth;
    const address = state.address;

    return { auth, address };
};

export default connect(mapStateToProps, { updateAkun, addAddress, updateAddress })(Profile);