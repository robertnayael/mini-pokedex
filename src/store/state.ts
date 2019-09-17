import { Card } from '../models';

export interface State {
    /**
     * All cards retrieved so far, including the cards displayed on the main list,
     * the selected card, and cards similar to the selected one. Whatever the reason
     * why a card has been requested, it ends up in this dictionary.
     */
    cards: {
        [id: string]: Card
    },
    /** 
     * Maximum number of cards that can be retrieved; beyond that point there's
     * no need to attempt fetching more cards.
     */
    totalCards: number | null;
    /** ID's of cards displayed in the main list */
    cardListIDs: string[],
    /** ID of the currently selected card, or `null` if no card is selected */
    selectedCardID: string | null,
    /** 
     * Dictionary of similar cards. The key is the ID of a card, and the corresponding
     * value is the list of its similar cards.
     */
    similarCardIDs: {
        [id: string]: string[]
    }
    pendingRequests: {
        /** Indicates a pending request for more cards in the main list */
        cardList: boolean,
        /** 
         * Indicates a pending request for the currently selected card. In most cases,
         * that card is available right away because it must have been displayed
         * in the main list before the user selected it. The only exception is
         * opening/refreshing the app with a specific card ID in the url.
         */
        selectedCard: boolean,
        /**
         * Indicates a pending request for cards similiar to the currently selected one.
         */
        similarCards: boolean
    },
    /**
     * User-friendly error message, if any error should occur.
     */
    errorMessage: string | null;
}

const initialState: State = {
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

export { initialState }
