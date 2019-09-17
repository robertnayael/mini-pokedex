import * as selectors from './selectors';
import { mockState, mockCardsDictionary, emptyCard } from './selectors.test.mocks';
import { State } from '../state';
import { Card } from '../../models';

// Not the best way to clone objects but it should suffice for testing...
const clone = <T>(input: T): T => JSON.parse(JSON.stringify(input));

describe('store selectors', () => {

    let state: State;

    beforeEach(() => {
        state = clone(mockState);
    });

    describe('`getCardListIDs` selector', () => {
        it('returns IDs of cards in main list', () => {
            const expectedIDs = [ '1', '2', '3' ];
            state.cardListIDs = expectedIDs;
            const selectedIDs = selectors.getCardListIDs(state);
            expect(selectedIDs).toBe(expectedIDs);
        });
    });

    describe('`getCards` selector', () => {
        it('returns all cards', () => {
            const expectedCards = mockCardsDictionary;
            state.cards = mockCardsDictionary;
            const selectedCards = selectors.getCards(state);
            expect(selectedCards).toBe(expectedCards);
        });
    });

    describe('`getErrorMessage` selector', () => {
        it('returns error message', () => {
            const expectedMessage = 'Some error message';
            state.errorMessage = expectedMessage;
            const selectedMessage = selectors.getErrorMessage(state);
            expect(selectedMessage).toBe(expectedMessage);
        });
    });

    describe('`getPendingRequests` selector', () => {
        it('returns pending flags', () => {
            const expectedRequests: State['pendingRequests'] = {
                cardList: true,
                selectedCard: false,
                similarCards: false
            };
            state.pendingRequests = expectedRequests;
            const selectedRequests = selectors.getPendingRequests(state);
            expect(selectedRequests).toBe(expectedRequests);
        });
    });

    describe('`getSelectedCardID` selector', () => {
        it('returns selected card ID', () => {
            const expectedID = 'xyz';
            state.selectedCardID = expectedID;
            const selectedID = selectors.getSelectedCardID(state);
            expect(selectedID).toBe(expectedID);
        });
    });

    describe('`getSimilarCardIDs` selector', () => {
        it('returns dictionary or similar card IDs', () => {
            const expectedDict: State['similarCardIDs'] = {
                'abc': [ 'def', 'ghi' ],
                '123': [ '456', '789 ']
            };
            state.similarCardIDs = expectedDict;
            const selectedDict = selectors.getSimilarCardIDs(state);
            expect(selectedDict).toBe(expectedDict);
        });
    });

    describe('`getIsSelectedCardPending` selector', () => {
        it('returns correct pending flag', () => {
            state.pendingRequests = {
                cardList: false,
                selectedCard: true,
                similarCards: false
            };
            const pendingFlag = selectors.getIsSelectedCardPending(state);
            expect(pendingFlag).toBe(true);
        });
    });

    describe('`getIsCardListPending` selector', () => {
        it('returns correct pending flag', () => {
            state.pendingRequests = {
                cardList: true,
                selectedCard: false,
                similarCards: false
            };
            const pendingFlag = selectors.getIsCardListPending(state);
            expect(pendingFlag).toBe(true);
        });
    });

    describe('`getAreSimilarCardsPending` selector', () => {
        it('returns correct pending flag', () => {
            state.pendingRequests = {
                cardList: false,
                selectedCard: false,
                similarCards: true
            };
            const pendingFlag = selectors.getAreSimilarCardsPending(state);
            expect(pendingFlag).toBe(true);
        });
    });

    describe('`getCardList` selector', () => {
        it('returns all cards included in main list', () => {
            const expectedCards = Object.values(mockCardsDictionary)
                .slice(0, -1) as Card[]; // Make sure the list includes less cards than the whole dictionary
            state.cards = mockCardsDictionary;
            state.cardListIDs = expectedCards.map(card => card.id);
            const selectedCards = selectors.getCardList(state);
            expect(selectedCards).toEqual(expectedCards);
        });
    });

    describe('`getSelectedCard` selector', () => {
        it('returns selected card if it is available', () => {
            const expectedCard = {
                ...emptyCard,
                id: 'abc'
            };
            state.selectedCardID = 'abc';
            state.cards = {
                'abc': expectedCard
            };
            const selectedCard = selectors.getSelectedCard(state);
            expect(selectedCard).toBe(expectedCard);
        });

        it('returns `null` if selected card is not available', () => {
            state.selectedCardID = 'abc';
            const selectedCard = selectors.getSelectedCard(state);
            expect(selectedCard).toBe(null);
        });
    });

    describe('`getSimilarCards` selector', () => {
        it('returns similar cards if they are available', () => {
            state.selectedCardID = 'abc';
            state.similarCardIDs = {
                abc: [ 'def', 'ghi']
            };
            const similarCards = {
                def: { ...emptyCard, id: 'def' },
                ghi: { ...emptyCard, id: 'ghi' },
            };
            state.cards = {
                ...similarCards,
                abc: { ...emptyCard, id: 'abc' }
            };
            const expectedSimilarCards = Object.values(similarCards);
            const selectedSimilarCards = selectors.getSimilarCards(state);

            expect(selectedSimilarCards).toEqual(expectedSimilarCards);
        });

        it('returns `null` if similar cards are not available', () => {
            state.selectedCardID = 'abc';
            const selectedSimilarCards = selectors.getSimilarCards(state);
            expect(selectedSimilarCards).toBe(null);
        });
    });

});
