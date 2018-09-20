import React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from "./AppBar"
import Tabs from "./Tabs"
const Header = () => (
    <header>
        <AppBar></AppBar>
        <Tabs></Tabs>
    </header>
);

export default Header;