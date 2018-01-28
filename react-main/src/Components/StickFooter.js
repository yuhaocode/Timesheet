import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: {
        backgroundColor: "#1976D2",
        textAlign: 'center',
        padding: "20px",
        flex: "0 0 auto",
    },
    copyright: {
        // marginBottom: 16,
        color: "white",
    },
});
function StickFooter(props) {
    const { classes } = props;
    return (
        <footer className={classes.root}>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={12}>
                    <Typography className={classes.copyright}>
                        Copyright © 2017.Authright All rights reserved.
                    </Typography>
                </Grid>
            </Grid>
        </footer>
    );
}

StickFooter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StickFooter);