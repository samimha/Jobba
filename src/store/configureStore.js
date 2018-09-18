import {createStore, combineReducers} from "redux";
import cardsReducer from '../reducers/cards';
import filtersReducer from '../reducers/filters';

// Store creation
export default () => {
    const store = createStore(
        combineReducers({
            cards: cardsReducer,
            filters: filtersReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
};