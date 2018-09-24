import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import AppBar from "./AppBar"
import Tabs from "./Tabs"

export const Header = () => (
    <header>
        <AppBar></AppBar>
        <Tabs></Tabs>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);