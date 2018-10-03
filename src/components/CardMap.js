import React from "react";
import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react';
import ComplexCard from "./ComplexCard";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// const style = {
//     maxWidth: this.props.width,
//     maxHeight: this.props.height
// }
const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});
export class CardMap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pos: {
                lat: this.props.lat,
                lng: this.props.lng
            },
            isCard: this.props.isCard,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {
                card: {
                    description: "",
                    amount: 0,
                    createdAt: "",
                    note: "",
                    userId: "",
                    userName: "",
                    userImg: "",
                    userEmail: "",
                    userPhone: "",
                    location: ""
                }
            },
            width: 200,
            height: 200,
        }

        this.center = this.center.bind(this);
    }
    onMarkerClick = (props, marker, e) => {
        if (!this.state.isCard) {
            this.setState({
                selectedPlace: props,
                activeMarker: marker,
                showingInfoWindow: true,
                // pos : this.state.selectedPlace.card.location,
            });
        }
    }

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null,
                pos: this.state.selectedPlace.card.location,
            })
        }
    };
    componentDidMount() {
        if (!this.state.isCard) {
            const coords = new Promise(function (resolve, reject) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        resolve(position.coords);
                    });
                }
            });
            coords.then((response) => this.center(response));
            this.setState({
                width: window.innerWidth,
                height: 500,
            });
        }
    }
    center(coords) {
        this.setState({
            pos: {
                lat: coords.latitude,
                lng: coords.longitude
            }
        });
    }
    render() {
        const { classes } = this.props;
        return (
            <Map
                google={this.props.google}
                style={{
                    width: this.state.width,
                    height: this.state.height,
                }}
                initialCenter={{
                    lat: this.state.pos.lat,
                    lng: this.state.pos.lng
                }}
                center={{
                    lat: this.state.pos.lat,
                    lng: this.state.pos.lng
                }}
                zoom={13}
                onClick={this.onMapClicked}
            >
                {this.props.cards.map((card) => {
                    return (
                        <Marker
                            onClick={this.onMarkerClick}
                            title={"Jobi's location"}
                            name={card.description}
                            card={card}
                            position={{ lat: card.location.lat, lng: card.location.lng }}
                        />
                    );
                })}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div style={{ maxWidth: 200 }}>
                        <h1>{this.state.selectedPlace.card.description}</h1>
                        <p>{this.state.selectedPlace.card.note}</p>
                        <img style={{ width: 20, height: 20, borderRadius: 10 }} src={this.state.selectedPlace.card.userImg}></img>
                        <p>{this.state.selectedPlace.card.userName}</p>
                        <Button color="primary" variant="contained" href={"tel:" + this.state.selectedPlace.card.userPhone} className={classes.button}>Call</Button>
                        <Button color="primary" variant="contained" href={"mailto:" + this.state.selectedPlace.card.userEmail + "?Subject=Offering help to " + this.state.selectedPlace.card.description} className={classes.button}>Email</Button>

                        {/* <ComplexCard key={this.state.selectedPlace.card.id} {...this.state.selectedPlace.card} /> */}
                    </div>

                </InfoWindow>
            </Map>
        )
    }
}
CardMap.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GoogleApiWrapper({
    apiKey: ("AIzaSyCS127tGQ5A6fbsYxac4jFY-WwSCb8yiNk")
})(CardMap));

