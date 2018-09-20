import React from 'react';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import AddExpensePage from '../components/AddCardPage';
import ExpenseDashboardPage from '../components/JobbaDashboardPage';
import EditExpensePage from '../components/EditCardPage';
import Header from '../components/Header';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';


class AppRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" component={ExpenseDashboardPage} exact={true} />
                        <Route path="/create" component={AddExpensePage} />
                        <Route path="/edit/:id" component={EditExpensePage} />
                        <Route path="/help" component={HelpPage} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
};

export default AppRouter;