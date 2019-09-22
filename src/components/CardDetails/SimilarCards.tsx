import React from 'react';

import { Card } from '../../models';
import {
    SimilarCardsHeader,
    SimilarCardOuter,
    SimilarCardInner,
    SimilarCardsList,
    SimilarCardContent,
    SimilarCardPlaceholder
} from './CardDetails.styles';
import { ListingCard } from '..';

const SimilarCards: React.FC<{ cards: Card[] | null }> = ({ cards }) => {
    const content = cards
        ? cards.map(card => (
            <SimilarCard key={card.id}>
                <ListingCard {...card} container={SimilarCardContent}/>
            </SimilarCard>
        ))
        : Array(3).fill(null).map((_, i) => (
            <SimilarCard key={i}>
                <SimilarCardPlaceholder style={{
                    animationDelay: `${i * 300}ms`
                }}/>
            </SimilarCard>
        ));

    return (
        <React.Fragment>
            <SimilarCardsHeader>Similar cards:</SimilarCardsHeader>
            <div>
                <SimilarCardsList>
                    {content}
                </SimilarCardsList>
            </div>
        </React.Fragment>
    );
}

const SimilarCard: React.FC = ({ children }) => (
    <SimilarCardOuter>
        <SimilarCardInner>
            <SimilarCardContent>
                {children}
            </SimilarCardContent>
        </SimilarCardInner>
    </SimilarCardOuter>
);

export default SimilarCards;
