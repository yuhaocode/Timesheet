import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "material-ui/AppBar";
import Button from "material-ui/Button";
import Tabs, { Tab } from "material-ui/Tabs";
import Typography from "material-ui/Typography";
import TimesheetManagementDetail from "./TimesheetManagementDetail";
import { fetchAllWeektimeAndContract } from "../Actions/weektime_actions";
import Card, { CardContent } from "material-ui/Card";
import Grid from "material-ui/Grid";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import { Link, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import IconButton from "material-ui/IconButton";
import List, { ListItem, ListItemText } from "material-ui/List";
import Refresh from "material-ui-icons/Refresh";
import Menu, { MenuItem } from "material-ui/Menu";
import { CircularProgress } from "material-ui/Progress";
import { selectWeek } from "../Actions/weektime_actions";
const options = ["Pending", "Unsubmit", "Reject", "Approve", "All"];
function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30
  },
  card: {
    marginBottom: 10,
    borderRadius: 5,
    // backgroundColor: "rgba(255, 255, 255, 0.85)",
    "&:hover": {
      boxShadow: "2px 3px 5px 0px rgba(158,158,158, 1)",
      backgroundColor: "white"
    }
  },
  title: {
    // marginBottom: 16,
    // color: theme.palette.text.secondary,
  },
  pos: {
    margin: 12,
    color: theme.palette.text.secondary
  },
  cardtitle: {
    padding: 10,
    background: "radial-gradient(white, rgba(240,240,240, 0.85))"
    // boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
  },
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "nowrap",
    padding: 0,
    "&:last-child": {
      paddingBottom: "0px"
    }
  },
  cardhour: {
    padding: 12,
    // background: "linear-gradient(rgba(33, 150, 243,0.50), rgba(33, 150, 243,0.90))",
    background:
      "radial-gradient(rgba(255, 183, 77, 0.55), rgba(255, 183, 77, 0.75))",
    color: "white"
  }
});

