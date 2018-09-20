import React from 'react';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import AddCardPage from '../components/AddCardPage';
import JobbaDashboardPage from '../components/JobbaDashboardPage';
import EditCardPage from '../components/EditCardPage';
import Header from '../components/Header';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from "../components/LoginPage";


const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header/>
            <Switch>
                <Route path="/" component={LoginPage} exact={true}/>
                <Route path="/dashboard" component={JobbaDashboardPage}/>
                <Route path="/create" component={AddCardPage}/>
                <Route path="/edit/:id" component={EditCardPage}/>
                <Route path="/help" component={HelpPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;