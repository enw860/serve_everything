import React, { Component, createRef } from 'react';
import { connect } from "react-redux";
import { fetch_user, user_login } from "../store/actions/user";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.loginUserAccount = this.loginUserAccount.bind(this);
    this.fetchUserInfo = this.fetchUserInfo.bind(this);
  }

  loginUserAccount(e) {
    e.preventDefault();
    let { _email, _password } = this.refs;

    this.props.userLogin({
      "username": _email.value,
      "password": _password.value,
      "withSecrete": true
     });
  }

  printUserDetail(user) {
    const {detail = {}} = user;
    
    return detail && (
      <ul>
        {Object.keys(detail).map(field => {
          return (<li><span>{field}</span>: <span>{detail[field] || "unavailable"}</span></li>)
        })}
      </ul>
    )
  }

  fetchUserInfo() {
    const { user } = this.props;
    
    if (!user.detail) {
      this.props.userData({
        username: user.username
      });
    }
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <h1>{`Current User is: ${user.username ? user.username : "Nobody"}`}</h1>
        <form onSubmit={this.loginUserAccount}>
          <input ref="_email" type="text" placeholder="email" value="lionelwu"/>
          <input ref="_password" type="password" placeholder="password" value="Lionel_0120."/>
          <input type="submit" value="Log In"/>
        </form>
        <button onClick={this.fetchUserInfo}>Click</button>
        {this.printUserDetail(user)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const currentUser = Object.assign({}, state.user.currentUser);
  return { user: currentUser };
};

const mapDispatchToProps = dispatch => {
  return {
    userLogin: payload => dispatch(user_login(payload)),
    userData: payload => dispatch(fetch_user(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)