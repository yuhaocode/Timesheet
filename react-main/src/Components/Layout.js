import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Dashboard from "./Dashboard";
// import InputTimeSheet from './InputTimeSheet';
import TimeSheet from "./TimeSheet";
// import Histories from './Histories';
// import HistoryDetail from './HistoryDetail';
import MenuAppBar from "./MenuAppBar";
import StickFooter from "./StickFooter";
import Login from "./Login";
import MyProfile from "./MyProfile";
import TimesheetManagement from "./TimesheetManagement";
import UserManagement from "./UserManagement";
import UserDetail from "./UserDetail";
import UserList from "./UserList";
import TimesheetManagementList from "./TimesheetManagementList";
import TimesheetManagementDetail from "./TimesheetManagementDetail";
import { connect } from "react-redux";

import Redirect from "react-router-dom/Redirect";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

const styles = {
  home: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: "auto",
    margin: 10
  }
};

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: props.auth,
      anchorEl: null,
      roleUser: false,
      roleAdmin: false
    };
    this.changeUserAuth = this.changeUserAuth.bind(this);
    this.changeAdminAuth = this.changeAdminAuth.bind(this);
  }

  changeUserAuth() {
    this.setState({
      roleUser: true
    });
  }

  changeAdminAuth() {
    this.setState({
      roleAdmin: true
    });
  }

  render() {
    // let roleUser = false;
    // let roleAdmin = false;

    if (this.props.user) {
      this.props.user.authorities.forEach(role => {
        if (this.state.roleUser === false && role.authority === "ROLE_USER") {
          // roleUser = true;
          this.changeUserAuth();
        }

        if (this.state.roleAdmin === false && role.authority === "ROLE_ADMIN") {
          // roleAdmin = true;
          this.changeAdminAuth();
        }
      });
    }

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.props.loggedIn ? (
            // this.state.roleUser ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );

    const AdminRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.props.loggedIn ? (
            this.state.roleAdmin ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: props.location }
                }}
              />
            )
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );

    const { classes } = this.props;

    return (
      <div className="screen">
        {/* {console.log(this.props)} */}
        <MenuAppBar
          auth={this.props.loggedIn}
          roleUser={this.state.roleUser}
          roleAdmin={this.state.roleAdmin}
        />
        <div className={classes.home}>
          <Switch>
            <Route
              path="/login"
              render={props => (
                <Login
                  {...props}
                  onSubmit={this.props.onSubmit}
                  loggedIn={this.props.loggedIn}
                  loginError={this.props.loginError}
                  emailSubmit={this.props.emailSubmit}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={props => (
                <Dashboard
                  {...props}
                  roleUser={this.state.roleUser}
                  roleAdmin={this.state.roleAdmin}
                />
              )}
            />
            <PrivateRoute path="/timesheet" component={TimeSheet} />
            <PrivateRoute path="/myProfile" component={MyProfile} />
            {/* <AdminRoute exact path="/userManagement" component={UserManagement} /> */}
            <AdminRoute exact path="/userManagement" component={UserList} />
            <AdminRoute
              exact
              path="/timesheetManagement"
              component={TimesheetManagement}
            />
            <AdminRoute
              path="/userManagement/user:uindex"
              component={UserDetail}
            />
            <AdminRoute
              exact
              path="/timesheetManagement/:uindex"
              component={TimesheetManagementList}
            />
            <AdminRoute
              path="/timesheetManagement/weektime/:windex"
              component={TimesheetManagementDetail}
            />
            {/* <PrivateRoute path="/userManagement" component={UserManagement} />
                        <PrivateRoute path="/timesheetManagement" component={TimesheetManagement} /> */}
          </Switch>
        </div>
        <StickFooter />
      </div>
    );
  }
}

// Layout.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(Layout);

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
Layout = withStyles(styles)(Layout);
export default withRouter(connect(mapStateToProps)(Layout));
