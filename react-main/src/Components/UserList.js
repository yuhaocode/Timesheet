import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Redirect from 'react-router-dom/Redirect';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography/Typography';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import { lighten } from 'material-ui/styles/colorManipulator';
import { CircularProgress } from 'material-ui/Progress';
import { connect } from "react-redux";
import { fetchUser } from '../Actions/user_actions';


let counter = 0;
function createData(name, email, contract, role) {
  counter += 1;
  return { id: counter, name, email, contract, role };
}

const columnData = [
  { id: 'username', numeric: false, disablePadding: true, label: 'Username' },
  { id: 'firstName', numeric: false, disablePadding: true, label: 'First Name' },
  { id: 'lastName', numeric: false, disablePadding: true, label: 'Last Name' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'joinDate', numeric: false, disablePadding: false, label: 'Join Date' },

];


class UserListHead extends React.Component {
  constructor(props) {
    super(props);
  }

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { classes } = this.props;
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
    return (
      <TableHead>
        <TableRow>
          {/* <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell> */}
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

UserListHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


const toolbarStyles = theme => ({
  root: {
    paddingRight: 2,
  },
  // highlight:
  //   theme.palette.type === 'light'
  //     ? {
  //         color: theme.palette.secondary.dark,
  //         backgroundColor: lighten(theme.palette.secondary.light, 0.4),
  //       }
  //     : {
  //         color: lighten(theme.palette.secondary.light, 0.4),
  //         backgroundColor: theme.palette.secondary.dark,
  //       },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

// let UserListToolbar = props => {
//   const { numSelected, classes } = props;

//   return (
//     <Toolbar
//       className={classNames(classes.root, {
//         [classes.highlight]: numSelected > 0,
//       })}
//     >
//       <div className={classes.title}>
//         {numSelected > 0 ? (
//           <Typography type="subheading">{numSelected} selected</Typography>
//         ) : (
//             <Typography type="title">User List</Typography>
//           )}
//       </div>
//       <div className={classes.spacer} />
//       <div className={classes.actions}>
//         {numSelected > 0 ? (
//           <Tooltip title="Delete">
//             <IconButton aria-label="Delete">
//               <DeleteIcon />
//             </IconButton>
//           </Tooltip>
//         ) : (
//             <Tooltip title="Filter list">
//               <IconButton aria-label="Filter list">
//                 <FilterListIcon />
//               </IconButton>
//             </Tooltip>
//           )}
//       </div>
//     </Toolbar>
//   );
// };

// UserListToolbar.propTypes = {
//   classes: PropTypes.object.isRequired,
//   numSelected: PropTypes.number.isRequired,
// };

// UserListToolbar = withStyles(toolbarStyles)(UserListToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 800,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class UserList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: 'username',
      selected: [],
      // data: [
      //   createData('Victor Cao', 'victor.cao@authright.com', 'Authright', 'Manager'),
      //   createData('Yuhao Peng', 'yuhao.peng@authright.com', 'Timesheet', 'Employee'),
      //   createData('Jiayi Cai', 'jiayi.cai@authright.com', 'Timesheet', 'Employee'),
      //   createData('Zixiao Zheng', 'zixiao.zheng@authright.com', 'Timesheet', 'Employee'),
      //   createData('Yu Liao', 'yu.liao@authright.com', 'Restaurant Menu', 'Employee'),
      //   createData('Zhitong Fei', 'zhitong.fei@authright.com', 'Restaurant Menu', 'Employee'),
      // ].sort((a, b) => (a.name < b.name ? -1 : 1)),
      data: this.props.userList,//.sort((a, b) => (a.username < b.username ? -1 : 1)),
      page: 0,
      rowsPerPage: 5,
    };
    // console.log(this.props.userList)
  }

  componentWillMount() {
    if (this.props.userList > 0)
      return;
    this.props.fetchUser();
    // console.log(this.props.userList);
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    // const { selected } = this.state;
    // const selectedIndex = selected.indexOf(id);
    // let newSelected = [];

    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, id);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1),
    //   );
    // }
    // this.setState({ selected: newSelected });

  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  getUser = () => {
    this.setState({
      data: this.props.userList,
    });
    // console.log(this.state.userdata)
  }

  render() {
    if (this.props.fetching) {
      return (
        <CircularProgress size={50} thickness={5} />
      );
    }
    { console.log(this.state.data) }
    { console.log(this.props.userList) }
    if (this.state.data.length === 0) {
      this.getUser()
    }

    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        {/* <UserListToolbar numSelected={selected.length} /> */}
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <UserListHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {/* {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                const isSelected = this.isSelected(n.userId); */}
              {this.state.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => {
                const isSelected = this.isSelected(user.userId);
                return (
                  <TableRow
                    hover
                    // onClick={event => this.handleClick(event, n.userId)}
                    onClick={event => this.handleClick(event, user.userId)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={user.userId}
                    // key={n.id}
                    selected={isSelected}
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} />
                    </TableCell> */}
                    <TableCell>
                      {/* <Link key={user.userId} to={'/userManagement/user' + user.userId}> */}
                      {console.log(user.userId)}
                      <Link key={user.userId} to={'/userManagement/user' + user.userId}>
                        {user.username}
                      </Link>
                    </TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    {/* <TableCell padding="none">{n.name}</TableCell>
                    <TableCell >{n.email}</TableCell>
                    <TableCell >{n.contract}</TableCell>
                    <TableCell >{n.role}</TableCell> */}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={6}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page',
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.user.userList,
    fetching: state.user.fetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => fetchUser(dispatch),
    // updateProfile: (user) => updateProfile(user, dispatch),
  }
};

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
};

UserList = withStyles(styles)(UserList);
export default connect(mapStateToProps, mapDispatchToProps)(UserList);



// UserList.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(UserList);


