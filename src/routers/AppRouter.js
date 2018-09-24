import React from 'react';
import { Router, Route, Switch, } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import AddCardPage from '../components/AddCardPage';
import JobbaDashboardPage from '../components/JobbaDashboardPage';
import EditCardPage from '../components/EditCardPage';

import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from "../components/LoginPage";
import PrivateRoute from './PrivateRoute';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route path="/" component={LoginPage} exact={true}/>
                <PrivateRoute path="/dashboard" component={JobbaDashboardPage}/>
                <PrivateRoute path="/create" component={AddCardPage}/>
                <PrivateRoute path="/edit/:id" component={EditCardPage}/>
                <Route path="/help" component={HelpPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </Router>
);

export default AppRouter;