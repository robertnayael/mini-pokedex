import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export default actions;
export type Action = ActionType<typeof actions>;
