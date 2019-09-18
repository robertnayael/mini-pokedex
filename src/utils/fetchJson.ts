import { Observable, Subscriber } from 'rxjs';

interface HeaderMap {
    [header: string]: string;
}

interface ResponseWithHeaders<T> {
    response: T;
    headers: HeaderMap;
}

/**
 * Retrieves JSON from the specified URL. Processes it using the provided function.
 * Returns an observable stream that emits both the processed response and a map
 * of response headers.
 */
const fetchJson = <T, R>(
    url: string,
    jsonProcessor: (rawData: T) => R
): Observable<ResponseWithHeaders<R>> => 
    new Observable((subscriber) => {
        const request = setupRequest<T, R>(url, subscriber, jsonProcessor);
        return teardownRequest(request);
    });

/**
 * A helper that sets up the requests and actually performs response processing
 * and header parsing. Returns the response object which can be used for cancelling
 * the requests.
 */
const setupRequest = <T, R>(
    url: string,
    subscriber: Subscriber<ResponseWithHeaders<R>>,
    jsonProcessor: (rawData: T) => R
): XMLHttpRequest => {
    const request = new XMLHttpRequest();
    request.responseType = 'json';
    request.open('get', url);
    request.send();

    request.onerror = () =>
        subscriber.error(new Error(`Error fetching ${url}`));

    request.ontimeout = () =>
        subscriber.error(new Error(`Request timeout while fetching ${url}`));

    request.onreadystatechange = () => {
        if (request.readyState !== 4) {
            return;
        }
        request.status === 200
            ? finalize()
            : subscriber.error(
                new Error(`Error fetching ${url} (HTTP response status: ${request.status})`),
            );
    };

    const finalize = () => {
        try {
            if (!request.response) {
                subscriber.error(`Received invalid JSON from ${url}`);
            }

            const response = jsonProcessor(request.response);
            const headers = parseHeaders(request.getAllResponseHeaders());

            subscriber.next({
                response,
                headers
            });
            subscriber.complete();
        } catch {
            subscriber.error(`Error processing JSON from ${url}`);
        }
    };

    return request;
}

/**
 * Cancels the specified request and clears any listeners attached to it.
 */
const teardownRequest = (request: XMLHttpRequest) =>
    () => {
        request.onerror = null;
        request.ontimeout = null;
        request.onreadystatechange = null;
        request.abort();
    };

/**
 * Converts a string containing HTTP response headers into an object
 * where keys correspond to header names and values are header values.
 */
const parseHeaders = (rawHeaders: string): HeaderMap =>
        rawHeaders
            .split(/[\r\n]+/)
            .filter(Boolean)
            .map(item => item.split(': '))
            .reduce((map, [ name, value ]) => ({
                ...map,
                [name]: value
            }), {});

export { fetchJson };
