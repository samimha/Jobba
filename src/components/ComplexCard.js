import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
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
        super(props)
    }
    state = {
        open: false,
        editable: !!this.props.editable,
        expanded: false,
        anchorEl: null
    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleEmail = () => {
        window.location.href = "mailto:"+this.props.userEmail+"?Subject=Offering help to " + this.props.description;
        this.setState({ open: false });
    };
    handleCall = () => {
        window.location.href = "tel:"+this.props.userPhone;
        this.setState({ open: false });
    };

    render() {
        const { classes, fullScreen } = this.props;
        const date = new Date(this.props.createdAt);
        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar src={this.props.userImg} className={classes.avatar} />
                    }
                    action={
                        <IconButton
                            aria-label="More"
                            aria-owns={open ? 'long-menu' : null}
                            aria-haspopup="true"
                            onClick={this.handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
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
                    <Tooltip title="Contact user" placement="right">
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
                            ></CardHeader>
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
                    <IconButton aria-label="Add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    {this.state.editable ? (<Link to={`/edit/${this.props.id}`}><IconButton aria-label="Edit"><ShareIcon /></IconButton></Link>) : null}
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

RecipeReviewCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);