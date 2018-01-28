import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import AccessAlarmIcon from 'material-ui-icons/AccessAlarm';
// import timesheetIcon from '../Resource/timesheet-data.png';
import timesheetIcon from '../Resource/property-time.png';
import userIcon from '../Resource/users.png';
import TimesheetManagementIcon from '../Resource/TimesheetManagement.png';

import { Link } from 'react-router-dom'


const styles = theme => ({
    card: {
        maxWidth: 200,
        minWidth: 200,
        minHeight: 200,
        marginLeft: 50,
        borderRadius: "50%",
        boxShadow: '0px 0px 0px 0px rgba(158,158,158, 1)',
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        '&:hover': {
            boxShadow: '2px 3px 5px 0px rgba(158,158,158, 1)',
            background: "white",
        }
    },
    title: {
        color: theme.palette.text.secondary,
    },
    flexContainer: {
        display: "flex",
        // float: "left",
        marginTop: 100,
        marginLeft: 100,
        flexDirection: "row",
    },
    icon: {
        width: 70,
        height: "auto",
        // height: 50,
        marginLeft: 50,
    },
});

class Dashboard extends React.Component {
    constructor(props) {
        console.log(props);
        super(props);
        // this.state = {
            // roleUser: props.roleUser,
            // roleAdmin: props.roleAdmin,
        // };
    }

    render() {

        // let roleUser = false;
        // let roleAdmin = false;
        // this.props.user.authorities.forEach((role) => {
        //     // console.log(role);
        //     if (role.authority == "ROLE_USER") { roleUser = true; }
        //     if (role.authority == "ROLE_ADMIN") roleAdmin = true;
        //     // console.log("roleUser: " + roleUser);
        //     // console.log("roleAdmin: " + roleAdmin);
        // });

        return (
            <div className={this.props.classes.flexContainer}>
            {/* {console.log("roleUser: " + this.state.roleUser)} */}
                {this.props.roleUser && (
                    <Card className={this.props.classes.card}>
                        <Link to="/timesheet">
                            <CardContent>
                                <img src={timesheetIcon} alt="Timesheet" className={this.props.classes.icon} />
                            </CardContent>
                            <CardContent>
                                <Typography type="title" align="center" className={this.props.classes.title}>
                                    Timesheet
                        </Typography>
                            </CardContent>
                        </Link>
                    </Card>
                )}
                {this.props.roleAdmin && (
                    <span style={{display: "flex"}}>
                        <Card className={this.props.classes.card}>
                            <Link to="/UserManagement">
                                <CardContent>
                                    <img src={userIcon} alt="UserManagement" className={this.props.classes.icon} />
                                </CardContent>
                                <CardContent>
                                    <Typography type="title" align="center" className={this.props.classes.title}>
                                        User Management
                        </Typography>
                                </CardContent>
                            </Link>
                        </Card>
                        <Card className={this.props.classes.card}>
                            <Link to="/timesheetManagement">
                                <CardContent>
                                    <img src={TimesheetManagementIcon} alt="TimesheetManagement" className={this.props.classes.icon} />
                                </CardContent>
                                <CardContent>
                                    <Typography type="title" align="center" className={this.props.classes.title}>
                                        Timesheet Management
                        </Typography>
                                </CardContent>
                            </Link>
                        </Card>
                    </span>
                )}
            </div>
            
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);;