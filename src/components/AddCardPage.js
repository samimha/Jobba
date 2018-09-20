import React from 'react';
import { connect } from 'react-redux';
import CardForm from './CardForm';
import { addCard } from '../actions/cards';

const AddCardPage = (props) => (
    <div>
        <CardForm
            onSubmit={(card) => {
                props.dispatch(addCard(card));
                props.history.push('/'); // redirects to dashboard/feed
            }}
        />
    </div>
);

export default connect()(AddCardPage);