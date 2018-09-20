import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './styles/styles.scss';
import getVisibleExpenses from './selectors/cards';
import { addCard } from './actions/cards'

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
            light: '#0066ff',
            main: '#0044ff',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
        // error: will use the default color
    },
});


store.dispatch(addCard({ description: 'Renkaiden vaihtoa', amount: 15.0, createdAt: 1537430361578, note: "Renkaiden vaihto on kivaa ja mukavaa puuhaa" }));
store.dispatch(addCard({ description: 'Sohvan kanto', amount: 20, createdAt: 1537420361578,note:"Tarttisin jeesiä punaisen sohvan kantamisessa kolmoskerrokseen" }));
store.dispatch(addCard({ description: 'Tietonaattorini putsaus', amount: 14, createdAt: 1527430161578, note:"Kotikoneeni on täynnä roskaa ja tarvitsisin jotain osaavaa henkilöä puhdistamaan sen, jotta näen taas iltasanomat internetseistä" }));

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

ReactDOM.render(jsx, document.getElementById('app'));