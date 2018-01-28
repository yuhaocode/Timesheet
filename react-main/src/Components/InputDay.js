import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const styles = ({
    card: {
        minWidth: 102,
        // maxWidth:100,
        padding: 0,
        // marginBottom: 10,
        borderRadius: 0,
        // border: "1px solid rgba(158,158,158, 1)",
        // boxShadow: '0px 0px 1px 1px rgba(158,158,158, 1)',
        boxShadow: '0px 0px 0px 0px rgba(158,158,158, 1)',
        // backgroundColor: "rgba(255,255,255,0,9)", //"rgb(33, 150, 243)",
        '&:hover': {
            boxShadow: '2px 3px 5px 0px rgba(158,158,158, 1)',
            // boxShadow: '0px 3px 5px 3px rgba(158,158,158, 1)',
            background: "linear-gradient(rgba(33, 150, 243, 0.60), rgba(33, 150, 243, 0.0))",
        },
        flexGrow: 1,
    },
    headline: {
        // color: "white",  //theme.palette.common.white
        // margin: 'auto',
        fontSize: "85%",
    },
    overrideButton: {
        margin: 'auto',
    },
    flexItem: {
        flexGrow: 1,
    },
});

class InputDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // weekday: props.weekDay,
            hours: parseInt(props.hours),
            addHours: "",
            hideInput: false
        };
        this.onClickAdd = this.onClickAdd.bind(this);

    }

    componentWillMount() {
        if (this.props.hideInput === true) {
            this.setState({
                hideInput: true
            })
        }
    }

    onClickAdd() {
        this.props.onHoursChange(this.props.weekDay, this.state.hours + this.state.addHours);
        this.setState({
            hours: this.state.hours + this.state.addHours,
            addHours: "",
        });

    }

    onChangeHours(event) {
        this.setState({
            addHours: parseInt(event.target.value)
        });
    }

    render() {
        return (
            // <div className={this.props.classes.flexItem}>
                <Card className={this.props.classes.card}>
                    <CardContent>
                        <Typography align="center" className={this.props.classes.headline}>
                            {this.props.weekDay}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography align="center" className={this.props.classes.headline}>
                            {this.state.hours}
                        </Typography>
                    </CardContent>
                    {this.state.hideInput === false &&
                        <div>
                            <CardContent>
                                <form noValidate autoComplete="off" disabled={this.state.hideInput}>
                                    <TextField
                                        label="Hours"
                                        placeholder="Hours"
                                        className={this.props.classes.textField}
                                        margin="normal"
                                        onChange={(event) => this.onChangeHours(event)}
                                        type="number"
                                        value={this.state.addHours}
                                    />
                                </form>
                            </CardContent>
                            <CardActions>
                                <Button color="primary" className={this.props.classes.overrideButton} onClick={this.onClickAdd.bind(this)}>
                                    Add
                            </Button>
                            </CardActions>
                        </div>}
                </Card>
            // </div>
        );
    }
}

InputDay.propTypes = {
    classes: PropTypes.object.isRequired,
    // hours: React.PropTypes.number,
    // addHours: React.PropTypes.number
};

export default withStyles(styles)(InputDay);
