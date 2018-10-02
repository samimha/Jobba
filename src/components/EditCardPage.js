import React from 'react';
import { connect } from 'react-redux';
import CardForm from './CardForm';
import { startEditCard, startRemoveCard } from '../actions/cards';

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

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

class EditCardPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Paper className={classes.paper}>
                        <CardForm
                            editing={true}
                            card={this.props.card}
                            onSubmit={(card) => {
                                this.props.dispatch(startEditCard(this.props.card.id, card));
                                this.props.history.push('/'); // redirects to dashboard/feed
                            }}
                        />
                    </Paper>
                </Grid>
                {/*<button onClick={() => {
                 props.dispatch(startRemoveCard({ id: props.card.id }));
                 props.history.push('/'); // redirects to dashboard/feed
                 }}>Remove</button>*/}
            </div>
        );
    }
}
const mapStateToProps = (state, props) => {
    return {
        card: state.cards.find((card) => {
            return card.id === props.match.params.id;
        })
    };
};

EditCardPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(EditCardPage));