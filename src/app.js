import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

import './styles/styles.scss';
import getVisibleExpenses from './selectors/cards';
import { startAddCard } from './actions/cards'

import './firebase/firebase';

const store = configureStore();

store.dispatch(startAddCard({ description: 'Water bill', amount: 150, createdAt: 4500 }));
store.dispatch(startAddCard({ description: 'Gas bill', amount: 80, createdAt: 1000 }));
store.dispatch(startAddCard({ description: 'Rent', amount: 1420, createdAt: 109 }));

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.cards, state.filters);
console.log(visibleExpenses);

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>

);

ReactDOM.render(jsx, document.getElementById('app'));