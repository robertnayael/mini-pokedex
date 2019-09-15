import { exhaustMap, map, switchMapTo, takeUntil } from 'rxjs/operators';
import { Epic } from 'redux-observable';

import { ofType } from './helpers';
import actions, { Action } from '../actions';
import apiService from '../../apiService';
import { State } from '../state';
import * as selectors from '../selectors';

const BATCH_SIZE = 20;

const nextCardBatchEpic: Epic<Action, Action, State, typeof apiService> = (action$, state$, api) => action$.pipe(
    ofType(actions.requestCardBatch),
    switchMapTo(state$.pipe(
        map(selectors.getNextBatchIndex(BATCH_SIZE))
    )),
    exhaustMap(batchIndex => api.fetchCardBatch(BATCH_SIZE, batchIndex)),
    map(actions.requestCardBatchSuccess),
    takeUntil(action$.pipe(
        ofType(actions.lastCardBatchRetrieved)
    )),
);

export { nextCardBatchEpic };
