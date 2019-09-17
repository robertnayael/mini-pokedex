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
