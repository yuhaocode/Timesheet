import React from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import { unSelectedWeek } from '../Actions/weektime_actions';
import { connect } from "react-redux";

const styles = {
    card: {
        // minWidth: 275,
        width: "100%",
        margin: "10px 0px",
        '&:hover': {
            boxShadow: '0px 3px 5px 0px rgba(158,158,158, 1)',
            backgroundColor: "white",
        },
        borderRadius: 5,
        backgroundColor: "rgba(255, 255, 255, 0.85)",
    },
    pos: {
        marginBottom: 12,
        color: "rgb(150,150,150)",
    },
    shadowing: {
        boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
        //same as card default, possible to use prop from themes to change it
    },
    list: {
        // '&:nth-child(even)': {
        //     backgroundColor: "rgb(240,240,240)",
        // }
    },
    title: {
        color: "#1976D2",
    }
};

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onCalenderSelect = (date) => {
        let offset = (date.getDay() - 1) % 7;
        date.setDate(date.getDate() - offset);
        this.props.select(date);
    }

    render() {
        let contactInfo = null;
        // console.log(this.props.selectWeek);
        if (this.props.selectWeek) {
            contactInfo = (
                <div className={this.props.classes.list}>
                    <Typography type="title" className={this.props.classes.title}>
                        {/* Contact Name: {this.props.selectWeek.contract.contactName} */}
                        {this.props.selectWeek.contract.contactName} 
                    </Typography>
                        <i>{this.props.selectWeek.contract.companyName}</i>
                    {/* <Typography>
                        CompanyName: {this.props.selectWeek.contract.companyName}
                    </Typography> */}
                    <Typography>
                        ProjectName: {this.props.selectWeek.contract.projectName}
                    </Typography>
                    <Typography>
                        Email: {this.props.selectWeek.contract.contactEmail}
                    </Typography>
                    <Typography>
                        PhoneNumber: {this.props.selectWeek.contract.contactPhoneNumber}
                    </Typography>
                    <Typography className={this.props.classes.pos}>
                        {this.props.selectWeek.contract.content}
                    </Typography>
                </div>
            )
        } else {
            contactInfo = (
                <div className={this.props.classes.list}>
                    <p className={this.props.classes.pos}>If you have any question, please contact</p>
                    <Typography type="title" className={this.props.classes.title}>
                        Admin
                    </Typography>
                    <Typography>
                        Email: Admin@test.com
                    </Typography>
                </div>
            )
        }
        return (
            <div>
                <InfiniteCalendar className={this.props.classes.shadowing}
                    theme={{
                        headerColor: '#2196f3',
                        weekdayColor: 'rgba(33, 150, 243, 0.90)',
                    }}
                    width={"100%"}
                    height={window.innerWidth * 0.15} // height={336} 
                    // selected={new Date()}
                    selected={this.props.selectedMonday == null ? new Date() : this.props.selectedMonday}
                    onSelect={this.onCalenderSelect}
                    locale={{
                        weekStartsOn: 1
                    }}
                />
                <Card className={this.props.classes.card}>
                    <CardContent>
                        <Typography type="headline" component="h2" align="center">
                            Contact Info
                        </Typography>
                        {/* <Typography className={this.props.classes.pos}> */}
                        {contactInfo}
                        {/* </Typography> */}
                    </CardContent>
                </Card>
            </div>
        );
    }
}

SideBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        contracts: state.weektime.contracts,
        selectWeek: state.weektime.selectedWeek,
        user: state.user.user,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // fetchContracts: () => fetchContracts(dispatch),
        // selectInitial: () => selectInitial(dispatch),
        // select: (mondayDate) => select(dispatch, mondayDate)
        // unSelectedWeek: () => unSelectedWeek(dispatch),
    }
};

SideBar = withStyles(styles)(SideBar);
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);