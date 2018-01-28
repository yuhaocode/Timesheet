import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Redirect from "react-router-dom/Redirect";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../Actions/user_actions";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import Paper from "material-ui/Paper";
import { CircularProgress } from "material-ui/Progress";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

class UserManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onClick = this.onClick.bind(this);
  }

  onClick(id) {
    <Redirect
      to={{
        pathname: "/userManagement/user" + id
        // state: { from: props.location }
      }}
    />;
  }

  componentWillMount() {
    if (this.props.userList > 0) return;
    this.props.fetchUser();
    // console.log(this.props.userList);
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
                        to={"/userManagement/user" + user.userId}
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

const mapStateToProps = state => {
  return {
    userList: state.user.userList,
    fetching: state.user.fetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: () => fetchUser(dispatch)
    // updateProfile: (user) => updateProfile(user, dispatch),
  };
};

UserManagement.propTypes = {
  classes: PropTypes.object.isRequired
};

UserManagement = withStyles(styles)(UserManagement);
export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);

// UserManagement.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(UserManagement);
