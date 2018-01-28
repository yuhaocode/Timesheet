import React, { Component } from "react";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import "react-infinite-calendar/styles.css";
import { blue } from "material-ui/colors";

import Layout from "./Components/Layout";
import Login from "./Components/Login";
import { login, logout, checkSession } from "./Actions/auth_actions";
import { connect } from "react-redux";
import { CircularProgress } from "material-ui/Progress";
import { forgetPassword } from "./Actions/user_actions";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import PropTypes from 'prop-types';
// import { withStyles } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: blue
    // secondary: white,
    // text: {
    // primary: white,
  }
});

class App extends Component {
  componentWillMount() {
    console.log("App Initializing...");
    this.props.checkSession();
  }

  render() {
    if (this.props.loggingIn) {
      return <CircularProgress size={50} thickness={5} />;
    }
    // if (!this.props.user) {
    //   return (
    //     <CircularProgress size={50} thickness={5} />
    //   );
    // }
    // let roleUser = false;
    // let roleAdmin = false;
    // this.props.user.authorities.forEach((role) => {
    //   console.log(role);
    //   if (role.authority == "ROLE_USER") { roleUser = true; }
    //   if (role.authority == "ROLE_ADMIN") roleAdmin = true;
    //   console.log("roleUser: " + roleUser);
    //   console.log("roleAdmin: " + roleAdmin);
    // });

    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <div>
            {/* <Route exact path="/login" component={Login}
             onSubmit={this.props.onSubmit} loggedIn={this.props.loggedIn} loginError={this.props.loginError}
            /> */}

            {/* <Route exact path="/" component={Layout}
              onSubmit={this.props.onSubmit} loggedIn={this.props.loggedIn} loginError={this.props.loginError}
            /> */}
            {/* {console.log(this.props.user)} */}
            <Layout
              onSubmit={this.props.onSubmit}
              loggedIn={this.props.loggedIn}
              loginError={this.props.loginError}
              emailSubmit={this.props.emailSubmit}
              // user={this.props.user}
              // roleUser={roleUser}
              // roleAdmin={roleAdmin}
            />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggingIn: state.user.loggingIn,
    loggedIn: state.user.loggedIn,
    loginError: state.user.loginError

    // user: state.user.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (username, password) => login(username, password, dispatch),
    checkSession: () => checkSession(dispatch),
    logout: () => logout(dispatch),
    emailSubmit: email => forgetPassword(email, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
