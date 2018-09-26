import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import { Grid } from '@material-ui/core';
import BasicAppBar from "./BasicAppBar";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 10 ,
    },
});
const theme = createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#03a9f4',
            // dark: will be calculated from palette.primary.main,
            contrastText: "#fff",
        },
        secondary: {
            main: '#ef5350',
            // dark: will be calculated from palette.secondary.main,
        },
        // error: will use the default color
    },
});

function CircularIndeterminate(props) {
    const { classes } = props;
    return (
        <div>
            <MuiThemeProvider theme={theme}>
                <BasicAppBar />
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <CircularProgress className={classes.progress} color="secondary" />
                    </Grid>
                </Grid>
            </MuiThemeProvider>
        </div>
    );
}

CircularIndeterminate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);