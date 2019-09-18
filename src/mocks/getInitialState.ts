import { State } from '../store/state';

/**
 * Returns a state object analogous to the initial state.
 */
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
