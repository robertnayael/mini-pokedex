import { getRelevantCardProps } from './';

const expectedCard = {
    id: '',
    imageUrl: '',
    imageUrlHiRes: '',
    name: '',
    supertype: '',
    series: '',
    types: [],
    rarity: [],
    nationalPokedexNumber: 7,
    hp: '',
    set: '',
    evolvesFrom: '',
    weaknesses: [],
    attacks: []
};

const rawCard = {
    ...expectedCard,
    unnecessaryProp: ''
};

describe('`getRelevantCardProps()` utility', () => {

    it('correctly narrows down card properties', () => {
        const result = getRelevantCardProps(rawCard);
        expect(result).toEqual(expectedCard);
    });

});
