import { createSelector } from 'reselect';
import { State } from '../state';

export const getCardListIDs = (state: State) => state.cardListIDs;

export const getCards = (state: State) => state.cards;

export const getErrorMessage = (state: State) => state.errorMessage;

export const getPendingRequests = (state: State) => state.pendingRequests;

export const getSelectedCardID = (state: State) => state.selectedCardID;

export const getSimilarCardIDs = (state: State) => state.similarCardIDs;

export const getFinalBatchRetrieved = (state: State) => state.finalBatchRetrieved;

export const getIsSelectedCardPending = createSelector(
    [ getPendingRequests ],
    pendingRequests => pendingRequests.selectedCard
);

export const getIsCardListPending = createSelector(
    [ getPendingRequests ],
    pendingRequests => pendingRequests.cardList
);

export const getAreSimilarCardsPending = createSelector(
    [ getPendingRequests ],
    pendingRequests => pendingRequests.similarCards
);

export const getCardListCount = createSelector(
    [ getCardListIDs ],
    (cardListIDs) => cardListIDs.length
);

export const getNextBatchIndex = (batchSize: number) => createSelector(
    [ getCardListCount ],
    (cardListCount) => Math.ceil(cardListCount / batchSize)
);

export const getCardList = createSelector(
    [ getCardListIDs, getCards ],
    (cardIDs, cards) => cardIDs.map(id => cards[id])
);

export const getSelectedCard = createSelector(
    [ getSelectedCardID, getCards ],
    (selectedCardID, cards) =>
        selectedCardID && cards[selectedCardID]
            ? cards[selectedCardID]
            : null
);

export const getSimilarCards = createSelector(
    [ getSelectedCardID, getSimilarCardIDs, getCards ],
    (seletedCardID, similarCardIDs, cards) =>
        seletedCardID && similarCardIDs[seletedCardID]
            ? similarCardIDs[seletedCardID].map(id => cards[id])
            : null
);
