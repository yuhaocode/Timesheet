import React from "react";
// import PropTypes from 'prop-types';
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText
  // DialogTitle,
} from "material-ui/Dialog";
import { connect } from "react-redux";
import Card, { CardContent, CardActions } from "material-ui/Card";
import Typography from "material-ui/Typography";
import TextField from "material-ui/TextField";
import { CircularProgress } from "material-ui/Progress";
import Save from "material-ui-icons/Save";
import Send from "material-ui-icons/Send";

import { Link } from "react-router-dom";
import Redirect from "react-router-dom/Redirect";
import {
  update,
  updateInitial,
  unSelectedWeek
} from "../Actions/weektime_actions";

const styles = {
  root: {
    boxShadow:
      "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)"
  },
  alert: {
    padding: "20px",
    backgroundColor: "#4CAF50",
    color: "white"
  },
  closebtn: {
    marginLeft: "15px",
    color: "white",
    fontWeight: "bold",
    float: "right",
    fontSize: "22px",
    cursor: "pointer",
    transition: "0.3s",
    "&:hover": {
      color: "black"
    }
  },
  flexContainer: {
    // display: "flex",
    // flexWrap: "nowrap",
    // backgroundColor: "rgba(255,255,255,0)",
    "&:nth-child(even)": {
      // backgroundColor: "rgb(240,240,240)",
    }
  },

  card: {
    minWidth: 102,
    // maxWidth:100,
    padding: 0,
    // marginBottom: 10,
    borderRadius: 0,
    // backgroundColor: "rgba(255, 255, 255, 0.90)",
    // '&:hover': {
    //     boxShadow: '2px 3px 5px 0px rgba(158,158,158, 1)',
    //     backgroundColor: "white",
    // },
    boxShadow: "0px 0px 0px 0px rgba(158,158,158, 1)",
    border: "3px solid #FFF3E0"
  },
  cardTitle: {
    // background: "radial-gradient(white, rgb(240,240,240))",
    // backgroundColor: "black",
    // background: "radial-gradient(white, rgba(255, 183, 77, 0.75))",
    backgroundColor: "#FFF3E0",
    borderRadius: 0,
    boxShadow: "0px 0px 0px 0px rgba(158,158,158, 1)"
  },
  cardWeekday: {
    boxShadow: "0px 0px 0px 0px rgba(158,158,158, 1)",
    borderLeft: "1px solid #FFF3E0",
    borderRight: "1px solid #FFF3E0",
    // borderBottom: "3px solid #FFF3E0 ", //rgb(240,240,240)
    // borderRight: "3px solid #FFF3E0", //rgb(240,240,240)
    borderRadius: 0,
    "&:hover": {
      // background: "radial-gradient(rgba(255, 183, 77, 0.55), rgba(255, 183, 77, 0.75))",
      // backgroundColor: "rgba(255,255,255,0)",
    }
  },
  title: {
    padding: 20
    // color: "white"
  },
  headline: {
    // color: "white",  //theme.palette.common.white
    // margin: 'auto',
    fontSize: "100%"
    // backgroundColor: "rgba(240,240,240, 0.85)", //rgba(33, 150, 243, 0.5)
  },
  rightIcon: {
    marginLeft: 10
  },
  btn: {
    marginLeft: 5,
    backgroundColor: "rgba(255,152,0,0.2)",
    "&:hover": {
      backgroundColor: "rgba(255,152,0,0.8)"
    }
  }
};

