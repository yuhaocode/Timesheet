import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Switch from 'material-ui/Switch';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Logo from './authrightlogo.png';
import { store } from '../store';
import { logout } from '../Actions/auth_actions';
import { Link } from 'react-router-dom'

import { connect } from "react-redux";

const styles = {
  root: {
    width: '100%',
    // boxShadow: '0 0px 0px 0px rgba(33, 150, 243, 0.30)', //flat
  },
  flex: {
    flex: "1",
    display: "flex",
    // marginLeft: 20,
  },
  navButton: {
    marginTop: 20,
    marginLeft: 20,
    color: "white",
    '&:hover': {
      color: "rgba(255,183,77,85)",
    }
  },
};

class MenuAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: props.auth,
      anchorEl: null,
    };
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ anchorEl: null });
  };

  onProfile = () => {
    this.setState({ anchorEl: null });
  };

  onLogout = () => {
    this.setState({
      anchorEl: null,
      auth: false
    });
    logout(store.dispatch);
    window.location.reload();
  }

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    // let userFunction;
    // let adminFunction;

    // if (this.props.user) {
    //   let roleUser = false;
    //   let roleAdmin = false;
    //   this.props.user.authorities.forEach((role) => {
    //     console.log(role);
    //     if (role.authority == "ROLE_USER") {
    //       roleUser = true; 
    //       userFunction = (
    //         < nav style={{ display: "flex" }}>
    //           <Link to={'/timesheet'}>
    //             <div className={classes.navButton}>Timesheet</div>
    //           </Link>
    //           <Link to={'/timesheet/history'}>
    //             <p className={classes.navButton}>View History</p>
    //           </Link>
    //         </nav >
    //       )
    //     }

    //     if (role.authority == "ROLE_ADMIN") {
    //       roleAdmin = true;
    //       adminFunction = (
    //         <nav style={{ display: "flex" }}>
    //           <Link to={'/userManagement'}>
    //             <div className={classes.navButton}>User Management</div>
    //           </Link>
    //           <Link to={'/timesheetManagement'}>
    //             <div className={classes.navButton}>Timesheet Management</div>
    //           </Link>
    //         </nav>
    //       )
    //     }
    //     console.log("roleUser: " + roleUser);
    //     console.log("roleAdmin: " + roleAdmin);
    //   });
    // }

    return (
      <div >
        <AppBar position="static" className={classes.root}>
          <Toolbar>
            <div className={classes.flex}>
              <Link to={'/'}>
                <img src={Logo} alt="Authright" width="auto" />
              </Link>
              {/* {userFunction}
              {adminFunction} */}
                  {this.props.roleUser && (
                    <nav style={{ display: "flex" }}>
                      <Link to={'/timesheet'}>
                        <div className={classes.navButton}>Timesheet</div>
                      </Link>
                      <Link to={'/timesheet/history'}>
                        <p className={classes.navButton}>View History</p>
                      </Link>
                    </nav>
                  )}

                  {this.props.roleAdmin && (
                    <nav style={{ display: "flex" }}>
                      <Link to={'/userManagement'}>
                        <div className={classes.navButton}>User Management</div>
                      </Link>
                      <Link to={'/timesheetManagement'}>
                        <div className={classes.navButton}>Timesheet Management</div>
                      </Link>
                    </nav>
                  )}
            </div>
            <div style={{ display: "flex" }}>
              {auth ? <p>Hello, {this.props.user.firstName}!</p> : <p>Welcome!</p>}
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="contrast"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onRequestClose={this.handleRequestClose}
              >
                {(!auth) && (
                  <Link to={'/login'}>
                    <MenuItem>Login</MenuItem>
                  </Link>
                )}
                {auth && (
                  <div>
                    <Link to={'/myProfile'}>
                      <MenuItem onClick={this.onProfile}>Profile</MenuItem>
                    </Link>
                    <MenuItem onClick={this.onLogout}>Logout</MenuItem>
                  </div>
                )}
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

MenuAppBar = withStyles(styles)(MenuAppBar);
export default connect(mapStateToProps)(MenuAppBar);
// export default withStyles(styles)(MenuAppBar);