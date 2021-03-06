import React from 'react';
import { connect } from 'react-redux';
import ComplexCard from "./ComplexCard";
import selectCards from '../selectors/cards';
import Grid from "@material-ui/core/Grid";

const CardList = (props) => (
    <div>
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            {/* <h1>List of announcements</h1> */}
            {props.cards.map((card) => {
                return (
                    <Grid>
                        <ComplexCard key={card.id} {...card} />
                    </Grid>
                );
            })}
        </Grid>
    </div>
);

// this function is a higher order function
/* we pass the store called 'state' as parameter and return whatever information
 we want from the store.*/
const mapStateToProps = (state) => {
    // the needed key-value pairs are defined in this object will be connected
    // to the CardList props
    return {
        cards: selectCards(state.cards, state.filters)
    };
};

export default connect(mapStateToProps)(CardList);