class Details extends React.Component {
  constructor(props, weekdays) {
    super(props);
    this.state = {
      dialogOpen: false,
      redirected: false,
      // updateWeektime: null,
      updateWeektime: this.props.weekTimes[this.props.match.params],
      total: 0,
      windex: this.props.match.params
    };
    this.weekdays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];
  }

  componentWillMount() {
    let { windex } = this.props.match.params;
    let { weekTimes, contracts } = this.props;
    if (weekTimes.length === 0 || contracts.length === 0) {
      return;
    }
    console.log("Week time details initializing...");

    let weektime = weekTimes[windex];
    this.setState({
      updateWeektime: weektime
    });
    if (!weektime.viewed) {
      this.props.initial();
    }
    setTimeout(() => {
      this.sumHours();
    }, 50);
  }

  componentDidUpdate() {
    if (this.props.updated) {
      console.log("Redirecting back to timesheet");
      setTimeout(() => {
        this.setState({ redirected: true });
      }, 800);
    }
  }

  componentWillUnmount() {
    this.props.unSelectedWeek();
    this.props.initial();
  }

  limit = (val, max) => {
    max = max.toString();
    if (max <= 0) {
      return "0";
    }

    if (val[0] === "-") {
      return "0";
    }

    if (val.length > max.length || Number(val) > Number(max)) {
      val = max;
    }

    return Number(val);
  };

  sumHours = () => {
    let { updateWeektime } = this.state;
    let total = 0;
    this.weekdays.forEach(weekday => {
      total += updateWeektime[weekday.toLowerCase()];
    });
    this.setState({
      total: total
    });
  };

  onChangeHours = dayOfWeek => event => {
    let hours = this.limit(event.target.value, 24);
    console.log(dayOfWeek, hours);
    let updateWeektime = this.state.updateWeektime;
    let oldHours = updateWeektime[dayOfWeek];
    let oldTotal = this.state.total;
    // let newWeekTime = {...updateWeektime}
    // newWeekTime[dayOfWeek.toLowerCase()] = hours;
    this.setState({
      total: oldTotal - oldHours + hours,
      updateWeektime: { ...updateWeektime, [dayOfWeek]: hours }
    });
    setTimeout(() => {
      console.log(this.state.updateWeektime);
    }, 10);
  };

  onChangeNote = event => {
    let updateWeektime = this.state.updateWeektime;
    this.setState({
      updateWeektime: { ...updateWeektime, note: event.target.value }
    });
    setTimeout(() => {
      console.log(this.state.updateWeektime);
    }, 10);
  };

  update = () => {
    console.log(this.state.updateWeektime);
    this.props.update(this.state.updateWeektime);
  };

  submit = () => {
    console.log(this.state.updateWeektime);
    this.props.submit(this.state.updateWeektime);
  };

  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleCancel = () => {
    this.setState({ dialogOpen: false });
  };

  handleOK = () => {
    this.setState({ dialogOpen: false });
    this.submit();
  };

  render() {
    if (this.props.fetching) {
      return <CircularProgress size={50} thickness={5} />;
    }
    if (this.state.redirected) {
      console.log("Updated or submit successfully, redirecting back...");
      return <Redirect to="/timesheet" />;
    }
    let { updateWeektime } = this.state;
    const { updated, classes, contracts } = this.props;
    let contract = null;
    for (let i = 0; i < contracts.length; i++) {
      if (updateWeektime.contractId === contracts[i].id) {
        contract = contracts[i];
        break;
      }
    }

    let alertVisibility = updated ? "visible" : "hidden";
    let returnBack = this.state.updateWeektime.viewed ? "Back" : "Cancel";
    let from = this.state.updateWeektime.viewed
      ? "/timesheet/history"
      : "/timesheet";

    return (
      <div>
        <div>
          <div
            className={classes.alert}
            style={{ visibility: alertVisibility }}
          >
            <span className={classes.closebtn} onClick={this.handleCloseAlert}>
              &times;
            </span>
            Successfully updated!
          </div>
          {/* {
                        updated && (
                            <div className={classes.alert}>
                                <span className={classes.closebtn} onClick={this.handleCloseAlert}>&times;</span>
                                Successfully updated!
                    </div>)} */}
        </div>
        {/* <Link to={updateWeektime.submitted ? "/timesheet/history" : "/timesheet"}><Button raised color="primary">Back</Button></Link> */}

        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure to submit this timesheet? Action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleOK} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        {/* </div> */}
        <div className={classes.root}>
          <Card className={classes.cardTitle}>
            <Typography align="center" type="title" className={classes.title}>
              Week {updateWeektime.mondayDate.toLocaleDateString().slice(0, 10)}{" "}
              to{" "}
              {new Date(
                updateWeektime.mondayDate.getTime() + 6 * 24 * 3600 * 1000
              )
                .toLocaleDateString()
                .slice(0, 10)}
            </Typography>
            {/* <h2>Project: {contract.projectName}</h2>
                        <h2>Company: {contract.companyName}</h2> */}
          </Card>
          <div className="flexContainer">
            {this.weekdays.map(weekday => (
              <Card key={weekday} className={classes.cardWeekday}>
                <CardContent>
                  <Typography
                    align="center"
                    className={this.props.classes.headline}
                  >
                    {weekday}
                  </Typography>
                </CardContent>
                <CardContent>
                  <TextField
                    disabled={this.state.updateWeektime.submitted}
                    label="Hours"
                    placeholder="Hours"
                    margin="normal"
                    value={this.state.updateWeektime[weekday.toLowerCase()]}
                    onChange={this.onChangeHours(weekday.toLowerCase())}
                    type="number"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className={this.props.classes.card}>
            <CardContent>
              <TextField
                fullWidth={true}
                disabled={this.state.updateWeektime.submitted}
                label="Note"
                margin="normal"
                multiline={true}
                value={
                  this.state.updateWeektime.note == null
                    ? ""
                    : this.state.updateWeektime.note
                }
                onChange={this.onChangeNote}
                type="text"
              />
              <Typography align="left">Total: {this.state.total}</Typography>
            </CardContent>
            <CardActions style={{ display: "block" }}>
              <Link to={from}>
                <Button className={this.props.classes.btn}>
                  {returnBack}
                  {/* <Send className={classes.rightIcon} /> */}
                </Button>
              </Link>
              {!this.state.updateWeektime.submitted && (
                <span style={{ float: "right" }}>
                  <Button
                    className={this.props.classes.btn}
                    onClick={this.handleClickOpen}
                  >
                    Submit
                    <Send className={classes.rightIcon} />
                  </Button>
                  <Button
                    className={this.props.classes.btn}
                    onClick={this.update}
                  >
                    Save
                    <Save className={classes.rightIcon} />
                  </Button>
                </span>
              )}
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.weektime.fetching,
    updated: state.weektime.updated,
    weekTimes: state.weektime.weekTimes,
    contracts: state.weektime.contracts,
    selectWeek: state.weektime.selectedWeek
  };
};

const mapDispatchToProps = dispatch => {
  return {
    update: weektime => update(weektime, dispatch),
    submit: weektime => update(weektime, dispatch, true),
    initial: () => updateInitial(dispatch),
    unSelectedWeek: () => unSelectedWeek(dispatch)
    // updateInitial: () => updateInitial(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Details)
);
