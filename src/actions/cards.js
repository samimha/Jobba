import uuid from 'uuid';

// ADD_EXPENSE
export const addCard = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_CARD',
    card: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

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

