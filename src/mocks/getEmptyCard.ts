import { Card } from '../models';

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
