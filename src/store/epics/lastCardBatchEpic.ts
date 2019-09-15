import { filter, map, mapTo, withLatestFrom, pluck } from 'rxjs/operators';
import { Epic } from 'redux-observable';

import { ofType } from './helpers';
import actions, { Action } from '../actions';
import { State } from '../state';
import * as selectors from '../selectors';

/**
 * Fires off when a batch of cards has been retrieved. Compares the number of cards
 * retrieved so far with the total number of cards reported by the API. If the two
 * numbers match, dispatches an action notifying that this is the final batch.
 */
const lastCardBatchEpic: Epic<Action, Action, State> = (action$, state$) => action$.pipe(
    ofType(actions.requestCardBatchSuccess),
    pluck('payload', 'totalCards'),
    withLatestFrom(state$.pipe(
        map(selectors.getCardListCount)
    )),
    filter(([totalCards, cardListCount]) => cardListCount === totalCards),
    mapTo(actions.lastCardBatchRetrieved())
);

export { lastCardBatchEpic };
