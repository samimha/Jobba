import {createStore, combineReducers, applyMiddleware, compose } from "redux";
import cardsReducer from '../reducers/cards';
import filtersReducer from '../reducers/filters';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store creation
export default () => {
    const store = createStore(
        combineReducers({
            cards: cardsReducer,
            filters: filtersReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};