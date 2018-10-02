import React from 'react';
import { connect } from 'react-redux';
import CardForm from './CardForm';
import { startAddCard } from '../actions/cards';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginTop: 14,
        marginLeft: 10,
        marginRight: 10,
        maxHeight: 700,
        maxWidth: 700
    }
});

export class AddCardPage extends React.Component {
    onSubmit = (card) => {
        this.props.startAddCard(card);
        this.props.history.push('/'); // redirects to dashboard/feed
    };

    render() {
        const { classes } = this.props;

        return(
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Paper className={classes.paper}>
                    <CardForm onSubmit={this.onSubmit}/>
                </Paper>
            </Grid>
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    startAddCard: (card) => dispatch(startAddCard(card))
});

AddCardPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(undefined, mapDispatchToProps)(withStyles(styles)(AddCardPage));