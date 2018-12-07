import React, { Component } from 'react';
import '../Supports/css/components/login.css';
import { connect } from 'react-redux';
import { onLogin, onRegister } from '../Actions';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';


class LoginPage extends Component {
    state = { active: 'bounceRight', login: false, signup: true }

    onButtonLogin = () => {
        this.setState({ active: "bounceRight", login: false, signup: true });
    }

    onButtonSignUp = () => {
        this.setState({ active: "bounceLeft", login: true, signup: false });
    }

    onLoginClick = () => {
        var email = this.refs.email.value;
        var password = this.refs.password.value;

        this.props.onLogin({ email, password });
    }

    onRegisterClick = () => {
        if (this.refs.username.value == '' || this.refs.email_signup.value == '' || this.refs.password_signup.value == '') {
            alert('You must complete the form');
        }
        else {
            this.props.onRegister({
                Username: this.refs.username.value,
                Email: this.refs.email_signup.value,
                Password: this.refs.password_signup.value
            });
        }
    }


    renderButtonLogin = () => {
        if (this.props.auth.loading) {
            return (
                <button className="forms_buttons-action" style={{ height: "45px", width: "134px" }} >
                    <Loading />
                </button>
            )
        }
        return (
            <input type="button" value="Log In" class="forms_buttons-action" onClick={this.onLoginClick} />
        )
    }
    renderButtonSignup = () => {
        if (this.props.auth.loading) {
            return (
                <button className="forms_buttons-action" style={{ height: "45px", width: "134px" }} >
                    <Loading />
                </button>
            )
        }
        return (
            <input type="button" value="Sign up" class="forms_buttons-action" onClick={this.onRegisterClick} />
        )
    }


    render() {
        if (this.props.auth.username === "") {
            return (
                <section class="user">
                    <div class="user_options-container">
                        <div class="user_options-text">
                            <div class="user_options-unregistered">
                                <h2 class="user_unregistered-title">Don't have an account?</h2>
                                <p class="user_unregistered-text">Please Register Your Account First</p>
                                <button class="user_unregistered-signup" id="signup-button" onClick={this.onButtonSignUp}>Sign up</button>
                            </div>

                            <div class="user_options-registered">
                                <h2 class="user_registered-title">Have an account?</h2>
                                <p class="user_registered-text">Please Log In Your Account Here</p>
                                <button class="user_registered-login" id="login-button" onClick={this.onButtonLogin}>Login</button>
                            </div>
                        </div>

                        <div class={`user_options-forms ${this.state.active}`} id="user_options-forms">
                            <div class="user_forms-login" hidden={this.state.login}>
                                <h2 class="forms_title">Login</h2>
                                <form class="forms_form">
                                    <fieldset class="forms_fieldset">
                                        <div class="forms_field">
                                            <input ref='email' type="email" placeholder="Email" class="forms_field-input" required autofocus />
                                        </div>
                                        <div class="forms_field">
                                            <input ref='password' type="password" placeholder="Password" class="forms_field-input" required />
                                        </div>
                                    </fieldset>
                                    <div class="forms_buttons">
                                        <a type="button" class="forms_buttons-forgot" href="/forgetpassword">Forgot password?</a>
                                        {this.renderButtonLogin()}
                                    </div>
                                    <div style={{ color: "red" }}>
                                        {this.props.auth.error}
                                    </div>
                                </form>
                            </div>
                            <div class="user_forms-signup" hidden={this.state.signup}>
                                <h2 class="forms_title">Sign Up</h2>
                                <form class="forms_form">
                                    <fieldset class="forms_fieldset">
                                        <div class="forms_field">
                                            <input ref='username' type="text" placeholder="Username" class="forms_field-input" required />
                                        </div>
                                        <div class="forms_field">
                                            <input ref='email_signup' type="email" placeholder="Email" class="forms_field-input" required />
                                        </div>
                                        <div class="forms_field">
                                            <input ref='password_signup' type="password" placeholder="Password" class="forms_field-input" required />
                                        </div>
                                    </fieldset>
                                    <div class="forms_buttons">
                                        {this.renderButtonSignup()}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            )
        };
        return <Redirect to='/' />
    }

}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}

export default connect(mapStateToProps, { onLogin, onRegister })(LoginPage);