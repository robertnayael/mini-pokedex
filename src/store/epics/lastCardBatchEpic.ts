import { filter, map, mapTo, withLatestFrom } from 'rxjs/operators';
import { Epic } from 'redux-observable';

import { ofType } from './helpers';
import actions, { Action } from '../actions';
import { State } from '../state';
import * as selectors from '../selectors';

const lastCardBatchEpic: Epic<Action, Action, State> = (action$, state$) => action$.pipe(
    ofType(actions.requestCardBatchSuccess),
    map(action => action.payload.totalCards),
    withLatestFrom(state$.pipe(
        map(selectors.getCardListCount)
    )),
    filter(([totalCards, cardListCount]) => cardListCount === totalCards),
    mapTo(actions.lastCardBatchRetrieved())
);

export { lastCardBatchEpic };
