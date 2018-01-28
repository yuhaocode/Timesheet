import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import SideBar from "./SideBar";
import Redirect from "react-router-dom/Redirect";
import { Link } from "react-router-dom";
import Typography from "material-ui/Typography/Typography";
import TimesheetManagementList from "./TimesheetManagementList";
import { connect } from "react-redux";
import { fetchUser } from "../Actions/user_actions";
import { CircularProgress } from "material-ui/Progress";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import Paper from "material-ui/Paper";

const styles = {
  title: { margin: 40 },
  container: {
    // marginLeft: 100,
    // marginRight:
    paddingLeft: 100,
    paddingRight: 100
  }
};

class TimesheetManagement extends React.Component {
  constructor(props) {
    super(props);
  }
  // onCalenderSelect = (date) => {
  //     let offset = (date.getDay() - 1) % 7;
  //     date.setDate(date.getDate() - offset);
  //     this.props.select(date);
  // }

  componentWillMount() {
    // if (this.props.userList > 0) return;
    this.props.fetchUser();
  }
  render() {
    const { classes } = this.props;
    if (this.props.fetching) {
      return <CircularProgress size={50} thickness={5} />;
    }
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Join Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.userList.map((user, index) => {
                return (
                  // <Link key={user.userId} to={'/userManagement/user' + map.get(index)}> onClick={this.onClick(user.userId)}
                  <TableRow key={user.userId}>
                    <TableCell>
                      <Link
                        key={user.userId}
                        to={"/timesheetManagement/" + user.userId}
                      >
                        {user.username}
                      </Link>
                    </TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                  </TableRow>
                  // </Link>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

TimesheetManagement.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    userList: state.user.userList,
    fetching: state.user.fetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: () => fetchUser(dispatch)
  };
};
TimesheetManagement = withStyles(styles)(TimesheetManagement);
export default connect(mapStateToProps, mapDispatchToProps)(
  TimesheetManagement
);
