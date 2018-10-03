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
import PublicRoute from './PublicRoute';
import MyTasksPage from "../components/MyTasksPage";
import onMapPage from "../components/onMapPage";

export const history = createHistory();


class AppRouter extends React.Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Switch>
                        <PublicRoute path="/" component={LoginPage} exact={true}/>
                        <PrivateRoute path="/dashboard" component={JobbaDashboardPage}/>
                        <PrivateRoute path="/create" component={AddCardPage}/>
                        <PrivateRoute path="/edit/:id" component={EditCardPage}/>
                        <PrivateRoute path="/tasks" component={MyTasksPage}/>
                        <PrivateRoute path="/map" component={onMapPage}/>
                        {/*<Route path="/help" component={HelpPage}/>*/}
                        <Route component={NotFoundPage}/>
                    </Switch>
                </div>
            </Router>
        );
    };

};

export default AppRouter;