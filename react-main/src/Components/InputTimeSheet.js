import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import InputDay from './InputDay';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import { connect } from 'react-redux';
import { saveWeeklyHour } from '../Actions/index';

const styles = {
    baseCard: {
        backgroundColor: "rgba(255,255,255,0)",
    },
    card: {
        // minWidth: 275,
        // maxWidth:100,
        padding: 0,
        marginBottom: 10,
        borderRadius: 0,
        // border: "1px solid rgba(158,158,158, 1)",
        // boxShadow: '0px 0px 0px 0px rgba(158,158,158, 1)',
        // backgroundColor: "rgba(255,255,255,0,9)", //"rgb(33, 150, 243)",
        '&:hover': {
            // boxShadow: '2px 3px 5px 0px rgba(158,158,158, 1)',
            // boxShadow: '0px 3px 5px 3px rgba(158,158,158, 1)',
            background: "linear-gradient(rgba(33, 150, 243, 0.60), rgba(33, 150, 243, 0.0))",
        },
    },
    root: {
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: "auto",
    },
    flexContainer: {
        display: "flex",
        flexWrap: "nowrap",
    },
    flexItem: {
        flexGrow: 1,
    },
    note: {
        textAlign: 'center',
    }
}

class InputTimeSheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hideInput: false,
            weeklyHour: props.weeklyHour,
            // note: props.weeklyHour.Note,
        };
        // console.log(this.state.weeklyHour)；
        this.handleHourChange = this.handleHourChange.bind(this);
        this.handleNoteChange = this.handleNoteChange.bind(this);
    }

    componentWillMount() {
        if (this.props.hideInput === true) {
            this.setState({
                hideInput: true,
            })
        }
    }

    handleNoteChange(event) {
        let newWeeklyHour = this.state.weeklyHour;
        newWeeklyHour["note"] = event.target.value;
        this.setState({
            weeklyHour: newWeeklyHour,
        });
        console.log(this.state.weeklyHour);
    }

    handleHourChange(weekday, hour) {
        let newWeeklyHour = this.state.weeklyHour;
        newWeeklyHour[weekday.toLowerCase()] = hour;
        this.setState({
            weeklyHour: newWeeklyHour,
        });
        // console.log(this.state.weeklyHour);
    }


    render() {
        let noteInfo;
        if (this.state.hideInput) {
            noteInfo = (
                <p className={this.props.classes.note}>{this.state.weeklyHour.note}</p>
            )
        } else {
            noteInfo = (
                <form noValidate autoComplete="off">
                    <TextField
                        fullWidth
                        label="Note"
                        multiline
                        className={this.props.classes.textField}
                        margin="normal"
                        // value={this.state.note}
                        value={(this.state.weeklyHour.note)?this.state.weeklyHour.note:""}
                        onChange={this.handleNoteChange}
                    />
                </form>
            )
        }

        return (
            <div>
                <Card className={this.props.classes.baseCard}>
                    <div className={this.props.classes.flexContainer}>
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((weekday) => (
                            // console.log(this.state.weeklyHour.mondayDate),
                            // console.log(new Date(this.state.weeklyHour.mondayDate)),
                            <InputDay
                                key={weekday}
                                weekDay={weekday}
                                hours={this.state.weeklyHour[weekday.toLowerCase()]}
                                hideInput={this.state.hideInput}
                                onHoursChange={this.handleHourChange}
                            />
                        ))}
                    </div>
                    <Card className={this.props.classes.card}>
                        <CardContent>
                            {noteInfo}
                        </CardContent>
                        {this.state.hideInput === false &&
                            <CardActions>
                                <Button color="primary">     {/* className={this.props.classes.overrideButton} onClick={this.onClickHour.bind(this)} */}
                                    Submit
                                </Button>
                                <Button color="primary" onClick={() => this.props.onSaveClick(this.state.weeklyHour)}>Save</Button>
                            </CardActions>
                        }
                    </Card>
                </Card>
            </div>
        );
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onSaveClick: week => {
//             dispatch(saveWeeklyHour(week))
//         }
//     }
// }

InputTimeSheet.propTypes = {
    classes: PropTypes.object.isRequired,
    // onSaveClick: PropTypes.func.isRequired
};

// InputTimeSheet = withStyles(styles)(InputTimeSheet);
// export default connect(null, mapDispatchToProps)(InputTimeSheet);

export default withStyles(styles)(InputTimeSheet);