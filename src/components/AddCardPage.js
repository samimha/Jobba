import React from 'react';
import { connect } from 'react-redux';
import CardForm from './CardForm';
import { startAddCard } from '../actions/cards';

export class AddCardPage extends React.Component {
    onSubmit = (card) => {
        this.props.startAddCard(card);
        this.props.history.push('/'); // redirects to dashboard/feed
    };

    render() {
        return(
            <div>
                <h1>Add task announcement</h1>
                <CardForm
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    startAddCard: (card) => dispatch(startAddCard(card))
});

export default connect(undefined, mapDispatchToProps)(AddCardPage);