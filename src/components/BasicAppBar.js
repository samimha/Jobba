import React from "react";
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, withStyles } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";

class BasicAppBar extends React.Component {
    render() {
        return (
            <AppBar position="static">
                <Toolbar >
                    <Typography variant="title" color="inherit" noWrap>
                        Jobba
            </Typography>
                </Toolbar>
            </AppBar>
        )
    }

};
export default (BasicAppBar);