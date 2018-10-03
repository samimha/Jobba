import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';

import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import MessageIcon from '@material-ui/icons/Message';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardMap from "./CardMap";
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import { connect } from 'react-redux';
import { startRemoveCard } from '../actions/cards';

const styles = theme => ({
    card: {
        width: 300,
        margin: 10,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});

class RecipeReviewCard extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        open: false,
        editable: !!this.props.editable,
        expanded: false,
        openMenu: false,
        id: this.props.id
    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    handleToggle = () => {
        this.setState(state => ({ openMenu: !state.open }));
    };

    handleMenuClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ openMenu: false });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleEmail = () => {
        window.location.href = "mailto:" + this.props.userEmail + "?Subject=Offering help to " + this.props.description;
        this.setState({ open: false });
    };
    handleCall = () => {
        window.location.href = "tel:" + this.props.userPhone;
        this.setState({ open: false });
    };

    render() {
        const { classes, fullScreen } = this.props;
        const { open, openMenu } = this.state;
        const date = new Date(this.props.createdAt);

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar src={this.props.userImg} className={classes.avatar} />
                    }
                    action={
                        <div>
                            <IconButton
                                aria-label="More"
                                buttonRef={node => {
                                    this.anchorEl = node;
                                }}
                                aria-owns={open ? 'menu-list-grow' : null}
                                aria-haspopup="true"
                                onClick={this.handleToggle}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Popper open={openMenu} anchorEl={this.anchorEl} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        id="menu-list-grow"
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={this.handleMenuClose}>
                                                <MenuList>
                                                    {this.state.editable ? (
                                                        <MenuItem onClick={() => {
                                                            this.props.dispatch(startRemoveCard({ id: this.props.id }));
                                                        }}>Delete</MenuItem>
                                                    ) :null}
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </div>
                    }
                    title={this.props.userName}
                    subheader={date.toLocaleDateString()}
                />
                <CardContent>
                    <Typography>
                        {this.props.description}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography component="p">
                        Reward: {this.props.amount / 100}€
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    {this.state.editable ? (
                        <Link to={`/edit/${this.props.id}`}>
                            <IconButton aria-label="Edit">
                                <EditIcon />
                            </IconButton>
                        </Link>
                    ) : (
                        <div><Tooltip title="Contact user" placement="right">
                            <IconButton aria-label="Add to favorites" onClick={this.handleClickOpen}>
                                <MessageIcon />
                            </IconButton>
                        </Tooltip>
                            <Dialog
                                fullScreen={fullScreen}
                                open={this.state.open}
                                onClose={this.handleClose}
                                aria-labelledby="responsive-dialog-title"
                            >
                                <DialogTitle id="responsive-dialog-title">{"Contact information"}</DialogTitle>
                                <DialogContent>
                                    <CardHeader avatar={
                                        <Avatar src={this.props.userImg} className={classes.avatar} />
                                    }
                                                title={this.props.userName}
                                    />
                                    <DialogContentText>
                                        {this.props.userPhone}
                                    </DialogContentText>
                                    <DialogContentText>
                                        {this.props.userEmail}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleCall} color="primary">
                                        Call
                                    </Button>
                                    <Button onClick={this.handleEmail} color="primary" autoFocus>
                                        Email
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>)}
                    <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph variant="body2">
                            {this.props.note}
                        </Typography>
                        <div style={{ height: 200 }}>
                            <CardMap location={this.props.location} />
                        </div>
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        expense: state.cards.find((card) => {
            return card.id === props.id;
        })
    };
};

RecipeReviewCard.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps)(withStyles(styles)(RecipeReviewCard));