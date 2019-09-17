import { throwError, of, Subscription } from 'rxjs';

import { fetchCardBatch } from './';
import { MockFetcher } from '../testUtils';

describe('`fetchCardBatch()`', () => {

    let subscription: Subscription;

    beforeEach(() => {
        subscription && subscription.unsubscribe();
    });

    it('sends request to correct endpoint', () => {
        const { fetcher, getRequestedUrl } = new MockFetcher(
            { cards: [] },
            { totalCards: '42' }
        );

        subscription = fetchCardBatch(12, 3, fetcher).subscribe();
        const expectedUrl = 'https://api.pokemontcg.io/v1/cards?pageSize=12&page=4';
        const requestedUrl = getRequestedUrl();

        expect(requestedUrl).toBe(expectedUrl);
    });

    it('retrieves `totalCards` from response headers', () => {
        let retrievedTotalCards;

        const { fetcher } = new MockFetcher(
            { cards: [] },
            { totalCards: '42' }
        );

        subscription = fetchCardBatch(10, 1, fetcher)
            .subscribe(({ totalCards }) => retrievedTotalCards = totalCards)

        expect(retrievedTotalCards).toBe(42);
    });

    it('throws on invalid response', () => {
        let errorOccurred = false;
        const { fetcher } = new MockFetcher(
            null,
            { totalCards: '42' }
        );

        subscription = fetchCardBatch(10, 1, fetcher)
            .subscribe({ error: () => errorOccurred = true });

        expect(errorOccurred).toBe(true);
    });

    it('emits transformed collection of cards', () => {
        let retrievedCards;

        const rawCards = [
            { name: 'Pikachu', unnecessaryProp: 'whatever' },
            { name: 'Squirtle', unnecessaryProp: 'whatever' },
        ];

        const expectedCards = [
            { name: 'Pikachu' },
            { name: 'Squirtle' },
        ];

        const { fetcher } = new MockFetcher(
            { cards: rawCards },
            { totalCards: '42' }
        );

        subscription = fetchCardBatch(10, 1, fetcher)
            .subscribe(({ cards }) => retrievedCards = cards)

        expect(retrievedCards).toEqual(expectedCards);
    });

});
