import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_EXPENSE
export const addCard = (card) => ({
    type: 'ADD_CARD',
    card
});

export const startAddCard = (cardData = {}) =>  {
    return (dispatch) => {
        const  {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = cardData;
        const card = { description, note, amount, createdAt };

        database.ref('cards').push(card).then((ref) => {
            console.log(card);
            dispatch(addCard({
                id: ref.key,
                ...card
            }));
        }).catch((e) => {
            console.log('Error ocurred.', e);
        });
    };
};


// REMOVE_EXPENSE
export const removeCard = ({ id } = {}) => ({
    type: 'REMOVE_CARD',
    id
});

// EDIT_EXPENSE
export const editCard = (id, updates) => ({
    type: 'EDIT_CARD',
    id,
    updates
});

// SET_CARDS
export const setCards = (cards) => ({
    type: 'SET_CARDS',
    cards
});

export const startSetCards = () => {
    return (dispatch) => {
        return database.ref('cards')
            .once('value')
            .then((snapshot) => {
                const cards = [];

                snapshot.forEach((childSnapshot) => {
                    cards.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });

                dispatch(setCards(cards));
            }).catch((e) => {
            console.log('Error ocurred while fetching cards for the first time.', e);
        });

    }
};