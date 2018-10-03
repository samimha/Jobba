import React from 'react';
import CardList from './CardList';
import CardListFilters from './CardListFilters';
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class JobbaDashboardPage extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <CardListFilters />
                <CardList />
            </div>
        )
    }

};
JobbaDashboardPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(JobbaDashboardPage);