import React, { Component, createRef } from 'react';
import { connect } from "react-redux";
import { getCurrentUser, userLogin } from "../store/actions/user";

import Stopwatch from "../../basic_controls/react/infomation/Stopwatch";
import CurrentTime from "../../basic_controls/react/infomation/CurrentTime";
import Tooltip from "../../basic_controls/react/infomation/tooltip";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.dir = "left-start";

    this.fetchUser = this.fetchUser.bind(this);
    this.tempClick = this.tempClick.bind(this);
  }

  fetchUser(e) {
    e.preventDefault();
    let { _timer1, _timer2, _email, _password, _tooltip } = this.refs;

    this.props.userLogin({
      "user": {
        "email": _email.value,
        "password": _password.value
      }
    });
  }

  tempClick(e) {
    e.preventDefault();
    let { _tooltip } = this.refs;

    _tooltip.show(e.target, <CurrentTime/>, this.dir);
    this.dir = this.flipDirection(this.dir);
  }

  flipDirection(direction) {
    var directionOrder = [
      "left-start",  "left-middle",  "left-end", 
      "right-start",  "right-middle",  "right-end", 
      "top-start",  "top-middle",  "top-end", 
      "bottom-start",  "bottom-middle",  "bottom-end"
    ]
    
    var i = directionOrder.indexOf(direction);
    if (i > -1) {
      var nextIndex = (i+1 === directionOrder.length) ? 0 : i+1;
      return directionOrder[nextIndex];
    } else {
      return "";
    }
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <h1>{`Current User is: ${user.profile? user.profile.username:"Nobody"}`}</h1>
        <form onSubmit={this.fetchUser}>
          <input ref="_email" type="text" placeholder="email"/>
          <input ref="_password" type="password" placeholder="password"/>
          <input type="submit" value="Log In"/>
        </form>
        <div className="HLayout flow-center align-center">
          <Stopwatch ref="_timer1" format="hh:mm:ss" displayAs="clock" refreshRate={100} hideControls={false}/>
        </div>
        <div className="HLayout flow-between">
          <button onClick={this.tempClick}>show</button>
          <button onClick={() => this.refs._tooltip.hide()}>hide</button>
        </div>
        <Tooltip ref="_tooltip" backgroundColor="orange" color="red" arrowSize={6}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

const mapDispatchToProps = dispatch => {
  return {
    userLogin: payload => dispatch(userLogin(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)