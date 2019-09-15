import { createSelector } from 'reselect';
import { State } from './state';

export const getCardListIDs = (state: State) => state.cardListIDs;

export const getCards = (state: State) => state.cards;

export const getCardListCount = createSelector(
    [ getCardListIDs ],
    (cardListIDs) => cardListIDs.length
);

export const getNextBatchIndex = (batchSize: number) => createSelector(
    [getCardListCount],
    (cardListCount) => Math.ceil(cardListCount / batchSize)
);

export const getCardList = createSelector(
    [getCardListIDs, getCards],
    (cardIDs, cards) => cardIDs.map(id => cards[id])
);
