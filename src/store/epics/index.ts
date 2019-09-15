import { combineEpics } from 'redux-observable';

import { nextCardBatchEpic } from './nextCardBatchEpic';
import { lastCardBatchEpic } from './lastCardBatchEpic';

export default combineEpics(
    nextCardBatchEpic,
    lastCardBatchEpic
);
