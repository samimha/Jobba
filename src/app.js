import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

import './styles/styles.scss';
import getVisibleExpenses from './selectors/cards';
import { startSetCards } from './actions/cards'

import './firebase/firebase';

const store = configureStore();

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.cards, state.filters);
console.log(visibleExpenses);

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>

);

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

store.dispatch(startSetCards()).then(() => {
    ReactDOM.render(jsx, document.getElementById('app'));
});
