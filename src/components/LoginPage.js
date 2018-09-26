import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { startLogin } from '../actions/auth';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar } from '@material-ui/core';

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
    paper: {
        marginTop: 20,
        padding: theme.spacing.unit * 6,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
});
export const LoginPage = ({ startLogin, classes }) => (
    <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <Typography className={classes.title} variant="title" color="inherit" noWrap>
                    Jobba
                </Typography>
            </Toolbar>
        </AppBar>
        <Grid container
            direction="row"
            justify="center"
            alignItems="center">
            <Grid>
                <Paper className={classes.paper} elevation={1}>
                    <Typography variant="display2" gutterBottom >
                        Login
                    </Typography>
                    <Typography variant="subheading" gutterBottom>
                        Select your favourite login provider
                    </Typography>
                    <Button variant="contained" color="secondary" className={classes.button} onClick={startLogin}>Google login</Button>
                </Paper>
            </Grid>
        </Grid>


    </div>


);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});
LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default connect(undefined, mapDispatchToProps)(withStyles(styles)(LoginPage));