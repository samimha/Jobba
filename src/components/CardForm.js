import React from 'react';
import moment from 'moment';

import 'react-dates/initialize';
//import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    header: {
        marginTop: 14,
        marginLeft: 10,
        marginRight: 10,
    },
    textField: {
        marginLeft: 10,
        marginRight: 10,
        width: 200,
    },
});

class CardForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: props.card ? props.card.description : '',
            note: props.card ? props.card.note : '',
            amount: props.card ? (props.card.amount / 100).toString() : '',
            createdAt: props.card ? moment(props.card.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        };
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };

    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    };

    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }
    };

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };

    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({ error: 'Please provide description and amount.' }));
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
            console.log("submitted");
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Typography variant="display2" gutterBottom className={classes.header}>Add task announcement</Typography>
                {this.state.error && <p>{this.state.error}</p>}
                <form action="" onSubmit={this.onSubmit}>
                    <TextField
                        className={classes.textField}
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <TextField
                        className={classes.textField}
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <TextField
                        className={classes.textField}
                        id="date"
                        type="date"
                        defaultValue="2017-05-24"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                    />
                    <TextField
                        id="standard-multiline-flexible"
                        placeholder="Note"
                        multiline
                        rowsMax="10"
                        value={this.state.multiline}
                        className={classes.textField}
                        margin="normal"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    />
                    <Button variant="contained" color="secondary">Submit</Button>
                </form>
            </div>
        )
    }
}

CardForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardForm);