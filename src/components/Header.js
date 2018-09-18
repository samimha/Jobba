import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
        <h1>Jobba</h1>
        <NavLink to="/" activeClassName="is-active" exact={true}>Home Page</NavLink>
        <NavLink to="/create" activeClassName="is-active">Add Task</NavLink>
        <NavLink to="/help" activeClassName="is-active">Help</NavLink>
    </header>
);

export default Header;