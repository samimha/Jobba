import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {addLocation } from "../actions/location";
const style = {
    maxWidth: 300,
    maxHeight: 300
}
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
        const coords = new Promise(function (resolve, reject) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    resolve(position.coords);
                });
            }
        });
        coords.then((response) => this.center(response));
    }
    mapClicked(mapProps, map, clickEvent) {
        this.setState({
            pos: {
                lat: clickEvent.latLng.lat(),
                lng: clickEvent.latLng.lng()
            }
        });
        this.props.addLocation({lat:clickEvent.latLng.lat(),lng:clickEvent.latLng.lng()});
    }
    center(coords) {
        this.setState({
            pos: {
                lat: coords.latitude,
                lng: coords.longitude
            }
        });
        this.props.addLocation({lat:coords.latitude,lng:coords.longitude});
    }
    shwoLocation() {
        try {
            console.log("try");
            console.log(this.props.location.userLocation.lat);
            return (
                <div style={{marginLeft: 322}}>
                    <p>{this.props.location.userLocation.lat}</p>
                    <p>{this.props.location.userLocation.lng}</p>
                </div>
            );
        } catch (error) {
            console.log("catch");
            return (
                <p>not found</p>
            )
        }
        
    }

    render() {
        return (
            <div>
                
                <Map google={this.props.google} zoom={14}
                    onClick={this.mapClicked}
                    initialCenter={{
                        lat: this.state.pos.lat,
                        lng: this.state.pos.lng
                    }}
                    center={{
                        lat: this.state.pos.lat,
                        lng: this.state.pos.lng
                    }}
                    style={style}>
                    <Marker
                        title={"Your Jobi's location"}
                        name={'You'}
                        position={{ lat: this.state.pos.lat, lng: this.state.pos.lng }} />
                </Map >
                {/* {this.shwoLocation()} */}
            </div>
        );
    }
}
function mapStateToPorps(state) {
    return {
        location: state.location
    }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        addLocation:addLocation
    },dispatch)
}
export default connect(mapStateToPorps,matchDispatchToProps)(GoogleApiWrapper({
    apiKey: ("AIzaSyCS127tGQ5A6fbsYxac4jFY-WwSCb8yiNk")
})(MapContainer))