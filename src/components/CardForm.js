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
import { Paper, Grid } from '@material-ui/core';


//Maps
import MapContainer from "./MapContainer";

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
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        maxHeight: 700,
        maxWidth: 700,
    }
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
                userId: this.props.auth.user.uid,
                userName: this.props.auth.user.displayName,
                userImg: this.props.auth.user.photoURL,
                userEmail: this.props.auth.user.email,
                userPhone: this.props.auth.user.phoneNumber,
                location: this.props.location.userLocation
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
                        placeholder="Title"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <TextField
                        className={classes.input}
                        placeholder="Reward"
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
                        placeholder="Description"
                        multiline
                        rowsMax="10"
                        value={this.state.multiline}
                        className={classes.input}
                        margin="normal"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    />
                    <div style={{height: 320}}>
                        <MapContainer />
                    </div>
                    <Button type="submit" variant="contained" color="secondary">Submit</Button>

                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        location: state.location
    };
};

CardForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(CardForm));