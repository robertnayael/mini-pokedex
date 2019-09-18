import { of, EMPTY } from 'rxjs';
import { map, catchError, withLatestFrom, pluck, switchMap } from 'rxjs/operators';
import { Epic } from 'redux-observable';

import { ofType } from './helpers';
import actions, { Action } from '../actions';
import { ApiService } from '../../apiService';
import { State } from '../state';
import * as selectors from '../selectors';

const cardDetailsEpic: Epic<Action, Action, State, ApiService> = (action$, state$, api) => action$.pipe(
    ofType(actions.openCardDetails),
    pluck('payload'),
    withLatestFrom(state$.pipe(
        map(selectors.getSelectedCard),
        map(Boolean)
    )),
    switchMap(([ id, cardExists ]) => cardExists
        ? EMPTY
        : api.fetchCard(id)
    ),
    map(actions.fetchCardDetailsSuccess),
    catchError(errorMessage => of(actions.fetchCardDetailsFailure(errorMessage)))
);

export { cardDetailsEpic };
