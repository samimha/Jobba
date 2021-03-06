import moment from 'moment';


// Get visible cards
export default (cards, { text, sortBy, startDate, endDate }) => {
    return cards.filter((card) => {
        const createdAtMoment = moment(card.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true ;
        const endDateMatch = startDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true ;
        const textMatch = card.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

export const selectUsersCards = (cards, { user } ) => {
    return cards.filter((card) => {
        const cardOwnerID = card.userId;
        return cardOwnerID === user.uid;
    });
};
