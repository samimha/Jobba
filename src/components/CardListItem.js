import React from 'react';
import { Link } from 'react-router-dom';


const CardListItem = ({ description, amount, createdAt, id }) => {
    return (
        <div>
            <Link to={`/edit/${id}`}>
                {description}
            </Link>
                {amount} - {createdAt}
        </div>
    );
};

export default CardListItem;