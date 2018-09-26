import React from 'react';
import { connect } from 'react-redux';
import CardForm from './CardForm';
import { startEditCard, startRemoveCard } from '../actions/cards';

const EditCardPage = (props) => (
    <div>
        <CardForm
            card={props.card}
            onSubmit={(card) => {
                props.dispatch(startEditCard(props.card.id, card));
                props.history.push('/'); // redirects to dashboard/feed
            }}
        />
        <button onClick={() => {
            props.dispatch(startRemoveCard({ id: props.card.id }));
            props.history.push('/'); // redirects to dashboard/feed
        }}>Remove</button>
    </div>
);

const mapStateToProps = (state, props) => {
    return {
        card: state.cards.find((card) => {
            return card.id === props.match.params.id;
        })
    };
};

export default connect(mapStateToProps)(EditCardPage);