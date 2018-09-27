const usersReducerDefaultState = [];

export default (state = usersReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return [
                ...state,
                action.user
            ];
        case 'REMOVE_USER':
            return state.filter(({ id }) => id !== action.id);
        default:
            return state;
    }
};

