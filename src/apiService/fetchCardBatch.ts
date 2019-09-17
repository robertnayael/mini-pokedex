import { map } from 'rxjs/operators';

import { Card } from '../models';
import { fetchJson, getRelevantCardProps } from '../utils';

const jsonProcessor = (data: any): Card[] =>
    data.cards.map(getRelevantCardProps);

const fetchCardBatch = (batchSize: number, batchIndex: number, fetcher = fetchJson) =>
    fetcher(
        `https://api.pokemontcg.io/v1/cards?pageSize=${batchSize}&page=${batchIndex + 1}`,
        jsonProcessor
    ).pipe(
        map(({ headers, response }) => ({
            cards: response,
            totalCards: parseInt(headers.totalCards, 10)
        }))
    );

export { fetchCardBatch };
