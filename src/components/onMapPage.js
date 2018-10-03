import React from 'react';
import { connect } from 'react-redux';
import  selectCards  from '../selectors/cards';
import Map from "./CardMap";
import CardListFilters from './CardListFilters';

class onMapPage extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <CardListFilters />
                <Map location={{lat:60.17167094859696, lng: 24.94027066898161}} cards={this.props.cards} height="100%" width="300%" />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        cards: selectCards(state.cards, state.filters)
    };
};

export default connect(mapStateToProps)(onMapPage);