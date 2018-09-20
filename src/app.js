import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './styles/styles.scss';
import getVisibleExpenses from './selectors/cards';
import { startSetCards } from './actions/cards'

import './firebase/firebase';

const store = configureStore();
const theme = createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#03a9f4',
            // dark: will be calculated from palette.primary.main,
            contrastText: "#fff",
        },
        secondary: {
            main: '#ef5350',
            // dark: will be calculated from palette.secondary.main,
        },
        // error: will use the default color
    },
});

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.cards, state.filters);
console.log(visibleExpenses);

const jsx = (
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <AppRouter />
        </MuiThemeProvider>
    </Provider>

);

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

store.dispatch(startSetCards()).then(() => {
    ReactDOM.render(jsx, document.getElementById('app'));
});
