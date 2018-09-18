import React from 'react';
import CardList from './CardList';
import CardListFilters from './CardListFilters';


const JobbaDashboardPage = () => (
    <div>
        <CardListFilters/>
        <CardList/>
    </div>
);

export default JobbaDashboardPage;