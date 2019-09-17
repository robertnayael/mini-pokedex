import { throwError, of } from "rxjs";

import { fetchJson } from "../utils";

class MockFetcher{
    private url?: string;

    constructor(
        private mockResponse: any,
        private mockHeaders: { [header: string]: string }
    ) {}

    getRequestedUrl = () => {
        return this.url;
    }

    fetcher: typeof fetchJson = (url, jsonProcessor) => {
        this.url = url;
        try {
            const result = {
                response: jsonProcessor(this.mockResponse as any),
                headers: this.mockHeaders
            };
            return of(result);
        } catch(e) {
            return throwError(e);
        }
    }
}

export { MockFetcher };
