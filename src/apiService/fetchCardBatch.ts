import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

import { Card } from '../models';

const fetchCardBatch = (batchSize: number, batchIndex: number) => ajax({
    url: `https://api.pokemontcg.io/v1/cards?pageSize=${batchSize}&page=${batchIndex + 1}`,
    method: 'GET'
}).pipe(
    map<
        { response: { cards: Card[] }, xhr: any },
        {
            cards: Card[],
            totalCards: number
        }
    >(({ response, xhr }) => ({
        cards: response.cards,
        totalCards: parseInt(xhr.getResponseHeader('total-count'), 10)
    }))
);

export default fetchCardBatch;
