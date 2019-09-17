import { exhaustMap, map, switchMapTo, takeUntil, tap, first, catchError } from 'rxjs/operators';
import { Epic } from 'redux-observable';

import { cardBatchSize } from '../../config';
import { ofType } from './helpers';
import actions, { Action } from '../actions';
import { ApiService } from '../../apiService';
import { State } from '../state';
import * as selectors from '../selectors';
import { of } from 'rxjs';

/**
 * Fires off when a new batch of cards is requested. Checks the index of the next batch
 * based on the number of cards in the main list. Initiates an API request.
 * Dispatches a success or failure action when the request completes. Stops listening
 * to the action stream once the final batch has been retrieved.
 */
const nextCardBatchEpic: Epic<Action, Action, State, ApiService> = (action$, state$, api) => action$.pipe(
    ofType(actions.requestCardBatch),
    switchMapTo(state$.pipe(
        map(selectors.getNextBatchIndex(cardBatchSize)),
        first()
    )),
    exhaustMap(batchIndex => api.fetchCardBatch(cardBatchSize, batchIndex)),
    map(actions.requestCardBatchSuccess),
    catchError(errorMessage => of(actions.requestCardBatchFailure(errorMessage))),
    takeUntil(action$.pipe(
        ofType(actions.lastCardBatchRetrieved)
    ))
);

export { nextCardBatchEpic };
