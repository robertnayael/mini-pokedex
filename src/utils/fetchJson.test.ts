import { Observable, Subscription } from 'rxjs';
import xhrMock from 'xhr-mock';

import { fetchJson } from './';

/**
 * Makes sure the microtask queue is empty. Wihout flushing it,
 * the mock responses don't kick off until  after the tests.
 */
const microtaskQueue = async () => await Promise.resolve();

describe('`fetchJson()` utility', () => {

    let subscription: Subscription | null;

    beforeAll(() => {
        jest.setTimeout(0);
    });

    afterAll(() => {
        jest.setTimeout(5000);
    });

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
        let sent = false;
        
        xhrMock.get('some-url', (_, response) => {
            sent = true;

            return response;
        });
        
        fetchJson('some-url', () => {});

        await microtaskQueue();

        expect(sent).toBe(false);
    });

    it('sends request on subscription', () => {
        const requestSent = new Promise(resolve => {
            xhrMock.get('some-url', (_, response) => {
                resolve(true);
                return response;
            });
        });

        subscription = fetchJson('some-url', () => {}).subscribe();

        expect(requestSent).resolves.toBe(true);
    });

    it('throws on http error', () => {
        xhrMock.get('some-url', (_, response) =>
            response
                .body({})
                .status(404)
        );

        const error = new Promise(resolve => {
            subscription = fetchJson('some-url', () => {})
            .subscribe({
                error: () => resolve(true)
            });
        });

        expect(error).resolves.toBe(true);
    });

    it('throws on non-JSON response', () => {
        xhrMock.get('some-url', (_, response) =>
            response
                .body('definitely not a JSON response')
                .status(200)
        );

        const error = new Promise(resolve => {
            subscription = fetchJson('some-url', () => {})
            .subscribe({
                error: () => resolve(true)
            });
        });

        expect(error).resolves.toBe(true);
    });

    it('completes stream after receiving response', () => {
        xhrMock.get('some-url', (_, response) =>
            response
                .body({})
                .status(200)
        );

        const isCompleted = new Promise(resolve => {
            subscription = fetchJson('some-url', () => {})
            .subscribe({
                complete: () => resolve(true)
            });
        });

        expect(isCompleted).resolves.toBe(true);
    });

    it('emits response headers', () => {
        const headersSent = {
            header1: 'value1',
            header2: 'value2',
        };

        xhrMock.get('some-url', (_, response) =>
            response
                .body({})
                .status(200)
                .headers(headersSent)
        );

        const headersReceived = new Promise(resolve => {
            subscription = fetchJson('some-url', () => {})
                .subscribe(
                    ({ headers }) => resolve(headers)
                );
        });

        expect(headersReceived).resolves.toEqual(headersSent);
    });

    it('emits transformed response', () => {
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

        const receivedData = new Promise(resolve => {
            subscription = fetchJson('some-url', transformerFn)
                .subscribe(
                    ({ response }) => resolve(response)
                );
        });

        expect(receivedData).resolves.toEqual(transformedData);
    });

});
