import { createStandardAction } from 'typesafe-actions';
import { Card } from '../../models';

export const requestCardBatch = createStandardAction('REQUEST_CARD_BATCH')();

export const requestCardBatchSuccess = createStandardAction('REQUEST_CARD_BATCH_SUCCESS').map(
    ({ cards, totalCards }: { cards: Card[]; totalCards: number; }) => ({
        payload: {
            cards,
            totalCards
        }
    })
);

export const requestCardBatchFailure = createStandardAction('REQUEST_CARD_BATCH_FAILURE').map(
    (errorMessage: string) => ({
        payload: errorMessage
    })
);

export const lastCardBatchRetrieved = createStandardAction('LAST_CARD_BATCH_RETRIEVED')();

export const openCardDetails = createStandardAction('OPEN_CARD_DETAILS').map(
    (cardId: string) => ({
        payload: cardId
    })
);

export const closeCardDetails = createStandardAction('CLOSE_CARD_DETAILS')();

export const fetchCardDetailsSuccess = createStandardAction('FETCH_CARD_DETAILS_SUCCESS').map(
    (card: Card) => ({
        payload: card
    })
);

export const fetchCardDetailsFailure = createStandardAction('FETCH_CARD_DETAILS_FAILURE').map(
    (errorMessage: string) => ({
        payload: errorMessage
    })
);

export const fetchSimilarCards = createStandardAction('FETCH_SIMILAR_CARDS').map(
    (card: Card) => ({
        payload: card
    })
);

export const fetchSimilarCardsSuccess = createStandardAction('FETCH_SIMILAR_CARDS_SUCCESS').map(
    ({ card, similarCards }: { card: Card, similarCards: Card[] }) => ({
        payload: {
            card,
            similarCards
        }
    })
);

export const fetchSimilarCardsFailure = createStandardAction('FETCH_SIMILAR_CARDS_FAILURE').map(
    (errorMessage: string) => ({
        payload: errorMessage
    })
);
