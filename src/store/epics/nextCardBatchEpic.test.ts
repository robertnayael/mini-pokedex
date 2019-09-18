import { Subject, Subscription, BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { ActionsObservable, StateObservable } from 'redux-observable';

import { nextCardBatchEpic } from './nextCardBatchEpic';
import { State } from '../state';
import actions, { Action } from '../actions';
import apiService from '../../apiService';
import { Card } from '../../models';
import { cardBatchSize } from '../../config';
import { getInitialState, getCards } from '../../mocks';

describe('nextCardBatchEpic', () => {

    let requestedBatchIndex: number | null = null;
    const mockApiResponse = new Subject<{ cards: Card[], totalCards: number }>();
    const emitApiResponse = (response: { cards: Card[], totalCards: number }) =>
        mockApiResponse.next(response);[]
    const emitApiError = (errorMsg: string) => mockApiResponse.error(errorMsg);
    
    const mockApi = {
        ...apiService,
        fetchCardBatch: (batchSize: number, batchIndex: number) => {
            requestedBatchIndex = batchIndex;
            return mockApiResponse.pipe(first());
        }
    };

    const actionsSubject = new Subject<Action>();
    const stateSubject = new Subject<State>();
    const emitAction = (action: Action) => actionsSubject.next(action);
    const emitState = (state: State) => stateSubject.next(state);

    const actions$ = new ActionsObservable(actionsSubject);
    const state$ = new StateObservable(stateSubject, getInitialState());

    let subscription: Subscription;

    beforeEach(() => {
        subscription && subscription.unsubscribe();
        emitState(getInitialState());
        requestedBatchIndex = null;
    });

    it('requests correct `batchSize` and `batchIndex`', () => {
        subscription = nextCardBatchEpic(actions$, state$, mockApi).subscribe();

        emitAction(actions.requestCardBatch());
        emitApiResponse({ cards: [], totalCards: 0 });
        expect(requestedBatchIndex).toBe(0);

        emitState({
            ...getInitialState(),
            cardListIDs: Array(cardBatchSize).fill('')
        });

        emitAction(actions.requestCardBatch());
        emitApiResponse({ cards: [], totalCards: 0 });
        expect(requestedBatchIndex).toBe(1);
    });

    it('emits `requestCardBatchSuccess` action with correct payload upon receipt of API response', () => {
        const expectedResponse = {
            cards: getCards(42),
            totalCards: 42
        };
        let emittedAction: any;
        subscription = nextCardBatchEpic(actions$, state$, mockApi).subscribe(
            action => emittedAction = action
        );

        emitAction(actions.requestCardBatch());
        emitApiResponse(expectedResponse);

        expect(emittedAction.payload).toEqual(expectedResponse);
    });

    it('emits `requestCardBatchFailure` action on error', () => {
        let emittedAction: any;
        subscription = nextCardBatchEpic(actions$, state$, mockApi).subscribe(
            action => emittedAction = action
        );

        emitAction(actions.requestCardBatch());
        emitApiError('Ooops... 🙄');

        expect(emittedAction).toEqual(actions.requestCardBatchFailure('Ooops... 🙄'));
    });

    it('deactivates as soon as `lastCardBatchRetrieved` action is emitted', () => {
        let hasTriggered = false;
        subscription = nextCardBatchEpic(actions$, state$, mockApi).subscribe(
            () => hasTriggered = true
        );

        emitAction(actions.lastCardBatchRetrieved());
        emitAction(actions.requestCardBatch());
        emitApiResponse({ cards: [], totalCards: 0 });

        expect(hasTriggered).toBe(false);
    });

});
