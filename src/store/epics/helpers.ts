import { ActionType, isActionOf } from "typesafe-actions";
import { Action } from "redux";
import { Observable } from 'rxjs';
import { filter } from "rxjs/operators";

/**
 * Works similarly to the `ofType()` operator shipped with `redux-observable` but
 * this version correctly narrows down action types when given an action creator
 * made with `createAction()` from `typesafe-actions`.
 */
const ofType = <T, R = ActionType<T>>(actionCreator: T) =>
    (actions$: Observable<Action>): Observable<R> =>
        actions$.pipe(
            filter(isActionOf(actionCreator as any))
        );

export { ofType };
