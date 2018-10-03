import React from 'react';
import { connect } from 'react-redux';
import ComplexCard from "./ComplexCard";
import { selectUsersCards } from '../selectors/cards';
import Grid from "@material-ui/core/Grid";

const CardList = (props) => (
    <div>
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >{console.log(props.cards)}
            {props.cards.map((card) => {
                return (
                    <Grid>
                        <ComplexCard editable={true} key={card.id} {...card} />
                    </Grid>
                );
            })}
        </Grid>
    </div>
);

const mapStateToProps = (state) => {
    return {
        cards: selectUsersCards(state.cards, state.auth)
    };
};

export default connect(mapStateToProps)(CardList);