import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Logo from "./authrightlogo.png";
import Grid from "material-ui/Grid";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import IconButton from "material-ui/IconButton";
import Input, { InputLabel, InputAdornment } from "material-ui/Input";
import { FormControl, FormHelperText } from "material-ui/Form";
import Visibility from "material-ui-icons/Visibility";
import VisibilityOff from "material-ui-icons/VisibilityOff";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import Redirect from "react-router-dom/Redirect";
import { colors } from "material-ui";

// import { userActions } from '../_actions';
const styles = {
  root: {
    flexGrow: 1,
    marginTop: 50,
    textAlign: "center"
  },
  card: {
    margin: 30
    // backgroundColor: "#F6F9F9",
  },
  container: {
    padding: "0 16px"
  },
  img: {
    backgroundColor: "rgb(33, 150, 243)", //"rgb(246,249,249)"
    padding: "0 16px"
  },
  button: {
    marginTop: 10,
    width: "100%"
  },
  alert: {
    padding: 20,
    backgroundColor: "#f44336",
    color: "white"
  },
  closebtn: {
    marginLeft: 15,
    color: "white",
    fontWeight: "bold",
    float: "right",
    fontSize: 22,
    cursor: "pointer",
    transition: "0.3s",
    "&:hover": {
      color: "black"
    },
    forgetPassword: {
      margin: 30,
      textAlign: "left"
    }
  }
};

const AlertBox = function(props) {
  if (!props.display) {
    return null;
  }
  return (
    <div className={props.classes.alert}>
      <span className={props.classes.closebtn} onClick={props.onClick}>
        &times;
      </span>
      {props.children}
    </div>
  );
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      alert: false,
      loginError: this.props.loginError,
      showPassword: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.handleClickShowPasssword = this.handleClickShowPasssword.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  emailChange = event => {
    this.setState({
      email: event.target.value
    });
    console.log(this.state.email);
  };

  submitEmail = () => {
    console.log(this.props);
    this.props.emailSubmit(this.state.email);
    this.handleClose();
  };

  sendCredential = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.username, this.state.password);
  };

  handleCloseAlert = alertname => event => {
    console.log("alert closed");
    this.setState({ [alertname]: false });
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  componentDidMount() {
    let { state } = this.props.location;
    if (state !== undefined && "from" in state && state.from.pathname !== "/") {
      this.setState({ alert: true });
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };

    if (this.props.loggedIn) {
      console.log("redirecting back");
      return <Redirect to={from} />;
    }
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {console.log(this.props)}
        {/* <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <AlertBox classes={classes} display={this.state.alert} onClick={this.handleCloseAlert('alert')}>
                            Please log in before any action!
                        </AlertBox>
                        <AlertBox classes={classes} display={this.state.loginError} onClick={this.handleCloseAlert('loginError')}>
                            Invalid username or password!
                        </AlertBox>
                    </Grid>
                </Grid > */}
        <Grid justify="center" container spacing={24}>
          <Card className={classes.card}>
            <div className={classes.img}>
              <img src={Logo} alt="Authright" width="auto" height="70%" />
            </div>
            <CardContent>
              <div className={classes.container}>
                <form onSubmit={event => this.sendCredential(event)}>
                  <TextField
                    // required
                    id="name"
                    label="Username"
                    value={this.state.name}
                    onChange={this.handleChange("username")}
                    margin="normal"
                    helperText="Please input your name"
                    fullWidth
                  />
                  <FormControl
                    fullWidth
                    // required
                  >
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      id="adornment-password"
                      type={this.state.showPassword ? "text" : "password"}
                      value={this.state.password}
                      onChange={this.handleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={this.handleClickShowPasssword}
                            onMouseDown={this.handleMouseDownPassword}
                          >
                            {this.state.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText id="weight-helper-text">
                      Please input your password
                    </FormHelperText>
                  </FormControl>
                  <div
                    className="forgetPassword"
                    style={{ marginTop: 10, marginLeft: 0, textAlign: "left" }}
                  >
                    <Button
                      onClick={this.handleClickOpen}
                      style={{ fontSize: 10, color: "rgba(0,0,0,0.6)" }}
                    >
                      Forget Password ?
                    </Button>
                    <Dialog
                      open={this.state.open}
                      onClose={this.handleClose}
                      aria-labelledby="form-dialog-title"
                    >
                      <DialogTitle id="form-dialog-title">
                        Forget Password
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          To retrive your password, please enter your email
                          address here. We will send you an email with your
                          password immediately.
                        </DialogContentText>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          label="Email Address"
                          type="email"
                          fullWidth
                          onChange={this.emailChange}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={this.submitEmail} color="primary">
                          Submit
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                  <div>
                    <Button
                      className={classes.button}
                      raised
                      color="primary"
                      type="submit"
                    >
                      Login
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
