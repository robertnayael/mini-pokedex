import { Observable, Subscription } from 'rxjs';
import xhrMock, { MockRequest, MockResponse } from 'xhr-mock';

import { fetchJson } from './';

/**
 * Makes sure the microtask queue is empty. Wihout flushing it,
 * the mock responses don't kick off until  after the tests.
 */
const microtaskQueue = async () => await Promise.resolve();

describe('`fetchJson()` utility', () => {

    let subscription: Subscription | null;

    beforeEach(() => {
        subscription && subscription.unsubscribe();
        subscription = null;
        xhrMock.setup();
    });

    afterEach(() => {
        xhrMock.teardown();
    });

    it('returns observable', () => {
        const result = fetchJson('some-url', () => {});
        expect(result).toBeInstanceOf(Observable);
    });

    it('does not send request until subscribed to', async () => {
        let requestSent = false;

        xhrMock.get('some-url', (_, response) => {
            requestSent = true;
            return response;
        });
        fetchJson('some-url', () => {});

        await microtaskQueue();

        expect(requestSent).toBe(false);
    });

    it('sends request on subscription', async () => {
        let requestSent = false;

        xhrMock.get('some-url', (_, response) => {
            requestSent = true;
            return response;
        });
        subscription = fetchJson('some-url', () => {}).subscribe();

        await microtaskQueue();

        expect(requestSent).toBe(true);
    });

    it('throws on http error', async () => {
        let errorOccurred = false;
        xhrMock.get('some-url', (_, response) =>
            response
                .body({})
                .status(404)
        );

        subscription = fetchJson('some-url', () => {})
            .subscribe({
                error: () => errorOccurred = true
            });

        await microtaskQueue();

        expect(errorOccurred).toBe(true);
    });

    it('throws on non-JSON response', async () => {
        let errorOccurred = false;
        xhrMock.get('some-url', (_, response) =>
            response
                .body('definitely not a JSON response')
                .status(200)
        );

        subscription = fetchJson('some-url', () => {})
            .subscribe({
                error: () => errorOccurred = true
            });

        await microtaskQueue();

        expect(errorOccurred).toBe(true);
    });

    it('completes stream after receiving response', async () => {
        let completed = false;
        xhrMock.get('some-url', (_, response) =>
            response
                .body({})
                .status(200)
        );

        subscription = fetchJson('some-url', () => {})
            .subscribe({
                complete: () => completed = true
            });

        await microtaskQueue();

        expect(completed).toBe(true);
    });

    it('emits response headers', async () => {
        const headersSent = {
            header1: 'value1',
            header2: 'value2',
        };
        let headersReceived = {};

        xhrMock.get('some-url', (_, response) =>
            response
                .body({})
                .status(200)
                .headers(headersSent)
        );

        subscription = fetchJson('some-url', () => {})
            .subscribe(
                ({ headers }) => { headersReceived = headers }
            );

        await microtaskQueue();

        expect(headersSent).toEqual(headersReceived);
    });

    it('emits transformed response', async () => {
        let receivedData: any;

        const originalData = {
            pokemons: [
                { name: 'pikachu' },
                { name: 'squirtle' },
            ]
        };

        const transformerFn = (input: typeof originalData) =>
            input.pokemons.map(({ name }) => ({ name: name.toUpperCase() }));
        
        const transformedData = transformerFn(originalData);

        xhrMock.get('some-url', (_, response) =>
        response
            .body(originalData)
            .status(200)
        );

        subscription = fetchJson('some-url', transformerFn)
            .subscribe(
                ({ response }) => { receivedData = response }
            );

        await microtaskQueue();

        expect(receivedData).toEqual(transformedData);
    });

});
