import React from 'react';

import { Card } from '../../models';
import { ListingCard } from '../';
import { CardContainer, List, Header } from './MainList.styles';

interface MainListProps {
    title: string;
    cards: Card[];
}

const MainList: React.FC<MainListProps> = ({ cards, title }) => (
    <React.Fragment>
        <Header>{title}</Header>
        <List>
            {cards.map(card =>
                <ListingCard
                    key={card.id}
                    container={CardContainer}
                    {...card}
                />
            )}
        </List>
    </React.Fragment>
);

export default MainList;
