import { getEmptyCard } from '.';
import { Card } from '../models';

/**
 * Returns a card collection of the specified length with unique IDs.
 * The ID format is `id_0`, `id_1`... `id_n`.
 */
const getCards = (count: number): Card[] =>
    Array(count)
        .fill(null)
        .map((_, i) => ({
            ...getEmptyCard(),
            id: `id_${i}`
        }));

export { getCards };
