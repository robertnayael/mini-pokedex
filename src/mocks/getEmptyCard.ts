import { Card } from '../models';

/**
 * Returns an empty card with no ID.
 */
const getEmptyCard = (): Card => ({
    id: '',
    imageUrl: '',
    imageUrlHiRes: '',
    name: '',
    supertype: '',
    series: '',
    types: [],
    rarity: '',
    nationalPokedexNumber: 0,
    hp: '',
    set: '',
    evolvesFrom: '',
    weaknesses: [],
    attacks: []
});

export { getEmptyCard };
