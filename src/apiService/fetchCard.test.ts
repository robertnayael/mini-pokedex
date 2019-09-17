import { Subscription } from 'rxjs';

import { fetchCard } from './fetchCard';
import { MockFetcher, getEmptyCard } from '../mocks';

describe('`fetchCardBatch()`', () => {

    let subscription: Subscription;

    beforeEach(() => {
        subscription && subscription.unsubscribe();
    });

    it('sends request to correct endpoint', () => {
        const { fetcher, getRequestedUrl } = new MockFetcher('some response');

        subscription = fetchCard('🙈🙉🙊', fetcher).subscribe();
        const expectedUrl = 'https://api.pokemontcg.io/v1/cards/🙈🙉🙊';
        const requestedUrl = getRequestedUrl();

        expect(requestedUrl).toBe(expectedUrl);
    });

    it('throws on invalid response', () => {
        let errorOccurred = false;
        const { fetcher } = new MockFetcher('not a valid response at all');

        subscription = fetchCard('🙈🙉🙊', fetcher)
            .subscribe({ error: () => errorOccurred = true });

        expect(errorOccurred).toBe(true);
    });

    it('emits transformed card', () => {
        let retrievedCard;

        const expectedCard = {
            ...getEmptyCard(),
            id: '🐶'
        };

        const rawCard = {
            ...expectedCard,
            someUnnecessaryProp: 'some data'
        };

        const { fetcher } = new MockFetcher({ card: rawCard });

        subscription = fetchCard('', fetcher)
            .subscribe(card => retrievedCard = card)

        expect(retrievedCard).toEqual(expectedCard);
    });

});
