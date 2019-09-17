import { State } from '../store/state';

const getInitialState = (): State => ({
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
});

export { getInitialState };
