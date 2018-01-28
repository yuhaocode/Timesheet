import React from 'react';
import './MyProfile.css';
// import '../App.css';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import white from 'material-ui/colors';
import myAvatar from '../Resource/myportrait.jpg'
import Typography from 'material-ui/Typography/Typography';
import TextField from 'material-ui/TextField'

import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import IconButton from 'material-ui/IconButton';

import Save from 'material-ui-icons/Save';
// import { CSSTransition } from 'react-transition-group'
// import Popover from 'material-ui/Popover/Popover';
// import SideBar from './SideBar';
// import WeekTimeList from './WeekTimeList';
// import Details from './Details';

// import {
//     Link,
//     Route,
//     Switch
// } from 'react-router-dom'

// import { fetchContracts, selectInitial, select } from '../Actions/weektime_actions';
import { connect } from "react-redux";
import { updateProfile } from '../Actions/user_actions';


const styles = {
    root: {
        marginTop: 40,

    },

    portrait: {
        // marginTop: -400,
        marginLeft: "20%",
    },

    nameBackground: {
        marginTop: -80,
        paddingTop: 30,
        paddingBottom: 30,
    },

    inputInkbar: {
        color: "#FAFAFA",
        width: "auto",

        '&:after': {
            backgroundColor: "rgba(255,255,255,0.6)",
        }
    },

    // inputRoot: {
    //     color: "rgba(255,255,255,0.6)"
    // },

    inputLabel: {
        color: "rgba(255,255,255,0.6)"
    },

    inputLabelFocused: {
        color: "rgba(255,255,255,0.6)",
    },

    formControl: {
        margin: 30,
        marginTop: 10

        // width: 'auto',
    },
    formHelperText: {
        color: "rgba(255,255,255,0.6)"
    },
    // text: {
    //     marginLeft: 'auto'

    visibilityIcon: {
        color: "rgba(255,255,255,0.7)",
    },
    // },

    // personalInfo: {
    //     marginTop: 50,

    // },
    button: {
        marginTop: 20
    },

    buttonGrid: {
        textAlign: "left"
    },

    RightIcon: {
        marginLeft: "10%"
    },

    typography: {
        // marginLeft: -50,
        zIndex: 3,
        color: "#FAFAFA",
        // opacity: 1,
    },

    avatar: {
        width: 150,
        height: 150,
        backgroundSize: 50,
        borderSize: 50,
        zIndex: 5
    }
}

class MyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // show: false,
            history: false,
            user: {
                ...this.props.user,
                password: "",
                newPassword: "",
            },
            confirmPassword: "",
            showPassword: false,
        };
        this.onChangeInfo = this.onChangeInfo.bind(this);
        this.update = this.update.bind(this);
    }

    onChangeInfo = updateInfo => event => {
        this.setState({
            user: { ...this.state.user, [updateInfo]: event.target.value }
        });
    }

    update = () => {
        console.log(this.state.user);
        this.props.updateProfile(this.state.user);
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPasssword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    render() {
        let helperText;
        if (this.state.confirmPassword === "") {
            helperText = "enter your new password again to confirm";
        } else if (this.state.confirmPassword === this.state.user.newPassword) {
            helperText = "new password confirmed";
        } else {
            helperText = "WRONG new password";
        }

        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div>
                    <Grid container id="portrait" className={classes.portrait} spacing={24}>
                        {/* <Fade in={this.state.show}> */}
                        <Grid item xs={6}>
                            <Avatar
                                alt=""
                                src={myAvatar}
                                className={classes.avatar}
                            />

                        </Grid>
                    </Grid>
                </div>

                <div id="nameBackground" className={classes.nameBackground}>
                    <Grid container className="container">
                        <Grid item className={classes.personalInfo} xs={12}>
                            <Typography align="center" type="h2" className={classes.typography}>
                                {this.props.user.firstName} {this.props.user.lastName}
                            </Typography>
                            <br />
                            <Typography align="center" type="h2" className={classes.typography}>
                                Title
                    </Typography>
                            <br />
                            <Typography align="center" type="h2" className={classes.typography}>
                                Position
                    </Typography>
                        </Grid>
                    </Grid>
                </div>

                <div className="profileBackground">
                    <Grid container className="container">
                        <Grid container item className={classes.profile} xs={12}
                            className={classes.text}
                            alignItems="center"
                            direction="row"
                            justify="center">
                            <Grid item xs={6} align="right">
                                <FormControl className={classes.formControl}>
                                    <InputLabel
                                        className={classes.inputLabel}
                                        FormControlClasses={{ focused: classes.inputLabelFocused, }}
                                    >username
                                    </InputLabel>
                                    <Input
                                        classes={{
                                            underline: classes.underline,
                                            inkbar: classes.inputInkbar,
                                        }}
                                        value={this.state.user.username}
                                    />
                                    <FormHelperText className={classes.formHelperText}>your login username</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} align="left">

                                <FormControl className={classes.formControl}>
                                    <InputLabel
                                        className={classes.inputLabel}
                                        FormControlClasses={{ focused: classes.inputLabelFocused, }}>
                                        Email
                            </InputLabel>
                                    <Input
                                        classes={{ inkbar: classes.inputInkbar, }}
                                        // defaultValue={this.props.user.email}
                                        style={{ width: 250 }}
                                        value={this.state.user.email}
                                        onChange={this.onChangeInfo("email")}
                                    />
                                    <FormHelperText className={classes.formHelperText}>your Email address</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid container item xs={12}
                                className={classes.text}
                                alignItems="center"
                                direction="row"
                                justify="center"
                            >
                                <Grid item xs={6} align="right">
                                    <FormControl className={classes.formControl}>
                                        <InputLabel
                                            className={classes.inputLabel}
                                            FormControlClasses={{ focused: classes.inputLabelFocused, }}>
                                            First Name
                                            </InputLabel>
                                        <Input
                                            classes={{ inkbar: classes.inputInkbar, }}
                                            value={this.state.user.firstName}
                                            onChange={this.onChangeInfo("firstName")}
                                        />
                                        <FormHelperText className={classes.formHelperText}>your first name</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} align="left">
                                    <FormControl className={classes.formControl}>
                                        <InputLabel
                                            className={classes.inputLabel}
                                            FormControlClasses={{ focused: classes.inputLabelFocused, }}>
                                            Last Name
                                            </InputLabel>
                                        <Input
                                            classes={{ inkbar: classes.inputInkbar }}
                                            value={this.state.user.lastName}
                                            onChange={this.onChangeInfo("lastName")}
                                        />
                                        <FormHelperText className={classes.formHelperText}>your last name</FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container
                                className="newPassword"
                                alignItems="center"
                                direction="row"
                                justify="center"
                            >
                                <Grid item xs={3}>
                                    <FormControl className={classes.passwordFormControl}>
                                        <InputLabel
                                            className={classes.inputLabel}
                                            FormControlClasses={{ focused: classes.inputLabelFocused, }}
                                        >
                                            Old Password
                                        </InputLabel>
                                        <Input
                                            classes={{ inkbar: classes.inputInkbar }}
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            value={this.state.user.password}
                                            onChange={this.onChangeInfo("password")}
                                            // onChange={this.handleChange('password')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={this.handleClickShowPasssword}
                                                        onMouseDown={this.handleMouseDownPassword}
                                                    >
                                                        {this.state.showPassword ? <VisibilityOff className={classes.visibilityIcon} /> : <Visibility className={classes.visibilityIcon} />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        <FormHelperText className={classes.formHelperText}>please enter your old password</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl className={classes.passwordFormControl} style={{ paddingRight: 55 }}>
                                        <InputLabel className={classes.inputLabel}
                                            FormControlClasses={{ focused: classes.inputLabelFocused, }}
                                        >
                                            New Password
                                        </InputLabel>
                                        <Input
                                            classes={{
                                                inkbar: classes.inputInkbar,
                                            }}
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            value={this.state.user.newPassword}
                                            onChange={this.onChangeInfo("newPassword")}
                                        //   value={this.state.password}
                                        // onChange={this.handleChange('password')}
                                        />

                                        <FormHelperText className={classes.formHelperText}>set your new password</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl className={classes.passwordFormControl}>
                                        <InputLabel className={classes.inputLabel}
                                            FormControlClasses={{ focused: classes.inputLabelFocused, }}
                                        >
                                            New Password Confirm
                                        </InputLabel>
                                        <Input
                                            classes={{
                                                inkbar: classes.inputInkbar,
                                            }}
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            value={this.state.confirmPassword}
                                            //   value={this.state.password}
                                            onChange={this.handleChange('confirmPassword')}

                                        />
                                        {/* <FormHelperText className={classes.formHelperText}>enter your new password again to confirm</FormHelperText> */}
                                        <FormHelperText className={classes.formHelperText}>{helperText}</FormHelperText>

                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid item className={classes.buttonGrid} >
                                <Button className={this.props.classes.btn} onClick={this.update}>
                                    Save<Save className={classes.rightIcon} />
                                </Button>
                            </Grid>

                        </Grid >
                    </Grid>
                </div>
            </div >

        )
    }
}

// MyProfile.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(MyProfile);

const mapStateToProps = (state) => {
    return {
        // user: state.user.user,
        user: state.user.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: (user) => updateProfile(user, dispatch),
    }
};

MyProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};

MyProfile = withStyles(styles)(MyProfile);
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);