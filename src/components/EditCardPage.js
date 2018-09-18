import React from 'react';
import { connect } from 'react-redux';
import CardForm from './CardForm';
import { editCard, removeCard } from '../actions/cards';


// EXPENSES TO CARDS !!!!
const EditCardPage = (props) => (
    <div>
        <CardForm
            card={props.card}
            onSubmit={(card) => {
                props.dispatch(editCard(props.card.id, card));
                props.history.push('/'); // redirects to dashboard/feed
            }}
        />
        <button onClick={() => {
            props.dispatch(removeCard({ id: props.card.id }));
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