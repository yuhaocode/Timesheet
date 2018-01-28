import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import SideBar from './SideBar';
import WeekTimeList from './WeekTimeList';
import Details from './Details';
import { CircularProgress } from 'material-ui/Progress';

import {
    Link,
    Route,
    Switch
} from 'react-router-dom'

import { fetchContracts, selectInitial, select } from '../Actions/weektime_actions';
import { connect } from "react-redux";

const styles = {
}

class TimeSheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: false
        };
    }

    componentWillMount() {
        if (this.props.contracts.length > 0 || this.props.weekTimes.length > 0)
            return;
        this.props.fetchContracts();
    }

    render() {
        console.log(this.props.fetching);
        if(this.props.fetching) {
            return (
                <CircularProgress size={50} thickness={5}/>
            );
        }
        return (
            <Grid container spacing={24}>
                <Grid item xs={12} sm={9}>
                    <Grid container justify="center">
                        {/* <Grid item xs={12} sm={9}>
                            <Link to="/history"><Button raised color="primary">View History</Button></Link>
                        </Grid> */}
                        <Grid item xs={12} sm={9}>
                            <Switch>
                                <Route
                                    exact
                                    path={this.props.match.url}
                                    render={(props) => (<WeekTimeList {...props}
                                        weekTimes={this.props.weekTimes}
                                        contracts={this.props.contracts}
                                        history={false}
                                        selectedMonday={this.props.selectedMonday}
                                        selectInitial={this.props.selectInitial}
                                    />
                                    )}
                                />
                                <Route
                                    exact
                                    path={this.props.match.url + '/history'}
                                    // render={(props) => (<Histories {...props} user={this.props.user} weekTimes={this.props.weekTimes} contracts={this.props.contracts} />)} 
                                    render={(props) => (<WeekTimeList {...props}
                                        weekTimes={this.props.weekTimes}
                                        contracts={this.props.contracts}
                                        history={true}
                                        selectedMonday={this.props.selectedMonday}
                                        selectInitial={this.props.selectInitial}
                                    />
                                    )}
                                />
                                <Route
                                    path={this.props.match.url + '/weektime:windex'}
                                    // render={(props) => (<Detail {...props} weekTimes={this.props.weekTimes} />)} 
                                    component={Details}
                                />
                            </Switch>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <SideBar selectedMonday={this.props.selectedMonday} select={this.props.select} />
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        contracts: state.weektime.contracts,
        weekTimes: state.weektime.weekTimes,
        fetching: state.weektime.fetching,
        selectedMonday: state.weektime.selectedMonday
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchContracts: () => fetchContracts(dispatch),
        selectInitial: () => selectInitial(dispatch),
        select: (mondayDate) => select(dispatch, mondayDate)
    }
};

TimeSheet.propTypes = {
    classes: PropTypes.object.isRequired,
};

TimeSheet = withStyles(styles)(TimeSheet);
export default connect(mapStateToProps, mapDispatchToProps)(TimeSheet);