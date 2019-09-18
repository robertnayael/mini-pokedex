import { State } from '../state';
import { Card } from '../../models';

const mockState: State = {
    cards: {},
    totalCards: null,
    cardListIDs: [],
    similarCardIDs: {},
    selectedCardID: null,
    pendingRequests: {
        cardList: false,
        selectedCard: false,
        similarCards: false
    },
    errorMessage: null
};

const emptyCard: Card = {
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
};

const mockCards: Card[] = [
    {
        ...emptyCard,
        id: '1'
    },
    {
        ...emptyCard,
        id: '2'
    },
    {
        ...emptyCard,
        id: '3'
    },
    {
        ...emptyCard,
        id: '4'
    },
    {
        ...emptyCard,
        id: '6'
    },
    {
        ...emptyCard,
        id: '6'
    },
    {
        ...emptyCard,
        id: '7'
    },
    {
        ...emptyCard,
        id: '8'
    },
    {
        ...emptyCard,
        id: '9'
    },
    {
        ...emptyCard,
        id: '10'
    }
];

const mockCardsDictionary = mockCards.reduce(
    (dictionary, card) => ({
        ...dictionary,
        [card.id]: card
    }),
    {}
);

export {
    mockState,
    mockCards,
    mockCardsDictionary,
    emptyCard
};
