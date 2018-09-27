import React from "react";
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

const style = {
    maxWidth: 200,
    maxHeight: 200
}
export class CardMap extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Map
                    google={this.props.google}
                    style={style}
                    initialCenter={{
                        lat: this.props.location.lat,
                        lng: this.props.location.lng
                    }}
                    zoom={14}
                    onClick={this.onMapClicked}
                >
                    <Marker
                        title={"Jobi's location"}
                        name={'Location'}
                        position={{ lat: this.props.location.lat, lng: this.props.location.lng }} />
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyCS127tGQ5A6fbsYxac4jFY-WwSCb8yiNk")
})(CardMap)