class TimesheetManagementList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      selectedIndex: 0,
      filterWeektimes: this.props.weekTimes
    };
  }

  componentWillMount() {
    this.props.fetchAllWeektimeAndContract(this.props.match.params.uindex);
    console.log(1);
    this.handleMenuItemClick(0, 0);
  }
  sumHours = weektime => {
    let weekdays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];
    let total = 0;
    weekdays.forEach(weekday => {
      total += weektime[weekday.toLowerCase()];
    });
    return total;
  };

  //modify filter
  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });

    this.state.filterWeektimes = this.props.weekTimes;

    if (index === 0) {
      this.state.filterWeektimes = this.props.weekTimes.filter(
        weektime => weektime.submitted && !weektime.viewed
      );
    }
    if (index === 1) {
      this.state.filterWeektimes = this.props.weekTimes.filter(
        weektime => !weektime.submitted && !weektime.viewed
      );
    }
    if (index === 2) {
      this.state.filterWeektimes = this.props.weekTimes.filter(
        weektime => !weektime.submitted && weektime.viewed
      );
    }
    if (index === 3) {
      this.state.filterWeektimes = this.props.weekTimes.filter(
        weektime => weektime.submitted && weektime.viewed
      );
    }
    console.log(this.state.filterWeektimes);
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const {
      classes,
      weekTimes,
      contracts,
      history,
      selectedMonday
    } = this.props;
    if (this.props.fetching) {
      return <CircularProgress size={50} thickness={5} />;
    }
    return(
    let renderWeekTimes = this.state.filterWeektimes
      .map(weektime => {
        let goalContract = null;
        for (let i = 0; i < contracts.length; i++) {
          if (contracts[i].id === weektime.contractId) {
            goalContract = { ...contracts[i] };
            break;
          }
        }
        let newWeekTime = { ...weektime, contract: goalContract };
        // console.log(newWeekTime);
        return newWeekTime;
      })
      .sort((wa, wb) => wb.mondayDate.getTime() - wa.mondayDate.getTime());
    if (selectedMonday != null) {
      renderWeekTimes = renderWeekTimes.filter(
        weektime => weektime.mondayDate.getTime() === selectedMonday.getTime()
      );
    }

    let map = new Map();
    renderWeekTimes.forEach((weektime, index) => {
      for (let i = 0; i < weekTimes.length; i++) {
        if (weektime.weekId === weekTimes[i].weekId) {
          map.set(index, i);
        }
      }
    });
    console.log(map);

    return (
      <div>
        {history ? (
          <div style={{ fontSize: "30px", textAlign: "center" }}>
            Timesheet History
            {/* <h2 style={{ textAlign: "center"}}>Timesheet History</h2> */}
            <IconButton onClick={this.props.selectInitial} color="primary">
              <Refresh />
            </IconButton>
          </div>
        ) : (
          <div style={{ fontSize: "30px", textAlign: "center" }}>
            Timesheet
            {/* <h2 style={{ textAlign: "center" }}>Timesheet to be filled</h2> */}
            <IconButton onClick={this.props.selectInitial} color="primary">
              <Refresh />
            </IconButton>
          </div>
        )}
        <div className={classes.alert}>
          <List>
            <ListItem
              button
              aria-haspopup="true"
              aria-controls="lock-menu"
              aria-label="Filter"
              onClick={this.handleClickListItem}
            >
              <ListItemText
                primary="Filter"
                secondary={options[this.state.selectedIndex]}
              />
            </ListItem>
          </List>
          <Menu
            id="lock-menu"
            anchorEl={this.state.anchorEl}
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}
          >
            {options.map((option, index) => (
              <MenuItem
                key={option}
                selected={index === this.state.selectedIndex}
                onClick={event => this.handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>

        <div className={classes.root}>
          <Grid container spacing={24}>
            {renderWeekTimes.map((weektime, index) => (
              <Grid item xs={6} key={index}>
                <Card
                  className={classes.card}
                  onClick={() => this.props.selectWeek(weektime)}
                >
                  <Link to={"/timesheetManagement/weektime/" + map.get(index)}>
                    {/* <Link to={"/timesheet/weektime" + map.get(index)}> */}
                    <CardContent className={this.props.classes.cardtitle}>
                      <Typography
                        align="center"
                        type="subheading"
                        className={classes.title}
                      >
                        Week{" "}
                        <em>
                          {weektime.mondayDate
                            .toLocaleDateString()
                            .slice(0, 10)}{" "}
                          -{" "}
                          {new Date(
                            weektime.mondayDate.getTime() + 6 * 24 * 3600 * 1000
                          )
                            .toLocaleDateString()
                            .slice(0, 10)}
                        </em>
                      </Typography>
                    </CardContent>
                    <CardContent className={classes.flexContainer}>
                      <Typography className={classes.pos}>
                        {/* Project: {weektime.contract.projectName} */}
                      </Typography>
                      <div className={this.props.classes.cardhour}>
                        Hour: {this.sumHours(weektime)}
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Switch>
            <Route
              path={"timesheetManagement/weektime/:windex"}
              // render={(props) => (<Detail {...props} weekTimes={this.props.weekTimes} />)}
              component={TimesheetManagementDetail}
            />
          </Switch>
        </div>
      </div>
    )
    );
  }
}

TimesheetManagementList.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return {
    contracts: state.weektime.contracts,
    weekTimes: state.weektime.weekTimes,
    fetching: state.weektime.fetching,
    selectedMonday: state.weektime.selectedMonday
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllWeektimeAndContract: id =>
      fetchAllWeektimeAndContract(id, dispatch),
    selectWeek: weektime => selectWeek(dispatch, weektime)
  };
};

TimesheetManagementList = withStyles(styles, { withTheme: true })(
  TimesheetManagementList
);
export default connect(mapStateToProps, mapDispatchToProps)(
  TimesheetManagementList
);
