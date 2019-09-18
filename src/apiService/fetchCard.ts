import { pluck } from 'rxjs/operators';

import { Card } from '../models';
import { fetchJson, getRelevantCardProps } from '../utils';

const jsonProcessor = (data: any): Card => 
    getRelevantCardProps(data.card);

const fetchCard = (id: string, fetcher = fetchJson) =>
    fetcher(
        `https://api.pokemontcg.io/v1/cards/${id}`,
        jsonProcessor
    ).pipe(
        pluck('response')
    );

export { fetchCard };
