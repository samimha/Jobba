import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pos: {
                lat: 60.17167094859696,
                lng: 24.94027066898161
            }
        }
        this.center = this.center.bind(this);
        this.mapClicked = this.mapClicked.bind(this);
    }
    componentDidMount() {
        const coords = new Promise(function (resolve, reject){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    resolve (position.coords);
                });
            }
        });
        coords.then((response)=>this.center(response));
    }
    mapClicked(mapProps, map, clickEvent) {
        console.log("lat " + clickEvent.latLng.lat());
        console.log("lng " + clickEvent.latLng.lng());
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
        return (
            <Map google={this.props.google} zoom={14}
                onClick={this.mapClicked}
                initialCenter={{
                    lat: 40.854885,
                    lng: -88.081807
                }}
                center={{
                    lat: this.state.pos.lat,
                    lng: this.state.pos.lng
                }}>
            </Map >
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyCS127tGQ5A6fbsYxac4jFY-WwSCb8yiNk")
})(MapContainer)