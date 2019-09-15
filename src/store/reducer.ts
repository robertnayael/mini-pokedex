import actions, { Action } from './actions';
import { initialState, State } from './state';
import { getType } from 'typesafe-actions';

function reducer(state: State = initialState, action: Action): State {
    switch(action.type) {

        case getType(actions.requestCardBatch): {
            return {
                ...state,
                pendingRequests: {
                    ...state.pendingRequests,
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
                // cards: action.payload
            };
        }
    }

    return state;
}

export default reducer;
