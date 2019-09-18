import actions, { Action } from './actions';
import { initialState, State } from './state';
import { getType } from 'typesafe-actions';

function reducer(state: State = initialState, action: Action): State {
    switch(action.type) {

        case getType(actions.requestCardBatch): {
            return {
                ...state,
                pendingRequests: {
                    ...state.pendingRequests, // TODO: check if last batch has been retrieved
                    cardList: true
                }
            };
        }

        case getType(actions.requestCardBatchSuccess): {
            const newCards = action.payload.cards.reduce((cards, card) => ({
                ...cards,
                [card.id]: card
            }), {});

            const newCardIds = action.payload.cards.map(card => card.id);

            return {
                ...state,
                pendingRequests: {
                    ...state.pendingRequests,
                    cardList: false
                },
                cards: {
                    ...newCards,
                    ...state.cards
                },
                cardListIDs: [
                    ...state.cardListIDs,
                    ...newCardIds
                ]
            };
        }

        case getType(actions.requestCardBatchFailure): {
            return {
                ...state,
                pendingRequests: {
                    ...state.pendingRequests,
                    cardList: false
                },
                errorMessage: action.payload
            };
        }

        case getType(actions.openCardDetails): {
            const id = action.payload;
            const cardExists = state.cards.hasOwnProperty(id);
            const similarCardsExist = state.similarCardIDs.hasOwnProperty(id);

            return {
                ...state,
                pendingRequests: {
                    ...state.pendingRequests,
                    selectedCard: !cardExists,
                    similarCards: !similarCardsExist
                },
                selectedCardID: id
            };
        }

        case getType(actions.closeCardDetails): {
            return {
                ...state,
                pendingRequests: {
                    ...state.pendingRequests,
                    selectedCard: false,
                    similarCards: false
                },
                selectedCardID: null

            }
        }

        case getType(actions.fetchCardDetailsSuccess): {
            const newCard = action.payload;
            return {
                ...state,
                cards: {
                    [newCard.id]: newCard,
                    ...state.cards  
                },
                pendingRequests: {
                    ...state.pendingRequests,
                    selectedCard: false,
                    similarCards: false
                },
            }
        }

        case getType(actions.fetchCardDetailsFailure): {
            return {
                ...state,
                pendingRequests: {
                    ...state.pendingRequests,
                    selectedCard: false,
                    similarCards: false
                },
                errorMessage: action.payload
            };
        }

        case getType(actions.fetchSimilarCardsSuccess): {
            const baseCardId = action.payload.card.id;
            const similarCards = action.payload.similarCards.reduce((cards, card) => ({
                ...cards,
                [card.id]: card
            }), {});

            const similarCardIDs = action.payload.similarCards.map(card => card.id);

            return {
                ...state,
                cards: {
                    ...similarCards,
                    ...state.cards  
                },
                similarCardIDs: {
                    ...state.similarCardIDs,
                    [baseCardId]: similarCardIDs
                },
                pendingRequests: {
                    ...state.pendingRequests,
                    similarCards: false
                },
            }
        }

        case getType(actions.fetchSimilarCardsFailure): {
            return {
                ...state,
                pendingRequests: {
                    ...state.pendingRequests,
                    similarCards: false
                },
                errorMessage: action.payload
            };
        }

    }

    return state;
}

export default reducer;
