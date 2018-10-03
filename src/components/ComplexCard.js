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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardMap from "./CardMap";
import { Link } from 'react-router-dom';

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
        editable: !!this.props.editable,
        expanded: false,
        open: false,
        id: this.props.id
    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };

    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        const { open } = this.state;
        const date = new Date(this.props.createdAt);

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar src={this.props.userImg} className={classes.avatar}/>
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
                            <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        id="menu-list-grow"
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={this.handleClose}>
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
                        Reward: {this.props.amount/100}€
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    {this.state.editable ? (<Link to={`/edit/${this.props.id}`}><IconButton aria-label="Edit"><EditIcon /></IconButton></Link>) : null}
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
                        <div style={{ height: 200}}>
                            <CardMap location={this.props.location}/>
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