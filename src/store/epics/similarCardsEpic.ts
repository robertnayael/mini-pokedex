import { of, EMPTY } from 'rxjs';
import { map, catchError, withLatestFrom, switchMap, filter } from 'rxjs/operators';
import { Epic } from 'redux-observable';

import actions, { Action } from '../actions';
import { ApiService } from '../../apiService';
import { State } from '../state';
import * as selectors from '../selectors';
import { isActionOf } from 'typesafe-actions';

const similarCardsEpic: Epic<Action, Action, State, ApiService> = (action$, state$, api) => action$.pipe(
    filter(action =>
        isActionOf(actions.openCardDetails)(action) ||
        isActionOf(actions.fetchCardDetailsSuccess)(action)
    ),
    withLatestFrom(
        state$.pipe(
            map(selectors.getSelectedCard),
        ),
        state$.pipe(
            map(selectors.getSimilarCards),
            map(Boolean)
        )
    ),
    switchMap(([ , baseCard, similarCardsExist ]) => {
        if (!baseCard || similarCardsExist) {
            return EMPTY;
        }
        return api.fetchSimilarCards(baseCard!).pipe(
            map(similarCards => ({
                similarCards,
                card: baseCard
            }))
        );
    }),
    map(actions.fetchSimilarCardsSuccess),
    catchError(errorMessage => of(actions.fetchSimilarCardsFailure(errorMessage)))
);

export { similarCardsEpic };
