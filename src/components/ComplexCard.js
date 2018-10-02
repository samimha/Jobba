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
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardMap from "./CardMap";
import { Link } from 'react-router-dom';

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

    render() {
        const { classes } = this.props;
        const date = new Date(this.props.createdAt);
        console.log(date.toString());
        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar src={this.props.userImg} className={classes.avatar}/>
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
                        Reward: {this.props.amount/100}€
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
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
                        <div style={{ height: 200}}>
                            <CardMap location={this.props.location}/>
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