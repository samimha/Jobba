import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

//Material-UI
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from "@material-ui/core/Grid";
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
    card: {
        maxWidth: 400,
        minWidth:350,
        margin: 10,
    },
    input: {
        marginLeft: 10,
        marginRight: 10,
        width: 200,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }
});

const sortByFilters = [
    {
        value: "date",
        label: "Date"
    },
    {
        value: "amount",
        label: "Amount"
    }
];

class CardListFilters extends React.Component {
    state = {
        calendarFocused: null
    };

    getSortBy = () => {
        return this.props.filters.sortBy;
    };

    onSortChange = (sortBy) => {
        switch(sortBy) {
            case 'date':
                this.props.dispatch(sortByDate());
                break;
            case 'amount':
                this.props.dispatch(sortByAmount());
                break;
        }
    };

    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    };

    render() {
        const { classes } = this.props;
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <TextField
                    id="search-word"
                    label="Search word"
                    className={classes.textField}
                    margin="normal"
                    variant="filled"
                    onChange={(e) => {
                        this.props.dispatch(setTextFilter(e.target.value))
                    }}
                />
                <TextField
                    id="filled-select-sort-by"
                    select
                    label="Sort By"
                    className={classes.textField}
                    value={this.getSortBy()}
                    onChange={(e) => {this.onSortChange(e.target.value)}}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    margin="normal"
                    variant="filled"
                >
                    {sortByFilters.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>



        );
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};



CardListFilters.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(CardListFilters));