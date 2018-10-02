import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './styles/styles.scss';
import { startSetCards } from './actions/cards'
import { login, logout } from './actions/auth'
import { firebase } from './firebase/firebase';
import { startAddUser } from './actions/users';
import Spinner from "./components/Spinner";

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

const jsx = (
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <AppRouter />
        </MuiThemeProvider>
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<Spinner/>, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user))//.then(() => {
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/dashboard');
            }
        //}).then(() => {
            //add user
            store.dispatch(startAddUser(user));
       // });
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});