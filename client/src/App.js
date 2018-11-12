import React, { Component } from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { keepLogin, cookieChecked } from './Actions';
import AppInit from './components/AppInit';
import './Supports/css/components/loadingPage.css';

const cookies = new Cookies();

class App extends Component {
  componentWillMount() {
    const cookieNya = cookies.get('login');
    if (cookieNya !== undefined) {
      this.props.keepLogin(cookieNya);
    }
    else {
      this.props.cookieChecked();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.auth.username === "" && (this.props.auth.username !== newProps.auth.username)) {
      cookies.remove('login');
      window.location.href = '/login';
    }
    else if (newProps.auth.username !== "" && (this.props.auth.username !== newProps.auth.username)) {
      cookies.set('login', newProps.auth.email, { path: '/' });
    }
  }


  render() {
    if (this.props.auth.cookieCheck) {
      return (
        <AppInit />
      );
    }

    return (
      <div class="loading-container" style={{ marginTop: "300px" }}>
        <div class="loading"></div>
        <div id="loading-text">loading</div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  const auth = state.auth;

  return { auth };
}

export default withRouter(connect(mapStateToProps, { keepLogin, cookieChecked })(App));
