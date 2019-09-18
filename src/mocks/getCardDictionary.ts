import { getCards } from '.';
import { Card } from '../models';

/**
 * Returns a card dictionary of the specified length with unique IDs.
 * The ID format is `id_0`, `id_1`... `id_n`.
 */
const getCardDictinary = (count: number): { [id: string]: Card } =>
    getCards(count)
        .reduce((dictionary, card) => ({
            ...dictionary,
            [card.id]: card
        }), {});

export { getCardDictinary };
