import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import cardsReducer from '../reducers/cards';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';
import usersReducer from '../reducers/users';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store creation
export default () => {
    const store = createStore(
        combineReducers({
            cards: cardsReducer,
            filters: filtersReducer,
            auth: authReducer,
            users: usersReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};