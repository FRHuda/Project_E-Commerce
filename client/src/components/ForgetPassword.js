import React, { Component } from 'react';
import { API_URL_MYSQL } from '../Supports/api-url/apiurl';
import axios from 'axios';

class ForgetPassword extends Component {

    forgetPassword = () => {
        if (window.confirm('Ar you sure you forget the password ?')) {
            axios.post(`${API_URL_MYSQL}/forgetpassword`, {
                email: this.refs.email.value
            })
                .then(response => {
                    console.log(response);
                    alert('Reset Password Success, Check your email for a New Password');
                    window.location.href = '/login';
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    render() {
        return (
            <div className="user">
                <div className="container">
                    <div class="form-group row" style={{ backgroundColor: "white" }}>
                        <h5 className="col-md-12">Enter Your Email </h5>
                        <div className="col-md-3" />
                        <input type="text" class="form-control col-md-offset-3 col-md-6" ref='email' placeholder="youremail@example.com" />
                        <div className="col-md-3" />
                        <div className="col-md-5" />
                        <input type="button" className="btn btn-success col-md-2" value="Submit" onClick={this.forgetPassword} />
                    </div>
                </div>
            </div>
        )
    }
}


export default ForgetPassword;