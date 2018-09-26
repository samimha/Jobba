import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import 'react-dates/initialize';
//import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';

//Material-UI
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
    input: {
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
                note: this.state.note,
                userId: this.props.auth.user.uid
            });
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
                        className={classes.input}
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <TextField
                        className={classes.input}
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />

                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                    /> 
                    {/* <TextField
                        className={classes.input}
                        id="date"
                        type="date"
                        defaultValue={new Date()}
                        date={this.state.createdAt}
                        onChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                    />  */}
                    <TextField
                        id="standard-multiline-flexible"
                        placeholder="Note"
                        multiline
                        rowsMax="10"
                        value={this.state.multiline}
                        className={classes.input}
                        margin="normal"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    />
                    <Button type="submit" variant="contained" color="secondary">Submit</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

CardForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(CardForm));