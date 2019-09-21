import React from 'react';

import { Card } from '../../models';
import { ListingCard } from '../';
import { List } from './MainList.styles';

interface MainListProps {
    cards: Card[];
}

const MainList: React.FC<MainListProps> = ({ cards }) => (
    <List>
        {cards.map(card => <ListingCard
            key={card.id}
            {...card}
        />)}
    </List>
);

export default MainList;
