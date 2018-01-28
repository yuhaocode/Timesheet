import React from 'react';
// import './UserDetail.css';
import './MyProfile.css';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import white from 'material-ui/colors';
import myAvatar from '../Resource/myportrait.jpg'
import Typography from 'material-ui/Typography/Typography';
import TextField from 'material-ui/TextField';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import IconButton from 'material-ui/IconButton';
import Save from 'material-ui-icons/Save'
import { CircularProgress } from 'material-ui/Progress';
import { connect } from "react-redux";
import { fetchUser, updateUser } from '../Actions/user_actions';

const styles = {
    root: {
        marginTop: 40,
        margin: 10,
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

class UserDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // show: false,
            history: false,
            // user: {
            //     password: "",
            // },
            // user: null,
            user: this.props.updatedUser,
            newPassword: "",
            confirmPassword: "",
            showPassword: false,
        };
        this.setCurrentUser = this.setCurrentUser.bind(this);
        this.update = this.update.bind(this);
        // this.onChangeInfo = this.onChangeInfo.bind(this);
        // console.log(this.props.match.params)
    }
    componentWillMount() {
        if (this.props.userList.length > 0)
            return;
        this.props.fetchUser();
        // console.log(this.props.userList);
        // console.log(this.props.fetching);
    }

    setCurrentUser() {
        let { uindex } = this.props.match.params;
        let userList = this.props.userList;
        // console.log("uindex " + uindex);
        let currentUser;
        userList.forEach(element => {
            // console.log(element.userId == uindex);
            // console.log(element);
            if (element.userId == uindex) {
                currentUser = element;
                // console.log("currentUser");
                // console.log(currentUser);
            }
        });
        // let user = this.state.user;
        this.setState({
            user: currentUser,
        });
        // console.log(this.state);
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

    onChangeInfo = updateInfo => event => {
        this.setState({
            user: { ...this.state.user, [updateInfo]: event.target.value }
        });
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    update = () => {
        let user = {
            ...this.state.user,
            authorities: this.props.user.authorities,
            password: this.state.newPassword
        };
        console.log(user);
        this.props.updateUser(user);
    }

    render() {
        const { classes } = this.props;
        // console.log("fetching: " + this.props.fetching);
        // console.log("fetchied: " + this.props.fetched);
        if (this.props.fetching || !this.props.fetched) {
            // console.log(this.props.fetching);
            return (
                <CircularProgress size={50} thickness={5} />
            );
        }
        // console.log(this.state.user.userInfo);
        if (this.state.user === null) {
            // { console.log(this.props.userList) }
            this.setCurrentUser();
        }

        // console.log(this.state.user);

        if (this.state.user === null) {
            return (
                <CircularProgress size={50} thickness={5} />
            );
        }

        let helperText;
        if (this.state.confirmPassword === "") {
            helperText = "enter your new password again to confirm";
        } else if (this.state.confirmPassword === this.state.newPassword) {
            helperText = "new password confirmed";
        } else {
            helperText = "WRONG new password";
        }

        return (
            <div className={classes.root} id="root">
                <div>
                    <Grid container id="portrait" className={classes.portrait} spacing={24}>

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
                                {this.state.user.firstName} {this.state.user.lastName}
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
                                        FormControlClasses={{ focused: classes.inputLabelFocused, }}>
                                        username
                            </InputLabel>
                                    <Input classes={{
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
                                    <Input classes={{
                                        inkbar: classes.inputInkbar,
                                    }}
                                        value={this.state.user.email}
                                        onChange={this.onChangeInfo("email")}
                                        style={{ width: 250 }}
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
                                        <Input classes={{
                                            inkbar: classes.inputInkbar,
                                        }}
                                        // defaultValue={this.props.user.firstName}
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
                                        <Input classes={{
                                            inkbar: classes.inputInkbar,
                                        }}
                                        // defaultValue={this.props.user.lastName}
                                            value={this.state.user.lastName}
                                            onChange={this.onChangeInfo("lastName")}
                                        />
                                        <FormHelperText className={classes.formHelperText}>your last name</FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            {/* --------------------------set new password here------------------------- */}
                            <Grid container
                                // item xs={12}
                                className="newPassword"
                                // alignItems="center"
                                direction="row"
                                justify="center"
                            >
                                <Grid item xs={6} align="right">
                                    <FormControl className={classes.passwordFormControl} style={{ paddingRight: 55 }} autoComplete="off">
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
                                            value={this.state.newPassword}
                                            onChange={this.handleChange("newPassword")}
                                        // onChange={this.changerePassword.bind(this)}
                                        // endAdornment={
                                        //     <InputAdornment position="end">
                                        //         <IconButton
                                        //             onClick={this.handleClickShowPasssword}
                                        //             onMouseDown={this.handleMouseDownPassword}
                                        //         >
                                        //             {this.state.showPassword ? <VisibilityOff className={classes.visibilityIcon} /> : <Visibility className={classes.visibilityIcon} />}
                                        //         </IconButton>
                                        //     </InputAdornment>

                                        // }

                                        />
                                        <FormHelperText className={classes.formHelperText}>set your new password</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} align="left">
                                    <FormControl className={classes.passwordFormControl} autoComplete="off">
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
                                            onChange={this.handleChange('confirmPassword')}

                                        // onChange={this.changerePassword.bind(this)}
                                        // endAdornment={
                                        //     <InputAdornment position="end">
                                        //         <IconButton
                                        //             onClick={this.handleClickShowPasssword}
                                        //             onMouseDown={this.handleMouseDownPassword}
                                        //         >
                                        //             {this.state.showPassword ? <VisibilityOff className={classes.visibilityIcon} /> : <Visibility className={classes.visibilityIcon} />}
                                        //         </IconButton>
                                        //     </InputAdornment>

                                        // }

                                        />
                                        <FormHelperText className={classes.formHelperText}>{helperText}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Button color="contrast" className={classes.button} onClick={this.update}>
                                    Save<Save className={classes.RightIcon} />
                                </Button>

                            </Grid>


                        </Grid>
                    </Grid>
                </div>


            </div>

        )
    }
}

// UserDetail.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(UserDetail);

const mapStateToProps = (state) => {
    return {
        userList: state.user.userList,
        fetching: state.user.fetching,
        fetched: state.user.fetched,
        user: state.user.user,
        updatedUser: state.user.updatedUser,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: () => fetchUser(dispatch),
        updateUser: (user) => updateUser(user, dispatch),
    }
};

UserDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

UserDetail = withStyles(styles)(UserDetail);
export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);