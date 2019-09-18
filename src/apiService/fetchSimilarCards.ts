import { pluck, map } from 'rxjs/operators';

import { Card } from '../models';
import { fetchJson, getRelevantCardProps } from '../utils';

const getHpRange = (hp: string) => ({
    min: Math.round(+hp * 0.9),
    max: Math.round(+hp * 1.1),
});

const MAX_CARDS = 3;

const jsonProcessor = (data: any): Card[] =>
    data.cards.map(getRelevantCardProps);

const fetchSimilarCards = (card: Card, fetcher = fetchJson) => {
    const hpRange = getHpRange(card.hp);
    const types = card.types.join(',');
    const rarity = card.rarity;

    return fetcher(
        `https://api.pokemontcg.io/v1/cards?pageSize=1000&supertype=Pokémon&types=${types}&rarity=${rarity}&hp=gte${hpRange.min}`,
        jsonProcessor
    ).pipe(
        pluck('response'),
        map(cards => cards
            .filter(({ id }) => id !== card.id)
            .filter(({ hp }) => +hp <= hpRange.max)
            .sort((a, b) => +a.hp - +b.hp)
            .slice(0, MAX_CARDS)
        )
    );
}

export { fetchSimilarCards };
