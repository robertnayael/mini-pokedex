import { Card } from "../models";

const relevantProps = [
    'id',
    'imageUrl',
    'imageUrlHiRes',
    'name',
    'supertype',
    'series',
    'types',
    'rarity',
    'nationalPokedexNumber',
    'hp',
    'set',
    'evolvesFrom',
    'weaknesses',
    'attacks'
];

/**
 * Cards receved from the API may have more data than we need. This function
 * extracts just the properties we need from a single card.
 */
const getRelevantCardProps = (rawCardData: Object) =>
    Object.entries(rawCardData)
        .filter(([ key ]) => relevantProps.includes(key))
        .reduce((card, [ key, value ]) =>({
            ...card,
            [key]: value
        }), {}) as Card;

export { getRelevantCardProps };
