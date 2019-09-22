import React from 'react';

import { Card } from '../../models';
import { ListingCard } from '../';
import { CardContainer, CardPlaceholder, List, Header, PhantomItem } from './MainList.styles';
import { cardBatchSize } from '../../config';

interface MainListProps {
    title: string;
    cards: Card[];
    isNextBatchPending: boolean;
    noMoreBatches: boolean;
}

const MainList: React.FC<MainListProps> = ({ cards, title, isNextBatchPending }) => (
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
            {
                isNextBatchPending && Array(cardBatchSize).fill(null).map((_, i) =>
                    <CardPlaceholder key={i}/>
                )
            }
            {
                // Ensure that cards at the bottom are always aligned to left,
                // even if the last row contains 1 or 2 cards. The maximum is 3 per row,
                // so inserting 2 phantom items is enough.
                Array(2).fill(null).map((_, i) =>
                    <PhantomItem key={i}/>
                )
            }
        </List>
    </React.Fragment>
);

export default MainList;
